
from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter 
from .models import *

from .views import *  

router = DefaultRouter()
router.register(r'register', RegisterViewsets, basename='register') 
router.register(r'login', LoginViewset, basename='login') 


# Get infomrations about the user itself 
router.register(r'user', UserViewset, basename='user') 




urlpatterns = router.urls 

