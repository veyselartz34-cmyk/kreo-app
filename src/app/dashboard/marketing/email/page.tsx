import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import EmailBuilderClient from "./EmailBuilderClient";

export const dynamic = "force-dynamic";

export default async function EmailMarketingPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <EmailBuilderClient products={[]} />;
  }

  const dbProducts = await prisma.product.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" }
  });

  const products = dbProducts.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price,
    type: p.type,
    icon: p.icon || "",
  }));

  return <EmailBuilderClient products={products} />;
}
