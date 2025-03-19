
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useDataLoader } from './hooks/useDataLoader';
import { usePresentationStorage } from './hooks/usePresentationStorage';
import { usePresentationUpdates } from './hooks/usePresentationUpdates';
import { Slide, PresentationData } from '../../types/presentation';

export const usePresentationManager = () => {
  const [presentationData, setPresentationData] = useState<PresentationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPresentationManager, setShowPresentationManager] = useState(false);
  const [isNewPresentation, setIsNewPresentation] = useState(false);
  
  // Extract data loading logic
  const { loadPresentation, checkLastPresentation } = useDataLoader(
    setPresentationData, 
    setShowPresentationManager, 
    setLoading
  );
  
  // Extract storage logic
  const { savePresentation } = usePresentationStorage(presentationData);
  
  // Extract update logic
  const { 
    updatePresentation, 
    updateSlide, 
    addSlide,
    deleteSlide
  } = usePresentationUpdates(presentationData, setPresentationData);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const presentationId = params.get('id');
    
    if (presentationId) {
      loadPresentation(presentationId);
    } else {
      const presentationData = localStorage.getItem('presentation_data');
      
      if (presentationData) {
        try {
          const parsedData = JSON.parse(presentationData);
          
          const newId = 'pres_' + Date.now();
          
          const newPresentation: PresentationData = {
            id: newId,
            title: parsedData.title || 'Untitled Presentation',
            subtitle: parsedData.subtitle || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            templateId: 'minimal',
            slides: parsedData.slides || []
          };
          
          localStorage.setItem(`presentation_${newId}`, JSON.stringify(newPresentation));
          
          const storedIds = localStorage.getItem('presentation_ids');
          let ids: string[] = [];
          
          if (storedIds) {
            try {
              ids = JSON.parse(storedIds);
            } catch (error) {
              console.error('Error parsing presentation ids:', error);
              ids = [];
            }
          }
          
          if (!ids.includes(newId)) {
            ids.push(newId);
            localStorage.setItem('presentation_ids', JSON.stringify(ids));
          }
          
          localStorage.setItem('last_presentation_id', newId);
          
          localStorage.removeItem('presentation_data');
          
          setPresentationData(newPresentation);
          setShowPresentationManager(false);
          setLoading(false);
        } catch (error) {
          console.error('Error processing presentation data:', error);
          checkLastPresentation();
        }
      } else {
        checkLastPresentation();
      }
    }
  }, []);
  
  return {
    presentationData,
    setPresentationData,
    loading,
    showPresentationManager,
    setShowPresentationManager,
    isNewPresentation,
    setIsNewPresentation,
    loadPresentation,
    savePresentation,
    updatePresentation,
    updateSlide,
    addSlide,
    deleteSlide
  };
};

export default usePresentationManager;
