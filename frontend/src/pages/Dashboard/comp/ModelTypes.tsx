import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, ImageIcon, Loader2, Maximize, Minimize, WandSparkles, ArrowDownToLine, VideoIcon, MusicIcon, Play, Pause } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useToast } from "../../../hooks/use-toast"
import api from "@/lib/api";

import { Model } from "@/types/aimodel";
import { ImageGenerated, VideoGenerated, AudioGenerated } from "./GeneratedFiles";


const GenerateButton = ({loading, onClick}: {loading: boolean, onClick: () => void}) => {
  return <Button onClick={onClick} disabled={loading} className="text-xl transition-all hover:scale-105 hover:shadow-lg hover:drop-shadow-[1_1_1rem_primary] bg-gradient-to-r from-primary via-primary/60 to-secondary text-white">
    {loading ? <>Generating...<Loader2 className="animate-spin ml-1" /></> : <>Generate <WandSparkles className="ml-1" /></>}  
  </Button>
}




const ImageModel = ({model}: {model: Model}) => {


  const { toast } = useToast()


  const [generateLoading, setGenerateLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<(string | null)[]>([]);

  // Prompt settings which are submited to backend via API
  const [promptSettings, setPromptSettings] = useState({
    prompt: "",
    format: "png",
    aspectRatio: "9:16"
  });


  const handleGenerate = async() => {
    

    // Could be improved by checking aspect ratio and format 
    if (promptSettings.prompt === "" || promptSettings.format === "" || promptSettings.aspectRatio === "") {
      toast({
        title: "Prompt is required",
        variant: "destructive",
        description: "Please enter a prompt to generate an image",
      });
      return;
    }
    
    setGenerateLoading(true);
    setGeneratedImages([null, ...generatedImages] );

    const resp = await api.post("/ai/generate/image/", {
      prompt: promptSettings.prompt,
      format: promptSettings.format,
      aspectRatio: promptSettings.aspectRatio,
      model_slug: model.slug
    })



    


    if (resp.status !== 200) {
      const data = await resp.json();
      toast({
        title: "Error",
        description: data?.message || "Something went wrong while generating the image",
        variant: "destructive",
      });
      setGenerateLoading(false);
      setGeneratedImages([...generatedImages]);
      console.log("ERROR");
      return;
      
    }

    const data = await resp.json();
    const {user_id, image_url} = data;

    // correct src url because we are fetching it from supabase bucket 
    const imageUrl = `${import.meta.env.VITE_SUPABASE_BASE_URL}/user_${user_id}/${image_url}`;
    
    setGeneratedImages([ imageUrl, ...generatedImages]);

    setGenerateLoading(false);
    toast({
      title: "Image generated",
      description: "Your image has been generated successfully",
    });
  }



  


  
  return (
    <div className="flex flex-col gap-2">
      <Label>Prompt</Label> 
      <Textarea placeholder="Describe the image you want to generate" value={promptSettings.prompt} onChange={(e) => setPromptSettings({...promptSettings, prompt: e.target.value})} />
      <div className="flex flex-row gap-2">
        <div className="w-1/2">
          <Label>Image Format</Label>
          <Select value={promptSettings.format} onValueChange={(value) => setPromptSettings({...promptSettings, format: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select image format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="jpg">JPG</SelectItem>
              <SelectItem value="webp">WEBP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-1/2">
          <Label>Aspect Ratio</Label>
          <Select onValueChange={(value) => setPromptSettings({...promptSettings, aspectRatio: value})} value={promptSettings.aspectRatio}>
            <SelectTrigger>
              <SelectValue  placeholder="Select aspect ratio" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="1:1">Square (1:1)</SelectItem>
              <SelectItem value="16:9">Widescreen (16:9)</SelectItem>
              <SelectItem value="9:16">TikTok/Story (9:16)</SelectItem>
              <SelectItem value="4:3">Standard (4:3)</SelectItem>
              <SelectItem value="3:2">Photo (3:2)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <GenerateButton loading={generateLoading} onClick={handleGenerate} />
      <div className="my-2 flex flex-row gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary overflow-y-hidden pb-4">
        {generatedImages.map((image, index) => (
          <ImageGenerated 
            key={index}
            image={image} 
            index={index}
          />
        ))}
      </div>
    </div>
  )
}





/* 

FEATURE WILL BE ADDED LATER ON 

const TextModel = () => {


  const {toast} = useToast(); 

  const [generateLoading, setGenerateLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState<(string | null)[]>([]);

  const [promptSettings, setPromptSettings] = useState({
    prompt: ""
  });



  const handleGenerate = async() => {


    // Could be improved by checking aspect ratio and format 
    if (promptSettings.prompt === "") {
      toast({
        title: "Prompt is required",
        variant: "destructive",
        description: "Please enter a prompt to generate text",
      });
      return;
    }



    setGenerateLoading(true);
    setGeneratedText([null, ...generatedText] );
    
    setGenerateLoading(false);
    toast({
      title: "Text generated",
      description: "Your text has been generated successfully",
    });
  }

  



  return (
    <div className="flex flex-col gap-2">
    <Label>Prompt</Label> 
    <Textarea placeholder="Describe the text you want to generate" value={promptSettings.prompt} onChange={(e) => setPromptSettings({...promptSettings, prompt: e.target.value})} />
    <GenerateButton loading={generateLoading} onClick={handleGenerate} />
    </div>

  )
}

*/







const VideoModel = ({model}: {model: Model}) => {


  const {toast} = useToast(); 

  const [generateLoading, setGenerateLoading] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<(string | null)[]>([]);

  const [promptSettings, setPromptSettings] = useState({
    prompt: ""
  });


  useEffect(() => {
    console.log(generatedVideo, "GENERATED VIDEO");
  }, [generatedVideo]);


  const handleGenerate = async() => {


    // Could be improved by checking aspect ratio and format 
    if (promptSettings.prompt === "") {
      toast({
        title: "Prompt is required",
        variant: "destructive",
        description: "Please enter a prompt to generate a video",
      });
      return;
    }
    
    setGenerateLoading(true);
    setGeneratedVideo([null, ...generatedVideo] );

    const resp = await api.post("/ai/generate/video/", {
      prompt: promptSettings.prompt,
      model_slug: model.slug
    })


    if (resp.status !== 200) {
      const data = await resp.json();
      toast({
        title: "Error",
        description: data?.message || "Something went wrong while generating the image",
        variant: "destructive",
      });
      setGenerateLoading(false);
      setGeneratedVideo([...generatedVideo]);
      console.log("ERROR");
      return;
      
    }

    const data = await resp.json();
    const {user_id, video_url} = data;

    console.log(data, "DATA");

    // correct src url because we are fetching it from supabase bucket 
    const videoUrl = `${import.meta.env.VITE_SUPABASE_BASE_URL}/user_${user_id}/${video_url}`;
    
    setGeneratedVideo([ videoUrl, ...generatedVideo]);

    setGenerateLoading(false);
    toast({
      title: "Video generated",
      description: "Your video has been generated successfully",
    });
  }




  return (
    <div className="flex flex-col gap-2">
    <Label>Prompt</Label> 
    <Textarea placeholder="Describe the video you want to generate" value={promptSettings.prompt} onChange={(e) => setPromptSettings({...promptSettings, prompt: e.target.value})} />
    <GenerateButton loading={generateLoading} onClick={handleGenerate} />
    <div className="my-2 flex flex-row gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary overflow-y-hidden pb-4">
        {generatedVideo.map((video, index) => (
          <VideoGenerated 
            key={index}
            video={video} 
            index={index}
          />
        ))}
      </div>
    </div>
  )
}



const AudioModel = ({model}: {model: Model}) => {


  const {toast} = useToast(); 

  const [generateLoading, setGenerateLoading] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState<(string | null)[]>([]);

  const [promptSettings, setPromptSettings] = useState({
    prompt: ""
  });


  const handleGenerate = async() => {


    // Could be improved by checking aspect ratio and format 
    if (promptSettings.prompt === "") {
      toast({
        title: "Prompt is required",
        variant: "destructive",
        description: "Please enter a prompt to generate a video",
      });
      return;
    }
    
    setGenerateLoading(true);
    setGeneratedAudio([null, ...generatedAudio] );

    const resp = await api.post("/ai/generate/audio/", {
      prompt: promptSettings.prompt,
      model_slug: model.slug
    })


    if (resp.status !== 200) {
      const data = await resp.json();
      toast({
        title: "Error",
        description: data?.message || "Something went wrong while generating the image",
        variant: "destructive",
      });
      setGenerateLoading(false);
      setGeneratedAudio([...generatedAudio]);
      
      return;
      
    }

    const data = await resp.json();
    const {user_id, audio_url} = data;

    // correct src url because we are fetching it from supabase bucket 
    const audioUrl = `${import.meta.env.VITE_SUPABASE_BASE_URL}/user_${user_id}/${audio_url}`;
    
    setGeneratedAudio([ audioUrl, ...generatedAudio]);

    setGenerateLoading(false);
    toast({
      title: "Audio generated",
      description: "Your audio has been generated successfully",
    });
  }





  return (
  <div className="flex flex-col gap-2">
    <Label>Prompt</Label> 
    <Textarea placeholder="Write the lyrics of the audio you want to generate" value={promptSettings.prompt} onChange={(e) => setPromptSettings({...promptSettings, prompt: e.target.value})} />
    <GenerateButton loading={generateLoading} onClick={handleGenerate} />
    <div className="my-2 flex flex-row gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary overflow-y-hidden pb-4">
      {generatedAudio.map((audio, index) => (
        <AudioGenerated 
          key={index}
          audio={audio} 
          index={index}
        />
      ))}
    </div>
  </div>
  )
}

export {ImageModel,/* TextModel, */ VideoModel, AudioModel};