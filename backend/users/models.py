from django.db import models
from django.contrib.auth.models import AbstractUser
# To remove username 
from django.contrib.auth.base_user import BaseUserManager
# Password reset  
from django_rest_passwordreset.signals import reset_password_token_created 
from django.dispatch import receiver
from django.template.loader import render_to_string 
import os 
import resend 


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



# Trigger, checks if new entry into DB, if yes check and then send email to user relation
@receiver(reset_password_token_created)
def password_reset_token_created(reset_password_token, *args, **kwargs):
  base_url = os.getenv("BASE_URL")
  
  paramter_token = f"?token={reset_password_token.key}"
  
  full_url = f"{base_url}password-reset/{paramter_token}"
  
  print(full_url)
  
  context = {
    'full_url': full_url, 
    'email_address': reset_password_token.user.email,
  }
  
  #Load file from template check if specified correclty in settings.py 
  html_message = render_to_string('email.html', context)
  
  
  
  resend.api_key = os.environ["RESEND_API_KEY"]

  params: resend.Emails.SendParams = {
      "from": "Railwail <noreply@railwail.com>",
      "to": [reset_password_token.user.email],
      "subject": "Password Reset Request - Railwail.com",
      "html": html_message, 
  }

  email = resend.Emails.send(params)
  print(email)


  



