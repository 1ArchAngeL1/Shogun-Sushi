import type { Metadata } from "next";
import { Bebas_Neue, Inter, Noto_Sans_Georgian } from "next/font/google";
import "../globals.css";

const display = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const georgian = Noto_Sans_Georgian({
  variable: "--font-georgian",
  subsets: ["georgian"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Admin · Shogun Sushi",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${georgian.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-shogun-ink text-shogun-cream">
        {children}
      </body>
    </html>
  );
}
