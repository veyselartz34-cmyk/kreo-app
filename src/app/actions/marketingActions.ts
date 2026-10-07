"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createDiscountCodeAction(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Lütfen önce giriş yapın." };
    }

    const code = (formData.get("code") as string).toUpperCase().replace(/\s+/g, "");
    const discount = parseFloat(formData.get("discount") as string);
    const isPercent = formData.get("isPercent") === "true";
    const usageLimitRaw = formData.get("usageLimit") as string;
    const usageLimit = usageLimitRaw ? parseInt(usageLimitRaw) : null;

    if (!code || !discount) {
      return { success: false, error: "Kod ve indirim oranı zorunludur." };
    }

    // Check if code already exists for this user
    const existing = await prisma.discountCode.findUnique({
      where: {
        code_userId: {
          code,
          userId: user.id
        }
      }
    });

    if (existing) {
      return { success: false, error: "Bu kod zaten mevcut." };
    }

    const newCode = await prisma.discountCode.create({
      data: {
        code,
        discount,
        isPercent,
        usageLimit,
        userId: user.id
      }
    });

    revalidatePath("/dashboard/marketing/discounts");
    return { success: true, discountCode: newCode };
  } catch (error: any) {
    console.error("Error creating discount code:", error);
    return { success: false, error: "Kupon oluşturulurken bir hata oluştu." };
  }
}

export async function toggleDiscountCodeStatusAction(id: string, isActive: boolean) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: "Unauthorized" };

    await prisma.discountCode.updateMany({
      where: { id, userId: user.id },
      data: { isActive }
    });

    revalidatePath("/dashboard/marketing/discounts");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update" };
  }
}

export async function deleteDiscountCodeAction(id: string) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: "Unauthorized" };

    await prisma.discountCode.deleteMany({
      where: { id, userId: user.id }
    });

    revalidatePath("/dashboard/marketing/discounts");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete" };
  }
}
