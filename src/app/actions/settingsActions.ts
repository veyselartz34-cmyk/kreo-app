"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateSettingsAction(data: {
  name: string;
  username: string;
  bio: string;
  avatar: string | null;
  cover: string | null;
  emailNotifications: boolean;
}) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Yetkisiz islem" };
    }

    // Check if username is already taken by someone else
    if (data.username !== user.username) {
      const existing = await prisma.user.findUnique({
        where: { username: data.username },
      });
      if (existing) {
        return { success: false, error: "Bu kullanici adi zaten alinmis." };
      }
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        username: data.username,
        bio: data.bio,
        avatar: data.avatar,
        cover: data.cover,
        emailNotifications: data.emailNotifications,
      },
    });

    revalidatePath("/dashboard/settings");
    revalidatePath(`/${data.username}`);
    return { success: true };
  } catch (error: any) {
    console.error("Settings update error:", error);
    return { success: false, error: "Bir hata olustu." };
  }
}
