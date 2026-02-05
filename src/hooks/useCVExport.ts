import { useCallback } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const useCVExport = () => {
  const exportToPDF = useCallback(async (filename: string = 'resume.pdf') => {
    const element = document.getElementById('cv-preview');
    if (!element) {
      alert('Preview element not found');
      return;
    }

    try {
      // Find the actual CV template inside the preview
      const cvTemplate = element.querySelector('div > div') as HTMLElement;
      if (!cvTemplate) {
        alert('CV template not found');
        return;
      }

      // Temporarily reset the scale for export
      const originalTransform = cvTemplate.style.transform;
      cvTemplate.style.transform = 'scale(1)';

      // Create canvas from the element
      const canvas = await html2canvas(cvTemplate, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Restore original transform
      cvTemplate.style.transform = originalTransform;

      // A4 dimensions in mm
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  }, []);

  const exportToPNG = useCallback(async (filename: string = 'resume.png') => {
    const element = document.getElementById('cv-preview');
    if (!element) {
      alert('Preview element not found');
      return;
    }

    try {
      const cvTemplate = element.querySelector('div > div') as HTMLElement;
      if (!cvTemplate) {
        alert('CV template not found');
        return;
      }

      const originalTransform = cvTemplate.style.transform;
      cvTemplate.style.transform = 'scale(1)';

      const canvas = await html2canvas(cvTemplate, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      cvTemplate.style.transform = originalTransform;

      // Convert to PNG and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = filename;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error generating PNG:', error);
      alert('Failed to generate PNG. Please try again.');
    }
  }, []);

  const printCV = useCallback(() => {
    const element = document.getElementById('cv-preview');
    if (!element) {
      alert('Preview element not found');
      return;
    }

    const cvTemplate = element.querySelector('div > div') as HTMLElement;
    if (!cvTemplate) {
      alert('CV template not found');
      return;
    }

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups for printing');
      return;
    }

    // Clone the template
    const clonedContent = cvTemplate.cloneNode(true) as HTMLElement;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Resume</title>
          <style>
            @media print {
              @page {
                size: A4;
                margin: 0;
              }
              body {
                margin: 0;
                padding: 0;
              }
            }
            body {
              margin: 0;
              padding: 0;
            }
            ${document.head.innerHTML}
          </style>
        </head>
        <body>
          ${clonedContent.outerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    
    // Wait for content to load, then print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  }, []);

  return {
    exportToPDF,
    exportToPNG,
    printCV,
  };
};
