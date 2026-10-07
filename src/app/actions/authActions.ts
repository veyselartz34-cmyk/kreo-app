"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";

// Resend istemcisi (Eger .env'de RESEND_API_KEY yoksa null veya fake obje gibi calisacak)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function registerAction(formData: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return { success: false, error: "Gecerli bir e-posta adresi giriniz." };
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: formData.email },
          { username: formData.username }
        ]
      }
    });

    if (existingUser) {
      return { success: false, error: "Bu e-posta veya kullanici adi zaten kullanimda." };
    }

    const hashedPassword = await bcrypt.hash(formData.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: formData.name,
        username: formData.username.toLowerCase().replace(/[^a-z0-9_]/g, ""),
        email: formData.email,
        password: hashedPassword,
        bio: "Yeni Kreo Ureticisi!",
      }
    });

    // 1. E-Posta dogrulama token'i olustur
    const token = uuidv4();
    await prisma.verificationToken.create({
      data: {
        identifier: newUser.email,
        token: token,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 saat gecerli
      }
    });

    // 2. Dogrulama linki olustur
    // Gercek ortamda BASE_URL (ornegin https://kreo.com) olmali, simdilik VERCEL_URL veya localhost aliyoruz
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const verificationLink = `${baseUrl}/verify?token=${token}`;

    // 3. E-Posta gonder (Eger API Key varsa)
    if (resend) {
      await resend.emails.send({
        from: "Kreo <noreply@kreo.com>", // Gercek domaininiz olmali (orn: noreply@kreo.com)
        to: newUser.email,
        subject: "Kreo - E-Posta Adresinizi Dogrulayin",
        html: `<p>Merhaba ${newUser.name},</p><p>Kreo'ya hos geldiniz! Lutfen e-posta adresinizi dogrulamak icin asagidaki linke tiklayin:</p><a href="${verificationLink}">E-postami Dogrula</a>`
      });
    } else {
      // Test asamasinda (API Key yokken) linki konsola basalim ki tiklayip test edebilelim
      console.log("------------------------------------------");
      console.log("TEST MODU: Yeni kullanici kayit oldu!");
      console.log(`Lutfen su linke tiklayarak dogrulayin: ${verificationLink}`);
      console.log("------------------------------------------");
    }

    // ARTIK KULLANICIYI DIREKT GIRIS YAPTIRMIYORUZ (Cunku once mailine gidip dogrulamasi lazim)
    
    return { success: true, message: "Kayit basarili! Lutfen e-posta adresinize gonderilen dogrulama linkine tiklayin." };
  } catch (error: any) {
    console.error("Register error:", error);
    return { success: false, error: error?.message || "Kayit olunurken bir hata olustu." };
  }
}

export async function loginAction(formData: {
  email: string;
  password: string;
}) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: formData.email }
    });

    if (!user) {
      return { success: false, error: "E-posta veya sifre hatali." };
    }

    // E-posta dogrulanmamissa girise izin verme!
    if (!user.emailVerified) {
      return { success: false, error: "Lutfen once e-posta adresinizi dogrulayin." };
    }

    const isPasswordValid = await bcrypt.compare(formData.password, user.password);

    if (!isPasswordValid) {
      return { success: false, error: "E-posta veya sifre hatali." };
    }

    // Set HTTP-only session cookie
    const cookieStore = await cookies();
    cookieStore.set("kreo_session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    revalidatePath("/dashboard");
    return { success: true, username: user.username };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, error: error?.message || "Giris yapilirken bir hata olustu." };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("kreo_session");
  revalidatePath("/");
  return { success: true };
}
