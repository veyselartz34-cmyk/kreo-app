import prisma from "@/lib/prisma";
import CheckoutClient from "./CheckoutClient";
import { notFound } from "next/navigation";

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
    include: { user: true }
  });

  if (!product) {
    return notFound();
  }

  const productData = {
    id: product.id,
    title: product.title,
    price: product.price,
    type: product.type,
    icon: product.icon,
    fileUrl: product.fileUrl,
    creatorName: product.user.name,
    creatorUsername: product.user.username,
  };

  return <CheckoutClient product={productData} />;
}
