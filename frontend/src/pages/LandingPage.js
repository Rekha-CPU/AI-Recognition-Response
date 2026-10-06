import React from "react";
import { Link } from "react-router-dom";
import { Mic, MessageCircle, ShieldCheck, Zap } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VoiceLogo from "../components/VoiceLogo";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="page-container">
      <Header />

      <main>
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="live-dot" />
                AI Voice Recognition
              </div>

              <h1>
                Talk naturally.
                <br />
                <span className="gradient-text">Get intelligent responses.</span>
              </h1>

              <p>
                VoiceAI understands your speech, converts it into text,
                processes your request and gives you a clear response.
              </p>

              <div className="hero-actions">
                <Link to="/signup" className="primary-btn">
                  Get Started
                </Link>
                <Link to="/chat" className="secondary-btn">
                  Try Voice Chat
                </Link>
              </div>
            </div>

            <div className="hero-visual">
              <div className="orb">
                <VoiceLogo />
                <div className="orb-ring ring-one" />
                <div className="orb-ring ring-two" />
              </div>

              <div className="floating-card card-top">
                <Mic size={18} />
                <span>Listening to your voice...</span>
              </div>

              <div className="floating-card card-bottom">
                <MessageCircle size={18} />
                <span>AI response generated</span>
              </div>
            </div>
          </div>
        </section>

        <section className="features container">
          <div className="section-heading">
            <p className="eyebrow">POWERFUL FEATURES</p>
            <h2>Everything you need for voice interaction</h2>
          </div>

          <div className="feature-grid">
            <Feature
              icon={<Mic />}
              title="Voice Recognition"
              text="Speak naturally using your microphone and convert speech into text."
            />
            <Feature
              icon={<Zap />}
              title="Fast Response"
              text="Process requests quickly and return an easy-to-understand response."
            />
            <Feature
              icon={<MessageCircle />}
              title="Conversation History"
              text="Keep track of your previous conversations and responses."
            />
            <Feature
              icon={<ShieldCheck />}
              title="Simple & Secure"
              text="A clean interface designed for safe and simple interaction."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
