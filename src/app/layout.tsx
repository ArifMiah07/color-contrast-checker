import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Advanced Nested Contrast Checker | WCAG Accessibility Tool",
  description:
    "Professional tool for checking color contrast in nested UI layers according to WCAG 2.1 guidelines. Interactive, accessible, and recursive.",
  keywords:
    "contrast checker, accessibility, WCAG, nested UI, color contrast, text readability, accessibility tool, UI design, UX tools, recursive component",

  icons: {
    icon: "/favicon.jpeg",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#0ea5e9",
  manifest: "/manifest.json",

  openGraph: {
    title: "Advanced Nested Contrast Checker",
    description:
      "Check contrast compliance in deeply nested UI layers. Built with React and Tailwind. WCAG 2.1 compliant.",
    url: "https://your-site.vercel.app",
    siteName: "Nested Contrast Checker",
    images: [
      {
        url: "https://your-site.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nested Contrast Checker UI Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced Nested Contrast Checker",
    description:
      "WCAG 2.1-based interactive contrast tool for UI devs and designers.",
    images: ["https://your-site.vercel.app/og-image.png"],
    creator: "@yourTwitterHandle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`font-sans min-h-screen bg-gray-50 antialiased`}>
        {children}
      </body>
    </html>
  );
}
