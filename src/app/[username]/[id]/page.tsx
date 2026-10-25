import prisma from "@/lib/prisma";
import ProductLandingClient from "./ProductLandingClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

// Vitrindeki demo kartlara tıklandığında gösterilecek zengin içerik kataloğu
const DEMO_PRODUCTS: Record<string, {
  title: string;
  description: string;
  price: number;
  type: string;
  icon: string;
  features: string[];
  faqs: { q: string; a: string }[];
}> = {
  "prod-1": {
    title: "1-e-1 Bireysel Danışmanlık & Strateji Seansı",
    description: "İçerik üreticiliği, dijital ürün geliştirme veya marka büyüme stratejileri üzerine 60 dakikalık derinlemesine birebir görüşme. Görüşme öncesi analiz formu ve görüşme sonrası kişisel aksiyon planı dahildir.",
    price: 1450,
    type: "Birebir Görüşme",
    icon: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
    features: [
      "60 Dakika Google Meet Üzerinden Canlı & Birebir Görüşme",
      "Kişiye ve Hesabınıza Özel Hazırlık & Analiz Raporu",
      "Görüşme Sonrası Somut 30 Günlük Yol Haritası (PDF Notları)",
      "HD Video ve Ses Kaydı Arşivi",
      "Görüşme Sonrası 14 Gün E-posta İle Soru & Cevap Desteği"
    ],
    faqs: [
      {
        q: "Görüşme tarihi ve saatini nasıl belirleyeceğim?",
        a: "Ödemenizi tamamladıktan sonra canlı takvimimizden sizin için en uygun tarih ve saati tek tıkla rezerve edebilirsiniz. Toplantı bağlantısı anında e-postanıza gelir."
      },
      {
        q: "Görüşmeye nasıl katılacağım?",
        a: "Seçtiğiniz tarih ve saatte doğrudan Google Meet bağlantısı üzerinden katılabilirsiniz. Ekstra bir program yüklemenize gerek yoktur."
      },
      {
        q: "Görüşmeyi erteleyebilir miyim?",
        a: "Randevu saatinizden en geç 24 saat öncesine kadar e-posta veya panel üzerinden yeni bir güne erteleyebilirsiniz."
      }
    ]
  },
  "prod-2": {
    title: "Kapsamlı İçerik Üreticisi ve Dijital Gelir Kiti (Notion + PSD)",
    description: "Sıfırdan dijital ürün yaratma, kitle büyütme, e-posta listesi oluşturma ve aylık düzenli gelir elde etme şablonları. 50+ hazır sosyal medya şablonu, içerik takvimi ve satış hunisi taslakları.",
    price: 499,
    type: "Dijital Ürün",
    icon: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    features: [
      "Eksiksiz Notion İçerik ve Üretici İşletim Sistemi Şablonu",
      "50+ Düzenlenebilir Figma ve PSD Sosyal Medya Tasarım Şablonu",
      "Satış Hunisi (Funnel) ve E-posta Pazarlama Formülleri",
      "Ömür Boyu Güncellemeler ve Gelecek Versiyonlar",
      "Doğrudan İndirme ve Hızlı Başlangıç Video Rehberi"
    ],
    faqs: [
      {
        q: "Satın aldıktan sonra dosyalarıma nasıl ulaşırım?",
        a: "Ödemeniz tamamlandığı anda indirme bağlantısı ekranınızda açılır ve faturanızla birlikte e-posta adresinize gönderilir."
      },
      {
        q: "Notion veya Figma kullanmayı bilmem gerekiyor mu?",
        a: "Hayır. Kitin içerisinde sıfırdan başlayanlar için adım adım 10 dakikalık video kurulum rehberi bulunmaktadır."
      }
    ]
  },
  "prod-3": {
    title: "Özel Üretici Kulübü & Haftalık Canlı Yayınlar",
    description: "Her hafta düzenli soru-cevap seansları, özel Discord topluluğu, yeni dijital ürün vaka analizleri ve networking imkanı sunan seçkin üretici kulübü.",
    price: 199,
    type: "Topluluk & Abonelik",
    icon: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    features: [
      "Haftalık Canlı Strateji ve İnceleme Yayınları",
      "Özel Discord Kanallarına ve Üretici Ağına Erişim",
      "Aylık Dijital Şablon ve E-kitap Hediyeleri",
      "Doğrudan Soru Sorma ve Geri Bildirim Alma Hakkı",
      "İstediğiniz Zaman Tek Tıkla Kolayca İptal Edebilme Esnekliği"
    ],
    faqs: [
      {
        q: "Yayınları kaçırırsam tekrar izleyebilir miyim?",
        a: "Evet, tüm haftalık oturumlar kaydedilir ve üyelik panelinizden istediğiniz zaman tekrar izlenebilir."
      },
      {
        q: "İstediğim zaman aboneliğimi iptal edebilir miyim?",
        a: "Kesinlikle! Hiçbir taahhüt yoktur, dilediğiniz an tek tıkla üyeliğinizi sonlandırabilirsiniz."
      }
    ]
  }
};

