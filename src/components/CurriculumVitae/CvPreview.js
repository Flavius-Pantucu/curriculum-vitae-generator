import { SidebarSection } from "./SidebarSection";
import { MainSection } from "./MainSection";

export const CvPreview = (props) => {
  return (
    <div className="mx-auto bg-white shadow w-[794px] h-[1123px]">
      <div className="flex flex-row items-center w-full h-full" id="cv-content">
        <SidebarSection {...props} />
        <MainSection {...props} />
      </div>
    </div>
  );
};
