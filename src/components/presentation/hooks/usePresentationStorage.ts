
import { toast } from 'sonner';
import { PresentationData } from '../../../types/presentation';

export const usePresentationStorage = (presentationData: PresentationData | null) => {
  
  const savePresentation = () => {
    if (presentationData) {
      const updatedPresentation = {
        ...presentationData,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(`presentation_${updatedPresentation.id}`, JSON.stringify(updatedPresentation));
      
      const storedPresentationIds = localStorage.getItem('presentation_ids');
      let ids: string[] = [];
      
      if (storedPresentationIds) {
        try {
          ids = JSON.parse(storedPresentationIds);
          if (!ids.includes(updatedPresentation.id)) {
            ids.push(updatedPresentation.id);
          }
        } catch (error) {
          console.error('Error parsing presentation ids:', error);
          ids = [updatedPresentation.id];
        }
      } else {
        ids = [updatedPresentation.id];
      }
      
      localStorage.setItem('presentation_ids', JSON.stringify(ids));
      
      toast.success('Presentation saved successfully');
      return true;
    }
    return false;
  };
  
  return {
    savePresentation
  };
};
