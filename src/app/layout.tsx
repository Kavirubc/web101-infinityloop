import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import logo from "@/../public/logok.png";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web 101 | Infinityloop",
  description: "By Kaviru H",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={logo.src} />
      </head>
      <body className={inter.className}>
        <ClerkProvider>
          
        {children}
        </ClerkProvider>
        </body>
    </html>
  );
}
