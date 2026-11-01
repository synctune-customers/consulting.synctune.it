"use strict";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const printMedia = window.matchMedia("print");
const pixelsPerSecond = 36;

for (const carousel of document.querySelectorAll("[data-carousel]")) {
  const track = carousel.querySelector("[data-carousel-track]");
  const controls = carousel.querySelector("[data-carousel-controls]");
  const previous = carousel.querySelector("[data-carousel-previous]");
  const next = carousel.querySelector("[data-carousel-next]");
  const toggle = carousel.querySelector("[data-carousel-toggle]");

  if (!track || !controls || !previous || !next || !toggle) {
    console.error("Logo carousel markup is incomplete", carousel.id);
    continue;
  }

  const originals = Array.from(track.children);
  if (originals.length === 0) {
    console.error("Logo carousel is empty", carousel.id);
    continue;
  }
  let itemStep = 0;
  let scrollRange = 0;
  let position = track.scrollLeft;
  let requested = true;
  let hovered = false;
  let focused = false;
  let inView = true;
  let frame = null;
  let lastTime = null;

  function measure() {
    itemStep = track.children.length > 1
      ? track.children[1].getBoundingClientRect().left - track.children[0].getBoundingClientRect().left
      : 0;
    scrollRange = track.scrollWidth - track.clientWidth;
    position = track.scrollLeft;
  }

  function enableLoop() {
    track.setAttribute("data-looping", "");
    measure();
  }

  function getLogicalPosition() {
    const firstIndex = originals.indexOf(track.firstElementChild);
    const cycleWidth = originals.length * itemStep;
    return cycleWidth > 0
      ? (firstIndex * itemStep + track.scrollLeft) % cycleWidth
      : track.scrollLeft;
  }

  function restoreOrder() {
    const logicalPosition = getLogicalPosition();
    if (track.firstElementChild !== originals[0]) {
      for (const original of originals) track.append(original);
    }
    track.removeAttribute("data-looping");
    track.scrollLeft = logicalPosition;
    measure();
  }

  function updateControls() {
    const lastPosition = track.scrollWidth - track.clientWidth;
    const logicalPosition = Math.min(getLogicalPosition(), lastPosition);
    previous.disabled = logicalPosition <= 1;
    next.disabled = logicalPosition >= lastPosition - 1;
  }

  function canRun() {
    return requested && !reducedMotion.matches && !printMedia.matches && !document.hidden
      && inView && !hovered && !focused && itemStep > 0 && scrollRange >= itemStep;
  }

  function stopFrame() {
    if (frame !== null) window.cancelAnimationFrame(frame);
    frame = null;
    lastTime = null;
    track.removeAttribute("data-auto-scrolling");
  }

  function advance(time) {
    frame = null;
    if (!canRun()) {
      stopFrame();
      return;
    }
    if (lastTime !== null) {
      const seconds = Math.min(time - lastTime, 100) / 1000;
      position += pixelsPerSecond * seconds;
      while (position >= itemStep) {
        track.append(track.firstElementChild);
        position -= itemStep;
      }
      track.scrollLeft = position;
    }
    lastTime = time;
    frame = window.requestAnimationFrame(advance);
  }

  function syncPlayback() {
    if (reducedMotion.matches || printMedia.matches) restoreOrder();
    else if (requested) enableLoop();
    toggle.hidden = reducedMotion.matches;
    toggle.textContent = requested ? "Pause" : "Play";
    toggle.setAttribute("aria-label", `${requested ? "Pause" : "Play"} ${track.getAttribute("aria-label").toLowerCase()} scrolling`);
    if (canRun()) {
      if (frame === null) {
        position = track.scrollLeft;
        lastTime = null;
        track.setAttribute("data-auto-scrolling", "");
        frame = window.requestAnimationFrame(advance);
      }
    } else {
      stopFrame();
    }
    updateControls();
  }

  function stopAutomatic() {
    requested = false;
    syncPlayback();
  }

  function scrollLogosTo(left) {
    stopAutomatic();
    restoreOrder();
    track.scrollTo({ left, behavior: reducedMotion.matches ? "auto" : "smooth" });
  }

  function scrollLogosBy(direction) {
    stopAutomatic();
    restoreOrder();
    track.scrollTo({
      left: track.scrollLeft + direction * track.clientWidth,
      behavior: reducedMotion.matches ? "auto" : "smooth",
    });
  }

  previous.addEventListener("click", () => scrollLogosBy(-1));
  next.addEventListener("click", () => scrollLogosBy(1));
  track.addEventListener("scroll", updateControls, { passive: true });
  window.addEventListener("resize", () => {
    measure();
    syncPlayback();
  });
  document.addEventListener("visibilitychange", syncPlayback);
  reducedMotion.addEventListener("change", syncPlayback);
  printMedia.addEventListener("change", () => {
    if (!printMedia.matches) measure();
    syncPlayback();
  });
  toggle.addEventListener("click", () => {
    requested = !requested;
    if (requested) focused = false;
    syncPlayback();
  });
  carousel.addEventListener("mouseenter", () => { hovered = true; syncPlayback(); });
  carousel.addEventListener("mouseleave", () => { hovered = false; syncPlayback(); });
  carousel.addEventListener("focusin", () => { focused = true; syncPlayback(); });
  carousel.addEventListener("focusout", (event) => {
    focused = carousel.contains(event.relatedTarget);
    syncPlayback();
  });
  track.addEventListener("pointerdown", stopAutomatic, { passive: true });
  track.addEventListener("wheel", stopAutomatic, { passive: true });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(track);
  }

  track.addEventListener("keydown", (event) => {
    if (event.target !== track || event.ctrlKey || event.metaKey || event.altKey) return;
    switch (event.key) {
      case "ArrowLeft":
        scrollLogosBy(-1);
        break;
      case "ArrowRight":
        scrollLogosBy(1);
        break;
      case "Home":
        scrollLogosTo(0);
        break;
      case "End":
        scrollLogosTo(track.scrollWidth - track.clientWidth);
        break;
      default:
        return;
    }
    event.preventDefault();
  });

  controls.hidden = false;
  measure();
  syncPlayback();
}
