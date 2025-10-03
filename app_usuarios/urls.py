from django.urls import path #type: ignore
from django.contrib.auth import views as auth_views  #type: ignore
from . import views

urlpatterns = [
    path("login/", auth_views.LoginView.as_view(template_name="telalogin/telalogin.html"), name="login"),
    path("logout/", auth_views.LogoutView.as_view(next_page="login"), name="logout"),

    # reset de senha
    path("password_reset/", auth_views.PasswordResetView.as_view(template_name="telalogin/password_reset_form.html"), name="password_reset"),
    path("password_reset_done/", auth_views.PasswordResetDoneView.as_view(template_name="telalogin/password_reset_done.html"), name="password_reset_done"),
    path("reset/<uidb64>/<token>/", auth_views.PasswordResetConfirmView.as_view(template_name="telalogin/password_reset_confirm.html"), name="password_reset_confirm"),
    path("reset/done/", auth_views.PasswordResetCompleteView.as_view(template_name="telalogin/password_reset_complete.html"), name="password_reset_complete"),
]
