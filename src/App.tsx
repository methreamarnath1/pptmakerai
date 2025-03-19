
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApiKeyProvider } from "./context/ApiKeyContext";
import { ThemeProvider } from "./context/ThemeContext";
import Index from "./pages/Index";
import ApiKeySetup from "./pages/ApiKeySetup";
import CreatePrompt from "./pages/CreatePrompt";
import EnhancedPresentationEditor from "./pages/EnhancedPresentationEditor";
import NotFound from "./pages/NotFound";

// Create QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ApiKeyProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner theme="system" richColors closeButton position="top-right" />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/api-key" element={<ApiKeySetup />} />
              <Route path="/create" element={<CreatePrompt />} />
              <Route path="/editor" element={<EnhancedPresentationEditor />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ApiKeyProvider>
  </QueryClientProvider>
);

export default App;
