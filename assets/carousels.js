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
  let clones = [];
  let loopWidth = 0;
  let position = track.scrollLeft;
  let requested = true;
  let hovered = false;
  let focused = false;
  let inView = true;
  let frame = null;
  let lastTime = null;

  function measure() {
    loopWidth = clones.length
      ? clones[0].getBoundingClientRect().left - originals[0].getBoundingClientRect().left
      : 0;
    position = loopWidth > 0 ? track.scrollLeft % loopWidth : track.scrollLeft;
  }

  function createLoop() {
    if (clones.length) return;
    const fragment = document.createDocumentFragment();
    clones = originals.map((original) => {
      const clone = original.cloneNode(true);
      clone.setAttribute("data-carousel-clone", "");
      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("inert", "");
      clone.removeAttribute("id");
      for (const node of clone.querySelectorAll("[id]")) node.removeAttribute("id");
      for (const image of clone.querySelectorAll("img")) image.alt = "";
      fragment.append(clone);
      return clone;
    });
    track.append(fragment);
    track.setAttribute("data-looping", "");
    measure();
  }

  function removeLoop() {
    if (!clones.length) return;
    const normalized = loopWidth > 0 ? track.scrollLeft % loopWidth : track.scrollLeft;
    for (const clone of clones) clone.remove();
    clones = [];
    track.removeAttribute("data-looping");
    track.scrollLeft = normalized;
    measure();
  }

  function updateControls() {
    const lastPosition = track.scrollWidth - track.clientWidth;
    previous.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= lastPosition - 1;
  }

  function canRun() {
    return requested && !reducedMotion.matches && !printMedia.matches && !document.hidden
      && inView && !hovered && !focused && loopWidth > track.clientWidth;
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
      position = (position + pixelsPerSecond * seconds) % loopWidth;
      track.scrollLeft = position;
    }
    lastTime = time;
    frame = window.requestAnimationFrame(advance);
  }

  function syncPlayback() {
    if (reducedMotion.matches) removeLoop();
    else if (requested) createLoop();
    toggle.hidden = reducedMotion.matches;
    toggle.textContent = requested ? "Pause" : "Play";
    toggle.setAttribute("aria-label", `${requested ? "Pause" : "Play"} ${track.getAttribute("aria-label").toLowerCase()} scrolling`);
    if (canRun()) {
      if (frame === null) {
        position = track.scrollLeft % loopWidth;
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
    track.scrollTo({ left, behavior: reducedMotion.matches ? "auto" : "smooth" });
  }

  previous.addEventListener("click", () => scrollLogosTo(track.scrollLeft - track.clientWidth));
  next.addEventListener("click", () => scrollLogosTo(track.scrollLeft + track.clientWidth));
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
        scrollLogosTo(track.scrollLeft - track.clientWidth);
        break;
      case "ArrowRight":
        scrollLogosTo(track.scrollLeft + track.clientWidth);
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
  syncPlayback();
}
