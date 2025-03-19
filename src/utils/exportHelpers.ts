
import { Slide } from './exportTypes';
import pptxgen from 'pptxgenjs';

/**
 * Template definitions for slide layouts with clear content zones
 */
export const SLIDE_LAYOUTS = {
  TITLE_SLIDE: {
    name: "TITLE_SLIDE",
    title: { x: 0.5, y: 0.5, w: 9.0, h: 1.0, fontSize: 44 },
    content: { x: 0.5, y: 2.0, w: 9.0, h: 3.5, fontSize: 24 },
    image: null
  },
  TEXT_ONLY: {
    name: "TEXT_ONLY",
    title: { x: 0.5, y: 0.5, w: 9.0, h: 1.0, fontSize: 40 },
    content: { x: 0.5, y: 2.0, w: 9.0, h: 4.0, fontSize: 20 },
    image: null
  },
  IMAGE_RIGHT: {
    name: "IMAGE_RIGHT",
    title: { x: 0.5, y: 0.5, w: 9.0, h: 1.0, fontSize: 40 },
    content: { x: 0.5, y: 2.0, w: 4.8, h: 4.0, fontSize: 20 },
    image: { x: 5.7, y: 2.0, w: 3.8, h: 3.5 }
  },
  IMAGE_LEFT: {
    name: "IMAGE_LEFT",
    title: { x: 0.5, y: 0.5, w: 9.0, h: 1.0, fontSize: 40 },
    content: { x: 4.7, y: 2.0, w: 4.8, h: 4.0, fontSize: 20 },
    image: { x: 0.5, y: 2.0, w: 3.8, h: 3.5 }
  },
  IMAGE_TOP: {
    name: "IMAGE_TOP",
    title: { x: 0.5, y: 0.5, w: 9.0, h: 0.8, fontSize: 36 },
    content: { x: 0.5, y: 4.3, w: 9.0, h: 2.5, fontSize: 18 },
    image: { x: 2.5, y: 1.5, w: 5.0, h: 2.5 }
  },
  IMAGE_BOTTOM: {
    name: "IMAGE_BOTTOM",
    title: { x: 0.5, y: 0.5, w: 9.0, h: 0.8, fontSize: 36 },
    content: { x: 0.5, y: 1.5, w: 9.0, h: 2.5, fontSize: 20 },
    image: { x: 2.5, y: 4.3, w: 5.0, h: 2.5 }
  },
  BULLETS_ONLY: {
    name: "BULLETS_ONLY",
    title: { x: 0.5, y: 0.5, w: 9.0, h: 1.0, fontSize: 40 },
    content: { x: 0.5, y: 2.0, w: 9.0, h: 4.0, fontSize: 20 },
    image: null
  }
};

/**
 * Intelligently selects the best layout for a slide based on its content
 */
export const selectLayoutForSlide = (slide: Slide, index: number): string => {
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
export const getLayoutConfig = (layoutName: string) => {
  return SLIDE_LAYOUTS[layoutName as keyof typeof SLIDE_LAYOUTS] || SLIDE_LAYOUTS.TEXT_ONLY;
};

/**
 * Determines the text layout based on the slide layout and other factors
 */
export const determineTextLayout = (layoutName: string, contentLength: number, hasImage: boolean) => {
  const config = getLayoutConfig(layoutName);
  
  // Adjust text positioning based on content length
  const textLayout = { ...config.content };
  
  if (hasImage) {
    // If there's an image and lots of content, reduce font size
    if (contentLength > 300) {
      textLayout.fontSize = Math.max(16, (textLayout.fontSize as number) - 2);
    }
  } else if (contentLength > 500) {
    // For text-only slides with lots of content, reduce font size
    textLayout.fontSize = Math.max(16, (textLayout.fontSize as number) - 2);
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
        type: "contain" as "contain" | "cover" | "crop", // Use type assertion to ensure correct type
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
      type: "contain" as "contain" | "cover" | "crop", // Use type assertion to ensure correct type
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

/**
 * Converts a hex color to RGB
 */
export const hexToRgb = (hex: string) => {
  // Default to black if invalid hex
  if (!hex || !/^#[0-9A-F]{6}$/i.test(hex)) {
    return { r: 0, g: 0, b: 0 };
  }

  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return { r, g, b };
};

/**
 * Converts a data URL to a Blob
 */
export const dataURLToBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
};

/**
 * Gets the appropriate slide shape for overlay
 */
export const getSlideShapeType = () => {
  return pptxgen.ShapeType.rect;
};

/**
 * Calculates the optimal text splitting for slides
 */
export const calculateTextDensity = (text: string): { density: number, bulletCount: number } => {
  if (!text) return { density: 0, bulletCount: 0 };
  
  const lines = text.split('\n');
  const bulletCount = lines.filter(line => line.trim().startsWith('- ') || line.trim().startsWith('* ')).length;
  
  // Calculate a density score based on text length and bullet points
  const density = text.length / 100 + (bulletCount * 1.5);
  
  return { 
    density,
    bulletCount
  };
};

/**
 * Formats text content as proper bullet points for PPT
 */
export const formatContentAsBullets = (content: string): any[] => {
  if (!content) return [];
  
  // Extract bullet points
  const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const bulletLines = lines.filter(line => line.startsWith('- ') || line.startsWith('* '));
  
  // If we have bullet points
  if (bulletLines.length > 0) {
    return bulletLines.map(line => {
      return { 
        text: line.replace(/^[*-]\s+/, ''),
        options: { bullet: true } 
      };
    });
  }
  
  // For regular paragraphs
  return lines.map(line => ({ text: line, options: {} }));
};

/**
 * Estimates if content needs to be split across multiple slides
 */
export const shouldSplitContent = (content: string): boolean => {
  if (!content) return false;
  
  const { density, bulletCount } = calculateTextDensity(content);
  
  // If density is too high, content should be split
  return density > 15 || bulletCount > 8;
};

/**
 * Split content into multiple slides if needed
 */
export const splitContentForMultipleSlides = (
  title: string, 
  content: string, 
  imageUrl?: string
): Slide[] => {
  if (!shouldSplitContent(content)) {
    return [{ title, content, imageUrl }];
  }
  
  const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const slides: Slide[] = [];
  let currentContent: string[] = [];
  let bulletCount = 0;
  
  // Process lines and create slides
  for (const line of lines) {
    const isBullet = line.startsWith('- ') || line.startsWith('* ');
    
    if (isBullet) bulletCount++;
    
    // If we've reached the threshold for a slide
    if (bulletCount > 6 || currentContent.join('\n').length > 800) {
      slides.push({
        title: slides.length === 0 ? title : `${title} (cont.)`,
        content: currentContent.join('\n'),
        imageUrl: slides.length === 0 ? imageUrl : undefined
      });
      
      currentContent = [];
      bulletCount = isBullet ? 1 : 0;
    }
    
    currentContent.push(line);
  }
  
  // Add the remaining content
  if (currentContent.length > 0) {
    slides.push({
      title: slides.length === 0 ? title : `${title} (cont.)`,
      content: currentContent.join('\n'),
      imageUrl: slides.length === 0 ? imageUrl : undefined
    });
  }
  
  return slides;
};
