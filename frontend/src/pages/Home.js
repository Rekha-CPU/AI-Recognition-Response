import React from "react";
import { Link } from "react-router-dom";
import { History, Mic, Settings, MessageCircle } from "lucide-react";
import Header from "../components/Header";
import VoiceButton from "../components/VoiceButton";
import Footer from "../components/Footer";
import "./Home.css";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("voiceai_user") || "null");

  return (
    <div className="page-container">
      <Header />

      <main className="home-main">
        <div className="container">
          <div className="home-welcome">
            <div>
              <p className="eyebrow">AI VOICE ASSISTANT</p>
              <h1>
                Hello{user?.name ? `, ${user.name}` : ""} 👋
              </h1>
              <p>How can I help you today?</p>
            </div>
            <VoiceButton />
          </div>

          <section className="home-grid">
            <Link to="/chat" className="dashboard-card">
              <Mic />
              <h3>Start Voice Chat</h3>
              <p>Speak with the AI assistant using your microphone.</p>
            </Link>

            <Link to="/history" className="dashboard-card">
              <History />
              <h3>Conversation History</h3>
              <p>View your previous questions and AI responses.</p>
            </Link>

            <Link to="/settings" className="dashboard-card">
              <Settings />
              <h3>Settings</h3>
              <p>Manage your profile and voice preferences.</p>
            </Link>

            <Link to="/chat" className="dashboard-card">
              <MessageCircle />
              <h3>Text + Voice</h3>
              <p>Use text input when you do not want to speak.</p>
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
