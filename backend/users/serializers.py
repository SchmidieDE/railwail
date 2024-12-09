from rest_framework import serializers 
from .models import * 
from django.contrib.auth import get_user_model
# get_user_model() => get the user model that is currently active in this project 

User = get_user_model()

# Serializer for converting JSON to python objects and vice versa 
class RegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'email', 'password']
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
      
      user = User.objects.create_user(email=validated_data['email'], password=validated_data['password'])
      return user
