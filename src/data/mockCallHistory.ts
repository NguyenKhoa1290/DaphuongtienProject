// ================================================================
// MOCK DATA - Lịch sử cuộc gọi
// ----------------------------------------------------------------
// TODO [BE]: Thay bằng API call thật
// Endpoint: GET /api/calls/history
// Headers: Authorization: Bearer <token>
// Response: CallHistory[]
// Ghi chú: BE nên sort sẵn theo startedAt DESC (mới nhất trên đầu)
// ================================================================

import { CallHistory } from "@/types";

export const mockCallHistory: CallHistory[] = [
  // --- Hôm nay ---
  {
    id: "call-1",
    friend: {
      id: "user-2",
      name: "Linh Nguyễn",
      phone: "0901234562",
    },
    direction: "incoming",
    status: "completed",
    startedAt: "2026-02-24T14:32:00.000Z",
    duration: 724, // giây — FE tự format thành "12:04"
  },
  {
    id: "call-2",
    friend: {
      id: "user-1",
      name: "Nguyễn Văn An",
      phone: "0901234561",
    },
    direction: "outgoing",
    status: "completed",
    startedAt: "2026-02-24T10:15:00.000Z",
    duration: 202,
  },
  {
    id: "call-3",
    friend: {
      id: "user-4",
      name: "Mai Phương",
      phone: "0901234564",
    },
    direction: "missed",
    status: "missed",
    startedAt: "2026-02-24T09:45:00.000Z",
    // duration không có vì bị nhỡ
  },

  // --- Hôm qua ---
  {
    id: "call-4",
    friend: {
      id: "user-3",
      name: "Hùng Trần",
      phone: "0901234563",
    },
    direction: "outgoing",
    status: "completed",
    startedAt: "2026-02-23T20:10:00.000Z",
    duration: 347,
  },
  {
    id: "call-5",
    friend: {
      id: "user-5",
      name: "Tuấn Kiệt",
      phone: "0901234565",
    },
    direction: "incoming",
    status: "completed",
    startedAt: "2026-02-23T15:30:00.000Z",
    duration: 1691,
  },

  // --- 2 ngày trước ---
  {
    id: "call-6",
    friend: {
      id: "user-4",
      name: "Mai Phương",
      phone: "0901234564",
    },
    direction: "incoming",
    status: "completed",
    startedAt: "2026-02-22T18:00:00.000Z",
    duration: 62,
  },
];

// ----------------------------------------------------------------
// TODO [BE]: Lấy chi tiết 1 cuộc gọi
// Endpoint: GET /api/calls/:callId
// Headers: Authorization: Bearer <token>
// Response: CallHistory
// ----------------------------------------------------------------
