"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function processCheckoutAction(formData: {
  clientName: string;
  clientEmail: string;
  productTitle: string;
  amount: number;
  creatorUsername: string;
}) {
  try {
    let user = await prisma.user.findUnique({
      where: { username: formData.creatorUsername }
    });
    
    if (!user) {
      return { success: false, error: "Satici bulunamadi." };
    }

    const today = new Date();
    const dateFormatted = `Bugün, ${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}`;

    // Create a record in the Meeting/Order table
    const newMeeting = await prisma.meeting.create({
      data: {
        title: formData.productTitle,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        date: dateFormatted,
        time: `${today.getHours()}:00 - ${today.getHours() + 1}:00`,
        status: "Başarılı",
        userId: user.id,
      },
    });

    // Revalidate dashboard routes so the new customer/meeting shows up immediately
    revalidatePath("/dashboard/customers");
    revalidatePath("/dashboard/calendar");
    revalidatePath("/dashboard");

    return { success: true, meeting: newMeeting };
  } catch (error) {
    console.error("Error processing checkout:", error);
    return { success: false, error: "Ödeme işlenirken bir hata oluştu." };
  }
}
