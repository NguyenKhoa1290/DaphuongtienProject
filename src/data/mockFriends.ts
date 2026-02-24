// ================================================================
// MOCK DATA - Danh sách bạn bè
// ----------------------------------------------------------------
// TODO [BE]: Thay bằng API call thật
// Endpoint: GET /api/friends
// Headers: Authorization: Bearer <token>
// Response: Friend[]
// ================================================================

import { Friend } from "@/types";

export const mockFriends: Friend[] = [
  {
    id: "friendship-1",
    user: {
      id: "user-1",
      name: "Nguyễn Văn An",
      phone: "0901234561",
    },
  },
  {
    id: "friendship-2",
    user: {
      id: "user-2",
      name: "Linh Nguyễn",
      phone: "0901234562",
    },
  },
  {
    id: "friendship-3",
    user: {
      id: "user-3",
      name: "Hùng Trần",
      phone: "0901234563",
    },
  },
  {
    id: "friendship-4",
    user: {
      id: "user-4",
      name: "Mai Phương",
      phone: "0901234564",
    },
  },
  {
    id: "friendship-5",
    user: {
      id: "user-5",
      name: "Tuấn Kiệt",
      phone: "0901234565",
    },
  },
];

// ----------------------------------------------------------------
// TODO [BE]: Tìm kiếm user theo số điện thoại
// Endpoint: GET /api/users/search?phone=0901234561
// Headers: Authorization: Bearer <token>
// Response: { found: boolean, user?: User }
// ----------------------------------------------------------------

// ----------------------------------------------------------------
// TODO [BE]: Gửi lời mời kết bạn
// Endpoint: POST /api/friends/request
// Body: { targetUserId: string }
// Headers: Authorization: Bearer <token>
// Response: { success: boolean }
// ----------------------------------------------------------------
