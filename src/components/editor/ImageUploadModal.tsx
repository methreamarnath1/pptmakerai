
import { ChangeEvent } from 'react';
import { Upload, Search } from 'lucide-react';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onOpenUnsplashSearch: () => void;
}

const ImageUploadModal = ({ 
  isOpen, 
  onClose, 
  onUpload, 
  onOpenUnsplashSearch 
}: ImageUploadModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium mb-4 dark:text-white">Add Image</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 dark:text-gray-300">
            Upload from your device
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={onUpload}
            className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0 file:text-sm file:font-semibold
            file:bg-primary file:text-white hover:file:bg-primary/90 dark:file:bg-blue-600"
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium dark:text-gray-300">
              Or search images from Unsplash
            </label>
          </div>
          <button
            onClick={onOpenUnsplashSearch}
            className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-md text-sm hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
          >
            <Search className="inline-block mr-2" size={16} />
            Search Unsplash Photos
          </button>
        </div>
        
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
