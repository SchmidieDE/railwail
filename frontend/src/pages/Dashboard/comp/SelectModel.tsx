import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import { 
    ImageIcon,  
    Type,       
    Languages,
    Video,
    AudioLines,
    Coins
} from "lucide-react";
import {/*TextModel,*/ ImageModel, VideoModel, AudioModel} from "./ModelTypes";
import api from "@/lib/api";
import { ModelType, Model, ModelTypeOutput } from "@/types/aimodel";



const modelTypes : ModelType[] = [
  {
    type: "image",
    title: "Image generation",
    description: "Create images with AI",
    icon: <ImageIcon />,
  },
  /* dont have time for it, add it later on 
  {
    type: "text",
    title: "Text generation",
    description: "Create text, stories and content",
    icon: <Type />
  },
   */
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




const ModelInput = ({type, model}: {type: ModelTypeOutput, model: Model}) => {


  switch (type) {
    case "image":
      return <ImageModel model={model} />
    /*
      dont have time for it, add it later on 
      case "text":
      return <TextModel />
    */
    case "video":
      return <VideoModel model={model} />
    case "audio":
      return <AudioModel model={model} />
  }
  
}


const SelectModel = () => {


  // inital models all 
  const [allModels, setAllModels] = useState<Model[]>([])


  // the models which should be displayed so all image models or alle audio models 
  const [models, setModels] = useState<Model[]>(allModels);
  

  // the selected model type image, audio, text, video 
  const [selectedModelType, setSelectedModelType] = useState<ModelTypeOutput>("image");


  // the selected model flux, dalle, etc. 
  const [selectedModel, setSelectedModel] = useState<Model>(allModels[0]);

  

  useEffect(() => {
    setSelectedModel(allModels.find(model => model.type === selectedModelType) || allModels[0]);
    setModels(allModels.filter(model => model.type === selectedModelType));
  }, [selectedModelType]);


  useEffect(() => {
    const getModels = async () => {
      const response = await api.get('ai/ai-models/')
      const respJson = await response.json() 
      const {ai_models} = respJson
      setAllModels(ai_models) // only once, we store all models in the state 
      const modelTypes = ai_models.filter(ai_model => ai_model.type === selectedModelType)
      setModels(modelTypes) // as default we show only the models of the selected inital type
      setSelectedModel(modelTypes[0])
    }
    getModels() // fetch all models from backend which are available for the user
  }, []);




  return (
    <div className="w-full">
      <div className="flex flex-row gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary overflow-y-hidden h-full pl-4 ">
        {/* Zuerst Selektieren wir die Art des Models => wird gefiltert danach */}
        {
          modelTypes.map((modelType) => (
            <div
              key={modelType.type}
              onClick={() => setSelectedModelType(modelType.type as ModelTypeOutput)}
              className={`
                flex flex-col items-center justify-center gap-2 
                rounded-lg p-4 w-full cursor-pointer select-none
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
        models.map((model : Model, index: Number) => (
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
              {model.name}
            </div>
            <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full flex items-center gap-1 z-20">
              <Coins className="w-4 h-4" />
              <span>{model.cost} Tokens</span>
            </div>
          </div>
        ))
      }
      </div>
      <ModelInput type={selectedModelType} model={selectedModel} />
      </div>
  )




}

export default SelectModel;