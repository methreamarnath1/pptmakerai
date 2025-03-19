
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '../Header';
import usePresentationManager from './usePresentationManager';
import usePresentationAI from '../../hooks/usePresentationAI';
import EditorLoader from './EditorLoader';
import PresentationContent from './PresentationContent';
import PresentationEmpty from './PresentationEmpty';
import PresentationManagerUI from './PresentationManagerUI';
import PresentationModals from './PresentationModals';
import { Template } from '../PresentationTemplates';

const PresentationContainer = () => {
  const navigate = useNavigate();
  
  // Use the refactored hooks
  const {
    presentationData,
    setPresentationData,
    loading,
    showPresentationManager,
    setShowPresentationManager,
    loadPresentation,
    savePresentation,
    updatePresentation,
    updateSlide,
    addSlide,
    deleteSlide
  } = usePresentationManager();
  
  // Component state
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('minimal');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showExportOptions, setShowExportOptions] = useState(false);
  
  // Handle AI-generated slides
  const onSlidesGenerated = (slides: any[]) => {
    if (!presentationData) return;
    
    const updatedPresentation = {
      ...presentationData,
      slides: [...presentationData.slides, ...slides],
      updatedAt: new Date().toISOString()
    };
    
    setPresentationData(updatedPresentation);
    
    localStorage.setItem(`presentation_${presentationData.id}`, JSON.stringify(updatedPresentation));
  };
  
  const {
    generateMoreLoading,
    handleGenerateMoreSlides
  } = usePresentationAI(presentationData, onSlidesGenerated);
  
  // Set template ID when presentation data changes
  useEffect(() => {
    if (presentationData) {
      setSelectedTemplateId(presentationData.templateId || 'minimal');
    }
  }, [presentationData]);
  
  const handleCreateNew = () => {
    navigate('/create');
  };
  
  const handleSelectTemplate = (template: Template) => {
    if (!presentationData) return;
    
    setSelectedTemplateId(template.id);
    setSelectedTemplate(template);
    setShowTemplates(false);
    
    updatePresentation({
      templateId: template.id
    });
    
    toast.success(`Template '${template.name}' applied successfully`);
  };
  
  const handleSlideChange = (index: number, updatedSlide: any) => {
    updateSlide(index, updatedSlide);
  };
  
  const handleSlideDelete = (index: number) => {
    const updated = deleteSlide(index);
    
    if (updated && activeSlideIndex >= updated.slides.length) {
      setActiveSlideIndex(updated.slides.length - 1);
    }
  };
  
  const handleAddSlide = () => {
    if (!presentationData) return;
    
    const newSlide = {
      title: 'New Slide',
      content: 'Add your content here...',
    };
    
    const updated = addSlide(newSlide);
    
    if (updated) {
      setActiveSlideIndex(updated.slides.length - 1);
    }
  };
  
  if (loading) {
    return <EditorLoader />;
  }
  
  if (showPresentationManager) {
    return (
      <PresentationManagerUI
        onSelectPresentation={loadPresentation}
        onCreateNew={handleCreateNew}
      />
    );
  }
  
  if (!presentationData) {
    return <PresentationEmpty onCreateNew={() => navigate('/create')} />;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <PresentationContent
        presentationData={presentationData}
        activeSlideIndex={activeSlideIndex}
        setActiveSlideIndex={setActiveSlideIndex}
        selectedTemplate={selectedTemplate}
        handleSlideChange={handleSlideChange}
        handleSlideDelete={handleSlideDelete}
        handleAddSlide={handleAddSlide}
        onOpenTemplates={() => setShowTemplates(true)}
        onOpenPresentationManager={() => setShowPresentationManager(true)}
        onSave={savePresentation}
        onExport={() => setShowExportOptions(true)}
        onGenerateMoreSlides={handleGenerateMoreSlides}
        generateMoreLoading={generateMoreLoading}
      />
      
      <PresentationModals
        showTemplates={showTemplates}
        setShowTemplates={setShowTemplates}
        showExportOptions={showExportOptions}
        setShowExportOptions={setShowExportOptions}
        selectedTemplateId={selectedTemplateId}
        selectedTemplate={selectedTemplate}
        presentationData={presentationData}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
};

export default PresentationContainer;
