import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import OrdersClient from "./OrdersClient";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <OrdersClient initialOrders={[]} totalRevenue={0} totalOrders={0} />;
  }

  const dbOrders = await prisma.order.findMany({
    where: { product: { userId: user.id } },
    include: { product: true, customer: true },
    orderBy: { createdAt: "desc" },
  });

  const orders = dbOrders.map(o => ({
    id: o.id.slice(-6).toUpperCase(),
    customer: o.customer.name,
    email: o.customer.email,
    product: o.product.title,
    amount: o.amount,
    date: new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(o.createdAt)),
    status: o.status === "SUCCESS" ? "Tamamlandı" : o.status === "PENDING" ? "Beklemede" : "İade Edildi"
  }));

  const totalOrders = orders.length;
  const totalRevenue = dbOrders.filter(o => o.status === "SUCCESS").reduce((sum, o) => sum + o.amount, 0);

  return (
    <OrdersClient 
      initialOrders={orders} 
      totalRevenue={totalRevenue} 
      totalOrders={totalOrders} 
    />
  );
}
