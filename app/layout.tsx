import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ThemePanelConnected from "@/components/ui/ThemePanelConnected";
import { portfolioData } from "@/data/portfolio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = portfolioData.personal.name
  ? `${portfolioData.personal.name} | Frontend Developer`
  : "Portfolio";

const siteDescription = portfolioData.personal.title
  ? `${portfolioData.personal.title} — ${portfolioData.personal.subtitle || "Frontend Developer Portfolio"}`
  : "Frontend Developer Portfolio";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "ko_KR",
  },
};

/**
 * 테마 깜빡임(Flash) 방지 스크립트
 * - <head>에서 blocking으로 실행되어, 페이지가 렌더되기 전에
 *   localStorage의 테마 값을 <html>에 적용합니다.
 * - Zustand hydration 전에 실행되므로 FOUC(Flash of Unstyled Content)를 방지합니다.
 */
// persist 미들웨어는 { state: { theme: "amber" } } 형식으로 저장
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('portfolio-theme');
    var theme = stored ? JSON.parse(stored).state?.theme : 'amber';
    var valid = ['mint', 'amber', 'blue'];
    if (!theme || valid.indexOf(theme) === -1) theme = 'amber';
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'amber');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
          <ThemePanelConnected />
        </ThemeProvider>
      </body>
    </html>
  );
}
