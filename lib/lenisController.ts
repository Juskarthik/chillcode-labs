import type Lenis from "lenis";

/**
 * Module-level handle to the single Lenis instance created by
 * SmoothScroll, so components that need to pause/resume smooth
 * scrolling (e.g. a full-screen menu overlay) or trigger a scroll
 * don't need it threaded through props/context.
 */
let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function stopLenis() {
  instance?.stop();
}

export function startLenis() {
  instance?.start();
}

export function lenisScrollTo(target: string | HTMLElement, offset = 0) {
  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.1 });
    return true;
  }
  return false;
}
