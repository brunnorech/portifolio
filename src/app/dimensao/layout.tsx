"use client";

import type React from "react";
import "../globals.css";

export default function DimensionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-[#f0f5f5] text-[#000]">
      <div className="w-full max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-center">Video Upload</h1>
        {children}
      </div>
    </main>
  );
}
