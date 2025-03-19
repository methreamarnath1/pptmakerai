
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import ImageSearch from './ImageSearch';
import SlideContent from './editor/SlideContent';
import SlideForm from './editor/SlideForm';
import SlideControls from './editor/SlideControls';

interface SlideEditorProps {
  slide: {
    title: string;
    content: string;
    notes?: string;
    imagePrompt?: string;
    imageUrl?: string;
    imageCredit?: {
      name: string;
      url: string;
    };
  };
  index: number;
  onChange: (index: number, updatedSlide: any) => void;
  onDelete: (index: number) => void;
  template: {
    id: string;
    name: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}

const SlideEditor = ({ slide, index, onChange, onDelete, template }: SlideEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [editedTitle, setEditedTitle] = useState(slide.title);
  const [editedContent, setEditedContent] = useState(slide.content);
  const [editedNotes, setEditedNotes] = useState(slide.notes || '');
  const [imageSize, setImageSize] = useState('medium'); // 'small', 'medium', 'large'
  const { theme } = useTheme();
  
  useEffect(() => {
    setEditedTitle(slide.title);
    setEditedContent(slide.content);
    setEditedNotes(slide.notes || '');
  }, [slide]);
  
  const handleSaveChanges = () => {
    onChange(index, {
      ...slide,
      title: editedTitle,
      content: editedContent,
      notes: editedNotes,
    });
    setIsEditing(false);
  };
  
  const handleSelectImage = (imageUrl: string, credit: { name: string, url: string }) => {
    onChange(index, {
      ...slide,
      imageUrl,
      imageCredit: credit
    });
    setShowImageSearch(false);
  };
  
  const handleRemoveImage = () => {
    onChange(index, {
      ...slide,
      imageUrl: undefined,
      imageCredit: undefined
    });
  };

  const handleToggleImageSize = (newSize: string) => {
    setImageSize(newSize);
  };

  // Calculate text color based on background to ensure visibility
  const getTextColor = (bgColor: string) => {
    // If it's the dark template or we're in dark mode with a dark template
    if (template.id === 'dark' || (theme === 'dark' && template.secondaryColor.includes('1a1a1a'))) {
      return '#ffffff';
    }
    // Use default template text color
    return template.id === 'dark' ? '#fff' : '#334155';
  };
  
  return (
    <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
      {/* Slide Preview */}
      <div
        className="p-6"
        style={{
          backgroundColor: template.secondaryColor,
          fontFamily: template.fontFamily,
          color: getTextColor(template.secondaryColor),
        }}
      >
        {!isEditing ? (
          <SlideContent 
            title={slide.title}
            content={slide.content}
            imageUrl={slide.imageUrl}
            imageCredit={slide.imageCredit}
            templatePrimaryColor={template.primaryColor}
            templateSecondaryColor={template.secondaryColor}
            getTextColor={getTextColor}
            imageSize={imageSize}
            onRemoveImage={handleRemoveImage}
            onToggleImageSize={handleToggleImageSize}
            setShowImageSearch={setShowImageSearch}
            theme={theme}
          />
        ) : (
          <SlideForm 
            editedTitle={editedTitle}
            editedContent={editedContent}
            editedNotes={editedNotes}
            setEditedTitle={setEditedTitle}
            setEditedContent={setEditedContent}
            setEditedNotes={setEditedNotes}
          />
        )}
      </div>
      
      {/* Slide Controls */}
      <SlideControls 
        slideIndex={index}
        hasNotes={!!slide.notes}
        isEditing={isEditing}
        onDelete={onDelete}
        setShowImageSearch={setShowImageSearch}
        setIsEditing={setIsEditing}
        handleSaveChanges={handleSaveChanges}
      />
      
      {/* Image Search Modal */}
      {showImageSearch && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-medium text-lg dark:text-white">Select an Image</h3>
              <button
                onClick={() => setShowImageSearch(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <ImageSearch 
                onSelectImage={handleSelectImage} 
                initialQuery={slide.imagePrompt || slide.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideEditor;
