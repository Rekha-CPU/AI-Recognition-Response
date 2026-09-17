from django.urls import path
from .views import chat, signup, login_view, save_message, get_history

urlpatterns = [
    path("chat/", chat, name="chat"),
    path("signup/", signup, name="signup"),
    path("login/", login_view, name="login"),
    path("save-message/", save_message, name="save_message"),
    path("get-history/", get_history, name="get_history"),
]