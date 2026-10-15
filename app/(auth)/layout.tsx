import { APP_NAME } from "@/constants";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-4">
      <div className="border-border w-full max-w-sm rounded-xl border p-8 shadow-sm">
        <p className="text-muted-foreground mb-6 text-center text-sm font-medium">{APP_NAME}</p>
        {children}
      </div>
    </div>
  );
}
