
import { Canvas } from 'fabric';
import { toast } from 'sonner';
import { createBarChart } from '../../utils/fabricUtils';

interface CanvasOperationsProps {
  canvas: Canvas | null;
  activeObject: any | null;
  history: string[];
  historyIndex: number;
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setActiveObject: React.Dispatch<React.SetStateAction<any | null>>;
  theme: string;
  template: {
    primaryColor: string;
    fontFamily: string;
  };
}

const CanvasOperations = ({
  canvas,
  activeObject,
  history,
  historyIndex,
  setHistory,
  setHistoryIndex,
  setActiveObject,
  theme,
  template
}: CanvasOperationsProps) => {
  const saveToHistory = (canvas: Canvas) => {
    if (!canvas) return;
    
    const json = JSON.stringify(canvas.toJSON());
    
    setHistory(prev => {
      const newHistory = [...prev.slice(0, historyIndex + 1), json];
      setHistoryIndex(newHistory.length - 1);
      return newHistory;
    });
  };
  
  const handleUndo = () => {
    if (!canvas || historyIndex <= 0) return;
    
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    
    const json = JSON.parse(history[newIndex]);
    canvas.loadFromJSON(json, () => {
      canvas.renderAll();
    });
  };
  
  const handleRedo = () => {
    if (!canvas || historyIndex >= history.length - 1) return;
    
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    
    const json = JSON.parse(history[newIndex]);
    canvas.loadFromJSON(json, () => {
      canvas.renderAll();
    });
  };
  
  const addText = () => {
    if (!canvas) return;
    
    const { Textbox } = require('fabric');
    
    const text = new Textbox('Double-click to edit', {
      left: 100,
      top: 100,
      fontFamily: template.fontFamily,
      fontSize: 24,
      fill: theme === 'dark' ? '#FFFFFF' : '#333333',
      width: 300,
      selectable: true
    });
    
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    saveToHistory(canvas);
  };
  
  const deleteObject = () => {
    if (!canvas || !activeObject) return;
    
    canvas.remove(activeObject);
    canvas.renderAll();
    saveToHistory(canvas);
    setActiveObject(null);
  };
  
  const duplicateObject = () => {
    if (!canvas || !activeObject) return;
    
    activeObject.clone((clonedObj: any) => {
      if (clonedObj.left !== undefined && clonedObj.top !== undefined) {
        clonedObj.set({
          left: clonedObj.left + 20,
          top: clonedObj.top + 20
        });
      }
      
      canvas.add(clonedObj);
      canvas.setActiveObject(clonedObj);
      canvas.renderAll();
      saveToHistory(canvas);
    });
  };
  
  const bringToFront = () => {
    if (!canvas || !activeObject) return;
    
    activeObject.bringToFront();
    canvas.renderAll();
    saveToHistory(canvas);
  };
  
  const sendToBack = () => {
    if (!canvas || !activeObject) return;
    
    activeObject.sendToBack();
    canvas.renderAll();
    saveToHistory(canvas);
  };
  
  const addBarChart = () => {
    if (!canvas) return;
    
    const data = [150, 80, 120, 60];
    
    createBarChart(canvas, data, {
      left: 100,
      top: 100,
      title: 'Sample Chart',
      barColors: [template.primaryColor, '#34a853', '#fbbc05', '#ea4335'],
      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f8f9fa',
      textColor: theme === 'dark' ? '#FFFFFF' : '#333333',
    });
    
    saveToHistory(canvas);
    toast.success('Chart added to slide');
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const imgUrl = event.target?.result as string;
      
      const { Image: FabricImage } = require('fabric');
      
      FabricImage.fromURL(imgUrl, {
        crossOrigin: 'anonymous',
        objectCaching: true,
      }, (img: any) => {
        const maxWidth = 300;
        const scale = maxWidth / (img.width || 1);
        
        img.set({
          left: 100,
          top: 100,
          scaleX: scale,
          scaleY: scale,
          selectable: true
        });
        
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        saveToHistory(canvas);
      });
    };
    
    reader.readAsDataURL(file);
  };

  const handleSelectUnsplashImage = (imageUrl: string, credit: { name: string, url: string }) => {
    if (!canvas) return;
    
    const { Image: FabricImage } = require('fabric');

    FabricImage.fromURL(imageUrl, {
      crossOrigin: 'anonymous',
      objectCaching: true,
    }, (img: any) => {
      const maxWidth = 300;
      const scale = maxWidth / (img.width || 1);
      
      img.set({
        left: 100,
        top: 100,
        scaleX: scale,
        scaleY: scale,
        selectable: true
      });
      
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
      saveToHistory(canvas);
      
      toast.success('Unsplash image added to slide', {
        description: `Photo by ${credit.name}`,
      });
    });
  };

  return {
    saveToHistory,
    handleUndo,
    handleRedo,
    addText,
    deleteObject,
    duplicateObject,
    bringToFront,
    sendToBack,
    addBarChart,
    handleImageUpload,
    handleSelectUnsplashImage
  };
};

export default CanvasOperations;
