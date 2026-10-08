import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import CustomersClient from "./CustomersClient";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <CustomersClient initialCustomers={[]} />;
  }

  // Fetch actual customers from the DB
  const dbCustomers = await prisma.customer.findMany({
    where: { creatorId: user.id },
    include: {
      orders: {
        include: { product: true },
        orderBy: { createdAt: "desc" },
        take: 1
      }
    },
    orderBy: { createdAt: "desc" },
  });

  const customers = dbCustomers.map(c => {
    const lastOrder = c.orders[0];
    return {
      id: c.id,
      name: c.name,
      email: c.email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=random`,
      product: lastOrder ? lastOrder.product.title : "Kayıtlı",
      amount: lastOrder ? `₺${lastOrder.amount}` : "₺0",
      date: new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short", year: "numeric" }).format(new Date(c.createdAt)),
      status: "Aktif" // or calculate based on logic
    };
  });

  return <CustomersClient initialCustomers={customers} />;
}
