
import { SlideTemplate } from './exportTypes';
import { slideLayouts } from './slideLayouts';

/**
 * Intelligently selects the best layout for a slide based on its content
 */
export const selectLayoutForSlide = (slide: any, index: number): string => {
  if (!slide.content && slide.title) return "TITLE_SLIDE";
  
  // Choose layout based on content length and presence of image
  if (slide.imageUrl) {
    const contentLength = slide.content ? slide.content.length : 0;
    const hasBullets = slide.content && (slide.content.includes('- ') || slide.content.includes('* '));
    
    // For longer content with bullets, place image where it fits best
    if (contentLength > 500 || hasBullets) {
      if (index % 2 === 0) return 'IMAGE_RIGHT';
      return 'IMAGE_LEFT';
    }
    
    // For shorter content, vary layout for visual interest
    if (index % 3 === 0) return 'IMAGE_RIGHT';
    if (index % 3 === 1) return 'IMAGE_LEFT';
    if (index % 3 === 2) {
      // If content is very short, image can go on top, otherwise bottom
      return contentLength < 200 ? 'IMAGE_TOP' : 'IMAGE_BOTTOM';
    }
  }
  
  // For text-only slides, check for bullet points
  if (slide.content && !slide.imageUrl) {
    if (slide.content.includes('- ') || slide.content.includes('* ')) {
      return 'BULLETS_ONLY';
    }
    return 'TEXT_ONLY';
  }
  
  return 'TEXT_ONLY';
};

/**
 * Returns a layout configuration based on the layout name
 */
export const getLayoutConfig = (layoutName: string): SlideTemplate => {
  return slideLayouts[layoutName] || slideLayouts.TEXT_ONLY;
};

/**
 * Determines the text layout based on the slide layout and other factors
 */
export const determineTextLayout = (layoutName: string, contentLength: number, hasImage: boolean) => {
  const config = getLayoutConfig(layoutName);
  
  // Adjust text positioning based on content length
  const textLayout = { ...config.content };
  
  if (hasImage) {
    // Reduced font size for slides with images (as requested)
    textLayout.fontSize = 14;  // Set to 14 when image is present
    
    // For very long content with images, reduce further
    if (contentLength > 300) {
      textLayout.fontSize = 12;  // Reduce to 12 for longer content
    }
  } else {
    // For text-only slides, use a default of 16
    textLayout.fontSize = 16;
    
    // For very long content, reduce slightly
    if (contentLength > 500) {
      textLayout.fontSize = 14;
    }
  }
  
  return textLayout;
};

/**
 * Determines the image layout based on the slide layout and image dimensions
 */
export const determineImageLayout = (layoutName: string, imageUrl: string, contentLength: number = 0) => {
  const config = getLayoutConfig(layoutName);
  
  if (!config.image) {
    // Default if layout doesn't define image position
    return {
      path: imageUrl,
      x: 6.0,
      y: 2.0,
      w: 4.0,
      h: 3.0,
      sizing: {
        type: "contain" as "contain" | "cover" | "crop",
        w: 4.0,
        h: 3.0
      }
    };
  }
  
  // Create a copy to avoid modifying the original
  const imageLayout = {
    path: imageUrl,
    x: config.image.x,
    y: config.image.y,
    w: config.image.w,
    h: config.image.h,
    sizing: {
      type: "contain" as "contain" | "cover" | "crop",
      w: config.image.w,
      h: config.image.h
    }
  };
  
  // Adjust image size based on content length
  if (contentLength > 500) {
    // For lots of text, make the image slightly smaller
    imageLayout.w = imageLayout.w * 0.9;
    imageLayout.h = imageLayout.h * 0.9;
    imageLayout.sizing.w = imageLayout.w;
    imageLayout.sizing.h = imageLayout.h;
  }
  
  return imageLayout;
};
