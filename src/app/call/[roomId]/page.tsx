// ================================================================
// PAGE - Màn hình Video Call 1-1
// ----------------------------------------------------------------
// TODO [BE]: roomId thật do BE cấp khi khởi tạo cuộc gọi
// Endpoint: POST /api/calls/initiate → { roomId: string }
// Sau đó FE redirect sang /call/:roomId
//
// TODO [BE]: WebRTC signaling flow:
// 1. FE kết nối vào signaling server (Socket.IO hoặc WebSocket)
// 2. Emit "join-room" với roomId
// 3. Trao đổi SDP offer/answer và ICE candidates qua socket
// 4. Khi có remote stream → gán vào <video> element
//
// Gợi ý thư viện: simple-peer, livekit-client, hoặc Agora SDK
// ================================================================

import { mockFriends } from "@/data/mockFriends";
import VideoTile from "@/components/call/VideoTile";
import CallControls from "@/components/call/CallControls";
import styles from "./page.module.css";

interface CallPageProps {
  params: { roomId: string };
}

export default function CallPage({ params }: CallPageProps) {
  // TODO [BE]: Thay bằng data thật từ API
  // Tìm thông tin người được gọi dựa theo roomId
  // Endpoint: GET /api/calls/:roomId → { friend: User, ... }
  const friend =
    mockFriends.find((f) => f.user.id === params.roomId)?.user ??
    mockFriends[0].user;

  return (
    <div className={styles.page}>
      {/* Background */}
      <div className={styles.bg} />

      {/* Video người kia (toàn màn hình) */}
      <VideoTile name={friend.name} isCamOff={false} />

      {/* Camera của mình (PiP góc nhỏ) */}
      <VideoTile name="Bạn" isSelf isCamOff={false} />

      {/* Timer đang gọi */}
      {/* TODO [BE]: Tính thời gian từ lúc kết nối WebRTC thành công */}
      <div className={styles.timer}>⏱ 00:00</div>

      {/* 3 nút điều khiển */}
      <CallControls />
    </div>
  );
}
