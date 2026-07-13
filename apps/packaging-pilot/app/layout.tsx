import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "小米商城会员限定随行礼盒 - 包装审核 Pilot",
  description: "用于平台审核的小米商城会员限定随行礼盒包装设计与产品包装展示页面。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
