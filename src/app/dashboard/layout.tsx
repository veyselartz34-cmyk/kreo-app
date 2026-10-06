import { getCurrentUser } from "@/lib/auth";
import DashboardLayoutClient from "./DashboardLayoutClient";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  const userProp = user
    ? {
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: user.avatar || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop",
      }
    : {
        name: "Üretici",
        email: "user@kreo.com",
        username: "nuhveysel",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop",
      };

  return <DashboardLayoutClient user={userProp}>{children}</DashboardLayoutClient>;
}
