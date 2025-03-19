
import TemplateSelector from './TemplateSelector';
import ExportPanel from './ExportPanel';
import { Template } from '../PresentationTemplates';
import { PresentationData } from '../../types/presentation';

interface PresentationModalsProps {
  showTemplates: boolean;
  setShowTemplates: (show: boolean) => void;
  showExportOptions: boolean;
  setShowExportOptions: (show: boolean) => void;
  selectedTemplateId: string;
  selectedTemplate: Template | null;
  presentationData: PresentationData;
  onSelectTemplate: (template: Template) => void;
}

const PresentationModals = ({
  showTemplates,
  setShowTemplates,
  showExportOptions,
  setShowExportOptions,
  selectedTemplateId,
  selectedTemplate,
  presentationData,
  onSelectTemplate
}: PresentationModalsProps) => {
  return (
    <>
      {showTemplates && (
        <TemplateSelector
          isOpen={showTemplates}
          onClose={() => setShowTemplates(false)}
          onSelectTemplate={onSelectTemplate}
          selectedTemplateId={selectedTemplateId}
        />
      )}
      
      {showExportOptions && (
        <ExportPanel
          presentationData={presentationData}
          selectedTemplate={selectedTemplate}
          onClose={() => setShowExportOptions(false)}
        />
      )}
    </>
  );
};

export default PresentationModals;
