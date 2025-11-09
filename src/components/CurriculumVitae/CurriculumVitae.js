import { useCurriculumState } from "@data/hooks/useCurriculumState";
import { CvTabs } from "./CvTabs";
import { CvPreview } from "./CvPreview";

export const CurriculumVitae = () => {
  const state = useCurriculumState();

  return (
    <div className="w-full h-screen flex flex-col xl:flex-row">
      <div className="xl:flex-1 py-4 xl:py-8 px-4 xl:px-12 overflow-auto">
        <CvTabs {...state} />
      </div>
      <div className="hidden xl:block xl:flex-1 xl:py-0">
        <CvPreview {...state} />
      </div>
      <footer className="text-center text-sm text-gray-400 pointer-events-none select-none fixed bottom-2 right-1/2 transform translate-x-1/2">
        © 2025 Flavius Panțucu. All rights reserved.
      </footer>
    </div>
  );
};
