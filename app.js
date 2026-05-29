document.documentElement.classList.add("js");
const burger = document.querySelector("#burger");
const nav = document.querySelector("#nav");
const navLinks = document.querySelectorAll(".nav a");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    nav.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});
const eventsTrack = document.querySelector("#eventsTrack");
const eventCards = document.querySelectorAll(".event-card");
const eventsPrev = document.querySelector(".events-prev");
const eventsNext = document.querySelector(".events-next");

let eventIndex = 0;

function getEventsPerView() {
  return window.innerWidth <= 980 ? 1 : 3;
}

function updateEventsSlider() {
  if (!eventsTrack || !eventCards.length) return;

  const perView = getEventsPerView();
  const maxIndex = Math.max(eventCards.length - perView, 0);
  eventIndex = Math.min(eventIndex, maxIndex);

  const gap = window.innerWidth <= 980 ? 18 : 28;
  const cardWidth = eventCards[0].getBoundingClientRect().width;

  eventsTrack.style.transform = `translateX(-${eventIndex * (cardWidth + gap)}px)`;
}

eventsNext?.addEventListener("click", () => {
  const perView = getEventsPerView();
  const maxIndex = Math.max(eventCards.length - perView, 0);
  eventIndex = eventIndex >= maxIndex ? 0 : eventIndex + 1;
  updateEventsSlider();
});

eventsPrev?.addEventListener("click", () => {
  const perView = getEventsPerView();
  const maxIndex = Math.max(eventCards.length - perView, 0);
  eventIndex = eventIndex <= 0 ? maxIndex : eventIndex - 1;
  updateEventsSlider();
});

window.addEventListener("resize", updateEventsSlider);
updateEventsSlider();

const galleryStrip = document.querySelector(".gallery-strip");
const galleryTrack = document.querySelector(".gallery-strip-track");

if (galleryStrip && galleryTrack) {
  let galleryX = 0;
  let speed = 0.45;
  let rafId;
  let isPaused = false;

  function getLoopWidth() {
    return galleryTrack.scrollWidth / 2;
  }

  function animateGallery() {
    if (!isPaused) {
      galleryX -= speed;

      if (Math.abs(galleryX) >= getLoopWidth()) {
        galleryX = 0;
      }

      galleryTrack.style.transform = `translate3d(${galleryX}px, 0, 0)`;
    }

    rafId = requestAnimationFrame(animateGallery);
  }

  function pauseGallery() {
    isPaused = true;
  }

  function playGallery() {
    isPaused = false;
  }

  galleryStrip.addEventListener("touchstart", pauseGallery, { passive: true });
  galleryStrip.addEventListener("touchend", playGallery, { passive: true });
  galleryStrip.addEventListener("mouseenter", pauseGallery);
  galleryStrip.addEventListener("mouseleave", playGallery);

  window.addEventListener("resize", () => {
    galleryX = 0;
    galleryTrack.style.transform = "translate3d(0, 0, 0)";
  });

  cancelAnimationFrame(rafId);
  animateGallery();
}
const statsSection = document.querySelector(".services-stats");

if (statsSection) {
  const counters = statsSection.querySelectorAll("strong");

  let started = false;

  function runCounters() {
    if (started) return;

    started = true;

    counters.forEach((counter) => {
      const target = +counter.dataset.count;

      let current = 0;

      const increment = target / 80;

      const updateCounter = () => {
        current += increment;

        if (current < target) {
          counter.innerText = Math.floor(current);

          requestAnimationFrame(updateCounter);
        } else {
          // FINAL TEXT
          if (target === 100) {
            counter.innerText = "100+";
          } else if (target === 2) {
            counter.innerText = ">2";
          } else {
            counter.innerText = `${target}+`;
          }
        }
      };

      updateCounter();
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounters();
        }
      });
    },
    {
      threshold: 0.4,
    },
  );

  observer.observe(statsSection);
}
const revealItems = document.querySelectorAll(".reveal-text");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: "0px 0px -5% 0px",
    },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("active"));
}

const reviewsTrack = document.querySelector("#reviewsTrack");
const reviewCards = document.querySelectorAll(".review-card");
const reviewsPrev = document.querySelector(".reviews-prev");
const reviewsNext = document.querySelector(".reviews-next");

let reviewIndex = 0;

function getReviewsPerView() {
  return window.innerWidth <= 980 ? 1 : 4;
}

function updateReviewsSlider() {
  if (!reviewsTrack || !reviewCards.length) return;

  const perView = getReviewsPerView();

  const maxIndex = Math.max(reviewCards.length - perView, 0);

  reviewIndex = Math.min(reviewIndex, maxIndex);

  const gap = window.innerWidth <= 980 ? 18 : 24;

  const cardWidth = reviewCards[0].getBoundingClientRect().width;

  reviewsTrack.style.transform = `translateX(-${reviewIndex * (cardWidth + gap)}px)`;
}

reviewsNext?.addEventListener("click", () => {
  const perView = getReviewsPerView();

  const maxIndex = Math.max(reviewCards.length - perView, 0);

  reviewIndex = reviewIndex >= maxIndex ? 0 : reviewIndex + 1;

  updateReviewsSlider();
});

reviewsPrev?.addEventListener("click", () => {
  const perView = getReviewsPerView();

  const maxIndex = Math.max(reviewCards.length - perView, 0);

  reviewIndex = reviewIndex <= 0 ? maxIndex : reviewIndex - 1;

  updateReviewsSlider();
});

window.addEventListener("resize", updateReviewsSlider);

updateReviewsSlider();

const coursesTrack = document.querySelector("#coursesTrack");
const courseCards = document.querySelectorAll(".course-card");
const coursesPrev = document.querySelector(".courses-prev");
const coursesNext = document.querySelector(".courses-next");

let courseIndex = 0;

function updateCoursesSlider() {
  if (!coursesTrack || !courseCards.length) return;

  if (window.innerWidth > 980) {
    coursesTrack.style.transform = "translateX(0)";
    return;
  }

  const maxIndex = Math.max(courseCards.length - 1, 0);
  courseIndex = Math.min(courseIndex, maxIndex);

  const gap = 18;
  const cardWidth = courseCards[0].getBoundingClientRect().width;

  coursesTrack.style.transform = `translateX(-${courseIndex * (cardWidth + gap)}px)`;
}

coursesNext?.addEventListener("click", () => {
  const maxIndex = Math.max(courseCards.length - 1, 0);
  courseIndex = courseIndex >= maxIndex ? 0 : courseIndex + 1;
  updateCoursesSlider();
});

coursesPrev?.addEventListener("click", () => {
  const maxIndex = Math.max(courseCards.length - 1, 0);
  courseIndex = courseIndex <= 0 ? maxIndex : courseIndex - 1;
  updateCoursesSlider();
});

window.addEventListener("resize", updateCoursesSlider);
updateCoursesSlider();
