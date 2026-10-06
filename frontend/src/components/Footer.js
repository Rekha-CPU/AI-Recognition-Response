import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <strong>VoiceAI</strong>
          <p>AI voice recognition and intelligent response platform.</p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/chat">Voice Chat</Link>
          <Link to="/history">History</Link>
          <Link to="/settings">Settings</Link>
        </div>

        <p className="copyright">
          © 2026 VoiceAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
