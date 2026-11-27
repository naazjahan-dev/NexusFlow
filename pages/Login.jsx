import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThreeDButton from "../components/ThreeDButton";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = login(email.trim().toLowerCase(), password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-bg-orb orb-one" />
      <div className="auth-bg-orb orb-two" />
      <div className="auth-grid" />

      <div className="auth-shell">

        <section className="auth-visual">
          <Link to="/login" className="brand">
            <span className="brand-icon">N</span>
            <span>Nexus<span>Flow</span></span>
          </Link>

          <div className="visual-content">
            <div className="live-badge">
              <span className="live-dot" />
              INTELLIGENT IOT ECOSYSTEM
            </div>

            <h1>
              Control your
              <br />
              connected <span>world.</span>
            </h1>

            <p>
              Monitor devices, visualize real-time telemetry
              and automate your connected ecosystem
              with one powerful platform.
            </p>

            <div className="visual-dashboard">
              <div className="visual-top">
                <span>System Overview</span>
                <span className="online-label">● All Systems Online</span>
              </div>

              <div className="visual-stats">
                <div>
                  <small>Connected Devices</small>
                  <strong>1,284</strong>
                  <span>+12.8%</span>
                </div>
                <div>
                  <small>System Uptime</small>
                  <strong>99.9%</strong>
                  <span>Excellent</span>
                </div>
              </div>

              <div className="visual-chart">
                {[35, 55, 42, 75, 50, 85, 65, 95, 70, 100, 76, 90].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} />
                ))}
              </div>

              <div className="chart-footer">
                <span>LIVE TELEMETRY</span>
                <span>REAL-TIME MONITORING</span>
              </div>
            </div>
          </div>

          <div className="visual-footer">
            <span>© 2026 NexusFlow</span>
            <span>Visual IoT Telemetry & Rule Engine</span>
          </div>
        </section>

        <section className="auth-form-section">
          <div className="auth-card">

            <div className="mobile-brand">
              <span className="brand-icon">N</span>
              NexusFlow
            </div>

            <div className="form-heading">
              <div className="welcome-tag">WELCOME BACK</div>
              <h2>Sign in to your account</h2>
              <p>Enter your credentials to access your dashboard.</p>
            </div>

            {error && (
              <div className="auth-message error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="login-email">Email Address</label>
                <div className="input-wrap">
                  <span className="input-icon">✉</span>
                  <input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="login-password">Password</label>
                <div className="input-wrap">
                  <span className="input-icon">♙</span>
                  <input
                    id="login-password"
                    type={showPwd ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPwd(!showPwd)}
                  >
                    {showPwd ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-option">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="text-link"
                  onClick={() =>
                    setError("Password reset is not configured yet. Please contact your administrator.")
                  }
                >
                  Forgot password?
                </button>
              </div>

              <ThreeDButton type="submit" className="auth-submit">
                Sign In <span>→</span>
              </ThreeDButton>
            </form>

            <div className="auth-divider">
              <span>NEW TO NEXUSFLOW?</span>
            </div>

            <p className="switch-auth">
              Don't have an account?
              <Link to="/register"> Create an account</Link>
            </p>

            <div className="security-note">
              <span>✦</span> Secure access to your IoT workspace
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}