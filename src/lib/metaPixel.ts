/**
 * Utility for Facebook Meta Pixel tracking in React SPA.
 */

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

/**
 * Tracks a standard or custom Meta Pixel event.
 * @param eventName Name of the event (e.g., 'PageView', 'Lead', 'Contact', 'SubmitApplication')
 * @param options Additional properties to send with the event
 */
export const trackPixelEvent = (eventName: string, options?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, options);
  } else {
    console.debug(`[Meta Pixel] Event tracked (pixel script not loaded yet): ${eventName}`, options);
  }
};
