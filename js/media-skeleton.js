(function () {
  "use strict";

  function setImageState(image, state) {
    image.dataset.mediaState = state;

    if (state === "error" && !image.hasAttribute("title")) {
      image.title = "This image could not be loaded.";
    }
  }

  function trackImage(image) {
    if (image.dataset.mediaState || !image.getAttribute("src")) {
      return;
    }

    setImageState(image, "loading");
    image.addEventListener("load", function () {
      setImageState(image, "loaded");
    }, { once: true });
    image.addEventListener("error", function () {
      setImageState(image, "error");
    }, { once: true });

    if (image.complete) {
      setImageState(image, image.naturalWidth > 0 ? "loaded" : "error");
    }
  }

  function trackImagesWithin(node) {
    if (!(node instanceof Element)) {
      return;
    }

    if (node.matches("img")) {
      trackImage(node);
    }

    node.querySelectorAll("img").forEach(trackImage);
  }

  document.querySelectorAll("img").forEach(trackImage);

  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(trackImagesWithin);
    });
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
