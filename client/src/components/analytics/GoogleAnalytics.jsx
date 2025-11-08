import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, trackPageView } from "../../hooks/useGoogleAnalytics";

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA
    initGA();
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (typeof window.gtag === "function") {
      trackPageView(document.title, location.pathname);
    }
  }, [location]);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;
