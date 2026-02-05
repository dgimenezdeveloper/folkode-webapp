import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Folkode | Software Factory Colaborativa Argentina",
    template: "%s | Folkode",
  },
  description:
    "Somos una software factory colaborativa argentina. Desarrollamos soluciones digitales modernas: aplicaciones web, e-commerce, automatización y más. Transformamos ideas en herramientas eficientes.",
  keywords: [
    "desarrollo web",
    "software factory",
    "argentina",
    "aplicaciones web",
    "e-commerce",
    "automatización",
    "react",
    "next.js",
    "typescript",
    "desarrollo a medida",
    "landing pages",
    "sistemas CRM",
    "ERP",
    "aplicaciones móviles",
  ],
  authors: [{ name: "Folkode Team", url: "https://folkode.com.ar" }],
  creator: "Folkode",
  publisher: "Folkode",
  metadataBase: new URL("https://folkode.com.ar"),
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://folkode.com.ar",
    siteName: "Folkode",
    title: "Folkode | Software Factory Colaborativa Argentina",
    description:
      "Desarrollamos soluciones digitales modernas. Aplicaciones web, e-commerce, automatización y más.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Folkode - Software Factory Colaborativa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Folkode | Software Factory Colaborativa Argentina",
    description:
      "Desarrollamos soluciones digitales modernas. Aplicaciones web, e-commerce, automatización y más.",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0d1117",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${inter.variable} ${montserrat.variable} ${plusJakartaSans.variable} font-sans antialiased min-h-screen mesh-gradient selection:bg-[#a3b18a] selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
