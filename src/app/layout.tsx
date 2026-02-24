// ================================================================
// ROOT LAYOUT - Khung ngoài cùng của toàn app
// Wrap tất cả các trang
// ================================================================

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoiceLink",
  description: "Ứng dụng gọi video",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        {/* Background ambient */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            background: `
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(94,231,223,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(180,144,245,0.18) 0%, transparent 55%),
            linear-gradient(135deg, #0d0d1a 0%, #12102b 50%, #0d1a1a 100%)
          `,
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
