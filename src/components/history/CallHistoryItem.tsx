// ================================================================
// COMPONENT - CallHistoryItem
// Hiển thị 1 dòng lịch sử cuộc gọi
// ================================================================

"use client";

import { useRouter } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import { CallHistory } from "@/types";
import styles from "./CallHistoryItem.module.css";

interface CallHistoryItemProps {
  item: CallHistory;
}

// Format số giây → "mm:ss"
function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// Format giờ từ ISO string → "HH:mm"
function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const DIRECTION_CONFIG = {
  incoming: {
    label: "Cuộc gọi đến",
    color: "var(--accent)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M7 17L17 7M17 7H7M17 7v10"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  outgoing: {
    label: "Cuộc gọi đi",
    color: "var(--accent2)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 7L7 17M7 17h10M7 17V7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  missed: {
    label: "Cuộc gọi nhỡ",
    color: "var(--danger)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 7L7 17M7 17h10M7 17V7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

export default function CallHistoryItem({ item }: CallHistoryItemProps) {
  const router = useRouter();
  const config = DIRECTION_CONFIG[item.direction];

  // TODO [BE]: roomId thật sẽ do BE cấp
  // Endpoint: POST /api/calls/initiate
  // Body: { targetUserId: string }
  // Response: { roomId: string }
  const handleCallBack = () => {
    router.push(`/call/${item.friend.id}`);
  };

  return (
    <div className={styles.item}>
      <Avatar name={item.friend.name} size="md" />

      <div className={styles.info}>
        <span className={styles.name}>{item.friend.name}</span>
        <div className={styles.meta}>
          <span style={{ color: config.color }} className={styles.direction}>
            {config.icon}
            {config.label}
          </span>
          <span className={styles.dot} />
          <span className={styles.time}>{formatTime(item.startedAt)}</span>
        </div>
      </div>

      <div className={styles.right}>
        {item.duration ? (
          <span className={styles.duration}>
            {formatDuration(item.duration)}
          </span>
        ) : (
          <span className={styles.missed}>Nhỡ</span>
        )}
        <button className={styles.callBtn} onClick={handleCallBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 10l4.553-2.277A1 1 0 0 1 21 8.624v6.752a1 1 0 0 1-1.447.899L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
