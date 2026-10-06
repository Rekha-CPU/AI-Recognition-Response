import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { getHistory } from "../services/api";
import "./HistoryPage.css";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory()
      .then((data) => setHistory(data.history || []))
      .catch(() => setHistory([]));
  }, []);

  return (
    <div className="page-container">
      <Header />

      <main className="history-main">
        <div className="container">
          <p className="eyebrow">YOUR CONVERSATIONS</p>
          <h1>History</h1>

          {history.length === 0 ? (
            <div className="history-empty">
              <h2>No conversations yet</h2>
              <p>Your voice conversations will appear here.</p>
            </div>
          ) : (
            <div className="history-list">
              {history.map((item, index) => (
                <div className="history-item" key={index}>
                  <span>{item.time || "Recent"}</span>
                  <h3>{item.text}</h3>
                  <p>{item.response}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
