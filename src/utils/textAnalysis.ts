/**
 * Calculates the text density to help determine layout decisions
 */
export function calculateTextDensity(contentLength: number): 'low' | 'medium' | 'high' {
  if (contentLength < 150) return 'low';
  if (contentLength < 350) return 'medium';
  return 'high';
}

/**
 * Formats content as bullet points if not already formatted
 */
export function formatContentAsBullets(content: string): string {
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
 * Splits content across multiple slides if it exceeds a certain length
 */
export function splitContentForMultipleSlides(
  title: string,
  content: string,
  imageUrl?: string
): Array<{ title: string; content: string; imageUrl?: string }> {
  if (!content || content.length < 500) {
    return [{ title, content, imageUrl }];
  }
  
  // Extract bullet points or paragraphs
  const bulletPoints = content.includes('• ') || content.includes('* ') || /^\d+\.\s/.test(content);
  
  if (bulletPoints) {
    // Split by bullet points
    const points = content
      .split('\n')
      .filter(line => line.trim().length > 0);
    
    // If not too many points, keep on one slide
    if (points.length <= 6) {
      return [{ title, content, imageUrl }];
    }
    
    // Otherwise split into multiple slides with 5-6 points each
    const slides = [];
    for (let i = 0; i < points.length; i += 5) {
      const slidePoints = points.slice(i, i + 5);
      slides.push({
        title: i === 0 ? title : `${title} (cont.)`,
        content: slidePoints.join('\n'),
        imageUrl: i === 0 ? imageUrl : undefined
      });
    }
    
    return slides;
  } else {
    // Split by paragraphs for regular text
    const paragraphs = content
      .split('\n\n')
      .filter(para => para.trim().length > 0);
    
    if (paragraphs.length === 1 || content.length < 800) {
      return [{ title, content, imageUrl }];
    }
    
    // Split by paragraphs, approximately 2-3 paragraphs per slide
    const slides = [];
    let currentContent = '';
    let currentLength = 0;
    const maxLength = 500;
    
    for (let i = 0; i < paragraphs.length; i++) {
      if (currentLength + paragraphs[i].length > maxLength && currentContent) {
        // Add current content as a slide and reset
        slides.push({
          title: slides.length === 0 ? title : `${title} (cont.)`,
          content: currentContent,
          imageUrl: slides.length === 0 ? imageUrl : undefined
        });
        currentContent = paragraphs[i];
        currentLength = paragraphs[i].length;
      } else {
        // Add to current content
        currentContent += (currentContent ? '\n\n' : '') + paragraphs[i];
        currentLength += paragraphs[i].length;
      }
    }
    
    // Add any remaining content
    if (currentContent) {
      slides.push({
        title: slides.length === 0 ? title : `${title} (cont.)`,
        content: currentContent,
        imageUrl: slides.length === 0 ? imageUrl : undefined
      });
    }
    
    return slides;
  }
}
