import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import StorefrontClient from "./StorefrontClient";

export const dynamic = "force-dynamic";

export default async function StorefrontPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <StorefrontClient initialData={{
      name: "", bio: "", themeColor: "#1A1A1A", username: "",
      avatar: null, cover: null, announcement: "",
      featuredProductId: null,
      socialInstagram: "", socialTwitter: "", socialYoutube: "",
      socialLinkedin: "", socialTiktok: "", socialWebsite: "",
      products: []
    }} />;
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      name: true, bio: true, themeColor: true, username: true,
      avatar: true, cover: true, announcement: true, featuredProductId: true,
      socialInstagram: true, socialTwitter: true, socialYoutube: true,
      socialLinkedin: true, socialTiktok: true, socialWebsite: true,
    }
  });

  const products = await prisma.product.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const productData = products.map(p => ({
    id: p.id,
    title: p.title,
    type: p.type,
    price: p.price,
    icon: p.icon,
  }));

  return (
    <StorefrontClient
      initialData={{
        name: dbUser?.name || "",
        bio: dbUser?.bio || "",
        themeColor: dbUser?.themeColor || "#1A1A1A",
        username: dbUser?.username || "",
        avatar: dbUser?.avatar || null,
        cover: dbUser?.cover || null,
        announcement: dbUser?.announcement || "",
        featuredProductId: dbUser?.featuredProductId || null,
        socialInstagram: dbUser?.socialInstagram || "",
        socialTwitter: dbUser?.socialTwitter || "",
        socialYoutube: dbUser?.socialYoutube || "",
        socialLinkedin: dbUser?.socialLinkedin || "",
        socialTiktok: dbUser?.socialTiktok || "",
        socialWebsite: dbUser?.socialWebsite || "",
        products: productData,
      }}
    />
  );
}
