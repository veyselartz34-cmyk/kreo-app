import { cookies } from "next/headers";
import prisma from "./prisma";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("kreo_session")?.value;

    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      if (user) return user;
    }

    // Eger cerez yoksa veya bulunamadiysa, veritabanindaki ana uretici hesabini getir
    const creator = await prisma.user.findFirst({
      where: {
        OR: [
          { username: "nvk123" },
          { email: "nuhveysel@kreo.com" },
        ]
      }
    });

    if (creator) return creator;

    // Son care: veritabanindaki ilk kullaniciyi getir
    return await prisma.user.findFirst({
      orderBy: { createdAt: "asc" }
    });
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}
