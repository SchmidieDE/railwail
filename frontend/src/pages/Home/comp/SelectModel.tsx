import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import { 
    ImageIcon,  
    Type,       
    Languages,
    Video,
    AudioLines
} from "lucide-react";
import ImageModel from "./ModelTypes";

type ModelTypeOutput = "image" | "text" | "video" | "audio" | "translation";


type ModelType = {
  type: ModelTypeOutput;
  title: string;
  description: string;
  icon: React.ReactNode;
}

type Model = {
  type: ModelTypeOutput;
  model: string;
  slug: string;
  samples: string[];
}



const Models : Model[] = [
  // Image Models 
  {
    slug: "/stable-diffusion",
    model: "Stable Diffusion",
    type: "image",
    samples: ["image1.jpg"]
  },
  {
    slug: "/luma/photon-flash",
    model: "Photon Flash",
    type: "image",
    samples: ["image2.jpg"]
  },
  {
    slug: "/luma/photon",
    model: "Photon",
    type: "image",
    samples: ["image3.jpg"]
  },
  {
    slug: "/recraft-ai/recraft-v3",
    model: "Recraft V3",
    type: "image",
    samples: ["image4.jpg"]
  },
  {
    slug: "/ideogram-ai/ideogram-v2",
    model: "Ideogram V2",
    type: "image",
    samples: ["image5.jpg"]
  },
  {
    slug: "/black-forest-labs/flux-1.1-pro-ultra",
    model: "Flux 1.1 Pro Ultra",
    type: "image",
    samples: ["image6.jpg"]
  },
  {
    slug: "/nvidia/sana:c6b5d2b7459910fec94432e9e1203c3cdce92d6db20f714f1355747990b52fa6",
    model: "Nvidia Sana",
    type: "image",
    samples: ["image7.jpg"]
  },

  // Text Models 
  {
    slug: "/google-deepmind/gemma-7b:2ca65f463a2c0cfef4dbc4ba70d227ed96455ef6020c1f6983b2a4c4f3ecb4ec",
    model: "Google Deepmind Gemma 7B",
    type: "text",
    samples: ["text1.jpg"]
  }, 
  {
    slug: "/meta/meta-llama-3-70b",
    model: "Meta Llama 3 70B",
    type: "text",
    samples: ["text2.jpg"]
  },
  {
    slug: "/lucataco/qwen1.5-72b:f919d3c43a8758de744cf2908426dd744154120f0a22e457a3fa647acdfe33be",
    model: "Qwen 1.5 72B",
    type: "text",
    samples: ["text3.jpg"]
  },
  {
    slug: "/adirik/mamba-790m:77782448285ebc03a24c2e90cc12b6cebbdaf325c071eaee2e315320308d9748",
    model: "Mamba 790M",
    type: "text",
    samples: ["text4.jpg"]
  }


  // Video Models 



  // Audio Models 


];

const modelTypes : ModelType[] = [
  {
    type: "image",
    title: "Image generation",
    description: "Create images with AI",
    icon: <ImageIcon />,
  },
  {
    type: "text",
    title: "Text generation",
    description: "Create text, stories and content",
    icon: <Type />
  },
  {
    type: "video",
    title: "Video generation",
    description: "Create videos and animations",
    icon: <Video />
  },
  {
    type: "audio",
    title: "Audio generation",
    description: "Create music, speech and sound effects",
    icon: <AudioLines />
  }
]




const ModelInput = ({type}: {type: ModelTypeOutput}) => {


  switch (type) {
    case "image":
      return <ImageModel />
    case "text":
      return <div>
        <Input />
      </div>
    case "video":
      return <div>
        <Input />
      </div>
    case "audio":
      return <div>
        <Input />
      </div>
    case "translation":
      return <div>
        <Input />
      </div>
  }
  
}


const SelectModel = () => {



  const [models, setModels] = useState<Model[]>(Models);
  
  const [selectedModelType, setSelectedModelType] = useState<ModelTypeOutput>("image");
  const [selectedModel, setSelectedModel] = useState<Model>(Models[0]);

  

  useEffect(() => {
    setModels(Models.filter(model => model.type === selectedModelType));
  }, [selectedModelType]);



  return (
    <div className="">
      <div className="flex flex-row gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary overflow-y-hidden h-full pl-4 ">
        {/* Zuerst Selektieren wir die Art des Models => wird gefiltert danach */}
        {
          modelTypes.map((modelType) => (
            <div
              key={modelType.type}
              onClick={() => setSelectedModelType(modelType.type as ModelTypeOutput)}
              className={`
                flex flex-col items-center justify-center gap-2 
                rounded-lg p-4 w-full cursor-pointer
                mb-3 
                transition-all duration-200 hover:scale-105
                ${selectedModelType === modelType.type 
                  ? 'bg-primary text-primary-foreground text-white shadow-lg drop-shadow-[1_1_1rem_primary]' 
                  : 'bg-primary/10 hover:bg-primary/40'
                }
              `}
            >
              <div className="flex flex-row items-center w-full">
                <div className=" bg-white p-2 text-tertiary rounded-lg">
                  {modelType.icon}
                </div>
                <div className="font-semibold text-lg ml-3">{modelType.title}</div>
              </div>
            </div>
          ))
          }
      </div>
      {/* Dann Selektieren wir das Model  */}
      <div className="my-4 flex w-full flex-row gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-secondary overflow-y-hidden h-full p-4 ">
      {
        models.map((model, index) => (
          <div key={index+"asss"} onClick={() => setSelectedModel(model)} className={`
            relative flex flex-col items-center justify-center gap-2 
            rounded-lg p-4 w-26 lg:w-96 h-48 cursor-pointer select-none
            mb-3 overflow-hidden group flex-shrink-0
            transition-all duration-200 hover:scale-105
            ${selectedModel === model 
              ? 'bg-secondary text-primary-foreground shadow-lg drop-shadow-[1_1_1rem_primary] border-4 border-secondary' 
              : 'bg-secondary/10 hover:bg-secondary/40'
            }
          `}>
            <img 
              src={`/models/${model.type}/${model.samples[0]}`} 
              alt={model.model} 
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            /> 
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all" />
            <div className="text-center relative z-10 font-medium text-2xl text-white">
              {model.model}
            </div>
          </div>
        ))
      }
      </div>
      <ModelInput type={selectedModelType} />
      </div>
  )




}

export default SelectModel;