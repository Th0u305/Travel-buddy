import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import TanProviders from "@/src/provider/Provider";

export const metadata: Metadata = {
  title: "Travel Buddey | Home",
  description: "Travel Buddey | Home",
  icons: {
    icon: "/travel-bag.png",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Defines the CSS variable
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <TanProviders>
          {children}
          <Toaster closeButton position="bottom-right" richColors />
        </TanProviders>
      </body>
    </html>
  );
}
