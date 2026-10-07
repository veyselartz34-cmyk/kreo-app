"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function processCheckoutAction(formData: {
  clientName: string;
  clientEmail: string;
  productTitle: string;
  amount: number;
  creatorUsername: string;
  productId: string;
}) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: formData.creatorUsername }
    });
    
    if (!user) {
      return { success: false, error: "Satici bulunamadi." };
    }

    // 1. Musteriyi bul veya olustur
    const customer = await prisma.customer.upsert({
      where: {
        email_creatorId: {
          email: formData.clientEmail,
          creatorId: user.id
        }
      },
      update: {
        name: formData.clientName, // ismi guncelle
      },
      create: {
        name: formData.clientName,
        email: formData.clientEmail,
        creatorId: user.id
      }
    });

    // 2. Siparis (Order) olustur
    const newOrder = await prisma.order.create({
      data: {
        amount: formData.amount,
        status: "SUCCESS", // Mock Iyzico payment basarili varsayiyoruz
        productId: formData.productId,
        customerId: customer.id,
      }
    });

    // Revalidate dashboard routes
    revalidatePath("/dashboard/customers");
    revalidatePath("/dashboard/products");
    revalidatePath("/dashboard");

    return { success: true, order: newOrder };
  } catch (error) {
    console.error("Error processing checkout:", error);
    return { success: false, error: "Odeme islenirken bir hata olustu." };
  }
}
