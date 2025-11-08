import React from "react";
import { useSEO } from "../../hooks/useSEO";

const SEO = (props) => {
  useSEO(props);
  return null; // This component doesn't render anything
};

export default SEO;
