import { getCurrentUser } from "@/lib/auth";
import SettingsClient from "./SettingsClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <SettingsClient 
      initialData={{
        name: user.name,
        username: user.username,
        bio: user.bio || "",
        avatar: user.avatar || "",
        cover: user.cover || "",
        emailNotifications: user.emailNotifications,
      }} 
    />
  );
}
