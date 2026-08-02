(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const STORAGE_KEY = "hsiehHeritageJourneyZh";

  const branches = [
    {
      id: "space",
      title: "空間格局線",
      subtitle: "從門樓、禾埕、前後堂到左右橫屋",
      icon: "🏛",
      steps: [
        {
          title: "門樓與禾埕：宗祠的外部前場",
          body: "門樓不是單純的入口，而是區分宗祠內外、引導視線與建立身分的重要空間節點。門樓前後的禾埕則提供集會、曬穀、祭典準備與人群停留的場所，使宗祠與聚落日常生活相連。",
          facts: ["門樓負責界定內外與建立入口秩序。", "禾埕兼具生產、集會與祭典使用功能。", "由禾埕望向門樓與正身，可形成宗祠最具辨識度的外部景觀。"]
        },
        {
          title: "前堂、天井與後堂：中軸線的禮序",
          body: "前堂、天井與後堂構成宗祠最重要的中軸空間。前堂負責迎接、集會與儀式準備；天井提供採光、通風與空間轉折；後堂則集中祖先祭祀、祖牌安置與家族禮序。三者依序連接，使人的移動逐漸由公共空間進入較莊重的祭祀核心。",
          facts: ["中軸線使動線與祭祀層次清楚可辨。", "天井同時具環境調節與儀式轉場功能。", "後堂是祖先祭祀與宗族秩序的核心。"]
        },
        {
          title: "左右橫屋：生活與教化的延伸空間",
          body: "左右橫屋使宗祠不只具有祭祀功能，也能容納讀書、議事、準備祭典、保存器物與處理家族公共事務。它們與前後堂共同形成二堂二橫的格局，反映客家宗祠兼具禮制、生活與組織運作的特性。",
          facts: ["橫屋補充正身空間不足，承擔多種實際功能。", "書房與議事空間反映宗族教化與公共治理。", "二堂二橫是理解整體格局的重要線索。"]
        }
      ]
    },
    {
      id: "decoration",
      title: "建築裝飾線",
      subtitle: "斗栱彩繪、燕尾脊、五行石與地方工藝",
      icon: "🎨",
      steps: [
        {
          title: "斗栱彩繪：結構與裝飾的交會",
          body: "斗栱原本具有承接屋架、傳遞重量與擴大出簷的結構作用。宗祠中的斗栱彩繪又進一步呈現色彩配置、圖案選擇與工匠技術，使結構構件同時成為視覺焦點。觀察斗栱時，應同時注意木構造功能、彩繪保存狀態與不同修繕時期留下的差異。",
          facts: ["斗栱兼具結構與裝飾功能。", "彩繪可反映工匠技法與時代審美。", "保存工作需區分原有彩繪、後期補繪與材料劣化。"]
        },
        {
          title: "燕尾脊與屋面：宗祠身分的外部標誌",
          body: "燕尾脊以屋脊兩端向上揚起的輪廓形成強烈識別。它不只是造型，也與建築等級、地方審美及宗祠對外展現的家族身分有關。屋面材料、脊飾、排水與修繕方式，則共同影響建築外觀與長期保存。",
          facts: ["燕尾脊是宗祠外觀的重要識別元素。", "屋脊線條與立面比例共同形成建築氣勢。", "屋面維護直接關係木構造與室內文物安全。"]
        },
        {
          title: "五行石、土地龍神與五穀豐收",
          body: "五行石與土地龍神反映地方對方位、地氣、護佑與居住秩序的理解；五穀豐收則把農村生產、歲時循環與生活願望帶入建築裝飾。這些題材使宗祠工藝不只服務審美，也保存地方社會如何理解自然、土地與生活安定。",
          facts: ["五行石與土地龍神具有護佑與空間秩序意涵。", "五穀豐收連結農業生活與歲時記憶。", "裝飾題材是地方生活史的重要證據。"]
        }
      ]
    },
    {
      id: "text",
      title: "祭祀文字線",
      subtitle: "匾額、楹聯、祖牌與祭祀秩序",
      icon: "📜",
      steps: [
        {
          title: "堂號、匾額與楹聯：建築中的公開文字",
          body: "堂號與匾額用簡短文字標示家族身分、價值與空間名稱；楹聯則透過成對語句，連結祖先記憶、倫理教化與宗祠功能。這些文字通常位於視線明顯處，既是裝飾，也是向族人與訪客公開傳達家族理念的媒介。",
          facts: ["堂號是家族識別與歷史記憶的重要符號。", "楹聯常呈現報本、敦倫、教化與家風。", "文字位置、書法、材質與保存狀態都具有文化資產價值。"]
        },
        {
          title: "祖牌神位：祖先記憶的具體載體",
          body: "祖牌神位以姓名、世系與昭穆位置，使抽象的祖先關係轉化為可祭祀、可辨識的秩序。祖牌的排列、稱謂與祭祀位置，反映家族如何理解血緣、世代與共同身分。保存祖牌時，除材質與字跡外，也必須重視原有排列與使用脈絡。",
          facts: ["祖牌把世系關係轉化為可見的祭祀秩序。", "位置與排列本身就是重要資訊。", "離開原有脈絡的祖牌，文化意義可能大幅減弱。"]
        },
        {
          title: "木本水源、春祭秋嘗與天公爐",
          body: "木本水源強調追念根源與報答祖德；春祭秋嘗則呈現按歲時進行祭祀的傳統；天公爐連結敬天與地方信仰。這些文字、器物與儀式共同構成宗祠的祭祀系統，使建築空間在特定時間被重新啟動。",
          facts: ["木本水源是報本追遠的重要觀念。", "春祭秋嘗使祭祀與歲時循環結合。", "天公爐反映敬天信仰與祭祀層次。"]
        }
      ]
    },
    {
      id: "community",
      title: "地方記憶線",
      subtitle: "客家生活、祭典、教育與宗族組織",
      icon: "🌾",
      steps: [
        {
          title: "禾埕與農村生活",
          body: "禾埕平時可處理農作、曬穀與日常活動，祭典時又能容納人群、供品與儀式準備。它使宗祠不是孤立的紀念建築，而是與地方生產、季節變化及生活節奏相互連結的公共空間。",
          facts: ["禾埕把宗祠與農村生產直接連結。", "同一空間可在日常與祭典之間轉換。", "地方記憶常保存在使用方式，而不只保存在建築外觀。"]
        },
        {
          title: "書房、教化與家族公共事務",
          body: "宗祠中的書房或相關空間可承擔讀書、教化與培養後輩的功能。宗族也可能在此議事、管理祭產、安排祭典與處理共同事務。因此，宗祠同時是一個保存倫理規範、知識傳承與家族治理的場所。",
          facts: ["教育功能使宗祠成為跨世代知識傳承空間。", "議事與管理反映宗族組織的制度面。", "文化資產保存應注意建築與社會運作的共同歷史。"]
        },
        {
          title: "祭典與當代保存",
          body: "祭典讓族人重新進入宗祠、使用器物、辨認世系並維持共同記憶。當代保存不能只修復屋瓦與木構造，也需要記錄祭典程序、參與者知識、口述歷史與日常維護方式。只有建築、物件與實踐共同被理解，宗祠的文化價值才較完整。",
          facts: ["祭典是活化宗祠空間的重要實踐。", "口述歷史與使用知識屬於不可忽略的文化內容。", "完整保存需同時關照有形與無形文化資產。"]
        }
      ]
    }
  ];

  let completed = new Set();
  let currentBranch = null;
  let currentStep = 0;

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      completed = new Set(Array.isArray(saved) ? saved : []);
    } catch {
      completed = new Set();
    }
  }

  function saveProgress() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed])); } catch {}
  }

  function ensureUi() {
    if ($("#heritage-journey-modal")) return;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <div aria-labelledby="heritage-journey-title" aria-modal="true" class="modal hidden heritage-journey-modal" id="heritage-journey-modal" role="dialog">
        <div class="modal-panel heritage-journey-panel">
          <button aria-label="關閉" class="modal-close" id="heritage-journey-close" type="button">×</button>
          <section id="heritage-journey-hub">
            <p class="eyebrow">牌局之後・文化資產深度學習</p>
            <h2 id="heritage-journey-title">守藏者留下四條路</h2>
            <p class="heritage-journey-intro">這一階段改用詳細說明。每完成一條支線，就會留下1塊記憶拼圖；四條支線都完成後，可輸入名字下載完整背景圖與文化學習獎狀。</p>
            <div class="heritage-branch-grid" id="heritage-branch-grid"></div>
            <section class="memory-puzzle-section">
              <div class="memory-puzzle-heading"><strong>記憶拼圖</strong><span id="memory-puzzle-count">0／4</span></div>
              <div class="memory-puzzle-grid" id="memory-puzzle-grid"></div>
            </section>
            <section class="heritage-completion-panel hidden" id="heritage-completion-panel">
              <h3>四條文化支線已完成</h3>
              <p>請輸入姓名，再下載謝氏宗祠完整背景圖與文化資產學習獎狀。</p>
              <label class="field-label" for="certificate-name">姓名</label>
              <input class="select-input" id="certificate-name" maxlength="40" placeholder="請輸入姓名" type="text"/>
              <div class="modal-actions">
                <button class="secondary-button" id="download-background" type="button">下載完整背景圖</button>
                <button class="primary-button" id="download-certificate" type="button">下載獎狀</button>
              </div>
              <p class="certificate-status" id="certificate-status" aria-live="polite"></p>
            </section>
          </section>
          <section class="heritage-branch-detail hidden" id="heritage-branch-detail">
            <div class="heritage-detail-topline"><span id="heritage-detail-progress"></span><button class="ghost-button" id="heritage-back-hub" type="button">返回支線選單</button></div>
            <p class="eyebrow" id="heritage-detail-kicker"></p>
            <h2 id="heritage-detail-title"></h2>
            <p class="heritage-detail-body" id="heritage-detail-body"></p>
            <div class="heritage-facts" id="heritage-detail-facts"></div>
            <div class="modal-actions">
              <button class="secondary-button" id="heritage-detail-prev" type="button">上一節</button>
              <button class="primary-button" id="heritage-detail-next" type="button">下一節</button>
            </div>
          </section>
        </div>
      </div>`;
    document.body.appendChild(wrapper.firstElementChild);
  }

  function renderHub() {
    const grid = $("#heritage-branch-grid");
    grid.innerHTML = branches.map((branch) => `
      <button class="heritage-branch-button ${completed.has(branch.id) ? "completed" : ""}" data-branch="${branch.id}" type="button">
        <span class="heritage-branch-icon">${branch.icon}</span>
        <span><strong>${branch.title}</strong><small>${branch.subtitle}</small></span>
        <b>${completed.has(branch.id) ? "已完成" : "開始探索"}</b>
      </button>`).join("");
    grid.querySelectorAll("[data-branch]").forEach((button) => button.addEventListener("click", () => openBranch(button.dataset.branch)));

    const puzzle = $("#memory-puzzle-grid");
    puzzle.innerHTML = branches.map((branch, index) => {
      const x = index % 2 === 0 ? "0%" : "100%";
      const y = index < 2 ? "0%" : "100%";
      return `<div class="memory-puzzle-piece ${completed.has(branch.id) ? "revealed" : ""}" style="--piece-x:${x};--piece-y:${y}"><span>${completed.has(branch.id) ? branch.icon : "?"}</span></div>`;
    }).join("");
    $("#memory-puzzle-count").textContent = `${completed.size}／${branches.length}`;
    $("#heritage-completion-panel").classList.toggle("hidden", completed.size !== branches.length);
  }

  function openJourney() {
    ensureUi();
    loadProgress();
    renderHub();
    $("#game-over-modal")?.classList.add("hidden");
    $("#heritage-journey-hub").classList.remove("hidden");
    $("#heritage-branch-detail").classList.add("hidden");
    $("#heritage-journey-modal").classList.remove("hidden");
  }

  function closeJourney() {
    $("#heritage-journey-modal")?.classList.add("hidden");
    $("#game-over-modal")?.classList.remove("hidden");
  }

  function openBranch(id) {
    currentBranch = branches.find((branch) => branch.id === id) || branches[0];
    currentStep = 0;
    $("#heritage-journey-hub").classList.add("hidden");
    $("#heritage-branch-detail").classList.remove("hidden");
    renderBranchStep();
  }

  function renderBranchStep() {
    const step = currentBranch.steps[currentStep];
    $("#heritage-detail-progress").textContent = `${currentBranch.title}｜${currentStep + 1}／${currentBranch.steps.length}`;
    $("#heritage-detail-kicker").textContent = currentBranch.subtitle;
    $("#heritage-detail-title").textContent = step.title;
    $("#heritage-detail-body").textContent = step.body;
    $("#heritage-detail-facts").innerHTML = `<h3>重點知識</h3><ul>${step.facts.map((fact) => `<li>${fact}</li>`).join("")}</ul>`;
    $("#heritage-detail-prev").disabled = currentStep === 0;
    $("#heritage-detail-next").textContent = currentStep === currentBranch.steps.length - 1 ? "完成這條支線" : "下一節";
  }

  function nextStep() {
    if (currentStep < currentBranch.steps.length - 1) {
      currentStep += 1;
      renderBranchStep();
      return;
    }
    completed.add(currentBranch.id);
    saveProgress();
    $("#heritage-journey-hub").classList.remove("hidden");
    $("#heritage-branch-detail").classList.add("hidden");
    renderHub();
  }

  function previousStep() {
    if (currentStep > 0) {
      currentStep -= 1;
      renderBranchStep();
    }
  }

  function backToHub() {
    $("#heritage-journey-hub").classList.remove("hidden");
    $("#heritage-branch-detail").classList.add("hidden");
    renderHub();
  }

  function triggerDownload(href, filename) {
    const a = document.createElement("a");
    a.href = href;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function downloadBackground() {
    triggerDownload("assets/real-hall.png", "謝氏宗祠完整背景圖.png");
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }

  function drawCover(ctx, image, width, height) {
    const scale = Math.max(width / image.width, height / image.height);
    const sw = width / scale;
    const sh = height / scale;
    const sx = (image.width - sw) / 2;
    const sy = (image.height - sh) / 2;
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, width, height);
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const chars = [...text];
    let line = "";
    let currentY = y;
    chars.forEach((char) => {
      const test = line + char;
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, x, currentY);
        line = char;
        currentY += lineHeight;
      } else {
        line = test;
      }
    });
    if (line) ctx.fillText(line, x, currentY);
    return currentY;
  }

  async function downloadCertificate() {
    const status = $("#certificate-status");
    const name = $("#certificate-name").value.trim();
    if (!name) {
      status.textContent = "請先輸入姓名。";
      $("#certificate-name").focus();
      return;
    }
    status.textContent = "正在製作獎狀……";
    try {
      const image = await loadImage("assets/real-hall.png");
      const canvas = document.createElement("canvas");
      canvas.width = 1600;
      canvas.height = 1130;
      const ctx = canvas.getContext("2d");
      drawCover(ctx, image, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(5,17,20,.55)");
      gradient.addColorStop(.5, "rgba(5,17,20,.72)");
      gradient.addColorStop(1, "rgba(5,17,20,.88)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#e4c27e";
      ctx.lineWidth = 10;
      ctx.strokeRect(44, 44, canvas.width - 88, canvas.height - 88);
      ctx.strokeStyle = "rgba(228,194,126,.55)";
      ctx.lineWidth = 3;
      ctx.strokeRect(68, 68, canvas.width - 136, canvas.height - 136);

      ctx.textAlign = "center";
      ctx.fillStyle = "#f0ddb0";
      ctx.font = "700 78px 'Noto Serif TC', 'Microsoft JhengHei', serif";
      ctx.fillText("謝氏宗祠文化資產學習獎狀", 800, 205);
      ctx.font = "34px 'Microsoft JhengHei', sans-serif";
      ctx.fillStyle = "#e8e0d0";
      ctx.fillText("HERITAGE LEARNING CERTIFICATE", 800, 263);
      ctx.font = "42px 'Microsoft JhengHei', sans-serif";
      ctx.fillText("茲證明", 800, 365);
      ctx.font = "700 76px 'Noto Serif TC', 'Microsoft JhengHei', serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(name, 800, 470);
      ctx.font = "36px 'Microsoft JhengHei', sans-serif";
      ctx.fillStyle = "#e8e0d0";
      wrapText(ctx, "已完成空間格局、建築裝飾、祭祀文字與地方記憶四條文化學習支線，並完成謝氏宗祠文化牌局。", 800, 585, 1160, 58);
      ctx.font = "30px 'Microsoft JhengHei', sans-serif";
      ctx.fillStyle = "#f0ddb0";
      ctx.fillText(`牌局結果：${$("#game-over-score")?.textContent || "完成"}`, 800, 760);
      ctx.fillText(`完成日期：${new Date().toLocaleDateString("zh-TW")}`, 800, 815);
      ctx.font = "26px 'Microsoft JhengHei', sans-serif";
      ctx.fillStyle = "#d3c8b2";
      ctx.fillText("越理解地方，越能看見建築、儀式與生活共同保存的記憶。", 800, 940);
      canvas.toBlob((blob) => {
        if (!blob) throw new Error("無法產生圖片");
        const url = URL.createObjectURL(blob);
        triggerDownload(url, `${name}_謝氏宗祠文化資產學習獎狀.png`);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        status.textContent = "獎狀已產生。";
      }, "image/png");
    } catch (error) {
      console.error(error);
      status.textContent = "獎狀產生失敗，請重新整理後再試。";
    }
  }

  function init() {
    ensureUi();
    loadProgress();
    $("#heritage-journey-button")?.addEventListener("click", openJourney);
    $("#heritage-journey-close")?.addEventListener("click", closeJourney);
    $("#heritage-back-hub")?.addEventListener("click", backToHub);
    $("#heritage-detail-prev")?.addEventListener("click", previousStep);
    $("#heritage-detail-next")?.addEventListener("click", nextStep);
    $("#download-background")?.addEventListener("click", downloadBackground);
    $("#download-certificate")?.addEventListener("click", downloadCertificate);
    $("#heritage-journey-modal")?.addEventListener("click", (event) => {
      if (event.target === event.currentTarget) closeJourney();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
