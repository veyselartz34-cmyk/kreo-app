"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function updateSettingsAction(data: {
  name: string;
  username: string;
  bio: string;
  avatar: string | null;
  cover: string | null;
  emailNotifications: boolean;
  iyzicoApiKey?: string | null;
  iyzicoSecretKey?: string | null;
  iban?: string | null;
}) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Yetkisiz işlem. Lütfen giriş yapın." };
    }

    // Kullanıcı adı değiştiyse çakışma kontrolü
    const cleanUsername = data.username.trim().toLowerCase();
    if (cleanUsername !== user.username) {
      const existing = await prisma.user.findUnique({
        where: { username: cleanUsername },
      });
      if (existing) {
        return { success: false, error: "Bu kullanıcı adı zaten başka bir satıcı tarafından alınmış." };
      }
    }

    const updatePayload: Record<string, any> = {
      name: data.name.trim(),
      username: cleanUsername,
      bio: data.bio ?? null,
      avatar: data.avatar ?? null,
      cover: data.cover ?? null,
      emailNotifications: data.emailNotifications,
    };

    if (data.iyzicoApiKey !== undefined) updatePayload.iyzicoApiKey = data.iyzicoApiKey ? data.iyzicoApiKey.trim() : null;
    if (data.iyzicoSecretKey !== undefined) updatePayload.iyzicoSecretKey = data.iyzicoSecretKey ? data.iyzicoSecretKey.trim() : null;
    if (data.iban !== undefined) updatePayload.iban = data.iban ? data.iban.trim().replace(/\s+/g, '') : null;

    await prisma.user.update({
      where: { id: user.id },
      data: updatePayload,
    });

    revalidatePath("/dashboard/settings");
    revalidatePath(`/${cleanUsername}`);
    revalidatePath(`/${user.username}`);
    return { success: true, message: "Ayarlar başarıyla kaydedildi!" };
  } catch (error: any) {
    console.error("Settings update error:", error);
    return { success: false, error: error?.message || "Ayarlar kaydedilirken bir hata oluştu." };
  }
}

export async function updatePasswordAction(data: {
  currentPassword: string;
  newPassword: string;
}) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Yetkisiz işlem." };
    }

    if (!data.currentPassword || !data.newPassword) {
      return { success: false, error: "Lütfen mevcut ve yeni şifrenizi girin." };
    }

    if (data.newPassword.length < 6) {
      return { success: false, error: "Yeni şifre en az 6 karakter olmalıdır." };
    }

    const isMatch = await bcrypt.compare(data.currentPassword, user.password);
    if (!isMatch) {
      return { success: false, error: "Mevcut şifreniz hatalı." };
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return { success: true, message: "Şifreniz başarıyla güncellendi!" };
  } catch (error: any) {
    console.error("Password update error:", error);
    return { success: false, error: "Şifre güncellenirken bir hata oluştu." };
  }
}

export async function requestPayoutAction(data: {
  amount: number;
  iban: string;
}) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Yetkisiz işlem." };
    }

    if (!data.iban || data.iban.length < 15) {
      return { success: false, error: "Lütfen geçerli bir IBAN girin." };
    }

    if (data.amount <= 0) {
      return { success: false, error: "Çekilecek tutar 0'dan büyük olmalıdır." };
    }

    // IBAN'ı kullanıcıya da kaydet
    await prisma.user.update({
      where: { id: user.id },
      data: { iban: data.iban.trim().replace(/\s+/g, '') },
    });

    return { 
      success: true, 
      message: `₺${data.amount.toLocaleString("tr-TR")} tutarındaki çekim talebiniz alındı. Kazancınız kayıtlı IBAN hesabınıza en geç 24 saat içinde aktarılacaktır.` 
    };
  } catch (error: any) {
    console.error("Payout request error:", error);
    return { success: false, error: "Ödeme talebi oluşturulamadı." };
  }
}
