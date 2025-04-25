'use client';

import { useEffect, useState } from "react";
import Header from "./Header";
import LayerEditor from "./LayerEditor";
import Preview from "./Preview";
import InfoPanel from "./InfoPanel";
import Footer from "./Footer";
import { initialLayerState } from "@/utils/initialState";
import { exportContrastReport } from "@/utils/reportExport";

// Define a Layer type
export interface Layer {
  bgColor: string;
  textColor: string;
  text: string;
  fontSize: "normal" | "large";
  fontWeight: "normal" | "bold";
  children: Layer[];
}

export default function ContrastCheckerApp() {
  const [layers, setLayers] = useState<Layer>(initialLayerState);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedLayers = localStorage.getItem('contrastCheckerLayers');
    if (savedLayers) {
      try {
        setLayers(JSON.parse(savedLayers));
      } catch (e) {
        console.error("Failed to load saved layers:", e);
      }
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contrastCheckerLayers', JSON.stringify(layers));
  }, [layers]);

  const updateLayer = (path: number[], newLayer: Layer) => {
    if (path.length === 0) {
      setLayers(newLayer);
      return;
    }

    const updateNestedLayer = (layer: Layer, currentPath: number[], pathIndex: number): Layer => {
      if (pathIndex === currentPath.length - 1) {
        const newChildren = [...layer.children];
        newChildren[currentPath[pathIndex]] = newLayer;
        return { ...layer, children: newChildren };
      }

      const newChildren = [...layer.children];
      newChildren[currentPath[pathIndex]] = updateNestedLayer(
        layer.children[currentPath[pathIndex]],
        currentPath,
        pathIndex + 1
      );
      return { ...layer, children: newChildren };
    };

    setLayers(updateNestedLayer(layers, path, 0));
  };

  const removeLayer = (path: number[]) => {
    if (path.length === 0) return;

    const removeNestedLayer = (layer: Layer, currentPath: number[], pathIndex: number): Layer => {
      if (pathIndex === currentPath.length - 1) {
        const newChildren = [...layer.children];
        newChildren.splice(currentPath[pathIndex], 1);
        return { ...layer, children: newChildren };
      }

      const newChildren = [...layer.children];
      newChildren[currentPath[pathIndex]] = removeNestedLayer(
        layer.children[currentPath[pathIndex]],
        currentPath,
        pathIndex + 1
      );
      return { ...layer, children: newChildren };
    };

    setLayers(removeNestedLayer(layers, path, 0));
  };

  const addChild = (path: number[]) => {
    const newChild: Layer = {
      bgColor: "#e0e0e0",
      textColor: "#222222",
      text: "New Layer Text",
      fontSize: "normal",
      fontWeight: "normal",
      children: []
    };

    if (path.length === 0) {
      setLayers({ ...layers, children: [...layers.children, newChild] });
      return;
    }

    const addNestedChild = (layer: Layer, currentPath: number[], pathIndex: number): Layer => {
      if (pathIndex === currentPath.length - 1) {
        const targetLayer = layer.children[currentPath[pathIndex]];
        const updatedChildren = [...(targetLayer.children || []), newChild];

        const newChildren = [...layer.children];
        newChildren[currentPath[pathIndex]] = {
          ...targetLayer,
          children: updatedChildren
        };

        return { ...layer, children: newChildren };
      }

      const newChildren = [...layer.children];
      newChildren[currentPath[pathIndex]] = addNestedChild(
        layer.children[currentPath[pathIndex]],
        currentPath,
        pathIndex + 1
      );
      return { ...layer, children: newChildren };
    };

    setLayers(addNestedChild(layers, path, 0));
  };

  const duplicateLayer = (path: number[]) => {
    if (path.length === 0) return;

    const getLayerAtPath = (layer: Layer, currentPath: number[], pathIndex: number): Layer => {
      if (pathIndex >= currentPath.length) return layer;
      return getLayerAtPath(layer.children[currentPath[pathIndex]], currentPath, pathIndex + 1);
    };

    const layerToDuplicate: Layer = getLayerAtPath(layers, path, 0);
    const duplicatedLayer: Layer = JSON.parse(JSON.stringify(layerToDuplicate));

    const parentPath = path.slice(0, -1);
    const siblingIndex = path[path.length - 1];

    const addSibling = (layer: Layer, currentPath: number[], pathIndex: number): Layer => {
      if (pathIndex === parentPath.length) {
        const newChildren = [...layer.children];
        newChildren.splice(siblingIndex + 1, 0, duplicatedLayer);
        return { ...layer, children: newChildren };
      }

      const newChildren = [...layer.children];
      newChildren[currentPath[pathIndex]] = addSibling(
        layer.children[currentPath[pathIndex]],
        currentPath,
        pathIndex + 1
      );
      return { ...layer, children: newChildren };
    };

    if (parentPath.length === 0) {
      const newChildren = [...layers.children];
      newChildren.splice(siblingIndex + 1, 0, duplicatedLayer);
      setLayers({ ...layers, children: newChildren });
    } else {
      setLayers(addSibling(layers, parentPath, 0));
    }
  };

  const resetLayers = () => {
    if (confirm("Are you sure you want to reset all layers to default?")) {
      setLayers(initialLayerState);
    }
  };

  const handleExportReport = () => {
    exportContrastReport(layers);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/2">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold dark:text-white">Layers Editor</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={resetLayers}
                      className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-3 py-1 rounded text-sm transition-colors duration-200"
                    >
                      Reset
                    </button>
                    <button
                      onClick={handleExportReport}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                    >
                      Export Report
                    </button>
                  </div>
                </div>
                <LayerEditor
                  layer={layers}
                  path={[]}
                  updateLayer={updateLayer}//<---error in this line
                  removeLayer={removeLayer}
                  addChild={addChild}
                  duplicateLayer={duplicateLayer}
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-200">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">Preview & Results</h2>
                <Preview layer={layers} isDarkMode={isDarkMode} />
                <InfoPanel isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
