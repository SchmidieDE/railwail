from django.db import models
from django.contrib.auth.models import AbstractUser
# To remove username 
from django.contrib.auth.base_user import BaseUserManager



class CustomUserManager(BaseUserManager):
  def create_user(self, email, password=None, **extra_fields):
    # Note **extra_fields => additional fields  tokens, tokensused, etc.
    
    if not email:
      raise ValueError("Email is a required field")
    
    email = self.normalize_email(email) # Lowercase, remove spaces, etc. 
    user = self.model(email=email, **extra_fields)
    user.set_password(password)
    user.save(using=self._db)
    return user
  
  def create_superuser(self, email, password=None, **extra_fields):
    # add some addional fields for "addiontal rights"
    extra_fields.setdefault('is_superuser', True)
    return self.create_user(email, password, **extra_fields)
  
  def create_staffuser():
    pass 
  
    


# Extend base django model with additional fields tokens, tokensused

class CustomUser(AbstractUser):
  # So that users cant have same email mutlipe times 
  email = models.EmailField(unique=True)
  # 100 Tokens = 1€
  tokens = models.IntegerField(default=100)
  tokensused = models.IntegerField(default=0)
  # Can be defined later 
  username = models.CharField(max_length=255, null=True, blank=True)
  
  
  objects = CustomUserManager()

  
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = []
