// ================================================================
// COMPONENT - VideoTile
// Hiển thị 1 ô video (camera hoặc avatar fallback)
// ----------------------------------------------------------------
// TODO [BE]: Thay thế div giả bằng <video> element thật
// ref sẽ được gán từ WebRTC stream
// Ví dụ: <video ref={videoRef} autoPlay playsInline muted />
// ================================================================

import Avatar from '@/components/ui/Avatar';
import styles from './VideoTile.module.css';

interface VideoTileProps {
  name: string;
  isSelf?: boolean;      // true = camera của mình (góc nhỏ PiP)
  isMuted?: boolean;     // TODO [BE]: lấy từ WebRTC track state
  isCamOff?: boolean;    // TODO [BE]: lấy từ WebRTC track state
}

export default function VideoTile({
  name,
  isSelf = false,
  isMuted = false,
  isCamOff = false,
}: VideoTileProps) {
  return (
    <div className={`${styles.tile} ${isSelf ? styles.self : styles.remote}`}>

      {/* TODO [BE]: Khi có WebRTC, thay div này bằng:
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={isSelf}
            className={styles.video}
          />
      */}
      <div className={styles.videoPlaceholder}>
        {/* Hiển thị avatar khi cam tắt hoặc chưa có stream */}
        {isCamOff && (
          <Avatar name={name} size={isSelf ? 'sm' : 'lg'} />
        )}
      </div>

      {/* Tên người dùng */}
      {!isSelf && (
        <div className={styles.nameTag}>{name}</div>
      )}

      {/* Icon mic tắt */}
      {isMuted && (
        <div className={styles.mutedBadge}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M1 1l22 22M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23M12 19v3M8 23h8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}