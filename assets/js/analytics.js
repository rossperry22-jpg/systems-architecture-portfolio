(function () {
  const storageKey = "ross-portfolio-analytics";

  function readStore() {
    try {
      return JSON.parse(window.localStorage.getItem(storageKey) || "{}");
    } catch (error) {
      return {};
    }
  }

  function writeStore(store) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(store));
    } catch (error) {
      // Ignore storage failures.
    }
  }

  function track(eventName) {
    const store = readStore();
    store[eventName] = (store[eventName] || 0) + 1;
    store.lastSeen = new Date().toISOString();
    writeStore(store);
  }

  window.portfolioAnalytics = { track };
  track("page_view");
}());
