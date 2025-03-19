
import { Slide } from './exportTypes';
import { calculateTextDensity } from './textAnalysis';

/**
 * Determines the appropriate text layout based on the layout name, content length, and if image is present
 */
export function determineTextLayout(layoutName: string, contentLength: number, hasImage: boolean) {
  // Base positions
  const defaultLayout = {
    x: 0.5,
    y: 1.5,
    w: hasImage ? 5.5 : 9.0,
    h: 4.5,
    fontSize: 18
  };
  
  // Adjust based on content length
  if (contentLength > 1000) {
    defaultLayout.fontSize = 14;
  } else if (contentLength > 500) {
    defaultLayout.fontSize = 16;
  } else if (contentLength < 100) {
    defaultLayout.fontSize = 20;
  }
  
  // Adjust based on layout
  switch (layoutName) {
    case 'IMAGE_RIGHT':
      return {
        ...defaultLayout,
        w: 5.5
      };
    case 'IMAGE_LEFT':
      return {
        ...defaultLayout,
        x: 4.0,
        w: 5.5
      };
    case 'IMAGE_TOP':
      return {
        ...defaultLayout,
        y: 4.0,
        w: 9.0,
        h: 2.5
      };
    case 'IMAGE_BOTTOM':
      return {
        ...defaultLayout,
        w: 9.0,
        h: 2.5
      };
    case 'TEXT_ONLY':
    case 'BULLETS_ONLY':
      return {
        ...defaultLayout,
        w: 9.0,
        h: 4.5
      };
    default:
      return defaultLayout;
  }
}

/**
 * Determines the appropriate image layout based on the layout name, image URL, and content length
 */
export function determineImageLayout(layoutName: string, imageUrl: string, contentLength: number) {
  // Default image configuration
  const defaultImage = {
    path: imageUrl,
    x: 6.5,
    y: 1.8,
    w: 3.0,
    h: 3.6,
    sizing: {
      type: "contain",
      w: 3.0,
      h: 3.6
    }
  };
  
  // Adjust based on layout and content density
  const contentDensity = calculateTextDensity(contentLength);
  
  switch (layoutName) {
    case 'IMAGE_RIGHT':
      return defaultImage;
    case 'IMAGE_LEFT':
      return {
        ...defaultImage,
        x: 0.5
      };
    case 'IMAGE_TOP':
      return {
        ...defaultImage,
        x: 2.5,
        y: 1.5,
        w: 5.0,
        h: 2.3,
        sizing: {
          type: "contain",
          w: 5.0,
          h: 2.3
        }
      };
    case 'IMAGE_BOTTOM':
      return {
        ...defaultImage,
        x: 2.5,
        y: 4.2,
        w: 5.0,
        h: 2.3,
        sizing: {
          type: "contain",
          w: 5.0,
          h: 2.3
        }
      };
    default:
      return defaultImage;
  }
}

/**
 * Selects the most appropriate layout for a slide based on its content
 */
export function selectLayoutForSlide(slide: Slide, index: number): string {
  const hasImage = !!slide.imageUrl;
  const hasContent = slide.content && slide.content.trim().length > 0;
  const contentLength = slide.content ? slide.content.length : 0;
  
  // First slide is usually a title slide
  if (index === 0) {
    return hasImage ? 'IMAGE_RIGHT' : 'TITLE_SLIDE';
  }
  
  // For slides with images, select appropriate layout based on content length
  if (hasImage) {
    if (contentLength > 500) {
      // For long content, prefer text-focused layouts
      return 'IMAGE_RIGHT';
    } else if (contentLength > 200) {
      // For medium content, vary the layout
      return index % 2 === 0 ? 'IMAGE_LEFT' : 'IMAGE_RIGHT';
    } else {
      // For short content, use top/bottom image layouts
      return index % 2 === 0 ? 'IMAGE_TOP' : 'IMAGE_BOTTOM';
    }
  }
  
  // For text-only slides
  if (hasContent) {
    // Check if content contains bullet points
    const hasBullets = slide.content.includes('• ') || 
                       slide.content.includes('* ') || 
                       /^\d+\.\s/.test(slide.content);
    
    return hasBullets ? 'BULLETS_ONLY' : 'TEXT_ONLY';
  }
  
  // Default to text only
  return 'TEXT_ONLY';
}
