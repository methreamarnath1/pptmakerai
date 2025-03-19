
import React from 'react';
import { Download } from 'lucide-react';

interface ExportActionButtonsProps {
  selectedFormat: string;
  isExporting: boolean;
  presentationTitle: string;
  onCancel: () => void;
  onExport: () => void;
}

const ExportActionButtons = ({
  selectedFormat,
  isExporting,
  presentationTitle,
  onCancel,
  onExport
}: ExportActionButtonsProps) => {
  return (
    <div className="flex justify-end mt-8">
      <button
        className="px-4 py-2 text-gray-600 dark:text-gray-300 mr-3"
        onClick={onCancel}
      >
        Cancel
      </button>
      
      <button
        className={`px-6 py-2 bg-blue-600 text-white rounded flex items-center ${
          !selectedFormat || isExporting 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:bg-blue-700'
        }`}
        onClick={onExport}
        disabled={!selectedFormat || isExporting}
      >
        {isExporting ? (
          <>
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <Download size={18} className="mr-2" />
            <span>Export {presentationTitle}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ExportActionButtons;
