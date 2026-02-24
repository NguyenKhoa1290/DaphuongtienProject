// ================================================================
// COMPONENT - AddFriendModal
// Modal tìm kiếm và thêm bạn bè qua số điện thoại
// ================================================================

"use client";

import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import { User } from "@/types";
import styles from "./AddFriendModal.module.css";

interface AddFriendModalProps {
  onClose: () => void;
}

// TODO [BE]: Thay mock này bằng kết quả thật từ API
// Endpoint: GET /api/users/search?phone=...
// Headers: Authorization: Bearer <token>
// Response: { found: boolean, user?: User }
const MOCK_SEARCH_RESULT: User = {
  id: "user-99",
  name: "Phạm Văn Bình",
  phone: "0912345678",
};

export default function AddFriendModal({ onClose }: AddFriendModalProps) {
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<User | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  // TODO [BE]: Thay hàm này bằng API call thật
  const handleSearch = async () => {
    if (!phone.trim()) return;
    setLoading(true);
    setNotFound(false);
    setResult(null);
    setAdded(false);

    // Giả lập delay API
    await new Promise((r) => setTimeout(r, 800));

    // TODO [BE]: Gọi GET /api/users/search?phone=${phone}
    if (phone.replace(/\s/g, "") === "0912345678") {
      setResult(MOCK_SEARCH_RESULT);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  };

  // TODO [BE]: Thay hàm này bằng API call thật
  // Endpoint: POST /api/friends/request
  // Body: { targetUserId: string }
  // Headers: Authorization: Bearer <token>
  // Response: { success: boolean }
  const handleAdd = async () => {
    setAdded(true);
  };

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={onClose} />

      {/* Sheet */}
      <div className={styles.sheet}>
        <div className={styles.handle} />

        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Thêm bạn bè</h2>
            <p className={styles.sub}>Tìm kiếm qua số điện thoại</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Input số điện thoại */}
        <div className={styles.inputRow}>
          <div className={styles.prefix}>🇻🇳 +84</div>
          <input
            className={styles.input}
            placeholder="Nhập số điện thoại..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            type="tel"
          />
        </div>

        <button
          className={styles.searchBtn}
          onClick={handleSearch}
          disabled={loading || !phone.trim()}
        >
          {loading ? "Đang tìm..." : "🔍 Tìm kiếm"}
        </button>

        {/* Kết quả tìm kiếm */}
        {result && (
          <div className={styles.result}>
            <Avatar name={result.name} size="md" />
            <div className={styles.resultInfo}>
              <span className={styles.resultName}>{result.name}</span>
              <span className={styles.resultPhone}>{result.phone}</span>
            </div>
            {added ? (
              <span className={styles.addedBadge}>✓ Đã gửi</span>
            ) : (
              <button className={styles.addBtn} onClick={handleAdd}>
                + Thêm
              </button>
            )}
          </div>
        )}

        {/* Không tìm thấy */}
        {notFound && (
          <div className={styles.notFound}>
            Không tìm thấy người dùng với số này
          </div>
        )}
      </div>
    </>
  );
}
