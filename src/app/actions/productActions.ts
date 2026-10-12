"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

export async function createProductAction(formData: FormData) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, error: "Lütfen önce giriş yapın." };
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const type = formData.get("type") as string;
    const icon = formData.get("icon") as string;
    const features = formData.get("features") as string | null;
    const faqs = formData.get("faqs") as string | null;
    
    // Asıl ürün dosyası
    const file = formData.get("file") as File | null;
    let fileUrl = null;
    let fileSize = null;

    if (file && file.size > 0) {
      try {
        const blob = await put(file.name, file, { access: 'public' });
        fileUrl = blob.url;
        fileSize = (file.size / (1024 * 1024)).toFixed(2) + " MB";
      } catch (uploadError) {
        console.error("Blob upload hatası:", uploadError);
        return { success: false, error: "Dosya yüklenemedi. Lütfen Vercel Blob ayarlarının yapıldığından emin olun." };
      }
    }

    const newProduct = await prisma.product.create({
      data: {
        title: title.trim(),
        description: description ? description.trim() : "",
        price: isNaN(price) ? 0 : price,
        type: type || "Dijital Ürün",
        icon: icon || null,
        fileUrl: fileUrl,
        fileSize: fileSize,
        features: features ? features.trim() : null,
        faqs: faqs ? faqs.trim() : null,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard/products");
    revalidatePath(`/${user.username}`);
    revalidatePath(`/${user.username}/${newProduct.id}`);

    return { success: true, product: newProduct };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Ürün eklenirken bir hata oluştu." };
  }
}

export async function deleteProductAction(productId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Lütfen önce giriş yapın." };
    }

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product || product.userId !== user.id) {
      return { success: false, error: "Ürün bulunamadı veya yetkiniz yok." };
    }

    await prisma.product.delete({
      where: { id: productId }
    });

    revalidatePath("/dashboard/products");
    revalidatePath(`/${user.username}`);

    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Ürün silinirken bir hata oluştu." };
  }
}

export async function updateProductAction(productId: string, formData: FormData) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, error: "Lütfen önce giriş yapın." };
    }

    const existing = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!existing || existing.userId !== user.id) {
      return { success: false, error: "Ürün bulunamadı veya yetkiniz yok." };
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const type = formData.get("type") as string;
    const icon = formData.get("icon") as string;
    const features = formData.get("features") as string | null;
    const faqs = formData.get("faqs") as string | null;
    
    const file = formData.get("file") as File | null;
    let fileUrl = existing.fileUrl;
    let fileSize = existing.fileSize;

    if (file && file.size > 0) {
      try {
        const blob = await put(file.name, file, { access: 'public' });
        fileUrl = blob.url;
        fileSize = (file.size / (1024 * 1024)).toFixed(2) + " MB";
      } catch (uploadError) {
        console.error("Blob upload hatası:", uploadError);
        return { success: false, error: "Yeni dosya yüklenemedi." };
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        title: title ? title.trim() : existing.title,
        description: description !== null ? description.trim() : existing.description,
        price: isNaN(price) ? existing.price : price,
        type: type || existing.type,
        ...(icon && { icon }),
        fileUrl,
        fileSize,
        features: features !== null ? features.trim() : existing.features,
        faqs: faqs !== null ? faqs.trim() : existing.faqs,
      },
    });

    revalidatePath("/dashboard/products");
    revalidatePath(`/${user.username}`);
    revalidatePath(`/${user.username}/${productId}`);

    return { success: true, product: updatedProduct };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Ürün güncellenirken bir hata oluştu." };
  }
}
