import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import EditProductClient from "./EditProductClient";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  const { id } = await params;

  if (!user) {
    redirect("/login");
  }

  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product || product.userId !== user.id) {
    redirect("/dashboard/products");
  }

  return <EditProductClient product={product} />;
}
