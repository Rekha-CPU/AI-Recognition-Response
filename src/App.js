import React, { useState } from "react";
import "./App.css";

function App() {
  const [showSettings, setShowSettings] = useState(false);

  const handleHistory = () => {
    alert("Chat History");
  };

  const handleDelete = () => {
    alert("Chat history deleted");
  };

  const handleNewChat = () => {
    alert("New chat started");
  };

  const handleMore = () => {
    alert("More options");
  };

  const handleStartChat = () => {
    alert("Starting AI Chat...");
  };

  return (
    <div className="app">

      {/* ================= HEADER ================= */}
      <header className="header">

        {/* ANASOL BRAND */}
        <div className="anasol-brand">

          <div className="anasol-logo">
            A
          </div>

          <div className="anasol-text">
            <h2>ANASOL</h2>
            <p>Consultancy Services</p>
          </div>

        </div>


        {/* DIVIDER */}
        <div className="header-divider"></div>


        {/* AI ASSISTANT BRAND */}
        <div className="ai-brand">

          <div className="small-robot">
            🤖
          </div>

          <div className="ai-brand-text">
            <h2>AI Assistant</h2>

            <p>
              Recognize
              <span>•</span>
              Converse
              <span>•</span>
              Respond
            </p>
          </div>

        </div>


        {/* NAVIGATION */}
        <nav className="navigation">

          {/* HOME */}
          <a href="/" className="nav-item home-active">
            <span className="nav-icon">⌂</span>
            Home
          </a>


          {/* CHAT */}
          <a href="/" className="nav-item">
            <span className="nav-icon">▣</span>
            Chat
          </a>


          {/* SETTINGS */}
          <div className="settings-wrapper">

            <button
              className="settings-button"
              onClick={() => setShowSettings(!showSettings)}
            >

              <span className="nav-icon">⚙</span>

              Settings

              <span className="settings-arrow">
                {showSettings ? "▲" : "▼"}
              </span>

            </button>


            {/* SETTINGS DROPDOWN */}
            {showSettings && (

              <div className="settings-dropdown">

                <button onClick={handleHistory}>
                  <span className="menu-icon">◷</span>
                  History
                </button>

                <button onClick={handleDelete}>
                  <span className="menu-icon">♜</span>
                  Delete
                </button>

                <button onClick={handleNewChat}>
                  <span className="menu-icon">＋</span>
                  New Chat
                </button>

                <button onClick={handleMore}>
                  <span className="menu-icon">•••</span>
                  More
                </button>

              </div>

            )}

          </div>

        </nav>

      </header>


      {/* ================= HERO SECTION ================= */}
      <main className="hero">

        {/* BACKGROUND SHAPES */}
        <div className="background-circle circle-left"></div>

        <div className="background-circle circle-right"></div>


        {/* ROBOT */}
        <div className="hero-robot">

          <div className="robot-glow">
            🤖
          </div>

        </div>


        {/* HERO CONTENT */}
        <div className="hero-content">

          <h1>
            <span>AI</span> Recognition & Response
          </h1>


          <p className="hero-description">
            Empowering the Anasol experience with intelligent voice
            recognition, natural conversations, and fast,
            AI-powered responses.
          </p>


          {/* ================= FEATURES ================= */}
          <div className="features">


            {/* VOICE RECOGNITION */}
            <div className="feature">

              <div className="feature-icon">
                🎤
              </div>

              <div className="feature-text">

                <h3>
                  Voice Recognition
                </h3>

                <p>
                  Speak naturally
                </p>

              </div>

            </div>


            {/* DIVIDER */}
            <div className="feature-divider"></div>


            {/* AI RESPONSE */}
            <div className="feature">

              <div className="feature-icon">
                💬
              </div>

              <div className="feature-text">

                <h3>
                  AI Response
                </h3>

                <p>
                  Smart & accurate
                </p>

              </div>

            </div>


            {/* DIVIDER */}
            <div className="feature-divider"></div>


            {/* FAST RESPONSE */}
            <div className="feature">

              <div className="feature-icon">
                ⚡
              </div>

              <div className="feature-text">

                <h3>
                  Fast Response
                </h3>

                <p>
                  Get answers instantly
                </p>

              </div>

            </div>

          </div>


          {/* START CHAT BUTTON */}
          <button
            className="start-chat-button"
            onClick={handleStartChat}
          >

            <span>▣</span>

            Start Chat

            <strong>→</strong>

          </button>

        </div>

      </main>


      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <p>
          © 2026 Anasol Consultancy Services. All rights reserved.
        </p>

        <p>
          Powered by Love
          <span className="heart">♥</span>
          Anasol
      
        </p>

      </footer>

    </div>
  );
}

export default App;