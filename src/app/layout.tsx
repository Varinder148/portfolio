import type { Metadata } from "next";
import "./globals.css";
import BackgroundLayout from "../Components/BackgroundLayout.tsx";
import { Montserrat } from "next/font/google";

import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported but less commonly used
  // interactiveWidget: 'resizes-visual',
};
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"h-[6000px]  bg-dirty-white " + montserrat.className}>
        <BackgroundLayout>{children}</BackgroundLayout>
      </body>
    </html>
  );
}
