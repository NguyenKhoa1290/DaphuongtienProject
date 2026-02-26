// ================================================================
// ROUTES - Auth (Register + Login)
// ================================================================

import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// ================================================================
// POST /api/auth/register
// Body: { name, phone, password }
// Response: { token, user }
// ================================================================
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, phone, password } = req.body;

    // Validate
    if (!name || !phone || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự' });
    }

    // Kiểm tra SĐT đã tồn tại chưa
    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing) {
      return res.status(400).json({ message: 'Số điện thoại đã được đăng ký' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const user = await prisma.user.create({
      data: { name, phone, password: hashedPassword },
    });

    // Tạo JWT token
    const token = jwt.sign(
      { id: user.id, phone: user.phone, name: user.name },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      token,
      user: { id: user.id, name: user.name, phone: user.phone },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server' });
  }
});

// ================================================================
// POST /api/auth/login
// Body: { phone, password }
// Response: { token, user }
// ================================================================
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;

    // Validate
    if (!phone || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
    }

    // Tìm user theo SĐT
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      return res.status(400).json({ message: 'Số điện thoại chưa được đăng ký' });
    }

    // Kiểm tra password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu không đúng' });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user.id, phone: user.phone, name: user.name },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      token,
      user: { id: user.id, name: user.name, phone: user.phone },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server' });
  }
});

export default router;