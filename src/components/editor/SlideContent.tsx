
import React from 'react';
import { Trash2 } from 'lucide-react';
import ImageSizeControl from './ImageSizeControl';

interface ImageCredit {
  name: string;
  url: string;
}

interface SlideContentProps {
  title: string;
  content: string;
  imageUrl?: string;
  imageCredit?: ImageCredit;
  templatePrimaryColor: string;
  templateSecondaryColor: string;
  getTextColor: (bgColor: string) => string;
  imageSize: string;
  onRemoveImage: () => void;
  onToggleImageSize: (size: string) => void;
  setShowImageSearch: (show: boolean) => void;
  theme: string;
}

const SlideContent: React.FC<SlideContentProps> = ({
  title,
  content,
  imageUrl,
  imageCredit,
  templatePrimaryColor,
  templateSecondaryColor,
  getTextColor,
  imageSize,
  onRemoveImage,
  onToggleImageSize,
  setShowImageSearch,
  theme
}) => {
  
  // Get image container class based on size
  const getImageContainerClass = () => {
    switch (imageSize) {
      case 'small': return 'w-full md:w-1/4';
      case 'large': return 'w-full md:w-1/2';
      default: return 'w-full md:w-1/3';
    }
  };

  // Get content container class based on image size
  const getContentContainerClass = () => {
    if (!imageUrl) return 'flex-1';
    
    switch (imageSize) {
      case 'small': return 'flex-1';
      case 'large': return 'flex-1 md:w-1/2';
      default: return 'flex-1 md:w-2/3';
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Content */}
      <div className={getContentContainerClass()}>
        <h3 
          className="text-xl font-semibold mb-3"
          style={{ 
            color: templatePrimaryColor,
            textShadow: theme === 'dark' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none' 
          }}
        >
          {title}
        </h3>
        <div 
          className="whitespace-pre-line"
          style={{ 
            color: getTextColor(templateSecondaryColor) 
          }}
        >
          {content}
        </div>
      </div>
      
      {/* Image */}
      {imageUrl && (
        <div className={getImageContainerClass()}>
          <div className="relative">
            <img
              src={imageUrl}
              alt={`Slide image`}
              className="w-full rounded object-cover aspect-square"
            />
            <div className="absolute top-2 right-2 flex gap-1">
              <ImageSizeControl 
                size={imageSize} 
                onSizeChange={onToggleImageSize} 
              />
              <button
                onClick={onRemoveImage}
                className="bg-black/60 text-white p-1 rounded-full hover:bg-black/80"
                title="Remove image"
              >
                <Trash2 size={16} />
              </button>
            </div>
            {imageCredit && (
              <div className="text-xs mt-1 text-gray-500 dark:text-gray-300">
                Photo by{' '}
                <a
                  href={imageCredit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {imageCredit.name}
                </a>{' '}
                on Unsplash
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Image Placeholder */}
      {!imageUrl && (
        <div className={getImageContainerClass()}>
          <div 
            className="flex flex-col items-center justify-center border border-dashed rounded p-6 h-full min-h-[200px] cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:border-gray-600"
            onClick={() => setShowImageSearch(true)}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 mb-2">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
              <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Click to add an image for this slide
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideContent;
