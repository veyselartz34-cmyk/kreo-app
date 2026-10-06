import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import OverviewClient from "./OverviewClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <OverviewClient userName="Üretici" productsCount={0} meetingsCount={0} totalRevenue="₺0" salesCount={0} upcomingMeetings={[]} />;
  }

  // Fetch real count of user's products and meetings from DB
  const productsCount = await prisma.product.count({
    where: { userId: user.id }
  });

  const meetings = await prisma.meeting.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 3
  });

  const salesCount = meetings.length;
  const totalRevenue = salesCount > 0 ? `₺${salesCount * 499}` : "₺0";

  const upcoming = meetings.map(m => ({
    name: m.clientName,
    type: m.title,
    time: m.date
  }));

  const firstName = user.name.split(" ")[0];

  return (
    <OverviewClient 
      userName={firstName}
      productsCount={productsCount}
      meetingsCount={meetings.length}
      totalRevenue={totalRevenue}
      salesCount={salesCount}
      upcomingMeetings={upcoming}
    />
  );
}
