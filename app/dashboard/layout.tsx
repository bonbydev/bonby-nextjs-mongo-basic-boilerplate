import Link from "next/link";

import { signOutAction } from "@/actions/auth.actions";
import { auth } from "@/auth";
import { APP_NAME } from "@/constants";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="bg-background min-h-screen">
      <header className="border-border border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/dashboard" className="text-sm font-semibold">
            {APP_NAME}
          </Link>

          <div className="flex items-center gap-4">
            {session?.user && (
              <span className="text-muted-foreground text-sm">
                {session.user.name}
                <span className="text-muted-foreground/60 ml-1">({session.user.role})</span>
              </span>
            )}
            <form action={signOutAction}>
              <button
                type="submit"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
