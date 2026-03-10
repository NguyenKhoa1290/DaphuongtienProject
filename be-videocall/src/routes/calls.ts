// ================================================================
// ROUTES - Call History (Get + Save)
// ================================================================

import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// ================================================================
// GET /api/calls/history
// Lấy lịch sử cuộc gọi của user hiện tại
// Headers: Authorization: Bearer <token>
// Response: CallHistory[]
// ================================================================
router.get('/history', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const history = await prisma.callHistory.findMany({
      where: {
        OR: [
          { callerId: userId },
          { receiverId: userId },
        ],
      },
      include: {
        caller: { select: { id: true, name: true, phone: true } },
        receiver: { select: { id: true, name: true, phone: true } },
      },
      orderBy: { startedAt: 'desc' },
    });

    // Format response đúng shape FE cần
    const formatted = history.map((call) => {
      const isCaller = call.callerId === userId;
      const friend = isCaller ? call.receiver : call.caller;
      const direction = call.status === 'missed'
        ? 'missed'
        : isCaller ? 'outgoing' : 'incoming';

      return {
        id: call.id,
        friend: {
          id: friend.id,
          name: friend.name,
          phone: friend.phone,
        },
        direction,
        status: call.status,
        startedAt: call.startedAt.toISOString(),
        duration: call.duration ?? undefined,
      };
    });

    return res.json(formatted);
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server' });
  }
});

// ================================================================
// POST /api/calls/initiate
// Khởi tạo cuộc gọi → trả về roomId
// Headers: Authorization: Bearer <token>
// Body: { targetUserId: string }
// Response: { roomId: string }
// ================================================================
router.post('/initiate', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { targetUserId } = req.body;
    const userId = req.user!.id;

    if (!targetUserId) {
      return res.status(400).json({ message: 'Thiếu targetUserId' });
    }

    // RoomId = ghép 2 userId lại theo thứ tự alphabet để 2 chiều cùng vào 1 room
    const roomId = [userId, targetUserId].sort().join('_');

    return res.json({ roomId });
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server' });
  }
});

// ================================================================
// POST /api/calls/save
// Lưu lịch sử cuộc gọi sau khi kết thúc
// Headers: Authorization: Bearer <token>
// Body: { receiverId, status, duration? }
// Response: { success: boolean }
// ================================================================
router.post('/save', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const callerId = req.user!.id;
    const { receiverId, status, duration } = req.body;

    if (!receiverId || !status) {
      return res.status(400).json({ message: 'Thiếu thông tin cuộc gọi' });
    }

    await prisma.callHistory.create({
      data: {
        callerId,
        receiverId,
        direction: 'outgoing',
        status,
        duration: duration ?? null,
      },
    });

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server' });
  }
});

export default router;