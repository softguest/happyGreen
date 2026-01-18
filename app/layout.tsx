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
    <ClerkProvider
      appearance={{
        theme: "simple",
        elements: {
          headerTitle: {
            fontSize: "32px",
          },
          formButtonPrimary: {
            backgroundColor: "red",
            color: "white",
            borderColor: "#a80000ff",
            fontSize: "18px",
          },
          formButtonPrimary_hover: {
            backgroundColor: "#c20000ff",
            borderColor: "#c20000ff",
          }
        }
      }}
    >
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