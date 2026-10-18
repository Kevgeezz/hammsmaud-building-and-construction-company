(function () {
  "use strict";

  var backToTopButton = document.getElementById("backToTopBtn");

  if (!backToTopButton) {
    return;
  }

  function updateBackToTopVisibility() {
    backToTopButton.classList.toggle("visible", window.pageYOffset > 300);
  }

  backToTopButton.addEventListener("click", function () {
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  });

  window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
  updateBackToTopVisibility();
})();
