
import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Key, HelpCircle, AlertCircle, CheckCircle, KeyRound } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useApiKey } from '../context/ApiKeyContext';
import { toast } from 'sonner';

const ApiKeySetup = () => {
  const { apiKey, setApiKey, isApiKeySet, clearApiKey } = useApiKey();
  const [inputApiKey, setInputApiKey] = useState(apiKey);
  const [showApiKey, setShowApiKey] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!inputApiKey.trim()) {
      toast.error('Please enter an API key');
      return;
    }
    
    setApiKey(inputApiKey);
    toast.success('API key set successfully');
    
    // Redirect to create page after a delay
    setTimeout(() => {
      navigate('/create');
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <KeyRound className="text-primary" size={32} />
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Set Up Your Gemini API Key
              </h1>
              <p className="text-lg text-foreground/70">
                Connect with Gemini Flash 2.0 to generate amazing presentation content
              </p>
            </div>
            
            <div className="bg-white border rounded-xl shadow-sm p-6 mb-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="apiKey" className="block text-sm font-medium mb-2">
                    Gemini API Key
                  </label>
                  <div className="relative">
                    <input
                      id="apiKey"
                      type={showApiKey ? 'text' : 'password'}
                      className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Enter your Gemini API key"
                      value={inputApiKey}
                      onChange={(e) => setInputApiKey(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    type="submit" 
                    className="btn-primary flex-1"
                  >
                    {isApiKeySet ? 'Update API Key' : 'Save API Key'}
                  </button>
                  
                  {isApiKeySet && (
                    <button 
                      type="button" 
                      className="btn-secondary flex-1 bg-red-50 hover:bg-red-100 text-red-600"
                      onClick={clearApiKey}
                    >
                      Clear API Key
                    </button>
                  )}
                </div>
              </form>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex">
                <div className="mr-4 text-blue-500">
                  <HelpCircle size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">How to get your Gemini API key</h3>
                  <ol className="space-y-2 text-foreground/80 list-decimal list-inside">
                    <li>Go to <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AI Studio</a> and sign in</li>
                    <li>Click on "Get API key" in the top navigation</li>
                    <li>Create a new API key or use an existing one</li>
                    <li>Copy the API key and paste it here</li>
                  </ol>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex">
                <div className="mr-4 text-amber-500">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">Important Security Notice</h3>
                  <p className="text-foreground/80 mb-2">
                    Your API key is stored securely in your browser's local storage and is never sent to our servers.
                    However, be careful not to share your screen or this browser session with anyone who shouldn't have access to your API key.
                  </p>
                  <p className="text-foreground/80">
                    You can clear your API key at any time by clicking the "Clear API Key" button.
                  </p>
                </div>
              </div>
            </div>
            
            {isApiKeySet && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm mb-4">
                  <CheckCircle size={16} className="mr-2" />
                  API key is set and ready to use
                </div>
                <div>
                  <Link to="/create" className="text-primary hover:underline font-medium">
                    Continue to Create Presentation
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ApiKeySetup;
