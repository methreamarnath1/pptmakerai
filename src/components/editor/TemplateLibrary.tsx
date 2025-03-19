
import { useState } from 'react';
import { Check } from 'lucide-react';

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  isNew?: boolean;
}

interface TemplateLibraryProps {
  onSelectTemplate: (template: Template) => void;
  selectedTemplateId: string;
}

const TemplateLibrary = ({ onSelectTemplate, selectedTemplateId }: TemplateLibraryProps) => {
  const [filterType, setFilterType] = useState<'all' | 'business' | 'creative' | 'academic'>('all');
  
  const templates: Template[] = [
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean and simple design with ample white space',
      thumbnailUrl: '/minimal-template.jpg',
      primaryColor: '#3b82f6',
      secondaryColor: '#f8fafc',
      fontFamily: 'Inter, sans-serif'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Bold and contemporary with vibrant accents',
      thumbnailUrl: '/modern-template.jpg',
      primaryColor: '#8b5cf6',
      secondaryColor: '#f5f3ff',
      fontFamily: 'Poppins, sans-serif'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Sophisticated design for business presentations',
      thumbnailUrl: '/professional-template.jpg',
      primaryColor: '#1e40af',
      secondaryColor: '#eff6ff',
      fontFamily: 'DM Sans, sans-serif'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Artistic template with unique layouts',
      thumbnailUrl: '/creative-template.jpg',
      primaryColor: '#ec4899',
      secondaryColor: '#fdf2f8',
      fontFamily: 'Outfit, sans-serif',
      isNew: true
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Sleek dark design with high contrast',
      thumbnailUrl: '/dark-template.jpg',
      primaryColor: '#38bdf8',
      secondaryColor: '#0f172a',
      fontFamily: 'Inter, sans-serif'
    },
    {
      id: 'gradient',
      name: 'Gradient',
      description: 'Smooth color transitions for a modern look',
      thumbnailUrl: '/gradient-template.jpg',
      primaryColor: '#f97316',
      secondaryColor: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      isNew: true
    },
    {
      id: 'academic',
      name: 'Academic',
      description: 'Clean template for educational presentations',
      thumbnailUrl: '/academic-template.jpg',
      primaryColor: '#0ea5e9',
      secondaryColor: '#f0f9ff',
      fontFamily: 'Source Sans Pro, sans-serif',
      isNew: true
    },
    {
      id: 'retro',
      name: 'Retro',
      description: 'Classic design with vintage aesthetics',
      thumbnailUrl: '/retro-template.jpg',
      primaryColor: '#d97706',
      secondaryColor: '#fffbeb',
      fontFamily: 'Space Grotesk, sans-serif',
      isNew: true
    },
    {
      id: 'corporate',
      name: 'Corporate',
      description: 'Professional template for business presentations',
      thumbnailUrl: '/corporate-template.jpg',
      primaryColor: '#0f766e',
      secondaryColor: '#f0fdfa',
      fontFamily: 'IBM Plex Sans, sans-serif'
    },
    {
      id: 'minimalist-dark',
      name: 'Minimalist Dark',
      description: 'Elegant dark theme with minimal elements',
      thumbnailUrl: '/minimalist-dark-template.jpg',
      primaryColor: '#a78bfa',
      secondaryColor: '#1e1b4b',
      fontFamily: 'DM Sans, sans-serif',
      isNew: true
    },
    {
      id: 'playful',
      name: 'Playful',
      description: 'Fun and engaging with bright colors',
      thumbnailUrl: '/playful-template.jpg',
      primaryColor: '#fb7185',
      secondaryColor: 'linear-gradient(90deg, #fdf2f8 0%, #e0f2fe 100%)',
      fontFamily: 'Nunito, sans-serif',
      isNew: true
    },
    {
      id: 'nature',
      name: 'Nature',
      description: 'Inspired by natural elements and colors',
      thumbnailUrl: '/nature-template.jpg',
      primaryColor: '#059669',
      secondaryColor: '#ecfdf5',
      fontFamily: 'Montserrat, sans-serif'
    }
  ];
  
  const getFilteredTemplates = () => {
    if (filterType === 'all') return templates;
    
    const filterMap = {
      'business': ['professional', 'corporate', 'minimal', 'dark'],
      'creative': ['creative', 'gradient', 'playful', 'retro'],
      'academic': ['academic', 'minimal', 'professional']
    };
    
    return templates.filter(template => 
      filterMap[filterType as keyof typeof filterMap].includes(template.id)
    );
  };
  
  const filteredTemplates = getFilteredTemplates();
  
  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto space-x-2 pb-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 text-sm rounded-full whitespace-nowrap ${
            filterType === 'all' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All Templates
        </button>
        <button
          onClick={() => setFilterType('business')}
          className={`px-4 py-2 text-sm rounded-full whitespace-nowrap ${
            filterType === 'business' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Business
        </button>
        <button
          onClick={() => setFilterType('creative')}
          className={`px-4 py-2 text-sm rounded-full whitespace-nowrap ${
            filterType === 'creative' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Creative
        </button>
        <button
          onClick={() => setFilterType('academic')}
          className={`px-4 py-2 text-sm rounded-full whitespace-nowrap ${
            filterType === 'academic' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Academic
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTemplates.map((template) => (
          <div 
            key={template.id}
            className={`relative rounded-lg overflow-hidden border transition-all duration-200 ${
              selectedTemplateId === template.id
                ? 'ring-2 ring-primary dark:ring-primary-600 border-primary dark:border-primary-600'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            {template.isNew && (
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
                New
              </div>
            )}
            
            <div 
              className="h-32 bg-gray-100 dark:bg-gray-800" 
              style={{ 
                background: template.secondaryColor.startsWith('linear') 
                  ? template.secondaryColor 
                  : template.secondaryColor
              }}
            >
              <div className="h-full flex items-center justify-center">
                <div 
                  className="w-3/4 h-2/3 rounded flex items-center justify-center"
                  style={{ color: template.primaryColor }}
                >
                  <span className="font-medium" style={{ fontFamily: template.fontFamily }}>
                    {template.name}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-sm">{template.name}</h3>
                {selectedTemplateId === template.id && (
                  <Check size={16} className="text-primary" />
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {template.description}
              </p>
              <button
                onClick={() => onSelectTemplate(template)}
                className={`w-full mt-3 py-1 rounded text-sm ${
                  selectedTemplateId === template.id
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {selectedTemplateId === template.id ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateLibrary;
