"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        forceRedirectUrl={process.env['NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL']}
      />
    </div>
  );
}
