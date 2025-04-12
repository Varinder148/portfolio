import "./globals.css";

import {
  Luckiest_Guy,
  Montserrat_Alternates,
  Josefin_Sans,
} from "next/font/google";
import React from "react";

const luckiestGuy = Luckiest_Guy({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-luckiest-guy",
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
    title:
      "Varinder Singh | Frontend Developer – React.js, Next.js, JavaScript Expert",
    description:
      "Varinder Singh – Frontend Developer with expertise in React.js, Next.js, and modern JavaScript frameworks. Experienced in building scalable, high-performance web applications at Gartner, Thoughtworks, and Infosys. Skilled in micro frontends, A/B testing, TDD, and UI development with tools like Tailwind, GraphQL, and Contentful. Explore my portfolio for clean, responsive, and production-ready interfaces.",
    openGraph: {
      title:
        "Varinder Singh | Frontend Developer – React.js, Next.js, JavaScript Expert",
      description:
        "Varinder Singh – Frontend Developer with expertise in React.js, Next.js, and modern JavaScript frameworks. Experienced in building scalable, high-performance web applications at Gartner, Thoughtworks, and Infosys. Skilled in micro frontends, A/B testing, TDD, and UI development with tools like Tailwind, GraphQL, and Contentful. Explore my portfolio for clean, responsive, and production-ready interfaces.",
      siteName: "Portfolio",
      type: "website",
      url: "https://varinder148.github.io/portfolio",
    },
    referrer: "origin-when-cross-origin",
    appleWebApp: {
      title:
        "Varinder Singh | Frontend Developer – React.js, Next.js, JavaScript Expert",
    },
    twitter: {
      title:
        "Varinder Singh | Frontend Developer – React.js, Next.js, JavaScript Expert",
      description:
        "Varinder Singh – Frontend Developer with expertise in React.js, Next.js, and modern JavaScript frameworks. Experienced in building scalable, high-performance web applications at Gartner, Thoughtworks, and Infosys. Skilled in micro frontends, A/B testing, TDD, and UI development with tools like Tailwind, GraphQL, and Contentful. Explore my portfolio for clean, responsive, and production-ready interfaces.",
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
        className={`${luckiestGuy.variable}  ${montserrat.variable} ${overpass.variable} bg-theme-ivory bg-theme-grainy text-theme-black`}
      >
        {children}
      </body>
    </html>
  );
}
