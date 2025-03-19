
import pptxgen from 'pptxgenjs';

/**
 * Creates master slides for the presentation
 */
export function createMasterSlides(
  pptx: pptxgen, 
  primaryColor: string, 
  secondaryColor: string, 
  fontFamily: string
) {
  // Define master slide with basic branding
  pptx.defineSlideMaster({
    title: "MASTER_SLIDE",
    background: { color: secondaryColor },
    objects: [
      { line: { x: 0.5, y: 7.0, w: 9.0, h: 0, line: { color: primaryColor, width: 1 } } }
    ]
  });
  
  // Define title slide master (optional)
  pptx.defineSlideMaster({
    title: "TITLE_SLIDE",
    background: { color: secondaryColor },
    objects: [
      { rect: { x: 0, y: 0, w: '100%', h: 0.5, fill: { color: primaryColor } } },
      { line: { x: 0.5, y: 7.0, w: 9.0, h: 0, line: { color: primaryColor, width: 1 } } }
    ]
  });
}

/**
 * Adds a dark overlay to background images
 */
export function addBackgroundOverlay(pptxSlide: pptxgen.Slide) {
  pptxSlide.addShape('rect', {
    x: 0, 
    y: 0, 
    w: '100%', 
    h: '100%',
    fill: { color: '000000', transparency: 75 }
  });
}
