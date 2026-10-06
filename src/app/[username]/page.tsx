import prisma from "@/lib/prisma";
import StorefrontClient from "./StorefrontClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function StorefrontPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const username = resolvedParams.username;

  // Find creator by username
  const creator = await prisma.user.findUnique({
    where: { username: username.toLowerCase() },
    include: {
      products: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!creator) {
    // If not found in DB, fallback to seed user if username matches nuhveysel
    if (username.toLowerCase() === "nuhveysel") {
      const defaultUser = await prisma.user.findFirst({
        include: { products: { orderBy: { createdAt: "desc" } } }
      });
      if (defaultUser) {
        return <StorefrontClient initialProducts={defaultUser.products.map(p => ({
          id: p.id,
          title: p.title,
          price: `₺${p.price}`,
          type: p.type
        }))} creatorName={defaultUser.name} username={defaultUser.username} bio={defaultUser.bio || ""} />;
      }
    }
    return notFound();
  }

  const formattedProducts = creator.products.map(p => ({
    id: p.id,
    title: p.title,
    price: `₺${p.price}`,
    type: p.type,
  }));

  return (
    <StorefrontClient 
      initialProducts={formattedProducts} 
      creatorName={creator.name}
      username={creator.username}
      bio={creator.bio || ""}
    />
  );
}
