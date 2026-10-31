const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

for (const carousel of document.querySelectorAll("[data-carousel]")) {
  const track = carousel.querySelector("[data-carousel-track]");
  const controls = carousel.querySelector("[data-carousel-controls]");
  const previous = carousel.querySelector("[data-carousel-previous]");
  const next = carousel.querySelector("[data-carousel-next]");

  if (!track || !controls || !previous || !next) {
    console.error("Logo carousel markup is incomplete", carousel.id);
    continue;
  }

  function updateControls() {
    const lastPosition = track.scrollWidth - track.clientWidth;
    previous.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= lastPosition - 1;
  }

  function scrollTo(left) {
    track.scrollTo({ left, behavior: reducedMotion.matches ? "auto" : "smooth" });
  }

  previous.addEventListener("click", () => scrollTo(track.scrollLeft - track.clientWidth));
  next.addEventListener("click", () => scrollTo(track.scrollLeft + track.clientWidth));
  track.addEventListener("scroll", updateControls, { passive: true });
  window.addEventListener("resize", updateControls);

  track.addEventListener("keydown", (event) => {
    if (event.target !== track || event.ctrlKey || event.metaKey || event.altKey) return;
    switch (event.key) {
      case "ArrowLeft":
        scrollTo(track.scrollLeft - track.clientWidth);
        break;
      case "ArrowRight":
        scrollTo(track.scrollLeft + track.clientWidth);
        break;
      case "Home":
        scrollTo(0);
        break;
      case "End":
        scrollTo(track.scrollWidth - track.clientWidth);
        break;
      default:
        return;
    }
    event.preventDefault();
  });

  controls.hidden = false;
  updateControls();
}
