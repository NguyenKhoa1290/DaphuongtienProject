// ================================================================
// COMPONENT - FriendList
// Danh sách bạn bè + ô tìm kiếm
// ================================================================

"use client";

import { useState } from "react";
import { Friend } from "@/types";
import FriendCard from "./FriendCard";
import GlassCard from "@/components/ui/GlassCard";
import styles from "./FriendList.module.css";

interface FriendListProps {
  friends: Friend[];
}

export default function FriendList({ friends }: FriendListProps) {
  const [search, setSearch] = useState("");

  // Lọc bạn bè theo tên hoặc số điện thoại
  const filtered = friends.filter((f) => {
    const q = search.toLowerCase();
    return f.user.name.toLowerCase().includes(q) || f.user.phone.includes(q);
  });

  return (
    <div className={styles.wrapper}>
      {/* Ô tìm kiếm */}
      <div className={styles.searchWrap}>
        <svg
          className={styles.searchIcon}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path
            d="M16.5 16.5L21 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          className={styles.searchInput}
          placeholder="Tìm theo tên hoặc số điện thoại..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className={styles.clearBtn} onClick={() => setSearch("")}>
            ✕
          </button>
        )}
      </div>

      {/* Danh sách */}
      {filtered.length > 0 ? (
        <GlassCard>
          <div className={styles.sectionTitle}>Tất cả · {filtered.length}</div>
          {filtered.map((friend, index) => (
            <div key={friend.id}>
              <FriendCard friend={friend} />
              {index < filtered.length - 1 && (
                <div className={styles.divider} />
              )}
            </div>
          ))}
        </GlassCard>
      ) : (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🔍</span>
          <span>Không tìm thấy bạn bè nào</span>
        </div>
      )}
    </div>
  );
}
