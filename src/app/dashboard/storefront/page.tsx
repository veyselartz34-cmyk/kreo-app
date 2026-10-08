import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import StorefrontClient from "./StorefrontClient";

export const dynamic = "force-dynamic";

export default async function StorefrontPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <StorefrontClient initialData={{ name: "", bio: "", themeColor: "#1A1A1A", products: [] }} />;
  }

  // Get user details
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { name: true, bio: true, themeColor: true }
  });

  // Get a few products for preview
  const products = await prisma.product.findMany({
    where: { userId: user.id },
    take: 3
  });

  const productData = products.map(p => ({ title: p.title, type: p.type }));

  return (
    <StorefrontClient 
      initialData={{
        name: dbUser?.name || "",
        bio: dbUser?.bio || "",
        themeColor: dbUser?.themeColor || "#1A1A1A",
        products: productData
      }}
    />
  );
}
