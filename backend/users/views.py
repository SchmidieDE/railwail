from django.shortcuts import render
from rest_framework import viewsets, permissions 
from .serializers import *  
from .models import * 
from rest_framework.response import Response 
from rest_framework import status  
from django.contrib.auth import get_user_model
# Get the user model that is cura ative   
User = get_user_model() 



class RegisterViewsets(viewsets.ModelViewSet):
  permission_classes = [permissions.AllowAny] # That can trigger the viewset, also IS
  queryset = User.objects.all()
  serializer_class = RegisterSerializer 
  
  
  def create(self, request):
    serializer = self.serializer_class(data=request.data) 

    if serializer.is_valid(): # Only use if no input error from frontend 
      serializer.save()
      return Response(serializer.data) # Return the data, that was sent, without the password! 
    else: #other theis 
      return Response(serializer.errors, status=400) # 400 Clienterror, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server ...
