// ================================================================
// COMPONENT - GlassCard
// Card tái sử dụng với hiệu ứng liquid glass
// Dùng xuyên suốt app: danh sách bạn bè, lịch sử, modal...
// ================================================================

import styles from "./GlassCard.module.css";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  strong?: boolean; // true = glass đậm hơn
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  strong = false,
  onClick,
}: GlassCardProps) {
  const baseClass = strong ? styles.strong : styles.card;

  return (
    <div
      className={`${baseClass} ${onClick ? styles.interactive : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
