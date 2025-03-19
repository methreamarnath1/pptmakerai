
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface ApiKeyContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  isApiKeySet: boolean;
  clearApiKey: () => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isApiKeySet, setIsApiKeySet] = useState<boolean>(false);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('gemini_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setIsApiKeySet(true);
    }
  }, []);

  // Save API key to localStorage whenever it changes
  const handleSetApiKey = (key: string) => {
    if (key.trim()) {
      localStorage.setItem('gemini_api_key', key);
      setApiKey(key);
      setIsApiKeySet(true);
      toast.success('API key saved successfully');
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setIsApiKeySet(false);
    toast.info('API key removed');
  };

  return (
    <ApiKeyContext.Provider
      value={{
        apiKey,
        setApiKey: handleSetApiKey,
        isApiKeySet,
        clearApiKey,
      }}
    >
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
};
