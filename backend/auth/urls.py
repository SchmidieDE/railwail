
from django.contrib import admin
from django.urls import path, include 
from knox import views as knox_views

# Base "Router" 
urlpatterns = [
    path("admin/", admin.site.urls),
    
    
    
    path("password-reset/", include("django_rest_passwordreset.urls", namespace="password-reset")), # Handles password reset logic, send email etc. 
    path("logout/", knox_views.LogoutAllView.as_view(), name="knox_logoutall"), # Deletes just the auth token from the DB (all devices)
    path("auth/", include("knox.urls")), # Know is storing session, auth tokens in DB => knox_authtoken table (login, logout, logoutall, etc.)
    
    
    path("ai/", include("ai.urls")), # Everything related to models, storage, etc. 
    
    
    
    path("", include("users.urls")),# Login, Register. etc.
    
    
    
]
