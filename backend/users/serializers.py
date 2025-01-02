from rest_framework import serializers 
from .models import * 
from django.contrib.auth import get_user_model
# get_user_model() => get the user model that is currently active in this project 

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
  class Meta:
      model = User
      fields = ('id', 'email', 'tokens', 'tokensused', 'username','first_name', 'last_name')  # Add any other fields you want to expose
  
  def put(self, instance, validated_data):
    non_updatable_fields = ('tokens', 'tokensused')
    # Remove non-updatable fields from validated_data
    for field in non_updatable_fields:
      validated_data.pop(field, None)
    # Update user instance with validated data
    for attr, value in validated_data.items():
      setattr(instance, attr, value)
    instance.save()
    return instance

class LoginSerializer(serializers.Serializer):
  email = serializers.EmailField()
  password = serializers.CharField()
  
  def to_representation(self, instance):
    ret = super().to_representation(instance)
    ret.pop('password', None) # Password not exposed to User 
    return ret



# Serializer for converting JSON to python objects and vice versa 
class RegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'email', 'password']
    extra_kwargs = {'password': {'write_only': True}} #Password not exposed to User 

  def create(self, validated_data):
      
      user = User.objects.create_user(email=validated_data['email'], password=validated_data['password'])
      return user


