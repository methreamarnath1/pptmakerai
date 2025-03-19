
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoveRight, RefreshCw, Sparkles, AlertTriangle, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useApiKey } from '../context/ApiKeyContext';
import { generatePresentation } from '../utils/geminiApi';
import { toast } from 'sonner';

interface PresentationData {
  title: string;
  subtitle?: string;
  slides: {
    title: string;
    content: string;
    notes?: string;
    imagePrompt?: string;
  }[];
}

const CreatePrompt = () => {
  const { apiKey, isApiKeySet } = useApiKey();
  const navigate = useNavigate();
  
  const [topic, setTopic] = useState('');
  const [numberOfSlides, setNumberOfSlides] = useState(5);
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [presentationStyle, setPresentationStyle] = useState('professional');
  const [presentationType, setPresentationType] = useState('general');
  const [loading, setLoading] = useState(false);
  const [presentationData, setPresentationData] = useState<PresentationData | null>(null);
  
  // Check if API key is set
  useEffect(() => {
    if (!isApiKeySet) {
      toast.error('API key is required to generate content', {
        description: 'Please set up your Gemini API key first.',
        action: {
          label: 'Set API Key',
          onClick: () => navigate('/api-key'),
        },
      });
    }
  }, [isApiKeySet, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isApiKeySet) {
      navigate('/api-key');
      return;
    }
    
    if (!topic.trim()) {
      toast.error('Please enter a topic for your presentation');
      return;
    }
    
    setLoading(true);
    setPresentationData(null);
    
    try {
      // Create a detailed prompt based on user inputs
      const details = `
        Style preference: ${presentationStyle}.
        Presentation type: ${presentationType}. 
        ${presentationType === 'business' ? 
          'Create a professional business presentation with clear sections, key takeaways, and data points. Format headings clearly and use bullet points for main ideas.' : 
          presentationType === 'lecture' ? 
          'Create an educational lecture with clear section headings, definitions, examples, and key points. Organize content logically with numbered lists for sequences and bullet points for key concepts.' : 
          'Create a general presentation with engaging content and clear structure.'
        }
        ${additionalDetails ? `Additional details: ${additionalDetails}` : ''}
        
        IMPORTANT FORMATTING INSTRUCTIONS:
        - Use clear slide titles
        - For bullet points, use proper markdown bullet point format (- or * followed by space)
        - For important text, use **bold** markdown
        - Organize content with clear headings and subheadings
        - Keep text concise to avoid overflow in slides
        - Break down complex ideas into multiple slides rather than crowding one slide
      `;
      
      const data = await generatePresentation(apiKey, topic, numberOfSlides, details);
      setPresentationData(data);
      
      toast.success('Content generated successfully!');
    } catch (error) {
      console.error('Error generating presentation:', error);
      toast.error('Failed to generate presentation content');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegenerateContent = async () => {
    toast('Regenerating content...', { description: 'This may take a moment.' });
    handleSubmit(new Event('submit') as any);
  };
  
  const handleContinueToEditor = () => {
    if (presentationData) {
      // Store the presentation data in localStorage to be used in the editor
      localStorage.setItem('presentation_data', JSON.stringify(presentationData));
      
      // Navigate to the enhanced editor which will load this data
      navigate('/editor');
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Sparkles className="text-primary" size={32} />
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Create Your Presentation
              </h1>
              <p className="text-lg text-foreground/70">
                Describe what you want, and our AI will generate the perfect presentation
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-2">
                <div className="bg-white border rounded-xl shadow-sm p-6 sticky top-32">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                      <label htmlFor="topic" className="block text-sm font-medium mb-2">
                        Presentation Topic *
                      </label>
                      <input
                        id="topic"
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="e.g., Climate Change Solutions"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="mb-5">
                      <label htmlFor="presentationType" className="block text-sm font-medium mb-2">
                        Presentation Type
                      </label>
                      <select
                        id="presentationType"
                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        value={presentationType}
                        onChange={(e) => setPresentationType(e.target.value)}
                      >
                        <option value="general">General</option>
                        <option value="business">Business</option>
                        <option value="lecture">Lecture</option>
                        <option value="pitch">Pitch Deck</option>
                        <option value="informative">Informative</option>
                      </select>
                    </div>
                    
                    <div className="mb-5">
                      <label htmlFor="slides" className="block text-sm font-medium mb-2">
                        Number of Slides
                      </label>
                      <select
                        id="slides"
                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        value={numberOfSlides}
                        onChange={(e) => setNumberOfSlides(Number(e.target.value))}
                      >
                        {[3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                          <option key={num} value={num}>
                            {num} slides
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-5">
                      <label htmlFor="style" className="block text-sm font-medium mb-2">
                        Visual Style
                      </label>
                      <select
                        id="style"
                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        value={presentationStyle}
                        onChange={(e) => setPresentationStyle(e.target.value)}
                      >
                        <option value="professional">Professional</option>
                        <option value="creative">Creative</option>
                        <option value="minimal">Minimal</option>
                        <option value="academic">Academic</option>
                        <option value="business">Business</option>
                        <option value="casual">Casual</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="details" className="block text-sm font-medium mb-2">
                        Additional Details (Optional)
                      </label>
                      <textarea
                        id="details"
                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all min-h-[120px]"
                        placeholder="Any specific points to include, target audience, or additional context..."
                        value={additionalDetails}
                        onChange={(e) => setAdditionalDetails(e.target.value)}
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn-primary w-full flex items-center justify-center"
                      disabled={loading || !isApiKeySet}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin mr-2" size={18} />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles size={18} className="mr-2" />
                          Generate Content
                        </>
                      )}
                    </button>
                    
                    {!isApiKeySet && (
                      <div className="mt-4 text-center">
                        <div className="flex items-center justify-center text-amber-600 text-sm">
                          <AlertTriangle size={16} className="mr-2" />
                          API key not set
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
              
              <div className="md:col-span-3">
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center py-20 px-6 bg-white rounded-xl border">
                    <Loader2 size={40} className="text-primary animate-spin mb-4" />
                    <h3 className="text-xl font-medium mb-2">Generating your presentation</h3>
                    <p className="text-foreground/70 text-center">
                      Our AI is crafting the perfect content for your presentation.
                      This may take a minute...
                    </p>
                  </div>
                ) : presentationData ? (
                  <div className="bg-white rounded-xl border shadow-sm">
                    <div className="p-6 border-b">
                      <h2 className="text-2xl font-display font-bold mb-2">{presentationData.title}</h2>
                      {presentationData.subtitle && (
                        <p className="text-foreground/70">{presentationData.subtitle}</p>
                      )}
                    </div>
                    
                    <div className="p-6 max-h-[600px] overflow-y-auto">
                      <div className="space-y-6">
                        {presentationData.slides.map((slide, index) => (
                          <div key={index} className="pb-6 border-b border-dashed last:border-0">
                            <h3 className="text-lg font-semibold mb-2">
                              Slide {index + 1}: {slide.title}
                            </h3>
                            <div className="text-foreground/80 whitespace-pre-line">
                              {slide.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-6 border-t bg-secondary/30 flex flex-col sm:flex-row gap-4 justify-end">
                      <button 
                        onClick={handleRegenerateContent}
                        className="btn-secondary"
                      >
                        <RefreshCw size={18} className="mr-2" />
                        Regenerate
                      </button>
                      <button 
                        onClick={handleContinueToEditor}
                        className="btn-primary"
                      >
                        Continue to Editor
                        <MoveRight size={18} className="ml-2" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center py-20 px-6 bg-white rounded-xl border text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Sparkles className="text-primary" size={28} />
                    </div>
                    <h3 className="text-xl font-medium mb-3">Ready to create your presentation</h3>
                    <p className="text-foreground/70 max-w-md">
                      Fill out the form with your presentation topic and preferences,
                      then click "Generate Content" to get started.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreatePrompt;
