import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatLauncher } from "@/components/layout/ChatLauncher";
import { siteUrl, siteName } from "@/lib/constants";
import { travelAgencyJsonLd } from "@/lib/schema";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1e3c1e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Private Kenya Safaris, Tailored to You`,
    template: `%s | ${siteName}`,
  },
  description:
    "Private, guide-led safaris across Kenya. Tailored itineraries through Maasai Mara, Amboseli, Samburu and beyond — designed around the wildlife you came for.",
  keywords: [
    "Kenya safari",
    "Maasai Mara",
    "Amboseli safari",
    "private safari Kenya",
    "tailor-made safari",
    "Tajo Safaris",
  ],
  openGraph: {
    type: "website",
    siteName,
    url: siteUrl,
    title: `${siteName} — Private Kenya Safaris, Tailored to You`,
    description:
      "Private, guide-led safaris across Kenya. Tailored itineraries through Maasai Mara, Amboseli, Samburu and beyond.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 1178,
        alt: "Tajo Safaris and Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Private Kenya Safaris, Tailored to You`,
    description:
      "Private, guide-led safaris across Kenya. Tailored itineraries through Maasai Mara, Amboseli, Samburu and beyond.",
    images: ["/og-default.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="bg-bg text-ink flex min-h-full flex-col">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <ChatLauncher />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#1c1816",
              color: "#faf6e8",
              border: "1px solid #4a423b",
            },
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(travelAgencyJsonLd()),
          }}
        />
      </body>
    </html>
  );
}
