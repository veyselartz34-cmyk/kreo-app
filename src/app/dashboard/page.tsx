import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import OverviewClient from "./OverviewClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <OverviewClient 
      userName="Üretici" 
      productsCount={0} 
      totalRevenue={0} 
      salesCount={0} 
      recentOrders={[]} 
      topProducts={[]}
      chartData={[]}
    />;
  }

  const productsCount = await prisma.product.count({
    where: { userId: user.id }
  });

  const orders = await prisma.order.findMany({
    where: { product: { userId: user.id }, status: "SUCCESS" },
    include: { product: true, customer: true },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const salesCount = orders.length;

  const recentOrders = orders.slice(0, 5).map(o => ({
    id: o.id,
    customerName: o.customer.name,
    customerEmail: o.customer.email,
    productName: o.product.title,
    amount: o.amount,
    date: new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(o.createdAt))
  }));

  // Top Products aggregation
  const productSales: Record<string, { title: string, count: number, revenue: number }> = {};
  for (const order of orders) {
    if (!productSales[order.productId]) {
      productSales[order.productId] = { title: order.product.title, count: 0, revenue: 0 };
    }
    productSales[order.productId].count += 1;
    productSales[order.productId].revenue += order.amount;
  }
  
  const topProducts = Object.values(productSales)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 4);

  // Chart Data (Last 7 days revenue)
  const chartDataMap: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayStr = new Intl.DateTimeFormat("tr-TR", { weekday: 'short' }).format(d);
    chartDataMap[dayStr] = 0;
  }

  orders.forEach(o => {
    const d = new Date(o.createdAt);
    // only if within last 7 days
    const diffTime = Math.abs(new Date().getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if (diffDays <= 7) {
      const dayStr = new Intl.DateTimeFormat("tr-TR", { weekday: 'short' }).format(d);
      if (chartDataMap[dayStr] !== undefined) {
        chartDataMap[dayStr] += o.amount;
      }
    }
  });

  const chartData = Object.keys(chartDataMap).map(key => ({
    name: key,
    revenue: chartDataMap[key]
  }));

  const firstName = user.name.split(" ")[0];

  return (
    <OverviewClient 
      userName={firstName}
      productsCount={productsCount}
      totalRevenue={totalRevenue}
      salesCount={salesCount}
      recentOrders={recentOrders}
      topProducts={topProducts}
      chartData={chartData}
    />
  );
}
