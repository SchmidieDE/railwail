from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from django.urls import include

urlpatterns = [
    
    #Authentication
    #path("user/register/", views.CreateUserView.as_view(), name="register"),
    #path("token/", TokenObtainPairView.as_view(), name="get_token"),
    #path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    #path("token/verify/", TokenVerifyView.as_view(), name="verify"),
    
    #path("api-auth/", include("rest_framework.urls")),
    
    
    
    #Modells API 
    path("image-models/generate", views.ImageModelGenerate.as_view(), name="ai-model-generate"),
]
