(() => {
  "use strict";

  const DATA = window.GAME_DATA;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const HOME_INTRO_SCENES = [
    {
      kicker: "埕前",
      title: "風先到了，人才進門",
      body: "天色還亮，埕前已有風。屋脊收著最後一點光，門裡很安靜。你站了一會兒，才往前走。",
      caption: "埕前有風，門還未全開。",
      kind: "arrival"
    },
    {
      kicker: "屋脊",
      title: "屋脊抬得高，家聲便不必多說",
      body: "燕尾停在天光裡。牆面不說話。木頭與瓦片都留著舊日的氣味。人若肯抬頭，多少會懂一些。",
      caption: "屋脊像一句沒有寫完的話。",
      kind: "roof"
    },
    {
      kicker: "堂內",
      title: "門一層層進去，腳步也慢了",
      body: "門樓、禾埕、前堂、天井、後堂，一段接著一段。有人在這裡祭祖，也有人在這裡相聚。時間久了，格局便成了生活。",
      caption: "空間把人的腳步慢慢收整。",
      kind: "layout"
    },
    {
      kicker: "木與字",
      title: "近一些，才看見細部留下的重量",
      body: "彩繪在梁上。字在匾額與楹聯上。祖牌安靜地立著。風吹過去，木頭的顏色沒有改，話也沒有散。",
      caption: "字比人留得久，木頭比聲音更安靜。",
      kind: "detail"
    },
    {
      kicker: "牌局",
      title: "桌上已經擺好了牌",
      body: "守藏者沒有催你。他只把牌推到桌中央。懂得越多，地方就回得越深。若一時失手，堂前仍會留下一點光。",
      caption: "餘下的話，讓牌慢慢說。",
      kind: "guardian"
    }
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


  function introIllustrationSvg(kind) {
    const palette = {
      arrival: ["#8fc5e3", "#e9cf98", "#a25138"],
      roof: ["#79add0", "#efd08c", "#b85b3d"],
      layout: ["#99c1d7", "#d9c58f", "#8d684b"],
      detail: ["#7099a8", "#efb272", "#a74535"],
      guardian: ["#506c74", "#e5c681", "#60322c"]
    }[kind] || ["#8fc5e3", "#e9cf98", "#a25138"];
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 390" aria-hidden="true">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${palette[0]}"/>
            <stop offset="100%" stop-color="#20373a"/>
          </linearGradient>
        </defs>
        <rect width="520" height="390" fill="url(#sky)"/>
        <circle cx="398" cy="80" r="42" fill="${palette[1]}" opacity=".86"/>
        <path d="M24 315 Q260 250 496 315 L496 390 L24 390 Z" fill="rgba(18,33,35,.74)"/>
        <path d="M70 226 L154 164 L366 164 L450 226 L450 292 L70 292 Z" fill="${palette[2]}" opacity=".96"/>
        <path d="M42 238 L156 150 L364 150 L478 238" fill="none" stroke="#f1d69a" stroke-width="12" stroke-linecap="round"/>
        <rect x="225" y="226" width="70" height="66" fill="#eee4cf" opacity=".95"/>
        <rect x="130" y="205" width="44" height="87" fill="#c37753" opacity=".86"/>
        <rect x="346" y="205" width="44" height="87" fill="#c37753" opacity=".86"/>
        <path d="M112 306 Q260 264 408 306" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="4" stroke-dasharray="9 11"/>
      </svg>`;
  }

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
      homeIntroTimer = setTimeout(finishHomeIntro, 5200);
      return;
    }
    homeIntroTimer = setTimeout(() => {
      homeIntroIndex += 1;
      renderHomeIntro();
      scheduleHomeIntro();
    }, 5200);
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
    renderHomeIntro();
    scheduleHomeIntro();

    $$(".leader-choice").forEach((button) => {
      button.addEventListener("click", () => selectLeader(button.dataset.leader));
    });
    $("#home-intro-prev")?.addEventListener("click", () => changeHomeIntro(-1));
    $("#home-intro-next")?.addEventListener("click", () => changeHomeIntro(1));
    $("#home-intro-skip")?.addEventListener("click", finishHomeIntro);
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
