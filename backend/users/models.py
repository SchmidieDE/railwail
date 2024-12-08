from django.db import models
from django.contrib.auth import AbstractUser

# Extend base django model with additional fields tokens, tokensused

class CustomUser(AbstractUser):
  # So that users cant have same email mutlipe times 
  email = models.EmailField(unique=True)
  tokens = models.IntegerField(default=100)

  
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = []
