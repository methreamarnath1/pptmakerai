
import Header from '../Header';
import PresentationManager from '../PresentationManager';

interface PresentationManagerUIProps {
  onSelectPresentation: (id: string) => void;
  onCreateNew: () => void;
}

const PresentationManagerUI = ({ 
  onSelectPresentation, 
  onCreateNew 
}: PresentationManagerUIProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-display font-bold">
                Presentation Manager
              </h1>
              <button 
                onClick={onCreateNew}
                className="btn-primary text-sm py-2 px-4 inline-flex items-center"
              >
                <span className="mr-2">+</span>
                Create New
              </button>
            </div>
            
            <PresentationManager 
              onSelectPresentation={onSelectPresentation}
              onCreateNew={onCreateNew}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PresentationManagerUI;
