"use client";

import { useEffect } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const expo = (value: number) => value >= 1 ? 1 : 1 - 2 ** (-10 * value);

/** One raw-scroll clock owns all home motion, including the slideshow. */
export function ScrollMotion() {
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    const root = document.documentElement;
    const hadJs = root.classList.contains("js");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const splits = Array.from(main.querySelectorAll<HTMLElement>('[data-split="lines"]')).map((block) => {
      const original = Array.from(block.childNodes);
      const words: HTMLElement[] = [];
      const fragment = document.createDocumentFragment();
      for (const token of (block.textContent ?? "").split(/(\s+)/)) {
        if (!token) continue;
        if (/^\s+$/.test(token)) fragment.append(document.createTextNode(token));
        else {
          const word = document.createElement("span");
          word.className = "word";
          word.style.display = "inline-block";
          word.dataset.reveal = "scroll";
          word.textContent = token;
          words.push(word);
          fragment.append(word);
        }
      }
      block.replaceChildren(fragment);
      return { block, original, words };
    });
    const lineInfo = new Map<HTMLElement, { block: HTMLElement; line: number }>();
    const measure = () => {
      for (const { block, words } of splits) {
        let lastTop = -Infinity;
        let line = -1;
        for (const word of words) {
          if (word.offsetTop !== lastTop) { line++; lastTop = word.offsetTop; }
          lineInfo.set(word, { block, line });
        }
      }
    };
    const elements = Array.from(main.querySelectorAll<HTMLElement>("[data-reveal]"));
    const records = elements.map((element) => ({
      element, index: Number(element.style.getPropertyValue("--i")) || 0,
      inValue: "", outValue: "", anim: false, hidden: false,
    }));
    const hero = main.querySelector<HTMLElement>("[data-hero-scroll]");
    const slideshow = main.querySelector<HTMLElement>("[data-slideshow]");
    const slides = Array.from(slideshow?.querySelectorAll<HTMLElement>("[data-slide]") ?? []);
    const buttons = Array.from(slideshow?.querySelectorAll<HTMLElement>("[data-slide-button]") ?? []);
    const toggle = slideshow?.querySelector<HTMLElement>("[data-slide-toggle]");
    let currentSlide = 0;
    let playing = true;
    let progress = 0;
    let nextSlide = 5000;
    let elapsed = 0;
    let previous = performance.now();
    let width = 0;
    let raf = 0;
    let active = true;
    const show = (index: number) => {
      if (index === currentSlide) return;
      currentSlide = index;
      slides.forEach((slide, i) => {
        slide.classList.toggle("opacity-100", i === index);
        slide.classList.toggle("opacity-0", i !== index);
        slide.setAttribute("aria-hidden", String(i !== index));
      });
      buttons.forEach((button, i) => {
        button.setAttribute("aria-pressed", String(i === index));
        button.firstElementChild?.classList.toggle("bg-white", i === index);
        button.firstElementChild?.classList.toggle("bg-white/40", i !== index);
      });
    };
    const click = (event: Event) => {
      const target = event.target instanceof Element ? event.target : null;
      const button = target?.closest<HTMLElement>("[data-slide-button]");
      if (button && progress === 0) { show(Number(button.dataset.slideButton)); nextSlide = elapsed + 5000; }
      if (target?.closest("[data-slide-toggle]") && toggle) {
        playing = !playing;
        toggle.setAttribute("aria-label", (playing ? toggle.dataset.pauseLabel : toggle.dataset.playLabel) ?? "");
        const pause = toggle.querySelector<HTMLElement>("[data-pause-icon]");
        const play = toggle.querySelector<HTMLElement>("[data-play-icon]");
        if (pause) pause.hidden = !playing;
        if (play) play.hidden = playing;
        nextSlide = elapsed + 5000;
      }
    };
    slideshow?.addEventListener("click", click);
    root.classList.add("js");
    const frame = (now: number) => {
      if (!active || document.visibilityState === "hidden") return;
      elapsed += now - previous;
      previous = now;
      if (width !== window.innerWidth) { width = window.innerWidth; measure(); }
      const viewport = window.innerHeight;
      const heroRect = hero?.getBoundingClientRect();
      progress = width >= 768 && heroRect ? clamp(-heroRect.top / Math.max(1, heroRect.height - viewport)) : 0;
      if (progress > 0) { show(progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2); nextSlide = elapsed + 5000; }
      else if (playing && !reduced.matches && elapsed >= nextSlide) { show((currentSlide + 1) % Math.max(1, slides.length)); nextSlide = elapsed + 5000; }
      // Read layout before any reveal writes; subtract translate to avoid feedback.
      const positions = records.map(({ element }) => {
        const line = lineInfo.get(element);
        if (line) return line.block.getBoundingClientRect().top;
        const translate = getComputedStyle(element).translate.split(" ");
        return element.getBoundingClientRect().top - (parseFloat(translate[1] ?? "0") || 0);
      });
      records.forEach((record, index) => {
        const { element } = record;
        const mode = element.dataset.reveal;
        const line = lineInfo.get(element);
        const sameRow = records.some((other, i) => i !== index && other.element.parentElement === element.parentElement && Math.abs((positions[i] ?? 0) - (positions[index] ?? 0)) < 1);
        const delay = line ? line.line * viewport * 0.05 : sameRow ? record.index * viewport * 0.11 : 0;
        const entrance = !mode || mode === "load"
          ? expo(clamp((elapsed - record.index * 90) / 900))
          : 1 - (1 - clamp((viewport * 0.92 - (positions[index] ?? 0) - delay) / (viewport * 0.3))) ** 3;
        const exit = element.dataset.heroExit !== undefined
          ? expo(clamp((progress - (0.06 + Number(element.dataset.heroExit) * 0.07)) / 0.45)) : 0;
        const inValue = entrance.toFixed(3);
        const outValue = exit.toFixed(3);
        if (inValue !== record.inValue) { element.style.setProperty("--in", inValue); record.inValue = inValue; }
        if (outValue !== record.outValue) { element.style.setProperty("--out", outValue); record.outValue = outValue; }
        const value = Number(inValue) * (1 - Number(outValue));
        const anim = value > 0 && value < 1;
        const hidden = value === 0;
        if (anim !== record.anim) { element.classList.toggle("is-anim", anim); record.anim = anim; }
        if (hidden !== record.hidden) { element.classList.toggle("is-hidden", hidden); record.hidden = hidden; }
      });
      raf = requestAnimationFrame(frame);
    };
    const visibility = () => {
      cancelAnimationFrame(raf);
      previous = performance.now();
      if (document.visibilityState !== "hidden") raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", visibility);
    frame(previous);
    // Font loading can change visual lines without a viewport resize.
    void document.fonts?.ready.then(() => { if (active) measure(); });
    return () => {
      active = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", visibility);
      slideshow?.removeEventListener("click", click);
      if (!hadJs) root.classList.remove("js");
      for (const element of elements) {
        element.style.removeProperty("--in"); element.style.removeProperty("--out");
        element.classList.remove("is-anim", "is-hidden");
      }
      for (const { block, original } of splits) block.replaceChildren(...original);
    };
  }, []);
  return null;
}
