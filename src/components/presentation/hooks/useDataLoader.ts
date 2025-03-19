
import { toast } from 'sonner';
import { PresentationData } from '../../../types/presentation';

export const useDataLoader = (
  setPresentationData: React.Dispatch<React.SetStateAction<PresentationData | null>>,
  setShowPresentationManager: React.Dispatch<React.SetStateAction<boolean>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  
  const loadPresentation = (id: string) => {
    setLoading(true);
    
    const presentationData = localStorage.getItem(`presentation_${id}`);
    if (presentationData) {
      try {
        const parsedData = JSON.parse(presentationData);
        setPresentationData({
          id,
          ...parsedData
        });
        
        localStorage.setItem('last_presentation_id', id);
        
        setShowPresentationManager(false);
      } catch (error) {
        console.error('Error parsing presentation data:', error);
        toast.error('Failed to load presentation data');
        setShowPresentationManager(true);
      }
    } else {
      toast.error('Presentation not found');
      setShowPresentationManager(true);
    }
    
    setLoading(false);
  };
  
  const checkLastPresentation = () => {
    const lastPresentationId = localStorage.getItem('last_presentation_id');
    
    if (lastPresentationId) {
      loadPresentation(lastPresentationId);
    } else {
      setShowPresentationManager(true);
      setLoading(false);
    }
  };
  
  return {
    loadPresentation,
    checkLastPresentation
  };
};
