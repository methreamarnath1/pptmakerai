
import React from 'react';

interface PowerPointLayoutOptionsProps {
  layoutPreference: string;
  onLayoutChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PowerPointLayoutOptions = ({ 
  layoutPreference, 
  onLayoutChange 
}: PowerPointLayoutOptionsProps) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h3 className="text-sm font-medium mb-3 dark:text-white">PowerPoint Layout Options</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Layout Style</label>
          <select 
            className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm"
            value={layoutPreference}
            onChange={onLayoutChange}
          >
            <option value="auto">Auto (Based on Content)</option>
            <option value="IMAGE_RIGHT">Image Right</option>
            <option value="IMAGE_LEFT">Image Left</option>
            <option value="IMAGE_TOP">Image Top</option>
            <option value="IMAGE_BOTTOM">Image Bottom</option>
            <option value="TEXT_ONLY">Text Only</option>
            <option value="BULLETS_ONLY">Bullet Points Only</option>
          </select>
        </div>
      </div>
      
      <LayoutPreviewGrid layoutPreference={layoutPreference} />
    </div>
  );
};

interface LayoutPreviewGridProps {
  layoutPreference: string;
}

const LayoutPreviewGrid = ({ layoutPreference }: LayoutPreviewGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      <div className={`p-2 border rounded-md ${layoutPreference === 'IMAGE_RIGHT' ? 'border-blue-500' : ''}`}>
        <div className="bg-gray-200 dark:bg-gray-600 p-1 rounded-sm mb-1 h-2"></div>
        <div className="flex gap-1">
          <div className="bg-gray-300 dark:bg-gray-500 h-10 w-2/3 rounded-sm"></div>
          <div className="bg-blue-200 dark:bg-blue-900 h-10 w-1/3 rounded-sm"></div>
        </div>
        <p className="text-[10px] text-center mt-1 text-gray-500 dark:text-gray-400">Image Right</p>
      </div>
      
      <div className={`p-2 border rounded-md ${layoutPreference === 'IMAGE_LEFT' ? 'border-blue-500' : ''}`}>
        <div className="bg-gray-200 dark:bg-gray-600 p-1 rounded-sm mb-1 h-2"></div>
        <div className="flex gap-1">
          <div className="bg-blue-200 dark:bg-blue-900 h-10 w-1/3 rounded-sm"></div>
          <div className="bg-gray-300 dark:bg-gray-500 h-10 w-2/3 rounded-sm"></div>
        </div>
        <p className="text-[10px] text-center mt-1 text-gray-500 dark:text-gray-400">Image Left</p>
      </div>
      
      <div className={`p-2 border rounded-md ${layoutPreference === 'IMAGE_TOP' ? 'border-blue-500' : ''}`}>
        <div className="bg-gray-200 dark:bg-gray-600 p-1 rounded-sm mb-1 h-2"></div>
        <div className="flex flex-col gap-1">
          <div className="bg-blue-200 dark:bg-blue-900 h-5 w-full rounded-sm"></div>
          <div className="bg-gray-300 dark:bg-gray-500 h-5 w-full rounded-sm"></div>
        </div>
        <p className="text-[10px] text-center mt-1 text-gray-500 dark:text-gray-400">Image Top</p>
      </div>
      
      <div className={`p-2 border rounded-md ${layoutPreference === 'IMAGE_BOTTOM' ? 'border-blue-500' : ''}`}>
        <div className="bg-gray-200 dark:bg-gray-600 p-1 rounded-sm mb-1 h-2"></div>
        <div className="flex flex-col gap-1">
          <div className="bg-gray-300 dark:bg-gray-500 h-5 w-full rounded-sm"></div>
          <div className="bg-blue-200 dark:bg-blue-900 h-5 w-full rounded-sm"></div>
        </div>
        <p className="text-[10px] text-center mt-1 text-gray-500 dark:text-gray-400">Image Bottom</p>
      </div>
    </div>
  );
};

export default PowerPointLayoutOptions;
