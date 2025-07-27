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

const isVercel = process.env.DEPLOYMENT_TARGET === "VERCEL";

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
      url: isVercel
        ? "https://varinder.vercel.app/sitemap.xml"
        : "https://varinder148.github.io/portfolio/sitemap.xml",
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
      <head>
        {/* iOS Safari Viewport Fix */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        {/* iOS Safari specific meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta
          name="google-site-verification"
          content="tkz1gT-sHQLzAo4k2YBHsW-EsLi0gMXecCZIlR3yNNo"
        />
        {/* Google Analytics 4 (GA4) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6JM3N2WDEY"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6JM3N2WDEY');
            `,
          }}
        />
      </head>
      <body
        className={`${luckiestGuy.variable}  ${montserrat.variable} ${overpass.variable} bg-theme-ivory bg-theme-grainy text-theme-black`}
      >
        {children}
      </body>
    </html>
  );
}
