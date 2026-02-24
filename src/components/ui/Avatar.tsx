// ================================================================
// COMPONENT - Avatar
// Tự động tạo avatar từ tên người dùng (chữ cái đầu + màu)
// ----------------------------------------------------------------
// TODO [BE]: Nếu sau này thêm upload ảnh, thêm prop `imageUrl?: string`
// Khi có imageUrl thì render <img> thay vì chữ cái
// ================================================================

import styles from './Avatar.module.css';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

// Lấy chữ cái đầu của tên
function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase();
}

// Tự động chọn màu dựa theo tên (ổn định, không random)
function getAvatarColor(name: string): string {
  const colors = [
    'var(--avatar-1)',
    'var(--avatar-2)',
    'var(--avatar-3)',
    'var(--avatar-4)',
    'var(--avatar-5)',
    'var(--avatar-6)',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function Avatar({ name, size = 'md' }: AvatarProps) {
  const initial = getInitial(name);
  const color = getAvatarColor(name);

  return (
    <div
      className={`${styles.avatar} ${styles[size]}`}
      style={{ background: `${color}28`, border: `1.5px solid ${color}55` }}
    >
      <span className={styles.initial} style={{ color }}>
        {initial}
      </span>
    </div>
  );
}