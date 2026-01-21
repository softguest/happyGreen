import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import './globals.css'
import Provider from "@/provider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: 'HappiGreen',
  description: 'Build Skills, Save the Planet',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body 
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