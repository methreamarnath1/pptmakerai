
import { Textbox } from 'fabric';

// Apply markdown formatting to a Fabric.js textbox
export const applyMarkdownToTextbox = (textbox: Textbox, text: string) => {
  // Store the original properties
  const originalFontSize = textbox.fontSize || 24;
  const originalFontWeight = textbox.fontWeight || 'normal';
  const originalFontStyle = textbox.fontStyle || 'normal';
  
  // Process heading markdown
  if (text.startsWith('# ')) {
    textbox.set({
      text: text.substring(2), // Remove the markdown
      fontSize: originalFontSize * 1.5,
      fontWeight: 'bold'
    });
    return;
  } else if (text.startsWith('## ')) {
    textbox.set({
      text: text.substring(3),
      fontSize: originalFontSize * 1.3,
      fontWeight: 'bold'
    });
    return;
  } else if (text.startsWith('### ')) {
    textbox.set({
      text: text.substring(4),
      fontSize: originalFontSize * 1.15,
      fontWeight: 'bold'
    });
    return;
  }
  
  // Process bullet points
  if (text.includes('* ') || text.includes('• ')) {
    const lines = text.split('\n');
    const formattedLines = lines.map(line => {
      if (line.trim().startsWith('* ')) {
        return '• ' + line.trim().substring(2);
      }
      return line;
    });
    
    textbox.set({
      text: formattedLines.join('\n')
    });
  }
  
  // Bold text with **
  if (text.includes('**')) {
    // Find all bold sections and apply formatting
    const boldRegex = /\*\*(.*?)\*\*/g;
    const matches = text.match(boldRegex);
    
    if (matches) {
      let processedText = text;
      matches.forEach(match => {
        // Extract the text between ** marks
        const boldText = match.substring(2, match.length - 2);
        // Replace **text** with just text in the final output
        processedText = processedText.replace(match, boldText);
      });
      
      textbox.set({
        text: processedText,
        fontWeight: 'bold'
      });
      return;
    }
  }
  
  // Italic text with *
  if ((text.match(/\*/g) || []).length % 2 === 0 && text.includes('*')) {
    // Find all italic sections and apply formatting
    const italicRegex = /\*(.*?)\*/g;
    const matches = text.match(italicRegex);
    
    if (matches) {
      let processedText = text;
      matches.forEach(match => {
        // Extract the text between * marks
        const italicText = match.substring(1, match.length - 1);
        // Replace *text* with just text in the final output
        processedText = processedText.replace(match, italicText);
      });
      
      textbox.set({
        text: processedText,
        fontStyle: 'italic'
      });
    }
  }
};

// Helper function to clean markdown formatting for exports
export const cleanMarkdownForExport = (text: string): string => {
  if (!text) return '';
  
  let cleanedText = text;
  
  // Remove heading markdown
  if (cleanedText.startsWith('# ')) {
    cleanedText = cleanedText.substring(2);
  } else if (cleanedText.startsWith('## ')) {
    cleanedText = cleanedText.substring(3);
  } else if (cleanedText.startsWith('### ')) {
    cleanedText = cleanedText.substring(4);
  }
  
  // Replace bullet points with standard bullet characters
  const lines = cleanedText.split('\n');
  const formattedLines = lines.map(line => {
    if (line.trim().startsWith('* ')) {
      return '• ' + line.trim().substring(2);
    }
    return line;
  });
  cleanedText = formattedLines.join('\n');
  
  // Remove bold markdown (** **) keeping only the content
  cleanedText = cleanedText.replace(/\*\*(.*?)\*\*/g, '$1');
  
  // Remove italic markdown (* *) keeping only the content
  cleanedText = cleanedText.replace(/\*(.*?)\*/g, '$1');
  
  return cleanedText;
};

// Process text to extract list items with proper formatting
export const extractBulletPoints = (text: string): string[] => {
  if (!text) return [];
  
  const lines = text.split('\n');
  return lines
    .filter(line => line.trim().startsWith('• ') || line.trim().startsWith('* '))
    .map(line => {
      // Clean the bullet point format, keeping just the content
      return line.trim().replace(/^[•*]\s+/, '');
    });
};

// Process text to extract numbered list items
export const extractNumberedList = (text: string): string[] => {
  if (!text) return [];
  
  const lines = text.split('\n');
  return lines
    .filter(line => /^\d+\.\s/.test(line.trim()))
    .map(line => {
      // Remove the number prefix, keeping just the content
      return line.trim().replace(/^\d+\.\s+/, '');
    });
};

// Helper function to identify text formatting in content
export const getTextFormatting = (text: string) => {
  if (!text) return { isBold: false, isItalic: false };
  
  const isBold = text.includes('**');
  const isItalic = text.includes('*') && !isBold;
  
  return { isBold, isItalic };
};

// Parse markdown to create a structured document with sections
export const parseMarkdownStructure = (content: string) => {
  if (!content) return { sections: [] };
  
  const lines = content.split('\n');
  const sections = [];
  let currentSection = null;
  
  for (const line of lines) {
    // Check for headings (potential section starts)
    if (line.startsWith('# ')) {
      // Level 1 heading (major section)
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        title: line.substring(2),
        level: 1,
        content: [],
        bulletPoints: []
      };
    } else if (line.startsWith('## ')) {
      // Level 2 heading (subsection)
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        title: line.substring(3),
        level: 2,
        content: [],
        bulletPoints: []
      };
    } else if (line.startsWith('* ') || line.startsWith('• ')) {
      // Bullet point
      if (currentSection) {
        currentSection.bulletPoints.push(line.replace(/^[•*]\s+/, ''));
      }
    } else if (line.trim() !== '') {
      // Regular content
      if (currentSection) {
        currentSection.content.push(line);
      } else {
        // Create a default section if none exists
        currentSection = {
          title: '',
          level: 0,
          content: [line],
          bulletPoints: []
        };
      }
    }
  }
  
  // Don't forget to add the last section
  if (currentSection) {
    sections.push(currentSection);
  }
  
  return { sections };
};
