"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

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
      return { success: false, error: "Bu e-posta veya kullanıcı adı zaten kullanımda." };
    }

    const hashedPassword = await bcrypt.hash(formData.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: formData.name,
        username: formData.username.toLowerCase().replace(/[^a-z0-9_]/g, ""),
        email: formData.email,
        password: hashedPassword,
        bio: "Yeni Kreo üreticisi!",
      }
    });

    // Set HTTP-only session cookie
    const cookieStore = await cookies();
    cookieStore.set("kreo_session", newUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    revalidatePath("/dashboard");
    return { success: true, username: newUser.username };
  } catch (error: any) {
    console.error("Register error:", error);
    return { success: false, error: error?.message || "Kayıt olunurken bir hata oluştu." };
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
      return { success: false, error: "E-posta veya şifre hatalı." };
    }

    const isPasswordValid = await bcrypt.compare(formData.password, user.password);

    if (!isPasswordValid) {
      return { success: false, error: "E-posta veya şifre hatalı." };
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
    return { success: false, error: error?.message || "Giriş yapılırken bir hata oluştu." };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("kreo_session");
  revalidatePath("/");
  return { success: true };
}
