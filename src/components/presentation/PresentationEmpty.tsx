
import { HelpCircle } from 'lucide-react';

interface PresentationEmptyProps {
  onCreateNew: () => void;
}

const PresentationEmpty = ({ onCreateNew }: PresentationEmptyProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <HelpCircle size={48} className="text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-display font-bold mb-3">No presentation data found</h2>
        <p className="text-foreground/70 mb-6">
          Please create a presentation first to use the editor.
        </p>
        <button 
          onClick={onCreateNew}
          className="btn-primary mx-auto"
        >
          Create Presentation
        </button>
      </div>
    </div>
  );
};

export default PresentationEmpty;
