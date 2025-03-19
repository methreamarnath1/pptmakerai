
import { toast } from 'sonner';
import PresentationHeader from './PresentationHeader';
import SlideNavigation from './SlideNavigation';
import FloatingControls from './FloatingControls';
import EditorContainer from './EditorContainer';
import { Template } from '../PresentationTemplates';
import { PresentationData, Slide } from '../../types/presentation'; 

interface PresentationContentProps {
  presentationData: PresentationData;
  activeSlideIndex: number;
  setActiveSlideIndex: (index: number) => void;
  selectedTemplate: Template | null;
  handleSlideChange: (index: number, slide: Slide) => void;
  handleSlideDelete: (index: number) => void;
  handleAddSlide: () => void;
  onOpenTemplates: () => void;
  onOpenPresentationManager: () => void;
  onSave: () => boolean;
  onExport: () => void;
  onGenerateMoreSlides: () => void;
  generateMoreLoading: boolean;
}

const PresentationContent = ({
  presentationData,
  activeSlideIndex,
  setActiveSlideIndex,
  selectedTemplate,
  handleSlideChange,
  handleSlideDelete,
  handleAddSlide,
  onOpenTemplates,
  onOpenPresentationManager,
  onSave,
  onExport,
  onGenerateMoreSlides,
  generateMoreLoading
}: PresentationContentProps) => {
  
  const getSimplifiedTemplate = (template: Template | null) => {
    if (!template) {
      return {
        id: 'minimal',
        name: 'Minimal',
        primaryColor: '#3b82f6',
        secondaryColor: '#f8fafc',
        fontFamily: 'Inter, sans-serif'
      };
    }
    
    return {
      id: template.id,
      name: template.name,
      primaryColor: template.primaryColor,
      secondaryColor: template.secondaryColor,
      fontFamily: template.fontFamily
    };
  };
  
  return (
    <main className="flex-grow pt-28 pb-16">
      <div className="container px-4 mx-auto">
        <PresentationHeader 
          title={presentationData.title}
          subtitle={presentationData.subtitle}
          onOpenTemplates={onOpenTemplates}
          onOpenPresentationManager={onOpenPresentationManager}
          onSave={onSave}
          onExport={onExport}
        />
        
        <SlideNavigation 
          slides={presentationData.slides}
          activeSlideIndex={activeSlideIndex}
          onSlideSelect={setActiveSlideIndex}
          onAddSlide={handleAddSlide}
          onGenerateMoreSlides={onGenerateMoreSlides}
          generateMoreLoading={generateMoreLoading}
        />
        
        <EditorContainer
          slide={presentationData.slides[activeSlideIndex]}
          slideIndex={activeSlideIndex}
          onSaveSlide={(updatedSlide) => handleSlideChange(activeSlideIndex, updatedSlide)}
          onDeleteSlide={handleSlideDelete}
          template={getSimplifiedTemplate(selectedTemplate)}
        />
      </div>
      
      <FloatingControls 
        onSave={onSave}
        onOpenTemplates={onOpenTemplates}
        onAddSlide={handleAddSlide}
      />
    </main>
  );
};

export default PresentationContent;
