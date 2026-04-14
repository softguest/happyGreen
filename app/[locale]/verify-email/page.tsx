"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Leaf } from "lucide-react";

export default function VerifyEmailPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const locale = useLocale();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push(`/${locale}/dashboard`);
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid code");
    }
  };

  return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0f2f1f] overflow-hidden">
    
          {/* Background Glow */}
          <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
          <div className="absolute w-[400px] h-[400px] bg-emerald-400/10 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />
    
          <div className="relative w-full max-w-md p-6">
    
            {/* Glass Card */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-6 space-y-4">
                 {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-green-700/80 backdrop-blur-md rounded-2xl mb-3 shadow-lg">
                <Leaf className="w-7 h-7 text-yellow-300" />
              </div>
    
                  <div className="flex justify-center">
                    <form onSubmit={handleVerify} className="space-y-4">
                        <h1 className="text-2xl font-bold text-white">Verify Email</h1>
                        <input
                        type="text"
                        placeholder="Enter code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="border p-2 rounded w-full bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        {error && <p className="text-red-500">{error}</p>}

                        <button className="bg-green-500 text-white py-2 px-6 rounded cursor-pointer" type="submit">Verify</button>
                    </form>
                    </div>
            </div>
    
            </div>
          </div>
        </div>
  );
}