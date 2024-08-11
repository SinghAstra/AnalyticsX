// Responsive.js
import React, { useEffect, useState } from "react";
import "../styles/Responsive.css";

const Responsive = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to update width
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container">
      <p className="text">{`${width}px`}</p>
    </div>
  );
};

export default Responsive;
