import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = (import.meta as any).env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    console.log("GA initialized");
  } else {
    console.warn("GA Measurement ID not found. Analytics disabled.");
  }
};

export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

export const trackSectionView = (sectionName: string) => {
  ReactGA.event({
    category: "Section",
    action: "View",
    label: sectionName,
  });
};

export const trackCTAClick = (ctaName: string) => {
  ReactGA.event({
    category: "CTA",
    action: "Click",
    label: ctaName,
  });
};
