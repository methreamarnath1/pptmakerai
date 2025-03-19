
import React, { useState } from 'react';
import SlideEditor from '../SlideEditor';
import BackgroundCustomizer from '../editor/BackgroundCustomizer';
import ImageSearch from '../ImageSearch';

interface EditorContainerProps {
  slide: any;
  slideIndex: number;
  onSaveSlide: (updatedSlide: any) => void;
  onDeleteSlide: (index: number) => void;
  template: {
    id: string;
    name: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}

const EditorContainer = ({
  slide,
  slideIndex,
  onSaveSlide,
  onDeleteSlide,
  template
}: EditorContainerProps) => {
  const [showBackgroundOptions, setShowBackgroundOptions] = useState(false);
  const [showBackgroundImageSearch, setShowBackgroundImageSearch] = useState(false);
  
  const handleBackgroundColorChange = (color: string) => {
    onSaveSlide({
      ...slide,
      backgroundColor: color,
      backgroundImage: undefined,
      backgroundImageCredit: undefined
    });
  };

  const handleBackgroundImageSelect = (imageUrl: string, credit?: { name: string, url: string }) => {
    onSaveSlide({
      ...slide,
      backgroundImage: imageUrl,
      backgroundImageCredit: credit,
      backgroundColor: slide.backgroundColor || template.secondaryColor
    });
    setShowBackgroundImageSearch(false);
  };

  const formatMarkdownIndicator = slide.content?.includes('*') || slide.content?.includes('• ') ? 
    "⚠️ Contains markdown: Bold (**text**), bullet points (* item)" : "";

  return (
    <div className="mb-6">
      <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium dark:text-white">Slide {slideIndex + 1}</h3>
          <div className="space-x-2">
            <button 
              onClick={() => setShowBackgroundOptions(!showBackgroundOptions)}
              className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {showBackgroundOptions ? 'Hide Background Options' : 'Background Options'}
            </button>
            <button 
              onClick={() => setShowBackgroundImageSearch(true)}
              className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Background Image
            </button>
          </div>
        </div>
        
        {formatMarkdownIndicator && (
          <div className="mb-3 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md text-sm text-amber-700 dark:text-amber-400">
            {formatMarkdownIndicator}
          </div>
        )}
        
        {showBackgroundOptions && (
          <div className="mb-4">
            <BackgroundCustomizer 
              onColorChange={handleBackgroundColorChange}
              onImageSelect={handleBackgroundImageSelect}
              currentColor={slide.backgroundColor || template.secondaryColor}
              currentImage={slide.backgroundImage}
            />
          </div>
        )}
        
        <SlideEditor
          slide={slide}
          index={slideIndex}
          onChange={(index, updatedSlide) => onSaveSlide(updatedSlide)}
          onDelete={onDeleteSlide}
          template={template}
        />
      </div>

      {/* Background Image Search Modal */}
      {showBackgroundImageSearch && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-medium text-lg dark:text-white">Select Background Image</h3>
              <button
                onClick={() => setShowBackgroundImageSearch(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <ImageSearch 
                onSelectImage={handleBackgroundImageSelect}
                initialQuery={slide.title || "background"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorContainer;
