
import { Loader2 } from 'lucide-react';

const EditorLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 size={40} className="text-primary animate-spin" />
    </div>
  );
};

export default EditorLoader;
