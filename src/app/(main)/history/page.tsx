// ================================================================
// PAGE - Trang Lịch sử cuộc gọi
// ================================================================

import CallHistoryList from "@/components/history/CallHistoryList";
import { mockCallHistory } from "@/data/mockCallHistory";
import styles from "./page.module.css";

export default function HistoryPage() {
  // TODO [BE]: Thay mockCallHistory bằng data fetch thật
  // Gợi ý dùng: React Query hoặc SWR để fetch + cache
  // Endpoint: GET /api/calls/history
  const history = mockCallHistory;

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Lịch sử gọi</h1>
      </div>

      {/* Danh sách lịch sử */}
      <CallHistoryList history={history} />
    </div>
  );
}
