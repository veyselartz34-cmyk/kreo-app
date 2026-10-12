import { getCurrentUser } from "@/lib/auth";
import SettingsClient from "./SettingsClient";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Kullanıcının siparişlerinden toplam ciroyu ve çekilebilir bakiyeyi hesapla
  const successfulOrders = await prisma.order.findMany({
    where: {
      product: { userId: user.id },
      status: "SUCCESS",
    },
    select: { amount: true, createdAt: true, id: true },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = successfulOrders.reduce((sum, order) => sum + order.amount, 0);
  // Bakiye (Pro plan için %100, Free için %95)
  const availableBalance = user.plan === "PRO" || user.isSubscribed ? totalRevenue : totalRevenue * 0.95;

  return (
    <SettingsClient 
      initialData={{
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio || "",
        avatar: user.avatar || "",
        cover: user.cover || "",
        emailNotifications: user.emailNotifications,
        iyzicoApiKey: user.iyzicoApiKey || "",
        iyzicoSecretKey: user.iyzicoSecretKey || "",
        iban: user.iban || "",
        plan: user.plan || "PRO",
        isSubscribed: user.isSubscribed,
        totalRevenue,
        availableBalance,
        recentOrdersCount: successfulOrders.length,
      }} 
    />
  );
}
