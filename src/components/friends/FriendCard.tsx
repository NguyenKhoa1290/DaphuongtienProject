// ================================================================
// COMPONENT - FriendCard
// Hiển thị 1 người bạn trong danh sách
// ================================================================

"use client";

import { useRouter } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import { Friend } from "@/types";
import styles from "./FriendCard.module.css";

interface FriendCardProps {
  friend: Friend;
}

export default function FriendCard({ friend }: FriendCardProps) {
  const router = useRouter();

  // TODO [BE]: roomId thật sẽ do BE cấp khi bắt đầu cuộc gọi
  // Endpoint: POST /api/calls/initiate
  // Body: { targetUserId: string }
  // Response: { roomId: string }
  // Sau đó FE redirect sang /call/:roomId
  const handleCall = () => {
    router.push(`/call/${friend.user.id}`);
  };

  return (
    <div className={styles.card}>
      <Avatar name={friend.user.name} size="md" />

      <div className={styles.info}>
        <span className={styles.name}>{friend.user.name}</span>
        <span className={styles.phone}>{friend.user.phone}</span>
      </div>

      <button className={styles.callBtn} onClick={handleCall}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
  );
}
