import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Your GA4 Measurement ID (replace with your actual ID)
export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // ⚠️ REPLACE THIS WITH YOUR ACTUAL ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== "undefined" && !window.gtag) {
    // Add gtag script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });

    console.log("✅ Google Analytics initialized");
  }
};

// Track page views
export const trackPageView = (title, path) => {
  if (typeof window.gtag === "function") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_title: title,
      page_location: window.location.origin + path,
      page_path: path,
    });
    console.log("📊 Page view tracked:", title, path);
  }
};

// Track custom events
export const trackEvent = (action, category, label, value = null) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
    console.log("🎯 Event tracked:", action, category, label);
  }
};

// Hook to track page views
export const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA on first load
    initGA();
  }, []);

  useEffect(() => {
    // Track page view on route change
    if (typeof window.gtag === "function") {
      trackPageView(document.title, location.pathname + location.search);
    }
  }, [location]);
};
