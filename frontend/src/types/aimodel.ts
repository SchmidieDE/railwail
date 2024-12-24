

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



