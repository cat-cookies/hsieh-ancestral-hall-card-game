(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const STORAGE_KEY = "hsiehHeritageJourneyEn";

  const branches = [
    {
      id: "space", title: "Spatial Order", subtitle: "Gatehouse, forecourt, halls, courtyard, and wings", icon: "🏛",
      steps: [
        { title: "Gatehouse and Forecourt", body: "The gatehouse marks the transition between the village and the ancestral precinct. The forecourt supports gathering, crop work, ritual preparation, and public movement, connecting the hall to everyday rural life.", facts: ["The gatehouse defines the threshold and entrance order.", "The forecourt supports both production and ritual activity.", "The approach view is part of the hall’s heritage landscape."] },
        { title: "Front Hall, Courtyard, and Rear Hall", body: "These spaces form the central axis. The front hall receives people and prepares ritual activity; the courtyard brings light, air, and transition; the rear hall concentrates ancestral worship and genealogical order.", facts: ["The central axis makes movement and ritual hierarchy legible.", "The courtyard provides environmental regulation and ceremonial transition.", "The rear hall is the core of ancestral worship."] },
        { title: "Left and Right Wings", body: "The wings extend the hall beyond worship. They may support study, meetings, storage, ritual preparation, and clan administration. Together with the two main halls, they create the two-hall, two-wing layout.", facts: ["Wings provide practical support spaces.", "Study and meeting spaces show educational and organizational roles.", "The two-hall, two-wing pattern is essential to the whole layout."] }
      ]
    },
    {
      id: "decoration", title: "Architectural Ornament", subtitle: "Bracket painting, swallowtail ridge, Five-Element Stones, and local craft", icon: "🎨",
      steps: [
        { title: "Painted Bracket Sets", body: "Bracket sets carry loads and extend the eaves, while painted surfaces turn structural members into visual focal points. Their colors, motifs, repairs, and material condition reveal both craftsmanship and conservation history.", facts: ["Bracket sets combine structural and decorative roles.", "Painting records craft techniques and historical taste.", "Conservation must distinguish original work, later repainting, and deterioration."] },
        { title: "Swallowtail Ridge and Roof", body: "The upturned ridge ends create a strong external identity. The ridge, roof materials, drainage, and repair history together shape the hall’s appearance and protect the timber structure and interior objects.", facts: ["The swallowtail ridge is a major visual identifier.", "Ridge profile and façade proportion create architectural presence.", "Roof maintenance is critical to the survival of timber and collections."] },
        { title: "Five-Element Stones, Land Dragon, and Bountiful Harvest", body: "These motifs connect spatial protection, land belief, agricultural production, seasonality, and hopes for stability. Ornament therefore preserves not only taste but also local ways of understanding land and life.", facts: ["Five-Element Stones and the Land Dragon express protection and spatial order.", "Bountiful Harvest imagery links the hall with agricultural life.", "Decorative themes are evidence of local social history."] }
      ]
    },
    {
      id: "text", title: "Ritual Writing", subtitle: "Plaques, couplets, ancestral tablets, and ritual order", icon: "📜",
      steps: [
        { title: "Hall Name, Plaques, and Couplets", body: "Hall names and plaques identify lineage, values, and spaces. Couplets use paired lines to connect ancestry, ethics, education, and the function of the hall. Their position, calligraphy, material, and condition are all significant.", facts: ["The hall name is a key symbol of lineage identity.", "Couplets often communicate remembrance, ethics, and family teaching.", "Text, placement, calligraphy, and material all carry heritage value."] },
        { title: "Ancestral Tablets", body: "Names, generations, and positions transform lineage relationships into a visible ritual order. The arrangement of tablets is therefore as important as their materials and inscriptions.", facts: ["Tablets make genealogical order visible.", "Position and sequence contain historical information.", "Removing tablets from context can weaken their meaning."] },
        { title: "Root and Source, Seasonal Rites, and the Heaven Incense Burner", body: "The idea of root and source emphasizes gratitude to ancestors. Spring and autumn rites connect worship to the seasonal cycle. The Heaven incense burner links the lineage hall to worship of Heaven and local belief.", facts: ["Root and source expresses remembrance and gratitude.", "Seasonal rites connect ritual with the calendar.", "The Heaven incense burner reflects layered ritual belief."] }
      ]
    },
    {
      id: "community", title: "Local Memory", subtitle: "Hakka life, ritual, education, and clan organization", icon: "🌾",
      steps: [
        { title: "Forecourt and Rural Life", body: "The forecourt supports crop work and daily activity, then shifts into a place for offerings, gatherings, and ritual preparation. This flexible use connects the hall to agricultural time and village life.", facts: ["The forecourt directly connects the hall with rural production.", "The same space changes between everyday and ceremonial use.", "Memory survives in patterns of use, not only in façades."] },
        { title: "Study, Teaching, and Common Affairs", body: "Study rooms and related spaces may support education, discussion, ritual planning, property management, and common clan affairs. The hall therefore carries knowledge, governance, and intergenerational responsibility.", facts: ["Education makes the hall an intergenerational learning place.", "Meetings and management reveal clan organization.", "Conservation should address both architecture and social practice."] },
        { title: "Ritual and Contemporary Conservation", body: "Ritual brings people back into the hall, activates objects, renews genealogical knowledge, and sustains shared memory. Conservation must therefore record procedures, oral history, participant knowledge, and maintenance practice, not only repair roofs and timber.", facts: ["Ritual activates the hall as a living place.", "Oral history and use knowledge are essential heritage content.", "Complete conservation links tangible and intangible heritage."] }
      ]
    }
  ];

  let completed = new Set();
  let currentBranch = null;
  let currentStep = 0;

  function loadProgress() { try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); completed = new Set(Array.isArray(saved) ? saved : []); } catch { completed = new Set(); } }
  function saveProgress() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed])); } catch {} }

  function ensureUi() {
    if ($("#heritage-journey-modal")) return;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <div aria-labelledby="heritage-journey-title" aria-modal="true" class="modal hidden heritage-journey-modal" id="heritage-journey-modal" role="dialog">
        <div class="modal-panel heritage-journey-panel">
          <button aria-label="Close" class="modal-close" id="heritage-journey-close" type="button">×</button>
          <section id="heritage-journey-hub">
            <p class="eyebrow">After the Match · Detailed Heritage Learning</p>
            <h2 id="heritage-journey-title">The Guardian Leaves Four Paths</h2>
            <p class="heritage-journey-intro">This section uses detailed explanations. Completing each path reveals one memory-puzzle piece. Complete all four paths to enter your name and download the full background image and certificate.</p>
            <div class="heritage-branch-grid" id="heritage-branch-grid"></div>
            <section class="memory-puzzle-section"><div class="memory-puzzle-heading"><strong>Memory Puzzle</strong><span id="memory-puzzle-count">0 / 4</span></div><div class="memory-puzzle-grid" id="memory-puzzle-grid"></div></section>
            <section class="heritage-completion-panel hidden" id="heritage-completion-panel">
              <h3>All Four Heritage Paths Are Complete</h3><p>Enter your name to download the complete hall background and heritage-learning certificate.</p>
              <label class="field-label" for="certificate-name">Name</label><input class="select-input" id="certificate-name" maxlength="40" placeholder="Enter your name" type="text"/>
              <div class="modal-actions"><button class="secondary-button" id="download-background" type="button">Download Full Background</button><button class="primary-button" id="download-certificate" type="button">Download Certificate</button></div>
              <p class="certificate-status" id="certificate-status" aria-live="polite"></p>
            </section>
          </section>
          <section class="heritage-branch-detail hidden" id="heritage-branch-detail">
            <div class="heritage-detail-topline"><span id="heritage-detail-progress"></span><button class="ghost-button" id="heritage-back-hub" type="button">Back to Paths</button></div>
            <p class="eyebrow" id="heritage-detail-kicker"></p><h2 id="heritage-detail-title"></h2><p class="heritage-detail-body" id="heritage-detail-body"></p><div class="heritage-facts" id="heritage-detail-facts"></div>
            <div class="modal-actions"><button class="secondary-button" id="heritage-detail-prev" type="button">Previous</button><button class="primary-button" id="heritage-detail-next" type="button">Next</button></div>
          </section>
        </div>
      </div>`;
    document.body.appendChild(wrapper.firstElementChild);
  }

  function renderHub() {
    const grid = $("#heritage-branch-grid");
    grid.innerHTML = branches.map((branch) => `<button class="heritage-branch-button ${completed.has(branch.id) ? "completed" : ""}" data-branch="${branch.id}" type="button"><span class="heritage-branch-icon">${branch.icon}</span><span><strong>${branch.title}</strong><small>${branch.subtitle}</small></span><b>${completed.has(branch.id) ? "Completed" : "Explore"}</b></button>`).join("");
    grid.querySelectorAll("[data-branch]").forEach((button) => button.addEventListener("click", () => openBranch(button.dataset.branch)));
    $("#memory-puzzle-grid").innerHTML = branches.map((branch, index) => { const x = index % 2 === 0 ? "0%" : "100%"; const y = index < 2 ? "0%" : "100%"; return `<div class="memory-puzzle-piece ${completed.has(branch.id) ? "revealed" : ""}" style="--piece-x:${x};--piece-y:${y}"><span>${completed.has(branch.id) ? branch.icon : "?"}</span></div>`; }).join("");
    $("#memory-puzzle-count").textContent = `${completed.size} / ${branches.length}`;
    $("#heritage-completion-panel").classList.toggle("hidden", completed.size !== branches.length);
  }

  function openJourney() { ensureUi(); loadProgress(); renderHub(); $("#game-over-modal")?.classList.add("hidden"); $("#heritage-journey-hub").classList.remove("hidden"); $("#heritage-branch-detail").classList.add("hidden"); $("#heritage-journey-modal").classList.remove("hidden"); }
  function closeJourney() { $("#heritage-journey-modal")?.classList.add("hidden"); $("#game-over-modal")?.classList.remove("hidden"); }
  function openBranch(id) { currentBranch = branches.find((branch) => branch.id === id) || branches[0]; currentStep = 0; $("#heritage-journey-hub").classList.add("hidden"); $("#heritage-branch-detail").classList.remove("hidden"); renderBranchStep(); }
  function renderBranchStep() { const step = currentBranch.steps[currentStep]; $("#heritage-detail-progress").textContent = `${currentBranch.title} | ${currentStep + 1} / ${currentBranch.steps.length}`; $("#heritage-detail-kicker").textContent = currentBranch.subtitle; $("#heritage-detail-title").textContent = step.title; $("#heritage-detail-body").textContent = step.body; $("#heritage-detail-facts").innerHTML = `<h3>Key Knowledge</h3><ul>${step.facts.map((fact) => `<li>${fact}</li>`).join("")}</ul>`; $("#heritage-detail-prev").disabled = currentStep === 0; $("#heritage-detail-next").textContent = currentStep === currentBranch.steps.length - 1 ? "Complete This Path" : "Next"; }
  function nextStep() { if (currentStep < currentBranch.steps.length - 1) { currentStep += 1; renderBranchStep(); return; } completed.add(currentBranch.id); saveProgress(); $("#heritage-journey-hub").classList.remove("hidden"); $("#heritage-branch-detail").classList.add("hidden"); renderHub(); }
  function previousStep() { if (currentStep > 0) { currentStep -= 1; renderBranchStep(); } }
  function backToHub() { $("#heritage-journey-hub").classList.remove("hidden"); $("#heritage-branch-detail").classList.add("hidden"); renderHub(); }
  function triggerDownload(href, filename) { const a = document.createElement("a"); a.href = href; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); }
  function downloadBackground() { triggerDownload("assets/real-hall.png", "hsieh-ancestral-hall-full-background.png"); }
  function loadImage(src) { return new Promise((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = src; }); }
  function drawCover(ctx, image, width, height) { const scale = Math.max(width / image.width, height / image.height); const sw = width / scale; const sh = height / scale; ctx.drawImage(image, (image.width - sw) / 2, (image.height - sh) / 2, sw, sh, 0, 0, width, height); }
  function wrapWords(ctx, text, x, y, maxWidth, lineHeight) { const words = text.split(/\s+/); let line = ""; let currentY = y; words.forEach((word) => { const test = line ? `${line} ${word}` : word; if (ctx.measureText(test).width > maxWidth && line) { ctx.fillText(line, x, currentY); line = word; currentY += lineHeight; } else line = test; }); if (line) ctx.fillText(line, x, currentY); return currentY; }

  async function downloadCertificate() {
    const status = $("#certificate-status"); const name = $("#certificate-name").value.trim();
    if (!name) { status.textContent = "Please enter your name."; $("#certificate-name").focus(); return; }
    status.textContent = "Creating certificate…";
    try {
      const image = await loadImage("assets/real-hall.png"); const canvas = document.createElement("canvas"); canvas.width = 1600; canvas.height = 1130; const ctx = canvas.getContext("2d"); drawCover(ctx, image, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height); gradient.addColorStop(0, "rgba(5,17,20,.55)"); gradient.addColorStop(.5, "rgba(5,17,20,.72)"); gradient.addColorStop(1, "rgba(5,17,20,.88)"); ctx.fillStyle = gradient; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#e4c27e"; ctx.lineWidth = 10; ctx.strokeRect(44, 44, canvas.width - 88, canvas.height - 88); ctx.strokeStyle = "rgba(228,194,126,.55)"; ctx.lineWidth = 3; ctx.strokeRect(68, 68, canvas.width - 136, canvas.height - 136);
      ctx.textAlign = "center"; ctx.fillStyle = "#f0ddb0"; ctx.font = "700 74px Georgia, serif"; ctx.fillText("Hsieh Ancestral Hall", 800, 185); ctx.font = "700 58px Georgia, serif"; ctx.fillText("Heritage Learning Certificate", 800, 260);
      ctx.font = "36px Arial, sans-serif"; ctx.fillStyle = "#e8e0d0"; ctx.fillText("This certifies that", 800, 360); ctx.font = "700 72px Georgia, serif"; ctx.fillStyle = "#ffffff"; ctx.fillText(name, 800, 465);
      ctx.font = "34px Arial, sans-serif"; ctx.fillStyle = "#e8e0d0"; wrapWords(ctx, "completed the four learning paths in spatial order, architectural ornament, ritual writing, and local memory, and completed the Hsieh Ancestral Hall card match.", 800, 580, 1180, 52);
      ctx.font = "29px Arial, sans-serif"; ctx.fillStyle = "#f0ddb0"; ctx.fillText(`Match result: ${$("#game-over-score")?.textContent || "Completed"}`, 800, 770); ctx.fillText(`Date: ${new Date().toLocaleDateString("en-US")}`, 800, 825);
      ctx.font = "25px Arial, sans-serif"; ctx.fillStyle = "#d3c8b2"; ctx.fillText("Architecture, ritual, objects, and community memory are preserved together.", 800, 940);
      canvas.toBlob((blob) => { if (!blob) return; const url = URL.createObjectURL(blob); triggerDownload(url, `${name}_Hsieh_Heritage_Certificate.png`); setTimeout(() => URL.revokeObjectURL(url), 1000); status.textContent = "Certificate created."; }, "image/png");
    } catch (error) { console.error(error); status.textContent = "Certificate creation failed. Please reload and try again."; }
  }

  function init() { ensureUi(); loadProgress(); $("#heritage-journey-button")?.addEventListener("click", openJourney); $("#heritage-journey-close")?.addEventListener("click", closeJourney); $("#heritage-back-hub")?.addEventListener("click", backToHub); $("#heritage-detail-prev")?.addEventListener("click", previousStep); $("#heritage-detail-next")?.addEventListener("click", nextStep); $("#download-background")?.addEventListener("click", downloadBackground); $("#download-certificate")?.addEventListener("click", downloadCertificate); $("#heritage-journey-modal")?.addEventListener("click", (event) => { if (event.target === event.currentTarget) closeJourney(); }); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true }); else init();
})();
