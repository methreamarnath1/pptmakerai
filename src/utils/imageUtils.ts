
/**
 * Converts a hex color to RGB
 */
export const hexToRgb = (hex: string) => {
  // Default to black if invalid hex
  if (!hex || !/^#[0-9A-F]{6}$/i.test(hex)) {
    return { r: 0, g: 0, b: 0 };
  }

  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return { r, g, b };
};

/**
 * Converts a data URL to a Blob
 */
export const dataURLToBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
};

/**
 * Gets the appropriate slide shape for overlay
 */
export const getSlideShapeType = (): string => {
  return 'rect';
};
