import { useState } from 'react';
import { askAI } from './askAI';
import MermaidChart from './MermaidChart';
import './App.css';

function extractMermaidCode(text) {
  const match = text.match(/```(?:mermaid)?\s*\n?([\s\S]*?)```/);
  if (!match) return null;
  return match[1].trim();
}

function App() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    const currentQuestion = question;
    const updatedMessages = [...messages, { role: "user", content: currentQuestion }];
    setMessages(updatedMessages);
    setQuestion('');
    setLoading(true);

    const reply = await askAI(updatedMessages);

    setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    setLoading(false);
  }

  return (
    <div className="App">
      <h1>Testing Groq</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type a question or ask for a flowchart..."
      />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? 'Thinking...' : 'Ask'}
      </button>

      <div style={{ marginTop: '20px' }}>
        {messages.map((msg, index) => {
          const mermaidCode = msg.role === 'assistant' ? extractMermaidCode(msg.content) : null;
          return (
            <div key={index} style={{ marginBottom: '15px' }}>
              <strong>{msg.role === 'user' ? 'Q:' : 'A:'}</strong>{' '}
              {mermaidCode ? <MermaidChart code={mermaidCode} /> : msg.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;