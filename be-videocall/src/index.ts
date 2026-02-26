// ================================================================
// ENTRY POINT - Khởi động server
// ================================================================

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import friendRoutes from "./routes/friends";
import callRoutes from "./routes/calls";
import { setupSignaling } from "./socket/signaling";
import { SERVER_CONFIG } from "./config";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"], // thêm dòng này
});

app.use(cors({ origin: "*" }));

// ================================================================
// Middleware
// ================================================================
app.use(cors({ origin: SERVER_CONFIG.ALLOWED_ORIGINS }));
app.use(express.json());

// ================================================================
// Routes
// ================================================================
app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/calls", callRoutes);

// ================================================================
// Health check
// ================================================================
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server đang chạy!" });
});

// ================================================================
// Socket.IO Signaling
// ================================================================
setupSignaling(io);

// ================================================================
// Start server
// ================================================================
httpServer.listen(SERVER_CONFIG.PORT, "0.0.0.0", () => {
  console.log(`✅ Server đang chạy tại http://0.0.0.0:${SERVER_CONFIG.PORT}`);
  console.log(
    `📡 CORS allowed origins: ${SERVER_CONFIG.ALLOWED_ORIGINS.join(", ")}`,
  );
});
