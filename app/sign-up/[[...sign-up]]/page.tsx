"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
        forceRedirectUrl={process.env['NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL']}
      />
    </div>
  );
}
