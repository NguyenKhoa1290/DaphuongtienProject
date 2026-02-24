// ================================================================
// PAGE - Trang Bạn bè
// ================================================================

"use client";

import { useState } from "react";
import FriendList from "@/components/friends/FriendList";
import AddFriendModal from "@/components/friends/AddFriendModal";
import { mockFriends } from "@/data/mockFriends";
import styles from "./page.module.css";

export default function FriendsPage() {
  const [showModal, setShowModal] = useState(false);

  // TODO [BE]: Thay mockFriends bằng data fetch thật
  // Gợi ý dùng: React Query hoặc SWR để fetch + cache
  // Endpoint: GET /api/friends
  const friends = mockFriends;

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Bạn bè</h1>
        <button className={styles.addBtn} onClick={() => setShowModal(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Danh sách bạn bè */}
      <FriendList friends={friends} />

      {/* Modal thêm bạn */}
      {showModal && <AddFriendModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
