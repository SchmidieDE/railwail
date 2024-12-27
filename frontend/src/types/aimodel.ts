

export type ModelTypeOutput = "image" | "text" | "video" | "audio" | "translation";


export type ModelType = {
  type: ModelTypeOutput;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export type Model = {
  type: ModelTypeOutput;
  model: string;
  slug: string;
  samples: string[];
  name: string;
  description: string;
  cost: number; 
}


export type BaseAIContent = {
  id: string;  
  prompt: string;
  format: string;
  url: string;
  saved: boolean;
  name: string;
  modelId: string; 
  userId: number;
}


// Will add additional fields later on
export type AIAudio = BaseAIContent;

export type AIImage = BaseAIContent & {
  aspectRatio: string;
}

// Will add additional fields later on
export type AIVideo = BaseAIContent;








