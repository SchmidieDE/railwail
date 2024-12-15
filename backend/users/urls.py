
from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter 

from .views import *  

router = DefaultRouter()
router.register(r'register', RegisterViewsets, basename='register') 
router.register(r'login', LoginViewset, basename='login') 
router.register(r'users', UserViewset, basename='users') 


urlpatterns = router.urls 

