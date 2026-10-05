import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "이지윤 | Frontend Developer",
  description:
    "사용자의 일상에 가치를 더하는 웹을 만드는 프론트엔드 개발자 이지윤의 프로필 링크입니다.",
  keywords: [
    "이지윤",
    "프론트엔드",
    "Frontend Developer",
    "React",
    "Next.js",
    "웹 개발자",
    "포트폴리오",
    "MyLink",
    "Visual Workspace",
  ],
  authors: [{ name: "이지윤", url: "https://github.com/ounxxr" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#050038] antialiased selection:bg-[#E0E7FF] selection:text-[#3730A3]">
        {children}
      </body>
    </html>
  );
}
