"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

export async function updateStorefrontAction(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Giriş yapmanız gerekiyor." };
    }

    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const themeColor = formData.get("themeColor") as string;
    const announcement = formData.get("announcement") as string | null;
    const featuredProductId = formData.get("featuredProductId") as string | null;

    // Sosyal medya bağlantıları
    const socialInstagram = formData.get("socialInstagram") as string | null;
    const socialTwitter = formData.get("socialTwitter") as string | null;
    const socialYoutube = formData.get("socialYoutube") as string | null;
    const socialLinkedin = formData.get("socialLinkedin") as string | null;
    const socialTiktok = formData.get("socialTiktok") as string | null;
    const socialWebsite = formData.get("socialWebsite") as string | null;

    // Profil fotoğrafı yükleme (Vercel Blob)
    const avatarFile = formData.get("avatarFile") as File | null;
    let avatarUrl: string | undefined = undefined;
    if (avatarFile && avatarFile.size > 0) {
      try {
        const blob = await put(`avatars/${user.id}-${Date.now()}`, avatarFile, {
          access: "public",
          contentType: avatarFile.type,
        });
        avatarUrl = blob.url;
      } catch (blobErr) {
        console.error("Avatar yükleme hatası:", blobErr);
      }
    }

    // Kapak fotoğrafı yükleme (Vercel Blob)
    const coverFile = formData.get("coverFile") as File | null;
    let coverUrl: string | undefined = undefined;
    if (coverFile && coverFile.size > 0) {
      try {
        const blob = await put(`covers/${user.id}-${Date.now()}`, coverFile, {
          access: "public",
          contentType: coverFile.type,
        });
        coverUrl = blob.url;
      } catch (blobErr) {
        console.error("Kapak fotoğrafı yükleme hatası:", blobErr);
      }
    }

    const updateData: Record<string, any> = {
      name: name || user.name,
      bio: bio ?? null,
      themeColor: themeColor || "#1A1A1A",
      announcement: announcement ? announcement.trim() : null,
      featuredProductId: featuredProductId || null,
      socialInstagram: socialInstagram ? socialInstagram.trim() : null,
      socialTwitter: socialTwitter ? socialTwitter.trim() : null,
      socialYoutube: socialYoutube ? socialYoutube.trim() : null,
      socialLinkedin: socialLinkedin ? socialLinkedin.trim() : null,
      socialTiktok: socialTiktok ? socialTiktok.trim() : null,
      socialWebsite: socialWebsite ? socialWebsite.trim() : null,
    };

    if (avatarUrl) updateData.avatar = avatarUrl;
    if (coverUrl) updateData.cover = coverUrl;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    revalidatePath("/dashboard/storefront");
    revalidatePath(`/${user.username}`);
    revalidatePath(`/${updatedUser.username}`);

    return { success: true, message: "Değişiklikler başarıyla kaydedildi!" };
  } catch (error: any) {
    console.error("Vitrin güncelleme hatası:", error);
    return { success: false, error: error?.message || "Vitrin güncellenirken bir hata oluştu." };
  }
}
