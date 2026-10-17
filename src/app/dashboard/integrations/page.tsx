import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import IntegrationsClient from "./IntegrationsClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function IntegrationsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      googleAnalyticsId: true,
      metaPixelId: true,
      googleCalendarEmail: true,
      discordWebhookUrl: true,
      mailchimpApiKey: true,
      mailchimpListId: true,
      customWebhookUrl: true,
      webhookSecret: true,
    },
  });

  return (
    <IntegrationsClient 
      initialData={{
        googleAnalyticsId: dbUser?.googleAnalyticsId || "",
        metaPixelId: dbUser?.metaPixelId || "",
        googleCalendarEmail: dbUser?.googleCalendarEmail || "",
        discordWebhookUrl: dbUser?.discordWebhookUrl || "",
        mailchimpApiKey: dbUser?.mailchimpApiKey || "",
        mailchimpListId: dbUser?.mailchimpListId || "",
        customWebhookUrl: dbUser?.customWebhookUrl || "",
        webhookSecret: dbUser?.webhookSecret || "",
      }} 
    />
  );
}
