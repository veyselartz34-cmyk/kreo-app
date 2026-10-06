import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <ProductsClient initialProducts={[]} />;
  }

  const dbProducts = await prisma.product.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const products = dbProducts.map(p => ({
    id: p.id,
    title: p.title,
    price: `₺${p.price}`,
    sales: 0,
    status: "Aktif",
    type: p.type,
    icon: p.type === "Abonelik" ? "Lock" : "FileText",
  }));

  return <ProductsClient initialProducts={products} />;
}
