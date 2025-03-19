import { Slide } from './exportTypes';

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
 * Calculates a text density value (low, medium, high)
 */
export function calculateTextDensityLevel(contentLength: number): 'low' | 'medium' | 'high' {
  if (contentLength < 150) return 'low';
  if (contentLength < 350) return 'medium';
  return 'high';
}

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
 * Formats content as bullet points if not already formatted
 */
export function formatContentAsBulletString(content: string): string {
  if (!content) return '';
  
  // If content already has bullet formatting, return as is
  if (content.includes('• ') || content.includes('* ') || /^\d+\.\s/.test(content)) {
    return content;
  }
  
  // Otherwise format as bullet points
  return content
    .split('\n')
    .filter(line => line.trim().length > 0)
    .map(line => `• ${line.trim()}`)
    .join('\n');
}

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
