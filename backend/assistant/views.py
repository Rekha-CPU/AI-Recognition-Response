from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
import json

from .ai import generate_answer, generate_groq_answer
from .models import ChatMessage


@csrf_exempt
def signup(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST requests are allowed."}, status=405)
    try:
        data = json.loads(request.body)
        username = data.get("username", "").strip()
        password = data.get("password", "").strip()

        if not username or not password:
            return JsonResponse({"error": "Username and password are required."}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already taken."}, status=400)

        user = User.objects.create_user(username=username, password=password)
        token = Token.objects.create(user=user)

        return JsonResponse({"token": token.key, "username": user.username})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def login_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST requests are allowed."}, status=405)
    try:
        data = json.loads(request.body)
        username = data.get("username", "").strip()
        password = data.get("password", "").strip()

        user = authenticate(username=username, password=password)
        if user is None:
            return JsonResponse({"error": "Invalid username or password."}, status=401)

        token, created = Token.objects.get_or_create(user=user)
        return JsonResponse({"token": token.key, "username": user.username})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def get_user_from_token(request):
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Token "):
        return None
    token_key = auth_header.replace("Token ", "").strip()
    try:
        token = Token.objects.get(key=token_key)
        return token.user
    except Token.DoesNotExist:
        return None


@csrf_exempt
def save_message(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST requests are allowed."}, status=405)

    user = get_user_from_token(request)
    if user is None:
        return JsonResponse({"error": "Invalid or missing token."}, status=401)

    try:
        data = json.loads(request.body)
        question = data.get("question", "").strip()
        answer = data.get("answer", "").strip()

        if not question or not answer:
            return JsonResponse({"error": "Question and answer are required."}, status=400)

        message = ChatMessage.objects.create(user=user, question=question, answer=answer)
        return JsonResponse({"id": message.id, "status": "saved"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def get_history(request):
    user = get_user_from_token(request)
    if user is None:
        return JsonResponse({"error": "Invalid or missing token."}, status=401)

    messages = ChatMessage.objects.filter(user=user).order_by('timestamp')
    history = [
        {"question": m.question, "answer": m.answer, "timestamp": m.timestamp.isoformat()}
        for m in messages
    ]
    return JsonResponse({"history": history})


@csrf_exempt
def voice_respond(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST requests are allowed."}, status=405)

    user = get_user_from_token(request)
    if user is None:
        return JsonResponse({"error": "Invalid or missing token."}, status=401)

    try:
        data = json.loads(request.body)
        question = data.get("text", "").strip()

        if not question:
            return JsonResponse({"error": "Please provide text."}, status=400)

        answer = generate_groq_answer(question)

        ChatMessage.objects.create(user=user, question=question, answer=answer)

        return JsonResponse({"answer": answer})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def chat(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST requests are allowed."}, status=405)
    try:
        data = json.loads(request.body)
        question = data.get("message", "").strip()
        if not question:
            return JsonResponse({"error": "Please provide a message."}, status=400)
        answer = generate_answer(question)
        return JsonResponse({"answer": answer})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)