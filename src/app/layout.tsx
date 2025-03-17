import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "../components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brech.dev - Desenvolvimento Fullstack",
  description: "Portfólio profissional de desenvolvimento fullstack",
  openGraph: {
    title: "Brech.dev - Desenvolvimento Fullstack",
    description: "Portfólio profissional de desenvolvimento fullstack",
    url: "https://brech.dev",
    siteName: "Brech.dev",
    images: [
      {
        url: "/logo.svg",
        alt: "Logo da Brech.dev",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
