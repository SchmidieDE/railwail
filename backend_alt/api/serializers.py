from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework import serializers
from .models import Note, AImodels


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}


class AIModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AImodels
        fields = ['name', 'path', 'description']
