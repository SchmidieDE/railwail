import { useState, useEffect, useRef, } from "react";
import api from "../../api";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import MostViewedModels from "./comp/MostViewedModels";
import CategoriesList from "./comp/CategoriesList";





import { 
    ImageIcon,  // für "Generate images"
    Type,       // für "Generate text"
    FileImage,  // für "Caption images"
    Pencil,     // für "Edit images"
    RefreshCw,  // für "Restore images"
    LayoutGrid,  // für "All"
    Languages   // für "Language models"
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ModelPreview from "./comp/ModelPreview";


interface Model {
    title: string;
    runs: number;
}

interface CategoryModel {
    title: string;
    icons: React.ReactNode;
    // ... other properties
}


function Home() {
    // State für ausgewählte Kategorien
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    // State für die Besucherzahlen
    const [visitCounts, setVisitCounts] = useState({});
    // State für ausgewählte Tags
    const [selectedTags, setSelectedTags] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [dragDistance, setDragDistance] = useState(0);
    const containerRef = useRef(null);

    // Separate States für Kategorie-Scroll
    const [isScrollingCategories, setIsScrollingCategories] = useState(false);
    const [startXCategories, setStartXCategories] = useState(0);
    const [scrollLeftCategories, setScrollLeftCategories] = useState(0);
    const categoriesRef = useRef(null);

    useEffect(() => {
        //getNotes();
        const savedCounts = localStorage.getItem('visitCounts');
        if (savedCounts) {
            setVisitCounts(JSON.parse(savedCounts));
        }
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    // Funktion zum Umschalten der Kategorie-Auswahl
    const selectCategory = (category) => {
        setSelectedCategory(category);
    };

const categories = [
    {category: "Generate images",
        icons: <ImageIcon />
    }, 
    {category: "Generate text",
        icons: <Type />
    }, 
    {category: "Language models",
        icons: <Languages />
    }
]


    // Füge diese Modell-Daten am Anfang der Komponente hinzu
    const models = [


       
            {
                id: 1,
                title: "Stable Diffusion",
                description: "Generate high-quality images...",
                image: "/images/chatgpt.jpg",
                category: "Generate images",
                link: "/image-models/stable-diffusion",
                runs: 0 
            },
            // ... other models ...
        

        // Generate images
        /*

        {
        pathName: "recraft-ai/recraft-v3-svg",
        description: "asa",
        title: "Reacrd Ai V3 SVG"
        category: "image-models"
        link:...
        }


        {
        pathName: "black-forest-labs/flux-1.1-pro-ultra",
        description: "FLUX1.1 [pro] in ultra and raw modes. Images are up to 4 megapixels. Use raw mode for realism.",
        title: "FLUX1.1 [pro]"
        category: "image-models"
        link:...
    }
        


        // image models
         {
        pathName: "recraft-ai/recraft-v3",
        description: "Recraft V3 ("red_panda") is a top text-to-image model, excelling in diverse styles and verified as SOTA by Artificial Analysis.",
        title: "Recraft V3"
        category: "image-models"
        link:...
        }


         {
        pathName: "stability-ai/stable-diffusion-3.5-large",
        description: "A text-to-image model that generates high-resolution, detailed images in various styles, with diverse outputs enabled by Query-Key Normalization.",
        title: "stability-ai"
        category: "image-models"
        link:...
        }



        



        {
        pathName: "ibm-granite/granite-3.0-8b-instruct",
        description: "Granite-3.0-8B-Instruct is an 8B parameter open-source model optimized for tasks like summarization, problem-solving, translation, reasoning, and coding.",
        title: "ibm-granite"
        category: "generate text"
        link:...
        }



        {
        pathName: "black-forest-labs/flux-1.1-pro",
        description: "FLUX1.1 [pro] in ultra and raw modes. Images are up to 4 megapixels. Use raw mode for realism.",
        title: "flux-1.1-pro-ultra"
        category: "image-models"
        link:...
        }



         {
        pathName: "bytedance/sdxl-lightning-4step",
        description: "SDXL-Lightning by ByteDance: a fast text-to-image model that makes high-quality images in 4 steps",
        title: "sdxl-lightning-4step"
        category: "image-models"
        link:...
        }



         {
        pathName: "black-forest-labs/flux-schnell",
        description: "The fastest image generation model tailored for local development and personal use",
        title: "flux-schnell"
        category: "image-models"
        link:...
        }


        {
         pathName: "stability-ai/stable-diffusion",
        description: "A latent text-to-image diffusion model capable of generating photo-realistic images given any text input",
        title: "stable-diffusion"
        category: "image-models"
        link:...
        }



        {
         pathName: "stability-ai/sdxl",
        description: "A text-to-image generative AI model that creates beautiful images",
        title: "sdxl"
        category: "image-models"
        link:...
        }



         {
         pathName: "jagilley/controlnet-scribble",
        description: "Generate detailed images from scribbled drawings",
        title: "controlnet-scribble"
        category: "image-models"
        link:...
        }


        {
         pathName: "stability-ai/stable-diffusion-inpainting",
        description: "Fill in masked parts of images with Stable Diffusion",
        title: "stable-diffusion-inpainting"
        category: "image-models"
        link:...
        }



        {
         pathName: "ai-forever/kandinsky-2.2",
        description: "multilingual text2image latent diffusion model",
        title: "kandinsky-2.2"
        category: "image-models"
        link:...
        }



         {
         pathName: "datacte/proteus-v0.2",
        description: "Proteus v0.2 offers subtle but notable improvements in prompt understanding over v0.1, surpassing MJ6 and nearing its stylistic abilities.",
        title: "proteus-v0.2"
        category: "image-models"
        link:...
        }





         {
         pathName: "fofr/sdxl-emoji",
        description: "An SDXL fine-tune based on Apple Emojis",
        title: "sdxl-emoji"
        category: "image-models"
        link:...
        }






         {
         pathName: "black-forest-labs/flux-pro",
        description: "State-of-the-art image generation with top of the line prompt following, visual quality, image detail and output diversity.",
        title: "flux-pro"
        category: "image-models"
        link:...
        }



         {
         pathName: "ai-forever/kandinsky-2",
        description: "text2img model trained on LAION HighRes and fine-tuned on internal datasets",
        title: "kandinsky-2"
        category: "image-models"
        link:...
        }



        {
         pathName: "black-forest-labs/flux-dev",
        description: "A 12 billion parameter rectified flow transformer capable of generating images from text descriptions",
        title: "flux-dev"
        category: "image-models"
        link:...
        }




         {
         pathName: "black-forest-labs/flux-1.1-pro",
        description: "Faster, better FLUX Pro. Text-to-image model with excellent image quality, prompt adherence, and output diversity.",
        title: "flux-1.1-pro"
        category: "image-models"
        link:...
        }



         {
         pathName: "tstramer/material-diffusion",
        description: "Stable diffusion fork for generating tileable outputs using v1.5 model",
        title: "material-diffusion"
        category: "image-models"
        link:...
        }




         {
         pathName: "datacte/proteus-v0.3",
        description: "Stable diffusion fork for generating tileable outputs using v1.5 model",
        title: "proteus-v0.3"
        category: "image-models"
        link:...
        }



         {
         pathName: "playgroundai/playground-v2.5-1024px-aesthetic",
        description: "Playground v2.5 is the state-of-the-art open-source model in aesthetic quality",
        title: "playground-v2.5"
        category: "image-models"
        link:...
        }


        {
         pathName: "fofr/latent-consistency-model",
        description: "Super-fast, 0.6s per image. LCM with img2img, large batching and canny controlnet",
        title: "latent-consistency-model"
        category: "image-models"
        link:...
        }




        {
         pathName: "lucataco/ssd-1b",
        description: "Segmind SSD-1B is a 50% smaller, faster SDXL model, delivering high-quality text-to-image generation with a 60% speed boost.",
        title: "ssd-1b"
        category: "image-models"
        link:...
        }


        
        {
         pathName: "fofr/realvisxl-v3-multi-controlnet-lora",
        description: "RealVisXl V3 with multi-controlnet, lora loading, img2img, inpainting",
        title: "realvisxl-v3-multi-controlnet-lora"
        category: "image-models"
        link:...
        }



        {
         pathName: "batouresearch/sdxl-controlnet-lora",
        description: "Last update: Now supports img2img.''' SDXL Canny controlnet with LoRA support.",
        title: "sdxl-controlnet-lora"
        category: "image-models"
        link:...
        }



        {
         pathName: "fofr/any-comfyui-workflow",
        description: "Run any ComfyUI workflow. Guide: https://github.com/fofr/cog-comfyui",
        title: "any-comfyui-workflow"
        category: "image-models"
        link:...
        }



        {
         pathName: "fofr/sticker-maker",
        description: "Make stickers with AI. Generates graphics with transparent backgrounds.",
        title: "sticker-maker"
        category: "image-models"
        link:...
        }





         {
         pathName: "lucataco/realvisxl2-lcm",
        description: "RealvisXL-v2.0 with LCM LoRA - requires fewer steps (4 to 8 instead of the original 40 to 50)",
        title: "RealvisXL-v2.0 with LCM LoRA"
        category: "image-models"
        link:...
        }





        {
         pathName: "lucataco/realvisxl-v2.0",
        description: "Implementation of SDXL RealVisXL_V2.0",
        title: "realvisxl-v2.0"
        category: "image-models"
        link:...
        }





         {
         pathName: "fofr/sdxl-multi-controlnet-lora",
        description: "Multi-controlnet, lora loading, img2img, inpainting",
        title: "sdxl-multi-controlnet-lora"
        category: "image-models"
        link:...
        }


        {
         pathName: "lucataco/dreamshaper-xl-turbo",
        description: "DreamShaper is a general purpose SD model that aims at doing everything well, photos, art, anime, manga. It's designed to match Midjourney and DALL-E.",
        title: "dreamshaper-xl-turbo"
        category: "image-models"
        link:...
        }




        //language-models

        {
        pathName: "ibm-granite/granite-3.0-8b-instruct",
        description: "Granite-3.0-8B-Instruct is an 8B parameter open-source model optimized for tasks like summarization, problem-solving, translation, reasoning, and coding.",
        title: "ibm-granite"
        category: "language-models"
        link:...
        }




        {
        pathName: "meta/meta-llama-3-8b-instruct",
        description: "An 8 billion parameter language model from Meta, fine tuned for chat completions",
        title: "meta-llama-3-8b-instruct"
        category: "language-models"
        link:...
        }



        {
        pathName: "meta/meta-llama-3-70b-instruct",
        description: "A 70 billion parameter language model from Meta, fine tuned for chat completions",
        title: "meta-llama-3-70b-instruct"
        category: "language-models"
        link:...
        }



        {
        pathName: "meta/meta-llama-3-8b",
        description: "Base version of Llama 3, an 8 billion parameter language model from Meta.",
        title: "meta-llama-3-8b"
        category: "language-models"
        link:...
        }




         {
        pathName: "meta/llama-2-7b-chat",
        description: "A 7 billion parameter language model from Meta, fine tuned for chat completions",
        title: "llama-2-7b-chat"
        category: "language-models"
        link:...
        }




        {
        pathName: "meta/llama-2-70b-chat",
        description: "A 70 billion parameter language model from Meta, fine tuned for chat completions",
        title: "llama-2-70b-chat"
        category: "language-models"
        link:...
        }



         {
        pathName: "meta/llama-2-13b-chat",
        description: "A 13 billion parameter language model from Meta, fine tuned for chat completions",
        title: "llama-2-13b-chat"
        category: "language-models"
        link:...
        }






        {
        pathName: "mistralai/mistral-7b-v0.1",
        description: "A 7 billion parameter language model from Mistral.",
        title: "mistral-7b-v0.1"
        category: "language-models"
        link:...
        }




         {
        pathName: "meta/meta-llama-3-70b",
        description: "Base version of Llama 3, a 70 billion parameter language model from Meta.",
        title: "meta-llama-3-70b"
        category: "language-models"
        link:...
        }



         {
        pathName: "01-ai/yi-34b-chat",
        description: "The Yi series models are large language models trained from scratch by developers at 01.AI.",
        title: "yi-34b-chat"
        category: "language-models"
        link:...
        }




         {
        pathName: "01-ai/yi-6b",
        description: "The Yi series models are large language models trained from scratch by developers at 01.AI.",
        title: "yi-34b-chat"
        category: "language-models"
        link:...
        }



         {
        pathName: "replicate/flan-t5-xl",
        description: "A language model by Google for tasks like classification, summarization, and more",
        title: "flan-t5-xl"
        category: "language-models"
        link:...
        }





        {
        pathName: "replicate/llama-7b",
        description: "7 billion parameter version of Stability AI's language model",
        title: "llama-7b"
        category: "language-models"
        link:...
        }





        {
        pathName: "google-deepmind/gemma-2b-it",
        description: "2B instruct version of Google’s Gemma model",
        title: "gemma-2b-it"
        category: "language-models"
        link:...
        }





        {
        pathName: "google-deepmind/gemma-7b-it",
        description: "7B instruct version of Google’s Gemma model",
        title: "gemma-7b-it"
        category: "language-models"
        link:...
        }




        {
        pathName: "nateraw/nous-hermes-2-solar-10.7b",
        description: "Nous Hermes 2 - SOLAR 10.7B is the flagship Nous Research model on the SOLAR 10.7B base model..",
        title: "nous-hermes-2-solar-10.7b"
        category: "language-models"
        link:...
        }




         {
        pathName: "kcaverly/nous-hermes-2-yi-34b-gguf",
        description: "Nous Hermes 2 - Yi-34B is a state of the art Yi Fine-tune, fine tuned on GPT-4 generated synthetic data",
        title: "nous-hermes-2-yi-34b-gguf"
        category: "language-models"
        link:...
        }




        {
        pathName: "replicate/gpt-j-6b",
        description: "A large language model by EleutherAI",
        title: "gpt-j-6b"
        category: "language-models"
        link:...
        }





        //caption-image


        {
        pathName: "replicate/gpt-j-6b",
        description: "Generate image captions",
        title: "gpt-j-6b"
        category: "caption-image"
        link:...
        }




        {
        pathName: "salesforce/blip",
        description: "Generate image captions",
        title: "blip"
        category: "caption-image"
        link:...
        }




         {
        pathName: "salesforce/blip-2",
        description: "Answers questions about images",
        title: "blip"
        category: "caption-image"
        link:...
        }



        {
        pathName: "yorickvp/llava-13b",
        description: "Visual instruction tuning towards large language and vision models with GPT-4 level capabilities",
        title: "llava-13b"
        category: "caption-image"
        link:...
        }




         {
        pathName: "pharmapsychotic/clip-interrogator",
        description: "The CLIP Interrogator combines OpenAI's CLIP and Salesforce's BLIP to generate optimized prompts for matching images, ideal for use with models like Stable Diffusion.",
        title: "clip-interrogator"
        category: "caption-image"
        link:...
        }





        {
        pathName: "methexis-inc/img2prompt",
        description: "Get an approximate text prompt, with style, matching an image. (Optimized for stable-diffusion (clip ViT-L/14))",
        title: "img2prompt"
        category: "caption-image"
        link:...
        }




         {
        pathName: "rmokady/clip_prefix_caption",
        description: "Simple image captioning model using CLIP and GPT-2",
        title: "clip_prefix_caption"
        category: "caption-image"
        link:...
        }



         {
        pathName: "daanelson/minigpt-4",
        description: "A model which generates text in response to an input image and prompt.",
        title: "minigpt-4"
        category: "caption-image"
        link:...
        }





         {
        pathName: "j-min/clip-caption-reward",
        description: "Fine-grained Image Captioning with CLIP Reward",
        title: "clip-caption-reward"
        category: "caption-image"
        link:...
        }




        {
        pathName: "zsxkib/molmo-7b",
        description: "allenai/Molmo-7B-D-0924, Answers questions and caption about images",
        title: "molmo-7b"
        category: "caption-image"
        link:...
        }





         {
        pathName: "nohamoamary/image-captioning-with-visual-attention",
        description: "datasets: Flickr8k",
        title: "image-captioning-with-visual-attention"
        category: "caption-image"
        link:...
        }



         {
        pathName: "zsxkib/uform-gen",
        description: "Super fast 1.5B Image Captioning/VQA Multimodal LLM (Image-to-Text)",
        title: "uform-gen"
        category: "caption-image"
        link:...
        }



        // edit images




        {
        pathName: "tencentarc/gfpgan",
        description: "Practical face restoration algorithm for *old photos* or *AI-generated faces*",
        title: "gfpgan"
        category: "edit-images" , "restore-images"
        link:...
        }



         {
        pathName: "sczhou/codeformer",
        description: "Robust face restoration algorithm for old photos / AI-generated faces",
        title: "codeformer"
        category: "edit-images"
        link:...
        }
        




        {
        pathName: "rossjillian/controlnet",
        description: "Control diffusion models",
        title: "controlnet"
        category: "edit-images"
        link:...
        }




         {
        pathName: "cjwbw/rembg",
        description: "Remove images background",
        title: "rembg"
        category: "edit-images"
        link:...
        }


        {
        pathName: "andreasjansson/stable-diffusion-inpainting",
        description: "Inpainting using RunwayML's stable-diffusion-inpainting checkpoint",
        title: "stable-diffusion-inpainting"
        category: "edit-images"
        link:...
        }




         {
        pathName: "orpatashnik/styleclip",
        description: "Text-Driven Manipulation of StyleGAN Imagery",
        title: "styleclip"
        category: "edit-images"
        link:...
        }



        {
        pathName: "timothybrooks/instruct-pix2pix",
        description: "Edit images with human instructions",
        title: "instruct-pix2pix" 
        category: "edit-images"
        link:...
        }




        {
        pathName: "pollinations/modnet",
        description: "A deep learning approach to remove background & adding new background image",
        title: "modnet"  
        category: "edit-images"
        link:...
        }





        {
        pathName: "logerzhu/ad-inpaint",
        description: "Product advertising image generator",
        title: "modnet"  
        category: "edit-images"
        link:...
        }




        {
        pathName: "arielreplicate/deoldify_image",
        description: "Add colours to old images",
        title: "deoldify_image"   
        category: "edit-images"
        link:...
        }




         {
        pathName: "adirik/t2i-adapter-sdxl-depth-midas",
        description: "Modify images using depth maps",
        title: "t2i-adapter-sdxl-depth-midas"    
        category: "edit-images"
        link:...
        }




         {
        pathName: "adirik/t2i-adapter-sdxl-openpose",
        description: "Modify images using human pose",
        title: "t2i-adapter-sdxl-openpose"    
        category: "edit-images"
        link:...
        }




        // restore images

        {
        pathName: "sczhou/codeformer",
        description: "Robust face restoration algorithm for old photos / AI-generated faces",
        title: "codeformer"    
        category: "restore-images"
        link:...
        }



         {
        pathName: "jingyunliang/swinir",
        description: "Image Restoration Using Swin Transformer",
        title: "swinir"     
        category: "restore-images"
        link:...
        }




        {
        pathName: "megvii-research/nafnet",
        description: "Nonlinear Activation Free Network for Image Restoration",
        title: "nafnet"     
        category: "restore-images"
        link:...
        }


         {
        pathName: "megvii-research/nafnet",
        description: "Nonlinear Activation Free Network for Image Restoration",
        title: "nafnet"     
        category: "restore-images"
        link:...
        }



        {
        pathName: "cjwbw/bigcolor",
        description: "Colorization using a Generative Color Prior for Natural Images",
        title: "bigcolor"        
        category: "restore-images"
        link:...
        }


        {
        pathName: "google-research/maxim",
        description: "Multi-Axis MLP for Image Processing",
        title: "maxim"        
        category: "restore-images"
        link:...
        }



        {
        pathName: "cjwbw/supir",
        description: "Practicing Model Scaling for Photo-Realistic Image Restoration In the Wild. This version uses LLaVA-13b for captioning.",
        title: "supir"         
        category: "restore-images"
        link:...
        }



        {
        pathName: "tencentarc/vqfr",
        description: "Blind Face Restoration with Vector-Quantized Dictionary and Parallel Decoder",
        title: "vqfr"         
        category: "restore-images"
        link:...
        }
        


        // upscale images


        {
        pathName: "nightmareai/real-esrgan",
        description: "Real-ESRGAN with optional face correction and adjustable upscale",
        title: "real-esrgan"           
        category: "upscale-images"
        link:...
        }




        {
        pathName: "philz1337x/clarity-upscaler",
        description: "High resolution image Upscaler and Enhancer. Use at ClarityAI.co. A free Magnific alternative.",
        title: "clarity-upscaler"           
        category: "upscale-images"
        link:...
        }




        {
        pathName: "jingyunliang/swinir",
        description: "Image Restoration Using Swin Transformer",
        title: "swinir"           
        category: "upscale-images"
        link:...
        }




         {
        pathName: "mv-lab/swin2sr",
        description: "3 Million Runs! AI Photorealistic Image Super-Resolution and Restoration",
        title: "swin2sr"           
        category: "upscale-images"
        link:...
        }





         {
        pathName: "batouresearch/magic-image-refiner",
        description: "A better alternative to SDXL refiners, providing a lot of quality and detail. Can also be used for inpainting or upscaling.",
        title: "magic-image-refiner"            
        category: "upscale-images"
        link:...
        }




        {
        pathName: "cjwbw/rudalle-sr",
        description: "Real-ESRGAN super-resolution model from ruDALL-E",
        title: "rudalle-sr"               
        category: "upscale-images"
        link:...
        }




        {
        pathName: "jingyunliang/hcflow-sr",
        description: "Image Super-Resolution",
        title: "hcflow-sr"                
        category: "upscale-images"
        link:...
        }



        {
        pathName: "cjwbw/supir",
        description: "Practicing Model Scaling for Photo-Realistic Image Restoration In the Wild. This version uses LLaVA-13b for captioning.",
        title: "supir"                 
        category: "upscale-images"
        link:...
        }



        {
        pathName: "zsxkib/diffbir",
        description: "DiffBIR: Towards Blind Image Restoration with Generative Diffusion Prior",
        title: "diffbir"                  
        category: "upscale-images"
        link:...
        }
























        








        










        



        
        





        */
        {
            id: 1,
            title: "Stable Diffusion",
            description: "Generate high-quality images from text descriptions with advanced AI model",
            image: "/images/chatgpt.jpg",
            category: "Generate images",
            link: "/image-models/stable-diffusion"
        },
        {
            id: 2,
            title: "DALL-E 2",
            description: "Create realistic images and art from natural language descriptions",
            image: "/images/chatgpt.jpg",
            category: "Generate images",
            link: "/image-models/dall-e-2"
        },
        {
            id: 3,
            title: "Midjourney",
            description: "Generate artistic images with unique style and high creativity",
            image: "/images/chatgpt.jpg",
            category: "Generate images",
            link: "/image-models/midjourney"
        },

        // Generate text
        {
            id: 4,
            title: "GPT-4",
            description: "Advanced language model for text generation and understanding",
            image: "/images/chatgpt.jpg",
            category: "Generate text",
            link: "/image-models/gpt-4"
        },
        {
            id: 5,
            title: "Claude 2",
            description: "Anthropic's AI for sophisticated text generation and analysis",
            image: "/images/chatgpt.jpg",
            category: "Generate text",
            link: "/image-models/claude-2"
        },

        // Caption images
        {
            id: 7,
            title: "Azure Vision",
            description: "Microsoft's AI for accurate image captioning and analysis",
            image: "/images/chatgpt.jpg",
            category: "Caption images",
            link: "/image-models/azure-vision"
        },
        {
            id: 8,
            title: "Google Cloud Vision",
            description: "Detect objects and text in images with high accuracy",
            image: "/images/chatgpt.jpg",
            category: "Caption images",
            link: "/image-models/azure-vision"
        },

        // Edit images
        {
            id: 9,
            title: "Adobe Firefly",
            description: "AI-powered creative image editing and generation",
            image: "/images/chatgpt.jpg",
            category: "Edit images",
            link: "https://www.adobe.com/products/firefly"
        },
        {
            id: 10,
            title: "Runway ML",
            description: "Professional AI tools for video and image editing",
            image: "/images/chatgpt.jpg",
            category: "Edit images",
            link: "https://runway.ml"
        },
        {
            id: 11,
            title: "Remove.bg API",
            description: "Automatically remove image backgrounds with AI",
            image: "/images/chatgpt.jpg",
            category: "Edit images",
            link: "https://www.remove.bg/api"
        },

        // Restore images
        {
            id: 12,
            title: "Replicate",
            description: "Run various image restoration models via API",
            image: "/images/chatgpt.jpg",
            category: "Restore images",
            link: "https://replicate.com"
        },
        {
            id: 13,
            title: "Deep Image Prior",
            description: "Advanced AI for image restoration and enhancement",
            image: "/images/chatgpt.jpg",
            category: "Restore images",
            link: "https://dmitryulyanov.github.io/deep_image_prior"
        },
        {
            id: 14,
            title: "Tencent ARC",
            description: "AI-powered image restoration and enhancement",
            image: "/images/chatgpt.jpg",
            category: "Restore images",
            link: "https://arc.tencent.com/en/ai-demos/faceRestoration"
        }
    ];

    // Sortierte Models basierend auf Besucherzahlen
    const sortedModels = [...models].sort((a, b) => {
        const visitsA = visitCounts[a.id] || 0;
        const visitsB = visitCounts[b.id] || 0;
        return visitsB - visitsA; // Absteigend sortieren (meist bis wenigst besucht)
    });

    // Funktion zur Formatierung der Besucherzahlen
    const formatVisits = (count) => {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M runs`;
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K runs`;
        }
        return `${count} runs`;
    };

    // Funktion zum Aktualisieren der Besucherzahl
    const handleVisit = (modelId) => {
        setVisitCounts(prev => {
            const newCounts = {
                ...prev,
                [modelId]: (prev[modelId] || 0) + 1
            };
            // Speichern in localStorage
            localStorage.setItem('visitCounts', JSON.stringify(newCounts));
            return newCounts;
        });
    };

    // Funktion zum Umschalten der Tag-Auswahl
    const toggleTag = (tag) => {
        setSelectedTags(prev => 
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
        setDragDistance(0);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX); // Bewegung weniger empfindlich
        setDragDistance(Math.abs(walk)); // Speichere die Drag-Distanz
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleCardClick = (e, link) => {
        e.preventDefault(); // Verhindere sofortiges Klicken
        // Öffne Link nur wenn die Drag-Distanz minimal war (weniger als 5px)
        if (dragDistance < 5) {
            window.open(link, '_blank');
        }
    };

    // Separate Handler für Kategorie-Scroll
    const handleCategoryMouseDown = (e) => {
        setIsScrollingCategories(true);
        const slider = categoriesRef.current;
        setStartXCategories(e.pageX - slider.offsetLeft);
        setScrollLeftCategories(slider.scrollLeft);
        e.stopPropagation(); // Verhindert Bubble-up zum API-Container
    };

    const handleCategoryMouseUp = (e) => {
        setIsScrollingCategories(false);
        e.stopPropagation();
    };

    const handleCategoryMouseMove = (e) => {
        if (!isScrollingCategories) return;
        e.preventDefault();
        e.stopPropagation();
        
        const slider = categoriesRef.current;
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startXCategories) * 2;
        slider.scrollLeft = scrollLeftCategories - walk;
    };

    // Filtere die Models basierend auf der ausgewählten Kategorie
    const filteredModels = models.filter(model => {
        if (selectedCategory === "All") return true;
        return model.category === selectedCategory;
    });

    return (
        <div className="w-full px-4 md:px-6 lg:px-8">
            <div className="px-4 md:px-6 lg:px-8">
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold my-6 text-black">
                    Run AI instantly
                </h2>
                <div className="text-sm md:text-base text-gray-500 mb-6">
                Train, customize, and scale models with a single command.
                </div>
            </div>

            {/* Container für beide Cards */}
            <div className="flex flex-col lg:flex-row gap-6 justify-center mb-8 bg-transparent shadow-none border-none">
                {/* Hauptcard - volle Breite auf Mobile */}
                <Card className="w-full lg:w-[70%] mb-8 mt-4">
                    <CardHeader>
                        <CardTitle>Explore</CardTitle>
                        <CardDescription className="text-sm md:text-base">
                            Featured Models
                        </CardDescription>
                    </CardHeader>

                    <CardContent>


                        {/* CategoriesList.tsx komponent */}
                        <div className="flex flex-row justify-center gap-4 mt-4 mb-4 text-black">
                            {categories.map((categorymodels) => (
                                <CategoriesList title={categorymodels.category} icons={categorymodels.icons} />
                            ))}
                        </div>
                       


                        {/* komponent ModelPreview.tsx */}

                        <div style={{ 
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '20px'
                        }}>
                            {models.map((model, index) => (
                                <ModelPreview
                                    key={index}
                                    title={model.title}
                                    description={model.description}
                                    runs={model.runs}
                                    imageUrl={model.image}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>
                

                {/* MostViewedModels.tsx komponent */}


                <div className="flex justify-end p-4">
                <MostViewedModels 
                    models={[
                    { title: "Stable Diffusion", runs: 2500000 },
                    { title: "DALL-E 2", runs: 1800000 },
                    { title: "Midjourney", runs: 1200000 },
                    { title: "GPT-4", runs: 950000 },
                    { title: "Claude 2", runs: 780000 },
                    { title: "Adobe Firefly", runs: 650000 },
                    { title: "Google Vision", runs: 520000 },
                    { title: "Runway ML", runs: 480000 }
                ]} 
            />
            </div>
                
               
            </div>

            {/* Statistik-Banner */}
            <div className="mt-16 p-8 bg-gradient-to-r from-blue-500 to-purple-500 border border-purple-500/20 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-2">
                        <div className="text-4xl font-bold text-purple-900">100K+</div>
                        <div className="text-zinc-300">Active Users</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-bold text-purple-900">50M+</div>
                        <div className="text-zinc-300">API Calls Daily</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-bold text-purple-900">99.9%</div>
                        <div className="text-zinc-300">Uptime</div>
                    </div>
                </div>
            </div>

            {/* Feature Showcase */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-black border-2 border-purple-500/30 rounded-xl hover:border-purple-500/50 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-500/10 rounded-lg">
                            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white">Lightning Fast</h3>
                    </div>
                    <p className="text-zinc-400">Response times under 100ms. Built for scale and performance.</p>
                </div>

                <div className="p-6 bg-black border-2 border-purple-500/30 rounded-xl hover:border-purple-500/50 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-500/10 rounded-lg">
                            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white">Enterprise Security</h3>
                    </div>
                    <p className="text-zinc-400">Bank-grade encryption and security protocols.</p>
                </div>
            </div>

            {/* Call-to-Action Section */}
            <div className="mt-16 text-center p-8 bg-gradient-to-b from-purple-500/10 to-transparent rounded-xl">
                <h2 className="text-3xl font-bold text-purple-900 mb-4">Ready to Get Started?</h2>
                <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
                    Join thousands of developers already using our API platform.
                    Get 10,000 free API calls when you sign up today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                        Start Free Trial
                    </button>
                    <button className="px-8 py-3 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-all">
                        View Documentation
                    </button>
                </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16">
                <p className="text-center text-zinc-500 mb-6">Trusted by leading companies worldwide</p>
                <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                    {/* Ersetzen Sie dies durch echte Logos */}
                    <div className="h-8">Company Logo 1</div>
                    <div className="h-8">Company Logo 2</div>
                    <div className="h-8">Company Logo 3</div>
                    <div className="h-8">Company Logo 4</div>
                </div>
            </div>

            {/* Quick Navigation Guide */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-black border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition-all">
                    <h3 className="text-lg font-semibold text-white mb-4">For Developers</h3>
                    <ul className="space-y-2 text-zinc-400">
                        <li>
                            <a href="/docs" className="hover:text-purple-400 transition-colors">→ API Documentation</a>
                        </li>
                        <li>
                            <a href="/examples" className="hover:text-purple-400 transition-colors">→ Code Examples</a>
                        </li>
                        <li>
                            <a href="/sdk" className="hover:text-purple-400 transition-colors">→ SDKs & Libraries</a>
                        </li>
                    </ul>
                </div>

                <div className="p-6 bg-black border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition-all">
                    <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
                    <ul className="space-y-2 text-zinc-400">
                        <li>
                            <a href="/blog" className="hover:text-purple-400 transition-colors">→ Blog & Updates</a>
                        </li>
                        <li>
                            <a href="/tutorials" className="hover:text-purple-400 transition-colors">→ Tutorials</a>
                        </li>
                        <li>
                            <a href="/community" className="hover:text-purple-400 transition-colors">→ Community</a>
                        </li>
                    </ul>
                </div>

                <div className="p-6 bg-black border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition-all">
                    <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                    <ul className="space-y-2 text-zinc-400">
                        <li>
                            <a href="/help" className="hover:text-purple-400 transition-colors">→ Help Center</a>
                        </li>
                        <li>
                            <a href="/status" className="hover:text-purple-400 transition-colors">→ System Status</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-purple-400 transition-colors">→ Contact Us</a>
                        </li>
                    </ul>
                </div>
            </div> 
           
<div className="flex flex-row justify-center gap-4 mt-4 mb-4">
    {categories.map((categorymodels) => (
        <CategoriesList title={categorymodels.category} icons={categorymodels.icons} />
    ))}
    </div>

    
</div>
       
        
    );

    
}

export default Home;
