import React from "react";
import { useParams } from "react-router-dom";

const Testing = () => {
  const { id } = useParams();
  return <div className="testing">Testing - {id}</div>;
};

export default Testing;
