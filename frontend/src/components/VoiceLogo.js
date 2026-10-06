import React from "react";
import { Mic } from "lucide-react";
import "./VoiceLogo.css";

export default function VoiceLogo({ small = false }) {
  return (
    <div className={`voice-logo ${small ? "voice-logo-small" : ""}`}>
      <Mic size={small ? 22 : 34} />
      <div className="voice-bars" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
