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

def is_image_request(question):
    image_keywords = ["picture", "image", "photo", "show me a", "pic of", "show me what"]
    question_lower = question.lower()
    return any(keyword in question_lower for keyword in image_keywords)


def search_pixabay_image(query):
    response = requests.get(
        "https://pixabay.com/api/",
        params={
            "key": settings.PIXABAY_API_KEY,
            "q": query,
            "image_type": "photo",
            "per_page": 3
        }
    )
    data = response.json()
    if data.get("hits"):
        return data["hits"][0]["webformatURL"]
    return None