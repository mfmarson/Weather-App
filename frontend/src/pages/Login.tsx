import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/userAuthentication";
import styles from "./Login.module.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(email, password);
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      console.log("Login successful:", response.user);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.appContainer}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>The Daily Drizzle</h1>
          <p className={styles.subtitle}>Welcome Back!</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@test.com"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123"
              required
              className={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${styles.button} ${styles.primaryButton}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <div className={styles.error}>{error}</div>}
        </form>

        <p className={styles.linkText}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className={styles.textLink}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
