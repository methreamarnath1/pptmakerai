
import { Save, Download, LayoutTemplate, List } from 'lucide-react';

interface PresentationHeaderProps {
  title: string;
  subtitle?: string;
  onOpenTemplates: () => void;
  onOpenPresentationManager: () => void;
  onSave: () => void;
  onExport: () => void;
}

const PresentationHeader = ({
  title,
  subtitle,
  onOpenTemplates,
  onOpenPresentationManager,
  onSave,
  onExport
}: PresentationHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold">
          {title}
        </h1>
        {subtitle && (
          <p className="text-foreground/70">{subtitle}</p>
        )}
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        <button 
          onClick={onOpenPresentationManager}
          className="btn-secondary text-sm py-2 px-4 inline-flex items-center"
        >
          <List size={16} className="mr-2" />
          My Presentations
        </button>
        
        <button 
          onClick={onOpenTemplates}
          className="btn-secondary text-sm py-2 px-4 inline-flex items-center"
        >
          <LayoutTemplate size={16} className="mr-2" />
          Templates
        </button>
        
        <button 
          onClick={onSave}
          className="btn-secondary text-sm py-2 px-4 inline-flex items-center bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
        >
          <Save size={16} className="mr-2" />
          Save
        </button>
        
        <button 
          onClick={onExport}
          className="btn-primary text-sm py-2 px-4 inline-flex items-center"
        >
          <Download size={16} className="mr-2" />
          Export
        </button>
      </div>
    </div>
  );
};

export default PresentationHeader;
