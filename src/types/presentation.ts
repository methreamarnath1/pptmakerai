
export interface Slide {
  title: string;
  content: string;
  notes?: string;
  imagePrompt?: string;
  imageUrl?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundImageCredit?: {
    name: string;
    url: string;
  };
}

export interface PresentationData {
  id: string;
  title: string;
  subtitle?: string;
  createdAt: string;
  updatedAt: string;
  templateId: string;
  slides: Slide[];
}
