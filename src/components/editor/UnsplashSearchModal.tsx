
import { useState, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import ImageSearch from '../ImageSearch';

export interface UnsplashSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string, credit: { name: string; url: string }) => void;
  initialQuery?: string;
}

const UnsplashSearchModal = ({
  isOpen,
  onClose,
  onSelectImage,
  initialQuery = ''
}: UnsplashSearchModalProps) => {
  const [loading, setLoading] = useState(false);
  
  const handleSelectImage = (imageUrl: string, credit: { name: string; url: string }) => {
    onSelectImage(imageUrl, credit);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-medium dark:text-white">Find an image on Unsplash</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4">
          <ImageSearch 
            onSelectImage={handleSelectImage} 
            initialQuery={initialQuery}
          />
          
          {loading && (
            <div className="flex justify-center items-center mt-4">
              <Loader2 size={24} className="animate-spin text-primary" />
              <span className="ml-2 text-gray-500 dark:text-gray-400">Loading images...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnsplashSearchModal;
