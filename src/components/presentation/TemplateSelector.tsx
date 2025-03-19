
import React from 'react';
import PresentationTemplates, { Template } from '../PresentationTemplates';

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
  selectedTemplateId: string;
}

const TemplateSelector = ({ 
  isOpen,
  onClose,
  onSelectTemplate,
  selectedTemplateId
}: TemplateSelectorProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Choose a Template</h3>
            <button
              onClick={onClose}
              className="text-foreground/60 hover:text-foreground"
            >
              &times;
            </button>
          </div>
          <p className="text-foreground/70 mt-1">
            Select a design template for your presentation
          </p>
        </div>
        <div className="p-6">
          <PresentationTemplates
            onSelectTemplate={onSelectTemplate}
            selectedTemplateId={selectedTemplateId}
          />
        </div>
        <div className="p-6 border-t dark:border-gray-700 bg-secondary/30 dark:bg-gray-700/50 flex justify-between">
          <button
            onClick={onClose}
            className="btn-secondary dark:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="btn-primary"
          >
            Apply Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
