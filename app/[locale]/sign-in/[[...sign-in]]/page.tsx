"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Leaf } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function CustomSignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const t = useTranslations("signIn");
  const locale = useLocale()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // 🔐 Email/Password Login
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        setError("Something went wrong. Try again.");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // 🌐 Google OAuth
  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;

    try {
      setGoogleLoading(true);

      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err: any) {
      setError("Google sign-in failed. Try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0f2f1f] overflow-hidden">

      {/* Background */}
      <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-emerald-400/10 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      <div className="relative w-full max-w-md p-6">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-700/80 backdrop-blur-md rounded-2xl mb-3 shadow-lg">
            <Leaf className="w-7 h-7 text-yellow-300" />
          </div>

          <h1 className="text-2xl font-bold text-white">
            {t("welcomeBack")}
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            {t("dontHaveAccount")}
          </p>
        </div>

        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-6 space-y-4">

          {/* 🌐 Google Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-2 rounded-xl 
            bg-white/10 border border-white/20 text-white 
            hover:bg-white/20 transition-all duration-300 
            hover:scale-[1.02] active:scale-[0.97]"
          >
            {googleLoading ? (
              "Connecting..."
            ) : (
              <>
                {/* Google Icon */}
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.6l6.9-6.9C35.9 2.4 30.4 0 24 0 14.64 0 6.44 5.4 2.56 13.28l8.04 6.24C12.64 13.28 17.92 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.5 24c0-1.64-.14-3.22-.4-4.74H24v9h12.7c-.54 2.9-2.18 5.36-4.64 7.04l7.16 5.56C43.96 36.44 46.5 30.8 46.5 24z"/>
                  <path fill="#FBBC05" d="M10.6 28.52A14.5 14.5 0 019.5 24c0-1.56.26-3.06.72-4.48l-8.04-6.24A23.94 23.94 0 000 24c0 3.8.9 7.38 2.48 10.52l8.12-6z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.92-2.14 15.9-5.82l-7.16-5.56c-2 1.34-4.56 2.14-8.74 2.14-6.08 0-11.36-3.78-13.4-9.02l-8.12 6C6.44 42.6 14.64 48 24 48z"/>
                </svg>
                {t("continueWithGoogle")}
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-gray-300 text-sm">or</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleSignIn} className="space-y-4">

            <div>
              <label className="text-sm text-gray-200">{t("email")}</label>
              <input
                type="email"
                required
                className="w-full mt-1 px-4 py-2 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-200">{t("password")}</label>
              <input
                type="password"
                required
                className="w-full mt-1 px-4 py-2 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-xl bg-green-700 text-white font-semibold transition-all duration-300 hover:bg-green-600 hover:scale-[1.02] active:scale-[0.97] shadow-lg hover:shadow-green-500/40 disabled:opacity-50"
            >
              {loading ? t("loading.signIn") : t("signIn")}
              {/* {loading ? "Signing in..." : "Sign In"} */}
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-300 text-center">
            {t("dontHaveAccount")}{" "}
            <span
              onClick={() => router.push(`/${locale}/sign-up`)}
              className="text-green-300 hover:text-green-200 cursor-pointer"
            >
              {t("signUp")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}