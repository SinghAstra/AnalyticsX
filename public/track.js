// This script is designed to be embedded in a client's website to track page views and user interactions.

(() => {
  const API_ENDPOINT = "http://localhost:3000/api/track/page-view";
  // Constants for session and user management in localStorage
  const SESSION_ID_KEY = "analytics_session_id";
  const SESSION_EXPIRY_KEY = "analytics_session_expiry";
  const USER_ID_KEY = "analytics_user_id";
  const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes of inactivity

  function generateUniqueId() {
    return crypto.randomUUID();
  }

  function getTrackingId() {
    // Find the current script tag that loaded this file
    const script = document.currentScript;
    if (script) {
      return script.dataset.trackingId || null;
    }
    // Fallback if document.currentScript is not reliable (e.g., deferred scripts)
    // This iterates through all scripts to find one with a data-tracking-id
    const scripts = document.querySelectorAll("script[data-tracking-id]");
    if (scripts.length > 0) {
      return scripts[0].dataset.trackingId || null;
    }
    console.warn(
      "Analytics: Could not find tracking ID. Make sure the script tag has a data-tracking-id attribute."
    );
    return null;
  }

  /**
   * Manages the session ID. Generates a new one if none exists or if the previous one expired.
   * Updates the session expiry timestamp on each call.
   * @returns {string} The current session ID.
   */
  function getSessionId() {
    let sessionId = localStorage.getItem(SESSION_ID_KEY);
    const sessionExpiry = localStorage.getItem(SESSION_EXPIRY_KEY);
    const now = Date.now();

    // If no session ID, or session expired, generate a new one
    if (
      !sessionId ||
      !sessionExpiry ||
      now > Number.parseInt(sessionExpiry, 10)
    ) {
      sessionId = generateUniqueId();
      console.log("Analytics: New session started:", sessionId);
    }

    // Update session expiry
    localStorage.setItem(SESSION_ID_KEY, sessionId);
    localStorage.setItem(
      SESSION_EXPIRY_KEY,
      (now + SESSION_TIMEOUT_MS).toString()
    );
    return sessionId;
  }

  /**
   * Manages the user ID. Generates a new one if none exists, otherwise retrieves the existing one.
   * This ID persists across sessions.
   * @returns {string} The current user ID.
   */
  function getUserId() {
    let userId = localStorage.getItem(USER_ID_KEY);
    if (!userId) {
      userId = generateUniqueId();
      localStorage.setItem(USER_ID_KEY, userId);
      console.log("Analytics: New user identified:", userId);
    }
    return userId;
  }

  /**
   * Sends page view data to the analytics API endpoint.
   * @param {object} data - The data to send, including URL, title, referrer, etc.
   */
  async function sendPageView(data) {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error(
          "Analytics: Failed to send page view data:",
          response.statusText
        );
      } else {
        console.log("Analytics: Page view sent successfully.", data.url);
      }
    } catch (error) {
      console.error("Analytics: Error sending page view data.");
      if (error instanceof Error) {
        console.log("error.stack is ", error.stack);
        console.log("error.message is ", error.message);
      }
    }
  }

  /**
   * Collects page view data and sends it to the API.
   */
  function trackPageView() {
    // Ensure the script is running in a browser environment
    if (typeof window === "undefined") {
      return;
    }

    const trackingId = getTrackingId();
    if (!trackingId) {
      console.warn("Analytics: Page view not tracked. No tracking ID found.");
      return;
    }

    const sessionId = getSessionId();
    const userId = getUserId();

    const data = {
      trackingId: trackingId,
      url: window.location.href,
      title: document.title,
      referrer: document.referrer,
      sessionId: sessionId,
      userId: userId,
    };

    sendPageView(data);
  }

  // --- Page View Detection Logic ---

  // 1. Initial page load
  // Use 'DOMContentLoaded' for faster execution, 'load' for full page resources.
  // 'load' is generally safer for analytics to ensure all elements are present.
  window.addEventListener("load", trackPageView);

  // 2. Browser navigation (back/forward buttons)
  window.addEventListener("popstate", trackPageView);

  // 3. Single-page application (SPA) navigation using history.pushState
  // We override the pushState method to track changes without full page reloads.
  const originalPushState = history.pushState;
  history.pushState = () => {
    originalPushState.apply(history, arguments); // Call the original pushState
    trackPageView(); // Then track the new page view
  };

  // 4. Hash changes (e.g., #section1, #about)
  window.addEventListener("hashchange", trackPageView);

  // Initial page view for cases where the script loads after 'load' event (e.g., dynamically injected)
  // Or if the page is already loaded when the script runs.
  if (document.readyState === "complete") {
    trackPageView();
  }
})();
