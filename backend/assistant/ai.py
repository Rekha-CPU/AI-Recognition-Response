import ollama
import requests
from django.conf import settings

conversation_history = [
    {
        "role": "system",
        "content": (
            "You are a helpful AI voice assistant. "
            "Give clear, accurate, and beginner-friendly answers. "
            "Be polite and concise. "
            "If the user asks a technical question, explain it simply "
            "and provide examples when useful."
        )
    }
]


def generate_answer(question):
    conversation_history.append({"role": "user", "content": question})
    response = ollama.chat(model="llama3.2", messages=conversation_history)
    answer = response["message"]["content"]
    conversation_history.append({"role": "assistant", "content": answer})
    return answer


def generate_groq_answer(question):
    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {settings.GROQ_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "openai/gpt-oss-20b",
            "messages": [{"role": "user", "content": question}]
        }
    )
    data = response.json()
    return data["choices"][0]["message"]["content"]