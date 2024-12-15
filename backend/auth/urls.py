
from django.contrib import admin
from django.urls import path, include 
from knox import views as knox_views

# Base "Router" 
urlpatterns = [
    path("admin/", admin.site.urls),
    
    
    
    path("password-reset/", include("django_rest_passwordreset.urls", namespace="password-reset")), # Handles password reset logic, send email etc. 
    path("logout/", knox_views.LogoutAllView.as_view(), name="knox_logoutall"), # Deletes just the auth token from the DB (all devices)
    path("auth/", include("knox.urls")), # Know is storing session, auth tokens in DB => knox_authtoken table (login, logout, logoutall, etc.)
    
    
    path("", include("users.urls")),
    
    
    path("image-models/generate", lambda request: print("Image-models wurde aufgerufen!") or include("image_models.urls")(request)),
]
