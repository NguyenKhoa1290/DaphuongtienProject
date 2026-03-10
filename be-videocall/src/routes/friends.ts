// ================================================================
// ROUTES - Friends (Get + Search + Add)
// ================================================================

import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// ================================================================
// GET /api/friends
// Lấy danh sách bạn bè của user hiện tại
// Headers: Authorization: Bearer <token>
// Response: Friend[]
// ================================================================
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const friends = await prisma.friend.findMany({
      where: { userId },
      include: {
        friend: {
          select: { id: true, name: true, phone: true },
        },
      },
    });

    // Format response đúng shape FE cần
    const formatted = friends.map((f) => ({
      id: f.id,
      user: {
        id: f.friend.id,
        name: f.friend.name,
        phone: f.friend.phone,
      },
    }));

    return res.json(formatted);
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server' });
  }
});

// ================================================================
// GET /api/friends/search?phone=...
// Tìm user theo số điện thoại
// Headers: Authorization: Bearer <token>
// Response: { found: boolean, user?: User }
// ================================================================
router.get('/search', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { phone } = req.query;
    const userId = req.user!.id;

    if (!phone) {
      return res.status(400).json({ message: 'Vui lòng nhập số điện thoại' });
    }

    // Tìm user theo SĐT
    const user = await prisma.user.findUnique({
      where: { phone: phone as string },
      select: { id: true, name: true, phone: true },
    });

    // Không tìm thấy
    if (!user) {
      return res.json({ found: false });
    }

    // Không trả về chính mình
    if (user.id === userId) {
      return res.json({ found: false });
    }

    // Kiểm tra đã là bạn chưa
    const existing = await prisma.friend.findFirst({
      where: { userId, friendId: user.id },
    });

    return res.json({
      found: true,
      user,
      isAlreadyFriend: !!existing,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server' });
  }
});

// ================================================================
// POST /api/friends/request
// Thêm bạn bè
// Headers: Authorization: Bearer <token>
// Body: { targetUserId: string }
// Response: { success: boolean }
// ================================================================
router.post('/request', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { targetUserId } = req.body;

    if (!targetUserId) {
      return res.status(400).json({ message: 'Thiếu targetUserId' });
    }

    // Kiểm tra đã là bạn chưa
    const existing = await prisma.friend.findFirst({
      where: { userId, friendId: targetUserId },
    });
    if (existing) {
      return res.status(400).json({ message: 'Đã là bạn bè rồi' });
    }

    // Thêm bạn bè 2 chiều
    await prisma.friend.createMany({
      data: [
        { userId, friendId: targetUserId },
        { userId: targetUserId, friendId: userId },
      ],
    });

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server' });
  }
});

export default router;