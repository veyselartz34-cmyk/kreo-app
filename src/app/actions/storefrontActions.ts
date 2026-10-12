"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

export async function updateStorefrontAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Giris yapmaniz gerekiyor.");
  }

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const themeColor = formData.get("themeColor") as string;
  const announcement = formData.get("announcement") as string | null;
  const featuredProductId = formData.get("featuredProductId") as string | null;

  // Social links
  const socialInstagram = formData.get("socialInstagram") as string | null;
  const socialTwitter = formData.get("socialTwitter") as string | null;
  const socialYoutube = formData.get("socialYoutube") as string | null;
  const socialLinkedin = formData.get("socialLinkedin") as string | null;
  const socialTiktok = formData.get("socialTiktok") as string | null;
  const socialWebsite = formData.get("socialWebsite") as string | null;

  // Handle avatar upload
  const avatarFile = formData.get("avatarFile") as File | null;
  let avatarUrl: string | undefined = undefined;
  if (avatarFile && avatarFile.size > 0) {
    const blob = await put(`avatars/${user.id}-${Date.now()}`, avatarFile, {
      access: "public",
      contentType: avatarFile.type,
    });
    avatarUrl = blob.url;
  }

  // Handle cover upload
  const coverFile = formData.get("coverFile") as File | null;
  let coverUrl: string | undefined = undefined;
  if (coverFile && coverFile.size > 0) {
    const blob = await put(`covers/${user.id}-${Date.now()}`, coverFile, {
      access: "public",
      contentType: coverFile.type,
    });
    coverUrl = blob.url;
  }

  const updateData: Record<string, any> = {
    name,
    bio,
    themeColor,
    announcement: announcement || null,
    featuredProductId: featuredProductId || null,
    socialInstagram: socialInstagram || null,
    socialTwitter: socialTwitter || null,
    socialYoutube: socialYoutube || null,
    socialLinkedin: socialLinkedin || null,
    socialTiktok: socialTiktok || null,
    socialWebsite: socialWebsite || null,
  };

  if (avatarUrl) updateData.avatar = avatarUrl;
  if (coverUrl) updateData.cover = coverUrl;

  await prisma.user.update({
    where: { id: user.id },
    data: updateData,
  });

  revalidatePath("/dashboard/storefront");
  revalidatePath(`/${user.username}`);
  return { success: true };
}
