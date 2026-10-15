"use server";

import { AuthError } from "next-auth";

import { signIn, signOut } from "@/auth";
import { signInSchema } from "@/validators/auth";

export type FieldErrors = Record<string, string>;

export type AuthResult = {
  error?: string;
  fieldErrors?: FieldErrors;
  success?: boolean;
};

export async function signInWithCredentials(
  _prevState: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const rawData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const validated = signInSchema.safeParse(rawData);
  if (!validated.success) {
    const fieldErrors: FieldErrors = {};
    for (const issue of validated.error.issues) {
      const field = issue.path[0]?.toString();
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return { fieldErrors };
  }

  try {
    await signIn("credentials", {
      username: validated.data.username,
      password: validated.data.password,
      redirectTo: "/dashboard",
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid username or password" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/sign-in" });
}
