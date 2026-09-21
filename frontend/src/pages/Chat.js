import React, { useState, useRef, useEffect } from "react";
import { Mic, Send, Volume2, Square } from "lucide-react";
import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Automatically scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Speak AI response
  const speak = (text) => {
    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    speech.onstart = () => {
      setSpeaking(true);
    };

    speech.onend = () => {
      setSpeaking(false);
    };

    speech.onerror = () => {
      setSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  };

  // Stop speaking
  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  // AI response
  const getAIResponse = (question) => {
    const text = question.toLowerCase();

    if (
      text.includes("hello") ||
      text.includes("hi") ||
      text.includes("hey")
    ) {
      return "Hello! How can I help you today?";
    }

    if (text.includes("how are you")) {
      return "I'm doing great! I'm ready to help you with your questions.";
    }

    if (
      text.includes("who are you") ||
      text.includes("what are you")
    ) {
      return "I am an AI Voice Assistant that can listen to your questions and respond using both text and voice.";
    }

    if (text.includes("what is your name")) {
      return "My name is AI Recognition Response.";
    }

    if (text.includes("python")) {
      return "Python is a high-level programming language known for its simple syntax and wide use in web development, automation, data science and artificial intelligence.";
    }

    if (text.includes("java")) {
      return "Java is a popular object-oriented programming language used for web applications, enterprise software, Android development and many other applications.";
    }

    if (text.includes("thank")) {
      return "You're welcome! I'm always happy to help.";
    }

    return `I heard your question: "${question}". I'm ready to help you. Could you please provide a little more detail about what you would like to know?`;
  };

  // Send message
  const sendMessage = (text = input) => {
    const question = text.trim();

    if (!question) {
      return;
    }

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: question,
      },
    ]);

    setInput("");

    // Generate AI response immediately
    const response = getAIResponse(question);

    // Add AI response
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: "ai",
        text: response,
      },
    ]);

    // Speak immediately
    setTimeout(() => {
      speak(response);
    }, 100);
  };

  // Start voice recognition
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech recognition is not supported in this browser. Please use Google Chrome."
      );
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      setInput(transcript);

      // Immediately send voice message
      sendMessage(transcript);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    recognition.start();
  };

  // Cleanup
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="chat-page">

      {/* Main Chat Area */}
      <div className="chat-container">

        {/* Header */}
        <div className="chat-topbar">
          <div className="chat-title">
            <div className="ai-logo">
              AI
            </div>

            <div>
              <h1>AI Voice Assistant</h1>
              <span>
                <span className="online-dot"></span>
                Online
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">

          {messages.length === 0 && (
            <div className="welcome-screen">

              <div className="welcome-icon">
                <Volume2 size={30} />
              </div>

              <h2>
                How can I help you?
              </h2>

              <p>
                Ask me anything using your voice or
                type your question below.
              </p>

            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-row ${message.sender}`}
            >

              {message.sender === "ai" && (
                <div className="message-avatar">
                  AI
                </div>
              )}

              <div className="message-content">

                <div className="message-name">
                  {message.sender === "user"
                    ? "You"
                    : "AI Assistant"}
                </div>

                <div className="message-text">
                  {message.text}
                </div>

                {message.sender === "ai" && (
                  <button
                    className="message-speak"
                    onClick={() =>
                      speaking
                        ? stopSpeaking()
                        : speak(message.text)
                    }
                  >
                    {speaking ? (
                      <>
                        <Square size={14} />
                        Stop
                      </>
                    ) : (
                      <>
                        <Volume2 size={14} />
                        Listen
                      </>
                    )}
                  </button>
                )}

              </div>

            </div>
          ))}

          <div ref={messagesEndRef}></div>

        </div>

        {/* ChatGPT Style Input */}
        <div className="chat-input-wrapper">

          <div
            className={`chat-input-box ${
              listening ? "is-listening" : ""
            }`}
          >

            <textarea
              rows="1"
              placeholder={
                listening
                  ? "Listening..."
                  : "Message AI Assistant..."
              }
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {

                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();

                  sendMessage();
                }

              }}
            />

            <div className="input-actions">

              {/* Microphone */}
              <button
                className={`input-mic ${
                  listening ? "active" : ""
                }`}
                onClick={startListening}
                title={
                  listening
                    ? "Stop listening"
                    : "Voice input"
                }
              >
                <Mic size={21} />
              </button>

              {/* Send */}
              <button
                className="input-send"
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                title="Send"
              >
                <Send size={19} />
              </button>

            </div>

          </div>

          <p className="input-note">
            AI can make mistakes. Check important information.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Chat;