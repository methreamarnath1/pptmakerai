
export interface Slide {
  title: string;
  content: string;
  notes?: string;
  imageUrl?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundImageCredit?: {
    name: string;
    url: string;
  };
  imageCredit?: {
    name: string;
    url: string;
  };
}

export interface ExportLayoutOptions {
  layoutPreference?: 'auto' | 'IMAGE_RIGHT' | 'IMAGE_LEFT' | 'IMAGE_TOP' | 'IMAGE_BOTTOM' | 'BULLETS_ONLY' | 'TEXT_ONLY';
}

export interface TextLayout {
  x: number;
  y: number;
  w: number | string;
  h: number | string;
  fontSize?: number;
}

export interface ImageLayout {
  path: string;
  x: number;
  y: number;
  w: number;
  h: number;
  sizing: {
    type: "contain" | "cover" | "crop";
    w: number;
    h: number;
  };
}

export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export interface TextProps {
  text: string;
  options?: {
    bullet?: boolean;
    [key: string]: any;
  };
}

export interface SlideTemplate {
  name: string;
  title: {
    x: number; 
    y: number;
    w: number;
    h: number;
    fontSize: number;
  };
  content: {
    x: number;
    y: number;
    w: number;
    h: number;
    fontSize: number;
  };
  image: {
    x: number;
    y: number;
    w: number;
    h: number;
  } | null;
}

export interface ExportOptions {
  format: 'pdf' | 'ppt' | 'images';
  layoutPreference?: string;
}
