export async function askAI(conversationHistory) {
  const systemMessage = {
    role: "system",
    content: "You are a helpful assistant. If the user asks for a flowchart, diagram, or mindmap, respond ONLY with valid Mermaid syntax wrapped in triple backticks, like:\n```mermaid\nflowchart TD\nA[Start] --> B[Next step]\n```\nDo not add any explanation text outside the code block in that case. For all other questions, answer normally in plain text."
  };

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.REACT_APP_GROQ_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [systemMessage, ...conversationHistory]
      })
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    console.error(err);
    return "Couldn't get an answer, try again.";
  }
}