

from django.contrib import admin
from django.urls import path, include 
from rest_framework.routers import DefaultRouter 

from .views import *  


router = DefaultRouter()
# Generate Routes 
router.register(r'generate/image', GenerateImageViewSet, basename='generate-image')
router.register(r'generate/video', GenerateVideoViewSet, basename='generate-video')
router.register(r'generate/audio', GenerateAudioViewSet, basename='generate-audio')

# Get all Models 
router.register(r'ai-models', AiModelViewSet, basename='ai-models')

# Get all files an user has generated 
router.register(r'generated-files', GeneratedFileViewSet, basename='generated-files')



# Modifiy Generated Image  

urlpatterns = router.urls
