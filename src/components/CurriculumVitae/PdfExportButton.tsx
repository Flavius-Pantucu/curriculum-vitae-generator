import { Button } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function PdfExportButton() {
  const exportToPDF = () => {
    const element = document.getElementById("cv-content");
    if (!element) return;

    html2canvas(element, {
      scale: 3,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.5); // JPEG with compression
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("CV.pdf");
    });
  };

  return (
    <Button type="primary" onClick={exportToPDF} block>
      Export as PDF
    </Button>
  );
}
