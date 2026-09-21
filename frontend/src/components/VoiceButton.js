import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import "./VoiceButton.css";

export default function VoiceButton({ onResult }) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      onResult?.(text);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, [onResult]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Try Google Chrome.");
      return;
    }

    if (listening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  return (
    <button
      className={`voice-button ${listening ? "listening" : ""}`}
      onClick={toggleListening}
      aria-label={listening ? "Stop listening" : "Start listening"}
    >
      {listening ? <MicOff size={28} /> : <Mic size={28} />}
      <span>{listening ? "Listening..." : "Speak to AI"}</span>
    </button>
  );
}
