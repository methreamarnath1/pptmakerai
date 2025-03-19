
import { 
  Bold, 
  Italic, 
  Underline,
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List, 
  ListOrdered,
  Heading1,
  Heading2,
  Heading
} from 'lucide-react';
import { Canvas, Textbox } from 'fabric';
import { useState } from 'react';

interface TextFormattingProps {
  canvas: Canvas | null;
  activeObject: any;
}

const TextFormatting = ({ canvas, activeObject }: TextFormattingProps) => {
  const isTextObject = activeObject && activeObject.type === 'textbox';
  const [markdownMode, setMarkdownMode] = useState(false);
  
  const applyTextFormat = (formatType: string, value?: any) => {
    if (!canvas || !isTextObject) return;
    
    const text = activeObject as Textbox;
    
    switch (formatType) {
      case 'bold':
        text.set('fontWeight', text.fontWeight === 'bold' ? 'normal' : 'bold');
        break;
      case 'italic':
        text.set('fontStyle', text.fontStyle === 'italic' ? 'normal' : 'italic');
        break;
      case 'underline':
        text.set('underline', !text.underline);
        break;
      case 'align':
        text.set('textAlign', value);
        break;
      case 'bullet':
        insertBulletList();
        break;
      case 'numbered':
        insertNumberedList();
        break;
      case 'size':
        text.set('fontSize', parseInt(value));
        break;
      case 'heading1':
        applyHeading(32, 'bold');
        break;
      case 'heading2':
        applyHeading(28, 'bold');
        break;
      case 'heading3':
        applyHeading(24, 'bold');
        break;
    }
    
    canvas.renderAll();
  };
  
  const applyHeading = (size: number, weight: string = 'bold') => {
    if (!canvas || !isTextObject) return;
    
    const text = activeObject as Textbox;
    
    // If in markdown mode, prefix with # characters
    if (markdownMode) {
      let currentText = text.text || '';
      if (size === 32) {
        if (!currentText.startsWith('# ')) {
          text.set('text', `# ${currentText}`);
        }
      } else if (size === 28) {
        if (!currentText.startsWith('## ')) {
          text.set('text', `## ${currentText}`);
        }
      } else if (size === 24) {
        if (!currentText.startsWith('### ')) {
          text.set('text', `### ${currentText}`);
        }
      }
    } else {
      text.set({
        fontSize: size,
        fontWeight: weight
      });
    }
  };
  
  const insertBulletList = () => {
    if (!canvas || !isTextObject) return;
    
    const text = activeObject as Textbox;
    const currentText = text.text || '';
    
    // Format selected text as bullet points
    const lines = currentText.split('\n');
    const formattedLines = lines.map(line => {
      // Check if already has bullet or numbered format
      if (line.trim().startsWith('• ') || /^\d+\.\s/.test(line) || line.trim().startsWith('* ')) {
        return line;
      }
      return `• ${line.trim()}`;
    });
    
    text.set('text', formattedLines.join('\n'));
    canvas.renderAll();
  };
  
  const insertNumberedList = () => {
    if (!canvas || !isTextObject) return;
    
    const text = activeObject as Textbox;
    const currentText = text.text || '';
    
    // Format selected text as numbered list
    const lines = currentText.split('\n');
    const formattedLines = lines.map((line, index) => {
      // Check if already has bullet or numbered format
      if (line.trim().startsWith('• ') || /^\d+\.\s/.test(line) || line.trim().startsWith('* ')) {
        return line;
      }
      return `${index + 1}. ${line.trim()}`;
    });
    
    text.set('text', formattedLines.join('\n'));
    canvas.renderAll();
  };
  
  const parseMarkdown = () => {
    if (!canvas || !isTextObject || !markdownMode) return;
    
    const text = activeObject as Textbox;
    const currentText = text.text || '';
    
    // Process each line
    const lines = currentText.split('\n');
    let formattedText = '';
    
    lines.forEach(line => {
      // Heading 1
      if (line.startsWith('# ')) {
        const headingContent = line.substring(2);
        text.set({
          fontSize: 32,
          fontWeight: 'bold'
        });
        formattedText += headingContent + '\n';
      }
      // Heading 2
      else if (line.startsWith('## ')) {
        const headingContent = line.substring(3);
        text.set({
          fontSize: 28,
          fontWeight: 'bold'
        });
        formattedText += headingContent + '\n';
      }
      // Heading 3
      else if (line.startsWith('### ')) {
        const headingContent = line.substring(4);
        text.set({
          fontSize: 24,
          fontWeight: 'bold'
        });
        formattedText += headingContent + '\n';
      }
      // Bold text - basic handling
      else if (line.includes('**') || line.includes('***')) {
        let processed = line;
        
        // Bold
        while (processed.includes('**')) {
          const start = processed.indexOf('**');
          const end = processed.indexOf('**', start + 2);
          
          if (start !== -1 && end !== -1) {
            const boldText = processed.substring(start + 2, end);
            processed = processed.substring(0, start) + boldText + processed.substring(end + 2);
            
            // Apply bold formatting
            text.set('fontWeight', 'bold');
          } else {
            break;
          }
        }
        
        formattedText += processed + '\n';
      }
      // Bullet points
      else if (line.startsWith('* ') || line.startsWith('- ')) {
        const content = line.substring(2);
        formattedText += '• ' + content + '\n';
      }
      // Numbered list (simple detection)
      else if (/^\d+\.\s/.test(line)) {
        formattedText += line + '\n';
      }
      // Normal text
      else {
        formattedText += line + '\n';
      }
    });
    
    // Set the cleaned text
    text.set('text', formattedText.trim());
    canvas.renderAll();
  };
  
  const toggleMarkdownMode = () => {
    setMarkdownMode(!markdownMode);
    if (!markdownMode) {
      parseMarkdown();
    }
  };
  
  return (
    <div className={`p-4 border border-gray-200 dark:border-gray-700 rounded-lg ${!isTextObject ? 'opacity-50 pointer-events-none' : ''}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium">Text Formatting</h3>
        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <span className="text-xs mr-2">Markdown</span>
            <input
              type="checkbox"
              checked={markdownMode}
              onChange={toggleMarkdownMode}
              className="sr-only peer"
            />
            <div className="relative w-8 h-4 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        <button
          onClick={() => applyTextFormat('bold')}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isTextObject && activeObject.fontWeight === 'bold' ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        
        <button
          onClick={() => applyTextFormat('italic')}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isTextObject && activeObject.fontStyle === 'italic' ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        
        <button
          onClick={() => applyTextFormat('underline')}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isTextObject && activeObject.underline ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
          title="Underline"
        >
          <Underline size={16} />
        </button>
        
        <button
          onClick={() => applyTextFormat('align', 'left')}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isTextObject && activeObject.textAlign === 'left' ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </button>
        
        <button
          onClick={() => applyTextFormat('align', 'center')}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isTextObject && activeObject.textAlign === 'center' ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </button>
        
        <button
          onClick={() => applyTextFormat('align', 'right')}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isTextObject && activeObject.textAlign === 'right' ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
          title="Align Right"
        >
          <AlignRight size={16} />
        </button>
        
        <button
          onClick={() => applyTextFormat('bullet')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Bullet List"
        >
          <List size={16} />
        </button>
        
        <button
          onClick={() => applyTextFormat('numbered')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
        
        <button
          onClick={() => applyTextFormat('heading1')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Heading 1"
        >
          <Heading1 size={16} />
        </button>
        
        <button
          onClick={() => applyTextFormat('heading2')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Heading 2"
        >
          <Heading2 size={16} />
        </button>
        
        <button
          onClick={() => applyTextFormat('heading3')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Heading 3"
        >
          <Heading size={16} />
        </button>
      </div>
      
      <div className="mt-3">
        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Font Size</label>
        <select 
          className="w-full p-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm"
          value={isTextObject ? activeObject.fontSize : ''}
          onChange={(e) => applyTextFormat('size', e.target.value)}
          disabled={!isTextObject}
        >
          {[12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 56, 64, 72].map(size => (
            <option key={size} value={size}>{size}px</option>
          ))}
        </select>
      </div>
      
      {markdownMode && (
        <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs text-gray-500 dark:text-gray-400">
          <p className="mb-1">Markdown Supported:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li># Heading 1</li>
            <li>## Heading 2</li>
            <li>### Heading 3</li>
            <li>**Bold Text**</li>
            <li>* Bullet point</li>
            <li>1. Numbered list</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TextFormatting;
