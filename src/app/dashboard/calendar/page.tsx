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

  const meetings = dbMeetings.map(m => ({
    id: m.id,
    title: m.title,
    client: m.clientName,
    email: m.clientEmail,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    date: m.date,
    time: m.time,
    link: "https://meet.google.com/xyz-uvwx-yz",
    status: m.status,
  }));

  return <CalendarClient initialMeetings={meetings} />;
}
