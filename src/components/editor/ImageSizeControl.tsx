
import React from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

interface ImageSizeControlProps {
  size: string;
  onSizeChange: (size: string) => void;
}

const ImageSizeControl: React.FC<ImageSizeControlProps> = ({ size, onSizeChange }) => {
  const toggleSize = () => {
    if (size === 'small') onSizeChange('medium');
    else if (size === 'medium') onSizeChange('large');
    else onSizeChange('small');
  };

  return (
    <button
      onClick={toggleSize}
      className="bg-black/60 text-white p-1 rounded-full hover:bg-black/80"
      title="Resize image"
    >
      {size === 'large' ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
    </button>
  );
};

export default ImageSizeControl;
