
import { useState } from 'react';
import { toast } from 'sonner';
import { generatePresentation } from '../utils/geminiApi';

interface Slide {
  title: string;
  content: string;
  notes?: string;
  imagePrompt?: string;
  imageUrl?: string;
}

interface PresentationData {
  id: string;
  title: string;
  subtitle?: string;
  slides: Slide[];
}

const usePresentationAI = (presentationData: PresentationData | null, onSlidesGenerated: (slides: Slide[]) => void) => {
  const [generateMoreLoading, setGenerateMoreLoading] = useState(false);
  
  const handleGenerateMoreSlides = async () => {
    if (!presentationData) return;
    
    setGenerateMoreLoading(true);
    
    try {
      const apiKey = localStorage.getItem('gemini_api_key');
      if (!apiKey) {
        toast.error('Gemini API key not found', {
          description: 'Please add your API key in the settings',
        });
        setGenerateMoreLoading(false);
        return;
      }
      
      const promptDetails = `
        This is a continuation of an existing presentation with the title: "${presentationData.title}"
        ${presentationData.subtitle ? `Subtitle: ${presentationData.subtitle}` : ''}
        
        The existing slides are about:
        ${presentationData.slides.map((slide, i) => 
          `Slide ${i+1}: ${slide.title} - ${slide.content.substring(0, 50)}...`
        ).join('\n')}
        
        Please generate 3 more slides that continue this presentation with the same style and theme.
        The new slides should flow naturally from the existing content.
      `;
      
      const additionalSlides = await generatePresentation(apiKey, presentationData.title, 3, promptDetails);
      
      if (additionalSlides && additionalSlides.slides && additionalSlides.slides.length > 0) {
        onSlidesGenerated(additionalSlides.slides);
        
        toast.success(`Added ${additionalSlides.slides.length} new slides`, {
          description: 'The presentation has been extended successfully.',
        });
      } else {
        toast.error('Failed to generate additional slides');
      }
    } catch (error) {
      console.error('Error generating additional slides:', error);
      toast.error('Failed to generate additional slides');
    } finally {
      setGenerateMoreLoading(false);
    }
  };
  
  return {
    generateMoreLoading,
    handleGenerateMoreSlides
  };
};

export default usePresentationAI;
