(() => {
  "use strict";
  const KEY = "hsiehFontScale";
  const BTN_KEY = "hsiehFontSize";
  const MAP = { small: 1.12, medium: 1.34, large: 1.72 };
  const REVERSE = [[1.18, "small"], [1.52, "medium"], [99, "large"]];

  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
  function safeGet(key, fallback = null) { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } }
  function safeSet(key, value) { try { localStorage.setItem(key, value); } catch {} }

  function resolveStoredScale() {
    const direct = Number.parseFloat(safeGet(KEY, ""));
    if (Number.isFinite(direct)) return clamp(direct, 1, 2);
    const legacy = safeGet(BTN_KEY, "medium");
    return MAP[legacy] || MAP.medium;
  }

  function scaleLabel(scale, isEnglish) {
    if (scale < 1.18) return isEnglish ? "Small" : "小";
    if (scale < 1.52) return isEnglish ? "Medium" : "中";
    return isEnglish ? "Large" : "大";
  }

  function legacyBucket(scale) {
    for (const [limit, key] of REVERSE) if (scale < limit) return key;
    return "medium";
  }

  function applyFontScale(scale) {
    const normalized = clamp(Number(scale) || MAP.medium, 1, 2);
    document.documentElement.style.setProperty("--user-font-scale", String(normalized));
    safeSet(KEY, normalized.toFixed(2));
    safeSet(BTN_KEY, legacyBucket(normalized));
    const isEnglish = document.documentElement.lang?.startsWith("en") || document.body.dataset.locale === "en";
    document.querySelectorAll(".font-size-slider").forEach((input) => { input.value = normalized.toFixed(2); });
    document.querySelectorAll(".font-size-current-label").forEach((label) => {
      label.textContent = `${scaleLabel(normalized, isEnglish)} ${Math.round(normalized * 100)}%`;
    });
    document.querySelectorAll("[data-font-choice]").forEach((button) => {
      const key = button.dataset.fontChoice;
      const active = legacyBucket(normalized) === key;
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    const select = document.getElementById("home-font-size") || document.getElementById("opening-font-size-select");
    if (select) select.value = legacyBucket(normalized);
    const legacyButton = document.getElementById("font-size-button");
    if (legacyButton) legacyButton.textContent = `${isEnglish ? "Text" : "字級"}：${scaleLabel(normalized, isEnglish)}`;
  }

  function buildFontSlider(group) {
    if (!group || group.dataset.sliderReady === "true") return;
    group.dataset.sliderReady = "true";
    const isEnglish = group.closest("body")?.dataset?.locale === "en" || document.documentElement.lang?.startsWith("en");
    const labelText = isEnglish ? "Text size" : "字級";
    const small = isEnglish ? "Small" : "小";
    const large = isEnglish ? "Large" : "大";
    const currentScale = resolveStoredScale();
    group.innerHTML = `
      <span class="font-size-heading">${labelText}</span>
      <label class="font-size-slider-wrap" aria-label="${labelText}">
        <span class="font-size-end-label">${small}</span>
        <input class="font-size-slider" type="range" min="1" max="2" step="0.02" value="${currentScale.toFixed(2)}" />
        <span class="font-size-end-label">${large}</span>
      </label>
      <strong class="font-size-current-label">${scaleLabel(currentScale, isEnglish)} ${Math.round(currentScale * 100)}%</strong>
    `;
    const slider = group.querySelector(".font-size-slider");
    slider?.addEventListener("input", (event) => applyFontScale(event.target.value));
    slider?.addEventListener("change", (event) => applyFontScale(event.target.value));
  }

  function preserveLanguageLocation(link) {
    if (!link) return;
    const current = new URL(location.href);
    const target = new URL(link.getAttribute("href"), current.href);
    for (const [key, value] of current.searchParams.entries()) {
      if (!target.searchParams.has(key)) target.searchParams.set(key, value);
    }
    if (current.hash && !target.hash) target.hash = current.hash;
    link.setAttribute("href", `${target.pathname.split('/').pop()}${target.search}${target.hash}`);
  }

  function initLanguageNav() {
    document.querySelectorAll(".language-nav-button").forEach((link) => {
      preserveLanguageLocation(link);
      link.addEventListener("click", () => {
        try {
          sessionStorage.setItem("hsiehLangScrollY", String(window.scrollY || 0));
          sessionStorage.setItem("hsiehLangTarget", link.getAttribute("href") || "");
        } catch {}
      });
    });
    try {
      const target = sessionStorage.getItem("hsiehLangTarget") || "";
      if (target && location.href.includes(target.split("#")[0])) {
        const y = Number.parseFloat(sessionStorage.getItem("hsiehLangScrollY") || "0");
        if (Number.isFinite(y)) requestAnimationFrame(() => window.scrollTo({ top: y, left: 0, behavior: "instant" }));
        sessionStorage.removeItem("hsiehLangScrollY");
        sessionStorage.removeItem("hsiehLangTarget");
      }
    } catch {}
  }

  function init() {
    document.querySelectorAll(".font-size-controls").forEach(buildFontSlider);
    applyFontScale(resolveStoredScale());
    initLanguageNav();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
