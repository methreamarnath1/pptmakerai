
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Slide } from '../../types/presentation';
import ExportFormatSelector from './ExportFormatSelector';
import PowerPointLayoutOptions from './PowerPointLayoutOptions';
import ExportActionButtons from './ExportActionButtons';

interface ExportOptionsProps {
  presentationTitle: string;
  slides: Slide[];
  isExporting: boolean;
  onExport: (format: string, layoutPreference?: string) => void;
}

const ExportOptions = ({
  presentationTitle,
  slides,
  isExporting,
  onExport
}: ExportOptionsProps) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [layoutPreference, setLayoutPreference] = useState<string>('auto');
  
  const handleSelectFormat = (format: string) => {
    setSelectedFormat(format);
  };
  
  const handleExport = () => {
    if (selectedFormat) {
      onExport(selectedFormat, layoutPreference);
    }
  };

  const handleLayoutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLayoutPreference(e.target.value);
  };

  const handleCancel = () => {
    onExport('cancel');
  };
  
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold dark:text-white">Export Presentation</h2>
        <button 
          onClick={handleCancel}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>
      </div>
      
      <ExportFormatSelector 
        selectedFormat={selectedFormat} 
        onSelectFormat={handleSelectFormat} 
      />
      
      {selectedFormat === 'ppt' && (
        <PowerPointLayoutOptions 
          layoutPreference={layoutPreference}
          onLayoutChange={handleLayoutChange}
        />
      )}
      
      <ExportActionButtons
        selectedFormat={selectedFormat}
        isExporting={isExporting}
        presentationTitle={presentationTitle}
        onCancel={handleCancel}
        onExport={handleExport}
      />
      
      {selectedFormat && (
        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
          Your presentation with {slides.length} slides will be exported as a {selectedFormat === 'pdf' ? 'PDF document' : selectedFormat === 'ppt' ? 'PowerPoint file' : 'set of images'}.
        </p>
      )}
    </div>
  );
};

export default ExportOptions;
