import type { Metadata } from "next";

import { SignInForm } from "@/components/features/auth/sign-in-form";
import { APP_NAME } from "@/constants";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
        <p className="text-muted-foreground text-sm">Sign in to your {APP_NAME} account</p>
      </div>

      <SignInForm />

      <p className="text-muted-foreground text-center text-xs">
        Demo: admin / Admin@123 or user / User@123
      </p>
    </div>
  );
}
