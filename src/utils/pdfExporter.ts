
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';
import { hexToRgb } from './exportHelpers';
import { Slide } from './exportTypes';
import { cleanMarkdownForExport } from './markdownParser';

export const exportToPdf = async (
  slides: Slide[], 
  title: string, 
  template: any | null, 
  theme: string
): Promise<boolean> => {
  try {
    if (!slides || slides.length === 0) {
      toast.error('No slides to export');
      return false;
    }
    
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    for (let i = 0; i < slides.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }
      
      const slide = slides[i];
      
      const cleanTitle = cleanMarkdownForExport(slide.title);
      const cleanContent = cleanMarkdownForExport(slide.content);
      
      const bgColor = slide.backgroundColor || (template ? template.secondaryColor : '#f8fafc');
      pdf.setFillColor(hexToRgb(bgColor).r, hexToRgb(bgColor).g, hexToRgb(bgColor).b);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      
      const titleColor = template ? template.primaryColor : '#3b82f6';
      pdf.setTextColor(hexToRgb(titleColor).r, hexToRgb(titleColor).g, hexToRgb(titleColor).b);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(24);
      pdf.text(cleanTitle, 20, 30);
      
      const contentColor = theme === 'dark' ? '#FFFFFF' : '#333333';
      pdf.setTextColor(hexToRgb(contentColor).r, hexToRgb(contentColor).g, hexToRgb(contentColor).b);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(16);
      
      const contentLines = pdf.splitTextToSize(cleanContent, pageWidth - 40);
      pdf.text(contentLines, 20, 50);
      
      if (slide.imageUrl) {
        try {
          const imgData = slide.imageUrl;
          pdf.addImage(imgData, 'JPEG', pageWidth - 80, 50, 60, 40);
        } catch (error) {
          console.error('Error adding image to PDF:', error);
        }
      }
    }
    
    const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    pdf.save(`${safeTitle || 'presentation'}.pdf`);
    return true;
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    toast.error('Failed to export presentation as PDF');
    return false;
  }
};
