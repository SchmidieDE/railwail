import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, ImageIcon, Loader2, Maximize, Minimize, WandSparkles, ArrowDownToLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";




const ImageGenerated = ({image, index}: {image: string | null, index: number}) => {

  const [open, setOpen] = useState(false);

  const handleDownload = async () => {
    try {
      // Fetch the image data
      const response = await fetch(image);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      // Convert response to a Blob
      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob);

      // Create an anchor element to programmatically trigger a download
      const a = document.createElement('a');
      a.href = blobUrl;
      // Optional: specify a filename
      const urlParts = image.split('/');
      const suggestedFileName = urlParts[urlParts.length - 1] || 'downloaded-image';
      a.download = suggestedFileName;
      
      // Append the anchor to the body and trigger a click
      document.body.appendChild(a);
      a.click();

      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };



  return (
    <div>
      <div className="w-full h-[200px] aspect-square my-2 rounded-lg border flex items-center justify-center relative">
        {image === null ? (
          <div className="flex flex-col items-center justify-center">
            <ImageIcon className="w-16 h-16 text-primary" />
            <Loader2 className="w-8 h-8 animate-spin text-primary mt-auto" />
          </div>
        ) : (
          <>
            <img 
              src={image} 
              alt={`Generated image ${index + 1}`}
              className="w-full h-full object-contain rounded-lg"
            />
            <button 
              className="absolute bottom-2 left-2 bg-secondary hover:bg-secondary/80 p-2 rounded-md shadow-md"
              onClick={handleDownload}
            >
              <ArrowDownToLine className="w-7 h-7 text-white"/>
            </button>
            <button 
              className="absolute bottom-2 right-2 bg-secondary hover:bg-secondary/80 p-2 rounded-md shadow-md"
              onClick={() => setOpen(true)}
            >
              <Maximize className="w-7 h-7 text-white"/>
            </button>
          </>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setOpen(false)}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <img 
              src={image!} 
              alt={`Generated image ${index + 1}`}
              className="max-h-[70vh] max-w-[70vw] min-w-[70vw] object-contain rounded-lg"
            />
            <button 
              className="absolute bottom-2 left-2 bg-secondary hover:bg-secondary/80 p-2 rounded-md shadow-md"
              onClick={handleDownload}
            >
              <ArrowDownToLine className="w-7 h-7 text-white"/>
            </button>
            <button 
              className="absolute bottom-2 right-2 bg-secondary hover:bg-secondary/80 p-2 rounded-md shadow-md"
              onClick={() => setOpen(false)}
            >
              <Minimize className="w-7 h-7 text-white"/>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


const ImageModel = () => {


  const {toast} = useToast(); 

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
    // Check if all fields are filled 
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    const imageSizes = [
      "https://upload.wikimedia.org/wikipedia/commons/f/f8/Aspect-ratio-16x9.svg",
      "https://g2.img-dpreview.com/DB98322612CD4259830FEC9067CB8E89.jpg",
      "https://s3.amazonaws.com/www-inside-design/uploads/2020/10/aspect-ratios-blogpost-1x1-1.png"

    ]

    setGeneratedImages([ "https://upload.wikimedia.org/wikipedia/commons/f/f8/Aspect-ratio-16x9.svg", ...generatedImages, ...imageSizes]);

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
      <Button onClick={handleGenerate} disabled={generateLoading} className="transition-all hover:scale-105 hover:shadow-lg hover:drop-shadow-[1_1_1rem_primary] bg-gradient-to-r from-primary via-primary/60 to-secondary text-white">
        {generateLoading ? <>Generating...<Loader2 className="animate-spin ml-1" /></> : <>Generate <WandSparkles className="ml-1" /></>}  
      </Button> 
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

const TextModel = () => {
  return <div>TextModel</div>
}

export default ImageModel;