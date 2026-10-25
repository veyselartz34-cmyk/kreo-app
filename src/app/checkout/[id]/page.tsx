import prisma from "@/lib/prisma";
import CheckoutClient from "./CheckoutClient";
import { notFound } from "next/navigation";

const DEMO_PRODUCTS: Record<string, {
  title: string;
  price: number;
  type: string;
  icon: string;
  fileUrl?: string;
}> = {
  "prod-1": {
    title: "1-e-1 Bireysel Danışmanlık & Strateji Seansı",
    price: 1450,
    type: "Birebir Görüşme",
    icon: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
  },
  "prod-2": {
    title: "Kapsamlı İçerik Üreticisi ve Dijital Gelir Kiti (Notion + PSD)",
    price: 499,
    type: "Dijital Ürün",
    icon: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    fileUrl: "https://cdn.example.com/kreo-creator-kit-2025.zip"
  },
  "prod-3": {
    title: "Özel Üretici Kulübü & Haftalık Canlı Yayınlar",
    price: 199,
    type: "Topluluk & Abonelik",
    icon: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
  }
};

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { user: true }
  });

  if (product) {
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

  // Demo ürün kontrolü
  if (DEMO_PRODUCTS[productId] || productId.startsWith("prod-") || productId.startsWith("demo-")) {
    const demo = DEMO_PRODUCTS[productId] || DEMO_PRODUCTS["prod-1"];
    // Sistemdeki ilk kayıtlı üreticiyi veya varsayılan üreticiyi bul
    const defaultUser = await prisma.user.findFirst();

    const productData = {
      id: productId,
      title: demo.title,
      price: demo.price,
      type: demo.type,
      icon: demo.icon,
      fileUrl: demo.fileUrl || null,
      creatorName: defaultUser ? defaultUser.name : "Nuh Veysel Kızılırmak",
      creatorUsername: defaultUser ? defaultUser.username : "nnv1234",
    };
    return <CheckoutClient product={productData} />;
  }

  return notFound();
}
