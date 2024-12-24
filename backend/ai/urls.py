

from django.contrib import admin
from django.urls import path, include 
from rest_framework.routers import DefaultRouter 

from .views import *  


router = DefaultRouter()
router.register(r'generate/image', GenerateImageViewSet, basename='generate-image')
router.register(r'generate/video', GenerateVideoViewSet, basename='generate-video')
router.register(r'generate/audio', GenerateAudioViewSet, basename='generate-audio')
router.register(r'ai-models', AiModelViewSet, basename='ai-models')

urlpatterns = router.urls
