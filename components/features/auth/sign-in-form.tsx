"use client";

import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

import { signInWithCredentials, type AuthResult } from "@/actions/auth.actions";

const initialState: AuthResult = {};

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(signInWithCredentials, initialState);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          required
          autoComplete="username"
          aria-invalid={!!state.fieldErrors?.username}
          aria-describedby={state.fieldErrors?.username ? "username-error" : undefined}
          className={`w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-colors outline-none ${
            state.fieldErrors?.username
              ? "border-destructive focus:border-destructive"
              : "border-border focus:border-primary"
          }`}
        />
        {state.fieldErrors?.username && (
          <p id="username-error" className="text-destructive text-xs" role="alert">
            {state.fieldErrors.username}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          autoComplete="current-password"
          aria-invalid={!!state.fieldErrors?.password}
          aria-describedby={state.fieldErrors?.password ? "password-error" : undefined}
          className={`w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-colors outline-none ${
            state.fieldErrors?.password
              ? "border-destructive focus:border-destructive"
              : "border-border focus:border-primary"
          }`}
        />
        {state.fieldErrors?.password && (
          <p id="password-error" className="text-destructive text-xs" role="alert">
            {state.fieldErrors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-primary text-primary-foreground hover:bg-primary-hover w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
