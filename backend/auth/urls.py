
from django.contrib import admin
from django.urls import path, include 


# Base "Router" 
urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("users.urls")),
    path("api/auth/", include("knox.urls")), # Know is storing session, auth tokens in DB => knox_authtoken table (login, logout, logoutall, etc.)
    path("api/password_reset/", include("django_rest_passwordreset.urls", namespace="password_reset")),
    
    
    path("image-models/generate", lambda request: print("Image-models wurde aufgerufen!") or include("image_models.urls")(request)),
]
