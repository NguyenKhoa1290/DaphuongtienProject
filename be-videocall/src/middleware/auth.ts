// ================================================================
// MIDDLEWARE - Xác thực JWT token
// Dùng cho các route cần đăng nhập
// ================================================================

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Mở rộng Request để thêm user vào
export interface AuthRequest extends Request {
  user?: {
    id: string;
    phone: string;
    name: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Lấy token từ header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Chưa đăng nhập' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string; phone: string; name: string };

    // Gán user vào request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
};