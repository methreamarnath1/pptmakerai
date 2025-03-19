
import pptxgen from 'pptxgenjs';
import { extractBulletPoints, extractNumberedList } from './markdownParser';

/**
 * Adds text content to a slide based on content type
 */
export function addTextContent(
  pptxSlide: pptxgen.Slide, 
  content: string, 
  layoutName: string, 
  hasImage: boolean,
  fontFamily: string,
  textColor: string,
  textPosition: {
    x: number;
    y: number;
    w: number | string;
    h: number | string;
    fontSize?: number;
  }
) {  
  // Base font size depending on whether an image is present
  const baseFontSize = hasImage ? 14 : 16;
  
  // Process bullet points if present
  const bulletPoints = extractBulletPoints(content);
  if (bulletPoints.length > 0) {
    // Create properly formatted bullet points that comply with pptxgenjs API
    const bulletOpts = {
      x: textPosition.x,
      y: textPosition.y,
      w: typeof textPosition.w === 'string' ? 9 : textPosition.w,
      h: typeof textPosition.h === 'string' ? 0.5 : textPosition.h,
      fontSize: textPosition.fontSize || baseFontSize,
      color: textColor,
      fontFace: fontFamily,
      bullet: { type: 'bullet' }
    };
    
    // Add each bullet point as a separate text object with bullet formatting
    bulletPoints.forEach((point, idx) => {
      pptxSlide.addText(point, {
        ...bulletOpts,
        y: textPosition.y + (idx * 0.35),
        bullet: true
      });
    });
  } 
  // Process numbered lists if present
  else if (extractNumberedList(content).length > 0) {
    const numberedItems = extractNumberedList(content);
    
    // For numbered lists we add each line separately with numbers
    numberedItems.forEach((item, idx) => {
      pptxSlide.addText(`${idx + 1}. ${item}`, {
        x: textPosition.x,
        y: textPosition.y + (idx * 0.4),
        w: typeof textPosition.w === 'string' ? 9 : textPosition.w,
        h: 0.4,
        fontSize: textPosition.fontSize || baseFontSize,
        color: textColor,
        fontFace: fontFamily,
        align: 'left',
        valign: 'top'
      });
    });
  } 
  // Regular paragraph text
  else {
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
    
    if (paragraphs.length > 0) {
      // Add each paragraph with appropriate spacing
      paragraphs.forEach((para, idx) => {
        pptxSlide.addText(para, {
          x: textPosition.x,
          y: textPosition.y + (idx * 0.7),
          w: typeof textPosition.w === 'string' ? 9 : textPosition.w,
          h: 0.7,
          fontSize: textPosition.fontSize || baseFontSize,
          color: textColor,
          fontFace: fontFamily,
          align: 'left',
          valign: 'top',
          breakLine: true
        });
      });
    }
  }
}
