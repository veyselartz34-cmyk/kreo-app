"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateStorefrontAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Giriş yapmanız gerekiyor.");
  }

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const themeColor = formData.get("themeColor") as string;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name,
      bio,
      themeColor
    }
  });

  revalidatePath("/dashboard/storefront");
  return { success: true };
}
