import React from "react";

export function GridSmallBackground() {
  return (
    <div className="w-full h-full absolute" style={{ zIndex: -1 }}>
      <div className="w-full h-full  bg-grid-small-white/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </div>
  );
}
