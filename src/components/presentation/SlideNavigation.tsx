
import { useState } from 'react';
import { Plus, Loader2, Presentation } from 'lucide-react';

interface Slide {
  title: string;
  content: string;
  notes?: string;
  imagePrompt?: string;
  imageUrl?: string;
  imageCredit?: {
    name: string;
    url: string;
  };
  backgroundColor?: string;
  backgroundImage?: string;
}

interface SlideNavigationProps {
  slides: Slide[];
  activeSlideIndex: number;
  onSlideSelect: (index: number) => void;
  onAddSlide: () => void;
  onGenerateMoreSlides: () => void;
  generateMoreLoading: boolean;
}

const SlideNavigation = ({
  slides,
  activeSlideIndex,
  onSlideSelect,
  onAddSlide,
  onGenerateMoreSlides,
  generateMoreLoading
}: SlideNavigationProps) => {
  return (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-border p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Slides</h2>
        <div className="flex gap-3">
          <button
            onClick={onGenerateMoreSlides}
            disabled={generateMoreLoading}
            className="text-sm py-1 px-3 bg-primary/20 text-primary-foreground hover:bg-primary/30 rounded-full flex items-center"
          >
            {generateMoreLoading ? (
              <Loader2 size={14} className="mr-2 animate-spin" />
            ) : (
              <Presentation size={14} className="mr-1" />
            )}
            Generate More Slides
          </button>
          <button
            onClick={onAddSlide}
            className="text-sm py-1 px-3 bg-green-600 text-white rounded-full flex items-center"
          >
            <Plus size={14} className="mr-1" />
            Add Slide
          </button>
        </div>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2">
        {slides.map((slide, index) => (
          <div
            key={index}
            onClick={() => onSlideSelect(index)}
            className={`min-w-[180px] p-2 rounded cursor-pointer transition-colors ${
              activeSlideIndex === index 
                ? 'bg-primary/20 border-primary border' 
                : 'bg-secondary hover:bg-secondary/80 border border-border dark:bg-gray-700 dark:hover:bg-gray-600'
            }`}
            style={{
              backgroundColor: slide.backgroundColor || 'inherit'
            }}
          >
            <div className="text-xs text-foreground/60 mb-1">Slide {index + 1}</div>
            <h4 className="text-sm font-medium truncate">{slide.title}</h4>
            <p className="text-xs text-foreground/70 line-clamp-2 h-8">
              {slide.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideNavigation;
