
import { useState } from 'react';
import { 
  Image as ImageIcon, 
  Paintbrush, 
  Trash, 
  Search,
  X
} from 'lucide-react';
import UnsplashSearchModal from './UnsplashSearchModal';
import { toast } from 'sonner';

interface BackgroundCustomizerProps {
  onColorChange: (color: string) => void;
  onImageSelect: (imageUrl: string) => void;
  currentColor: string;
  currentImage?: string | null;
}

const BackgroundCustomizer = ({
  onColorChange,
  onImageSelect,
  currentColor,
  currentImage
}: BackgroundCustomizerProps) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isUnsplashModalOpen, setIsUnsplashModalOpen] = useState(false);
  
  const presetColors = [
    '#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', 
    '#cbd5e1', '#94a3b8', '#64748b', '#334155', 
    '#1e293b', '#0f172a', '#020617', '#000000',
    '#ef4444', '#f97316', '#f59e0b', '#eab308',
    '#84cc16', '#22c55e', '#10b981', '#14b8a6',
    '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
    '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
    '#f43f5e'
  ];
  
  const handleUnsplashImageSelect = (imageUrl: string, credit: { name: string; url: string }) => {
    if (!imageUrl) {
      toast.error('Failed to get image URL from Unsplash');
      return;
    }
    
    onImageSelect(imageUrl);
    setIsUnsplashModalOpen(false);
    toast.success('Background image set successfully');
  };
  
  const handleRemoveBackgroundImage = () => {
    onImageSelect('');
    toast.success('Background image removed');
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <h3 className="text-sm font-medium mb-3 dark:text-white">Background</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-xs text-gray-500 dark:text-gray-400 mb-2">Color</h4>
          <div className="relative">
            <button 
              onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
              className="flex items-center w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 text-sm"
            >
              <div 
                className="w-5 h-5 rounded mr-2" 
                style={{ backgroundColor: currentColor }}
              ></div>
              <span className="flex-1 text-left dark:text-gray-200">
                {currentColor.toUpperCase()}
              </span>
              <Paintbrush size={16} className="text-gray-400" />
            </button>
            
            {isColorPickerOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-3 z-10">
                <div className="grid grid-cols-7 gap-1">
                  {presetColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        onColorChange(color);
                        setIsColorPickerOpen(false);
                      }}
                      className="w-7 h-7 rounded-sm hover:scale-110 transition-transform"
                      style={{ 
                        backgroundColor: color,
                        boxShadow: color === currentColor ? '0 0 0 2px #3b82f6' : 'none',
                        transform: color === currentColor ? 'scale(1.1)' : undefined
                      }}
                      title={color}
                    ></button>
                  ))}
                </div>
                
                <div className="mt-2">
                  <input
                    type="color"
                    value={currentColor}
                    onChange={(e) => onColorChange(e.target.value)}
                    className="w-full h-8 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h4 className="text-xs text-gray-500 dark:text-gray-400 mb-2">Image</h4>
          {currentImage ? (
            <div className="relative w-full h-20">
              <img 
                src={currentImage} 
                alt="Background" 
                className="w-full h-full object-cover rounded"
                crossOrigin="anonymous"
              />
              <button
                onClick={handleRemoveBackgroundImage}
                className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full"
              >
                <Trash size={12} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsUnsplashModalOpen(true)}
              className="flex flex-col items-center justify-center w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 border-dashed rounded-md h-20 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <ImageIcon size={18} className="text-gray-400 mb-1" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Add Background Image</span>
            </button>
          )}
        </div>
      </div>
      
      <UnsplashSearchModal 
        isOpen={isUnsplashModalOpen}
        onClose={() => setIsUnsplashModalOpen(false)}
        onSelectImage={handleUnsplashImageSelect}
      />
    </div>
  );
};

export default BackgroundCustomizer;
