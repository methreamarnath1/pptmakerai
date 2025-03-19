
import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Template interface
export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

interface PresentationTemplatesProps {
  onSelectTemplate: (template: Template) => void;
  selectedTemplateId: string | null;
}

const PresentationTemplates = ({ 
  onSelectTemplate, 
  selectedTemplateId 
}: PresentationTemplatesProps) => {
  const { theme } = useTheme();
  
  // Define templates with improved color contrast for better visibility in dark mode
  const templates: Template[] = [
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean and simple design with plenty of white space',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=225&fit=crop',
      primaryColor: theme === 'dark' ? '#FFCC99' : '#FF9950', // Adaptive orange
      secondaryColor: theme === 'dark' ? '#222222' : '#f8fafc',
      fontFamily: 'Inter, sans-serif',
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Polished and corporate style for business presentations',
      thumbnailUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=225&fit=crop',
      primaryColor: theme === 'dark' ? '#90CAF9' : '#1976D2', // Adaptive blue
      secondaryColor: theme === 'dark' ? '#242424' : '#f1f5f9',
      fontFamily: 'SF Pro Display, system-ui, sans-serif',
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold and colorful design for engaging presentations',
      thumbnailUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=225&fit=crop',
      primaryColor: theme === 'dark' ? '#FEC6A1' : '#FF7043', // Adaptive orange
      secondaryColor: theme === 'dark' ? '#1f1f1f' : '#f5f3ff',
      fontFamily: 'Poppins, sans-serif',
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary design with sleek elements',
      thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop',
      primaryColor: theme === 'dark' ? '#B39DDB' : '#673AB7', // Adaptive purple
      secondaryColor: theme === 'dark' ? '#202020' : '#ecfdf5',
      fontFamily: 'Roboto, sans-serif',
    },
    {
      id: 'academic',
      name: 'Academic',
      description: 'Structured layout ideal for educational content',
      thumbnailUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=225&fit=crop',
      primaryColor: theme === 'dark' ? '#FFFFFF' : '#222222', // High contrast adaptive color
      secondaryColor: theme === 'dark' ? '#232323' : '#f0f9ff',
      fontFamily: 'Georgia, serif',
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Elegant dark theme with high contrast',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=225&fit=crop',
      primaryColor: '#FEC6A1', // Soft orange
      secondaryColor: '#181818', // Dark background
      fontFamily: 'Inter, sans-serif',
    },
    {
      id: 'gradient',
      name: 'Gradient',
      description: 'Vibrant gradient backgrounds for impactful slides',
      thumbnailUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=225&fit=crop',
      primaryColor: '#FFFFFF',
      secondaryColor: 'linear-gradient(90deg, hsla(339, 100%, 55%, 1) 0%, hsla(197, 100%, 64%, 1) 100%)',
      fontFamily: 'Montserrat, sans-serif',
    },
    {
      id: 'startup',
      name: 'Startup',
      description: 'Fresh and innovative design for pitch decks',
      thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
      primaryColor: '#00E676',
      secondaryColor: '#212121',
      fontFamily: 'Poppins, sans-serif',
    },
    {
      id: 'pastel',
      name: 'Pastel',
      description: 'Soft pastel colors for a gentle, approachable look',
      thumbnailUrl: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=400&h=225&fit=crop',
      primaryColor: '#FF9AA2',
      secondaryColor: '#FFDAC1',
      fontFamily: 'Nunito, sans-serif',
    },
    {
      id: 'tech',
      name: 'Tech',
      description: 'Futuristic design for technology-focused content',
      thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop',
      primaryColor: '#00BCD4',
      secondaryColor: '#263238',
      fontFamily: 'Roboto Mono, monospace',
    },
    {
      id: 'nature',
      name: 'Nature',
      description: 'Organic themes inspired by the natural world',
      thumbnailUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=225&fit=crop',
      primaryColor: '#388E3C',
      secondaryColor: '#F1F8E9',
      fontFamily: 'Quicksand, sans-serif',
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      description: 'Ultra-clean design with essential elements only',
      thumbnailUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=400&h=225&fit=crop',
      primaryColor: '#212121',
      secondaryColor: '#FAFAFA',
      fontFamily: 'Inter, sans-serif',
    },
    // New template designs
    {
      id: 'corporate',
      name: 'Corporate',
      description: 'Professional design for business presentations',
      thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=225&fit=crop',
      primaryColor: '#0A66C2',
      secondaryColor: '#F5F7F9',
      fontFamily: 'Arial, sans-serif',
    },
    {
      id: 'vibrant',
      name: 'Vibrant',
      description: 'Bold and colorful design that stands out',
      thumbnailUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=225&fit=crop',
      primaryColor: '#FF4081',
      secondaryColor: 'linear-gradient(90deg, #FDEB71 0%, #F8D800 100%)',
      fontFamily: 'Montserrat, sans-serif',
    },
    {
      id: 'elegant',
      name: 'Elegant',
      description: 'Sophisticated design with classic elements',
      thumbnailUrl: 'https://images.unsplash.com/photo-1528460033278-a6ba57020470?w=400&h=225&fit=crop',
      primaryColor: '#8E44AD',
      secondaryColor: '#F5EEF8',
      fontFamily: 'Playfair Display, serif',
    },
    {
      id: 'neon',
      name: 'Neon',
      description: 'Vibrant neon colors for attention-grabbing slides',
      thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop',
      primaryColor: '#39FF14',
      secondaryColor: '#121212',
      fontFamily: 'Space Grotesk, sans-serif',
    },
    {
      id: 'geometric',
      name: 'Geometric',
      description: 'Modern style with geometric shapes and patterns',
      thumbnailUrl: 'https://images.unsplash.com/photo-1507350475232-05c0f82dfe88?w=400&h=225&fit=crop',
      primaryColor: '#3498DB',
      secondaryColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'DM Sans, sans-serif',
    },
    {
      id: 'retro',
      name: 'Retro',
      description: 'Nostalgic design inspired by vintage aesthetics',
      thumbnailUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=225&fit=crop',
      primaryColor: '#FF6B6B',
      secondaryColor: '#FFE66D',
      fontFamily: 'Rubik, sans-serif',
    }
  ];

  // Get text color based on background to ensure readability
  const getTextColor = (bgColor: string): string => {
    // For dark backgrounds, use white text
    if (bgColor.includes('#18') || bgColor.includes('#20') || bgColor.includes('#21') || bgColor.includes('#22') || bgColor.includes('#24') || bgColor.includes('#26')) {
      return '#FFFFFF';
    }
    // For light backgrounds, use dark text
    return '#333333';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`template rounded-lg overflow-hidden cursor-pointer transition-all ${
            selectedTemplateId === template.id 
              ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-800' 
              : 'hover:shadow-md dark:hover:shadow-black/30'
          }`}
          onClick={() => onSelectTemplate(template)}
        >
          <div className="relative">
            <img 
              src={template.thumbnailUrl} 
              alt={template.name} 
              className="w-full aspect-video object-cover"
              loading="lazy"
            />
            {selectedTemplateId === template.id && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                <CheckCircle2 size={18} />
              </div>
            )}
          </div>
          <div 
            className="p-4" 
            style={{ 
              backgroundColor: template.secondaryColor.startsWith('linear-gradient') ? 'transparent' : template.secondaryColor,
              backgroundImage: template.secondaryColor.startsWith('linear-gradient') ? template.secondaryColor : 'none',
              color: getTextColor(template.secondaryColor)
            }}
          >
            <h3 
              className="font-medium text-lg mb-1"
              style={{ 
                color: template.primaryColor,
                textShadow: theme === 'dark' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
              }}
            >
              {template.name}
            </h3>
            <p 
              className="text-sm"
              style={{ color: getTextColor(template.secondaryColor) }}
            >
              {template.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PresentationTemplates;
