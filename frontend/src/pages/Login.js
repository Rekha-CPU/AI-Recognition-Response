import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "../services/api";
import VoiceLogo from "../components/VoiceLogo";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await loginUser(form);
      localStorage.setItem("voiceai_user", JSON.stringify(result.user));
      navigate("/home");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to log in. Start the backend or check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-brand-panel">
        <div className="auth-brand-content">
          <VoiceLogo />
          <h1>Welcome<br />Back</h1>
          <p>
            Continue your conversation with your AI voice assistant.
          </p>
          <div className="ready-badge">
            <span /> AI Voice Assistant Ready
          </div>
        </div>
      </section>

      <section className="auth-form-panel">
        <div className="auth-card">
          <div className="mobile-auth-logo">
            <VoiceLogo small />
          </div>

          <h2>Welcome Back</h2>
          <p className="auth-subtitle">
            Log in to continue to VoiceAI
          </p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={submit}>
            <label>
              Email
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={update}
                required
              />
            </label>

            <label>
              Password
              <div className="password-input">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={update}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <div className="forgot-row">
              <a href="#forgot">Forgot password?</a>
            </div>

            <button className="auth-submit" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <div className="social-row">
            <button>Google</button>
            <button>GitHub</button>
          </div>

          <p className="auth-switch">
            Don't have an account?
            <Link to="/signup"> Create account</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
