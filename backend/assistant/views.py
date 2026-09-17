from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .ai import generate_answer

@csrf_exempt
def chat(request):

    if request.method != "POST":
        return JsonResponse({
            "error": "Only POST requests are allowed."
        }, status=405)

    try:
        data = json.loads(request.body)

        question = data.get("message", "").strip()

        if not question:
            return JsonResponse({
                "error": "Please provide a message."
            }, status=400)

        answer = generate_answer(question)

        return JsonResponse({
            "answer": answer
        })

    except Exception as e:

        return JsonResponse({
            "error": str(e)
        }, status=500)