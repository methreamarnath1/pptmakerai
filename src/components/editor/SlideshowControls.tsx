
import { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Clock } from 'lucide-react';

interface SlideshowControlsProps {
  slideCount: number;
  currentSlide: number;
  onChangeSlide: (slideIndex: number) => void;
  onStartSlideshow: () => void;
  onStopSlideshow: () => void;
  isPlaying: boolean;
}

const SlideshowControls = ({
  slideCount,
  currentSlide,
  onChangeSlide,
  onStartSlideshow,
  onStopSlideshow,
  isPlaying
}: SlideshowControlsProps) => {
  const [slideDuration, setSlideDuration] = useState(5); // In seconds
  
  const handlePrevSlide = () => {
    const prevSlide = Math.max(0, currentSlide - 1);
    onChangeSlide(prevSlide);
  };
  
  const handleNextSlide = () => {
    const nextSlide = Math.min(slideCount - 1, currentSlide + 1);
    onChangeSlide(nextSlide);
  };
  
  const handleSlideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slideIndex = parseInt(e.target.value);
    onChangeSlide(slideIndex);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
      <h3 className="text-sm font-medium mb-4">Slideshow Controls</h3>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevSlide}
            disabled={currentSlide === 0}
            className={`p-2 rounded-full ${
              currentSlide === 0 
                ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700' 
                : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
            }`}
            title="Previous Slide"
          >
            <SkipBack size={16} />
          </button>
          
          <button
            onClick={isPlaying ? onStopSlideshow : onStartSlideshow}
            className={`p-2 rounded-full ${
              isPlaying 
                ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50' 
                : 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50'
            }`}
            title={isPlaying ? "Stop Slideshow" : "Start Slideshow"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          
          <button
            onClick={handleNextSlide}
            disabled={currentSlide === slideCount - 1}
            className={`p-2 rounded-full ${
              currentSlide === slideCount - 1 
                ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700' 
                : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
            }`}
            title="Next Slide"
          >
            <SkipForward size={16} />
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Clock size={16} className="text-gray-500" />
          <select
            value={slideDuration}
            onChange={(e) => setSlideDuration(parseInt(e.target.value))}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm p-1"
            title="Seconds per slide"
          >
            {[3, 5, 10, 15, 20].map(seconds => (
              <option key={seconds} value={seconds}>
                {seconds}s
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Slide {currentSlide + 1} of {slideCount}</span>
          <span>{Math.floor((currentSlide / (slideCount - 1)) * 100)}%</span>
        </div>
        
        <input
          type="range"
          min="0"
          max={slideCount - 1}
          value={currentSlide}
          onChange={handleSlideChange}
          className="w-full"
        />
      </div>
      
      <div className="mt-4 grid grid-cols-5 gap-2">
        {Array.from({ length: slideCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => onChangeSlide(index)}
            className={`h-8 rounded ${
              currentSlide === index 
                ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-800 bg-primary/20' 
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            title={`Go to slide ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlideshowControls;
