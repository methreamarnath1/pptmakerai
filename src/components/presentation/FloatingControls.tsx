
import { Save, LayoutTemplate, Plus } from 'lucide-react';

interface FloatingControlsProps {
  onSave: () => void;
  onOpenTemplates: () => void;
  onAddSlide: () => void;
}

const FloatingControls = ({
  onSave,
  onOpenTemplates,
  onAddSlide
}: FloatingControlsProps) => {
  return (
    <div className="fixed bottom-6 right-6">
      <div className="flex flex-col gap-3">
        <button
          onClick={onSave}
          className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border dark:border-gray-700"
          title="Save Presentation"
        >
          <Save size={20} className="text-blue-600 dark:text-blue-400" />
        </button>
        
        <button
          onClick={onOpenTemplates}
          className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border dark:border-gray-700"
          title="Choose Template"
        >
          <LayoutTemplate size={20} className="text-purple-600 dark:text-purple-400" />
        </button>
        
        <button
          onClick={onAddSlide}
          className="w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
          title="Add Slide"
        >
          <Plus size={24} className="text-primary-foreground" />
        </button>
      </div>
    </div>
  );
};

export default FloatingControls;
