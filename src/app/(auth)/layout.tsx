// ================================================================
// AUTH LAYOUT - Layout cho trang Login và Register
// Không có BottomNav
// ================================================================

import styles from './layout.module.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
}