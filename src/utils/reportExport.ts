import { calculateContrastRatio } from './colorUtils';

interface Layer {
  name?: string;
  bgColor?: string;
  text?: string;
  textColor?: string;
  fontSize?: string;
  fontWeight?: string;
  children?: Layer[];
}

interface Stats {
  totalLayers: number;
  layersWithText: number;
  aaCompliant: number;
  aaaCompliant: number;
}

// Helper function to generate a comprehensive report
function generateReportContent(layers: Layer, parentBgColors: string[] = [], path = ''): string {
  const allBgColors: string[] = [...parentBgColors, layers.bgColor || ''];
  const effectiveBgColor = layers.bgColor || "#ffffff";

  let content = '';

  const layerName = layers.name || `Layer ${path || 'Root'}`;
  const layerPath = path ? path : 'Root';

  content += `## ${layerName} (${layerPath})\n\n`;
  content += `- Background Color: ${layers.bgColor || 'N/A'}\n`;

  if (layers.text) {
    const contrastRatio = calculateContrastRatio(layers.textColor || '#000000', effectiveBgColor);
    const isLargeText = layers.fontSize === "large" || layers.fontWeight === "bold";

    const aaPass = isLargeText ? contrastRatio >= 3 : contrastRatio >= 4.5;
    const aaaPass = isLargeText ? contrastRatio >= 4.5 : contrastRatio >= 7;

    content += `- Text: "${layers.text}"\n`;
    content += `- Text Color: ${layers.textColor || 'N/A'}\n`;
    content += `- Font Size: ${layers.fontSize || 'normal'}\n`;
    content += `- Font Weight: ${layers.fontWeight || 'normal'}\n`;
    content += `- Contrast Ratio: ${contrastRatio.toFixed(2)}:1\n`;
    content += `- AA Compliance (${isLargeText ? 'Large Text' : 'Normal Text'}): ${aaPass ? '✅ Pass' : '❌ Fail'}\n`;
    content += `- AAA Compliance (${isLargeText ? 'Large Text' : 'Normal Text'}): ${aaaPass ? '✅ Pass' : '❌ Fail'}\n`;
  }

  content += '\n';

  if (layers.children && layers.children.length > 0) {
    layers.children.forEach((child, index) => {
      const childPath = path ? `${path}.${index}` : `${index}`;
      content += generateReportContent(child, allBgColors, childPath);
    });
  }

  return content;
}

// Function to export the contrast report
export function exportContrastReport(layers: Layer): void {
  let report = '# Color Contrast Analysis Report\n\n';
  report += `Generated: ${new Date().toLocaleString()}\n\n`;
  report += '## Summary\n\n';

  const stats = calculateStatistics(layers);
  report += `- Total Layers: ${stats.totalLayers}\n`;
  report += `- Layers with Text: ${stats.layersWithText}\n`;
  report += `- AA Compliant: ${stats.aaCompliant} (${Math.round(stats.aaCompliant / stats.layersWithText * 100 || 0)}%)\n`;
  report += `- AAA Compliant: ${stats.aaaCompliant} (${Math.round(stats.aaaCompliant / stats.layersWithText * 100 || 0)}%)\n\n`;

  report += '## Detailed Analysis\n\n';
  report += generateReportContent(layers);

  report += '## WCAG 2.1 Guidelines\n\n';
  report += '| Compliance Level | Normal Text | Large Text |\n';
  report += '|------------------|-------------|------------|\n';
  report += '| AA               | ≥ 4.5:1     | ≥ 3:1      |\n';
  report += '| AAA              | ≥ 7:1       | ≥ 4.5:1    |\n\n';
  report += 'Large text is defined as bold text at least 14 point (18.6px) or regular text at least 18 point (24px).\n';

  const blob = new Blob([report], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'contrast-report.md';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Helper function to calculate overall statistics
function calculateStatistics(layers: Layer): Stats {
  const stats: Stats = {
    totalLayers: 0,
    layersWithText: 0,
    aaCompliant: 0,
    aaaCompliant: 0
  };

  function processLayer(layer: Layer, parentBgColors: string[] = []): void {
    stats.totalLayers++;

    const allBgColors: string[] = [...parentBgColors, layer.bgColor || ''];
    const effectiveBgColor = layer.bgColor || "#ffffff";

    if (layer.text) {
      stats.layersWithText++;
      const contrastRatio = calculateContrastRatio(layer.textColor || '#000000', effectiveBgColor);
      const isLargeText = layer.fontSize === "large" || layer.fontWeight === "bold";

      if ((isLargeText && contrastRatio >= 3) || (!isLargeText && contrastRatio >= 4.5)) {
        stats.aaCompliant++;
      }

      if ((isLargeText && contrastRatio >= 4.5) || (!isLargeText && contrastRatio >= 7)) {
        stats.aaaCompliant++;
      }
    }

    if (layer.children && layer.children.length > 0) {
      layer.children.forEach(child => processLayer(child, allBgColors));
    }
  }

  processLayer(layers);
  return stats;
}
