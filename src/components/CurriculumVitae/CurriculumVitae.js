import { useCurriculumState } from "@data/hooks/useCurriculumState";
import { CvTabs } from "./CvTabs";
import { CvPreview } from "./CvPreview";

export const CurriculumVitae = () => {
  const state = useCurriculumState();

  return (
    <div className="w-full max-h-screen flex flex-row">
      <div className="flex-1 py-8 px-12 relative overflow-x-scroll">
        <CvTabs {...state} />
      </div>
      <div className="flex-1">
        <CvPreview {...state} />
      </div>
      <footer className="fixed bottom-2 right-1/2 transform translate-x-1/2 text-sm text-gray-400 pointer-events-none select-none">
        © 2025 Flavius Panțucu. All rights reserved.
      </footer>
    </div>
  );
};
