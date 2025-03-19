
import React from 'react';
import { Trash2, ImageIcon, Edit } from 'lucide-react';

interface SlideControlsProps {
  slideIndex: number;
  hasNotes: boolean;
  isEditing: boolean;
  onDelete: (index: number) => void;
  setShowImageSearch: (show: boolean) => void;
  setIsEditing: (editing: boolean) => void;
  handleSaveChanges: () => void;
}

const SlideControls: React.FC<SlideControlsProps> = ({
  slideIndex,
  hasNotes,
  isEditing,
  onDelete,
  setShowImageSearch,
  setIsEditing,
  handleSaveChanges
}) => {
  return (
    <div className="p-3 border-t bg-gray-50 dark:bg-gray-700 dark:border-gray-600 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium dark:text-white">Slide {slideIndex + 1}</span>
        {hasNotes && (
          <span className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 dark:text-white rounded-full">
            Has notes
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onDelete(slideIndex)}
          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
          title="Delete slide"
        >
          <Trash2 size={18} />
        </button>
        
        <button
          onClick={() => setShowImageSearch(true)}
          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"
          title="Change image"
        >
          <ImageIcon size={18} />
        </button>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded"
            title="Edit content"
          >
            <Edit size={18} />
          </button>
        ) : (
          <button
            onClick={handleSaveChanges}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default SlideControls;
