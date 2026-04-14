"use client";

import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function SSOCallbackPage() {
  const { handleRedirectCallback } = useClerk();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const completeSignIn = async () => {
      await handleRedirectCallback({
        afterSignInUrl: `/${locale}/dashboard`,
      });
    };

    completeSignIn();
  }, []);

  return <p>Signing you in...</p>;
}