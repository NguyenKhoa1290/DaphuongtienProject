// ================================================================
// SOCKET.IO - WebRTC Signaling Server
// ================================================================

import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";

const onlineUsers = new Map<string, string>();

export function setupSignaling(io: Server) {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Chưa đăng nhập"));
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
        name: string;
        phone: string;
      };
      socket.data.user = decoded;
      next();
    } catch {
      next(new Error("Token không hợp lệ"));
    }
  });

  io.on("connection", (socket: Socket) => {
    const user = socket.data.user;
    console.log(`✅ ${user.name} kết nối (${socket.id})`);
    onlineUsers.set(user.id, socket.id);

    socket.on("join-room", (roomId: string) => {
      console.log(`📞 ${user.name} vào phòng ${roomId}`);
      socket.join(roomId);

      // Log xem phòng có bao nhiêu người
      const room = io.sockets.adapter.rooms.get(roomId);
      console.log(`👥 Phòng ${roomId} có ${room?.size} người`);

      socket.to(roomId).emit("user-joined", {
        userId: user.id,
        name: user.name,
      });
    });

    socket.on("offer", ({ roomId, offer }: { roomId: string; offer: any }) => {
      socket.to(roomId).emit("offer", { offer, from: user.id });
    });

    socket.on(
      "answer",
      ({ roomId, answer }: { roomId: string; answer: any }) => {
        socket.to(roomId).emit("answer", { answer, from: user.id });
      },
    );

    socket.on(
      "ice-candidate",
      ({ roomId, candidate }: { roomId: string; candidate: any }) => {
        socket.to(roomId).emit("ice-candidate", { candidate, from: user.id });
      },
    );

    socket.on("call-user", ({ targetUserId, roomId }) => {
      console.log("📡 Call to:", targetUserId);
      console.log("🟢 Online users:", onlineUsers);

      const targetSocketId = onlineUsers.get(targetUserId);
      console.log("🎯 Target socket:", targetSocketId);

      if (targetSocketId) {
        io.to(targetSocketId).emit("incoming-call", {
          from: { id: user.id, name: user.name },
          roomId,
        });
      } else {
        console.log("❌ Target user offline");
      }
    });

    socket.on(
      "accept-call",
      ({ roomId, targetUserId }: { roomId: string; targetUserId: string }) => {
        const targetSocketId = onlineUsers.get(targetUserId);
        if (targetSocketId)
          io.to(targetSocketId).emit("call-accepted", { roomId });
      },
    );

    socket.on("leave-room", (roomId: string) => {
      socket.leave(roomId);
      // Dùng io.to thay vì socket.to để cả người rời cũng nhận
      io.to(roomId).emit("user-left", { userId: user.id });
      console.log(`👋 ${user.name} rời phòng ${roomId}`);
    });

    socket.on("reject-call", ({ targetUserId }: { targetUserId: string }) => {
      const targetSocketId = onlineUsers.get(targetUserId);
      if (targetSocketId) {
        io.to(targetSocketId).emit("call-rejected");
      }
    });

    socket.on("cancel-call", ({ targetUserId }: { targetUserId: string }) => {
      const targetSocketId = onlineUsers.get(targetUserId);
      if (targetSocketId) {
        io.to(targetSocketId).emit("call-cancelled");
      }
    });

    socket.on("disconnect", () => {
      onlineUsers.delete(user.id);
      console.log(`❌ ${user.name} ngắt kết nối`);
    });
  });
}
