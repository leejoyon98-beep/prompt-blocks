import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/layout/AppHeader";
import { ToastProvider } from "@/components/common/Toast";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "프롬프트 블록팩",
  description: "자주 쓰는 AI 작업 방식을 블록팩으로 만들고, 내가 쓰는 AI에 붙여넣으세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ToastProvider>
          <AppHeader />
          <main className="flex-1">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
