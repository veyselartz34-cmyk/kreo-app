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
          description: p.description,
          price: `₺${p.price}`,
          type: p.type,
          iconStr: p.icon
        }))} creatorName={defaultUser.name} username={defaultUser.username} bio={defaultUser.bio || ""} avatar={defaultUser.avatar} cover={defaultUser.cover}
          themeColor={defaultUser.themeColor || "#1A1A1A"}
          announcement={defaultUser.announcement}
          featuredProductId={defaultUser.featuredProductId}
          socialInstagram={defaultUser.socialInstagram}
          socialTwitter={defaultUser.socialTwitter}
          socialYoutube={defaultUser.socialYoutube}
          socialLinkedin={defaultUser.socialLinkedin}
          socialTiktok={defaultUser.socialTiktok}
          socialWebsite={defaultUser.socialWebsite}
        />;
      }
    }
    return notFound();
  }

  const formattedProducts = creator.products.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: `₺${p.price}`,
    type: p.type,
    iconStr: p.icon
  }));

  return (
    <>
      {creator.googleAnalyticsId && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${creator.googleAnalyticsId}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${creator.googleAnalyticsId}');
              `,
            }}
          />
        </>
      )}
      {creator.metaPixelId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${creator.metaPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}
      <StorefrontClient 
        initialProducts={formattedProducts} 
        creatorName={creator.name}
        username={creator.username}
        bio={creator.bio || ""}
        avatar={creator.avatar}
        cover={creator.cover}
        themeColor={creator.themeColor || "#1A1A1A"}
        announcement={creator.announcement}
        featuredProductId={creator.featuredProductId}
        socialInstagram={creator.socialInstagram}
        socialTwitter={creator.socialTwitter}
        socialYoutube={creator.socialYoutube}
        socialLinkedin={creator.socialLinkedin}
        socialTiktok={creator.socialTiktok}
        socialWebsite={creator.socialWebsite}
      />
    </>
  );
}
