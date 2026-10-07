import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import DiscountsClient from "./DiscountsClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DiscountsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const dbCodes = await prisma.discountCode.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  // Calculate totals
  const activeCount = dbCodes.filter(c => c.isActive).length;
  const usedCount = dbCodes.reduce((acc, curr) => acc + curr.usedCount, 0);

  return (
    <DiscountsClient 
      initialCodes={dbCodes} 
      activeCount={activeCount} 
      usedCount={usedCount} 
    />
  );
}
