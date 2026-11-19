(() => {
  const galleries = {
    architecturaldrawing: [
      {
        src: "images/architectural drawings.jpg",
        alt: "Architectural section drawing for a two-storey home",
        caption: "Ideas shaped into clear plans",
      },
      {
        src: "images/A1.jpg",
        alt: "Four exterior views of a contemporary home design",
        caption: "A home explored from every side",
      },
      {
        src: "images/A2.jpg",
        alt: "Exterior concept for a modern residence",
        caption: "A considered home, designed from every angle",
      },
      {
        src: "images/A3.jpg",
        alt: "Architectural concept for a warehouse building",
        caption: "Workspaces shaped around their purpose",
      },
      {
        src: "images/A4.jpg",
        alt: "Contemporary residential building with green accents",
        caption: "Modern forms, made for everyday living",
      },
      {
        src: "images/A5.jpg",
        alt: "Contemporary residential building with warm accents",
        caption: "Material and color in context",
      },
      {
        src: "images/A6.jpg",
        alt: "Modern home exterior with landscaped grounds",
        caption: "A complete vision, from plan to place",
      },
    ],
    buildingconstruction: [
      {
        src: "images/build.jpg",
        alt: "Building construction work on site",
        caption: "Thoughtfully coordinated on site",
      },
      {
        src: "images/BD1.jpg",
        alt: "Building construction project in progress",
        caption: "Coordinated work, with the details in mind",
      },
      {
        src: "images/BD2.jpg",
        alt: "Contemporary private residence under construction",
        caption: "A considered home, taking shape",
      },
      {
        src: "images/BD3.jpg",
        alt: "Building construction project exterior",
        caption: "Progress built on a clear plan",
      },
      {
        src: "images/BD4.jpg",
        alt: "Residential construction project",
        caption: "Careful work from ground to finish",
      },
      {
        src: "images/BD5.jpg",
        alt: "Completed building construction project",
        caption: "Built with purpose",
      },
    ],
    buildingrenovation: [
      {
        src: "images/renovation.jpg",
        alt: "Building renovation and improvement work",
        caption: "A fresh chapter for your property",
      },
      {
        src: "images/POP1.jpg",
        alt: "Building renovation project detail",
        caption: "Thoughtful updates for existing spaces",
      },
      {
        src: "images/POP2.jpg",
        alt: "Renovation work in progress",
        caption: "Making a familiar place work better",
      },
      {
        src: "images/POP3.jpg",
        alt: "Completed building renovation project",
        caption: "A refreshed space, ready for what comes next",
      },
    ],
    footballpitchconstruction: [
      {
        src: "images/pitch.jpg",
        alt: "Football pitch and sports facility",
        caption: "Made for the people who play",
      },
      {
        src: "images/FP5.jpg",
        alt: "Football pitch construction project",
        caption: "A strong foundation for play",
      },
      {
        src: "images/FP1.jpg",
        alt: "Sports pitch project view",
        caption: "Planned around the players and the site",
      },
      {
        src: "images/FP3.jpg",
        alt: "Football facility construction work",
        caption: "The game starts with the ground",
      },
      {
        src: "images/FP4.jpg",
        alt: "Football pitch facility project",
        caption: "Space for the whole team",
      },
      {
        src: "images/FP6.jpg",
        alt: "Sports facility project in progress",
        caption: "Built to bring people together",
      },
      {
        src: "images/FP7.jpg",
        alt: "Completed football pitch project",
        caption: "Ready for the next match",
      },
    ],
    landsurvey: [
      {
        src: "images/land survey.jpg",
        alt: "Land surveying and site measurement work",
        caption: "The right information to begin",
      },
      {
        src: "images/projects-item5.jpg",
        alt: "Contemporary building exterior in its site context",
        caption: "A closer look at the setting",
      },
    ],
    landscaping: [
      {
        src: "images/landscaping.jpg",
        alt: "Landscaping and outdoor space design",
        caption: "Outdoors, made more inviting",
      },
      {
        src: "images/LS1.jpg",
        alt: "Landscaping project with planting and garden paths",
        caption: "A setting shaped around the property",
      },
      {
        src: "images/LS2.jpg",
        alt: "Landscaping project detail",
        caption: "Green spaces planned for everyday use",
      },
      {
        src: "images/LS3.jpg",
        alt: "Completed landscaping project",
        caption: "A more welcoming approach",
      },
      {
        src: "images/LS4.jpg",
        alt: "Outdoor space and landscaping project",
        caption: "Room to pause and enjoy",
      },
      {
        src: "images/LS5.jpg",
        alt: "Landscaped residential outdoor area",
        caption: "Planting and paths in balance",
      },
      {
        src: "images/LS6.jpg",
        alt: "Landscaping project from another angle",
        caption: "The finishing touch outside",
      },
    ],
  };

  const gallery = document.querySelector("[data-service-gallery]");
  if (!gallery) {
    return;
  }

  const slides = galleries[gallery.dataset.serviceGallery];
  if (!slides || slides.length < 2) {
    return;
  }

  const image = gallery.querySelector("[data-service-gallery-image]");
  const count = gallery.querySelector("[data-service-gallery-count]");
  const caption = gallery.querySelector("[data-service-gallery-caption]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const changeDelay = reducedMotion.matches ? 0 : 260;
  let currentSlide = 0;
  let isLoading = false;
  let isHovered = false;
  let isFocused = false;
  let autoplayTimer;

  const showNextSlide = () => {
    window.clearTimeout(autoplayTimer);
    if (isLoading) {
      return;
    }

    isLoading = true;
    const nextSlide = (currentSlide + 1) % slides.length;
    const nextImage = new Image();
    nextImage.onload = () => {
      gallery.classList.add("is-changing");
      window.setTimeout(() => {
        image.src = slides[nextSlide].src;
        image.alt = slides[nextSlide].alt;
        count.textContent = String(nextSlide + 1).padStart(2, "0");
        caption.textContent = slides[nextSlide].caption;
        currentSlide = nextSlide;
        isLoading = false;
        gallery.classList.remove("is-changing");
        scheduleAutoplay();
      }, changeDelay);
    };
    nextImage.onerror = () => {
      isLoading = false;
      gallery.classList.remove("is-changing");
      scheduleAutoplay();
    };
    nextImage.src = slides[nextSlide].src;
  };

  const scheduleAutoplay = () => {
    window.clearTimeout(autoplayTimer);
    if (reducedMotion.matches || isHovered || isFocused || document.hidden) {
      return;
    }

    autoplayTimer = window.setTimeout(showNextSlide, 3200);
  };

  gallery.addEventListener("mouseenter", () => {
    isHovered = true;
    scheduleAutoplay();
  });
  gallery.addEventListener("mouseleave", () => {
    isHovered = false;
    scheduleAutoplay();
  });
  gallery.addEventListener("focusin", () => {
    isFocused = true;
    scheduleAutoplay();
  });
  gallery.addEventListener("focusout", (event) => {
    if (!gallery.contains(event.relatedTarget)) {
      isFocused = false;
      scheduleAutoplay();
    }
  });
  document.addEventListener("visibilitychange", scheduleAutoplay);
  reducedMotion.addEventListener("change", scheduleAutoplay);
  scheduleAutoplay();
})();
