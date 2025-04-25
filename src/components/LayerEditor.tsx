// src/components/LayerEditor.jsx
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Trash,
  Copy,
  Edit,
} from "lucide-react";

interface LayerType {
    name?: string;
    bgColor: string;
    textColor: string;
    text: string;
    fontSize: "normal" | "large";
    fontWeight: "normal" | "bold"; // Ensure no `undefined`
    children: LayerType[]; // Matching the type in `Layer`
  }
  
  interface LayerEditorProps {
    layer: LayerType;
    path: number[];
    updateLayer: (path: number[], newLayer: LayerType) => void;
    removeLayer: (path: number[]) => void;
    addChild: (path: number[]) => void;
    duplicateLayer: (path: number[]) => void;
    isDarkMode: boolean;
  }
  

export default function LayerEditor({
  layer,
  path,
  updateLayer,
  removeLayer,
  addChild,
  duplicateLayer,
  isDarkMode,
}: LayerEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [layerName, setLayerName] = useState(
    layer.name ||
      `Layer ${
        path.length ? path.join(".") + "." + path[path.length - 1] : "Root"
      }`
  );

  const handleToggleExpand = () => setIsExpanded(!isExpanded);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLayerName(e.target.value);
  };

  const saveLayerName = () => {
    updateLayer(path, { ...layer, name: layerName });
    setIsEditingName(false);
  };

  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200";
  const textColor = isDarkMode ? "text-gray-200" : "text-gray-700";

  return (
    <div className={`border rounded-md p-3 mb-3 ${borderColor} ${textColor}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleExpand}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>

          {isEditingName ? (
            <div className="flex items-center">
              <input
                type="text"
                value={layerName}
                onChange={handleNameChange}
                onBlur={saveLayerName}
                onKeyDown={(e) => e.key === "Enter" && saveLayerName()}
                className="border px-2 py-1 rounded text-sm w-full dark:bg-gray-700 dark:border-gray-600"
                autoFocus
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {layer.name || `Layer ${path.length ? path.join(".") : "Root"}`}
              </span>
              <button
                onClick={() => setIsEditingName(true)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Edit size={14} />
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {path.length > 0 && (
            <>
              <button
                onClick={() => duplicateLayer(path)}
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                title="Duplicate layer">
                <Copy size={16} />
              </button>
              <button
                onClick={() => removeLayer(path)}
                className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                title="Remove layer">
                <Trash size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {isExpanded && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                Background Color
              </label>
              <div className="flex">
                <input
                  type="color"
                  value={layer.bgColor}
                  onChange={(e) =>
                    updateLayer(path, { ...layer, bgColor: e.target.value })
                  }
                  className="h-8 w-12 p-0 m-0 border-0 rounded"
                />
                <input
                  type="text"
                  value={layer.bgColor}
                  onChange={(e) =>
                    updateLayer(path, { ...layer, bgColor: e.target.value })
                  }
                  className="border ml-1 p-1 w-full text-sm rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                Text Color
              </label>
              <div className="flex">
                <input
                  type="color"
                  value={layer.textColor}
                  onChange={(e) =>
                    updateLayer(path, { ...layer, textColor: e.target.value })
                  }
                  className="h-8 w-12 p-0 m-0 border-0 rounded"
                />
                <input
                  type="text"
                  value={layer.textColor}
                  onChange={(e) =>
                    updateLayer(path, { ...layer, textColor: e.target.value })
                  }
                  className="border ml-1 p-1 w-full text-sm rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                Text Content
              </label>
              <input
                type="text"
                value={layer.text}
                onChange={(e) =>
                  updateLayer(path, { ...layer, text: e.target.value })
                }
                className="border p-1 w-full text-sm rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                  Font Size
                </label>
                <select
                  value={layer.fontSize}
                  onChange={(e) =>
                    updateLayer(path, {
                      ...layer,
                      fontSize: e.target.value as "normal" | "large",
                    })
                  }
                  className="border p-1 w-full text-sm rounded dark:bg-gray-700 dark:border-gray-600">
                  <option value="normal">Normal</option>
                  <option value="large">Large (18pt+)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                  Font Weight
                </label>
                <select
                  value={layer.fontWeight || "normal"}
                  onChange={(e) =>
                    updateLayer(path, {
                      ...layer,
                      fontWeight: e.target.value as "normal" | "bold",
                    })
                  }
                  className="border p-1 w-full text-sm rounded dark:bg-gray-700 dark:border-gray-600">
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => addChild(path)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors duration-200">
              <Plus size={14} /> Add Child Layer
            </button>
          </div>

          {layer.children && layer.children.length > 0 && (
            <div className="ml-4 mt-4 border-l-2 pl-4 border-gray-300 dark:border-gray-600">
              {layer.children.map((child, index) => (
                <LayerEditor
                  key={index}
                  layer={child}
                  path={[...path, index]}
                  updateLayer={updateLayer}
                  removeLayer={removeLayer}
                  addChild={addChild}
                  duplicateLayer={duplicateLayer}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
