(() => {
  "use strict";

  const DATA = window.GAME_DATA;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const HOME_INTRO_SCENES = [
    { kicker: "埕前", title: "風先到了", body: "天色還亮。埕前有風。屋脊收著最後一點光。你站了一會兒，才往前走。", caption: "門沒有全開。裡面很安靜。", kind: "arrival" },
    { kicker: "屋脊", title: "燕尾停在天上", body: "瓦面還有熱。兩端的屋脊向上收起。鳥從後面飛過去。牆沒有說話。", caption: "抬頭時，風從簷下過。", kind: "ridge" },
    { kicker: "門樓", title: "第一道門之後還有門", body: "門樓把外面的路收窄。腳步落在地上。聲音短了一些。前堂在更裡面。", caption: "路沒有消失。它只是慢了。", kind: "gate" },
    { kicker: "天井", title: "光落在屋子中間", body: "前堂之後是天井。雨水曾從這裡落下。人從兩邊走過，影子在地上交會。", caption: "一小塊天空，被屋瓦圍住。", kind: "courtyard" },
    { kicker: "梁上", title: "近了才看見顏色", body: "斗栱在梁下承著重量。彩繪有些深，有些淡。木頭留下手的痕跡。", caption: "細部很安靜，卻沒有退色。", kind: "craft" },
    { kicker: "堂上", title: "字比聲音留得久", body: "匾額掛在上方。楹聯沿著柱子落下。祖牌排得很直。風吹進來，字沒有動。", caption: "人走過去。木上的記憶還在。", kind: "inscription" },
    { kicker: "聚落", title: "埕上曾經站滿人", body: "有人帶著祭品來。有人在一旁說話。孩子跑過禾埕。午後的影子慢慢拉長。", caption: "宗祠不是只有祭祀的時候才活著。", kind: "gathering" },
    { kicker: "牌桌", title: "守藏者把牌推到中央", body: "桌上有一道舊刮痕。燈影壓在牌背。守藏者抬起眼睛，沒有催你。", caption: "餘下的話，讓牌慢慢說。", kind: "guardian" }
  ];

  const safeStorage = {
    memory: new Map(),
    get(key) {
      try { return localStorage.getItem(key); } catch { return this.memory.get(key) ?? null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch { this.memory.set(key, value); }
    }
  };

  let selectedLeader = "xieAn";
  let tutorialStep = 0;
  let homeIntroIndex = 0;
  let homeIntroTimer = null;
  let homeIntroRate = Number.parseFloat(safeStorage.get("hsiehAnimationRate") || "1") || 1;
  let homeFontSize = safeStorage.get("hsiehFontSize") || "medium";
  const HOME_INTRO_BASE_MS = 9000;


  function introIllustrationSvg(kind) {
    const palettes = {
      arrival: ["#92c7e3", "#f0d49a", "#a4553b"], ridge: ["#7fb4d4", "#efd18e", "#a84e36"],
      gate: ["#8fbccf", "#e7cb8d", "#8d593f"], courtyard: ["#a1cad8", "#efdca5", "#8f6b4e"],
      craft: ["#6f9ea9", "#efad6c", "#a74435"], inscription: ["#728ea4", "#e8d29e", "#76543b"],
      gathering: ["#91b9bf", "#f0c986", "#9a583d"], guardian: ["#526d74", "#e6c47e", "#5d302a"]
    };
    const p = palettes[kind] || palettes.arrival;
    const details = {
      arrival: `<circle cx="106" cy="275" r="17" fill="#212629"/><path d="M88 360 Q106 294 124 360" fill="#263237"/><path d="M112 302 L151 261" stroke="#2a3438" stroke-width="10" stroke-linecap="round"/>`,
      ridge: `<path d="M34 168 Q98 92 170 158 Q260 66 350 158 Q424 91 492 168" fill="none" stroke="#f3d796" stroke-width="18" stroke-linecap="round"/><path d="M250 72 L275 117 L225 117 Z" fill="#7d352b"/>`,
      gate: `<path d="M216 390 L244 216 L276 216 L310 390" fill="rgba(239,221,182,.35)"/><rect x="204" y="192" width="112" height="122" rx="4" fill="#7a3b2d"/><rect x="227" y="218" width="66" height="96" fill="#152d30"/>`,
      courtyard: `<rect x="105" y="175" width="48" height="145" fill="#a95b42"/><rect x="367" y="175" width="48" height="145" fill="#a95b42"/><rect x="153" y="203" width="214" height="117" fill="#d5c08c" opacity=".35"/><ellipse cx="260" cy="250" rx="72" ry="31" fill="#91c8dc" opacity=".55"/>`,
      craft: `<path d="M82 115 H438 V173 H82 Z" fill="#6b332b"/><path d="M112 142 l28 -24 28 24 28 -24 28 24 28 -24 28 24 28 -24 28 24" fill="none" stroke="#efb66e" stroke-width="14"/><circle cx="260" cy="230" r="54" fill="none" stroke="#cc5c41" stroke-width="14"/><path d="M226 230 h68 M260 196 v68" stroke="#f3d394" stroke-width="10"/>`,
      inscription: `<rect x="153" y="95" width="214" height="82" rx="7" fill="#4e2a25" stroke="#e5bd76" stroke-width="8"/><rect x="102" y="192" width="42" height="150" fill="#6e352b"/><rect x="376" y="192" width="42" height="150" fill="#6e352b"/><rect x="188" y="205" width="144" height="96" fill="#d7b978" opacity=".65"/>`,
      gathering: `<circle cx="160" cy="262" r="17" fill="#233033"/><path d="M141 348 Q160 281 179 348" fill="#34444a"/><circle cx="240" cy="248" r="18" fill="#253033"/><path d="M220 348 Q240 270 260 348" fill="#566068"/><circle cx="330" cy="270" r="15" fill="#263134"/><path d="M314 348 Q330 289 346 348" fill="#4c3d3a"/><circle cx="382" cy="295" r="10" fill="#263134"/><path d="M372 348 Q382 307 392 348" fill="#5e4a3f"/>`,
      guardian: `<rect x="166" y="245" width="188" height="66" rx="8" fill="#503026"/><circle cx="260" cy="154" r="40" fill="#e9ceb6"/><path d="M216 225 Q260 185 304 225 L324 304 H196 Z" fill="#5c302b"/><path d="M203 265 H317" stroke="#dfbf78" stroke-width="8"/><rect x="218" y="242" width="84" height="52" rx="5" fill="#d8be82"/>`
    }[kind] || "";
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 390" aria-hidden="true">
      <defs><linearGradient id="sky-${kind}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${p[0]}"/><stop offset="100%" stop-color="#20373a"/></linearGradient></defs>
      <rect width="520" height="390" fill="url(#sky-${kind})"/><rect x="8" y="8" width="504" height="374" rx="18" fill="none" stroke="#11191b" stroke-width="12"/>
      <circle cx="403" cy="77" r="40" fill="${p[1]}" opacity=".86"/><path d="M20 320 Q260 253 500 320 L500 390 L20 390 Z" fill="rgba(18,33,35,.76)"/>
      <path d="M66 228 L152 164 L368 164 L454 228 L454 294 L66 294 Z" fill="${p[2]}" opacity=".96"/><path d="M38 240 L154 149 L366 149 L482 240" fill="none" stroke="#f1d69a" stroke-width="12" stroke-linecap="round"/>
      <rect x="225" y="227" width="70" height="67" fill="#eee4cf" opacity=".95"/>${details}
      <path d="M34 337 Q260 292 486 337" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="4" stroke-dasharray="9 11"/>
    </svg>`;
  }

  function applyHomeFontSize(size = homeFontSize) {
    homeFontSize = ["small", "medium", "large"].includes(size) ? size : "medium";
    safeStorage.set("hsiehFontSize", homeFontSize);
    document.documentElement.dataset.fontSize = homeFontSize;
    document.documentElement.style.setProperty("--user-font-scale", homeFontSize === "small" ? "1.04" : homeFontSize === "large" ? "1.48" : "1.24");
    const labels = { small: "小", medium: "中", large: "大" };
    const button = $("#font-size-button"); if (button) button.textContent = `字級：${labels[homeFontSize]}`;
    const select = $("#home-font-size"); if (select) select.value = homeFontSize;
  }

  function cycleHomeFontSize() {
    const order = ["small", "medium", "large"];
    applyHomeFontSize(order[(order.indexOf(homeFontSize) + 1) % order.length]);
  }

  function setHomeIntroRate(value) {
    const allowed = [0.25, 0.5, 1, 1.5, 2];
    const parsed = Number(value);
    homeIntroRate = allowed.includes(parsed) ? parsed : 1;
    safeStorage.set("hsiehAnimationRate", homeIntroRate);
    const select = $("#home-intro-speed"); if (select) select.value = String(homeIntroRate);
    document.documentElement.style.setProperty("--animation-time-scale", String(1 / homeIntroRate));
    scheduleHomeIntro();
  }

  function homeIntroDelay() { return Math.max(2200, HOME_INTRO_BASE_MS / homeIntroRate); }

  function renderHomeIntro() {
    const scene = HOME_INTRO_SCENES[homeIntroIndex];
    $("#home-intro-counter").textContent = `${String(homeIntroIndex + 1).padStart(2, "0")} / ${String(HOME_INTRO_SCENES.length).padStart(2, "0")}`;
    $("#home-intro-kicker").textContent = scene.kicker;
    $("#home-intro-title").textContent = scene.title;
    $("#home-intro-body").textContent = scene.body;
    $("#home-intro-caption").textContent = scene.caption;
    $("#home-intro-illustration").innerHTML = introIllustrationSvg(scene.kind);
    $("#home-intro-prev").disabled = homeIntroIndex === 0;
    $("#home-intro-next").textContent = homeIntroIndex === HOME_INTRO_SCENES.length - 1 ? "進入首頁" : "下一幕";
    $("#home-intro-progress").innerHTML = HOME_INTRO_SCENES.map((_, index) => `<span class="${index < homeIntroIndex ? "done" : index === homeIntroIndex ? "active" : ""}"></span>`).join("");
    const stage = document.querySelector(".home-intro-stage");
    stage?.classList.remove("home-intro-scene-refresh");
    void stage?.offsetWidth;
    stage?.classList.add("home-intro-scene-refresh");
  }

  function scheduleHomeIntro() {
    clearTimeout(homeIntroTimer);
    if (homeIntroIndex >= HOME_INTRO_SCENES.length - 1) {
      homeIntroTimer = setTimeout(finishHomeIntro, homeIntroDelay());
      return;
    }
    homeIntroTimer = setTimeout(() => {
      homeIntroIndex += 1;
      renderHomeIntro();
      scheduleHomeIntro();
    }, homeIntroDelay());
  }

  function finishHomeIntro() {
    clearTimeout(homeIntroTimer);
    $("#home-intro-overlay")?.classList.add("hidden");
    document.body.classList.remove("home-intro-active");
  }

  function changeHomeIntro(step) {
    const next = Math.max(0, Math.min(HOME_INTRO_SCENES.length - 1, homeIntroIndex + step));
    if (next === homeIntroIndex && step > 0 && homeIntroIndex === HOME_INTRO_SCENES.length - 1) {
      finishHomeIntro();
      return;
    }
    homeIntroIndex = next;
    renderHomeIntro();
    scheduleHomeIntro();
  }

  function updateBattleLink() {
    const difficulty = $("#difficulty-select")?.value || "normal";
    const params = new URLSearchParams({ leader: selectedLeader, difficulty });
    const link = $("#start-game");
    if (link) link.href = `battle.html?${params.toString()}`;
  }

  function selectLeader(leaderId) {
    selectedLeader = leaderId;
    $$(".leader-choice").forEach((button) => {
      const selected = button.dataset.leader === leaderId;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });
    updateBattleLink();
  }

  function renderStats() {
    let stats = { wins: 0, losses: 0, draws: 0 };
    try { stats = JSON.parse(safeStorage.get("hsiehCardGameStats")) || stats; } catch {}
    const target = $("#lifetime-stats");
    if (target) target.textContent = `累計：${stats.wins} 勝／${stats.losses} 敗／${stats.draws} 和`;
  }

  function openModal(id) { $(id)?.classList.remove("hidden"); }
  function closeModal(id) { $(id)?.classList.add("hidden"); }

  function renderComboRuleList() {
    const container = $("#combo-rule-list");
    if (!container) return;
    container.innerHTML = DATA.combos.map((combo) => {
      const cards = (combo.requiresCards || [])
        .map((id) => DATA.cards.find((card) => card.id === id)?.name || id)
        .join("＋");
      const prerequisiteCombos = (combo.requiresCombos || [])
        .map((id) => DATA.combos.find((item) => item.id === id)?.name || id)
        .join("＋");
      const requirements = [cards, prerequisiteCombos ? `先成立 ${prerequisiteCombos}` : ""]
        .filter(Boolean).join("；");
      return `
        <article class="combo-rule-item tier-${combo.tier}">
          <div><strong>${combo.name}</strong><small>第 ${combo.tier} 層｜+${combo.points}</small></div>
          <p>條件：${requirements}</p>
          <p>${combo.description}</p>
        </article>`;
    }).join("");
  }

  function renderTutorial() {
    const step = DATA.tutorialSteps[tutorialStep];
    $("#tutorial-progress-text").textContent = `${tutorialStep + 1} / ${DATA.tutorialSteps.length}`;
    $("#tutorial-step-title").textContent = step.title;
    $("#tutorial-step-body").textContent = step.body;
    $("#tutorial-prev").disabled = tutorialStep === 0;
    $("#tutorial-next").textContent = tutorialStep === DATA.tutorialSteps.length - 1 ? "完成" : "下一步";
  }

  function openTutorial() {
    tutorialStep = 0;
    renderTutorial();
    openModal("#tutorial-modal");
  }

  function beginBattle(event) {
    updateBattleLink();
    const link = $("#start-game");
    if (!link) return;
    if (event) event.preventDefault();
    window.location.href = link.href;
  }


  let homeViewportFrame = 0;

  function applyHomeViewportProfile() {
    cancelAnimationFrame(homeViewportFrame);
    homeViewportFrame = requestAnimationFrame(() => {
      const viewport = window.visualViewport;
      const width = Math.max(280, Math.round(viewport?.width || document.documentElement.clientWidth || window.innerWidth));
      const height = Math.max(320, Math.round(viewport?.height || document.documentElement.clientHeight || window.innerHeight));
      const screenWidth = Math.round(window.screen?.width || width);
      const screenHeight = Math.round(window.screen?.height || height);
      const screenRatio = screenWidth / Math.max(1, screenHeight);
      const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches || false;
      const mobile = coarsePointer || Math.min(width, height) <= 680;
      const orientation = width >= height ? "landscape" : "portrait";
      const ratio = width / height;
      const profile = mobile
        ? `mobile-${orientation}`
        : ratio >= 1.72
          ? "desktop-wide"
          : ratio <= 1.28
            ? "desktop-tall"
            : "desktop-standard";
      const root = document.documentElement;
      root.style.setProperty("--app-viewport-width", `${width}px`);
      root.style.setProperty("--app-viewport-height", `${height}px`);
      root.style.setProperty("--app-screen-width", `${screenWidth}px`);
      root.style.setProperty("--app-screen-height", `${screenHeight}px`);
      root.style.setProperty("--app-screen-aspect-ratio", screenRatio.toFixed(4));
      root.style.setProperty("--app-aspect-ratio", ratio.toFixed(4));
      root.dataset.deviceProfile = profile;
      root.dataset.orientation = orientation;
      root.dataset.screenOrientation = screenWidth >= screenHeight ? "landscape" : "portrait";
      document.body.dataset.deviceProfile = profile;
      document.body.dataset.orientation = orientation;
      document.body.dataset.compactHeight = height < 700 ? "true" : "false";
    });
  }

  function setupHomeViewportAdaptation() {
    applyHomeViewportProfile();
    window.addEventListener("resize", applyHomeViewportProfile, { passive: true });
    window.addEventListener("orientationchange", applyHomeViewportProfile, { passive: true });
    window.visualViewport?.addEventListener("resize", applyHomeViewportProfile, { passive: true });
    window.visualViewport?.addEventListener("scroll", applyHomeViewportProfile, { passive: true });
  }

  function init() {
    setupHomeViewportAdaptation();
    selectLeader("xieAn");
    renderStats();
    renderComboRuleList();
    applyHomeFontSize(homeFontSize);
    setHomeIntroRate(homeIntroRate);
    renderHomeIntro();
    scheduleHomeIntro();

    $$(".leader-choice").forEach((button) => {
      button.addEventListener("click", () => selectLeader(button.dataset.leader));
    });
    $("#home-intro-prev")?.addEventListener("click", () => changeHomeIntro(-1));
    $("#home-intro-next")?.addEventListener("click", () => changeHomeIntro(1));
    $("#home-intro-skip")?.addEventListener("click", finishHomeIntro);
    $("#home-intro-speed")?.addEventListener("change", (event) => setHomeIntroRate(event.target.value));
    $("#home-font-size")?.addEventListener("change", (event) => applyHomeFontSize(event.target.value));
    $("#font-size-button")?.addEventListener("click", cycleHomeFontSize);
    $("#start-game")?.addEventListener("click", beginBattle);
    $("#difficulty-select")?.addEventListener("change", updateBattleLink);
    $("#start-rules")?.addEventListener("click", () => openModal("#rules-modal"));
    $("#rules-button")?.addEventListener("click", () => openModal("#rules-modal"));
    $("#sources-button")?.addEventListener("click", () => openModal("#sources-modal"));
    $("#tutorial-button")?.addEventListener("click", openTutorial);
    $("#open-guided-tutorial")?.addEventListener("click", () => {
      closeModal("#rules-modal");
      openTutorial();
    });

    $("#tutorial-prev")?.addEventListener("click", () => {
      tutorialStep = Math.max(0, tutorialStep - 1);
      renderTutorial();
    });
    $("#tutorial-next")?.addEventListener("click", () => {
      if (tutorialStep < DATA.tutorialSteps.length - 1) {
        tutorialStep += 1;
        renderTutorial();
      } else {
        closeModal("#tutorial-modal");
      }
    });
    $("#tutorial-skip")?.addEventListener("click", () => closeModal("#tutorial-modal"));
    $("#tutorial-close")?.addEventListener("click", () => closeModal("#tutorial-modal"));

    $$('[data-close]').forEach((button) => {
      button.addEventListener("click", () => closeModal(button.dataset.close));
    });

    $$(".modal").forEach((modal) => {
      modal.addEventListener("click", (event) => {
        if (event.target === modal && !modal.classList.contains("locked")) modal.classList.add("hidden");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        ["#rules-modal", "#sources-modal", "#tutorial-modal"].forEach(closeModal);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
