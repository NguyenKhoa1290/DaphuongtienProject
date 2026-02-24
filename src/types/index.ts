// ================================================================
// TYPES - Định nghĩa kiểu dữ liệu toàn app
// BE cần trả về đúng shape này trong các API response
// ================================================================

export interface User {
  id: string;           // BE: primary key (uuid hoặc string)
  name: string;         // Tên hiển thị
  phone: string;        // Số điện thoại (dùng để tìm kiếm bạn bè)
  avatarColor?: string; // FE tự generate, BE không cần lưu
}

export interface Friend {
  id: string;           // BE: id của friendship record
  user: User;           // Thông tin người bạn
}

export type CallDirection = 'incoming' | 'outgoing' | 'missed';

export type CallStatus = 'completed' | 'missed';

export interface CallHistory {
  id: string;                // BE: primary key
  friend: User;              // Người ở đầu dây kia
  direction: CallDirection;  // incoming | outgoing | missed
  status: CallStatus;        // completed | missed
  startedAt: string;         // ISO 8601 string — BE trả về dạng này
  duration?: number;         // Số giây — chỉ có nếu status === 'completed'
}