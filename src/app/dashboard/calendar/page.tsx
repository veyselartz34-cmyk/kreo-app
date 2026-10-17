import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import CalendarClient from "./CalendarClient";

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <CalendarClient initialMeetings={[]} />;
  }

  const dbMeetings = await prisma.meeting.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { workingHours: true },
  });

  const meetings = dbMeetings.map(m => ({
    id: m.id,
    title: m.title,
    client: m.clientName,
    email: m.clientEmail,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(m.clientName)}&background=random`,
    date: m.date,
    time: m.time,
    link: m.link || "https://meet.google.com/new",
    status: m.status,
  }));

  return (
    <CalendarClient 
      initialMeetings={meetings} 
      initialWorkingHours={dbUser?.workingHours ? JSON.parse(dbUser.workingHours) : null} 
    />
  );
}
