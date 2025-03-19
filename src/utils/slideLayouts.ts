
// Define layout templates for different slide types
import { SlideTemplate } from './exportTypes';

/**
 * Collection of slide layout templates
 */
export const slideLayouts: Record<string, SlideTemplate> = {
  IMAGE_RIGHT: {
    name: 'IMAGE_RIGHT',
    title: {
      x: 0.5,
      y: 0.5,
      w: 9.0,
      h: 0.8,
      fontSize: 32
    },
    content: {
      x: 0.5,
      y: 1.5,
      w: 5.5,
      h: 4.0,
      fontSize: 18
    },
    image: {
      x: 6.5,
      y: 1.8,
      w: 3.0,
      h: 3.6
    }
  },
  IMAGE_LEFT: {
    name: 'IMAGE_LEFT',
    title: {
      x: 0.5,
      y: 0.5,
      w: 9.0,
      h: 0.8,
      fontSize: 32
    },
    content: {
      x: 4.0,
      y: 1.5,
      w: 5.5,
      h: 4.0,
      fontSize: 18
    },
    image: {
      x: 0.5,
      y: 1.8,
      w: 3.0,
      h: 3.6
    }
  },
  IMAGE_TOP: {
    name: 'IMAGE_TOP',
    title: {
      x: 0.5,
      y: 0.5,
      w: 9.0,
      h: 0.8,
      fontSize: 32
    },
    content: {
      x: 0.5,
      y: 4.0,
      w: 9.0,
      h: 2.5,
      fontSize: 18
    },
    image: {
      x: 2.5,
      y: 1.5,
      w: 5.0,
      h: 2.3
    }
  },
  IMAGE_BOTTOM: {
    name: 'IMAGE_BOTTOM',
    title: {
      x: 0.5,
      y: 0.5,
      w: 9.0,
      h: 0.8,
      fontSize: 32
    },
    content: {
      x: 0.5,
      y: 1.5,
      w: 9.0,
      h: 2.5,
      fontSize: 18
    },
    image: {
      x: 2.5,
      y: 4.2,
      w: 5.0,
      h: 2.3
    }
  },
  TEXT_ONLY: {
    name: 'TEXT_ONLY',
    title: {
      x: 0.5,
      y: 0.5,
      w: 9.0,
      h: 0.8,
      fontSize: 32
    },
    content: {
      x: 0.5,
      y: 1.8,
      w: 9.0,
      h: 4.5,
      fontSize: 20
    },
    image: null
  },
  BULLETS_ONLY: {
    name: 'BULLETS_ONLY',
    title: {
      x: 0.5,
      y: 0.5,
      w: 9.0,
      h: 0.8,
      fontSize: 32
    },
    content: {
      x: 0.5,
      y: 1.8,
      w: 9.0,
      h: 4.5,
      fontSize: 20
    },
    image: null
  },
  TITLE_SLIDE: {
    name: 'TITLE_SLIDE',
    title: {
      x: 1.0,
      y: 2.5,
      w: 8.0,
      h: 1.5,
      fontSize: 44
    },
    content: {
      x: 1.0,
      y: 4.0,
      w: 8.0,
      h: 1.5,
      fontSize: 24
    },
    image: null
  }
};

/**
 * Get layout configuration based on layout name
 */
export const getLayoutConfig = (layoutName: string): SlideTemplate => {
  return slideLayouts[layoutName] || slideLayouts.TEXT_ONLY;
};

/**
 * Get slide shape type for background overlay
 */
export const getSlideShapeType = (): string => {
  return 'rect';
};
