import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "sensibility",
  description: "2026 한국공학대학교 디자인공학부 제21회 졸업전시회",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
