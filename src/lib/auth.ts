import { cookies } from "next/headers";
import prisma from "./prisma";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("kreo_session")?.value;

    if (!userId) {
      // If no session cookie, return the default seed user or null
      return await prisma.user.findFirst({
        where: { email: "nuhveysel@kreo.com" }
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return await prisma.user.findFirst({
        where: { email: "nuhveysel@kreo.com" }
      });
    }

    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}
