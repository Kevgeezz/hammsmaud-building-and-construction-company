(function($) {

    "use strict";

      var initScrollNav = function() {
        var scroll = $(window).scrollTop();
        $('#header-nav').toggleClass("scrolled", scroll > 10);
      };

      initScrollNav();
      $(window).scroll(initScrollNav);

        $(document).ready(function() {   




             var swiper = new Swiper(".team-swiper", {
                slidesPerView: 3,
                spaceBetween: 30,
                freeMode: true,
                navigation: {
                  nextEl: ".icon-arrow-right",
                  prevEl: ".icon-arrow-left",
                },
                breakpoints: {
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  767: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1299: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                },
              });

              var swiper = new Swiper(".review-swiper", {
                slidesPerView: 3,
                spaceBetween: 30,
                pagination: {
                  el: ".swiper-pagination",
                  clickable: true,
                },
                breakpoints: {
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  767: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1299: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                },
              });
              
              AOS.init({
                duration: 2500,
                once: false,
                mirror: true,
            })

            var projectPills = document.querySelector(".project-pills");
            if (projectPills && "IntersectionObserver" in window) {
              projectPills.classList.add("project-pills-reveal-ready");
              var projectPillObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                  entry.target.classList.toggle("is-visible", entry.isIntersecting);
                });
              }, {
                threshold: 0.1,
              });

              projectPills.querySelectorAll(".project-pill-reveal").forEach(function(pill) {
                var delay = Number(pill.getAttribute("data-pill-delay")) || 0;
                pill.style.setProperty("--pill-reveal-delay", delay + "ms");
                projectPillObserver.observe(pill);
              });
            }

            var achievementSection = document.querySelector("#our-achievement");
            var achievementNumbers = achievementSection
              ? achievementSection.querySelectorAll("[data-count-target]")
              : [];
            var achievementAnimationFrames = new WeakMap();

            function animateAchievementNumber(element) {
              var target = Number(element.getAttribute("data-count-target"));
              var duration = Number(element.getAttribute("data-count-duration")) || 2000;

              if (!Number.isFinite(target) || target < 0) {
                console.error("Invalid achievement counter target.", element);
                return;
              }

              if (achievementAnimationFrames.has(element)) {
                window.cancelAnimationFrame(achievementAnimationFrames.get(element));
                achievementAnimationFrames.delete(element);
              }

              if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                element.textContent = target.toLocaleString();
                element.classList.remove("is-counting");
                element.classList.add("is-settled");
                return;
              }

              var startTime;
              element.textContent = "0";
              element.classList.remove("is-settled");
              element.classList.add("is-counting");

              function updateCounter(timestamp) {
                if (startTime === undefined) {
                  startTime = timestamp;
                }

                var progress = Math.min((timestamp - startTime) / duration, 1);
                var easedProgress = 1 - Math.pow(1 - progress, 5);
                var currentValue = Math.round(target * easedProgress);
                element.textContent = currentValue.toLocaleString();

                if (progress < 1) {
                  achievementAnimationFrames.set(element, window.requestAnimationFrame(updateCounter));
                  return;
                }

                element.textContent = target.toLocaleString();
                achievementAnimationFrames.delete(element);
                element.classList.remove("is-counting");
                element.classList.add("is-settled");
              }

              achievementAnimationFrames.set(element, window.requestAnimationFrame(updateCounter));
            }

            if (achievementNumbers.length > 0) {
              if ("IntersectionObserver" in window) {
                var achievementObserver = new IntersectionObserver(function(entries) {
                  entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                      achievementNumbers.forEach(animateAchievementNumber);
                    }
                  });
                }, {
                  threshold: 0.3,
                });

                achievementObserver.observe(achievementSection);
              } else {
                achievementNumbers.forEach(animateAchievementNumber);
              }
            }

            var testimonialElement = document.querySelector(".testimonial-swiper");
            var testimonialSwiper;

            if (testimonialElement && typeof Swiper !== "undefined") {
              var testimonialMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
              var testimonialCounter = document.querySelector(".testimonial-carousel__count");

              testimonialSwiper = new Swiper(testimonialElement, {
                slidesPerView: 1,
                effect: "fade",
                fadeEffect: {
                  crossFade: true,
                },
                speed: 900,
                loop: true,
                autoplay: testimonialMotionPreference.matches
                  ? false
                  : {
                      delay: 6000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    },
                pagination: {
                  el: ".testimonial-pagination",
                  clickable: true,
                },
                navigation: {
                  nextEl: ".testimonial-next",
                  prevEl: ".testimonial-previous",
                },
                on: {
                  slideChange: function(swiper) {
                    if (testimonialCounter) {
                      var current = String(swiper.realIndex + 1).padStart(2, "0");
                      var total = String(testimonialElement.querySelectorAll(".testimonial-slide").length).padStart(2, "0");
                      testimonialCounter.textContent = current + " / " + total;
                    }
                  },
                },
              });

              testimonialElement.addEventListener("focusin", function() {
                if (testimonialSwiper.autoplay) {
                  testimonialSwiper.autoplay.stop();
                }
              });

              testimonialElement.addEventListener("focusout", function(event) {
                if (!testimonialMotionPreference.matches && !testimonialElement.contains(event.relatedTarget)) {
                  testimonialSwiper.autoplay.start();
                }
              });
            } else if (testimonialElement) {
              console.error("The testimonial carousel could not start because Swiper is unavailable.");
            }
      
            window.addEventListener("load", (event) => {
              //isotope
           $('.isotope-container').isotope({
             // options
             itemSelector: '.item',
             layoutMode: 'masonry'
             });
     
             
     
             // Initialize Isotope
             var $container = $('.isotope-container').isotope({
                 // options
                 itemSelector: '.item',
                 layoutMode: 'masonry'
             });
     
             $(document).ready(function() {
                 //active button
             $('.filter-button').click(function() {
                 $('.filter-button').removeClass('active');
                 $(this).addClass('active');
                 });
             });
             
             // Filter items on button click
             $('.filter-button').click(function() {
             var filterValue = $(this).attr('data-filter');
             if (filterValue === '*') {
             // Show all items
             $container.isotope({ filter: '*' });
             } else {
             // Show filtered items
             $container.isotope({ filter: filterValue });
             }
             });
     
           });

            // init jarallax parallax
            var initJarallax = function() {
              jarallax(document.querySelectorAll(".jarallax"));

              jarallax(document.querySelectorAll(".jarallax-img"), {
                keepImg: true,
              });
            }
            
            initJarallax();

            var projectGallery = document.querySelector("#projects");
            var lightbox = document.querySelector("#project-lightbox");

            if (projectGallery && lightbox && typeof lightbox.showModal === "function") {
              var lightboxImage = lightbox.querySelector(".project-lightbox__image");
              var lightboxTitle = lightbox.querySelector(".project-lightbox__title");
              var lightboxCount = lightbox.querySelector(".project-lightbox__count");
              var closeButton = lightbox.querySelector(".project-lightbox__close");
              var previousButton = lightbox.querySelector(".project-lightbox__previous");
              var nextButton = lightbox.querySelector(".project-lightbox__next");
              var activeImageIndex = 0;

              var getVisibleProjectImages = function() {
                return Array.prototype.filter.call(
                  projectGallery.querySelectorAll(".projects-content a"),
                  function(link) {
                    return window.getComputedStyle(link.closest(".item")).display !== "none";
                  }
                );
              };

              var showProjectImage = function(images, index) {
                activeImageIndex = (index + images.length) % images.length;
                var link = images[activeImageIndex];
                var image = link.querySelector("img");
                var title = link.closest(".item").querySelector("h4");

                lightboxImage.src = link.href;
                lightboxImage.alt = image.alt;
                lightboxTitle.textContent = title ? title.textContent.trim() : image.alt;
                lightboxCount.textContent = (activeImageIndex + 1) + " / " + images.length;
              };

              projectGallery.addEventListener("click", function(event) {
                var link = event.target.closest(".projects-content a");
                if (!link) {
                  return;
                }

                event.preventDefault();
                var images = getVisibleProjectImages();
                var imageIndex = images.indexOf(link);
                if (imageIndex === -1) {
                  return;
                }

                showProjectImage(images, imageIndex);
                lightbox.showModal();
                closeButton.focus();
              });

              previousButton.addEventListener("click", function() {
                showProjectImage(getVisibleProjectImages(), activeImageIndex - 1);
              });

              nextButton.addEventListener("click", function() {
                showProjectImage(getVisibleProjectImages(), activeImageIndex + 1);
              });

              closeButton.addEventListener("click", function() {
                lightbox.close();
              });

              lightbox.addEventListener("click", function(event) {
                if (event.target === lightbox) {
                  lightbox.close();
                }
              });

              lightbox.addEventListener("keydown", function(event) {
                if (event.key === "Escape") {
                  event.preventDefault();
                  lightbox.close();
                  return;
                }

                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                  event.preventDefault();
                  showProjectImage(
                    getVisibleProjectImages(),
                    activeImageIndex + (event.key === "ArrowRight" ? 1 : -1)
                  );
                }
              });
            }

        }); // End of a document


    })(jQuery);