import type { Metadata } from "next";
import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Churchity",
  description:
    "Churchity is a church student management system for tracking attendance, academic scores, behavior, and generating transcripts by semester or academic year.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
