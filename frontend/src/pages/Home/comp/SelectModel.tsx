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
  {
    slug: "/stable-diffusion",
    model: "Stable Diffusion",
    type: "image",
    samples: ["https://images.squarespace-cdn.com/content/v1/6213c340453c3f502425776e/c24904d4-f0f0-4a26-9470-fec227dde15c/image-90.png?format=2500w"]
  },
  {
    slug: "/stable-diffusion",
    model: "Stable Diffusion",
    type: "image",
    samples: ["https://images.squarespace-cdn.com/content/v1/6213c340453c3f502425776e/c24904d4-f0f0-4a26-9470-fec227dde15c/image-90.png?format=2500w"]
  },
  {
    slug: "/stable-diffusion",
    model: "Stable Diffusion",
    type: "image",
    samples: ["https://images.squarespace-cdn.com/content/v1/6213c340453c3f502425776e/c24904d4-f0f0-4a26-9470-fec227dde15c/image-90.png?format=2500w"]
  },
  {
    slug: "/stable-diffusion",
    model: "Stable Diffusion",
    type: "image",
    samples: ["https://images.squarespace-cdn.com/content/v1/6213c340453c3f502425776e/c24904d4-f0f0-4a26-9470-fec227dde15c/image-90.png?format=2500w"]
  },
  {
    slug: "/stable-diffusion",
    model: "Stable Diffusion",
    type: "image",
    samples: ["https://images.squarespace-cdn.com/content/v1/6213c340453c3f502425776e/c24904d4-f0f0-4a26-9470-fec227dde15c/image-90.png?format=2500w"]
  },
  {
    slug: "/stable-diffusion",
    model: "Stable Diffusion",
    type: "image",
    samples: ["https://images.squarespace-cdn.com/content/v1/6213c340453c3f502425776e/c24904d4-f0f0-4a26-9470-fec227dde15c/image-90.png?format=2500w"]
  },
  {
    slug: "/stable-diffusion",
    model: "Stable Diffusion",
    type: "image",
    samples: ["https://images.squarespace-cdn.com/content/v1/6213c340453c3f502425776e/c24904d4-f0f0-4a26-9470-fec227dde15c/image-90.png?format=2500w"]
  },
];

const modelTypes : ModelType[] = [
  {
    type: "image",
    title: "Bilder generieren",
    description: "Erstelle Bilder mit künstlicher Intelligenz",
    icon: <ImageIcon />,
  },
  {
    type: "text",
    title: "Text generieren",
    description: "Erstelle Texte, Geschichten und Inhalte",
    icon: <Type />
  },
  {
    type: "video",
    title: "Videos generieren",
    description: "Erstelle Videos und Animationen",
    icon: <Video />
  },
  {
    type: "audio",
    title: "Audio generieren",
      description: "Erstelle Musik, Sprache und Soundeffekte",
    icon: <AudioLines />
  },
  {
    type: "translation",
    title: "Übersetzung",
    description: "Übersetze Texte in verschiedene Sprachen",
    icon: <Languages />
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
            rounded-lg p-4 w-26 lg:w-96 h-48 cursor-pointer
            mb-3 overflow-hidden group flex-shrink-0
            transition-all duration-200 hover:scale-105
            ${selectedModel === model 
              ? 'bg-secondary text-primary-foreground shadow-lg drop-shadow-[1_1_1rem_primary] border-4 border-secondary' 
              : 'bg-secondary/10 hover:bg-secondary/40'
            }
          `}>
            <img 
              src={model.samples[0]} 
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