import type { Metadata } from "next";

import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">Welcome back, {session?.user?.name ?? "user"}.</p>
    </div>
  );
}
