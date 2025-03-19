import pptxgen from 'pptxgenjs';
import { toast } from 'sonner';
import { Slide, ExportLayoutOptions } from './exportTypes';
import { hexToRgb } from './imageUtils';
import { 
  determineImageLayout, 
  determineTextLayout, 
  selectLayoutForSlide 
} from './layoutUtils';
import { getLayoutConfig } from './slideLayouts';
import { 
  splitContentForMultipleSlides
} from './contentProcessing';
import { 
  createMasterSlides,
  addBackgroundOverlay
} from './masterSlideUtils';
import { 
  addTextContent 
} from './slideContentUtils';
import { cleanMarkdownForExport } from './markdownParser';

export const exportToPowerPoint = async (
  slides: Slide[],
  title: string,
  template: any | null,
  theme: string,
  layoutPreference: string = 'auto'
): Promise<boolean> => {
  try {
    if (!slides || slides.length === 0) {
      toast.error('No slides to export');
      return false;
    }

    const pptx = new pptxgen();
    
    pptx.title = title;
    pptx.subject = "Created with SlideDeck";
    pptx.author = "SlideDeck User";
    
    const primaryColor = template?.primaryColor || "#3b82f6";
    const secondaryColor = template?.secondaryColor || "#f8fafc";
    const fontFamily = template?.fontFamily || "Arial";
    const textColor = theme === 'dark' ? '#FFFFFF' : '#333333';
    
    createMasterSlides(pptx, primaryColor, secondaryColor, fontFamily);
    
    // Process slides, potentially splitting content if needed
    let processedSlides: Slide[] = [];
    if (layoutPreference === 'auto') {
      // If using auto layout, analyze and potentially split slides
      slides.forEach(slide => {
        const cleanContent = cleanMarkdownForExport(slide.content);
        const splitSlides = splitContentForMultipleSlides(
          slide.title,
          cleanContent,
          slide.imageUrl
        );
        processedSlides = [...processedSlides, ...splitSlides];
      });
    } else {
      // Otherwise just use the original slides
      processedSlides = slides;
    }
    
    processedSlides.forEach((slide, index) => {
      const actualLayoutName = layoutPreference === 'auto' 
        ? selectLayoutForSlide(slide, index)
        : layoutPreference;
      
      const layoutConfig = getLayoutConfig(actualLayoutName);
      const pptxSlide = pptx.addSlide({ 
        masterName: "MASTER_SLIDE", 
        sectionTitle: "Section " + Math.floor(index/3 + 1) 
      });
      
      const cleanTitle = cleanMarkdownForExport(slide.title);
      const cleanContent = cleanMarkdownForExport(slide.content);
      
      // Handle background
      if (slide.backgroundImage) {
        try {
          pptxSlide.background = { 
            path: slide.backgroundImage
          };
          
          addBackgroundOverlay(pptxSlide);
        } catch (error) {
          console.error("Error setting background image:", error);
          pptxSlide.background = { color: slide.backgroundColor || secondaryColor };
        }
      } else {
        pptxSlide.background = { color: slide.backgroundColor || secondaryColor };
      }
      
      // Add slide title
      pptxSlide.addText(cleanTitle, {
        x: layoutConfig.title.x,
        y: layoutConfig.title.y,
        w: layoutConfig.title.w,
        h: layoutConfig.title.h,
        fontFace: fontFamily,
        fontSize: layoutConfig.title.fontSize || 36,
        color: primaryColor,
        bold: true,
        align: 'left',
        wrap: true
      });
      
      // Add slide content
      if (cleanContent) {
        const contentLength = cleanContent.length;
        const textPosition = determineTextLayout(actualLayoutName, contentLength, !!slide.imageUrl);
        
        addTextContent(
          pptxSlide, 
          cleanContent, 
          actualLayoutName, 
          !!slide.imageUrl,
          fontFamily,
          textColor,
          textPosition
        );
      }
      
      // Add image if present
      if (slide.imageUrl) {
        const contentLength = cleanContent ? cleanContent.length : 0;
        const imageConfig = determineImageLayout(actualLayoutName, slide.imageUrl, contentLength);
        
        pptxSlide.addImage({
          path: slide.imageUrl,
          x: imageConfig.x,
          y: imageConfig.y,
          w: imageConfig.w,
          h: imageConfig.h,
          sizing: {
            type: "contain", // Fixed to use a specific allowed value
            w: imageConfig.w,
            h: imageConfig.h
          }
        });
      }
      
      // Add footer with slide number
      pptxSlide.addText(`${title} | Slide ${index + 1}`, {
        x: 0.5,
        y: 6.8,
        w: 9.0,
        h: 0.3,
        fontSize: 10,
        color: primaryColor,
        align: 'center'
      });
      
      // Add background image credit if present
      if (slide.backgroundImageCredit) {
        pptxSlide.addText(`Image: ${slide.backgroundImageCredit.name}`, {
          x: 0.5,
          y: 7.0,
          w: 4.0,
          h: 0.3,
          fontSize: 8,
          color: '#FFFFFF',
          align: 'left'
        });
      }
    });
    
    const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    await pptx.writeFile({ fileName: `${safeTitle || 'presentation'}.pptx` });
    
    toast.success('PowerPoint export complete!');
    return true;
  } catch (error) {
    console.error('Error exporting to PowerPoint:', error);
    toast.error('Failed to export presentation as PowerPoint');
    return false;
  }
};
