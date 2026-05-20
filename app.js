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
  let autoScroll;
  let isDragging = false;

  let startX = 0;
  let scrollLeft = 0;

  function startAutoScroll() {
    stopAutoScroll();

    autoScroll = setInterval(() => {
      galleryStrip.scrollLeft += 0.7;

      // LOOP
      if (galleryStrip.scrollLeft >= galleryStrip.scrollWidth / 2) {
        galleryStrip.scrollLeft = 0;
      }
    }, 16);
  }

  function stopAutoScroll() {
    clearInterval(autoScroll);
  }

  // DRAG DESKTOP
  galleryStrip.addEventListener("mousedown", (e) => {
    isDragging = true;

    galleryStrip.classList.add("dragging");

    startX = e.pageX;
    scrollLeft = galleryStrip.scrollLeft;

    stopAutoScroll();
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;

    galleryStrip.classList.remove("dragging");

    startAutoScroll();
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const walk = (e.pageX - startX) * 1.2;

    galleryStrip.scrollLeft = scrollLeft - walk;
  });

  // TOUCH MOBILE
  galleryStrip.addEventListener("touchstart", stopAutoScroll, {
    passive: true,
  });

  galleryStrip.addEventListener("touchend", startAutoScroll, {
    passive: true,
  });

  // WHEEL DESKTOP
  galleryStrip.addEventListener(
    "wheel",
    (e) => {
      if (window.innerWidth <= 980) return;

      e.preventDefault();

      galleryStrip.scrollLeft += e.deltaY;
    },
    { passive: false },
  );

  startAutoScroll();
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

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.18,
  },
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});
