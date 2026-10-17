"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function saveWorkingHoursAction(workingHoursJson: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Oturum açmanız gerekiyor." };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        workingHours: workingHoursJson,
      },
    });

    revalidatePath("/dashboard/calendar");
    return { success: true };
  } catch (error) {
    console.error("Save working hours error:", error);
    return { success: false, error: "Çalışma saatleri kaydedilirken hata oluştu." };
  }
}

export async function createMeetingAction(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Oturum açmanız gerekiyor." };
    }

    const title = formData.get("title") as string;
    const clientName = formData.get("clientName") as string;
    const clientEmail = formData.get("clientEmail") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const link = (formData.get("link") as string) || null;

    if (!title || !clientName || !clientEmail || !date || !time) {
      return { success: false, error: "Lütfen tüm zorunlu alanları doldurun." };
    }

    const meeting = await prisma.meeting.create({
      data: {
        userId: user.id,
        title,
        clientName,
        clientEmail,
        date,
        time,
        link,
        status: "Planlandı",
      },
    });

    revalidatePath("/dashboard/calendar");
    return { success: true, meeting };
  } catch (error) {
    console.error("Create meeting error:", error);
    return { success: false, error: "Randevu oluşturulamadı." };
  }
}

export async function updateMeetingStatusAction(meetingId: string, status: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Oturum açmanız gerekiyor." };
    }

    const meeting = await prisma.meeting.findUnique({
      where: { id: meetingId },
    });

    if (!meeting || meeting.userId !== user.id) {
      return { success: false, error: "Randevu bulunamadı veya yetkiniz yok." };
    }

    await prisma.meeting.update({
      where: { id: meetingId },
      data: { status },
    });

    revalidatePath("/dashboard/calendar");
    return { success: true };
  } catch (error) {
    console.error("Update meeting status error:", error);
    return { success: false, error: "Randevu durumu güncellenemedi." };
  }
}

export async function deleteMeetingAction(meetingId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Oturum açmanız gerekiyor." };
    }

    const meeting = await prisma.meeting.findUnique({
      where: { id: meetingId },
    });

    if (!meeting || meeting.userId !== user.id) {
      return { success: false, error: "Randevu bulunamadı veya yetkiniz yok." };
    }

    await prisma.meeting.delete({
      where: { id: meetingId },
    });

    revalidatePath("/dashboard/calendar");
    return { success: true };
  } catch (error) {
    console.error("Delete meeting error:", error);
    return { success: false, error: "Randevu silinirken hata oluştu." };
  }
}
