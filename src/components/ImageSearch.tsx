
import { useState, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { searchUnsplashImages } from '../utils/unsplashApi';
import { toast } from 'sonner';

interface ImageSearchProps {
  onSelectImage: (imageUrl: string, credit: { name: string, url: string }) => void;
  initialQuery?: string;
}

interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  user: {
    name: string;
    links: {
      html: string;
    };
  };
}

const ImageSearch = ({ onSelectImage, initialQuery = '' }: ImageSearchProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  
  const searchImages = async (q: string, newSearch = true) => {
    if (!q.trim()) return;
    
    setLoading(true);
    const currentPage = newSearch ? 1 : page;
    
    try {
      const results = await searchUnsplashImages(q, currentPage);
      
      if (newSearch) {
        setImages(results);
        setPage(1);
      } else {
        setImages([...images, ...results]);
        setPage(currentPage + 1);
      }
      
      if (results.length === 0 && newSearch) {
        toast.info('No images found for this search term');
      }
    } catch (error) {
      console.error('Error searching images:', error);
      toast.error('Failed to load images. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setSearchQuery(initialQuery);
      searchImages(initialQuery);
    }
  }, [initialQuery]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(query);
    searchImages(query);
  };
  
  const handleLoadMore = () => {
    searchImages(searchQuery, false);
  };
  
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for images..."
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </form>
      
      {loading && page === 1 ? (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <>
          {images.length === 0 && searchQuery && !loading ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No images found for "{searchQuery}". Try a different search term.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {images.map((image) => (
                <div 
                  key={image.id}
                  className="aspect-video rounded overflow-hidden border cursor-pointer hover:opacity-90 transition-opacity group relative"
                  onClick={() => onSelectImage(image.urls.regular, { 
                    name: image.user.name, 
                    url: image.user.links.html 
                  })}
                >
                  <img 
                    src={image.urls.small} 
                    alt={image.alt_description || 'Unsplash image'} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity truncate">
                    Photo by {image.user.name}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {images.length > 0 && (
            <div className="mt-4 text-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="btn-secondary text-sm py-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 inline-block" size={16} />
                    Loading...
                  </>
                ) : (
                  'Load More'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageSearch;
