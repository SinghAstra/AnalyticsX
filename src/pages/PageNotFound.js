import React, { useEffect } from "react";
import "../styles/PageNotFound.css";

const PageNotFound = () => {
  useEffect(() => {
    document.title = `Page not found • Social UI 2.0`;
  }, []);

  return (
    <div className="page-not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
};

export default PageNotFound;
