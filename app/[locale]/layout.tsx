import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import '../globals.css'
import Provider from "@/provider";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales } from "@/i18n";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "GreenSkill Up — AI-Powered Green Skills for Cameroon",
  description:
    "Discover green skills, learn practical techniques, and launch sustainable businesses with AI-powered guidance. Built for Cameroonian youths.",
  keywords: [
    "green skills",
    "Cameroon",
    "climate change",
    "entrepreneurship",
    "sustainable agriculture",
    "waste management",
    "renewable energy",
    "youth employment",
  ],
  openGraph: {
    title: "GreenSkill Up — Turn Green Skills Into Livelihoods",
    description:
      "AI-powered platform helping Cameroonian youths discover climate-smart skills and build sustainable businesses.",
    type: "website",
    locale: "en_CM",
    siteName: "GreenSkill Up",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenSkill Up — AI-Powered Green Skills for Cameroon",
    description:
      "Discover green skills, learn practical techniques, and launch sustainable businesses.",
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  // params: { locale: string };
  params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;
  
    if (!locales.includes(locale)) notFound();
  
    const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <ClerkProvider
      signInUrl={`/${locale}/sign-in`}
      signUpUrl={`/${locale}/sign-up`}
      afterSignInUrl={`/${locale}/dashboard`}
      afterSignUpUrl={`/${locale}/dashboard`}
    >
      <html lang={locale} className={`${inter.variable} ${jakarta.variable}`}>
        <body className="font-sans antialiased"
        >
          <Provider>
            <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                    <Toaster position="top-right" />
            </NextIntlClientProvider>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  )
}