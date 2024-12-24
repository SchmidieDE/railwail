from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import AiModel, Image, Video, Audio
from users.models import CustomUser
from .serializers import AiModelSerializer
import replicate
import os
import requests
from supabase import create_client, Client
import uuid

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase = create_client(supabase_url, supabase_key)


def ReplicateErrorHandler(e):
  match(e.title):
    case "Rate limit exceeded":
      return Response({'message': 'Rate limit exceeded', 'status': 'error'}, status=400)
    case "Invalid input":
      return Response({'message': 'Invalid input', 'status': 'error'}, status=400)
    case "Input validation failed":
      return Response({'message': 'Please select a different format or aspect ratio', 'status': 'error'}, status=400)
    case "Model not found":
      return Response({'message': 'Model not found', 'status': 'error'}, status=400)



class GenerateImageViewSet(viewsets.ViewSet):
    
    # Authentication needed
    permission_classes = [permissions.IsAuthenticated]
    
  
  
    def create(self, request): # Post request   
      
      
      print(request, "The request")
      
      
      
      try:
        data = request.data
        prompt = data.get('prompt', 'Generate an porsche 911') # Fallback prompt 
        model_slug  = data.get('model_slug') # slug of model 
        format = data.get('format', 'jpg')
        aspectRatio = data.get('aspectRatio', '3:2')
        
        
        # If not found error is thrown
        get_AI_Model = AiModel.objects.get(slug=model_slug)
        # make sure to get the cost from db not the user input 
        cost = get_AI_Model.cost

      

        # check if user has enough credits
        user_id = request.user.id
        get_user = CustomUser.objects.get(id=user_id)
        #Tokens which are available for the user 
        user_tokens = get_user.tokens
        user_tokens_used = get_user.tokensused
        if user_tokens <= cost:
            return Response({'message': 'Insufficient credits', 'status': 'error'}, status=400)
        
        
        
        try:
          output = replicate.run(
            get_AI_Model.slug,
            input={
                "raw": False,
                "prompt": prompt,
                "aspect_ratio": aspectRatio,
                "output_format": format,
                "safety_tolerance": 2,
                "image_prompt_strength": 0.2
            }
          )
          
          image = requests.get(output)
          # We save the image seperatly in an S3 bucket 
          # We want to scale the project later on, thats why it 
          # doesnt make sense to save the image locally on the server 
          image_url = uuid.uuid4()
          
          supabase.storage.from_("railwail").upload(
            file=image.content,
            path=f"user_{user_id}/{image_url}.{format}",
            file_options={"content-type": f"image/{format}"}
          )
          # Save the image in the image folder which is linked to the user 
          Image.objects.create(
            model=get_AI_Model,
            user=get_user,
            prompt=prompt,
            aspect_ratio=aspectRatio,
            format=format,
            url=f"{image_url}.{format}"
          )
          
          # Update the user's tokens and tokens used if successful
          CustomUser.objects.update(tokens=user_tokens - cost, tokensused=user_tokens_used + cost)
          
          return Response({'message': 'Image generated successfully', 'status': 'success', 'image_url': f"{image_url}.{format}", 'user_id': user_id}, status=200)
          
          
        
        except Exception as e:
          return ReplicateErrorHandler(e)
        
        

      except Exception as e:
        # Model not found, or other error
        return Response({'message': 'Invalid request', 'status': 'error'}, status=400)
        
        
        


