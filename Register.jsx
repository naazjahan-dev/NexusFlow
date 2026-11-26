import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThreeDButton from "../components/ThreeDButton";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");

  const strength = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPwd) {
      setError("Passwords do not match.");
      return;
    }

    if (!terms) {
      setError("Please accept the Terms & Conditions.");
      return;
    }

    const result = register(
      fullName.trim(),
      email.trim().toLowerCase(),
      password
    );

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
          <Link to="/register" className="brand">
            <span className="brand-icon">N</span>
            <span>Nexus<span>Flow</span></span>
          </Link>

          <div className="visual-content">
            <div className="live-badge">
              <span className="live-dot" />
              YOUR IOT JOURNEY STARTS HERE
            </div>

            <h1>
              Build your
              <br />
              connected <span>future.</span>
            </h1>

            <p>
              Bring your devices, telemetry and intelligent
              automation together in one beautiful workspace.
            </p>

            <div className="register-feature-list">
              <div><span>✦</span> Smart Device Monitoring</div>
              <div><span>✦</span> Real-Time Data Visualization</div>
              <div><span>✦</span> Intelligent Automation Rules</div>
              <div><span>✦</span> Centralized IoT Management</div>
            </div>

            <div className="register-glow-card">
              <span className="glow-symbol">⌘</span>
              <div>
                <strong>One platform. Endless possibilities.</strong>
                <p>Everything connected, intelligently managed.</p>
              </div>
            </div>
          </div>

          <div className="visual-footer">
            <span>© 2026 NexusFlow</span>
            <span>Visual IoT Telemetry & Rule Engine</span>
          </div>
        </section>

        <section className="auth-form-section register-form-section">
          <div className="auth-card register-card">

            <div className="mobile-brand">
              <span className="brand-icon">N</span>
              NexusFlow
            </div>

            <div className="form-heading">
              <div className="welcome-tag">CREATE YOUR ACCOUNT</div>
              <h2>Join NexusFlow</h2>
              <p>Set up your account and explore your IoT workspace.</p>
            </div>

            {error && (
              <div className="auth-message error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="full-name">Full Name</label>
                <div className="input-wrap">
                  <span className="input-icon">♙</span>
                  <input
                    id="full-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="register-email">Email Address</label>
                <div className="input-wrap">
                  <span className="input-icon">✉</span>
                  <input
                    id="register-email"
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
                <label htmlFor="register-password">Password</label>
                <div className="input-wrap">
                  <span className="input-icon">♙</span>
                  <input
                    id="register-password"
                    type={showPwd ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
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

                <div className="strength-meter">
                  {[1, 2, 3, 4].map((n) => (
                    <span
                      key={n}
                      className={strength >= n ? "strength-active" : ""}
                    />
                  ))}
                </div>
                <small className="strength-label">
                  {password.length === 0
                    ? "Use at least 8 characters"
                    : ["Weak", "Fair", "Good", "Strong", "Very strong"][strength]}
                </small>
              </div>

              <div className="auth-field">
                <label htmlFor="confirm-password">Confirm Password</label>
                <div className="input-wrap">
                  <span className="input-icon">♙</span>
                  <input
                    id="confirm-password"
                    type={showPwd ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              <label className="terms-option">
                <input
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                />
                <span>
                  I agree to the Terms & Conditions.
                </span>
              </label>

              <ThreeDButton type="submit" className="auth-submit">
                Create Account <span>→</span>
              </ThreeDButton>
            </form>

            <div className="auth-divider">
              <span>ALREADY A MEMBER?</span>
            </div>

            <p className="switch-auth">
              Already have an account?
              <Link to="/login"> Sign in</Link>
            </p>

            <div className="security-note">
              <span>✦</span> Start managing your connected world
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}