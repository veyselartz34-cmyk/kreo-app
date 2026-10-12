import prisma from "@/lib/prisma";
import ProductLandingClient from "./ProductLandingClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProductLandingPage({
  params,
}: {
  params: Promise<{ username: string; id: string }>;
}) {
  const resolvedParams = await params;
  const username = resolvedParams.username.toLowerCase();
  const productId = resolvedParams.id;

  // Ürünü ve üreticiyi getir
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      user: {
        include: {
          products: {
            where: { id: { not: productId } },
            take: 3,
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  // Kullanıcı adı eşleşiyor mu kontrolü
  if (product.user.username.toLowerCase() !== username) {
    return notFound();
  }

  const otherProducts = product.user.products.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    type: p.type,
    icon: p.icon,
  }));

  return (
    <ProductLandingClient
      product={{
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        type: product.type,
        icon: product.icon,
        color: product.color,
        fileSize: product.fileSize,
        createdAt: product.createdAt.toISOString(),
      }}
      creator={{
        name: product.user.name,
        username: product.user.username,
        avatar: product.user.avatar,
        bio: product.user.bio,
        themeColor: product.user.themeColor || "#1A1A1A",
        socialInstagram: product.user.socialInstagram,
        socialTwitter: product.user.socialTwitter,
        socialYoutube: product.user.socialYoutube,
        socialLinkedin: product.user.socialLinkedin,
        socialTiktok: product.user.socialTiktok,
        socialWebsite: product.user.socialWebsite,
      }}
      otherProducts={otherProducts}
    />
  );
}
