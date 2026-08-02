(() => {
  "use strict";

  const DATA = window.GAME_DATA;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const HOME_INTRO_SCENES = [
    {
      kicker: "Forecourt",
      title: "The Wind Arrived Before the Visitor",
      body: "The light had not left the forecourt. Wind moved along the roofline. The doorway was quiet. You stood there for a moment before walking forward.",
      caption: "The wind crossed the forecourt. The door was not fully open.",
      kind: "arrival"
    },
    {
      kicker: "Roofline",
      title: "The Ridge Rose High. The House Needed No Introduction",
      body: "First the roof. Then the swallowtail ridge. The lines held steady against the sky. The walls said nothing. A person who looked up would understand something.",
      caption: "The ridge stood in the last light like an unfinished sentence.",
      kind: "roof"
    },
    {
      kicker: "Inside",
      title: "Past the Gate, the Steps Became Slower",
      body: "Gatehouse. Forecourt. Front hall. Courtyard. Rear hall. One space followed another. People worshipped here. They gathered here. In time, the layout became part of life.",
      caption: "The rooms gathered the footsteps and set them in order.",
      kind: "layout"
    },
    {
      kicker: "Wood and Words",
      title: "Up Close, the Details Carried Weight",
      body: "Paint remained on the beams. Words remained on plaques and couplets. Ancestral tablets stood without movement. The wind passed. The wood kept its color. The words stayed.",
      caption: "Wood was quieter than a voice, and it lasted longer.",
      kind: "detail"
    },
    {
      kicker: "The Match",
      title: "The Cards Were Already on the Table",
      body: "The Guardian did not hurry you. He pushed the deck toward the center. The deeper the understanding, the deeper the reply. Even after a poor hand, a little light remained beneath the eaves.",
      caption: "The rest would be said by the cards.",
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
    $("#home-intro-next").textContent = homeIntroIndex === HOME_INTRO_SCENES.length - 1 ? "Enter Home" : "Next";
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
    if (link) link.href = `battle-en.html?${params.toString()}`;
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
    if (target) target.textContent = `Record: ${stats.wins} wins / ${stats.losses} losses / ${stats.draws} draws`;
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
      const requirements = [cards, prerequisiteCombos ? `First complete ${prerequisiteCombos}` : ""]
        .filter(Boolean).join("；");
      return `
        <article class="combo-rule-item tier-${combo.tier}">
          <div><strong>${combo.name}</strong><small>Tier ${combo.tier} | +${combo.points}</small></div>
          <p>Requirements: ${requirements}</p>
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
    $("#tutorial-next").textContent = tutorialStep === DATA.tutorialSteps.length - 1 ? "Done" : "Next";
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

  function init() {
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
