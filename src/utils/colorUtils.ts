export function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrastRatio(l1: number, l2: number): number {
  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (light + 0.05) / (dark + 0.05);
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): RGB {
  if (!hex) return { r: 255, g: 255, b: 255 };

  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 255, g: 255, b: 255 };

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

export function getLuminanceFromHex(hex: string): number {
  const rgb = hexToRgb(hex);
  return getLuminance(rgb.r, rgb.g, rgb.b);
}

export function calculateContrastRatio(foregroundColor: string, backgroundColor: string): number {
  const fgLuminance = getLuminanceFromHex(foregroundColor);
  const bgLuminance = getLuminanceFromHex(backgroundColor);
  return getContrastRatio(fgLuminance, bgLuminance);
}
