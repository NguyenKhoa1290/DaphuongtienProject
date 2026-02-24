// ================================================================
// COMPONENT - CallControls
// 3 nút điều khiển: Micro / Camera / Kết thúc
// ----------------------------------------------------------------
// TODO [BE]: Kết nối các toggle với WebRTC track thật
// micOn/camOn sẽ control MediaStreamTrack.enabled
// ================================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./CallControls.module.css";

export default function CallControls() {
  const router = useRouter();
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  // TODO [BE]: Khi toggle mic, cần gọi:
  // localStream.getAudioTracks()[0].enabled = !micOn
  const handleMicToggle = () => setMicOn((prev) => !prev);

  // TODO [BE]: Khi toggle cam, cần gọi:
  // localStream.getVideoTracks()[0].enabled = !camOn
  const handleCamToggle = () => setCamOn((prev) => !prev);

  // TODO [BE]: Khi kết thúc call, cần:
  // 1. Đóng tất cả RTCPeerConnection
  // 2. Stop tất cả MediaStreamTrack
  // 3. Emit socket event "leave-room"
  // 4. Lưu call history vào DB
  const handleEndCall = () => {
    router.push("/friends");
  };

  return (
    <div className={styles.controls}>
      {/* Nút Micro */}
      <button
        className={`${styles.btn} ${!micOn ? styles.btnOff : ""}`}
        onClick={handleMicToggle}
      >
        <div
          className={`${styles.circle} ${!micOn ? styles.circleOff : styles.circleGlass}`}
        >
          {micOn ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M1 1l22 22M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23M12 19v3M8 23h8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
        <span className={styles.label}>{micOn ? "Micro" : "Đã tắt"}</span>
      </button>

      {/* Nút Kết thúc (giữa, nổi bật) */}
      <button className={styles.btn} onClick={handleEndCall}>
        <div className={`${styles.circle} ${styles.circleEnd}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M23.82 16.92c-.17-1.39-1.29-2.42-2.69-2.42h-3.28c-1.27 0-2.35.88-2.63 2.12l-.47 2.07a14.29 14.29 0 0 1-6.11-6.11l2.07-.47A2.69 2.69 0 0 0 12.83 9.5V6.22c0-1.4-1.03-2.52-2.42-2.69A14.37 14.37 0 0 0 8.5 3.5C5.46 3.5 3 5.96 3 9c0 6.63 5.37 12 12 12 3.04 0 5.5-2.46 5.5-5.5 0-.54-.06-1.07-.18-1.58z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              transform="rotate(135, 12, 12)"
            />
          </svg>
        </div>
        <span className={`${styles.label} ${styles.labelDanger}`}>
          Kết thúc
        </span>
      </button>

      {/* Nút Camera */}
      <button
        className={`${styles.btn} ${!camOn ? styles.btnOff : ""}`}
        onClick={handleCamToggle}
      >
        <div
          className={`${styles.circle} ${!camOn ? styles.circleOff : styles.circleGlass}`}
        >
          {camOn ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 10l4.553-2.277A1 1 0 0 1 21 8.624v6.752a1 1 0 0 1-1.447.899L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M1 1l22 22M15 15.36V14l4.553 2.277A1 1 0 0 0 21 15.376V8.624a1 1 0 0 0-1.447-.9L15 10V8a2 2 0 0 0-2-2H6.36M3.27 3.27A2 2 0 0 0 3 4v10a2 2 0 0 0 2 2h10c.35 0 .68-.09.97-.24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span className={styles.label}>{camOn ? "Camera" : "Đã tắt"}</span>
      </button>
    </div>
  );
}
