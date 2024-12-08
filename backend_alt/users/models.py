from django.db import models 
from django.contrib.auth.models import AbstractUser


# I want to use the existing User, just add some fields like tokens, tokensused, etc.
# Token 100 = 1€  = 100 cents 
class CustomUser(AbstractUser):
  email = models.EmailField(unique=True)
  tokens = models.IntegerField(default=100)


  # This is the field that will be used to login 
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = []