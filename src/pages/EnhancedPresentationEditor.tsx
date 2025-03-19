
import { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';
import EditorLoader from '../components/presentation/EditorLoader';

// Lazy load the PresentationContainer to improve initial load time
const PresentationContainer = lazy(() => import('../components/presentation/PresentationContainer'));

const EnhancedPresentationEditor = () => {
  return (
    <Suspense fallback={<EditorLoader />}>
      <PresentationContainer />
    </Suspense>
  );
};

export default EnhancedPresentationEditor;
