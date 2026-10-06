import React, { useState } from "react";
import Header from "../components/Header";
import "./Settings.css";

export default function Settings() {
  const saved = JSON.parse(localStorage.getItem("voiceai_user") || "{}");

  const [name, setName] = useState(saved.name || "");
  const [language, setLanguage] = useState("English");
  const [savedMessage, setSavedMessage] = useState("");

  const save = (e) => {
    e.preventDefault();

    const user = {
      ...saved,
      name,
      language
    };

    localStorage.setItem("voiceai_user", JSON.stringify(user));
    setSavedMessage("Settings saved successfully.");
  };

  return (
    <div className="page-container">
      <Header />

      <main className="settings-main">
        <div className="settings-card">
          <p className="eyebrow">PREFERENCES</p>
          <h1>Settings</h1>

          <form onSubmit={save}>
            <label>
              Display Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </label>

            <label>
              Voice Language
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>English</option>
                <option>Telugu</option>
                <option>Hindi</option>
              </select>
            </label>

            <button className="primary-btn">
              Save Settings
            </button>

            {savedMessage && (
              <p className="saved-message">{savedMessage}</p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
