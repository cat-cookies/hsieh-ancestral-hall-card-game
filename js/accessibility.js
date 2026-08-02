(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const STORAGE_KEY = "hsiehFontSize";
  const allowed = ["small", "medium", "large"];

  function safeGet(key, fallback = null) {
    try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch {}
  }

  function viewportInfo() {
    const vv = window.visualViewport;
    const width = Math.max(280, Math.round(vv?.width || window.innerWidth || document.documentElement.clientWidth || 1024));
    const height = Math.max(320, Math.round(vv?.height || window.innerHeight || document.documentElement.clientHeight || 768));
    const screenWidth = Math.max(width, window.screen?.width || width);
    const screenHeight = Math.max(height, window.screen?.height || height);
    const touch = matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
    const orientation = width >= height ? "landscape" : "portrait";
    const aspect = width / height;
    let profile = "desktop-standard";
    if (touch && width < 980) profile = orientation === "portrait" ? "mobile-portrait" : "mobile-landscape";
    else if (width < 1120 || height < 690) profile = "compact-desktop";
    else if (aspect >= 1.8) profile = "desktop-wide";
    else if (aspect <= 1.25) profile = "desktop-tall";
    return { width, height, screenWidth, screenHeight, touch, orientation, aspect, profile };
  }

  function applyViewportProfile() {
    const info = viewportInfo();
    const root = document.documentElement;
    root.dataset.deviceProfile = info.profile;
    root.dataset.orientation = info.orientation;
    root.dataset.touch = info.touch ? "true" : "false";
    root.style.setProperty("--app-viewport-width", `${info.width}px`);
    root.style.setProperty("--app-viewport-height", `${info.height}px`);
    root.style.setProperty("--screen-aspect", info.aspect.toFixed(3));
    root.style.setProperty("--safe-bottom", `env(safe-area-inset-bottom, 0px)`);
    applyFontSize(currentFontSize(), false);
  }

  function currentFontSize() {
    const stored = safeGet(STORAGE_KEY, "medium");
    return allowed.includes(stored) ? stored : "medium";
  }

  function fontScale(size) {
    const info = viewportInfo();
    const desktop = { small: 1.04, medium: 1.24, large: 1.48 };
    const mobile = { small: 1.02, medium: 1.18, large: 1.38 };
    const compact = { small: 1.02, medium: 1.17, large: 1.34 };
    if (info.profile.startsWith("mobile")) return mobile[size];
    if (info.profile === "compact-desktop") return compact[size];
    return desktop[size];
  }

  function applyFontSize(size, persist = true) {
    const normalized = allowed.includes(size) ? size : "medium";
    if (persist) safeSet(STORAGE_KEY, normalized);
    const root = document.documentElement;
    root.dataset.fontSize = normalized;
    root.style.setProperty("--user-font-scale", String(fontScale(normalized)));
    root.style.setProperty("--accessible-base-font", `${normalized === "small" ? 16 : normalized === "large" ? 21 : 18}px`);

    $$('[data-font-choice]').forEach((button) => {
      const active = button.dataset.fontChoice === normalized;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    ["#home-font-size", "#opening-font-size-select"].forEach((selector) => {
      const select = $(selector);
      if (select && select.value !== normalized) select.value = normalized;
    });

    window.dispatchEvent(new CustomEvent("hsieh:fontchange", { detail: { size: normalized, scale: fontScale(normalized) } }));
  }

  function setFontFromControl(size) {
    applyFontSize(size, true);
    const select = $("#home-font-size") || $("#opening-font-size-select");
    if (select) {
      select.value = size;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      // Existing page scripts use smaller legacy scales. Reapply the accessible scale afterwards.
      queueMicrotask(() => applyFontSize(size, false));
    }
  }

  function openEndGameModal() {
    $("#end-game-modal")?.classList.remove("hidden");
    $("#end-game-cancel")?.focus();
  }
  function closeEndGameModal() {
    $("#end-game-modal")?.classList.add("hidden");
  }
  function homeUrl() {
    if (document.body.classList.contains("lang-en")) return "index-en.html";
    if (document.body.classList.contains("zhuyin-mode")) return "index-zhuyin.html";
    return "index.html";
  }
  function endGame() {
    try { window.speechSynthesis?.cancel(); } catch {}
    location.href = homeUrl();
  }

  function preserveLanguageQuery() {
    if (document.body.dataset.page !== "battle") return;
    const query = location.search;
    if (!query) return;
    $$(".language-choice-group a").forEach((link) => {
      const url = new URL(link.getAttribute("href"), location.href);
      url.search = query;
      link.setAttribute("href", `${url.pathname.split("/").pop()}${url.search}`);
    });
  }

  function markActiveLanguage() {
    const file = location.pathname.split("/").pop() || "index.html";
    $$(".language-choice-group a").forEach((link) => {
      const href = link.getAttribute("href")?.split("?")[0];
      if (href === file) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function init() {
    applyViewportProfile();
    applyFontSize(currentFontSize(), false);
    preserveLanguageQuery();
    markActiveLanguage();

    document.addEventListener("click", (event) => {
      const fontButton = event.target.closest("[data-font-choice]");
      if (fontButton) {
        event.preventDefault();
        setFontFromControl(fontButton.dataset.fontChoice);
        return;
      }
      if (event.target.closest("#end-game-button, #game-over-end")) {
        event.preventDefault();
        openEndGameModal();
        return;
      }
      if (event.target.closest("#end-game-cancel")) {
        closeEndGameModal();
        return;
      }
      if (event.target.closest("#end-game-confirm")) {
        endGame();
      }
    });

    ["#home-font-size", "#opening-font-size-select"].forEach((selector) => {
      $(selector)?.addEventListener("change", (event) => queueMicrotask(() => applyFontSize(event.target.value, true)));
    });

    $("#end-game-modal")?.addEventListener("click", (event) => {
      if (event.target === event.currentTarget) closeEndGameModal();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !$("#end-game-modal")?.classList.contains("hidden")) closeEndGameModal();
    });

    let resizeTimer = null;
    const adapt = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyViewportProfile, 40);
    };
    window.addEventListener("resize", adapt, { passive: true });
    window.addEventListener("orientationchange", adapt, { passive: true });
    window.visualViewport?.addEventListener("resize", adapt, { passive: true });
    window.visualViewport?.addEventListener("scroll", adapt, { passive: true });
  }

  window.HSIEH_ACCESSIBILITY = { applyFontSize, applyViewportProfile, currentFontSize };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
