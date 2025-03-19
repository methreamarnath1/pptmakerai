
import { 
  Move, 
  Type, 
  Image as ImageIcon, 
  Trash2, 
  Copy, 
  Undo, 
  Redo, 
  BringToFront, 
  SendToBack,
  BarChart3,
} from 'lucide-react';
import { Canvas, Object as FabricObject } from 'fabric';

interface EditorToolbarProps {
  activeObject: FabricObject | null;
  historyIndex: number;
  historyLength: number;
  onUndo: () => void;
  onRedo: () => void;
  onAddText: () => void;
  onAddImage: () => void;
  onAddChart: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onBringToFront: () => void;
  onSendToBack: () => void;
  onSave: () => void;
}

const EditorToolbar = ({
  activeObject,
  historyIndex,
  historyLength,
  onUndo,
  onRedo,
  onAddText,
  onAddImage,
  onAddChart,
  onDelete,
  onDuplicate,
  onBringToFront,
  onSendToBack,
  onSave,
}: EditorToolbarProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-border dark:border-gray-700 rounded-t-lg p-2 flex flex-wrap items-center gap-2">
      <button
        onClick={onUndo}
        disabled={historyIndex <= 0}
        className={`p-2 rounded ${
          historyIndex <= 0 
            ? 'text-gray-400 dark:text-gray-600' 
            : 'text-foreground dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-700'
        }`}
        title="Undo"
      >
        <Undo size={20} />
      </button>
      
      <button
        onClick={onRedo}
        disabled={historyIndex >= historyLength - 1}
        className={`p-2 rounded ${
          historyIndex >= historyLength - 1 
            ? 'text-gray-400 dark:text-gray-600' 
            : 'text-foreground dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-700'
        }`}
        title="Redo"
      >
        <Redo size={20} />
      </button>
      
      <div className="w-px h-6 bg-border dark:bg-gray-600 mx-1"></div>
      
      <button
        onClick={onAddText}
        className="p-2 rounded text-foreground dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-700"
        title="Add text"
      >
        <Type size={20} />
      </button>
      
      <button
        onClick={onAddImage}
        className="p-2 rounded text-foreground dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-700"
        title="Add image"
      >
        <ImageIcon size={20} />
      </button>
      
      <button
        onClick={onAddChart}
        className="p-2 rounded text-foreground dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-700"
        title="Add chart"
      >
        <BarChart3 size={20} />
      </button>
      
      <div className="w-px h-6 bg-border dark:bg-gray-600 mx-1"></div>
      
      <button
        onClick={onDelete}
        disabled={!activeObject}
        className={`p-2 rounded ${
          !activeObject 
            ? 'text-gray-400 dark:text-gray-600' 
            : 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30'
        }`}
        title="Delete object"
      >
        <Trash2 size={20} />
      </button>
      
      <button
        onClick={onDuplicate}
        disabled={!activeObject}
        className={`p-2 rounded ${
          !activeObject 
            ? 'text-gray-400 dark:text-gray-600' 
            : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
        }`}
        title="Duplicate object"
      >
        <Copy size={20} />
      </button>
      
      <button
        onClick={onBringToFront}
        disabled={!activeObject}
        className={`p-2 rounded ${
          !activeObject 
            ? 'text-gray-400 dark:text-gray-600' 
            : 'text-foreground dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-700'
        }`}
        title="Bring to front"
      >
        <BringToFront size={20} />
      </button>
      
      <button
        onClick={onSendToBack}
        disabled={!activeObject}
        className={`p-2 rounded ${
          !activeObject 
            ? 'text-gray-400 dark:text-gray-600' 
            : 'text-foreground dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-700'
        }`}
        title="Send to back"
      >
        <SendToBack size={20} />
      </button>
      
      <div className="ml-auto">
        <button
          onClick={onSave}
          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditorToolbar;
