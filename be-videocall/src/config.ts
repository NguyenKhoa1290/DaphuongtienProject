// ================================================================
// Server Configuration
// ================================================================

const SERVER_PORT: number = parseInt(process.env.PORT || "5000", 10);

const FRONTEND_URL: string =
  process.env.FRONTEND_URL || "http://localhost:3000";

const ALLOWED_ORIGINS: string[] = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://192.168.100.188:3000",
  "http://192.168.100.188:3001",
  FRONTEND_URL,
];

export const SERVER_CONFIG = {
  PORT: SERVER_PORT,
  FRONTEND_URL,
  ALLOWED_ORIGINS,
};
