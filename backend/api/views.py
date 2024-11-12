from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from .models import AImodels
from rest_framework.views import APIView
from rest_framework.response import Response
import replicate
import os 
from dotenv import load_dotenv

load_dotenv()

api_token = os.getenv("REPLICATE_API_TOKEN")


client = replicate.Client(api_token=api_token)

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class TestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print(request.data, "THIS IS THE BACKANED WTF")
        return Response({"message": "Test endpoint is really fucking working and i dont know why!"})


class AIModelInsert(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        models = AImodels.objects.all()
        data = [{"name": model.name, "path": model.path, "description": model.description} for model in models]
        return Response(data)

    def post(self, request):
        try:
            new_model = AImodels.objects.create(
                name=request.data.get('name'),
                path=request.data.get('path'),
                description=request.data.get('description', '')
            )
            return Response({
                "message": "Model created successfully",
                "data": {
                    "name": new_model.name,
                    "path": new_model.path,
                    "description": new_model.description
                }
            })
        except Exception as e:
            return Response({"error": str(e)}, status=400)
    
    
# IMAGE MODELS API 
class ImageModelGenerate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        model_name = request.data.get('model_name', 'black-forest-labs/flux-1.1-pro-ultra')
        prompt = request.data.get('prompt', 'Mach ein Bild von einem Porsche 911')
        aspect_ratio = request.data.get('aspect_ratio', '16:9')
        output_format = request.data.get('output_format', 'jpg')
        color = request.data.get('color', '')
        safety_tolerance = request.data.get('safety_tolerance', 2)

        # Add color to prompt if provided
        full_prompt = f"{prompt} {color}".strip()
        
        output = replicate.run(
            model_name,  # Use the model_name parameter
            input={
                "raw": False,
                "prompt": full_prompt,
                "aspect_ratio": aspect_ratio,
                "output_format": output_format,
                "safety_tolerance": safety_tolerance
            }
        )
        url = output.url
        print(url)
        return Response({
            "message": "Image generated successfully",
            "data": {
                "image_url": url  # output from replicate contains the image URL
            }
        })
