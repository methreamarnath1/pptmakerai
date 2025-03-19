
import React from 'react';

interface SlideFormProps {
  editedTitle: string;
  editedContent: string;
  editedNotes: string;
  setEditedTitle: (title: string) => void;
  setEditedContent: (content: string) => void;
  setEditedNotes: (notes: string) => void;
}

const SlideForm: React.FC<SlideFormProps> = ({
  editedTitle,
  editedContent,
  editedNotes,
  setEditedTitle,
  setEditedContent,
  setEditedNotes
}) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 dark:text-white">
          Slide Title
        </label>
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 dark:text-white">
          Slide Content
        </label>
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-h-[150px] dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 dark:text-white">
          Speaker Notes (Optional)
        </label>
        <textarea
          value={editedNotes}
          onChange={(e) => setEditedNotes(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-h-[80px] dark:bg-gray-700 dark:text-white dark:border-gray-600"
          placeholder="Add notes for the presenter..."
        />
      </div>
    </>
  );
};

export default SlideForm;
