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
      message: coupon.isPercent ? `%${coupon.discount} indirim uygulandı!` : `₺${coupon.discount} indirim uygulandı!`,
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
  appointmentDate?: string | null;
  appointmentTime?: string | null;
}) {
  try {
    let user = await prisma.user.findUnique({
      where: { username: formData.creatorUsername.toLowerCase() }
    });
    
    if (!user) {
      // Satıcı bulunamazsa varsayılan ilk kullanıcıyı veya sistem satıcısını bul
      user = await prisma.user.findFirst();
      if (!user) {
        return { success: false, error: "Satıcı bulunamadı." };
      }
    }

    // 1. Müşteriyi bul veya oluştur
    const cleanEmail = formData.clientEmail.trim().toLowerCase();
    const cleanName = formData.clientName.trim();

    const customer = await prisma.customer.upsert({
      where: {
        email_creatorId: {
          email: cleanEmail,
          creatorId: user.id
        }
      },
      update: {
        name: cleanName,
      },
      create: {
        name: cleanName,
        email: cleanEmail,
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

    // 3. Geçerli ürün kontrolü ve oluşturma
    let validProductId = formData.productId;
    const existingProduct = await prisma.product.findUnique({
      where: { id: formData.productId }
    });

    if (!existingProduct) {
      // Demo ürün ise veya henüz DB'ye kaydedilmemişse, otomatik DB ürünü oluştur
      const isMeetingType = formData.productTitle.toLowerCase().includes("görüşme") || 
                           formData.productTitle.toLowerCase().includes("danışmanlık") ||
                           formData.productTitle.toLowerCase().includes("seans");

      const createdProduct = await prisma.product.create({
        data: {
          title: formData.productTitle,
          description: "Kreo vitrininden satın alınan dijital içerik / seans.",
          price: formData.amount,
          type: isMeetingType ? "Birebir Görüşme" : "Dijital Ürün",
          userId: user.id,
        }
      });
      validProductId = createdProduct.id;
    }

    // 4. Sipariş (Order) oluştur
    const newOrder = await prisma.order.create({
      data: {
        amount: formData.amount,
        status: "SUCCESS",
        productId: validProductId,
        customerId: customer.id,
      }
    });

    // 5. Eğer ürün bir Birebir Görüşme / Danışmanlık ise veya randevu tarihi girilmişse Meeting oluştur
    let createdMeeting = null;
    const isConsulting = formData.productTitle.toLowerCase().includes("görüşme") || 
                         formData.productTitle.toLowerCase().includes("danışmanlık") ||
                         formData.productTitle.toLowerCase().includes("seans") ||
                         Boolean(formData.appointmentDate);

    if (isConsulting) {
      const meetDate = formData.appointmentDate || new Date(Date.now() + 86400000 * 2).toLocaleDateString("tr-TR");
      const meetTime = formData.appointmentTime || "14:00 - 15:00";
      const meetLink = `https://meet.google.com/kreo-${Math.random().toString(36).substring(2, 8)}`;

      createdMeeting = await prisma.meeting.create({
        data: {
          userId: user.id,
          title: formData.productTitle,
          clientName: cleanName,
          clientEmail: cleanEmail,
          date: meetDate,
          time: meetTime,
          link: meetLink,
          status: "Planlandı",
        }
      });
    }

    // Revalidate dashboard routes
    revalidatePath("/dashboard/calendar");
    revalidatePath("/dashboard/customers");
    revalidatePath("/dashboard/orders");
    revalidatePath("/dashboard/products");
    revalidatePath("/dashboard/marketing/discounts");
    revalidatePath("/dashboard");

    return { 
      success: true, 
      orderId: newOrder.id,
      amount: newOrder.amount,
      createdAt: newOrder.createdAt.toISOString(),
      meeting: createdMeeting ? {
        id: createdMeeting.id,
        date: createdMeeting.date,
        time: createdMeeting.time,
        link: createdMeeting.link,
      } : null,
    };
  } catch (error) {
    console.error("Error processing checkout:", error);
    return { success: false, error: "Ödeme işlenirken bir hata oluştu." };
  }
}
