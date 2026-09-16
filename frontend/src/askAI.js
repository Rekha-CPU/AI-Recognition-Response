export async function askAI(question) {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.REACT_APP_GROQ_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [{ role: "user", content: question }]
      })
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    console.error(err);
    return "Couldn't get an answer, try again.";
  }
}