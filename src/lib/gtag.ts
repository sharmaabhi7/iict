/**
 * Utility for Google Tag (gtag.js) event & conversion tracking.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Tracks a Google Ads conversion event.
 * @param sendTo Conversion label identifier string (e.g. 'AW-18387756394/nJD6CJ_U7-scEOrK-79E')
 */
export const trackGtagConversion = (sendTo: string) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", { send_to: sendTo });
  } else {
    console.debug(`[Gtag] Conversion event triggered: ${sendTo}`);
  }
};

/**
 * Event snippet for Submit lead form conversion page
 */
export const trackLeadFormConversion = () => {
  trackGtagConversion("AW-18387756394/nJD6CJ_U7-scEOrK-79E");
};

/**
 * Event snippet for Contact / Call conversion page
 */
export const trackCallConversion = () => {
  trackGtagConversion("AW-18387756394/EaolCPOd5OscEOrK-79E");
};

/**
 * Event snippet for WhatsApp Button conversion page
 */
export const trackWhatsAppConversion = () => {
  trackGtagConversion("AW-18387756394/7bdxCPWo5OscEOrK-79E");
};
