
import { useState } from 'react';
import { Canvas } from 'fabric';
import { 
  Sparkles, 
  MoveHorizontal, 
  MoveVertical, 
  Zap, 
  RotateCcw 
} from 'lucide-react';

interface AnimationControlsProps {
  canvas: Canvas | null;
  activeObject: any | null;
}

const AnimationControls = ({ canvas, activeObject }: AnimationControlsProps) => {
  const [animationSpeed, setAnimationSpeed] = useState(500);
  
  if (!canvas || !activeObject) {
    return (
      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg opacity-50 pointer-events-none">
        <h3 className="text-sm font-medium mb-3">Animations</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Select an object to apply animations</p>
      </div>
    );
  }
  
  const applyFadeAnimation = () => {
    const originalOpacity = activeObject.opacity || 1;
    
    // Reset previous animations
    if (activeObject.animationTimer) {
      clearInterval(activeObject.animationTimer);
    }
    
    // Start animation
    let direction = -1; // -1 for fade out, 1 for fade in
    let opacity = originalOpacity;
    const step = 0.05;
    
    activeObject.animationTimer = setInterval(() => {
      opacity += step * direction;
      
      if (opacity <= 0) {
        direction = 1;
        opacity = 0;
      } else if (opacity >= originalOpacity) {
        direction = -1;
        opacity = originalOpacity;
      }
      
      activeObject.set('opacity', opacity);
      canvas.renderAll();
    }, animationSpeed / 20);
    
    canvas.renderAll();
  };
  
  const applyBounceAnimation = () => {
    const originalTop = activeObject.top;
    
    // Reset previous animations
    if (activeObject.animationTimer) {
      clearInterval(activeObject.animationTimer);
    }
    
    // Start animation
    let direction = -1; // -1 for up, 1 for down
    let top = originalTop;
    const step = 5;
    const range = 20;
    
    activeObject.animationTimer = setInterval(() => {
      top += step * direction;
      
      if (top <= originalTop - range) {
        direction = 1;
      } else if (top >= originalTop) {
        direction = -1;
        top = originalTop;
      }
      
      activeObject.set('top', top);
      canvas.renderAll();
    }, animationSpeed / 20);
    
    canvas.renderAll();
  };
  
  const applySlideAnimation = () => {
    const originalLeft = activeObject.left;
    
    // Reset previous animations
    if (activeObject.animationTimer) {
      clearInterval(activeObject.animationTimer);
    }
    
    // Start animation
    let direction = 1; // 1 for right, -1 for left
    let left = originalLeft;
    const step = 5;
    const range = 50;
    
    activeObject.animationTimer = setInterval(() => {
      left += step * direction;
      
      if (left >= originalLeft + range) {
        direction = -1;
      } else if (left <= originalLeft) {
        direction = 1;
        left = originalLeft;
      }
      
      activeObject.set('left', left);
      canvas.renderAll();
    }, animationSpeed / 20);
    
    canvas.renderAll();
  };
  
  const applyRotateAnimation = () => {
    // Reset previous animations
    if (activeObject.animationTimer) {
      clearInterval(activeObject.animationTimer);
    }
    
    // Start animation
    let angle = activeObject.angle || 0;
    const step = 2;
    
    activeObject.animationTimer = setInterval(() => {
      angle = (angle + step) % 360;
      activeObject.set('angle', angle);
      canvas.renderAll();
    }, animationSpeed / 20);
    
    canvas.renderAll();
  };
  
  const stopAnimation = () => {
    if (activeObject.animationTimer) {
      clearInterval(activeObject.animationTimer);
      activeObject.animationTimer = null;
    }
  };
  
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <h3 className="text-sm font-medium mb-3">Animations</h3>
      
      <div className="mb-3">
        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
          Animation Speed
        </label>
        <input
          type="range"
          min="100"
          max="1000"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={applyFadeAnimation}
          className="flex flex-col items-center justify-center p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          title="Fade Animation"
        >
          <Sparkles size={20} />
          <span className="text-xs mt-1">Fade</span>
        </button>
        
        <button
          onClick={applyBounceAnimation}
          className="flex flex-col items-center justify-center p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          title="Bounce Animation"
        >
          <MoveVertical size={20} />
          <span className="text-xs mt-1">Bounce</span>
        </button>
        
        <button
          onClick={applySlideAnimation}
          className="flex flex-col items-center justify-center p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          title="Slide Animation"
        >
          <MoveHorizontal size={20} />
          <span className="text-xs mt-1">Slide</span>
        </button>
        
        <button
          onClick={applyRotateAnimation}
          className="flex flex-col items-center justify-center p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          title="Rotate Animation"
        >
          <RotateCcw size={20} />
          <span className="text-xs mt-1">Rotate</span>
        </button>
      </div>
      
      <button
        onClick={stopAnimation}
        className="w-full mt-3 p-2 text-sm bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-900/50"
      >
        Stop Animation
      </button>
    </div>
  );
};

export default AnimationControls;
