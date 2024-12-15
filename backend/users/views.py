from django.shortcuts import render
from rest_framework import viewsets, permissions 
from .serializers import *  
from .models import * 
from rest_framework.response import Response 
from rest_framework import status  
from django.contrib.auth import get_user_model, authenticate
from knox.models import AuthToken



# Get the user model that is cura ative   
User = get_user_model() 



class LoginViewset(viewsets.ViewSet):
  permission_classes = [permissions.AllowAny]
  serializer_class = LoginSerializer

  def create(self, request):
    serializer = self.serializer_class(data=request.data) #pointing to LoginSerializer 
    
    if serializer.is_valid():  
      email=serializer.validated_data['email']
      password=serializer.validated_data['password']
      user = authenticate(request, email=email, password=password)
      if user:
        # Save token 
        _, token = AuthToken.objects.create(user) 
        return Response(
          {
            "user": self.serializer_class(user).data,
            "token": token
          }
        )
      else:
        return Response({"error": "Invalid credentials"}, status=401) # UNAUTHORIZED
    else:
      return Response(serializer.errors, status=400) # BAD REQUEST



class RegisterViewsets(viewsets.ViewSet):
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


class UserViewset(viewsets.ViewSet):
  permission_classes = [permissions.AllowAny]
  queryset = User.objects.all()
  serializer_class = RegisterSerializer

  def list(self, request):
    queryset = User.objects.all()
    serializer = self.serializer_class(queryset, many=True)
    return Response(serializer.data)
    
    
    