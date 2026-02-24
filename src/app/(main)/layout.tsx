// ================================================================
// MAIN LAYOUT - Layout cho các trang có BottomNav
// Áp dụng cho: /friends và /history
// Không áp dụng cho: /call/[roomId]
// ================================================================

import BottomNav from "@/components/layout/BottomNav";
import styles from "./layout.module.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      {/* Nội dung trang */}
      <main className={styles.main}>{children}</main>

      {/* Thanh nav cố định dưới cùng */}
      <BottomNav />
    </div>
  );
}
