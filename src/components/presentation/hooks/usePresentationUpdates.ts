
import { toast } from 'sonner';
import { PresentationData, Slide } from '../../../types/presentation';

export const usePresentationUpdates = (
  presentationData: PresentationData | null,
  setPresentationData: React.Dispatch<React.SetStateAction<PresentationData | null>>
) => {
  
  const updatePresentation = (updates: Partial<PresentationData>) => {
    if (presentationData) {
      const updatedPresentation = {
        ...presentationData,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      setPresentationData(updatedPresentation);
      
      localStorage.setItem(`presentation_${updatedPresentation.id}`, JSON.stringify(updatedPresentation));
      return updatedPresentation;
    }
    return null;
  };
  
  const updateSlide = (index: number, slide: Slide) => {
    if (!presentationData) return null;
    
    const slides = [...presentationData.slides];
    slides[index] = slide;
    
    return updatePresentation({ slides });
  };
  
  const addSlide = (slide: Slide) => {
    if (!presentationData) return null;
    
    const slides = [...presentationData.slides, slide];
    
    const updated = updatePresentation({ slides });
    toast.success('New slide added');
    return updated;
  };
  
  const deleteSlide = (index: number) => {
    if (!presentationData || presentationData.slides.length <= 1) {
      toast.error('Cannot delete the only slide');
      return null;
    }
    
    const slides = presentationData.slides.filter((_, i) => i !== index);
    
    const updated = updatePresentation({ slides });
    toast.success('Slide deleted');
    return updated;
  };
  
  return {
    updatePresentation,
    updateSlide,
    addSlide,
    deleteSlide
  };
};
