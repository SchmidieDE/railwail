from django.shortcuts import render
from rest_framework import viewsets, permissions 
from .serializers import *  
from .models import * 
from rest_framework.response import Response 
from rest_framework import status  
from django.contrib.auth import get_user_model, authenticate
from knox.models import AuthToken
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt



# Get the user model that is cura ative   
User = get_user_model() 



@method_decorator(csrf_exempt, name='dispatch') 
class  UserViewset(viewsets.ModelViewSet):
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    http_method_names = ['get','put']

    # GET user information
    def list(self, request, *args, **kwargs):
      serializer = self.serializer_class(request.user)
      return Response(serializer.data, status=status.HTTP_200_OK)


    # PUT to update user information
    def put(self, request, *args, **kwargs):
      """Handle PATCH requests"""
      
      user_id = request.user.id
      if not user_id:
        return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)
      
      try:
        user = CustomUser.objects.get(id=user_id)
        serializer = self.get_serializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
      except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
      
      
      return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)
      
      
      
      
      
      
      
    



class LoginViewset(viewsets.ViewSet):
  permission_classes = [permissions.AllowAny]
  serializer_class = LoginSerializer

  def create(self, request):
    
    serializer = self.serializer_class(data=request.data) #pointing to LoginSerializer 
    
    if serializer.is_valid():  
      email=serializer.validated_data['email'].lower()
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
    data = request.data.copy()
    if 'email' in data:
        data['email'] = data['email'].lower()
    
    serializer = self.serializer_class(data=data)

    if serializer.is_valid(): # Only use if no input error from frontend 
      serializer.save()
      return Response(serializer.data) # Return the data, that was sent, without the password! 
    else: #other theis 
      return Response(serializer.errors, status=400) # 400 Clienterror, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server ...

