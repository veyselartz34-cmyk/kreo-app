"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function completeSubscriptionAction() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Yetkisiz" };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { isSubscribed: true },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Subscription error:", error);
    return { success: false, error: "Bir hata olustu." };
  }
}
