import { SidebarSection } from "./SidebarSection";
import { MainSection } from "./MainSection";
import { useState, useEffect } from "react";

export const CvPreview = (props) => {
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;
  const PADDING_TOP = 64;
  const XL_BREAKPOINT = 1280;

  const [scale, setScale] = useState(1);
  const [shouldScale, setShouldScale] = useState(false);

  const calculateScale = () => {
    const width = document.documentElement.clientWidth;
    setShouldScale(width > XL_BREAKPOINT);

    if (width > XL_BREAKPOINT) {
      const newScale = Math.min(
        1,
        Math.min(
          width / A4_WIDTH,
          (document.documentElement.clientHeight - PADDING_TOP) / A4_HEIGHT
        )
      );
      setScale(newScale);
    } else {
      setScale(1);
    }
  };

  useEffect(() => {
    calculateScale();
    window.addEventListener("resize", calculateScale);

    return () => {
      window.removeEventListener("resize", calculateScale);
    };
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center overflow-auto lg:overflow-hidden">
      <div
        className="bg-white shadow w-[794px] h-[1123px] origin-center"
        style={shouldScale ? { transform: `scale(${scale})` } : undefined}
      >
        <div
          className="flex flex-row items-center w-full h-full"
          id="cv-content"
        >
          <SidebarSection {...props} />
          <MainSection {...props} />
        </div>
      </div>
    </div>
  );
};
