from rest_framework import serializers 
from .models import * 



class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'  

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

class AudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audio
        fields = '__all__'

class AiModelSerializer(serializers.ModelSerializer):
  class Meta:
    model = AiModel
    fields = '__all__'
