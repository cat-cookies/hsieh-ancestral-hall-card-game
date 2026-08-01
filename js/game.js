/* 謝氏宗祠文化卡牌遊戲 - 遊戲主程式 */
(() => {
  "use strict";

  const DATA = window.GAME_DATA;
  const ROW_ORDER = ["text", "decoration", "space"];
  const SIDE_LABEL = { player: "你", ai: "守藏者" };
  const RARITY_WEIGHT = { "常見": 1, "珍稀": 2, "史詩": 3, "傳說": 4 };
  const CARD_ART_CACHE = new Map();
  const OPENING_SCENES = [
    {
      kicker: "返鄉起行",
      title: "你不是前來攻伐，而是回到鄉土學習的人",
      body: "內埔的風掠過宗祠屋脊，日光落在埕前。你此行不是侵擾，也不是奪取，而是帶著敬意走回地方，準備用一場牌局重新認識謝氏宗祠與自己的鄉土。",
      note: "守藏者領主要辨識的，不只是勝負，還有你是否真正願意學習。",
      caption: "守藏者領主・先看來意",
      tags: ["返鄉學習", "地方敬意", "不是壞人"]
    },
    {
      kicker: "屋脊映天",
      title: "抬頭先看燕尾與屋面，地方的氣韻便從外觀開始說話",
      body: "謝氏宗祠不只是一棟老屋。從屋面、屋脊到立面比例，你會先感受到一種屬於地方宗祠的整體氣質：它向外宣示身分，也向內維持秩序。",
      note: "守藏者領主會先看你能否從外觀讀出宗祠的氣度。",
      caption: "守藏者領主・觀其眼界",
      tags: ["燕尾脊", "立面氣質", "宗祠身分"]
    },
    {
      kicker: "由門而入",
      title: "從門樓、禾埕到前後堂，空間秩序會慢慢向你展開",
      body: "當你辨認門樓、禾埕、前堂、天井與後堂的關係，你記住的不只是名詞，而是地方如何安排動線、祭序、聚會與家族生活。建築格局，就是地方知識的骨架。",
      note: "越能讀懂空間，越能接近守藏者領主所守護的核心。",
      caption: "守藏者領主・試你是否識路",
      tags: ["門樓", "禾埕", "前後堂", "空間秩序"]
    },
    {
      kicker: "細部成義",
      title: "裝飾與工藝，不只是好看，而是地方價值的細緻說明",
      body: "斗栱彩繪、燕尾脊、五行石、土地龍神與祭祀器物，記錄的是工法、美感、信仰與護佑觀。當你看懂它們，建築就不再沉默。",
      note: "地方感，常常藏在最容易被忽略的細部裡。",
      caption: "守藏者領主・試你是否看細",
      tags: ["裝飾工藝", "五行石", "地方護佑"]
    },
    {
      kicker: "文字成章",
      title: "楹聯、匾額與祖牌，讓宗祠把記憶、教化與禮序說得更清楚",
      body: "從堂號、楹聯到木本水源、祖牌神位，文字系統把家族記憶與祭祀倫理固定在建築裡。理解這些文字，也是在理解地方如何保存自己的歷史。",
      note: "文字不是裝飾邊角，而是宗祠價值被清楚傳達的方式。",
      caption: "守藏者領主・試你是否懂義",
      tags: ["堂號匾額", "楹聯", "祖牌神位", "禮序教化"]
    },
    {
      kicker: "守藏者現身",
      title: "守藏者領主並非阻擋你，而是在衡量你與地方的連結能走多深",
      body: "他守護的不是冷冰冰的分數，而是宗祠所承載的祖先記憶、地方秩序與集體生活。你每建立一個正確的文化連動，都是在向他證明：你不是過客，而是願意理解鄉土的人。",
      note: "牌局越深入，考驗就越不只是技巧，而是理解的厚度。",
      caption: "守藏者領主・持卷而問",
      tags: ["守藏者", "文化連動", "理解厚度"]
    },
    {
      kicker: "庇護之意",
      title: "越了解自己的鄉土，守藏者領主與地方記憶便會給予更多庇護",
      body: "若你能在牌局中串起更多正確的地方脈絡，守藏者領主與宗祠所承載的祖先記憶、禮序與風土，就會回應你更深的庇護。即使這一局失利，只要你是真心學習者，也仍會得到基本庇護。",
      note: "現在，帶著尊重與好奇，開始挑戰守藏者領主。",
      caption: "守藏者領主・允你入局",
      tags: ["更多庇護", "基本庇護", "守護鄉土"]
    }
  ];
  let audioContext = null;
  let audioNoiseBuffer = null;
  let cardEffectTooltip = null;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const memoryStorage = new Map();
  const safeStorage = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return memoryStorage.has(key) ? memoryStorage.get(key) : null;
      }
    },
    set(key, value) {
      const stringValue = String(value);
      try {
        window.localStorage.setItem(key, stringValue);
      } catch {
        memoryStorage.set(key, stringValue);
      }
    },
    remove(key) {
      try {
        window.localStorage.removeItem(key);
      } catch {
        memoryStorage.delete(key);
      }
    }
  };

  function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function uid(prefix, id) {
    return `${prefix}-${id}-${Math.random().toString(36).slice(2, 9)}`;
  }

  function emptyBoard() {
    return { space: [], decoration: [], text: [] };
  }

  function emptyBoosts() {
    return { space: 0, decoration: 0, text: 0 };
  }

  function makeDeck(side) {
    return shuffle(DATA.cards.map((card) => ({ ...card, uid: uid(side, card.id) })));
  }

  function makeSide(side, leaderId) {
    return {
      side,
      leaderId,
      leaderUsed: false,
      deck: makeDeck(side),
      hand: [],
      board: emptyBoard(),
      graveyard: [],
      passed: false,
      roundWins: 0,
      roundBoosts: emptyBoosts()
    };
  }

  const state = {
    phase: "start",
    selectedLeaderId: "xieAn",
    selectedDifficulty: "normal",
    player: null,
    ai: null,
    round: 1,
    turn: "player",
    nextStarter: "player",
    logs: [],
    mulligan: null,
    pendingRound: null,
    gameRecorded: false,
    aiThinking: false,
    tutorial: {
      step: 0,
      afterClose: null
    },
    comboAnimationQueue: [],
    comboAnimating: false,
    sessionId: 0,
    initialized: false,
    soundEnabled: safeStorage.get("hsiehCardGameSound") !== "0",
    opening: {
      index: 0,
      timer: null
    },
    ambient: {
      mode: null,
      timer: null
    },
    finalResult: null
  };

  function getAudioContext() {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return null;
    if (!audioContext) audioContext = new AudioCtor();
    return audioContext;
  }

  function unlockAudioContext() {
    if (!state.soundEnabled) return;
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
  }

  function playTone(ctx, start, frequency, duration, type = "sine", gainValue = 0.04) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.03);
  }

  function playSound(kind) {
    if (!state.soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    const now = ctx.currentTime + 0.01;
    switch (kind) {
      case "ui":
        playTone(ctx, now, 620, 0.08, "triangle", 0.028);
        break;
      case "story":
        playTone(ctx, now, 392, 0.14, "sine", 0.026);
        playTone(ctx, now + 0.11, 523.25, 0.18, "triangle", 0.03);
        break;
      case "card":
        playTone(ctx, now, 330, 0.1, "triangle", 0.03);
        playTone(ctx, now + 0.08, 494, 0.14, "triangle", 0.03);
        break;
      case "leader":
        [392, 523.25, 659.25].forEach((freq, index) => playTone(ctx, now + index * 0.05, freq, 0.24, "triangle", 0.03));
        break;
      case "pass":
        playTone(ctx, now, 392, 0.12, "sine", 0.026);
        playTone(ctx, now + 0.1, 294, 0.18, "sine", 0.024);
        break;
      case "combo":
        [392, 523.25, 659.25, 784].forEach((freq, index) => playTone(ctx, now + index * 0.06, freq, 0.22, "triangle", 0.035));
        break;
      case "roundWin":
        [523.25, 659.25, 783.99].forEach((freq, index) => playTone(ctx, now + index * 0.07, freq, 0.28, "triangle", 0.035));
        break;
      case "roundLose":
        [440, 349.23, 261.63].forEach((freq, index) => playTone(ctx, now + index * 0.08, freq, 0.24, "sine", 0.028));
        break;
      case "roundTie":
        [440, 554.37].forEach((freq, index) => playTone(ctx, now + index * 0.09, freq, 0.2, "sine", 0.026));
        break;
      case "start":
        [329.63, 392, 523.25].forEach((freq, index) => playTone(ctx, now + index * 0.06, freq, 0.18, "triangle", 0.03));
        break;
      default:
        playTone(ctx, now, 523.25, 0.1, "triangle", 0.025);
    }
  }

  function renderSoundToggle() {
    const button = $("#sound-toggle");
    if (!button) return;
    button.textContent = `音效：${state.soundEnabled ? "開" : "關"}`;
    button.setAttribute("aria-pressed", state.soundEnabled ? "true" : "false");
  }

  function createNoiseBuffer(ctx) {
    const length = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      channel[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  function getNoiseBuffer(ctx) {
    if (!audioNoiseBuffer || audioNoiseBuffer.sampleRate !== ctx.sampleRate) {
      audioNoiseBuffer = createNoiseBuffer(ctx);
    }
    return audioNoiseBuffer;
  }

  function playWindGust(duration = 1.8, gainAmount = 0.006) {
    if (!state.soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const source = ctx.createBufferSource();
    source.buffer = getNoiseBuffer(ctx);
    source.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(520, ctx.currentTime);
    const gain = ctx.createGain();
    const now = ctx.currentTime + 0.01;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(gainAmount, now + 0.35);
    gain.gain.linearRampToValueAtTime(gainAmount * 0.55, now + duration * 0.6);
    gain.gain.linearRampToValueAtTime(0.0001, now + duration);
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start(now);
    source.stop(now + duration + 0.04);
  }

  function playCricketCluster(count = 3) {
    if (!state.soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime + 0.02;
    for (let i = 0; i < count; i += 1) {
      const base = 2600 + Math.random() * 1200;
      playTone(ctx, now + i * 0.14, base, 0.035, "triangle", 0.0036);
      playTone(ctx, now + i * 0.14 + 0.02, base * 1.08, 0.03, "triangle", 0.003);
    }
  }

  function playRitualBell(style = "soft") {
    if (!state.soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime + 0.02;
    const notes = style === "bright" ? [523.25, 659.25, 783.99] : [392, 523.25];
    notes.forEach((freq, index) => playTone(ctx, now + index * 0.11, freq, 0.38, "sine", style === "bright" ? 0.02 : 0.015));
  }

  function stopAmbient() {
    if (state.ambient.timer) {
      clearTimeout(state.ambient.timer);
      state.ambient.timer = null;
    }
    state.ambient.mode = null;
  }

  function ambientPulse() {
    if (!state.soundEnabled || !state.ambient.mode) return;
    const mode = state.ambient.mode;
    if (mode === "opening") {
      playWindGust(2.2, 0.0055);
      if (Math.random() < 0.55) playCricketCluster(2 + Math.floor(Math.random() * 2));
      if (Math.random() < 0.42) playRitualBell("soft");
    } else if (mode === "battle") {
      playWindGust(1.6, 0.0046);
      if (Math.random() < 0.7) playCricketCluster(2 + Math.floor(Math.random() * 3));
      if (Math.random() < 0.18) playRitualBell("soft");
    } else if (mode === "ending") {
      playWindGust(1.9, 0.005);
      if (Math.random() < 0.4) playCricketCluster(2);
      playRitualBell("bright");
    }
    const delay = mode === "battle"
      ? 5200 + Math.random() * 2800
      : mode === "opening"
        ? 4300 + Math.random() * 2400
        : 4700 + Math.random() * 2200;
    state.ambient.timer = setTimeout(ambientPulse, delay);
  }

  function startAmbient(mode) {
    if (!state.soundEnabled) {
      stopAmbient();
      state.ambient.mode = mode;
      return;
    }
    if (state.ambient.mode === mode && state.ambient.timer) return;
    stopAmbient();
    state.ambient.mode = mode;
    ambientPulse();
  }

  function syncAmbientToPhase() {
    if (!state.soundEnabled) {
      stopAmbient();
      return;
    }
    if (state.phase === "opening") startAmbient("opening");
    else if (state.phase === "gameover") startAmbient("ending");
    else if (["playing", "mulligan", "roundEnd"].includes(state.phase)) startAmbient("battle");
  }

  function setSoundEnabled(enabled) {
    state.soundEnabled = Boolean(enabled);
    safeStorage.set("hsiehCardGameSound", state.soundEnabled ? "1" : "0");
    renderSoundToggle();
    if (state.soundEnabled) {
      unlockAudioContext();
      syncAmbientToPhase();
    } else {
      stopAmbient();
    }
  }

  function guardianPortraitSvg(theme = "default") {
    const palette = {
      default: { robe: "#5f312b", trim: "#d9b06d", glow: "rgba(233,198,132,.28)", scroll: "#efe3c0" },
      victory: { robe: "#674227", trim: "#f1d28f", glow: "rgba(241,210,143,.34)", scroll: "#f7ebc8" },
      defeat: { robe: "#2f4c57", trim: "#b8d2df", glow: "rgba(184,210,223,.30)", scroll: "#e7f0f2" },
      tie: { robe: "#44513a", trim: "#d6c892", glow: "rgba(214,200,146,.28)", scroll: "#f1ecd7" }
    }[theme] || { robe: "#5f312b", trim: "#d9b06d", glow: "rgba(233,198,132,.28)", scroll: "#efe3c0" };
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 420" aria-hidden="true">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#94c5e8" stop-opacity=".9"/>
            <stop offset="100%" stop-color="#15343a" stop-opacity=".1"/>
          </linearGradient>
          <linearGradient id="robe" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${palette.robe}"/>
            <stop offset="100%" stop-color="#241516"/>
          </linearGradient>
        </defs>
        <rect width="320" height="420" fill="url(#sky)"/>
        <path d="M24 300 Q160 250 296 300 L296 340 L24 340 Z" fill="rgba(20,35,37,.55)"/>
        <path d="M30 242 L88 206 L232 206 L290 242 L290 276 L30 276 Z" fill="#b56342" opacity=".95"/>
        <path d="M18 250 L92 195 L228 195 L302 250" fill="none" stroke="#eacb85" stroke-width="8" stroke-linecap="round"/>
        <rect x="130" y="220" width="60" height="56" fill="#efe8d2" opacity=".94"/>
        <ellipse cx="160" cy="140" rx="68" ry="78" fill="${palette.glow}"/>
        <circle cx="160" cy="136" r="46" fill="#f2d8bf"/>
        <path d="M124 127 Q160 78 196 127 L196 154 Q160 170 124 154 Z" fill="#1f1b1c"/>
        <path d="M116 206 Q160 178 204 206 L230 352 Q160 386 90 352 Z" fill="url(#robe)"/>
        <path d="M118 214 L98 304 Q128 330 152 338 L160 248 Z" fill="#4a2522" opacity=".95"/>
        <path d="M202 214 L222 304 Q192 330 168 338 L160 248 Z" fill="#4a2522" opacity=".95"/>
        <path d="M130 220 Q160 244 190 220" fill="none" stroke="${palette.trim}" stroke-width="8" stroke-linecap="round"/>
        <rect x="188" y="238" width="62" height="92" rx="6" fill="${palette.scroll}" stroke="#b08f53" stroke-width="4" transform="rotate(-10 188 238)"/>
        <line x1="200" y1="260" x2="236" y2="252" stroke="#806437" stroke-width="3"/>
        <line x1="204" y1="278" x2="240" y2="270" stroke="#806437" stroke-width="3"/>
        <line x1="208" y1="296" x2="244" y2="288" stroke="#806437" stroke-width="3"/>
        <path d="M118 320 Q160 336 202 320" fill="none" stroke="${palette.trim}" stroke-width="8" stroke-linecap="round"/>
        <circle cx="145" cy="134" r="4" fill="#342628"/>
        <circle cx="175" cy="134" r="4" fill="#342628"/>
        <path d="M146 152 Q160 160 174 152" fill="none" stroke="#9c6860" stroke-width="4" stroke-linecap="round"/>
      </svg>`;
  }

  function mountGuardianPortraits() {
    const openingPortrait = $("#opening-guardian-portrait");
    if (openingPortrait) openingPortrait.innerHTML = guardianPortraitSvg("default");
    const endingPortrait = $("#ending-guardian-portrait");
    if (endingPortrait) endingPortrait.innerHTML = guardianPortraitSvg("default");
  }

  function clearOpeningTimer() {
    if (state.opening.timer) {
      clearTimeout(state.opening.timer);
      state.opening.timer = null;
    }
  }

  function renderOpeningProgress() {
    const progress = $("#opening-progress");
    if (!progress) return;
    progress.innerHTML = OPENING_SCENES.map((scene, index) => {
      const className = index < state.opening.index ? "done" : index === state.opening.index ? "active" : "";
      return `<span class="${className}" aria-hidden="true"></span>`;
    }).join("");
  }

  function renderOpeningScene() {
    const scene = OPENING_SCENES[state.opening.index];
    $("#opening-scene-kicker").textContent = scene.kicker;
    $("#opening-title").textContent = scene.title;
    $("#opening-scene-body").textContent = scene.body;
    $("#opening-scene-note").textContent = scene.note;
    $("#opening-scene-tags").innerHTML = scene.tags.map((tag) => `<span>${tag}</span>`).join("");
    $("#opening-guardian-caption").textContent = scene.caption;
    $("#opening-prev").disabled = state.opening.index === 0;
    $("#opening-next").textContent = state.opening.index === OPENING_SCENES.length - 1 ? "開始挑戰" : "下一幕";
    renderOpeningProgress();
    const frame = $("#opening-scene-frame");
    frame.classList.remove("scene-refresh");
    void frame.offsetWidth;
    frame.classList.add("scene-refresh");
  }

  function scheduleOpeningAdvance() {
    clearOpeningTimer();
    if (state.opening.index >= OPENING_SCENES.length - 1) return;
    state.opening.timer = setTimeout(() => advanceOpeningScene(1, true), 5000);
  }

  function openOpeningIntro() {
    state.phase = "opening";
    state.opening.index = 0;
    $("#opening-overlay")?.classList.remove("hidden");
    renderOpeningScene();
    startAmbient("opening");
    scheduleOpeningAdvance();
  }

  function finishOpeningAndStart() {
    clearOpeningTimer();
    $("#opening-overlay")?.classList.add("hidden");
    playSound("start");
    startGame();
  }

  function advanceOpeningScene(step = 1, silent = false) {
    const nextIndex = Math.max(0, Math.min(OPENING_SCENES.length - 1, state.opening.index + step));
    if (nextIndex === state.opening.index && nextIndex === OPENING_SCENES.length - 1 && step > 0) {
      finishOpeningAndStart();
      return;
    }
    state.opening.index = nextIndex;
    if (!silent) playSound("story");
    renderOpeningScene();
    scheduleOpeningAdvance();
  }

  function skipOpening() {
    clearOpeningTimer();
    $("#opening-overlay")?.classList.add("hidden");
    startGame();
  }

  function endingSceneFor(result) {
    if (result === "player") {
      return {
        overlayClass: "show-victory",
        kicker: "牌局回響",
        sceneKicker: "深層庇護",
        title: "你已走得更近，地方記憶也回應你更深的庇護",
        body: "你不只是完成一場對局，而是把謝氏宗祠的空間、裝飾與文字意義重新串了起來。守藏者領主因此放下更多戒備，讓宗祠所承載的祖先記憶、禮序與鄉土情感更完整地護持你。",
        note: "真正被認可的，不只是技巧，而是你如何理解地方、尊重地方。",
        tags: ["更多庇護", "理解更深", "守藏者認可"],
        caption: "守藏者領主・予以深護",
        portraitTheme: "victory"
      };
    }
    if (result === "ai") {
      return {
        overlayClass: "show-defeat",
        kicker: "牌局回響",
        sceneKicker: "基本庇護",
        title: "這次未竟全功，但地方仍願意給你基本庇護",
        body: "這一局守藏者領主仍守住了牌局，但他沒有把你拒於門外。只要你帶著真心學習的態度回來，宗祠的空間秩序、文字教化與地方記憶，仍會為你留下可以再次進入的路。",
        note: "失利不是拒絕，而是提醒：再多理解一分，地方就會再多回應一分。",
        tags: ["基本庇護", "仍可再訪", "學習未止"],
        caption: "守藏者領主・留其再學",
        portraitTheme: "defeat"
      };
    }
    return {
      overlayClass: "show-tie",
      kicker: "牌局回響",
      sceneKicker: "穩定庇護",
      title: "你與守藏者勢均力敵，地方記憶給予穩定而審慎的回應",
      body: "你已能看見謝氏宗祠的重要脈絡，也讓守藏者領主承認你的理解已經站穩。若之後能建立更完整的文化連結，地方仍會給你更深一層的庇護。",
      note: "穩定的理解，已足以讓地方開始回應你。",
      tags: ["穩定庇護", "平分秋色", "可再深入"],
      caption: "守藏者領主・審慎相待",
      portraitTheme: "tie"
    };
  }

  function showEndingOverlay(result) {
    const ending = endingSceneFor(result);
    state.finalResult = result;
    const overlay = $("#ending-overlay");
    overlay.classList.remove("show-victory", "show-defeat", "show-tie");
    overlay.classList.add(ending.overlayClass);
    $("#ending-kicker").textContent = ending.kicker;
    $("#ending-scene-kicker").textContent = ending.sceneKicker;
    $("#ending-title").textContent = ending.title;
    $("#ending-body").textContent = ending.body;
    $("#ending-note").textContent = ending.note;
    $("#ending-tags").innerHTML = ending.tags.map((tag) => `<span>${tag}</span>`).join("");
    $("#ending-guardian-caption").textContent = ending.caption;
    const portrait = $("#ending-guardian-portrait");
    if (portrait) portrait.innerHTML = guardianPortraitSvg(ending.portraitTheme);
    overlay.classList.remove("hidden");
    const frame = $("#ending-scene-frame");
    frame.classList.remove("scene-refresh");
    void frame.offsetWidth;
    frame.classList.add("scene-refresh");
    startAmbient("ending");
    playSound(result === "player" ? "roundWin" : result === "ai" ? "roundLose" : "roundTie");
  }

  function continueFromEndingOverlay() {
    $("#ending-overlay")?.classList.add("hidden");
    $("#game-over-modal")?.classList.remove("hidden");
    renderStats();
  }

  function sideState(side) {
    return side === "player" ? state.player : state.ai;
  }

  function otherSide(side) {
    return side === "player" ? "ai" : "player";
  }

  function allCards(board) {
    return [...board.space, ...board.decoration, ...board.text];
  }

  function hasCard(board, id) {
    return allCards(board).some((card) => card.id === id);
  }

  function countType(board, type) {
    return board[type].length;
  }

  function countIds(board, ids) {
    return allCards(board).filter((card) => ids.includes(card.id)).length;
  }

  function directBonus(card, board) {
    switch (card.id) {
      case "gatehouse":
        return board.space[0]?.uid === card.uid ? 2 : 0;
      case "forecourt":
        return hasCard(board, "gatehouse") && hasCard(board, "frontHall") ? 4 : 0;
      case "frontHall": {
        const connected = countIds(board, ["dougongPainting", "frontCouplet", "baoshutang", "swallowTail"]);
        return Math.min(4, connected * 2);
      }
      case "courtyard":
        return Math.min(4, Math.max(0, countType(board, "space") - 1));
      case "rearHall":
        return hasCard(board, "rootSource") || hasCard(board, "ancestralTablets") ? 4 : 0;
      case "leftWing":
        return hasCard(board, "rightWing") ? 3 : 0;
      case "rightWing":
        return hasCard(board, "leftWing") ? 3 : 0;
      case "huatai":
        return hasCard(board, "fiveElements") || hasCard(board, "landDragon") ? 4 : 0;
      case "study":
        return hasCard(board, "leftWing") || hasCard(board, "rightWing") ? 3 : 0;
      case "ritualHall":
        return Math.min(4, countType(board, "text"));
      case "fiveElements":
        return hasCard(board, "huatai") ? 5 : 0;
      case "landDragon":
        return hasCard(board, "huatai") || hasCard(board, "rearHall") ? 4 : 0;
      case "heavenIncense":
        return hasCard(board, "rearHall") ? 3 : 0;
      case "dougongPainting":
        return hasCard(board, "frontHall") ? 5 : 0;
      case "threeSuccesses":
        return hasCard(board, "rearHall") ? 4 : 0;
      case "sterculiaTree":
        return hasCard(board, "baoshutang") ? 5 : 0;
      case "maleLamp":
        return hasCard(board, "femaleLamp") ? 4 : 0;
      case "femaleLamp":
        return hasCard(board, "maleLamp") ? 4 : 0;
      case "swallowTail":
        return hasCard(board, "gatehouse") || hasCard(board, "frontHall") ? 3 : 0;
      case "longevityBrick":
        return countIds(board, ["frontHall", "rearHall", "ritualHall"]) > 0 ? 3 : 0;
      case "harvestPattern":
        return hasCard(board, "forecourt") ? 4 : 0;
      case "baoshutang":
        return hasCard(board, "frontHall") || hasCard(board, "sterculiaTree") ? 5 : 0;
      case "rootSource":
        return hasCard(board, "rearHall") ? 5 : 0;
      case "frontCouplet":
        return hasCard(board, "frontHall") ? 4 : 0;
      case "rearCouplet":
        return hasCard(board, "rearHall") ? 4 : 0;
      case "ridgeCouplet":
        return countType(board, "space") >= 3 ? 5 : 0;
      case "ancestralTablets":
        return hasCard(board, "rearHall") || hasCard(board, "ritualHall") ? 5 : 0;
      case "hallInscription":
        return Math.min(5, countType(board, "space"));
      case "springAutumn":
        return countType(board, "space") >= 2 && countType(board, "text") >= 2 ? 6 : 0;
      case "ancestorSociety":
        return ROW_ORDER.every((row) => board[row].length > 0) ? 6 : 0;
      default:
        return 0;
    }
  }

  function comboBonuses(board) {
    const combos = [];
    const activeIds = new Set();
    let progress = true;

    while (progress) {
      progress = false;
      DATA.combos.forEach((combo) => {
        if (activeIds.has(combo.id)) return;
        const cardsOk = (combo.requiresCards || []).every((id) => hasCard(board, id));
        const combosOk = (combo.requiresCombos || []).every((id) => activeIds.has(id));
        if (cardsOk && combosOk) {
          activeIds.add(combo.id);
          combos.push(combo);
          progress = true;
        }
      });
    }

    return combos;
  }

  function evaluateBoard(side, boardOverride = null, boostsOverride = null) {
    const actor = sideState(side);
    const board = boardOverride || actor.board;
    const boosts = boostsOverride || actor.roundBoosts;
    const rowTotals = { space: 0, decoration: 0, text: 0 };
    const cardPowers = new Map();

    ROW_ORDER.forEach((row) => {
      board[row].forEach((card) => {
        const bonus = directBonus(card, board);
        const effective = card.power + bonus;
        cardPowers.set(card.uid, { base: card.power, bonus, effective });
        rowTotals[row] += effective;
      });
      rowTotals[row] += boosts[row] || 0;
    });

    const combos = comboBonuses(board);
    combos.forEach((combo) => {
      rowTotals[combo.row] += combo.points;
    });

    return {
      rowTotals,
      cardPowers,
      combos,
      total: Object.values(rowTotals).reduce((sum, value) => sum + value, 0)
    };
  }

  function drawCards(side, count) {
    const actor = sideState(side);
    for (let i = 0; i < count; i += 1) {
      const card = actor.deck.pop();
      if (!card) break;
      actor.hand.push(card);
    }
  }

  function addLog(text, tone = "system") {
    state.logs.unshift({ text, tone, time: Date.now() });
    state.logs = state.logs.slice(0, 12);
  }

  function showToast(title, text, duration = 3800) {
    const toast = $("#culture-toast");
    $("#culture-toast-title").textContent = title;
    $("#culture-toast-text").textContent = text;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), duration);
  }

  function queueComboAnimation(combos, side) {
    const sessionId = state.sessionId;
    combos.forEach((combo) => state.comboAnimationQueue.push({ combo, side, sessionId }));
    if (!state.comboAnimating) {
      void playNextComboAnimation();
    }
  }

  async function playNextComboAnimation() {
    const burst = $("#combo-burst");
    if (!burst) {
      state.comboAnimationQueue = [];
      state.comboAnimating = false;
      return;
    }

    while (state.comboAnimationQueue.length && state.comboAnimationQueue[0].sessionId !== state.sessionId) {
      state.comboAnimationQueue.shift();
    }

    if (!state.comboAnimationQueue.length) {
      state.comboAnimating = false;
      burst.classList.add("hidden");
      return;
    }

    state.comboAnimating = true;
    const item = state.comboAnimationQueue.shift();
    const sessionId = item.sessionId;
    $("#combo-burst-side").textContent = `${SIDE_LABEL[item.side]}觸發組合技`;
    $("#combo-burst-title").textContent = item.combo.name;
    $("#combo-burst-points").textContent = `+${item.combo.points}`;
    playSound("combo");
    burst.classList.remove("hidden");
    burst.classList.remove("bursting");
    void burst.offsetWidth;
    burst.classList.add("bursting");
    await wait(1600);

    if (sessionId !== state.sessionId) {
      burst.classList.add("hidden");
      state.comboAnimating = false;
      return;
    }

    burst.classList.remove("bursting");
    burst.classList.add("hidden");
    await wait(120);
    if (sessionId === state.sessionId) void playNextComboAnimation();
  }

  function loadStats() {
    try {
      return JSON.parse(safeStorage.get("hsiehCardGameStats")) || { wins: 0, losses: 0, draws: 0 };
    } catch {
      return { wins: 0, losses: 0, draws: 0 };
    }
  }

  function saveStats(stats) {
    safeStorage.set("hsiehCardGameStats", JSON.stringify(stats));
  }

  function renderStats() {
    const stats = loadStats();
    const target = $("#lifetime-stats");
    if (target) target.textContent = `累計：${stats.wins} 勝／${stats.losses} 敗／${stats.draws} 和`;
  }

  function selectLeader(leaderId) {
    state.selectedLeaderId = leaderId;
    $$(".leader-choice").forEach((button) => {
      button.classList.toggle("selected", button.dataset.leader === leaderId);
      button.setAttribute("aria-pressed", button.dataset.leader === leaderId ? "true" : "false");
    });
  }

  function getDifficulty() {
    return $("#difficulty-select")?.value || state.selectedDifficulty || "normal";
  }

  function updateDifficultyBadge() {
    const difficulty = state.selectedDifficulty;
    $("#difficulty-badge").textContent = `難度：${DATA.difficultyLabels[difficulty] || difficulty}`;
  }

  function hideTransientLayers() {
    ["#game-over-modal", "#round-result-modal", "#rules-modal", "#sources-modal", "#card-detail-modal", "#tutorial-modal", "#mulligan-overlay", "#combo-burst", "#ending-overlay"]
      .forEach((id) => $(id)?.classList.add("hidden"));
  }

  function showStartScreen() {
    hideCardEffectTooltip();
    stopAmbient();
    clearOpeningTimer();
    window.location.href = "index.html";
  }

  function goHome() {
    stopAmbient();
    clearOpeningTimer();
    window.location.href = "index.html";
  }

  function startGame() {
    state.sessionId += 1;
    state.selectedDifficulty = getDifficulty();
    const aiLeaderId = state.selectedLeaderId === "xieAn" ? "xieXuan" : "xieAn";
    state.player = makeSide("player", state.selectedLeaderId);
    state.ai = makeSide("ai", aiLeaderId);
    state.round = 1;
    state.turn = "player";
    state.nextStarter = "player";
    state.logs = [];
    state.mulligan = null;
    state.pendingRound = null;
    state.gameRecorded = false;
    state.aiThinking = false;
    state.comboAnimationQueue = [];
    state.comboAnimating = false;
    state.finalResult = null;
    clearTimeout(showToast.timer);
    $("#culture-toast")?.classList.remove("show");

    hideTransientLayers();
    drawCards("player", 10);
    drawCards("ai", 10);

    $("#start-screen")?.classList.add("hidden");
    $("#game-screen")?.classList.remove("hidden");
    updateDifficultyBadge();
    renderSoundToggle();
    startAmbient("battle");
    addLog(`雙方各抽取 10 張起始手牌；本場難度為${DATA.difficultyLabels[state.selectedDifficulty]}。`);
    renderGame();

    // 「開始牌局」固定直接進入換牌／戰鬥流程；新手教學改由獨立按鈕開啟。
    showMulligan(3, "initial");
  }

  function restartCurrentGame() {
    if (state.phase === "start") return;
    clearOpeningTimer();
    $("#opening-overlay")?.classList.add("hidden");
    $("#ending-overlay")?.classList.add("hidden");
    startGame();
  }

  function showMulligan(max, mode) {
    if (!state.player || !state.ai) return;
    state.phase = "mulligan";
    state.mulligan = { max, mode, selected: new Set() };
    const title = mode === "initial" ? "起手換牌" : `第 ${state.round} 輪補牌`;
    const description = mode === "initial"
      ? "可選擇至多 3 張手牌換回牌庫。被選取的牌不會立即抽回。"
      : "本輪已依規則補牌，可再選擇至多 1 張手牌重抽。";
    $("#mulligan-title").textContent = title;
    $("#mulligan-description").textContent = description;
    $("#mulligan-confirm").textContent = mode === "initial" ? "完成換牌，開始對局" : "完成換牌，進入本輪";
    $("#mulligan-overlay").classList.remove("hidden");
    renderMulligan();
  }

  function renderMulligan() {
    if (!state.mulligan || !state.player) return;
    const container = $("#mulligan-cards");
    container.innerHTML = "";
    state.player.hand.forEach((card) => {
      const el = createCardElement(card, "player", "mulligan");
      const selected = state.mulligan.selected.has(card.uid);
      el.classList.toggle("selected-for-mulligan", selected);
      el.addEventListener("click", () => toggleMulligan(card.uid));
      container.appendChild(el);
    });
    $("#mulligan-count").textContent = `${state.mulligan.selected.size}／${state.mulligan.max}`;
  }

  function toggleMulligan(cardUid) {
    const selected = state.mulligan.selected;
    if (selected.has(cardUid)) {
      selected.delete(cardUid);
    } else if (selected.size < state.mulligan.max) {
      selected.add(cardUid);
    } else {
      showToast("換牌上限", `本階段最多可選擇 ${state.mulligan.max} 張牌。`, 2200);
    }
    renderMulligan();
  }

  function applyMulligan(side, selectedUids) {
    const actor = sideState(side);
    const selected = actor.hand.filter((card) => selectedUids.includes(card.uid));
    if (!selected.length) return;

    actor.hand = actor.hand.filter((card) => !selectedUids.includes(card.uid));
    selected.forEach(() => {
      const replacement = actor.deck.pop();
      if (replacement) actor.hand.push(replacement);
    });
    actor.deck = shuffle([...actor.deck, ...selected]);
  }

  function estimateCardKeepValue(card, hand) {
    const linkedIds = {
      gatehouse: ["forecourt", "frontHall", "hallInscription", "swallowTail"],
      forecourt: ["gatehouse", "frontHall", "harvestPattern"],
      frontHall: ["forecourt", "dougongPainting", "frontCouplet", "baoshutang", "swallowTail", "courtyard"],
      courtyard: ["frontHall", "rearHall"],
      rearHall: ["rootSource", "ancestralTablets", "rearCouplet", "heavenIncense", "threeSuccesses", "landDragon"],
      leftWing: ["rightWing", "study"],
      rightWing: ["leftWing", "study"],
      huatai: ["fiveElements", "landDragon"],
      study: ["leftWing", "rightWing", "ridgeCouplet", "ancestorSociety"],
      ritualHall: ["heavenIncense", "springAutumn", "ancestralTablets"],
      fiveElements: ["huatai", "landDragon"],
      landDragon: ["huatai", "fiveElements", "rearHall"],
      heavenIncense: ["rearHall", "ritualHall", "springAutumn"],
      dougongPainting: ["frontHall", "swallowTail", "baoshutang"],
      threeSuccesses: ["rearHall"],
      sterculiaTree: ["baoshutang"],
      maleLamp: ["femaleLamp"],
      femaleLamp: ["maleLamp"],
      swallowTail: ["gatehouse", "frontHall", "dougongPainting"],
      longevityBrick: ["frontHall", "rearHall", "ritualHall"],
      harvestPattern: ["forecourt"],
      baoshutang: ["frontHall", "sterculiaTree", "dougongPainting"],
      rootSource: ["rearHall", "ancestralTablets"],
      frontCouplet: ["frontHall"],
      rearCouplet: ["rearHall"],
      ridgeCouplet: ["study", "ancestorSociety"],
      ancestralTablets: ["rearHall", "ritualHall", "rootSource", "springAutumn"],
      hallInscription: ["gatehouse", "forecourt"],
      springAutumn: ["ritualHall", "ancestralTablets", "rearCouplet", "heavenIncense"],
      ancestorSociety: ["study", "ridgeCouplet"]
    };

    const links = linkedIds[card.id] || [];
    const synergy = hand.filter((other) => other.uid !== card.uid && links.includes(other.id)).length;
    return card.power + RARITY_WEIGHT[card.rarity] * 0.6 + synergy * 1.15;
  }

  function chooseAiMulligans(max) {
    const actor = state.ai;
    const difficulty = state.selectedDifficulty;

    if (difficulty === "easy") {
      return shuffle(actor.hand)
        .filter((card) => card.power <= 5)
        .slice(0, Math.max(1, Math.min(max, 2)))
        .map((card) => card.uid);
    }

    const ranked = [...actor.hand]
      .map((card) => ({ card, score: estimateCardKeepValue(card, actor.hand) }))
      .sort((a, b) => a.score - b.score);

    const take = difficulty === "hard" ? max : Math.min(max, 2);
    return ranked.slice(0, take).map((entry) => entry.card.uid);
  }

  function confirmMulligan() {
    if (state.phase !== "mulligan" || !state.mulligan || !state.player || !state.ai) return;
    const selected = [...state.mulligan.selected];
    applyMulligan("player", selected);
    const aiSelected = chooseAiMulligans(state.mulligan.max);
    applyMulligan("ai", aiSelected);

    const mode = state.mulligan.mode;
    $("#mulligan-overlay").classList.add("hidden");
    state.mulligan = null;
    state.phase = "playing";

    if (mode === "initial") {
      state.turn = Math.random() < 0.5 ? "player" : "ai";
      addLog(`擲籤決定由${SIDE_LABEL[state.turn]}先手。`);
    } else {
      state.turn = state.nextStarter;
      addLog(`第 ${state.round} 輪開始，由${SIDE_LABEL[state.turn]}先手。`);
    }

    renderGame();
    playSound("ui");
    if (state.turn === "ai") scheduleAiTurn();
  }

  function playCard(side, cardUid) {
    if (state.phase !== "playing" || state.turn !== side) return;
    const actor = sideState(side);
    if (actor.passed) return;

    const index = actor.hand.findIndex((card) => card.uid === cardUid);
    if (index < 0) return;

    const before = evaluateBoard(side);
    const [card] = actor.hand.splice(index, 1);
    actor.board[card.type].push(card);
    const after = evaluateBoard(side);
    const gained = after.total - before.total;

    addLog(`${SIDE_LABEL[side]}打出「${card.name}」，場面增加 ${gained} 點。`, side);
    playSound("card");
    if (side === "player") {
      showToast(card.name, card.toastText || card.culturalNote);
    }

    const beforeCombos = new Set(before.combos.map((combo) => combo.id));
    const newCombos = after.combos.filter((combo) => !beforeCombos.has(combo.id));
    newCombos.forEach((combo) => addLog(`${SIDE_LABEL[side]}完成「${combo.name}」，額外 +${combo.points}。`, side));
    if (newCombos.length) queueComboAnimation(newCombos, side);

    finishAction(side);
  }

  function canUseLeader(side) {
    const actor = sideState(side);
    if (!actor || actor.leaderUsed || actor.passed || state.phase !== "playing" || state.turn !== side) return false;
    const leader = DATA.leaders[actor.leaderId];
    if (leader.id === "xieAn") {
      return ROW_ORDER.some((row) => actor.board[row].length > 0);
    }
    if (leader.id === "xieXuan") {
      const own = evaluateBoard(side).total;
      const opponent = evaluateBoard(otherSide(side)).total;
      return own < opponent && ROW_ORDER.some((row) => actor.board[row].length > 0);
    }
    return false;
  }

  function useLeader(side) {
    if (!canUseLeader(side)) {
      if (side === "player") {
        const actor = sideState(side);
        const leader = DATA.leaders[actor.leaderId];
        const reason = leader.id === "xieXuan"
          ? "此能力只能在本輪落後且場上已有卡牌時使用。"
          : "場上至少需要一個已有卡牌的出牌區。";
        showToast("目前無法使用領主能力", reason, 2600);
      }
      return false;
    }

    const actor = sideState(side);
    const leader = DATA.leaders[actor.leaderId];

    if (leader.id === "xieAn") {
      ROW_ORDER.forEach((row) => {
        if (actor.board[row].length > 0) actor.roundBoosts[row] += 2;
      });
    } else {
      const current = evaluateBoard(side);
      const eligible = ROW_ORDER.filter((row) => actor.board[row].length > 0);
      eligible.sort((a, b) => current.rowTotals[a] - current.rowTotals[b]);
      actor.roundBoosts[eligible[0]] += 8;
    }

    actor.leaderUsed = true;
    addLog(`${SIDE_LABEL[side]}啟動領主「${leader.name}」的能力：${leader.abilityName}。`, side);
    playSound("leader");
    if (side === "player") showToast(leader.abilityName, leader.abilityText);
    finishAction(side);
    return true;
  }

  function pass(side) {
    if (state.phase !== "playing" || state.turn !== side) return;
    const actor = sideState(side);
    if (actor.passed) return;
    actor.passed = true;
    addLog(`${SIDE_LABEL[side]}選擇 PASS，本輪不能再出牌。`, side);
    playSound("pass");
    renderGame();

    if (state.player.passed && state.ai.passed) {
      void endRound();
      return;
    }

    state.turn = otherSide(side);
    renderGame();
    if (state.turn === "ai") scheduleAiTurn();
  }

  function finishAction(side) {
    const actor = sideState(side);
    const opponentSide = otherSide(side);
    const opponent = sideState(opponentSide);

    if (actor.hand.length === 0 && actor.leaderUsed) {
      actor.passed = true;
      addLog(`${SIDE_LABEL[side]}已無可執行動作，自動 PASS。`, side);
    }

    if (state.player.passed && state.ai.passed) {
      renderGame();
      void endRound();
      return;
    }

    if (opponent.passed) {
      state.turn = side;
    } else {
      state.turn = opponentSide;
    }

    renderGame();

    if (state.turn === "ai" && !state.ai.passed) scheduleAiTurn();
  }

  function cloneBoard(board) {
    return {
      space: [...board.space],
      decoration: [...board.decoration],
      text: [...board.text]
    };
  }

  function evaluateComboProgress(board, hand) {
    const active = new Set(comboBonuses(board).map((combo) => combo.id));
    let score = 0;

    DATA.combos.forEach((combo) => {
      if (active.has(combo.id)) return;
      const requiredCards = combo.requiresCards || [];
      const missingCards = requiredCards.filter((id) => !hasCard(board, id));
      const availableMissing = missingCards.filter((id) => hand.some((card) => card.id === id));
      const requiredCombos = combo.requiresCombos || [];
      const missingCombos = requiredCombos.filter((id) => !active.has(id));

      if (missingCards.length === 0 && missingCombos.length === 0) {
        score += combo.points;
      } else if (missingCombos.length === 0 && missingCards.length > 0) {
        const coverage = availableMissing.length / missingCards.length;
        score += coverage * combo.points * (0.38 + combo.tier * 0.08);
        if (missingCards.length === 1 && availableMissing.length === 1) score += 2.5 + combo.tier;
      }
    });

    return score;
  }

  function simulateCardOutcome(side, card, boardOverride = null, handOverride = null) {
    const actor = sideState(side);
    const baseBoard = boardOverride || actor.board;
    const hand = handOverride || actor.hand;
    const board = cloneBoard(baseBoard);
    const beforeEval = evaluateBoard(side, baseBoard, actor.roundBoosts);
    const beforeCombos = new Set(beforeEval.combos.map((combo) => combo.id));
    board[card.type].push(card);
    const afterEval = evaluateBoard(side, board, actor.roundBoosts);
    const newCombos = afterEval.combos.filter((combo) => !beforeCombos.has(combo.id));
    const remainingHand = hand.filter((other) => other.uid !== card.uid);
    const progressBefore = evaluateComboProgress(baseBoard, hand);
    const progressAfter = evaluateComboProgress(board, remainingHand);

    return {
      board,
      remainingHand,
      delta: afterEval.total - beforeEval.total,
      totalAfter: afterEval.total,
      comboCount: newCombos.length,
      comboPoints: newCombos.reduce((sum, combo) => sum + combo.points, 0),
      progressGain: progressAfter - progressBefore,
      futureProgress: progressAfter
    };
  }

  function bestSecondMoveValue(firstOutcome) {
    if (!firstOutcome.remainingHand.length) return 0;
    return Math.max(...firstOutcome.remainingHand.map((secondCard) => {
      const second = simulateCardOutcome("ai", secondCard, firstOutcome.board, firstOutcome.remainingHand);
      return second.delta + second.comboPoints * 0.65 + second.progressGain * 0.45;
    }));
  }

  function aiShouldUseLeader() {
    if (!canUseLeader("ai")) return false;
    const difficulty = state.selectedDifficulty;
    const leader = DATA.leaders[state.ai.leaderId];
    const aiScore = evaluateBoard("ai").total;
    const playerScore = evaluateBoard("player").total;
    const diff = aiScore - playerScore;

    if (leader.id === "xieXuan") {
      if (difficulty === "easy") return diff <= -10;
      if (difficulty === "normal") return diff <= -6;
      if (state.player.passed && diff < 0 && diff + 8 > 0) return true;
      if (state.round === 3 && diff < 0) return true;
      return diff <= -5 && state.ai.hand.length <= state.player.hand.length + 1;
    }

    const occupiedRows = ROW_ORDER.filter((row) => state.ai.board[row].length > 0).length;
    const leaderGain = occupiedRows * 2;
    if (difficulty === "easy") return occupiedRows >= 3 && state.round === 3;
    if (difficulty === "normal") return occupiedRows >= 2 && (state.round >= 2 || state.ai.hand.length <= 5);
    if (state.player.passed && diff <= 0 && diff + leaderGain > 0) return true;
    if (state.round === 3 && occupiedRows >= 2) return true;
    return occupiedRows === 3 && (state.round >= 2 || state.ai.hand.length <= 5) && diff <= 6;
  }

  function hardBestImmediateOutcome() {
    if (!state.ai.hand.length) return null;
    return state.ai.hand
      .map((card) => ({ card, outcome: simulateCardOutcome("ai", card) }))
      .sort((a, b) => b.outcome.delta - a.outcome.delta)[0];
  }

  function aiShouldPass() {
    const difficulty = state.selectedDifficulty;
    const aiScore = evaluateBoard("ai").total;
    const playerScore = evaluateBoard("player").total;
    const diff = aiScore - playerScore;
    const aiHand = state.ai.hand.length;
    const playerHand = state.player.hand.length;

    if (state.player.passed) {
      if (diff > 0) return true;
      if (difficulty === "easy") return diff >= -2 && aiHand <= 1;
      return false;
    }

    if (aiHand === 0 && state.ai.leaderUsed) return true;

    if (difficulty === "easy") {
      if (diff >= 10 && aiHand <= playerHand) return Math.random() < 0.55;
      if (aiHand <= 2 && diff >= 0) return true;
      return false;
    }

    if (difficulty === "normal") {
      if (diff >= 12 && aiHand <= playerHand) return Math.random() < 0.65;
      if (diff > 0 && aiHand + 1 < playerHand) return Math.random() < 0.7;
      if (diff <= -18 && state.round === 1 && state.ai.roundWins === 0 && aiHand <= playerHand) return Math.random() < 0.72;
      if (aiHand <= 2 && diff > -4) return true;
      return false;
    }

    const best = hardBestImmediateOutcome();
    const bestDelta = best?.outcome.delta || 0;
    const canRecoverEfficiently = diff < 0 && diff + bestDelta > 0;

    if (state.ai.roundWins === 1 && diff >= 0 && aiHand <= playerHand + 1) return true;
    if (diff >= 8 && aiHand <= playerHand + 1) return true;
    if (diff >= 4 && aiHand + 2 < playerHand) return true;
    if (aiHand <= 1 && diff >= -2) return true;
    if (state.round === 1 && diff <= -16 && aiHand <= playerHand && !canRecoverEfficiently) return true;
    if (state.round === 2 && state.player.roundWins === 0 && diff <= -20 && aiHand + 1 < playerHand) return true;
    return false;
  }

  function chooseAiCard() {
    const difficulty = state.selectedDifficulty;
    const aiScore = evaluateBoard("ai").total;
    const playerScore = evaluateBoard("player").total;
    const pointsNeeded = Math.max(0, playerScore - aiScore + 1);

    const ranked = state.ai.hand
      .map((card) => {
        const outcome = simulateCardOutcome("ai", card);
        let score = outcome.delta;

        if (difficulty === "easy") {
          score += Math.random() * 5 - 1.5;
        } else if (difficulty === "normal") {
          score += outcome.comboPoints * 0.55 + outcome.progressGain * 0.35 + Math.random() * 1.2;
        } else {
          const followUp = bestSecondMoveValue(outcome);
          const roundUrgency = state.round === 3 ? 1.35 : state.round === 2 ? 1.08 : 0.92;
          const resourceCost = card.power * 0.22 + RARITY_WEIGHT[card.rarity] * 0.7;
          const conservationPenalty = state.round === 1 && outcome.comboPoints === 0 && outcome.progressGain <= 0
            ? resourceCost * 0.48
            : 0;

          score = outcome.delta * roundUrgency
            + outcome.comboPoints * 1.25
            + outcome.comboCount * 2.4
            + outcome.progressGain * 0.85
            + followUp * 0.48
            - conservationPenalty;

          if (state.player.passed) {
            if (outcome.delta >= pointsNeeded) {
              score += 18 - Math.max(0, outcome.delta - pointsNeeded) * 0.9 - resourceCost;
            } else {
              score -= 10;
            }
          }

          if (state.round === 3) score += card.power * 0.35;
          if (state.ai.roundWins === 1) score += outcome.delta * 0.12;
        }

        return { card, score, outcome };
      })
      .sort((a, b) => b.score - a.score);

    if (difficulty === "easy") {
      const pool = ranked.slice(0, Math.min(3, ranked.length));
      return pool[Math.floor(Math.random() * pool.length)].card;
    }

    if (difficulty === "hard" && state.player.passed) {
      const winningOptions = ranked
        .filter((entry) => entry.outcome.delta >= pointsNeeded)
        .sort((a, b) => {
          const aCost = a.card.power + RARITY_WEIGHT[a.card.rarity] * 1.8 - a.outcome.progressGain * 0.25;
          const bCost = b.card.power + RARITY_WEIGHT[b.card.rarity] * 1.8 - b.outcome.progressGain * 0.25;
          return aCost - bCost || a.outcome.delta - b.outcome.delta;
        });
      if (winningOptions.length) return winningOptions[0].card;
    }

    return ranked[0].card;
  }

  async function scheduleAiTurn() {
    if (!state.ai || state.aiThinking || state.phase !== "playing" || state.turn !== "ai" || state.ai.passed) return;
    const sessionId = state.sessionId;
    state.aiThinking = true;
    renderGame();
    await wait(620 + Math.floor(Math.random() * 420));

    if (sessionId !== state.sessionId || !state.ai || state.phase !== "playing" || state.turn !== "ai" || state.ai.passed) {
      if (sessionId === state.sessionId) state.aiThinking = false;
      return;
    }

    if (aiShouldUseLeader()) {
      state.aiThinking = false;
      useLeader("ai");
      return;
    }

    if (aiShouldPass()) {
      state.aiThinking = false;
      pass("ai");
      return;
    }

    if (state.ai.hand.length === 0) {
      state.aiThinking = false;
      if (!useLeader("ai")) pass("ai");
      return;
    }

    const card = chooseAiCard();
    state.aiThinking = false;
    playCard("ai", card.uid);
  }

  async function endRound() {
    if (state.phase !== "playing") return;
    state.phase = "roundEnd";
    const playerEval = evaluateBoard("player");
    const aiEval = evaluateBoard("ai");
    let winner = "tie";

    if (playerEval.total > aiEval.total) winner = "player";
    if (aiEval.total > playerEval.total) winner = "ai";

    if (winner === "tie") {
      state.player.roundWins += 1;
      state.ai.roundWins += 1;
      addLog(`第 ${state.round} 輪平局，雙方各得一個勝場標記。`);
      state.nextStarter = Math.random() < 0.5 ? "player" : "ai";
    } else {
      sideState(winner).roundWins += 1;
      state.nextStarter = winner;
      addLog(`${SIDE_LABEL[winner]}贏得第 ${state.round} 輪。`, winner);
    }

    const gameOver = state.player.roundWins >= 2 || state.ai.roundWins >= 2 || state.round >= 3;
    state.pendingRound = { winner, playerScore: playerEval.total, aiScore: aiEval.total, gameOver };
    renderGame();
    showRoundResult();
  }

  function showRoundResult() {
    const result = state.pendingRound;
    const winnerText = result.winner === "tie"
      ? "本輪平局"
      : result.winner === "player" ? "你贏得本輪" : "守藏者贏得本輪";

    $("#round-result-kicker").textContent = `第 ${state.round} 輪結算`;
    $("#round-result-title").textContent = winnerText;
    $("#round-result-score").textContent = `${result.playerScore} ： ${result.aiScore}`;
    $("#round-result-detail").textContent = result.gameOver
      ? "勝場已達成，進入最終結算。"
      : `下一輪由${SIDE_LABEL[state.nextStarter]}先手；場上卡牌將進入墓地，並依規則補牌。`;
    $("#round-result-continue").textContent = result.gameOver ? "查看最終結果" : "進入下一輪";
    playSound(result.winner === "player" ? "roundWin" : result.winner === "ai" ? "roundLose" : "roundTie");
    $("#round-result-modal").classList.remove("hidden");
  }

  function continueAfterRound() {
    $("#round-result-modal").classList.add("hidden");
    if (state.pendingRound.gameOver) {
      showGameOver();
      return;
    }

    ["player", "ai"].forEach((side) => {
      const actor = sideState(side);
      actor.graveyard.push(...allCards(actor.board));
      actor.board = emptyBoard();
      actor.passed = false;
      actor.roundBoosts = emptyBoosts();
    });

    state.round += 1;
    const drawCount = state.round === 2 ? 2 : 1;
    drawCards("player", drawCount);
    drawCards("ai", drawCount);
    state.pendingRound = null;
    showMulligan(1, "interround");
  }

  function determineFinalResult() {
    if (state.player.roundWins > state.ai.roundWins) return "player";
    if (state.ai.roundWins > state.player.roundWins) return "ai";
    return "tie";
  }

  function recordGame(result) {
    if (state.gameRecorded) return;
    const stats = loadStats();
    if (result === "player") stats.wins += 1;
    else if (result === "ai") stats.losses += 1;
    else stats.draws += 1;
    saveStats(stats);
    state.gameRecorded = true;
  }

  function showGameOver() {
    state.phase = "gameover";
    const result = determineFinalResult();
    recordGame(result);
    const title = result === "player" ? "你完成了宗祠牌局" : result === "ai" ? "守藏者守住了牌局" : "雙方平分秋色";
    const detail = result === "player"
      ? "你越能讀懂謝氏宗祠的空間、裝飾與文字脈絡，守藏者領主與地方記憶便給予更深的庇護。這一局，你已獲得更完整的守護。"
      : result === "ai"
        ? "這次雖未取勝，你仍得到基本庇護。守藏者領主沒有拒絕你，而是提醒你：再多理解一分鄉土，地方就會再多回應一分守護。"
        : "你已獲得穩定的庇護。若下次能串起更多地方脈絡，守藏者領主與宗祠記憶還會給你更深的回應。";

    $("#game-over-title").textContent = title;
    $("#game-over-score").textContent = `${state.player.roundWins} ： ${state.ai.roundWins}`;
    $("#game-over-detail").textContent = detail;
    showEndingOverlay(result);
  }

  function createCardArtSvg(card) {
    if (CARD_ART_CACHE.has(card.id)) return CARD_ART_CACHE.get(card.id);

    const theme = {
      space: { top: "#9ad0ff", bottom: "#234a56", accent: "#d76b43" },
      decoration: { top: "#ffd59d", bottom: "#572d28", accent: "#cf5c3d" },
      text: { top: "#dbcaf7", bottom: "#302957", accent: "#b89247" }
    }[card.type];

    const template = (inner) => {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140" aria-hidden="true">
          <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${theme.top}"/>
              <stop offset="100%" stop-color="${theme.bottom}"/>
            </linearGradient>
            <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#f8df99"/>
              <stop offset="100%" stop-color="#c78638"/>
            </linearGradient>
            <filter id="shadow"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.35"/></filter>
          </defs>
          <rect width="220" height="140" rx="14" fill="url(#bg)"/>
          <circle cx="176" cy="26" r="13" fill="rgba(255,255,255,0.35)"/>
          <rect x="0" y="104" width="220" height="36" fill="rgba(0,0,0,0.18)"/>
          ${inner}
        </svg>`;
      CARD_ART_CACHE.set(card.id, svg);
      return svg;
    };

    const architecturalHall = (roofColor = "#c55236", wallColor = "#f2ede3", sign = "") => template(`
      <path d="M32 70 L188 70 L175 58 L45 58 Z" fill="${roofColor}" stroke="#8a3a27" stroke-width="3" filter="url(#shadow)"/>
      <path d="M28 70 Q48 50 62 42 Q77 50 92 58 L128 58 Q143 50 158 42 Q172 50 192 70" fill="none" stroke="#e7c17f" stroke-width="3"/>
      <rect x="42" y="70" width="136" height="40" rx="3" fill="${wallColor}" stroke="#8a8a8a"/>
      <rect x="96" y="76" width="28" height="34" fill="#513325"/>
      <rect x="54" y="78" width="22" height="26" fill="#9dd1ff" stroke="#3b4652"/>
      <rect x="145" y="78" width="22" height="26" fill="#9dd1ff" stroke="#3b4652"/>
      <rect x="84" y="62" width="52" height="10" rx="2" fill="#6a341f"/>
      <text x="110" y="92" text-anchor="middle" font-size="10" fill="#f6dc95">${sign}</text>
    `);

    const textPlaque = (char, extra = "") => template(`
      <rect x="54" y="26" width="112" height="74" rx="8" fill="#5a351f" stroke="#dcb870" stroke-width="4" filter="url(#shadow)"/>
      <rect x="64" y="36" width="92" height="54" rx="4" fill="#f5edd7" opacity="0.95"/>
      <text x="110" y="73" text-anchor="middle" font-size="34" font-weight="700" fill="#432714">${char}</text>
      ${extra}
    `);

    switch (card.id) {
      case "gatehouse": return template(`
        <path d="M36 82 L184 82 L171 58 L49 58 Z" fill="#be5537" stroke="#893a28" stroke-width="3" filter="url(#shadow)"/>
        <rect x="52" y="82" width="116" height="26" fill="#f1eadc" stroke="#786d63"/>
        <rect x="96" y="84" width="28" height="24" fill="#4a2d24"/>
        <rect x="84" y="70" width="52" height="10" rx="2" fill="#4f2c18"/>
        <text x="110" y="78" text-anchor="middle" font-size="10" fill="#f2db93">謝氏宗祠</text>
      `);
      case "forecourt": return template(`
        <rect x="22" y="92" width="176" height="24" fill="#d8c6a3"/>
        <path d="M30 93 H190" stroke="#b6a07a" stroke-width="2" stroke-dasharray="6 5"/>
        <path d="M48 81 L172 81 L158 60 L62 60 Z" fill="#bc573b" opacity="0.82"/>
        <circle cx="70" cy="102" r="6" fill="#7a5a38"/>
        <circle cx="150" cy="102" r="6" fill="#7a5a38"/>
      `);
      case "frontHall": return architecturalHall("#cc5b3d", "#efe7db", "寶樹堂");
      case "courtyard": return template(`
        <rect x="50" y="32" width="120" height="76" rx="5" fill="#d7f0ff" opacity="0.45"/>
        <path d="M50 108 L74 82 L146 82 L170 108" fill="#f1efea" stroke="#8a8e97" stroke-width="2"/>
        <circle cx="110" cy="63" r="18" fill="rgba(255,255,255,0.42)"/>
        <path d="M110 48 V78 M95 63 H125" stroke="#d5e9ff" stroke-width="3"/>
      `);
      case "rearHall": return architecturalHall("#a54633", "#f5ede0", "木本水源");
      case "leftWing": return template(`
        <path d="M28 76 L128 76 L116 60 L40 60 Z" fill="#c15c3f" stroke="#853826" stroke-width="3"/>
        <rect x="40" y="76" width="76" height="28" fill="#eee6d7" stroke="#8a7a67"/>
        <rect x="48" y="82" width="18" height="18" fill="#8dc3ff" stroke="#434b54"/>
        <text x="152" y="96" font-size="22" fill="#f0ddad" font-weight="700">左</text>
      `);
      case "rightWing": return template(`
        <path d="M92 76 L192 76 L180 60 L104 60 Z" fill="#c15c3f" stroke="#853826" stroke-width="3"/>
        <rect x="104" y="76" width="76" height="28" fill="#eee6d7" stroke="#8a7a67"/>
        <rect x="154" y="82" width="18" height="18" fill="#8dc3ff" stroke="#434b54"/>
        <text x="66" y="96" font-size="22" fill="#f0ddad" font-weight="700">右</text>
      `);
      case "huatai": return template(`
        <rect x="48" y="54" width="124" height="48" rx="6" fill="#c7bea8" stroke="#776d60" stroke-width="3"/>
        <path d="M48 102 L172 102" stroke="#6d5f53" stroke-width="4"/>
        <path d="M76 78 C94 54 126 54 144 78" fill="none" stroke="#b95e3d" stroke-width="4"/>
      `);
      case "study": return template(`
        <rect x="44" y="54" width="132" height="52" rx="5" fill="#6b4e38" stroke="#3e2b1f" stroke-width="3"/>
        <rect x="60" y="66" width="20" height="28" fill="#eadc96"/>
        <rect x="84" y="62" width="20" height="32" fill="#7fb0d9"/>
        <rect x="108" y="66" width="20" height="28" fill="#e27b5f"/>
        <rect x="132" y="60" width="24" height="34" fill="#9dc38d"/>
      `);
      case "ritualHall": return template(`
        <rect x="56" y="42" width="108" height="64" rx="4" fill="#f1ebde" stroke="#7a6d60" stroke-width="3"/>
        <rect x="96" y="48" width="28" height="46" fill="#5a3426"/>
        <rect x="74" y="56" width="12" height="34" fill="#b24738"/>
        <rect x="134" y="56" width="12" height="34" fill="#b24738"/>
        <circle cx="110" cy="36" r="9" fill="#d1a74a"/>
      `);
      case "fiveElements": return template(`
        <circle cx="56" cy="68" r="18" fill="#47b35d" filter="url(#shadow)"/>
        <circle cx="93" cy="50" r="18" fill="#4b88d8" filter="url(#shadow)"/>
        <circle cx="127" cy="68" r="18" fill="#d4523a" filter="url(#shadow)"/>
        <circle cx="164" cy="50" r="18" fill="#e0bc4d" filter="url(#shadow)"/>
        <circle cx="110" cy="84" r="18" fill="#8e6f4f" filter="url(#shadow)"/>
      `);
      case "landDragon": return template(`
        <path d="M42 82 C58 62 84 58 100 68 C112 50 132 46 154 58 C160 56 173 59 180 70 C170 69 163 72 158 78 C147 98 120 102 102 92 C84 104 60 100 42 82 Z" fill="#5aa366" stroke="#2d4f36" stroke-width="3" filter="url(#shadow)"/>
        <circle cx="160" cy="62" r="4" fill="#fff"/>
      `);
      case "heavenIncense": return template(`
        <rect x="72" y="80" width="76" height="16" rx="8" fill="#815534"/>
        <path d="M82 80 C90 58 130 58 138 80" fill="#b8703a" stroke="#704227" stroke-width="3"/>
        <path d="M104 74 V40 M116 74 V38" stroke="#f4e8c4" stroke-width="3"/>
        <path d="M104 40 C94 28 98 20 108 16 M116 38 C126 26 122 18 112 14" fill="none" stroke="#dbe8ef" stroke-width="3" stroke-linecap="round"/>
      `);
      case "dougongPainting": return template(`
        <path d="M44 92 H176" stroke="#cfb067" stroke-width="6"/>
        <path d="M56 92 L72 68 L88 92 Z" fill="#cc563b"/>
        <path d="M88 92 L104 64 L120 92 Z" fill="#4d86d8"/>
        <path d="M120 92 L136 68 L152 92 Z" fill="#6ba95c"/>
        <path d="M74 58 C82 42 98 42 110 52 C122 42 138 42 146 58" fill="none" stroke="#f5d587" stroke-width="4"/>
      `);
      case "threeSuccesses": return template(`
        <rect x="42" y="76" width="36" height="22" rx="4" fill="#a54e35"/>
        <rect x="92" y="60" width="36" height="22" rx="4" fill="#a54e35"/>
        <rect x="142" y="44" width="36" height="22" rx="4" fill="#a54e35"/>
        <path d="M60 88 L110 72 L160 56" stroke="#f0da96" stroke-width="4"/>
      `);
      case "sterculiaTree": return template(`
        <path d="M108 104 C104 84 105 72 110 48" stroke="#6c442c" stroke-width="10" stroke-linecap="round"/>
        <circle cx="82" cy="54" r="20" fill="#66a353"/>
        <circle cx="110" cy="44" r="24" fill="#77b25e"/>
        <circle cx="138" cy="56" r="20" fill="#5f964d"/>
        <circle cx="86" cy="70" r="5" fill="#e56246"/>
        <circle cx="128" cy="68" r="5" fill="#e56246"/>
      `);
      case "maleLamp": return template(`
        <path d="M96 38 H124" stroke="#f1df9f" stroke-width="4"/>
        <path d="M88 38 L96 54 H124 L132 38" fill="#cb4e38" stroke="#8b2c20" stroke-width="3"/>
        <rect x="96" y="54" width="28" height="34" rx="10" fill="#d94f3c" stroke="#8b2c20" stroke-width="3"/>
        <text x="110" y="76" text-anchor="middle" font-size="18" fill="#f7db8f">男</text>
      `);
      case "femaleLamp": return template(`
        <path d="M96 38 H124" stroke="#f1df9f" stroke-width="4"/>
        <path d="M88 38 L96 54 H124 L132 38" fill="#d95744" stroke="#8b2c20" stroke-width="3"/>
        <rect x="96" y="54" width="28" height="34" rx="10" fill="#e0614f" stroke="#8b2c20" stroke-width="3"/>
        <text x="110" y="76" text-anchor="middle" font-size="18" fill="#f7db8f">女</text>
      `);
      case "swallowTail": return template(`
        <path d="M34 96 L186 96" stroke="#ddd2b6" stroke-width="5"/>
        <path d="M46 96 C62 66 82 56 100 52 C118 56 138 66 174 96" fill="none" stroke="#be563c" stroke-width="8" stroke-linecap="round"/>
        <path d="M46 96 C32 82 28 66 26 58 M174 96 C188 82 192 66 194 58" fill="none" stroke="#e7cb89" stroke-width="4"/>
      `);
      case "longevityBrick": return template(`
        <rect x="60" y="40" width="100" height="60" rx="6" fill="#b6674d" stroke="#7d3d2d" stroke-width="4" filter="url(#shadow)"/>
        <text x="110" y="80" text-anchor="middle" font-size="36" font-weight="700" fill="#f6ebd4">壽</text>
      `);
      case "harvestPattern": return template(`
        <path d="M78 98 C70 82 72 60 78 44" stroke="#e3cb73" stroke-width="4"/>
        <path d="M110 100 C104 82 104 58 110 40" stroke="#e3cb73" stroke-width="4"/>
        <path d="M142 98 C148 82 148 60 142 44" stroke="#e3cb73" stroke-width="4"/>
        <g fill="#f0dd93">
          <ellipse cx="70" cy="54" rx="8" ry="4"/><ellipse cx="68" cy="66" rx="8" ry="4"/><ellipse cx="66" cy="78" rx="8" ry="4"/>
          <ellipse cx="110" cy="50" rx="8" ry="4"/><ellipse cx="110" cy="62" rx="8" ry="4"/><ellipse cx="110" cy="74" rx="8" ry="4"/>
          <ellipse cx="150" cy="54" rx="8" ry="4"/><ellipse cx="152" cy="66" rx="8" ry="4"/><ellipse cx="154" cy="78" rx="8" ry="4"/>
        </g>
      `);
      case "baoshutang": return textPlaque("寶樹堂", `<path d="M74 94 H146" stroke="#8f6b34" stroke-width="3"/>`);
      case "rootSource": return textPlaque("木本水源");
      case "frontCouplet": return template(`
        <rect x="66" y="20" width="20" height="96" rx="4" fill="#c24131" stroke="#f2d48b" stroke-width="3"/>
        <rect x="134" y="20" width="20" height="96" rx="4" fill="#c24131" stroke="#f2d48b" stroke-width="3"/>
        <text x="76" y="44" text-anchor="middle" font-size="10" fill="#f5ead1">前</text>
        <text x="76" y="60" text-anchor="middle" font-size="10" fill="#f5ead1">堂</text>
        <text x="144" y="44" text-anchor="middle" font-size="10" fill="#f5ead1">門</text>
        <text x="144" y="60" text-anchor="middle" font-size="10" fill="#f5ead1">聯</text>
      `);
      case "rearCouplet": return template(`
        <rect x="66" y="20" width="20" height="96" rx="4" fill="#a93d2d" stroke="#f2d48b" stroke-width="3"/>
        <rect x="134" y="20" width="20" height="96" rx="4" fill="#a93d2d" stroke="#f2d48b" stroke-width="3"/>
        <text x="76" y="44" text-anchor="middle" font-size="10" fill="#f5ead1">後</text>
        <text x="76" y="60" text-anchor="middle" font-size="10" fill="#f5ead1">堂</text>
        <text x="144" y="44" text-anchor="middle" font-size="10" fill="#f5ead1">門</text>
        <text x="144" y="60" text-anchor="middle" font-size="10" fill="#f5ead1">聯</text>
      `);
      case "ridgeCouplet": return textPlaque("敦倫報本", `<path d="M62 28 H158" stroke="#d7b15b" stroke-width="3"/>`);
      case "ancestralTablets": return template(`
        <rect x="62" y="34" width="26" height="62" rx="4" fill="#6b3d28" stroke="#d9b065" stroke-width="3"/>
        <rect x="97" y="28" width="26" height="68" rx="4" fill="#5c2e1c" stroke="#f3cf84" stroke-width="3"/>
        <rect x="132" y="34" width="26" height="62" rx="4" fill="#6b3d28" stroke="#d9b065" stroke-width="3"/>
        <path d="M56 100 H164" stroke="#8b5f32" stroke-width="6"/>
      `);
      case "hallInscription": return textPlaque("謝氏宗祠");
      case "springAutumn": return template(`
        <circle cx="72" cy="58" r="22" fill="#8ad37f"/>
        <path d="M72 34 C84 50 88 64 72 80 C56 64 60 50 72 34 Z" fill="#49a85b"/>
        <circle cx="148" cy="58" r="22" fill="#f6c868"/>
        <path d="M148 34 L162 58 L148 82 L134 58 Z" fill="#d47a2d"/>
        <path d="M72 102 H148" stroke="#f2db93" stroke-width="4" stroke-dasharray="8 6"/>
      `);
      case "ancestorSociety": return textPlaque("嘗會", `<circle cx="110" cy="44" r="7" fill="#c24938"/>`);
      default: return textPlaque(card.name.slice(0, 4));
    }
  }

  

  function ensureCardEffectTooltip() {
    if (cardEffectTooltip && document.body.contains(cardEffectTooltip)) return cardEffectTooltip;
    cardEffectTooltip = document.createElement("div");
    cardEffectTooltip.className = "card-effect-tooltip";
    cardEffectTooltip.setAttribute("role", "tooltip");
    cardEffectTooltip.setAttribute("aria-hidden", "true");
    cardEffectTooltip.innerHTML = `
      <strong class="card-effect-tooltip-title"></strong>
      <span class="card-effect-tooltip-label">遊戲效果</span>
      <p class="card-effect-tooltip-text"></p>
      <small class="card-effect-tooltip-bonus hidden"></small>
    `;
    document.body.appendChild(cardEffectTooltip);
    return cardEffectTooltip;
  }

  function positionCardEffectTooltip(cardElement) {
    const tooltip = ensureCardEffectTooltip();
    const rect = cardElement.getBoundingClientRect();
    const margin = 12;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;

    tooltip.style.left = "0px";
    tooltip.style.top = "0px";
    tooltip.classList.add("measuring");
    const tooltipRect = tooltip.getBoundingClientRect();
    tooltip.classList.remove("measuring");

    let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
    left = Math.max(margin, Math.min(left, viewportWidth - tooltipRect.width - margin));

    let top = rect.top - tooltipRect.height - 10;
    let placement = "above";
    if (top < margin) {
      top = rect.bottom + 10;
      placement = "below";
    }
    if (top + tooltipRect.height > viewportHeight - margin) {
      top = Math.max(margin, viewportHeight - tooltipRect.height - margin);
    }

    tooltip.style.left = `${Math.round(left)}px`;
    tooltip.style.top = `${Math.round(top)}px`;
    tooltip.dataset.placement = placement;
  }

  function showCardEffectTooltip(cardElement, card, powerInfo = null) {
    const tooltip = ensureCardEffectTooltip();
    tooltip.querySelector(".card-effect-tooltip-title").textContent = card.name;
    tooltip.querySelector(".card-effect-tooltip-text").textContent = card.effectText;
    const bonusLine = tooltip.querySelector(".card-effect-tooltip-bonus");
    const bonus = powerInfo?.bonus || 0;
    if (bonus > 0) {
      bonusLine.textContent = `目前連動：基礎 ${card.power} ＋ ${bonus}，合計 ${powerInfo.effective}`;
      bonusLine.classList.remove("hidden");
    } else {
      bonusLine.textContent = "";
      bonusLine.classList.add("hidden");
    }
    tooltip.classList.add("show");
    tooltip.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => positionCardEffectTooltip(cardElement));
  }

  function hideCardEffectTooltip() {
    if (!cardEffectTooltip) return;
    cardEffectTooltip.classList.remove("show");
    cardEffectTooltip.setAttribute("aria-hidden", "true");
  }

  function createCardElement(card, side, location, evaluation = null) {
    const el = document.createElement("button");
    const row = DATA.rows[card.type];
    const powerInfo = evaluation?.cardPowers?.get(card.uid);
    const effective = powerInfo ? powerInfo.effective : card.power;
    const bonus = powerInfo ? powerInfo.bonus : 0;
    const artSvg = createCardArtSvg(card);

    el.type = "button";
    el.className = `game-card card-${card.type} rarity-${card.rarity} location-${location}`;
    el.dataset.uid = card.uid;
    el.dataset.effect = card.effectText;
    el.classList.toggle("has-bonus", bonus > 0);
    el.setAttribute("aria-label", `${card.name}，${row.label}，力量 ${effective}。遊戲效果：${card.effectText}`);

    el.innerHTML = `
      <span class="card-power ${bonus > 0 ? "boosted" : ""}">${effective}</span>
      <span class="card-rarity">${card.rarity}</span>
      <span class="card-art" role="img" aria-label="${card.name}插圖">${artSvg}</span>
      <span class="card-type">${row.icon} ${row.label}</span>
      <strong class="card-name">${card.name}</strong>
      ${bonus > 0 ? `<span class="card-bonus">基礎 ${card.power} ＋連動 ${bonus}</span>` : ""}
    `;

    el.addEventListener("pointerenter", () => showCardEffectTooltip(el, card, powerInfo));
    el.addEventListener("pointerleave", hideCardEffectTooltip);
    el.addEventListener("focus", () => showCardEffectTooltip(el, card, powerInfo));
    el.addEventListener("blur", hideCardEffectTooltip);

    el.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      hideCardEffectTooltip();
      showCardDetail(card, powerInfo);
    });

    if (location === "board") {
      el.addEventListener("click", () => showCardDetail(card, powerInfo));
    }

    if (location === "hand" && side === "player") {
      el.addEventListener("click", () => playCard("player", card.uid));
    }

    return el;
  }

  function renderSide(side) {
    const actor = sideState(side);
    const evaluation = evaluateBoard(side);
    $("#" + side + "-total").textContent = evaluation.total;
    $("#" + side + "-hand-count").textContent = actor.hand.length;
    $("#" + side + "-deck-count").textContent = actor.deck.length;
    $("#" + side + "-grave-count").textContent = actor.graveyard.length;
    $("#" + side + "-pass-badge").classList.toggle("hidden", !actor.passed);

    ROW_ORDER.forEach((row) => {
      const container = $(`#${side}-${row}-cards`);
      container.innerHTML = "";
      actor.board[row].forEach((card) => {
        container.appendChild(createCardElement(card, side, "board", evaluation));
      });
      $(`#${side}-${row}-score`).textContent = evaluation.rowTotals[row];
      $(`#${side}-${row}-boost`).textContent = actor.roundBoosts[row] > 0 ? `領主 +${actor.roundBoosts[row]}` : "";
    });
  }

  function renderHand() {
    const container = $("#player-hand");
    container.innerHTML = "";
    const evaluation = evaluateBoard("player");
    state.player.hand.forEach((card) => {
      const el = createCardElement(card, "player", "hand", evaluation);
      const playable = state.phase === "playing" && state.turn === "player" && !state.player.passed;
      el.disabled = false;
      el.classList.toggle("is-unplayable", !playable);
      el.setAttribute("aria-disabled", playable ? "false" : "true");
      container.appendChild(el);
    });
  }

  function renderLeaders() {
    ["player", "ai"].forEach((side) => {
      const actor = sideState(side);
      const leader = DATA.leaders[actor.leaderId];
      $(`#${side}-leader-icon`).textContent = leader.icon;
      $(`#${side}-leader-name`).textContent = leader.name;
      $(`#${side}-leader-title`).textContent = leader.abilityName;
      $(`#${side}-leader-used`).textContent = actor.leaderUsed ? "已使用" : "可使用";
      $(`#${side}-leader`).classList.toggle("used", actor.leaderUsed);
    });

    const button = $("#leader-action");
    const leader = DATA.leaders[state.player.leaderId];
    button.textContent = state.player.leaderUsed ? `${leader.abilityName}（已使用）` : `使用：${leader.abilityName}`;
    button.disabled = !canUseLeader("player");
  }

  function renderCrowns(side) {
    const wins = sideState(side).roundWins;
    const container = $(`#${side}-crowns`);
    container.innerHTML = [0, 1].map((index) => `<span class="${wins > index ? "won" : ""}">◆</span>`).join("");
  }

  function renderLogs() {
    const container = $("#game-log");
    container.innerHTML = state.logs.slice(0, 6).map((entry) => `
      <li class="log-${entry.tone}">${entry.text}</li>
    `).join("");
  }

  function renderStatus() {
    const playerEval = evaluateBoard("player");
    const aiEval = evaluateBoard("ai");
    const diff = playerEval.total - aiEval.total;
    let status = "";

    if (state.phase === "playing") {
      if (state.aiThinking) status = `守藏者正在思考（${DATA.difficultyLabels[state.selectedDifficulty]}）……`;
      else if (state.turn === "player") status = state.player.passed ? "你已 PASS，等待對方完成本輪。" : "輪到你：打出一張牌、使用領主能力或 PASS。";
      else status = `輪到守藏者（${DATA.difficultyLabels[state.selectedDifficulty]}）。`;
    } else if (state.phase === "roundEnd") {
      status = "本輪已結算。";
    } else if (state.phase === "mulligan") {
      status = "換牌中。";
    }

    $("#round-label").textContent = `第 ${state.round} 輪`;
    $("#turn-status").textContent = status;
    $("#score-difference").textContent = diff === 0 ? "目前平手" : diff > 0 ? `你領先 ${diff} 點` : `你落後 ${Math.abs(diff)} 點`;
    $("#pass-action").disabled = !(state.phase === "playing" && state.turn === "player" && !state.player.passed);
    $("#turn-orb").className = `turn-orb turn-${state.turn}`;
  }

  function renderGame() {
    if (!state.player || !state.ai) return;
    renderSide("ai");
    renderSide("player");
    renderHand();
    renderLeaders();
    renderCrowns("player");
    renderCrowns("ai");
    renderLogs();
    renderStatus();
  }

  function showCardDetail(card, powerInfo = null) {
    const row = DATA.rows[card.type];
    $("#card-detail-type").textContent = `${row.icon} ${row.label}｜${card.rarity}`;
    $("#card-detail-name").textContent = card.name;
    $("#card-detail-power").textContent = powerInfo ? `${powerInfo.effective}` : `${card.power}`;
    $("#card-detail-effect").textContent = card.effectText;
    $("#card-detail-culture").textContent = card.culturalNote;
    $("#card-detail-value").textContent = card.valueNote || "這張卡牌呈現謝氏宗祠歷史、空間、工藝或禮制的一個重要面向。";
    $("#card-detail-source").textContent = card.source;
    $("#card-detail-modal").classList.remove("hidden");
  }

  function openModal(id) {
    $(id)?.classList.remove("hidden");
  }

  function closeModal(id) {
    $(id)?.classList.add("hidden");
  }

  function renderComboRuleList() {
    const container = $("#combo-rule-list");
    container.innerHTML = DATA.combos.map((combo) => {
      const reqCards = (combo.requiresCards || []).map((id) => DATA.cards.find((card) => card.id === id)?.name || id).join("＋");
      const reqCombos = (combo.requiresCombos || []).map((id) => DATA.combos.find((item) => item.id === id)?.name || id).join("＋");
      const requirementText = [reqCards, reqCombos].filter(Boolean).join("；需要先成立 ");
      return `
        <article class="combo-rule-item tier-${combo.tier}">
          <div>
            <strong>${combo.name}</strong>
            <small>第 ${combo.tier} 層｜+${combo.points}</small>
          </div>
          <p>條件：${requirementText}</p>
          <p>${combo.description}</p>
        </article>
      `;
    }).join("");
  }

  function renderTutorialStep() {
    const steps = DATA.tutorialSteps;
    const step = steps[state.tutorial.step];
    $("#tutorial-progress-text").textContent = `${state.tutorial.step + 1} / ${steps.length}`;
    $("#tutorial-step-title").textContent = step.title;
    $("#tutorial-step-body").textContent = step.body;
    $("#tutorial-prev").disabled = state.tutorial.step === 0;
    $("#tutorial-next").textContent = state.tutorial.step === steps.length - 1
      ? (state.tutorial.afterClose ? "開始對局" : "完成")
      : "下一步";
  }

  function openTutorial(afterClose = null) {
    state.tutorial.step = 0;
    state.tutorial.afterClose = afterClose;
    renderTutorialStep();
    $("#tutorial-modal").classList.remove("hidden");
  }

  function closeTutorial(runCallback = false) {
    $("#tutorial-modal")?.classList.add("hidden");
    safeStorage.set("hsiehCardGameTutorialSeen", "1");
    const callback = state.tutorial.afterClose;
    state.tutorial.afterClose = null;
    if (runCallback && typeof callback === "function") {
      try {
        callback();
      } catch (error) {
        console.error("新手教學結束後的流程執行失敗：", error);
      }
    }
  }

  function setupEvents() {
    $$(".leader-choice").forEach((button) => {
      button.addEventListener("click", () => selectLeader(button.dataset.leader));
    });

    $("#brand-home")?.addEventListener("click", (event) => {
      event.preventDefault();
      playSound("ui");
      goHome();
    });

    $("#sound-toggle")?.addEventListener("click", () => {
      setSoundEnabled(!state.soundEnabled);
      playSound("ui");
    });

    $("#opening-prev")?.addEventListener("click", () => {
      unlockAudioContext();
      advanceOpeningScene(-1);
    });
    $("#opening-next")?.addEventListener("click", () => {
      unlockAudioContext();
      advanceOpeningScene(1);
    });
    $("#opening-skip")?.addEventListener("click", () => {
      unlockAudioContext();
      skipOpening();
    });
    $("#ending-continue")?.addEventListener("click", () => {
      unlockAudioContext();
      playSound("ui");
      continueFromEndingOverlay();
    });

    $("#start-game")?.addEventListener("click", startGame);
    $("#mulligan-confirm")?.addEventListener("click", () => { unlockAudioContext(); confirmMulligan(); });
    $("#pass-action")?.addEventListener("click", () => { unlockAudioContext(); pass("player"); });
    $("#leader-action")?.addEventListener("click", () => { unlockAudioContext(); useLeader("player"); });
    $("#round-result-continue")?.addEventListener("click", () => { playSound("ui"); continueAfterRound(); });
    $("#play-again")?.addEventListener("click", () => {
      playSound("ui");
      $("#game-over-modal")?.classList.add("hidden");
      startGame();
    });
    $("#return-home")?.addEventListener("click", () => { playSound("ui"); goHome(); });

    $("#rules-button")?.addEventListener("click", () => { playSound("ui"); openModal("#rules-modal"); });
    $("#sources-button")?.addEventListener("click", () => { playSound("ui"); openModal("#sources-modal"); });
    $("#start-rules")?.addEventListener("click", () => openModal("#rules-modal"));
    $("#tutorial-button")?.addEventListener("click", () => openTutorial());
    $("#game-tutorial")?.addEventListener("click", () => openTutorial());
    $("#open-guided-tutorial")?.addEventListener("click", () => {
      closeModal("#rules-modal");
      openTutorial();
    });

    $("#restart-button")?.addEventListener("click", () => { playSound("ui"); restartCurrentGame(); });
    $("#game-restart")?.addEventListener("click", restartCurrentGame);
    $("#game-home")?.addEventListener("click", goHome);

    $("#tutorial-prev")?.addEventListener("click", () => {
      if (state.tutorial.step > 0) state.tutorial.step -= 1;
      renderTutorialStep();
    });
    $("#tutorial-next")?.addEventListener("click", () => {
      if (state.tutorial.step < DATA.tutorialSteps.length - 1) {
        state.tutorial.step += 1;
        renderTutorialStep();
      } else {
        closeTutorial(true);
      }
    });
    $("#tutorial-skip")?.addEventListener("click", () => closeTutorial(true));
    $("#tutorial-close")?.addEventListener("click", () => closeTutorial(true));

    $$('[data-close]').forEach((button) => {
      button.addEventListener('click', () => closeModal(button.dataset.close));
    });

    $$(".modal").forEach((modal) => {
      modal.addEventListener("click", (event) => {
        if (event.target === modal && !modal.classList.contains("locked")) {
          modal.classList.add("hidden");
        }
      });
    });

    window.addEventListener("resize", hideCardEffectTooltip);
    window.addEventListener("scroll", hideCardEffectTooltip, true);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        ["#rules-modal", "#sources-modal", "#card-detail-modal"].forEach((id) => closeModal(id));
        if (!$("#tutorial-modal")?.classList.contains("hidden")) closeTutorial(true);
      }
    });
  }

  function init() {
    if (state.initialized) return;
    state.initialized = true;
    setupEvents();
    mountGuardianPortraits();
    renderComboRuleList();
    renderStats();
    renderSoundToggle();
    document.addEventListener("pointerdown", () => { unlockAudioContext(); syncAmbientToPhase(); }, { once: true });
    document.addEventListener("keydown", () => { unlockAudioContext(); syncAmbientToPhase(); }, { once: true });

    const params = new URLSearchParams(window.location.search);
    const leader = DATA.leaders[params.get("leader")] ? params.get("leader") : "xieAn";
    const difficulty = ["easy", "normal", "hard"].includes(params.get("difficulty"))
      ? params.get("difficulty")
      : "normal";
    state.selectedLeaderId = leader;
    state.selectedDifficulty = difficulty;
    openOpeningIntro();
  }

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
