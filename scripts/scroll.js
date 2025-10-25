// Save last clicked element by injecting a temporary marker
document.addEventListener("click", (e) => {
  const el = e.target;

  // Remove any previous marker
  document.querySelectorAll("[data-scroll-marker]").forEach(marker => {
    marker.removeAttribute("data-scroll-marker");
  });

  // Mark the clicked element
  el.setAttribute("data-scroll-marker", "true");
  sessionStorage.setItem("scrollMarker", "true");
});

// Restore scroll after full render
window.addEventListener("pageshow", (event) => {
  const navType = performance.getEntriesByType("navigation")[0].type;
  const isReloadOrBack = event.persisted || navType === "reload";
  const markerExists = sessionStorage.getItem("scrollMarker");

  if (isReloadOrBack && markerExists) {
    window.addEventListener("load", () => {
      if (!window.requestIdleCallback) {
        window.requestIdleCallback = (cb) => setTimeout(cb, 1);
      }

      requestIdleCallback(() => {
        const target = document.querySelector("[data-scroll-marker]");
        if (target) {
          target.scrollIntoView({ behavior: "auto", block: "center" });
        }
      });
    });
  } else {
    window.scrollTo(0, 0);
    sessionStorage.removeItem("scrollMarker");
  }
});
