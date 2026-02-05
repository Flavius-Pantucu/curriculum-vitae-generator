import React, { useState } from "react";
import { Download, FileText, Image as ImageIcon, Printer, Loader2 } from "lucide-react";
import { useCVExport } from "../hooks/useCVExport";

export const ExportButtons: React.FC = () => {
    const { exportToPDF, exportToPNG, printCV } = useCVExport();
    const [isExporting, setIsExporting] = useState(false);

    const handleExportPDF = async () => {
        setIsExporting(true);
        try {
            await exportToPDF();
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportPNG = async () => {
        setIsExporting(true);
        try {
            await exportToPNG();
        } finally {
            setIsExporting(false);
        }
    };

    const handlePrint = () => {
        printCV();
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleExportPDF}
                disabled={isExporting}
                data-action="export-pdf"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                Export PDF
            </button>

            <button
                onClick={handleExportPNG}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                Export PNG
            </button>

            <button
                onClick={handlePrint}
                data-action="print"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
                <Printer className="w-4 h-4" />
                Print
            </button>
        </div>
    );
};
