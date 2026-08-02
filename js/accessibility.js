(() => {
  "use strict";

  const LEGACY_SCALE_KEY = "hsiehFontScale";
  const LEGACY_SIZE_KEY = "hsiehFontSize";
  const MIN_SCALE = 0.96;
  const MAX_SCALE = 1.72;
  const PRESET = { small: 1.00, medium: 1.16, large: 1.42 };

  const runtime = {
    autoScale: 1,
    manualRatio: 1,
    userAdjusted: false,
    updateFrame: 0
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function safeRemove(key) {
    try { localStorage.removeItem(key); } catch {}
  }

  function isEnglish() {
    return document.documentElement.lang?.startsWith("en") || document.body?.dataset?.locale === "en";
  }

  function isZhuyin() {
    return document.body?.classList.contains("zhuyin-mode") || /zhuyin/i.test(location.pathname);
  }

  function isBattlePage() {
    return document.body?.dataset?.page === "battle";
  }

  function readEnvironment() {
    const viewport = window.visualViewport;
    const width = Math.max(280, viewport?.width || document.documentElement.clientWidth || window.innerWidth || 1280);
    const height = Math.max(320, viewport?.height || document.documentElement.clientHeight || window.innerHeight || 720);
    const viewportScale = clamp(Number(viewport?.scale) || 1, 0.5, 4);
    const screenWidth = Math.max(width, window.screen?.availWidth || window.screen?.width || width);
    const screenHeight = Math.max(height, window.screen?.availHeight || window.screen?.height || height);
    const coarsePointer = Boolean(window.matchMedia?.("(pointer: coarse)")?.matches);
    const highContrast = Boolean(window.matchMedia?.("(prefers-contrast: more)")?.matches);
    const forcedColors = Boolean(window.matchMedia?.("(forced-colors: active)")?.matches);
    const rootFont = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const defaultFontFactor = clamp(rootFont / 16, 0.9, 1.35);
    const viewportRatio = width / Math.max(1, screenWidth);
    const heightRatio = height / Math.max(1, screenHeight);
    const effectiveWindowRatio = clamp(Math.min(viewportRatio, heightRatio), 0.34, 1.15);

    return {
      width,
      height,
      viewportScale,
      screenWidth,
      screenHeight,
      coarsePointer,
      highContrast,
      forcedColors,
      defaultFontFactor,
      effectiveWindowRatio
    };
  }

  function calculateAutoScale() {
    const env = readEnvironment();
    const portrait = env.height >= env.width;
    const likelyPhone = env.coarsePointer && Math.min(env.width, env.height) < 720;
    const shortViewport = env.height < 650;

    // Readability is the primary constraint. Small windows switch to denser layout;
    // they do not receive microscopic text.
    let base;
    if (likelyPhone) {
      base = portrait ? (env.width <= 350 ? 1.04 : 1.08) : 1.00;
    } else if (isBattlePage()) {
      if (env.width >= 1600 && env.height >= 900) base = 1.15;
      else if (env.width >= 1280 && env.height >= 720) base = 1.08;
      else base = 1.02;
    } else {
      if (env.width >= 1500 && env.height >= 850) base = 1.18;
      else if (env.width >= 1000) base = 1.10;
      else base = 1.05;
    }

    // Browser and OS scaling already change the CSS viewport. Only compensate for
    // explicit visual-viewport zoom, avoiding double-shrinking in split windows.
    const pinchCompensation = clamp(1 / Math.pow(env.viewportScale, 0.28), 0.86, 1.04);
    const browserDefaultFont = clamp(Math.pow(env.defaultFontFactor, 0.7), 0.96, 1.22);

    let modeFactor = 1;
    if (isZhuyin()) modeFactor *= 1.02;
    if (isEnglish()) modeFactor *= 0.99;
    if (shortViewport) modeFactor *= 0.98;
    if (env.highContrast) modeFactor *= 1.07;
    if (env.forcedColors) modeFactor *= 1.05;

    return clamp(base * pinchCompensation * browserDefaultFont * modeFactor, MIN_SCALE, MAX_SCALE);
  }

  function sizeWord(scale) {
    const en = isEnglish();
    if (scale < 0.98) return en ? "Small" : "小";
    if (scale < 1.20) return en ? "Medium" : "中";
    return en ? "Large" : "大";
  }

  function currentEffectiveScale() {
    return clamp(runtime.autoScale * runtime.manualRatio, MIN_SCALE, MAX_SCALE);
  }

  function syncLegacyControls(scale) {
    const bucket = scale < 0.98 ? "small" : scale < 1.20 ? "medium" : "large";
    document.documentElement.dataset.fontSize = bucket;
    document.querySelectorAll("[data-font-choice]").forEach((button) => {
      button.setAttribute("aria-pressed", button.dataset.fontChoice === bucket ? "true" : "false");
    });
    const select = document.getElementById("home-font-size") || document.getElementById("opening-font-size-select");
    if (select && !select.matches(":focus")) select.value = bucket;
  }

  function applyScale(scale, source = "auto") {
    const normalized = clamp(Number(scale) || 1, MIN_SCALE, MAX_SCALE);
    document.documentElement.style.setProperty("--user-font-scale", normalized.toFixed(3));
    document.documentElement.dataset.fontScaleMode = runtime.userAdjusted ? "manual" : "auto";
    document.documentElement.dataset.fontScalePercent = String(Math.round(normalized * 100));

    document.querySelectorAll(".font-size-slider").forEach((input) => {
      input.value = normalized.toFixed(2);
    });

    const modeLabel = runtime.userAdjusted
      ? (isEnglish() ? "Custom" : "自訂")
      : (isEnglish() ? "Auto" : "自動");
    document.querySelectorAll(".font-size-current-label").forEach((label) => {
      label.textContent = `${modeLabel} ${Math.round(normalized * 100)}%`;
      label.title = isEnglish()
        ? "Automatically calibrated from viewport size, browser zoom, display scaling, orientation, and touch input."
        : "依可視範圍、瀏覽器縮放、顯示縮放、方向與觸控裝置自動校正。";
    });

    syncLegacyControls(normalized);
    document.dispatchEvent(new CustomEvent("hsieh-font-scale-change", {
      detail: { scale: normalized, source, automatic: !runtime.userAdjusted }
    }));
  }

  function recalculateAutoScale() {
    cancelAnimationFrame(runtime.updateFrame);
    runtime.updateFrame = requestAnimationFrame(() => {
      runtime.autoScale = calculateAutoScale();
      applyScale(currentEffectiveScale(), "environment");
    });
  }

  function setManualScale(scale) {
    const normalized = clamp(Number(scale) || runtime.autoScale, MIN_SCALE, MAX_SCALE);
    runtime.userAdjusted = true;
    runtime.manualRatio = clamp(normalized / Math.max(runtime.autoScale, 0.01), 0.72, 1.55);
    applyScale(normalized, "slider");
  }

  function resetToAutomatic() {
    runtime.userAdjusted = false;
    runtime.manualRatio = 1;
    runtime.autoScale = calculateAutoScale();
    applyScale(runtime.autoScale, "auto-reset");
  }

  function buildFontSlider(group) {
    if (!group || group.dataset.sliderReady === "true") return;
    group.dataset.sliderReady = "true";
    const en = isEnglish();
    const labelText = en ? "Text size" : "字級";
    const small = en ? "Small" : "小";
    const large = en ? "Large" : "大";
    const scale = currentEffectiveScale();

    group.innerHTML = `
      <span class="font-size-heading">${labelText}</span>
      <label class="font-size-slider-wrap" aria-label="${labelText}">
        <span class="font-size-end-label">${small}</span>
        <input class="font-size-slider" type="range" min="${MIN_SCALE}" max="${MAX_SCALE}" step="0.02" value="${scale.toFixed(2)}" />
        <span class="font-size-end-label">${large}</span>
      </label>
      <button class="font-size-current-label" type="button" title="${en ? "Reset to automatic calibration" : "恢復自動校正"}">${en ? "Auto" : "自動"} ${Math.round(scale * 100)}%</button>
    `;

    const slider = group.querySelector(".font-size-slider");
    slider?.addEventListener("input", (event) => setManualScale(event.target.value));
    slider?.addEventListener("change", (event) => setManualScale(event.target.value));
    group.querySelector(".font-size-current-label")?.addEventListener("click", resetToAutomatic);
  }

  function connectLegacySelects() {
    [document.getElementById("home-font-size"), document.getElementById("opening-font-size-select")]
      .filter(Boolean)
      .forEach((select) => {
        select.addEventListener("change", () => {
          const requested = PRESET[select.value] || PRESET.medium;
          setManualScale(requested);
        });
      });
  }

  function preserveLanguageLocation(link) {
    if (!link) return;
    try {
      const currentHref = /^https?:|^file:/i.test(location.href)
        ? location.href
        : `https://local.invalid/${location.pathname.replace(/^\//, "")}${location.search}${location.hash}`;
      const current = new URL(currentHref);
      const target = new URL(link.getAttribute("href"), current);
      for (const [key, value] of current.searchParams.entries()) {
        if (!target.searchParams.has(key)) target.searchParams.set(key, value);
      }
      if (current.hash && !target.hash) target.hash = current.hash;
      link.setAttribute("href", `${target.pathname.split("/").pop()}${target.search}${target.hash}`);
    } catch {
      // Keep the original link when a sandbox or embedded preview has no valid base URL.
    }
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

  function initEnvironmentObservers() {
    const update = () => recalculateAutoScale();
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("orientationchange", update, { passive: true });
    window.visualViewport?.addEventListener("resize", update, { passive: true });
    window.visualViewport?.addEventListener("scroll", update, { passive: true });
    window.matchMedia?.("(prefers-contrast: more)")?.addEventListener?.("change", update);
    window.matchMedia?.("(forced-colors: active)")?.addEventListener?.("change", update);
  }

  function init() {
    // v2.25 starts every page from environment-aware automatic calibration.
    // Previous absolute values are deliberately not reused across pages.
    safeRemove(LEGACY_SCALE_KEY);
    safeRemove(LEGACY_SIZE_KEY);

    runtime.autoScale = calculateAutoScale();
    runtime.manualRatio = 1;
    runtime.userAdjusted = false;

    document.querySelectorAll(".font-size-controls").forEach(buildFontSlider);
    connectLegacySelects();
    applyScale(runtime.autoScale, "initial-auto");
    initLanguageNav();
    initEnvironmentObservers();
  }

  window.HsiehFontCalibration = {
    recalculate: recalculateAutoScale,
    reset: resetToAutomatic,
    setPreset(name) {
      const requested = PRESET[name] || PRESET.medium;
      setManualScale(requested);
    },
    setScale: setManualScale,
    getScale: currentEffectiveScale,
    getEnvironment: readEnvironment
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
