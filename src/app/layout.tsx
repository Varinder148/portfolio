import type { Metadata } from "next";
import "./globals.css";

import {
  Luckiest_Guy,
  Noto_Color_Emoji,
  Montserrat_Alternates,
  Josefin_Sans,
} from "next/font/google";
import React from "react";

const luckiestGuy = Luckiest_Guy({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-luckiest-guy",
});

const colorEmoji = Noto_Color_Emoji({
  weight: ["400"],
  subsets: ["emoji"],
  variable: "--font-noto-color-emoji",
});

const montserrat = Montserrat_Alternates({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const overpass = Josefin_Sans({
  weight: ["300", "600"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-overpass",
});

export const metadata: Metadata = {
  title: "Portfolio: Varinder Singh",
  description: "Portfolio of Varinder Singh Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${luckiestGuy.variable} ${colorEmoji.variable} ${montserrat.variable} ${overpass.variable} bg-theme-ivory bg-theme-grainy text-theme-black`}
      >
        {children}
      </body>
    </html>
  );
}
