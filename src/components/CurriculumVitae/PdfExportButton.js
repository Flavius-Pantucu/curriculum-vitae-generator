import { Button } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const PdfExportButton = () => {
  const exportToPDF = () => {
    const element = document.getElementById("cv-content");
    if (!element) return;

    html2canvas(element, {
      scale: 3,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    });
  };

  return (
    <Button color="green" variant="solid" onClick={exportToPDF}>
      Export as PDF
    </Button>
  );
};
