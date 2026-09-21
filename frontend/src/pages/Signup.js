import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { signupUser } from "../services/api";
import VoiceLogo from "../components/VoiceLogo";
import "./Auth.css";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signupUser(form);
      localStorage.setItem("voiceai_user", JSON.stringify(result.user));
      navigate("/home");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to create account. Start the backend or try again."
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
          <h1>AI Voice<br />Recognition</h1>
          <p>
            Speak naturally. Let AI understand, process and respond
            to you instantly.
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

          <h2>Create Account</h2>
          <p className="auth-subtitle">
            Create your account and start talking with AI
          </p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={submit}>
            <label>
              Full Name
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={update}
                required
              />
            </label>

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
                  placeholder="Create a password"
                  value={form.password}
                  onChange={update}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Show password"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <button className="auth-submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
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
            Already have an account?
            <Link to="/login"> Log in</Link>
          </p>

          <p className="auth-terms">
            By creating an account, you agree to our
            <a href="#terms"> Terms</a> and
            <a href="#privacy"> Privacy Policy</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
