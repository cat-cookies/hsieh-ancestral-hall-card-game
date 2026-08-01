(() => {
  "use strict";

  const DATA = window.GAME_DATA;
  if (!DATA?.cards) return;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const state = {
    filter: "all",
    query: ""
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalize(value) {
    return String(value ?? "").toLocaleLowerCase("zh-Hant-TW").replace(/\s+/g, "");
  }

  function matches(card) {
    if (state.filter !== "all" && card.type !== state.filter) return false;
    if (!state.query) return true;
    const haystack = normalize([
      card.name,
      DATA.rows[card.type]?.label,
      card.rarity,
      card.effectText,
      card.culturalNote,
      card.valueNote
    ].join(" "));
    return haystack.includes(normalize(state.query));
  }

  function removeSourceAttributions(root = document) {
    root.querySelectorAll(".catalog-card-body footer, .catalog-source, [data-catalog-source]").forEach((node) => node.remove());

    root.querySelectorAll(".catalog-card-body *").forEach((node) => {
      const text = (node.textContent || "").trim();
      if (/^(內容依據|資料依據|來源)\s*[：:]/.test(text)) {
        node.remove();
      }
    });
  }

  function render() {
    const grid = $("#card-library-grid");
    const count = $("#card-library-count");
    if (!grid || !count) return;

    const cards = DATA.cards.filter(matches);
    count.textContent = `顯示 ${cards.length}／${DATA.cards.length} 張`;

    if (!cards.length) {
      grid.innerHTML = '<p class="catalog-empty">找不到符合條件的卡牌，請更換關鍵字或篩選類型。</p>';
      return;
    }

    grid.innerHTML = cards.map((card) => {
      const row = DATA.rows[card.type];
      return `
        <details class="catalog-card catalog-${escapeHtml(card.type)}">
          <summary>
            <span class="catalog-card-icon" aria-hidden="true">${escapeHtml(card.icon)}</span>
            <span class="catalog-card-heading">
              <span class="catalog-card-meta">${escapeHtml(row?.label || card.type)}｜${escapeHtml(card.rarity)}</span>
              <strong>${escapeHtml(card.name)}</strong>
            </span>
            <span class="catalog-card-power" title="基礎力量">${escapeHtml(card.power)}</span>
          </summary>
          <div class="catalog-card-body">
            <section>
              <h3>遊戲效果</h3>
              <p>${escapeHtml(card.effectText)}</p>
            </section>
            <section>
              <h3>說明</h3>
              <p>${escapeHtml(card.culturalNote)}</p>
            </section>
            <section>
              <h3>文化資產價值</h3>
              <p>${escapeHtml(card.valueNote || "這張卡牌呈現謝氏宗祠歷史、空間、工藝或禮制的重要面向。")}</p>
            </section>
          </div>
        </details>`;
    }).join("");

    // 卡牌圖鑑只呈現遊戲效果、說明與文化資產價值；不顯示逐卡內容依據。
    removeSourceAttributions(grid);
  }

  function openCatalog() {
    const modal = $("#card-library-modal");
    if (!modal) return;
    modal.classList.remove("hidden");
    render();
    window.setTimeout(() => $("#card-library-search")?.focus(), 50);
  }

  function closeCatalog() {
    $("#card-library-modal")?.classList.add("hidden");
  }

  function init() {
    $("#cards-button")?.addEventListener("click", openCatalog);

    $("#card-library-search")?.addEventListener("input", (event) => {
      state.query = event.currentTarget.value;
      render();
    });

    $$('[data-card-filter]').forEach((button) => {
      button.addEventListener("click", () => {
        state.filter = button.dataset.cardFilter || "all";
        $$('[data-card-filter]').forEach((item) => {
          const active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", active ? "true" : "false");
        });
        render();
      });
    });

    $('[data-close="#card-library-modal"]')?.addEventListener("click", closeCatalog);

    $("#card-library-modal")?.addEventListener("click", (event) => {
      if (event.target === event.currentTarget) closeCatalog();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !$("#card-library-modal")?.classList.contains("hidden")) {
        closeCatalog();
      }
    });

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
