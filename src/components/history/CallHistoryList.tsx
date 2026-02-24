// ================================================================
// COMPONENT - CallHistoryList
// Danh sách lịch sử cuộc gọi, group theo ngày
// ================================================================

"use client";

import { useState } from "react";
import { CallHistory } from "@/types";
import CallHistoryItem from "./CallHistoryItem";
import GlassCard from "@/components/ui/GlassCard";
import styles from "./CallHistoryList.module.css";

interface CallHistoryListProps {
  history: CallHistory[];
}

type FilterType = "all" | "missed";

// Format ngày từ ISO string → nhãn "Hôm nay", "Hôm qua", hoặc ngày cụ thể
function getDateLabel(iso: string): string {
  const date = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Hôm nay";
  if (date.toDateString() === yesterday.toDateString()) return "Hôm qua";

  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Group danh sách theo ngày
function groupByDate(items: CallHistory[]): Record<string, CallHistory[]> {
  return items.reduce(
    (groups, item) => {
      const label = getDateLabel(item.startedAt);
      if (!groups[label]) groups[label] = [];
      groups[label].push(item);
      return groups;
    },
    {} as Record<string, CallHistory[]>,
  );
}

export default function CallHistoryList({ history }: CallHistoryListProps) {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = history.filter((item) => {
    if (filter === "missed") return item.status === "missed";
    return true;
  });

  const grouped = groupByDate(filtered);
  const dateGroups = Object.keys(grouped);

  return (
    <div className={styles.wrapper}>
      {/* Filter tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${filter === "all" ? styles.active : ""}`}
          onClick={() => setFilter("all")}
        >
          Tất cả
        </button>
        <button
          className={`${styles.tab} ${filter === "missed" ? styles.active : ""}`}
          onClick={() => setFilter("missed")}
        >
          Cuộc gọi nhỡ
        </button>
      </div>

      {/* Danh sách group theo ngày */}
      {dateGroups.length > 0 ? (
        dateGroups.map((dateLabel) => (
          <div key={dateLabel} className={styles.group}>
            <div className={styles.dateLabel}>{dateLabel}</div>
            <GlassCard>
              {grouped[dateLabel].map((item, index) => (
                <div key={item.id}>
                  <CallHistoryItem item={item} />
                  {index < grouped[dateLabel].length - 1 && (
                    <div className={styles.divider} />
                  )}
                </div>
              ))}
            </GlassCard>
          </div>
        ))
      ) : (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>📵</span>
          <span>Không có cuộc gọi nhỡ nào</span>
        </div>
      )}
    </div>
  );
}
