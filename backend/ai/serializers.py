from rest_framework import serializers 
from .models import * 






class AiModelSerializer(serializers.ModelSerializer):
  class Meta:
    model = AiModel
    fields = '__all__'
