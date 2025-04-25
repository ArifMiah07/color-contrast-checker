import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://contrasttree.vercel.app"),
  title: "Advanced Nested Contrast Checker | WCAG Accessibility Tool",
  description:
    "A powerful tool to analyze and validate color contrast in nested UI layers following WCAG 2.1 accessibility guidelines. Ideal for designers and developers building inclusive web interfaces.",
  keywords: [
    "contrast checker tool",
    "nested UI contrast checker",
    "WCAG 2.1 checker",
    "color contrast accessibility",
    "text readability tester",
    "accessible web design",
    "accessibility testing",
    "color contrast WCAG",
    "UI/UX accessibility audit",
    "web color compliance tool",
    "recursive contrast checker",
  ],
  applicationName: "Nested Contrast Checker",
  authors: [{ name: "Arif Miah", url: "https://contrasttree.vercel.app" }],
  creator: "Arif Miah",
  publisher: "arifmiah",
  robots: "index, follow",
  generator: "Next.js",
  themeColor: "#0ea5e9",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.jpeg",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://contrasttree.vercel.app",
  },
  openGraph: {
    title: "Advanced Nested Contrast Checker",
    description:
      "Check color contrast compliance in deeply nested UI layers. Fully WCAG 2.1 compliant. Built with React, Tailwind CSS, and Next.js.",
    url: "https://contrasttree.vercel.app",
    siteName: "Nested Contrast Checker",
    images: [
      {
        url: "https://contrasttree.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nested Contrast Checker Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced Nested Contrast Checker",
    description:
      "WCAG 2.1-based interactive contrast tool for UI developers and designers.",
    images: ["https://contrasttree.vercel.app/og-image.png"],
    site: "@contrasttree",
    creator: "@contrasttree",
  },
  verification: {
    google: "Hh1_ZeG7kQtb-KMzCtNIFbUXvxruD-Zp0jF4jnXOvR4",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans min-h-screen bg-gray-50 antialiased">
        {children}
        <GoogleAnalytics gaId="G-CJ13C9GKZ5" />
      </body>
    </html>
  );
}
