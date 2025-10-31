import { SidebarSection } from "./SidebarSection";
import { MainSection } from "./MainSection";
import { useState, useEffect } from "react";

export const CvPreview = (props) => {
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;
  const PADDING = 32;

  const [scale, setScale] = useState(1);

  const calculateScale = () => {
    const newScale = Math.min(
      1,
      Math.min(
        (document.documentElement.clientWidth - PADDING) / A4_WIDTH,
        (document.documentElement.clientHeight - PADDING) / A4_HEIGHT
      )
    );
    setScale(newScale);
  };

  useEffect(() => {
    calculateScale(); // Initial calculation
    window.addEventListener("resize", calculateScale);

    return () => {
      window.removeEventListener("resize", calculateScale);
    };
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center overflow-hidden">
      <div
        className="bg-white shadow"
        style={{
          width: `${A4_WIDTH}px`,
          height: `${A4_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center",
        }}
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
