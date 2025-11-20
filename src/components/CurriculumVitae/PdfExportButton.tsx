import { Button } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function PdfExportButton() {
  const exportToPDF = () => {
    const element = document.querySelector("#cv-content") as HTMLElement | null;
    if (!element) return;

    let scale = element.parentElement?.style.transform;
    element.parentElement!.style.transform = "scale(1)";

    html2canvas(element, {
      scale: 3,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1);
      const pdf = new jsPDF("p", "px", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("CV.pdf");
    });

    element.parentElement!.style.transform = scale || "";
  };

  return (
    <Button type="primary" onClick={exportToPDF} block>
      Export as PDF
    </Button>
  );
}
