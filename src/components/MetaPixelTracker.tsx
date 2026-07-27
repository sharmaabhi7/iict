import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPixelEvent } from "@/lib/metaPixel";

export function MetaPixelTracker() {
  const location = useLocation();

  useEffect(() => {
    // Trigger standard PageView tracking on route changes
    trackPixelEvent("PageView");
  }, [location.pathname, location.search]);

  return null;
}
