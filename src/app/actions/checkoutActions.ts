"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function validateCouponAction(data: {
  code: string;
  creatorUsername: string;
  price: number;
}) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: data.creatorUsername.toLowerCase() },
    });

    if (!user) {
      return { success: false, error: "Satıcı bulunamadı." };
    }

    const cleanCode = data.code.trim().toUpperCase();
    const coupon = await prisma.discountCode.findFirst({
      where: {
        code: cleanCode,
        userId: user.id,
        isActive: true,
      },
    });

    if (!coupon) {
      return { success: false, error: "Geçersiz veya süresi dolmuş kupon kodu." };
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return { success: false, error: "Bu kupon kodunun kullanım limiti tükenmiştir." };
    }

    let discountAmount = 0;
    if (coupon.isPercent) {
      discountAmount = (data.price * coupon.discount) / 100;
    } else {
      discountAmount = Math.min(coupon.discount, data.price);
    }

    const finalPrice = Math.max(0, data.price - discountAmount);

    return {
      success: true,
      couponCode: coupon.code,
      discountAmount,
      finalPrice,
      isPercent: coupon.isPercent,
      discountValue: coupon.discount,
      message: `%${coupon.discount} indirim uygulandı!`,
    };
  } catch (error: any) {
    console.error("Error validating coupon:", error);
    return { success: false, error: "Kupon doğrulanırken bir hata oluştu." };
  }
}

export async function processCheckoutAction(formData: {
  clientName: string;
  clientEmail: string;
  productTitle: string;
  amount: number;
  creatorUsername: string;
  productId: string;
  couponCode?: string | null;
}) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: formData.creatorUsername.toLowerCase() }
    });
    
    if (!user) {
      return { success: false, error: "Satıcı bulunamadı." };
    }

    // 1. Müşteriyi bul veya oluştur
    const customer = await prisma.customer.upsert({
      where: {
        email_creatorId: {
          email: formData.clientEmail.trim().toLowerCase(),
          creatorId: user.id
        }
      },
      update: {
        name: formData.clientName.trim(),
      },
      create: {
        name: formData.clientName.trim(),
        email: formData.clientEmail.trim().toLowerCase(),
        creatorId: user.id
      }
    });

    // 2. Kupon kullanıldıysa sayacını artır
    if (formData.couponCode) {
      const coupon = await prisma.discountCode.findFirst({
        where: {
          code: formData.couponCode.trim().toUpperCase(),
          userId: user.id,
        }
      });
      if (coupon) {
        await prisma.discountCode.update({
          where: { id: coupon.id },
          data: { usedCount: { increment: 1 } },
        });
      }
    }

    // 3. Sipariş (Order) oluştur
    const newOrder = await prisma.order.create({
      data: {
        amount: formData.amount,
        status: "SUCCESS",
        productId: formData.productId,
        customerId: customer.id,
      }
    });

    // Revalidate dashboard routes
    revalidatePath("/dashboard/customers");
    revalidatePath("/dashboard/orders");
    revalidatePath("/dashboard/products");
    revalidatePath("/dashboard/marketing/discounts");
    revalidatePath("/dashboard");

    return { 
      success: true, 
      orderId: newOrder.id,
      amount: newOrder.amount,
      createdAt: newOrder.createdAt.toISOString()
    };
  } catch (error) {
    console.error("Error processing checkout:", error);
    return { success: false, error: "Ödeme işlenirken bir hata oluştu." };
  }
}