export default async function ProductLandingPage({
  params,
}: {
  params: Promise<{ username: string; id: string }>;
}) {
  const resolvedParams = await params;
  const username = resolvedParams.username.toLowerCase();
  const productId = resolvedParams.id;

  // 1. Önce veritabanında satıcıyı kontrol et
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      products: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    return notFound();
  }

  // 2. Ürün veritabanında var mı kontrol et
  let product = user.products.find((p) => p.id === productId);

  // 3. Veritabanında yoksa ama demo ürün ID'si girilmişse zengin demo veriyi yükle
  if (!product && (DEMO_PRODUCTS[productId] || productId.startsWith("prod-") || productId.startsWith("demo-"))) {
    const demoData = DEMO_PRODUCTS[productId] || DEMO_PRODUCTS["prod-1"];
    const otherDemoProducts = Object.entries(DEMO_PRODUCTS)
      .filter(([id]) => id !== productId)
      .map(([id, p]) => ({
        id,
        title: p.title,
        description: p.description,
        price: p.price,
        type: p.type,
        icon: p.icon,
      }));

    return (
      <ProductLandingClient
        product={{
          id: productId,
          title: demoData.title,
          description: demoData.description,
          price: demoData.price,
          type: demoData.type,
          icon: demoData.icon,
          color: user.themeColor || "#D32F2F",
          fileSize: "145 MB",
          features: JSON.stringify(demoData.features),
          faqs: JSON.stringify(demoData.faqs),
          createdAt: new Date().toISOString(),
        }}
        creator={{
          name: user.name,
          username: user.username,
          avatar: user.avatar,
          bio: user.bio,
          themeColor: user.themeColor || "#D32F2F",
          socialInstagram: user.socialInstagram,
          socialTwitter: user.socialTwitter,
          socialYoutube: user.socialYoutube,
          socialLinkedin: user.socialLinkedin,
          socialTiktok: user.socialTiktok,
          socialWebsite: user.socialWebsite,
        }}
        otherProducts={
          user.products.length > 0
            ? user.products
                .filter((p) => p.id !== productId)
                .slice(0, 3)
                .map((p) => ({
                  id: p.id,
                  title: p.title,
                  description: p.description,
                  price: p.price,
                  type: p.type,
                  icon: p.icon,
                }))
            : otherDemoProducts
        }
      />
    );
  }

  if (!product) {
    return notFound();
  }

  const otherProducts = user.products
    .filter((p) => p.id !== productId)
    .slice(0, 3)
    .map((p) => ({
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
        features: product.features,
        faqs: product.faqs,
        createdAt: product.createdAt.toISOString(),
      }}
      creator={{
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        bio: user.bio,
        themeColor: user.themeColor || "#D32F2F",
        socialInstagram: user.socialInstagram,
        socialTwitter: user.socialTwitter,
        socialYoutube: user.socialYoutube,
        socialLinkedin: user.socialLinkedin,
        socialTiktok: user.socialTiktok,
        socialWebsite: user.socialWebsite,
      }}
      otherProducts={otherProducts}
    />
  );
}
