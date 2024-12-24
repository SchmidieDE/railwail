from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
import uuid
from django.conf import settings
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.conf import settings
from django.contrib.postgres.fields import ArrayField 
# We dont use CustomUser, because of circular imports!



class AiModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField()
    cost = models.IntegerField()
    type = models.TextField()
    slug = models.TextField(unique=True)
    description = models.TextField()
    samples= ArrayField(models.URLField(), blank=True, default=list)
    
    # models stored in the DB  for example flux, etc. 



class Image(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    model = models.ForeignKey(AiModel, on_delete=models.CASCADE, related_name='images')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='images')
    prompt = models.TextField()
    aspect_ratio = models.TextField()
    format = models.TextField()
    url = models.TextField()
    saved = models.BooleanField(default=False)
    name = models.TextField(default="Image_"+uuid.uuid4().hex[:8])
    # Images stored in the DB Supabase  
    

class Video(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    model = models.ForeignKey(AiModel, on_delete=models.CASCADE, related_name='videos')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='videos')
    prompt = models.TextField()
    format = models.TextField()
    url = models.TextField()
    saved = models.BooleanField(default=False)
    name = models.TextField(default="Image_"+uuid.uuid4().hex[:8])
    #  Videos stored in the DB Supabase  
    
    
class Audio(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    model = models.ForeignKey(AiModel, on_delete=models.CASCADE, related_name='audios')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='audios')
    prompt = models.TextField()
    format = models.TextField()
    url = models.TextField()
    saved = models.BooleanField(default=False)
    name = models.TextField(default="Image_"+uuid.uuid4().hex[:8])
    #  Audios stored in the DB Supabase  
    
    
    
# DB Seeding with some sample models after Migration has applied  
@receiver(post_migrate)
def seed_models(sender, **kwargs):
  if sender.name == 'ai':
    from ai.models import AiModel

    models_to_create = [
      {
        'slug': 'black-forest-labs/flux-1.1-pro-ultra',
        'name': 'Flux-1.1-pro-ultra',
        'cost': 6,
        'type': 'image',
        'samples': ["image1.jpg"],
        'description': 'Flux-1.1-pro-ultra is a powerful image generation model that can create high-quality images with a wide range of styles and subjects.'
      },
      {
        'slug': 'luma/photon',
        'name': 'Luma Photon',
        'cost': 3,
        'type': 'image',
        'samples': ["image2.jpg"],
        'description': 'Luma Photon is a powerful image generation model that can create high-quality images with a wide range of styles and subjects.'
      },
      {
        'slug': 'recraft-ai/recraft-20b',
        'name': 'Recraft-20b',
        'cost': 10,
        'type': 'image',
        'samples': ["image3.jpg"],
        'description': 'Recraft-20b is a powerful image generation model that can create high-quality images with a wide range of styles and subjects.'
      },
      {
        'slug': 'minimax/video-01',
        'name': 'Video-01',
        'cost': 50,
        'type': 'video',
        'samples': ["video1.jpg"],
        'description': 'Video-01 is a powerful video generation model that can create high-quality videos with a wide range of styles and subjects.'
      },
      {
        'slug': 'minimax/video-01-live',
        'name': 'Video-01-live',
        'cost': 50,
        'type': 'video',
        'samples': ["video2.jpg"],
        'description': 'Video-01-live is a powerful video generation model that can create high-quality videos with a wide range of styles and subjects.'
      },
      {
        'slug': 'luma/ray',
        'name': 'Luma Ray',
        'cost': 45,
        'type': 'video',
        'samples': ["video3.jpg"],
        'description': 'Luma Ray is a powerful video generation model that can create high-quality videos with a wide range of styles and subjects.'
      },
      {
        'slug': 'minimax/music-01',
        'name': 'Music-01',
        'cost': 4,
        'type': 'audio',
        'samples': ["audio1.jpg"],
        'description': 'Music-01 is a powerful audio generation model that can create high-quality audio with a wide range of styles and subjects.'
      },
      {
        'slug': 'zsxkib/flux-music:eebfed4a1749bb1172f005f71fac5a1e0377502ec149c9d02b56ac1de3aa9f07',
        'name': 'Flux-music',
        'cost': 10,
        'type': 'audio',
        'samples': ["audio2.jpg"],
        'description': 'Flux-music is a powerful audio generation model that can create high-quality audio with a wide range of styles and subjects.'
      }
    ]
        
    for model in models_to_create:
        AiModel.objects.get_or_create(**model)