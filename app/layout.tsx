import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import './globals.css'
import Provider from "@/provider";
import { Toaster } from "react-hot-toast";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
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
  title: "Greener Base — AI-Powered Green Skills for Cameroon",
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
    title: "Greener Base — Turn Green Skills Into Livelihoods",
    description:
      "AI-powered platform helping Cameroonian youths discover climate-smart skills and build sustainable businesses.",
    type: "website",
    locale: "en_CM",
    siteName: "Greener Base",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greener Base — AI-Powered Green Skills for Cameroon",
    description:
      "Discover green skills, learn practical techniques, and launch sustainable businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
        <body className="font-sans antialiased"
        >
          <Provider>
            <div>
                    {children}
            </div>
            <Toaster position="top-right" />
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  )
}