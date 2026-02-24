// ================================================================
// PAGE - Trang Đăng ký
// ----------------------------------------------------------------
// TODO [BE]: Kết nối API đăng ký
// Endpoint: POST /api/auth/register
// Body: { name: string, phone: string, password: string }
// Response: { token: string, user: User }
// Sau đó lưu token vào localStorage hoặc cookie
// ================================================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // TODO [BE]: Thay hàm này bằng API call thật
  // const res = await fetch('/api/auth/register', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ name, phone, password }),
  // });
  // const data = await res.json();
  // if (data.token) localStorage.setItem('token', data.token);
  const handleRegister = async () => {
    if (
      !name.trim() ||
      !phone.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
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
        <p className={styles.logoSub}>Tạo tài khoản mới</p>
      </div>

      {/* Form */}
      <div className={styles.card}>
        <h2 className={styles.title}>Đăng ký</h2>

        {/* Họ tên */}
        <div className={styles.field}>
          <label className={styles.label}>Họ và tên</label>
          <input
            className={`${styles.input} ${styles.inputFull}`}
            placeholder="Nhập họ và tên..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </div>

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
            placeholder="Ít nhất 6 ký tự..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>

        {/* Xác nhận mật khẩu */}
        <div className={styles.field}>
          <label className={styles.label}>Xác nhận mật khẩu</label>
          <input
            className={`${styles.input} ${styles.inputFull}`}
            placeholder="Nhập lại mật khẩu..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRegister()}
            type="password"
          />
        </div>

        {/* Error */}
        {error && <p className={styles.error}>{error}</p>}

        {/* Nút đăng ký */}
        <button
          className={styles.submitBtn}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Đang đăng ký..." : "Tạo tài khoản"}
        </button>

        {/* Link sang đăng nhập */}
        <p className={styles.switchText}>
          Đã có tài khoản?{" "}
          <Link href="/login" className={styles.switchLink}>
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
