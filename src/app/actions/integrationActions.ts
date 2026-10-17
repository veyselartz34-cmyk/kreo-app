"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateIntegrationAction(data: {
  type: "googleAnalytics" | "metaPixel" | "googleCalendar" | "discord" | "mailchimp" | "customWebhook";
  disconnect?: boolean;
  value?: string;
  secondaryValue?: string;
}) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Yetkisiz işlem. Lütfen giriş yapın." };
    }

    const updateData: Record<string, any> = {};

    switch (data.type) {
      case "googleAnalytics":
        updateData.googleAnalyticsId = data.disconnect ? null : (data.value ? data.value.trim() : null);
        break;
      case "metaPixel":
        updateData.metaPixelId = data.disconnect ? null : (data.value ? data.value.trim() : null);
        break;
      case "googleCalendar":
        updateData.googleCalendarEmail = data.disconnect ? null : (data.value ? data.value.trim() : null);
        break;
      case "discord":
        updateData.discordWebhookUrl = data.disconnect ? null : (data.value ? data.value.trim() : null);
        break;
      case "mailchimp":
        updateData.mailchimpApiKey = data.disconnect ? null : (data.value ? data.value.trim() : null);
        updateData.mailchimpListId = data.disconnect ? null : (data.secondaryValue ? data.secondaryValue.trim() : null);
        break;
      case "customWebhook":
        updateData.customWebhookUrl = data.disconnect ? null : (data.value ? data.value.trim() : null);
        updateData.webhookSecret = data.disconnect ? null : (data.secondaryValue ? data.secondaryValue.trim() : null);
        break;
      default:
        return { success: false, error: "Bilinmeyen entegrasyon türü." };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    revalidatePath("/dashboard/integrations");
    revalidatePath(`/${user.username}`);

    const actionText = data.disconnect ? "bağlantısı kesildi." : "başarıyla bağlandı ve aktifleştirildi.";
    return { success: true, message: `Entegrasyon ${actionText}` };
  } catch (error: any) {
    console.error("Entegrasyon güncelleme hatası:", error);
    return { success: false, error: error?.message || "Entegrasyon güncellenirken bir hata oluştu." };
  }
}
