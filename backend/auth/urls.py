
from django.contrib import admin
from django.urls import path, include 


# Base "Router" 
urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("users.urls")),
    path("image-models/generate", lambda request: print("Image-models wurde aufgerufen!") or include("image_models.urls")(request)),
]
