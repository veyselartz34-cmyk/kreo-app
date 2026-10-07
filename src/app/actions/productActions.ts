"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

export async function createProductAction(formData: FormData) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, error: "Lutfen once giris yapin." };
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const type = formData.get("type") as string;
    const icon = formData.get("icon") as string;
    
    // Asil urun dosyasi
    const file = formData.get("file") as File | null;
    let fileUrl = null;
    let fileSize = null;

    if (file && file.size > 0) {
      // Dosyayi Vercel Blob'a yukle
      // Eger token yoksa bu asama hata verebilir, o yuzden try/catch icine alalim
      try {
        const blob = await put(file.name, file, { access: 'public' });
        fileUrl = blob.url;
        fileSize = (file.size / (1024 * 1024)).toFixed(2) + " MB"; // MB cinsinden
      } catch (uploadError) {
        console.error("Blob upload hatasi (Muhtemelen BLOB_READ_WRITE_TOKEN yok):", uploadError);
        // Eger blob hatasi verirse islemi iptal edebiliriz veya dosyasiz devam edebiliriz.
        // Biz dosyasiz devam etmemek icin hata donelim.
        return { success: false, error: "Dosya yuklenemedi. Lutfen Vercel Blob ayarlarinin yapildigindan emin olun." };
      }
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        description: description || "",
        price,
        type: type || "Dijital Urun",
        icon: icon,
        fileUrl: fileUrl,
        fileSize: fileSize,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard/products");
    revalidatePath(`/${user.username}`);

    return { success: true, product: newProduct };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Urun eklenirken bir hata olustu." };
  }
}

export async function deleteProductAction(productId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Lutfen once giris yapin." };
    }

    // Verify ownership
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product || product.userId !== user.id) {
      return { success: false, error: "Urun bulunamadi veya yetkiniz yok." };
    }

    await prisma.product.delete({
      where: { id: productId }
    });

    revalidatePath("/dashboard/products");
    revalidatePath(`/${user.username}`);

    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Urun silinirken bir hata olustu." };
  }
}

export async function updateProductAction(productId: string, formData: FormData) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, error: "Lutfen once giris yapin." };
    }

    // Verify ownership
    const existing = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!existing || existing.userId !== user.id) {
      return { success: false, error: "Urun bulunamadi veya yetkiniz yok." };
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const type = formData.get("type") as string;
    const icon = formData.get("icon") as string;
    
    // File logic could be added here if needed, but for now we skip file re-upload
    // to keep the update process simple. Or handle file replacement if a new file is uploaded.
    const file = formData.get("file") as File | null;
    let fileUrl = existing.fileUrl;
    let fileSize = existing.fileSize;

    if (file && file.size > 0) {
      try {
        const blob = await put(file.name, file, { access: 'public' });
        fileUrl = blob.url;
        fileSize = (file.size / (1024 * 1024)).toFixed(2) + " MB";
      } catch (uploadError) {
        console.error("Blob upload hatasi:", uploadError);
        return { success: false, error: "Yeni dosya yuklenemedi." };
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        title,
        description: description || "",
        price,
        type: type || existing.type,
        ...(icon && { icon }), // update icon only if new one is provided
        fileUrl,
        fileSize,
      },
    });

    revalidatePath("/dashboard/products");
    revalidatePath(`/${user.username}`);

    return { success: true, product: updatedProduct };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Urun guncellenirken bir hata olustu." };
  }
}
