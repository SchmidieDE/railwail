from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    
    #Authentication
    path("auth/", include("auth.urls")),
    
    #Users 
    path("users/", include("users.urls")),
    
    
    
    # AI Models 
    path("api/", include("api.urls")),
]
