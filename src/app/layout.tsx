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

export async function generateMetadata() {
  const metadata = {
    title: "Varinder Singh - Software Engineer",
    description:
      "Portfolio of Varinder Singh who is a Software engineer currently working at Gartner",
    openGraph: {
      title: "Varinder Singh - Software Engineer",
      description:
        "Portfolio of Varinder Singh who is a Software engineer currently working at Gartner",
      siteName: "Portfolio",
      type: "website",
      url: "https://varinder148.github.io/portfolio",
    },
    referrer: "origin-when-cross-origin",
    appleWebApp: {
      title: "Varinder Singh - Software Engineer",
    },
    twitter: {
      title: "Varinder Singh - Software Engineer",
      description:
        "Portfolio of Varinder Singh who is a Software engineer currently working at Gartner",
    },
  };

  return metadata;
}

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
