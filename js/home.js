(() => {
  "use strict";

  const DATA = window.GAME_DATA;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

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

  function init() {
    selectLeader("xieAn");
    renderStats();
    renderComboRuleList();

    $$(".leader-choice").forEach((button) => {
      button.addEventListener("click", () => selectLeader(button.dataset.leader));
    });
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
