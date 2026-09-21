from django.urls import path
from .views import chat, signup, login_view, save_message, get_history, voice_respond

urlpatterns = [
    path("chat/", chat, name="chat"),
    path("auth/signup", signup, name="signup"),
    path("auth/login", login_view, name="login"),
    path("save-message/", save_message, name="save_message"),
    path("voice/history", get_history, name="get_history"),
    path("voice/respond/", voice_respond, name="voice_respond"),
]