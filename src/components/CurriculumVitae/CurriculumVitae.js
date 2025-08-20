import { useCurriculumState } from "./useCurriculumState";
import { CvTabs } from "./CvTabs";
import { CvPreview } from "./CvPreview";
import { PdfExportButton } from "./PdfExportButton";

export const CurriculumVitae = () => {
  const state = useCurriculumState();

  return (
    <div className="w-full min-h-screen flex flex-row">
      <div className="flex-1 p-12">
        <CvTabs {...state} />
      </div>
      <div className="flex-1 relative">
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <CvPreview {...state} />
          <div className="absolute bottom-6 right-1/2 transform translate-x-1/2">
            <PdfExportButton />
          </div>
        </div>
      </div>
      <footer className="fixed bottom-2 right-1/2 transform translate-x-1/2 text-sm text-gray-400 pointer-events-none select-none">
        © 2025 Flavius Panțucu. All rights reserved.
      </footer>
    </div>
  );
};
