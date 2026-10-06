import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import VoiceLogo from "./VoiceLogo";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" onClick={close}>
          <VoiceLogo small />
          <span>Voice<span className="brand-accent">AI</span></span>
        </Link>

        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`nav-links ${open ? "nav-open" : ""}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/chat" onClick={close}>Voice Chat</NavLink>
          <NavLink to="/history" onClick={close}>History</NavLink>
          <NavLink to="/settings" onClick={close}>Settings</NavLink>
          <div className="header-actions">
            <Link to="/login" className="login-link" onClick={close}>Log in</Link>
            <Link to="/signup" className="header-signup" onClick={close}>Sign up</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
