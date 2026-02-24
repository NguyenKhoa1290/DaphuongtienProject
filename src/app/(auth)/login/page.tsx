// ================================================================
// PAGE - Trang Đăng nhập
// ----------------------------------------------------------------
// TODO [BE]: Kết nối API đăng nhập
// Endpoint: POST /api/auth/login
// Body: { phone: string, password: string }
// Response: { token: string, user: User }
// Sau đó lưu token vào localStorage hoặc cookie
// ================================================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // TODO [BE]: Thay hàm này bằng API call thật
  // const res = await fetch('/api/auth/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ phone, password }),
  // });
  // const data = await res.json();
  // if (data.token) localStorage.setItem('token', data.token);
  const handleLogin = async () => {
    if (!phone.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    setLoading(true);
    setError("");

    // Giả lập delay API
    await new Promise((r) => setTimeout(r, 800));

    // TODO [BE]: Xóa dòng này khi có API thật
    router.push("/friends");
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>📹</div>
        <h1 className={styles.logoText}>VoiceLink</h1>
        <p className={styles.logoSub}>Kết nối mọi lúc mọi nơi</p>
      </div>

      {/* Form */}
      <div className={styles.card}>
        <h2 className={styles.title}>Đăng nhập</h2>

        {/* Số điện thoại */}
        <div className={styles.field}>
          <label className={styles.label}>Số điện thoại</label>
          <div className={styles.inputRow}>
            <div className={styles.prefix}>🇻🇳 +84</div>
            <input
              className={styles.input}
              placeholder="Nhập số điện thoại..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
            />
          </div>
        </div>

        {/* Mật khẩu */}
        <div className={styles.field}>
          <label className={styles.label}>Mật khẩu</label>
          <input
            className={`${styles.input} ${styles.inputFull}`}
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            type="password"
          />
        </div>

        {/* Error */}
        {error && <p className={styles.error}>{error}</p>}

        {/* Nút đăng nhập */}
        <button
          className={styles.submitBtn}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        {/* Link sang đăng ký */}
        <p className={styles.switchText}>
          Chưa có tài khoản?{" "}
          <Link href="/register" className={styles.switchLink}>
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
