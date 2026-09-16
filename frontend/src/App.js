import { useState } from 'react';
import { askAI } from './askAI';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('Answer will appear here.');

  async function handleAsk() {
    setAnswer('Thinking...');
    const reply = await askAI(question);
    setAnswer(reply);
  }

  return (
    <div className="App">
      <h1>Testing Groq</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type a question..." 
      />
      <button onClick={handleAsk}>Ask</button>
      <p>{answer}</p>
    </div>
  );
}

export default App;