import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import CustomersClient from "./CustomersClient";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <CustomersClient initialCustomers={[]} />;
  }

  const meetings = await prisma.meeting.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const dbCustomers = meetings.map(m => ({
    id: m.id,
    name: m.clientName,
    email: m.clientEmail,
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop",
    product: m.title,
    amount: m.title.includes("Mentorluk") ? "₺999" : m.title.includes("Sistem") ? "₺499" : "₺199",
    date: m.date,
    status: m.status,
  }));

  return <CustomersClient initialCustomers={dbCustomers} />;
}
