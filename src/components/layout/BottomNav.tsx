// ================================================================
// COMPONENT - BottomNav
// Thanh điều hướng cố định ở dưới màn hình
// Chỉ hiển thị ở trang Friends và History
// Không hiển thị trong màn hình Call
// ================================================================

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BottomNav.module.css';

const NAV_ITEMS = [
  {
    label: 'Bạn bè',
    href: '/friends',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
          stroke="currentColor"
          strokeWidth={active ? 2.5 : 1.8}
          strokeLinecap="round"
        />
        <circle
          cx="9" cy="7" r="4"
          stroke="currentColor"
          strokeWidth={active ? 2.5 : 1.8}
        />
        <path
          d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
          stroke="currentColor"
          strokeWidth={active ? 2.5 : 1.8}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: 'Lịch sử',
    href: '/history',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12" cy="12" r="9"
          stroke="currentColor"
          strokeWidth={active ? 2.5 : 1.8}
        />
        <path
          d="M12 7v5l3 3"
          stroke="currentColor"
          strokeWidth={active ? 2.5 : 1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.item} ${active ? styles.active : ''}`}
          >
            <span className={styles.icon}>{item.icon(active)}</span>
            <span className={styles.label}>{item.label}</span>
            {active && <span className={styles.dot} />}
          </Link>
        );
      })}
    </nav>
  );
}