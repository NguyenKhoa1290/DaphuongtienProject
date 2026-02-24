// ================================================================
// PAGE - Màn hình Video Call 1-1
// ----------------------------------------------------------------
// TODO [BE]: roomId thật do BE cấp khi khởi tạo cuộc gọi
// ...
// ================================================================

"use client"; // thêm dòng này

import { use } from "react"; // thêm dòng này
import { mockFriends } from "@/data/mockFriends";
import VideoTile from "@/components/call/VideoTile";
import CallControls from "@/components/call/CallControls";
import styles from "./page.module.css";

interface CallPageProps {
  params: Promise<{ roomId: string }>; // sửa thành Promise
}

export default function CallPage({ params }: CallPageProps) {
  const { roomId } = use(params); // unwrap params

  // TODO [BE]: Thay bằng data thật từ API
  const friend =
    mockFriends.find((f) => f.user.id === roomId)?.user ?? mockFriends[0].user;

  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      <VideoTile name={friend.name} isCamOff={false} />

      <VideoTile name="Bạn" isSelf isCamOff={false} />

      <div className={styles.timer}>⏱ 00:00</div>

      <CallControls />
    </div>
  );
}
