import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Csyformiq",
  description:
    "Csyformiq is a future product company for AI design, app motion, creative engineering, and product prototypes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