class GenerateVideoViewSet(viewsets.ViewSet):
    
    # Authentication needed
    permission_classes = [permissions.IsAuthenticated]
    
  
  
    def create(self, request): # Post request   
      
      
      try:
        data = request.data
        prompt = data.get('prompt', 'Generate an porsche 911') # Fallback prompt 
        model_slug  = data.get('model_slug') # slug of model 
                
        # If not found error is thrown
        get_AI_Model = AiModel.objects.get(slug=model_slug)
        # make sure to get the cost from db not the user input 
        cost = get_AI_Model.cost

      

        # check if user has enough credits
        user_id = request.user.id
        get_user = CustomUser.objects.get(id=user_id)
        #Tokens which are available for the user 
        user_tokens = get_user.tokens
        user_tokens_used = get_user.tokensused
        if user_tokens <= cost:
            return Response({'message': 'Insufficient credits', 'status': 'error'}, status=400)
        
        
        
        try:
          output = replicate.run(
            get_AI_Model.slug,
            input={
                "prompt": prompt,
            }
          )
          
          video = requests.get(output)
          print(output, "The format")
          format = str(output).split('.')[-1]
          print(format, "The format")
          
          # We save the vidoe seperatly in an S3 bucket 
          # We want to scale the project later on, thats why it 
          # doesnt make sense to save the image locally on the server 
          
          video_url = uuid.uuid4()
          supabase.storage.from_("railwail").upload(
            file=video.content,
            path=f"user_{user_id}/{video_url}.{format}",
            file_options={"content-type": f"video/{format}"}
          )
          # Save the image in the image folder which is linked to the user 
          Video.objects.create(
            model=get_AI_Model,
            user=get_user,
            prompt=prompt,
            format=format,
            url=f"{video_url}.{format}"
          )
          
          # Update the user's tokens and tokens used if successful
          CustomUser.objects.update(tokens=user_tokens - cost, tokensused=user_tokens_used + cost)
          
          return Response({'message': 'Image generated successfully', 'status': 'success', 'vidoe_url': f"{video_url}.{format}", 'user_id': user_id}, status=200)
          
          
        
        except Exception as e:
          print(e, "The error")
          return ReplicateErrorHandler(e)
        
        

      except Exception as e:
        # Model not found, or other error
        print(e, "The error")
        return Response({'message': 'Invalid request', 'status': 'error'}, status=400)
        
        
        


class GenerateAudioViewSet(viewsets.ViewSet):
    
    # Authentication needed
    permission_classes = [permissions.IsAuthenticated]
    
  
  
    def create(self, request): # Post request   
      
      try:
        data = request.data
        prompt = data.get('prompt', 'Generate a music song about the porsche 911') # Fallback prompt 
        model_slug  = data.get('model_slug') # slug of model 
        
        
        # If not found error is thrown
        get_AI_Model = AiModel.objects.get(slug=model_slug)
        # make sure to get the cost from db not the user input 
        cost = get_AI_Model.cost

      

        # check if user has enough credits
        user_id = request.user.id
        get_user = CustomUser.objects.get(id=user_id)
        #Tokens which are available for the user 
        user_tokens = get_user.tokens
        user_tokens_used = get_user.tokensused
        if user_tokens <= cost:
            return Response({'message': 'Insufficient credits', 'status': 'error'}, status=400)
        
        
        
        try:
          output = replicate.run(
            get_AI_Model.slug,
            input={
                "prompt": prompt,
            }
          )
          
          image = requests.get(output)
          

          # We save the image seperatly in an S3 bucket 
          # We want to scale the project later on, thats why it 
          # doesnt make sense to save the image locally on the server 
          image_url = uuid.uuid4()
          
          supabase.storage.from_("railwail").upload(
            file=image.content,
            path=f"user_{user_id}/{image_url}.{format}",
            file_options={"content-type": f"audio/{output.split('.')[1]}"}
          )
          # Save the image in the image folder which is linked to the user 
          Audio.objects.create(
            model=get_AI_Model,
            user=get_user,
            prompt=prompt,
            aspect_ratio=aspectRatio,
            format=format,
            url=f"{image_url}.{format}"
          )
          
          # Update the user's tokens and tokens used if successful
          CustomUser.objects.update(tokens=user_tokens - cost, tokensused=user_tokens_used + cost)
          
          return Response({'message': 'Image generated successfully', 'status': 'success', 'image_url': f"{image_url}.{format}", 'user_id': user_id}, status=200)
          
          
        
        except Exception as e:
          return ReplicateErrorHandler(e)
        

      except Exception as e:
        # Model not found, or other error
        return Response({'message': 'Invalid request', 'status': 'error'}, status=400)
        
        
        
        
class AiModelViewSet(viewsets.ViewSet):
   # No authentication needed
  
   def list(self, request):
    ai_models = AiModel.objects.all()
    serializer = AiModelSerializer(ai_models, many=True)  # Serialize multiple objects
    return Response({'ai_models': serializer.data}, status=200)
  
  
    

