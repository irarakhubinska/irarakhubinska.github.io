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

if (galleryStrip) {
  let isDown = false;
  let startX;
  let scrollLeft;
  let animationFrame;

  function autoScroll() {
    galleryStrip.scrollLeft += 0.5;

    // smooth infinite loop
    if (galleryStrip.scrollLeft >= galleryStrip.scrollWidth / 2) {
      galleryStrip.scrollLeft = 0;
    }

    animationFrame = requestAnimationFrame(autoScroll);
  }

  function startAuto() {
    cancelAnimationFrame(animationFrame);
    autoScroll();
  }

  function stopAuto() {
    cancelAnimationFrame(animationFrame);
  }

  // DESKTOP DRAG
  galleryStrip.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - galleryStrip.offsetLeft;
    scrollLeft = galleryStrip.scrollLeft;

    stopAuto();
  });

  galleryStrip.addEventListener("mouseleave", () => {
    isDown = false;
    startAuto();
  });

  galleryStrip.addEventListener("mouseup", () => {
    isDown = false;
    startAuto();
  });

  galleryStrip.addEventListener("mousemove", (e) => {
    if (!isDown) return;

    e.preventDefault();

    const x = e.pageX - galleryStrip.offsetLeft;
    const walk = (x - startX) * 1.2;

    galleryStrip.scrollLeft = scrollLeft - walk;
  });

  // MOBILE TOUCH
  galleryStrip.addEventListener(
    "touchstart",
    () => {
      stopAuto();
    },
    { passive: true },
  );

  galleryStrip.addEventListener(
    "touchend",
    () => {
      startAuto();
    },
    { passive: true },
  );

  startAuto();
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
            counter.innerText = "> 2";
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
