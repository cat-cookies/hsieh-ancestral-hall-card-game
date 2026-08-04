(() => {
  "use strict";

  const root = document.documentElement;
  const runtime = {
    frame: 0,
    observer: null,
    cardObserver: null,
    lastSignature: ""
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function environment() {
    const vv = window.visualViewport;
    const width = Math.max(280, vv?.width || root.clientWidth || window.innerWidth || 1280);
    const height = Math.max(320, vv?.height || root.clientHeight || window.innerHeight || 720);
    const scale = clamp(Number(vv?.scale) || 1, 0.5, 4);
    const coarse = Boolean(matchMedia?.("(pointer: coarse)")?.matches);
    const hover = Boolean(matchMedia?.("(hover: hover)")?.matches);
    const portrait = height >= width;
    const phone = coarse && Math.min(width, height) < 720;
    const zhuyin = document.body?.classList.contains("zhuyin-mode") || /zhuyin/i.test(location.pathname);
    const english = root.lang?.startsWith("en") || document.body?.dataset?.locale === "en";
    const page = document.body?.dataset?.page || "home";
    const fontScale = clamp(Number.parseFloat(getComputedStyle(root).getPropertyValue("--user-font-scale")) || 1, 0.8, 2);
    return { width, height, scale, coarse, hover, portrait, phone, zhuyin, english, page, fontScale };
  }

  function setPx(name, value) {
    root.style.setProperty(name, `${Math.round(value * 10) / 10}px`);
  }

  function calculateBattleMetrics(env) {
    const landscapePhone = env.phone && !env.portrait;
    const shortDesktop = !env.phone && env.height < 760;
    const roomyDesktop = !env.phone && env.width >= 1440 && env.height >= 800;

    // Text never becomes microscopic to make the full opening hand fit. Cards use horizontal scrolling instead.
    let handH;
    if (landscapePhone) handH = clamp(env.height * 0.275, 92, 116);
    else if (env.phone) handH = clamp(env.height * 0.165, 118, 148);
    else if (shortDesktop) handH = clamp(env.height * 0.17, 116, 138);
    else handH = clamp(env.height * 0.18, 130, roomyDesktop ? 164 : 154);

    // User text preference can make cards a little larger, but not force the board outside the viewport.
    const userGrowth = clamp(1 + (env.fontScale - 1) * 0.22, 0.96, 1.16);
    handH *= userGrowth;
    if (env.zhuyin) handH *= landscapePhone ? 1.12 : 1.16;

    let handRatio = env.english ? 0.76 : 0.72;
    if (env.zhuyin) handRatio += 0.03;
    const handW = clamp(handH * handRatio, landscapePhone ? 74 : env.phone ? 86 : 94, env.english ? 132 : 122);

    const headingH = env.zhuyin ? (landscapePhone ? 34 : 42) : (landscapePhone ? 24 : 30);
    const dockH = handH + headingH + (env.phone ? 8 : 10);

    let boardW;
    if (landscapePhone) boardW = clamp(env.width * 0.075, 52, 64);
    else if (env.phone) boardW = clamp(env.width * 0.15, 52, 68);
    else boardW = clamp(env.width * 0.046, 58, 76);
    const boardH = boardW * 1.28;

    const handName = clamp(handW * (env.english ? 0.118 : 0.132), env.phone ? 11.5 : 12.5, env.english ? 14.5 : 16);
    const handType = clamp(handW * 0.096, 9.2, 12);
    const handPower = clamp(handW * 0.145, 13, 18);
    const boardName = clamp(boardW * 0.15, 8.5, 11.5);
    const boardPower = clamp(boardW * 0.19, 11, 15);
    const controlFont = clamp(12.5 * env.fontScale, env.phone ? 12 : 13, env.phone ? 16 : 18);
    const secondaryFont = clamp(11.5 * env.fontScale, env.phone ? 11 : 12, env.phone ? 15 : 16.5);

    let density = "comfortable";
    if (env.height < 700 || env.width < 1100) density = "compact";
    if (landscapePhone || env.height < 560) density = "tight";

    return {
      handH, handW, dockH, headingH, boardW, boardH,
      handName, handType, handPower, boardName, boardPower,
      controlFont, secondaryFont, density
    };
  }

  function applyBattleMetrics(env) {
    const m = calculateBattleMetrics(env);
    setPx("--cal-hand-card-h", m.handH);
    setPx("--cal-hand-card-w", m.handW);
    setPx("--cal-hand-dock-h", m.dockH);
    setPx("--cal-hand-heading-h", m.headingH);
    setPx("--cal-board-card-w", m.boardW);
    setPx("--cal-board-card-h", m.boardH);
    setPx("--cal-hand-name-font", m.handName);
    setPx("--cal-hand-type-font", m.handType);
    setPx("--cal-hand-power-font", m.handPower);
    setPx("--cal-board-name-font", m.boardName);
    setPx("--cal-board-power-font", m.boardPower);
    setPx("--cal-control-font", m.controlFont);
    setPx("--cal-secondary-font", m.secondaryFont);
    root.dataset.layoutDensity = m.density;
    document.body.dataset.layoutDensity = m.density;
  }

  function applyGeneralMetrics(env) {
    const control = clamp(14 * env.fontScale, env.phone ? 13 : 14, env.phone ? 18 : 20);
    const body = clamp(16 * env.fontScale, env.phone ? 15 : 16, env.phone ? 21 : 23);
    setPx("--cal-control-font", control);
    setPx("--cal-body-font", body);
  }

  function markCard(card) {
    if (!(card instanceof HTMLElement)) return;
    const name = card.querySelector(".card-name");
    const type = card.querySelector(".card-type");
    if (name) {
      const plain = (name.textContent || "").replace(/\s+/g, "").trim();
      card.dataset.nameLength = String([...plain].length);
      card.classList.toggle("card-name-long", [...plain].length >= (root.lang?.startsWith("en") ? 12 : 5));
      card.classList.toggle("card-name-very-long", [...plain].length >= (root.lang?.startsWith("en") ? 20 : 8));
      name.title = name.textContent?.trim() || "";
    }
    if (type) type.title = type.textContent?.trim() || "";
  }

  function scanCards(container = document) {
    container.querySelectorAll?.(".game-card").forEach(markCard);
  }

  function ensureCardObserver() {
    if (runtime.cardObserver || !document.body) return;
    runtime.cardObserver = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches?.(".game-card")) markCard(node);
          scanCards(node);
        }
      }
    });
    runtime.cardObserver.observe(document.body, { childList: true, subtree: true });
  }

  function measureOverflow() {
    if (document.body?.dataset?.page !== "battle") return;
    const vv = window.visualViewport;
    const viewportBottom = (vv?.offsetTop || 0) + (vv?.height || window.innerHeight);
    const dock = document.querySelector(".hand-dock");
    const game = document.querySelector(".game-screen:not(.hidden)");
    if (!dock || !game) return;
    const dockRect = dock.getBoundingClientRect();
    const overflow = dockRect.bottom - viewportBottom;
    document.body.dataset.viewportOverflow = overflow > 1 ? "true" : "false";
    if (overflow > 1) {
      // Reduce the physical card and dock together. Typography keeps its readable floor,
      // while horizontal scrolling prevents cards from being squeezed narrower.
      const styles = getComputedStyle(root);
      const currentCardH = Number.parseFloat(styles.getPropertyValue("--cal-hand-card-h")) || 120;
      const currentCardW = Number.parseFloat(styles.getPropertyValue("--cal-hand-card-w")) || 86;
      const headingH = Number.parseFloat(styles.getPropertyValue("--cal-hand-heading-h")) || 30;
      const reduction = Math.min(overflow + 4, Math.max(0, currentCardH - 88));
      if (reduction > 0) {
        const nextCardH = currentCardH - reduction;
        const ratio = currentCardW / Math.max(1, currentCardH);
        setPx("--cal-hand-card-h", nextCardH);
        setPx("--cal-hand-card-w", Math.max(72, nextCardH * ratio));
        setPx("--cal-hand-dock-h", nextCardH + headingH + 8);
      }
    }
  }

  function calibrate(source = "environment") {
    cancelAnimationFrame(runtime.frame);
    runtime.frame = requestAnimationFrame(() => {
      const env = environment();
      const signature = [Math.round(env.width), Math.round(env.height), env.scale.toFixed(2), env.fontScale.toFixed(2), env.zhuyin, env.english, env.page].join("|");
      if (signature === runtime.lastSignature && source !== "font") return;
      runtime.lastSignature = signature;
      applyGeneralMetrics(env);
      if (env.page === "battle") applyBattleMetrics(env);
      scanCards();
      requestAnimationFrame(measureOverflow);
      document.dispatchEvent(new CustomEvent("hsieh-layout-calibrated", { detail: { source, environment: env } }));
    });
  }

  function init() {
    ensureCardObserver();
    calibrate("initial");
    const update = () => calibrate("viewport");
    addEventListener("resize", update, { passive: true });
    addEventListener("orientationchange", update, { passive: true });
    window.visualViewport?.addEventListener("resize", update, { passive: true });
    window.visualViewport?.addEventListener("scroll", update, { passive: true });
    document.addEventListener("hsieh-font-scale-change", () => calibrate("font"));
    document.fonts?.ready?.then(() => calibrate("fonts"));
    runtime.observer = new ResizeObserver(() => calibrate("resize-observer"));
    runtime.observer.observe(document.documentElement);
  }

  window.HsiehLayoutCalibration = { recalibrate: calibrate, environment, calculateBattleMetrics };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
