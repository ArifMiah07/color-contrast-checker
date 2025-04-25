import { CheckCircle, XCircle } from "lucide-react";
import { calculateContrastRatio } from "../utils/colorUtils";

interface LayerType {
  name?: string;
  bgColor: string;
  textColor: string;
  text: string;
  fontSize: "normal" | "large";
  fontWeight?: "normal" | "bold";
  children?: LayerType[];
}

interface ContrastBadgeProps {
  ratio: number;
  isLargeText: boolean;
  isDarkMode: boolean;
}

function ContrastBadge({ ratio, isLargeText, isDarkMode }: ContrastBadgeProps) {
  const aaPass = isLargeText ? ratio >= 3 : ratio >= 4.5;
  const aaaPass = isLargeText ? ratio >= 4.5 : ratio >= 7;
  console.log(isDarkMode);
  return (
    <div className="flex flex-col gap-1 ml-2">
      <div className="flex items-center">
        {aaPass ? (
          <CheckCircle className="text-green-500 w-4 h-4 mr-1" />
        ) : (
          <XCircle className="text-red-500 w-4 h-4 mr-1" />
        )}
        <span className={`text-xs ${aaPass ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
          AA {isLargeText ? "(Large)" : ""}
        </span>
      </div>
      <div className="flex items-center">
        {aaaPass ? (
          <CheckCircle className="text-green-500 w-4 h-4 mr-1" />
        ) : (
          <XCircle className="text-red-500 w-4 h-4 mr-1" />
        )}
        <span className={`text-xs ${aaaPass ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
          AAA {isLargeText ? "(Large)" : ""}
        </span>
      </div>
    </div>
  );
}

interface PreviewLayerProps {
  layer: LayerType;
  parentBgColors?: string[];
  isDarkMode: boolean;
}

function PreviewLayer({ layer, parentBgColors = [], isDarkMode }: PreviewLayerProps) {
  const allBgColors = [...parentBgColors, layer.bgColor];
  const effectiveBgColor = layer.bgColor || (isDarkMode ? "#1f2937" : "#ffffff");
  const contrastRatio = calculateContrastRatio(layer.textColor, effectiveBgColor);
  const isLargeText = layer.fontSize === "large" || layer.fontWeight === "bold";

  return (
    <div
      className="rounded p-4 mb-2"
      style={{ 
        backgroundColor: effectiveBgColor,
        position: "relative"
      }}
    >
      {layer.text && (
        <div className="mb-4 flex items-start justify-between">
          <p 
            className={`${isLargeText ? "text-xl font-bold" : "text-base"} ${layer.fontWeight === "bold" ? "font-bold" : "font-normal"}`}
            style={{ color: layer.textColor }}
          >
            {layer.text}
          </p>
          <div className="flex flex-col ml-2 bg-white dark:bg-gray-800 p-2 rounded shadow-sm">
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Contrast: {contrastRatio.toFixed(2)}:1
            </span>
            <ContrastBadge ratio={contrastRatio} isLargeText={isLargeText} isDarkMode={isDarkMode} />
          </div>
        </div>
      )}
      
      {layer.children && layer.children.map((child, index) => (
        <div key={index} className="ml-2">
          <PreviewLayer
            layer={child}
            parentBgColors={allBgColors}
            isDarkMode={isDarkMode}
          />
        </div>
      ))}
    </div>
  );
}

interface PreviewProps {
  layer: LayerType;
  isDarkMode: boolean;
}

export default function Preview({ layer, isDarkMode }: PreviewProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 mb-4 transition-colors duration-200">
      <PreviewLayer layer={layer} isDarkMode={isDarkMode} />
    </div>
  );
}
