
import React from 'react';
import { FileText, Presentation, Image as ImageIcon } from 'lucide-react';

interface ExportFormatSelectorProps {
  selectedFormat: string;
  onSelectFormat: (format: string) => void;
}

const ExportFormatSelector = ({ selectedFormat, onSelectFormat }: ExportFormatSelectorProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-2 dark:text-white">Export Format</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
            selectedFormat === 'pdf' 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          onClick={() => onSelectFormat('pdf')}
        >
          <FileText size={28} className={selectedFormat === 'pdf' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'} />
          <span className={`mt-2 font-medium ${selectedFormat === 'pdf' ? 'text-blue-500' : 'text-gray-800 dark:text-gray-200'}`}>
            PDF Document
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">High quality printable document</span>
        </button>
        
        <button
          className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
            selectedFormat === 'ppt' 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          onClick={() => onSelectFormat('ppt')}
        >
          <Presentation size={28} className={selectedFormat === 'ppt' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'} />
          <span className={`mt-2 font-medium ${selectedFormat === 'ppt' ? 'text-blue-500' : 'text-gray-800 dark:text-gray-200'}`}>
            PowerPoint
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Editable presentation (.pptx)</span>
        </button>
        
        <button
          className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
            selectedFormat === 'images' 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          onClick={() => onSelectFormat('images')}
        >
          <ImageIcon size={28} className={selectedFormat === 'images' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'} />
          <span className={`mt-2 font-medium ${selectedFormat === 'images' ? 'text-blue-500' : 'text-gray-800 dark:text-gray-200'}`}>
            Image Files
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate PNG images for each slide</span>
        </button>
      </div>
    </div>
  );
};

export default ExportFormatSelector;
