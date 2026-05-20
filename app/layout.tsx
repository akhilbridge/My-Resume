import type { ReactNode } from "react";

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Akhil M Nair | Lead Full Stack Developer",
  description:
    "Career website for Akhil M Nair, a lead full stack developer focused on .NET, React, Next.js, and cloud-native platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
