
import { useRef, useEffect, useState } from 'react';
import { Canvas } from 'fabric';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { fetchUnsplashImageForPrompt } from '../../utils/unsplashApi';
import { useApiKey } from '../../context/ApiKeyContext';
import { generateSlideContent } from '../../utils/geminiApi';

interface CanvasContainerProps {
  onCanvasInit: (canvas: Canvas) => void;
  slideImagePrompt?: string;
  onImageLoaded?: (imageUrl: string, credit: { name: string; url: string }) => void;
}

const CanvasContainer = ({ 
  onCanvasInit, 
  slideImagePrompt,
  onImageLoaded 
}: CanvasContainerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);
  const { apiKey, isApiKeySet } = useApiKey();
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const fabricCanvas = new Canvas(canvasRef.current, {
      width: 800,
      height: 450,
    });
    
    onCanvasInit(fabricCanvas);
    
    return () => {
      fabricCanvas.dispose();
    };
  }, [onCanvasInit]);

  // Effect to load image from prompt if provided
  useEffect(() => {
    const loadImageFromPrompt = async () => {
      if (!slideImagePrompt || !isApiKeySet || loading) return;
      
      setLoading(true);
      try {
        // First try to use the prompt directly
        let image = await fetchUnsplashImageForPrompt(slideImagePrompt);
        
        // If no results, generate a better prompt with Gemini
        if (!image && apiKey) {
          const betterPrompt = await generateSlideContent(apiKey, slideImagePrompt, 'imagePrompt');
          if (betterPrompt) {
            image = await fetchUnsplashImageForPrompt(betterPrompt);
            if (image) {
              toast.success('AI generated a better image prompt for you!');
            }
          }
        }
        
        // If we found an image, notify parent component
        if (image && onImageLoaded) {
          onImageLoaded(image.url, image.credit);
        } else if (slideImagePrompt) {
          console.log('Could not find image for prompt:', slideImagePrompt);
        }
      } catch (error) {
        console.error('Error loading image from prompt:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadImageFromPrompt();
  }, [slideImagePrompt, apiKey, isApiKeySet, onImageLoaded, loading]);

  return (
    <div className="border border-t-0 border-border dark:border-gray-700 rounded-b-lg p-6 bg-gray-50 dark:bg-gray-900 flex justify-center relative">
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-black/30 p-3 rounded-full">
          <Loader2 size={30} className="animate-spin text-white" />
        </div>
      )}
      <div className="canvas-container shadow-lg">
        <canvas ref={canvasRef} className="border border-gray-200 dark:border-gray-700"></canvas>
      </div>
    </div>
  );
};

export default CanvasContainer;
