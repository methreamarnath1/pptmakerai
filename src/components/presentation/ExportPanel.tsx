
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { exportToPdf, exportToImages, exportToPowerPoint } from '../../utils/exportUtils';
import ExportOptions from '../editor/ExportOptions';

interface ExportPanelProps {
  presentationData: any;
  selectedTemplate: any;
  onClose: () => void;
}

const ExportPanel = ({ presentationData, selectedTemplate, onClose }: ExportPanelProps) => {
  const { theme } = useTheme();
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExportAction = async (format: string, layoutPreference: string = 'auto') => {
    if (format === 'cancel') {
      onClose();
      return;
    }
    
    setIsExporting(true);
    
    try {
      if (presentationData && presentationData.slides.length > 0) {
        let success = false;
        
        if (format === 'pdf') {
          success = await exportToPdf(presentationData.slides, presentationData.title, selectedTemplate, theme);
        } else if (format === 'images') {
          success = await exportToImages(presentationData.slides, presentationData.title, selectedTemplate, theme);
        } else if (format === 'ppt') {
          success = await exportToPowerPoint(
            presentationData.slides, 
            presentationData.title, 
            selectedTemplate, 
            theme,
            layoutPreference
          );
        }
      }
    } catch (error) {
      console.error('Error during export:', error);
    } finally {
      setIsExporting(false);
      onClose();
    }
  };
  
  return (
    <ExportOptions 
      presentationTitle={presentationData.title}
      slides={presentationData.slides}
      isExporting={isExporting}
      onExport={handleExportAction}
    />
  );
};

export default ExportPanel;
