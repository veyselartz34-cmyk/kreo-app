"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createProductAction(formData: {
  title: string;
  description: string;
  price: number;
  type: string;
}) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, error: "Lütfen önce giriş yapın." };
    }

    const newProduct = await prisma.product.create({
      data: {
        title: formData.title,
        description: formData.description || "",
        price: formData.price,
        type: formData.type || "Dijital Ürün",
        userId: user.id,
      },
    });

    revalidatePath("/dashboard/products");
    revalidatePath(`/${user.username}`);

    return { success: true, product: newProduct };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Ürün eklenirken bir hata oluştu." };
  }
}
