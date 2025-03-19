
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Copy, 
  Edit, 
  Trash2, 
  Plus, 
  Calendar, 
  Clock, 
  FileText, 
  Layers
} from 'lucide-react';
import { toast } from 'sonner';

interface Presentation {
  id: string;
  title: string;
  subtitle?: string;
  createdAt: string;
  updatedAt: string;
  slideCount: number;
  templateId: string;
}

const PresentationManager = ({ onSelectPresentation, onCreateNew }: {
  onSelectPresentation: (id: string) => void;
  onCreateNew: () => void;
}) => {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const navigate = useNavigate();

  // Load presentations from localStorage
  useEffect(() => {
    const storedPresentationIds = localStorage.getItem('presentation_ids');
    if (storedPresentationIds) {
      try {
        const ids = JSON.parse(storedPresentationIds) as string[];
        const loadedPresentations: Presentation[] = [];
        
        ids.forEach(id => {
          const presentationData = localStorage.getItem(`presentation_${id}`);
          if (presentationData) {
            try {
              const data = JSON.parse(presentationData);
              loadedPresentations.push({
                id,
                title: data.title,
                subtitle: data.subtitle || '',
                createdAt: data.createdAt || new Date().toISOString(),
                updatedAt: data.updatedAt || new Date().toISOString(),
                slideCount: data.slides.length,
                templateId: data.templateId || 'minimal'
              });
            } catch (error) {
              console.error(`Error parsing presentation ${id}:`, error);
            }
          }
        });
        
        // Sort by most recently updated
        loadedPresentations.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        
        setPresentations(loadedPresentations);
      } catch (error) {
        console.error('Error loading presentations:', error);
        toast.error('Failed to load saved presentations');
      }
    }
  }, []);

  const handleDeletePresentation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (confirm('Are you sure you want to delete this presentation?')) {
      // Remove from localStorage
      localStorage.removeItem(`presentation_${id}`);
      
      // Update presentation_ids
      const storedPresentationIds = localStorage.getItem('presentation_ids');
      if (storedPresentationIds) {
        try {
          const ids = JSON.parse(storedPresentationIds) as string[];
          const updatedIds = ids.filter(presentationId => presentationId !== id);
          localStorage.setItem('presentation_ids', JSON.stringify(updatedIds));
          
          // Update state
          setPresentations(prevPresentations => 
            prevPresentations.filter(presentation => presentation.id !== id)
          );
          
          toast.success('Presentation deleted');
        } catch (error) {
          console.error('Error updating presentation ids:', error);
          toast.error('Failed to delete presentation');
        }
      }
    }
  };

  const handleDuplicatePresentation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Get the presentation data
    const presentationData = localStorage.getItem(`presentation_${id}`);
    if (presentationData) {
      try {
        const data = JSON.parse(presentationData);
        
        // Create a new ID
        const newId = `pres_${Date.now()}`;
        
        // Update metadata
        data.title = `${data.title} (Copy)`;
        data.createdAt = new Date().toISOString();
        data.updatedAt = new Date().toISOString();
        
        // Save to localStorage
        localStorage.setItem(`presentation_${newId}`, JSON.stringify(data));
        
        // Update presentation_ids
        const storedPresentationIds = localStorage.getItem('presentation_ids');
        let ids: string[] = [];
        
        if (storedPresentationIds) {
          try {
            ids = JSON.parse(storedPresentationIds) as string[];
          } catch (error) {
            console.error('Error parsing presentation ids:', error);
          }
        }
        
        ids.push(newId);
        localStorage.setItem('presentation_ids', JSON.stringify(ids));
        
        // Update state
        setPresentations(prevPresentations => [
          {
            id: newId,
            title: data.title,
            subtitle: data.subtitle || '',
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            slideCount: data.slides.length,
            templateId: data.templateId || 'minimal'
          },
          ...prevPresentations
        ]);
        
        toast.success('Presentation duplicated');
      } catch (error) {
        console.error('Error duplicating presentation:', error);
        toast.error('Failed to duplicate presentation');
      }
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return 'Unknown date';
    }
  };

  if (presentations.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="mb-6">
          <Layers size={48} className="mx-auto text-primary mb-3" />
          <h3 className="text-xl font-medium mb-2">No presentations found</h3>
          <p className="text-foreground/70 mb-6">
            Create your first presentation to get started
          </p>
        </div>
        <button 
          onClick={onCreateNew}
          className="btn-primary inline-flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Create New Presentation
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Presentations</h3>
        <button 
          onClick={onCreateNew}
          className="btn-primary text-sm py-2 px-4 inline-flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Create New
        </button>
      </div>
      
      {presentations.map((presentation) => (
        <div
          key={presentation.id}
          onClick={() => onSelectPresentation(presentation.id)}
          className="bg-white dark:bg-gray-800 rounded-lg border border-border hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-lg mb-1">{presentation.title}</h3>
                {presentation.subtitle && (
                  <p className="text-sm text-foreground/70">{presentation.subtitle}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => handleDuplicatePresentation(presentation.id, e)}
                  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"
                  title="Duplicate presentation"
                >
                  <Copy size={16} />
                </button>
                <button
                  onClick={(e) => handleDeletePresentation(presentation.id, e)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                  title="Delete presentation"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap text-xs text-foreground/60 gap-x-4 gap-y-2 mt-3">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>{formatDate(presentation.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>Last edited: {formatDate(presentation.updatedAt)}</span>
              </div>
              <div className="flex items-center">
                <Layers size={14} className="mr-1" />
                <span>{presentation.slideCount} slides</span>
              </div>
            </div>
          </div>
          
          <div className="px-4 py-2 border-t flex justify-end bg-secondary/50 dark:bg-gray-700/50 rounded-b-lg">
            <button
              className="text-xs py-1 px-3 bg-primary/20 text-primary-foreground hover:bg-primary/30 rounded-full flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                onSelectPresentation(presentation.id);
              }}
            >
              <Edit size={14} className="mr-1" />
              Open Editor
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PresentationManager;
