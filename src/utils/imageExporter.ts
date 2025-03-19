
import { saveAs } from 'file-saver';
import { toast } from 'sonner';
import { dataURLToBlob, hexToRgb } from './exportHelpers';
import { Slide } from './exportTypes';
import { cleanMarkdownForExport } from './markdownParser';

export const exportToImages = async (
  slides: Slide[], 
  title: string,
  template: any | null,
  theme: string
): Promise<boolean> => {
  try {
    if (!slides || slides.length === 0) {
      toast.error('No slides to export');
      return false;
    }
    
    const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      
      const cleanTitle = cleanMarkdownForExport(slide.title);
      const cleanContent = cleanMarkdownForExport(slide.content);
      
      const canvas = document.createElement('canvas');
      canvas.width = 1280;
      canvas.height = 720;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        toast.error('Could not create canvas context');
        return false;
      }
      
      const bgColor = slide.backgroundColor || (template ? template.secondaryColor : '#f8fafc');
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const titleColor = template ? template.primaryColor : '#3b82f6';
      ctx.fillStyle = titleColor;
      ctx.font = 'bold 48px Arial';
      ctx.fillText(cleanTitle, 50, 100);
      
      const contentColor = theme === 'dark' ? '#FFFFFF' : '#333333';
      ctx.fillStyle = contentColor;
      ctx.font = '32px Arial';
      
      // Improved text positioning with image awareness
      let textAreaWidth = canvas.width - 100;
      let textStartX = 50;
      
      // If slide has an image, adjust text area width
      if (slide.imageUrl) {
        textAreaWidth = (canvas.width / 2) - 75;
      }
      
      const words = cleanContent.split(' ');
      let line = '';
      let y = 180;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > textAreaWidth && n > 0) {
          ctx.fillText(line, textStartX, y);
          line = words[n] + ' ';
          y += 40;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, textStartX, y);
      
      if (slide.imageUrl) {
        try {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = slide.imageUrl!;
          });
          
          // Adjust image size and position based on content length
          const contentLines = y / 40; // Approximate number of content lines
          let imgWidth = 400;
          let imgX = canvas.width - imgWidth - 50;
          
          // Reduce image size if content is long
          if (contentLines > 8) {
            imgWidth = 350;
            imgX = canvas.width - imgWidth - 40;
          }
          
          const imgHeight = (img.height / img.width) * imgWidth;
          ctx.drawImage(img, imgX, 180, imgWidth, imgHeight);
        } catch (error) {
          console.error('Error adding image to canvas:', error);
        }
      }
      
      const fileName = `${safeTitle || 'presentation'}_slide_${i + 1}.png`;
      const dataUrl = canvas.toDataURL('image/png');
      const blob = dataURLToBlob(dataUrl);
      saveAs(blob, fileName);
      
      if (i < slides.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    return true;
  } catch (error) {
    console.error('Error exporting to images:', error);
    toast.error('Failed to export presentation as images');
    return false;
  }
};
