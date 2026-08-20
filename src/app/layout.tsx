import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://graduation-invite-dusky.vercel.app";
const OG_TITLE = "sensibility invitation";
const OG_DESCRIPTION =
  "2026 한국공학대학교 디자인공학부 졸업전시에 초대합니다.";
const OG_IMAGE_URL = `${SITE_URL}/images/og-image.jpg`;

export const metadata: Metadata = {
  title: "sensibility",
  description: OG_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
