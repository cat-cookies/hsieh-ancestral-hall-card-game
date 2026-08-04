/* 謝氏宗祠文化卡牌遊戲 - 遊戲主程式 */
(() => {
  "use strict";

  const DATA = window.GAME_DATA;
  const ROW_ORDER = ["text", "decoration", "space"];
  const SIDE_LABEL = { player: "你", ai: "守藏者" };
  const CARD_ART_CACHE = new Map();
  const OPENING_SCENES = [
    {
      kicker: "文化起點",
      title: "先看空間，再理解人與儀式",
      body: "謝氏宗祠由門樓、禾埕、前堂、天井、後堂與左右橫屋構成。這些空間同時承載祭祀、聚會、教育、生活與宗族組織運作。",
      note: "文化卡牌的效果來自空間、構件、文字與儀式之間的關係。",
      caption: "快速文化導覽",
      tags: ["空間格局", "文化意義", "保存價值"],
      illustration: "layout",
      storyboardCaption: "理解建築如何被使用，才能理解它為何值得保存。"
    },
    {
      kicker: "策略起點",
      title: "用組合與配置取勝，不靠文化標記",
      body: "每回合可打出一張牌、使用一次性領主能力或選擇 PASS。卡牌的文化標記只表示特殊性與代表性，不增加力量，也不影響電腦選牌。",
      note: "點一下查看效果；快速點兩下才會正式出牌。",
      caption: "操作與公平性說明",
      tags: ["卡牌組合", "技能搭配", "配置策略"],
      illustration: "guardian",
      storyboardCaption: "先理解規則，再用文化關係完成組合。"
    }
  ];
  const DIFFICULTY_PROFILES = {
    easy: {
      openingTone: "簡單難度",
      openingNote: "簡單模式的語氣較緩，像有人在旁邊陪你看。錯了也不急著追問，只讓路慢一點。",
      guardianCaption: "說得不急，留的空白也多。",
      endingToneWin: "你在溫和的引路下，把地方看進了心裡。",
      endingToneLose: "這次腳步慢了些，但堂前還是留著一點光。",
      endingToneTie: "你已穩穩跟上地方導覽的步調。"
    },
    normal: {
      openingTone: "普通難度",
      openingNote: "普通模式語氣平穩，會一邊帶你看，一邊看你是否跟得上。該提醒的提醒，該留白的留白。",
      guardianCaption: "話不多，但分量剛好。",
      endingToneWin: "你通過了這場審慎的對望，理解也被看見。",
      endingToneLose: "這一局還沒走到最裡面，但你已知道門往哪裡開。",
      endingToneTie: "你已與守藏者站在相近的步調裡。"
    },
    hard: {
      openingTone: "困難難度",
      openingNote: "困難模式的語氣收得更緊。守藏者不多說，但每一步都會看你是否真的看懂。",
      guardianCaption: "看得深，也問得深。",
      endingToneWin: "你在緊風裡站穩了，所以得到更深的回應。",
      endingToneLose: "這次還未能通過深處的門，但燈火沒有熄。",
      endingToneTie: "你已走到門內，只差再深一層。"
    }
  };
  const GUARDIAN_DIALOGUES = {
    easy: {
      gameStart: "風聲還在。慢慢看，先把眼前這座宗祠看進去。",
      mulligan: "若手裡不順，就換一換。好路不怕慢。",
      playerPlay: {
        space: "「{card}」落下去，路就清了一段。空間先替你說了話。",
        decoration: "「{card}」把顏色補上了。地方的手藝，這樣就亮了一點。",
        text: "「{card}」一出，堂上的字像又近了一些。"
      },
      aiPlay: {
        space: "我先把格局擺穩。你若跟得上，後面就看得更清楚。",
        decoration: "我補一筆工藝。宗祠裡好看的東西，從來都不只是好看。",
        text: "我先落一張文字牌。堂上的話，總是比人留得久。"
      },
      combo: "「{combo}」連起來了。看懂一處，常會帶出下一處。",
      playerPass: "你先收手，也好。留一點餘地，牌局才有回身處。",
      aiPass: "我先停。堂前還有風，你慢慢想下一步。",
      leader: "領主之力起了。牌局忽然靜了一下。",
      roundWin: "這一輪你走得順，像路本來就在那裡。",
      roundLose: "這一輪先這樣。地方沒關門，只是要你再看細些。",
      roundTie: "不多不少，剛好平齊。這樣也好。",
      finalWin: "你看得進去，地方便回得深一些。",
      finalLose: "這次還差一點，但光沒有滅。",
      finalTie: "你已站穩了。剩下的，留到下一局。"
    },
    normal: {
      gameStart: "牌局開始。先別急著求勝，看看什麼會先被你看見。",
      mulligan: "起手要整。格局若先亂了，後面說的話就容易散。",
      playerPlay: {
        space: "「{card}」擺進去，堂前的路線立刻明白了些。",
        decoration: "「{card}」讓木石與彩繪露出聲音，雖然它們一直不吵。",
        text: "「{card}」一出，字義就從堂上落到了牌桌。"
      },
      aiPlay: {
        space: "我先把空間扣緊。格局一穩，後面的牌就不容易虛。",
        decoration: "我補一張裝飾牌。真正的細部，往往比大話更可靠。",
        text: "我先落文字牌。若讀不懂字，很多門其實不會自己開。"
      },
      combo: "「{combo}」已成。幾條線索開始互相照應了。",
      playerPass: "你選擇 PASS。那就讓這一桌場面替你說完。",
      aiPass: "我先收手。接下來，看你如何把餘下的意思接起來。",
      leader: "領主之力已起。桌面上的光線，也跟著變了。",
      roundWin: "這一輪由你收下。幾處脈絡，已被你接得相當穩。",
      roundLose: "這一輪我帶走了。不是你沒看見，只是還沒看夠。",
      roundTie: "平局。像兩個人站在同一段屋簷下，各自看見了一半。",
      finalWin: "地方記憶已經認得你手上的分寸，所以回應也更深。",
      finalLose: "這一次還沒走到最裡面，但你已知道門往哪裡開。",
      finalTie: "你與守藏者都停在門內一步。距離不遠了。"
    },
    hard: {
      gameStart: "牌局開始。風收得很緊，桌上的每一步都會留下重量。",
      mulligan: "起手若散，後面就只能用更重的牌去補。想清楚再換。",
      playerPlay: {
        space: "「{card}」落下，格局有了，但要站住還不夠。",
        decoration: "「{card}」讓細部發亮，可若只亮不深，仍舊站不久。",
        text: "「{card}」把字帶上桌了。字若讀偏，後面整桌都會歪。"
      },
      aiPlay: {
        space: "我先壓住空間。路一收緊，你就沒有太多地方可退。",
        decoration: "我用裝飾牌逼近。細部若被忽略，整體很快就會露空。",
        text: "我先落文字牌。堂上的字一旦壓下來，場面就不會輕。"
      },
      combo: "「{combo}」是成了。但真正難的，不在成，而在能不能承住。",
      playerPass: "你收手了。這桌牌，接下來只剩它自己替你作證。",
      aiPass: "我先封局。剩下的分寸，你自己扛。",
      leader: "領主之力已起。此後每一步，都會被看得更清楚。",
      roundWin: "這一輪你撐住了。這樣的風裡，能站住並不容易。",
      roundLose: "這一輪由我取走。場面還在，但重量沒有壓過來。",
      roundTie: "平局。桌上的光沒有偏向誰，但也沒有放鬆。",
      finalWin: "在這樣的壓力下仍能走到最後，地方便不再只給你微光。",
      finalLose: "你還沒走到最裡面。可那點燈火，仍然替你留著。",
      finalTie: "你已走到門內。只是更深處，還沒有完全答應。"
    }
  };
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

  function loadNormalizedSetting(key, fallback) {
    const value = Number.parseFloat(safeStorage.get(key) || "");
    if (Number.isFinite(value)) return Math.max(0, Math.min(2, value));
    return fallback;
  }

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
    soundSettings: {
      master: loadNormalizedSetting("hsiehCardGameMasterVolume", 1.4),
      ambient: loadNormalizedSetting("hsiehCardGameAmbientVolume", 1.25),
      effects: loadNormalizedSetting("hsiehCardGameEffectsVolume", 1.5),
      story: loadNormalizedSetting("hsiehCardGameStoryVolume", 1.35)
    },
    opening: {
      index: 0,
      timer: null
    },
    ambient: {
      mode: null,
      timer: null
    },
    guardianSpeech: {
      kicker: "守藏者低語",
      text: "你已來到謝氏宗祠之前，守藏者正在觀察你的來意。"
    },
    selectedHandCardUid: null,
    lastHandClick: { uid: null, time: 0 },
    animationRate: [0.25, 0.5, 1, 1.5, 2].includes(Number.parseFloat(safeStorage.get("hsiehAnimationRate"))) ? Number.parseFloat(safeStorage.get("hsiehAnimationRate")) : 1,
    fontSize: "medium",
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

  function getDifficultyProfile() {
    return DIFFICULTY_PROFILES[state.selectedDifficulty] || DIFFICULTY_PROFILES.normal;
  }

  function getSoundCategory(kind) {
    if (["story", "start"].includes(kind)) return "story";
    return "effects";
  }

  function currentCategoryVolume(category) {
    const settings = state.soundSettings || {};
    return (settings.master ?? 1) * (settings[category] ?? 1);
  }

  function playTone(ctx, start, frequency, duration, type = "sine", gainValue = 0.04, category = "effects") {
    const resolvedGain = Math.min(0.72, gainValue * currentCategoryVolume(category) * 3.6);
    if (resolvedGain <= 0.00015) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(resolvedGain, start + 0.015);
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
    const category = getSoundCategory(kind);
    switch (kind) {
      case "ui":
        playTone(ctx, now, 620, 0.08, "triangle", 0.028, category);
        break;
      case "story":
        playTone(ctx, now, 392, 0.14, "sine", 0.026, category);
        playTone(ctx, now + 0.11, 523.25, 0.18, "triangle", 0.03, category);
        break;
      case "card":
        playTone(ctx, now, 330, 0.1, "triangle", 0.03, category);
        playTone(ctx, now + 0.08, 494, 0.14, "triangle", 0.03, category);
        break;
      case "leader":
        [392, 523.25, 659.25].forEach((freq, index) => playTone(ctx, now + index * 0.05, freq, 0.24, "triangle", 0.03, category));
        break;
      case "pass":
        playTone(ctx, now, 392, 0.12, "sine", 0.026, category);
        playTone(ctx, now + 0.1, 294, 0.18, "sine", 0.024, category);
        break;
      case "combo":
        [392, 523.25, 659.25, 784].forEach((freq, index) => playTone(ctx, now + index * 0.06, freq, 0.22, "triangle", 0.035, category));
        break;
      case "roundWin":
        [523.25, 659.25, 783.99].forEach((freq, index) => playTone(ctx, now + index * 0.07, freq, 0.28, "triangle", 0.035, category));
        break;
      case "roundLose":
        [440, 349.23, 261.63].forEach((freq, index) => playTone(ctx, now + index * 0.08, freq, 0.24, "sine", 0.028, category));
        break;
      case "roundTie":
        [440, 554.37].forEach((freq, index) => playTone(ctx, now + index * 0.09, freq, 0.2, "sine", 0.026, category));
        break;
      case "start":
        [329.63, 392, 523.25].forEach((freq, index) => playTone(ctx, now + index * 0.06, freq, 0.18, "triangle", 0.03, category));
        break;
      default:
        playTone(ctx, now, 523.25, 0.1, "triangle", 0.025, category);
    }
  }

  function renderSoundToggle() {
    const button = $("#sound-toggle");
    if (!button) return;
    button.textContent = `聲音：${state.soundEnabled ? "強" : "關"}`;
    button.setAttribute("aria-pressed", state.soundEnabled ? "true" : "false");
  }

  function persistSoundSettings() {
    safeStorage.set("hsiehCardGameMasterVolume", state.soundSettings.master);
    safeStorage.set("hsiehCardGameAmbientVolume", state.soundSettings.ambient);
    safeStorage.set("hsiehCardGameEffectsVolume", state.soundSettings.effects);
    safeStorage.set("hsiehCardGameStoryVolume", state.soundSettings.story);
  }

  function renderAudioSettings() {
    const mapping = {
      master: ["#audio-master-range", "#audio-master-value"],
      ambient: ["#audio-ambient-range", "#audio-ambient-value"],
      effects: ["#audio-effects-range", "#audio-effects-value"],
      story: ["#audio-story-range", "#audio-story-value"]
    };
    Object.entries(mapping).forEach(([key, [rangeId, valueId]]) => {
      const range = $(rangeId);
      const label = $(valueId);
      if (!range || !label) return;
      const percent = Math.round((state.soundSettings[key] ?? 0) * 100);
      range.value = `${percent}`;
      label.textContent = `${percent}%`;
    });
    const muteButton = $("#audio-mute-button");
    if (muteButton) muteButton.textContent = `總靜音：${state.soundEnabled ? "關" : "開"}`;
  }

  function updateSoundSetting(key, value) {
    const normalized = Math.max(0, Math.min(2, Number(value)));
    state.soundSettings[key] = normalized;
    persistSoundSettings();
    renderAudioSettings();
  }

  function resetAudioSettings() {
    state.soundSettings = { master: 1.4, ambient: 1.25, effects: 1.5, story: 1.35 };
    persistSoundSettings();
    renderAudioSettings();
    playSound("ui");
  }

  function migrateAudioSettings() {
    const version = Number.parseInt(safeStorage.get("hsiehCardGameAudioProfile") || "0", 10);
    if (version >= 4) return;
    state.soundSettings = { master: 1.4, ambient: 1.25, effects: 1.5, story: 1.35 };
    persistSoundSettings();
    safeStorage.set("hsiehCardGameAudioProfile", "4");
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
    const resolvedGain = gainAmount * currentCategoryVolume("ambient") * 3.2;
    if (resolvedGain <= 0.00015) return;
    const source = ctx.createBufferSource();
    source.buffer = getNoiseBuffer(ctx);
    source.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(520, ctx.currentTime);
    const gain = ctx.createGain();
    const now = ctx.currentTime + 0.01;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(resolvedGain, now + 0.35);
    gain.gain.linearRampToValueAtTime(resolvedGain * 0.55, now + duration * 0.6);
    gain.gain.linearRampToValueAtTime(0.0001, now + duration);
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start(now);
    source.stop(now + duration + 0.04);
  }

  function playCricketCluster(count = 3) {
    if (!state.soundEnabled || currentCategoryVolume("ambient") <= 0.001) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime + 0.02;
    for (let i = 0; i < count; i += 1) {
      const base = 2600 + Math.random() * 1200;
      playTone(ctx, now + i * 0.14, base, 0.035, "triangle", 0.0036, "ambient");
      playTone(ctx, now + i * 0.14 + 0.02, base * 1.08, 0.03, "triangle", 0.003, "ambient");
    }
  }

  function playRitualBell(style = "soft") {
    if (!state.soundEnabled || currentCategoryVolume("ambient") <= 0.001) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime + 0.02;
    const notes = style === "bright" ? [523.25, 659.25, 783.99] : [392, 523.25];
    notes.forEach((freq, index) => playTone(ctx, now + index * 0.11, freq, 0.42, "sine", style === "bright" ? 0.024 : 0.018, "ambient"));
  }

  function playTempleDrum(style = "soft") {
    if (!state.soundEnabled || currentCategoryVolume("ambient") <= 0.001) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime + 0.02;
    const hit = (start, freq, gain) => {
      playTone(ctx, start, freq, 0.22, "sine", gain, "ambient");
      playTone(ctx, start + 0.01, freq * 0.5, 0.28, "triangle", gain * 0.75, "ambient");
    };
    if (style === "procession") {
      hit(now, 110, 0.03);
      hit(now + 0.22, 92, 0.028);
      hit(now + 0.44, 82, 0.03);
    } else {
      hit(now, 96, 0.024);
      hit(now + 0.3, 82, 0.02);
    }
  }

  function playWoodClack(count = 2) {
    if (!state.soundEnabled || currentCategoryVolume("ambient") <= 0.001) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime + 0.02;
    for (let i = 0; i < count; i += 1) {
      playTone(ctx, now + i * 0.12, 1300, 0.03, "square", 0.011, "ambient");
      playTone(ctx, now + i * 0.12 + 0.01, 980, 0.04, "triangle", 0.008, "ambient");
    }
  }

  function playMetalShimmer() {
    if (!state.soundEnabled || currentCategoryVolume("ambient") <= 0.001) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime + 0.02;
    [880, 1174.66, 1318.51, 1760].forEach((freq, index) => playTone(ctx, now + index * 0.05, freq, 0.34, "triangle", 0.01, "ambient"));
  }

  function playBackgroundMotif(mode = "opening") {
    if (!state.soundEnabled || currentCategoryVolume("ambient") <= 0.001) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime + 0.02;
    const sequences = {
      opening: [261.63, 329.63, 392.0, 493.88],
      battle: [220.0, 293.66, 349.23, 440.0],
      ending: [293.66, 392.0, 493.88, 587.33]
    };
    const notes = sequences[mode] || sequences.opening;
    notes.forEach((freq, index) => {
      playTone(ctx, now + index * 0.38, freq, 0.34, index % 2 === 0 ? "triangle" : "sine", 0.0085, "ambient");
      if (mode !== "battle") playTone(ctx, now + index * 0.38 + 0.08, freq * 1.5, 0.24, "sine", 0.0042, "ambient");
    });
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
      playBackgroundMotif("opening");
      playWindGust(2.4, 0.0082);
      if (Math.random() < 0.72) playCricketCluster(2 + Math.floor(Math.random() * 3));
      if (Math.random() < 0.35) playWoodClack(2);
      if (Math.random() < 0.38) playRitualBell("soft");
    } else if (mode === "battle") {
      playBackgroundMotif("battle");
      playWindGust(1.9, 0.0072);
      if (Math.random() < 0.76) playCricketCluster(2 + Math.floor(Math.random() * 3));
      if (Math.random() < 0.28) playWoodClack(2 + Math.floor(Math.random() * 2));
      if (Math.random() < 0.22) playTempleDrum("soft");
      if (Math.random() < 0.18) playRitualBell("soft");
    } else if (mode === "ending") {
      playBackgroundMotif("ending");
      playWindGust(2.1, 0.0078);
      if (Math.random() < 0.46) playCricketCluster(2);
      playTempleDrum("procession");
      playRitualBell("bright");
      if (Math.random() < 0.7) playMetalShimmer();
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
    renderAudioSettings();
    if (state.soundEnabled) {
      unlockAudioContext();
      syncAmbientToPhase();
    } else {
      stopAmbient();
    }
  }

  function guardianDialogueTemplates() {
    return GUARDIAN_DIALOGUES[state.selectedDifficulty] || GUARDIAN_DIALOGUES.normal;
  }

  function guardianDialogueKicker(type) {
    const mapping = {
      gameStart: "守藏者開場",
      mulligan: "守藏者提醒",
      playerPlay: "守藏者評語",
      aiPlay: "守藏者應手",
      combo: "守藏者觀察",
      playerPass: "守藏者低語",
      aiPass: "守藏者低語",
      leader: "守藏者示警",
      roundWin: "本輪回應",
      roundLose: "本輪回應",
      roundTie: "本輪回應",
      finalWin: "最終回應",
      finalLose: "最終回應",
      finalTie: "最終回應"
    };
    return mapping[type] || "守藏者低語";
  }

  function guardianSpeak(type, context = {}) {
    const bank = guardianDialogueTemplates();
    let template = bank[type] || bank.gameStart || "理解地方，才會得到地方的回應。";
    if (template && typeof template === "object") {
      const cardType = context.cardType || "space";
      template = template[cardType] || template.space || Object.values(template)[0] || bank.gameStart;
    }
    let text = template;
    text = text.replaceAll("{card}", context.card || "這張牌").replaceAll("{combo}", context.combo || "這組連動");
    state.guardianSpeech = { kicker: guardianDialogueKicker(type), text };
    const kicker = $("#guardian-dialogue-kicker");
    const body = $("#guardian-dialogue-text");
    const panel = $("#guardian-dialogue-panel");
    if (!kicker || !body || !panel) return;
    kicker.textContent = state.guardianSpeech.kicker;
    body.textContent = state.guardianSpeech.text;
    panel.classList.remove("show");
    void panel.offsetWidth;
    panel.classList.add("show");
    const leader = $("#ai-leader");
    leader?.classList.remove("active-glow");
    void leader?.offsetWidth;
    leader?.classList.add("active-glow");
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

  function openingStoryboardSvg(kind = "arrival") {
    const palette = {
      arrival: { sky: "#9cc9df", panel: "#254248", accent: "#b56b47", glow: "#f3d59a" },
      layout: { sky: "#8dbbd3", panel: "#28454a", accent: "#856348", glow: "#f0d9b2" },
      craft: { sky: "#7eb3c3", panel: "#234146", accent: "#b54635", glow: "#efc77d" },
      text: { sky: "#7b99b0", panel: "#253d48", accent: "#6f533c", glow: "#e8d7b1" },
      guardian: { sky: "#5f747c", panel: "#23383d", accent: "#5f312b", glow: "#e7c88a" },
      blessing: { sky: "#7ba5ab", panel: "#274046", accent: "#7d5834", glow: "#efd79a" }
    }[kind] || { sky: "#9cc9df", panel: "#254248", accent: "#b56b47", glow: "#f3d59a" };

    const hall = (x, y, w, h, detail = false) => `
      <g transform="translate(${x} ${y})">
        <rect x="0" y="${h*0.46}" width="${w}" height="${h*0.36}" rx="8" fill="${palette.accent}" opacity=".96"/>
        <path d="M-10 ${h*0.48} L${w*0.22} ${h*0.08} L${w*0.78} ${h*0.08} L${w+10} ${h*0.48}" fill="none" stroke="#f0d59b" stroke-width="6" stroke-linecap="round"/>
        <rect x="${w*0.42}" y="${h*0.52}" width="${w*0.16}" height="${h*0.3}" fill="#f2e8d4" opacity=".95"/>
        <rect x="${w*0.12}" y="${h*0.4}" width="${w*0.13}" height="${h*0.42}" fill="#bd714f" opacity=".82"/>
        <rect x="${w*0.75}" y="${h*0.4}" width="${w*0.13}" height="${h*0.42}" fill="#bd714f" opacity=".82"/>
        ${detail ? `<circle cx="${w*0.18}" cy="${h*0.36}" r="7" fill="#f4e4ba"/><circle cx="${w*0.82}" cy="${h*0.36}" r="7" fill="#f4e4ba"/><path d="M${w*0.5} ${h*0.18} q24 -18 48 0" fill="none" stroke="#f4d08a" stroke-width="4"/>` : ""}
      </g>`;

    const person = (x, y, scale = 1, robe = "#4b2826") => `
      <g transform="translate(${x} ${y}) scale(${scale})">
        <circle cx="0" cy="0" r="18" fill="#f2d8bf"/>
        <path d="M-22 54 q22 -18 44 0 l16 70 q-38 18 -76 0 z" fill="${robe}"/>
        <path d="M-14 -8 q14 -18 28 0 v12 q-14 8 -28 0 z" fill="#241d1e"/>
        <circle cx="-6" cy="-2" r="2.2" fill="#2c2324"/><circle cx="6" cy="-2" r="2.2" fill="#2c2324"/>
        <path d="M-8 10 q8 5 16 0" fill="none" stroke="#a66d62" stroke-width="2.6" stroke-linecap="round"/>
      </g>`;

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 360" aria-hidden="true">
        <defs>
          <linearGradient id="comic-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${palette.sky}"/>
            <stop offset="100%" stop-color="#1e373c"/>
          </linearGradient>
        </defs>
        <rect width="720" height="360" rx="26" fill="url(#comic-bg)"/>
        <g fill="none" stroke="#f4dfb2" stroke-width="7" opacity=".95">
          <rect x="26" y="26" width="206" height="308" rx="20" fill="rgba(17,28,31,.18)"/>
          <rect x="258" y="26" width="206" height="308" rx="20" fill="rgba(17,28,31,.18)"/>
          <rect x="490" y="26" width="204" height="308" rx="20" fill="rgba(17,28,31,.18)"/>
        </g>
        <circle cx="620" cy="64" r="28" fill="${palette.glow}" opacity=".78"/>
        <path d="M30 278 q94 -34 188 0" fill="rgba(16,32,35,.64)"/>
        <path d="M262 278 q94 -34 188 0" fill="rgba(16,32,35,.64)"/>
        <path d="M494 278 q94 -34 188 0" fill="rgba(16,32,35,.64)"/>
        ${hall(58, 92, 144, 140, kind === "craft" || kind === "text")}
        ${hall(290, 96, 142, 136, kind === "layout")}
        ${hall(522, 96, 138, 132, kind === "guardian" || kind === "text")}
        ${kind === "arrival" ? `<path d="M82 254 q42 -30 84 0" fill="none" stroke="#d1b07a" stroke-width="4" stroke-dasharray="8 8"/>${person(160, 220, 1, '#5a4335')}` : ""}
        ${kind === "layout" ? `<path d="M330 246 h70" stroke="#f0ddb0" stroke-width="5"/><path d="M365 212 v72" stroke="#f0ddb0" stroke-width="5"/><circle cx="366" cy="246" r="9" fill="#f0ddb0"/>` : ""}
        ${kind === "craft" ? `<circle cx="326" cy="146" r="10" fill="#f4dfb2"/><circle cx="394" cy="146" r="10" fill="#f4dfb2"/><path d="M546 98 q22 -18 44 0" fill="none" stroke="#f0d59b" stroke-width="6"/>` : ""}
        ${kind === "text" ? `<rect x="302" y="144" width="118" height="34" rx="8" fill="rgba(240,223,178,.18)" stroke="#f4dfb2" stroke-width="3"/><rect x="534" y="144" width="110" height="34" rx="8" fill="rgba(240,223,178,.18)" stroke="#f4dfb2" stroke-width="3"/>` : ""}
        ${kind === "guardian" ? `${person(592, 214, 1.05, '#4a2522')}<rect x="540" y="218" width="52" height="72" rx="6" fill="#ead8b0" stroke="#b08f53" stroke-width="4" transform="rotate(-10 540 218)"/>` : `${person(360, 226, .96, '#5a4335')}`}
      </svg>`;
  }

  function renderOpeningStoryboard(scene) {
    const frame = $("#opening-storyboard");
    const caption = $("#opening-storyboard-caption");
    if (frame) frame.innerHTML = openingStoryboardSvg(scene.illustration);
    if (caption) caption.textContent = scene.storyboardCaption || scene.note || "";
  }

  function updateEndingCeremony(result) {
    const seal = $("#ending-ceremony-seal");
    const ribbon = $("#ending-ceremony-ribbon");
    const stage = $("#ending-ceremony-stage");
    if (!seal || !ribbon || !stage) return;
    stage.classList.remove("victory", "defeat", "tie");
    if (result === "player") {
      seal.textContent = "深護";
      ribbon.textContent = "燈影沉了一下，接著更穩了。";
      stage.classList.add("victory");
    } else if (result === "ai") {
      seal.textContent = "餘光";
      ribbon.textContent = "牌局收住了，堂前仍留著一點亮。";
      stage.classList.add("defeat");
    } else {
      seal.textContent = "相持";
      ribbon.textContent = "雙方都沒有退，風也暫時停在簷下。";
      stage.classList.add("tie");
    }
  }

  function mountGuardianPortraits() {
    const openingPortrait = $("#opening-guardian-portrait");
    if (openingPortrait) openingPortrait.innerHTML = guardianPortraitSvg("default");
    const endingPortrait = $("#ending-guardian-portrait");
    if (endingPortrait) endingPortrait.innerHTML = guardianPortraitSvg("default");
  }

  function applyGameFontSize(size = state.fontSize) {
    state.fontSize = ["small", "medium", "large"].includes(size) ? size : "medium";
    document.documentElement.dataset.fontSize = state.fontSize;
    const fallback = { small: 1.00, medium: 1.16, large: 1.42 };
    if (window.HsiehFontCalibration?.setPreset) window.HsiehFontCalibration.setPreset(state.fontSize);
    else document.documentElement.style.setProperty("--user-font-scale", String(fallback[state.fontSize]));
    const labels = { small: "小", medium: "中", large: "大" };
    const button = $("#font-size-button"); if (button) button.textContent = `字級：${labels[state.fontSize]}`;
    const select = $("#opening-font-size-select"); if (select) select.value = state.fontSize;
    window.HsiehLayoutCalibration?.recalibrate?.("font-preset");
  }

  function cycleGameFontSize() {
    const order = ["small", "medium", "large"];
    applyGameFontSize(order[(order.indexOf(state.fontSize) + 1) % order.length]);
  }

  function setAnimationRate(value) {
    const parsed = Number(value);
    state.animationRate = [0.25, 0.5, 1, 1.5, 2].includes(parsed) ? parsed : 1;
    safeStorage.set("hsiehAnimationRate", state.animationRate);
    document.documentElement.style.setProperty("--animation-time-scale", String(1 / state.animationRate));
    const select = $("#opening-speed-select"); if (select) select.value = String(state.animationRate);
    if (state.phase === "opening") scheduleOpeningAdvance();
  }

  function openingDelay() { return Math.max(3200, 12000 / state.animationRate); }

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
    const profile = getDifficultyProfile();
    $("#opening-slide-counter").textContent = `${String(state.opening.index + 1).padStart(2, "0")} / ${String(OPENING_SCENES.length).padStart(2, "0")}`;
    if ($("#opening-difficulty-tone")) $("#opening-difficulty-tone").textContent = `難度：${DATA.difficultyLabels[state.selectedDifficulty]}`;
    $("#opening-scene-kicker").textContent = scene.kicker;
    $("#opening-title").textContent = scene.title;
    $("#opening-scene-body").textContent = scene.body;
    $("#opening-scene-note").textContent = scene.note;
    renderOpeningStoryboard(scene);
    $("#opening-scene-tags").innerHTML = scene.tags.map((tag) => `<span>${tag}</span>`).join("");
    $("#opening-guardian-caption").textContent = `${scene.caption}｜${profile.guardianCaption}`;
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
    if (state.opening.index >= OPENING_SCENES.length - 1) {
      state.opening.timer = setTimeout(finishOpeningAndStart, openingDelay());
      return;
    }
    state.opening.timer = setTimeout(() => advanceOpeningScene(1, true), openingDelay());
  }

  function openOpeningIntro() {
    state.phase = "opening";
    state.opening.index = 0;
    $("#opening-overlay")?.classList.remove("hidden");
    renderOpeningScene();
    guardianSpeak("gameStart");
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
    const profile = getDifficultyProfile();
    if (result === "player") {
      return {
        overlayClass: "show-victory",
        kicker: "牌局回響",
        sceneKicker: "深層庇護",
        title: "簷下的光穩了，地方也把回應留給了你",
        body: `牌局收住時，堂前沒有太多聲音。只是那些原本分散的線索，像終於在你手裡接上了。守藏者沒有多說，地方也沒有張揚；可有些庇護，已經比剛來時更深。${profile.endingToneWin}`,
        note: "有些認可，不會立刻說出口。",
        tags: ["更多庇護", "理解更深", "守藏者認可"],
        caption: `守藏者領主・予以深護｜${profile.openingTone}`,
        portraitTheme: "victory"
      };
    }
    if (result === "ai") {
      return {
        overlayClass: "show-defeat",
        kicker: "牌局回響",
        sceneKicker: "基本庇護",
        title: "這一局收得較早，堂前仍替你留了一點亮",
        body: `勝負停在這裡，風也停了一會兒。你還沒把所有線索接起來，但門沒有因此關上。桌上的牌已經收回去，堂前那點光卻還在，像是替下次來時先留了位置。${profile.endingToneLose}`,
        note: "有些路要走第二次，才知道第一次看漏了什麼。",
        tags: ["基本庇護", "仍可再訪", "學習未止"],
        caption: `守藏者領主・留其再學｜${profile.openingTone}`,
        portraitTheme: "defeat"
      };
    }
    return {
      overlayClass: "show-tie",
      kicker: "牌局回響",
      sceneKicker: "穩定庇護",
      title: "你與守藏者停在同一段簷下，回應因此慢慢落定",
      body: `這一局沒有明顯偏向誰。你看見的，守藏者也看見了；你還沒全懂的，他也沒有替你補完。牌局停在一個恰好的地方，像在告訴你：再往前一步，風景還會變。${profile.endingToneTie}`,
      note: "有時候，平手只是另一種還沒說完。",
      tags: ["穩定庇護", "平分秋色", "可再深入"],
      caption: `守藏者領主・審慎相待｜${profile.openingTone}`,
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
    updateEndingCeremony(result);
    overlay.classList.remove("hidden");
    const frame = $("#ending-scene-frame");
    frame.classList.remove("scene-refresh");
    void frame.offsetWidth;
    frame.classList.add("scene-refresh");
    guardianSpeak(result === "player" ? "finalWin" : result === "ai" ? "finalLose" : "finalTie");
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
        return hasCard(board, "rootSource") || hasCard(board, "ancestralTablets") ? 3 : 0;
      case "leftWing":
        return hasCard(board, "rightWing") ? 3 : 0;
      case "rightWing":
        return hasCard(board, "leftWing") ? 3 : 0;
      case "huatai":
        return hasCard(board, "fiveElements") || hasCard(board, "landDragon") ? 4 : 0;
      case "study":
        return hasCard(board, "leftWing") || hasCard(board, "rightWing") ? 3 : 0;
      case "ritualHall":
        return Math.min(3, countType(board, "text"));
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
        return ROW_ORDER.every((row) => board[row].length > 0) ? 5 : 0;
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
    guardianSpeak("combo", { combo: item.combo.name });
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
    const target = /zhuyin/i.test(window.location.pathname) ? "index-zhuyin.html" : "index.html";
    window.location.href = target;
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
    state.selectedHandCardUid = null;
    state.lastHandClick = { uid: null, time: 0 };
    clearTimeout(showToast.timer);
    $("#culture-toast")?.classList.remove("show");

    hideTransientLayers();
    drawCards("player", 10);
    drawCards("ai", 10);

    $("#start-screen")?.classList.add("hidden");
    $("#game-screen")?.classList.remove("hidden");
    updateDifficultyBadge();
    renderSoundToggle();
    renderAudioSettings();
    startAmbient("battle");
    guardianSpeak("mulligan");
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
    guardianSpeak(mode === "initial" ? "mulligan" : "gameStart");
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
    return card.power + synergy * 1.15;
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
    if (side === "player") {
      state.selectedHandCardUid = null;
      state.lastHandClick = { uid: null, time: 0 };
    }
    actor.board[card.type].push(card);
    const after = evaluateBoard(side);
    const gained = after.total - before.total;

    addLog(`${SIDE_LABEL[side]}打出「${card.name}」，場面增加 ${gained} 點。`, side);
    guardianSpeak(side === "player" ? "playerPlay" : "aiPlay", { card: card.name, cardType: card.type });
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
    guardianSpeak("leader", { card: leader.abilityName });
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
    guardianSpeak(side === "player" ? "playerPass" : "aiPass");
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
          const resourceCost = card.power * 0.22;
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
          const aCost = a.card.power - a.outcome.progressGain * 0.25;
          const bCost = b.card.power - b.outcome.progressGain * 0.25;
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
    guardianSpeak(result.winner === "player" ? "roundWin" : result.winner === "ai" ? "roundLose" : "roundTie");
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

    const textPlaque = (char, extra = "") => {
      const plaqueFontSize = char.length > 14 ? 11 : char.length > 9 ? 14 : char.length > 5 ? 20 : 34;
      return template(`
        <rect x="54" y="26" width="112" height="74" rx="8" fill="#5a351f" stroke="#dcb870" stroke-width="4" filter="url(#shadow)"/>
        <rect x="64" y="36" width="92" height="54" rx="4" fill="#f5edd7" opacity="0.95"/>
        <text x="110" y="73" text-anchor="middle" font-size="${plaqueFontSize}" font-weight="700" fill="#432714">${char}</text>
        ${extra}
      `);
    };

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
    const visualViewport = window.visualViewport;
    const viewportLeft = visualViewport?.offsetLeft || 0;
    const viewportTop = visualViewport?.offsetTop || 0;
    const viewportWidth = visualViewport?.width || document.documentElement.clientWidth;
    const viewportHeight = visualViewport?.height || document.documentElement.clientHeight;

    tooltip.style.left = "0px";
    tooltip.style.top = "0px";
    tooltip.classList.add("measuring");
    const tooltipRect = tooltip.getBoundingClientRect();
    tooltip.classList.remove("measuring");

    let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
    left = Math.max(viewportLeft + margin, Math.min(left, viewportLeft + viewportWidth - tooltipRect.width - margin));

    let top = rect.top - tooltipRect.height - 10;
    let placement = "above";
    if (top < viewportTop + margin) {
      top = rect.bottom + 10;
      placement = "below";
    }
    if (top + tooltipRect.height > viewportTop + viewportHeight - margin) {
      top = Math.max(viewportTop + margin, viewportTop + viewportHeight - tooltipRect.height - margin);
    }

    tooltip.style.left = `${Math.round(left)}px`;
    tooltip.style.top = `${Math.round(top)}px`;
    const arrowX = Math.max(18, Math.min(tooltipRect.width - 18, rect.left + rect.width / 2 - left));
    tooltip.style.setProperty("--tooltip-arrow-x", `${Math.round(arrowX)}px`);
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
    // Position immediately so the first card never inherits the previous card's arrow.
    positionCardEffectTooltip(cardElement);
    requestAnimationFrame(() => positionCardEffectTooltip(cardElement));
    requestAnimationFrame(() => requestAnimationFrame(() => positionCardEffectTooltip(cardElement)));
  }

  function hideCardEffectTooltip() {
    if (!cardEffectTooltip) return;
    cardEffectTooltip.classList.remove("show");
    cardEffectTooltip.setAttribute("aria-hidden", "true");
  }

  function renderSelectedCardEffect(card = null) {
    const panel = $("#selected-card-effect-panel");
    const title = $("#selected-card-effect-title");
    const text = $("#selected-card-effect-text");
    const playButton = $("#play-selected-card");
    if (!panel || !title || !text) return;
    panel.classList.toggle("has-card", Boolean(card));
    const playable = Boolean(card) && state.phase === "playing" && state.turn === "player" && !state.player?.passed;
    if (!card) {
      title.textContent = "";
      text.textContent = "請先點一下手牌查看效果；快速點兩下同一張牌即可出牌。";
      if (playButton) {
        playButton.disabled = true;
        playButton.removeAttribute("data-card-uid");
      }
      return;
    }
    title.textContent = `${card.name}｜${DATA.rows[card.type]?.label || "卡牌"}｜力量 ${card.power}`;
    text.textContent = card.effectText;
    if (playButton) {
      playButton.disabled = !playable;
      playButton.dataset.cardUid = card.uid;
    }
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
    el.setAttribute("aria-label", `${card.name}，${row.label}，力量 ${effective}。文化標記：${card.rarity}，不影響力量。遊戲效果：${card.effectText}`);

    el.innerHTML = `
      <span class="card-power ${bonus > 0 ? "boosted" : ""}">${effective}</span>
      <span class="card-rarity" title="文化標記：${DATA.rarityDefinitions?.[card.rarity] || card.rarity} 不影響力量或勝負">文化標記｜${card.rarity}</span>
      <span class="card-art" role="img" aria-label="${card.name}插圖">${artSvg}</span>
      <span class="card-type">${row.icon} ${row.label}</span>
      <strong class="card-name">${card.name}</strong>
      ${bonus > 0 ? `<span class="card-bonus">基礎 ${card.power} ＋連動 ${bonus}</span>` : ""}
    `;

    el.addEventListener("pointerenter", () => showCardEffectTooltip(el, card, powerInfo));
    el.addEventListener("pointermove", () => positionCardEffectTooltip(el));
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
      el.classList.toggle("hand-selected", state.selectedHandCardUid === card.uid);
      el.addEventListener("click", () => {
        const playable = state.phase === "playing" && state.turn === "player" && !state.player.passed;
        if (!playable) return;
        const now = performance.now();
        const fastSecondClick = state.lastHandClick.uid === card.uid && now - state.lastHandClick.time <= 450;
        if (fastSecondClick) {
          state.selectedHandCardUid = null;
          state.lastHandClick = { uid: null, time: 0 };
          playCard("player", card.uid);
          return;
        }
        state.lastHandClick = { uid: card.uid, time: now };
        state.selectedHandCardUid = state.selectedHandCardUid === card.uid ? null : card.uid;
        document.querySelectorAll("#player-hand .game-card").forEach((item) => {
          item.classList.toggle("hand-selected", item.dataset.uid === state.selectedHandCardUid);
        });
        renderSelectedCardEffect(state.selectedHandCardUid === card.uid ? card : null);
      });
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
    const selectedCard = state.player.hand.find((card) => card.uid === state.selectedHandCardUid) || null;
    renderSelectedCardEffect(selectedCard);
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
    $("#card-detail-type").textContent = `${row.icon} ${row.label}｜文化標記：${card.rarity}`;
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

    $("#opening-speed-select")?.addEventListener("change", (event) => setAnimationRate(event.target.value));
    $("#opening-font-size-select")?.addEventListener("change", (event) => applyGameFontSize(event.target.value));
    $("#font-size-button")?.addEventListener("click", cycleGameFontSize);
    $("#audio-unlock-button")?.addEventListener("click", () => {
      setSoundEnabled(true);
      unlockAudioContext();
      playSound("combo");
      $("#audio-unlock-button").textContent = "聲音已啟用";
      $("#audio-unlock-button").disabled = true;
      startAmbient("opening");
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
    $("#play-selected-card")?.addEventListener("click", () => {
      const cardUid = state.selectedHandCardUid || $("#play-selected-card")?.dataset.cardUid;
      if (cardUid) playCard("player", cardUid);
    });
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
    $("#audio-settings-button")?.addEventListener("click", () => { playSound("ui"); renderAudioSettings(); openModal("#audio-modal"); });
    $("#start-rules")?.addEventListener("click", () => openModal("#rules-modal"));
    $("#tutorial-button")?.addEventListener("click", () => openTutorial());
    $("#game-tutorial")?.addEventListener("click", () => openTutorial());
    $("#open-guided-tutorial")?.addEventListener("click", () => {
      closeModal("#rules-modal");
      openTutorial();
    });

    $("#audio-master-range")?.addEventListener("input", (event) => updateSoundSetting("master", event.target.value / 100));
    $("#audio-ambient-range")?.addEventListener("input", (event) => updateSoundSetting("ambient", event.target.value / 100));
    $("#audio-effects-range")?.addEventListener("input", (event) => updateSoundSetting("effects", event.target.value / 100));
    $("#audio-story-range")?.addEventListener("input", (event) => updateSoundSetting("story", event.target.value / 100));
    $("#audio-reset-button")?.addEventListener("click", resetAudioSettings);
    $("#audio-mute-button")?.addEventListener("click", () => { setSoundEnabled(!state.soundEnabled); playSound("ui"); });

    $("#restart-button")?.addEventListener("click", () => { playSound("ui"); restartCurrentGame(); });
    $("#end-game-button")?.addEventListener("click", () => {
      playSound("ui");
      openModal("#end-game-modal");
    });
    $("#game-over-end")?.addEventListener("click", () => {
      playSound("ui");
      closeModal("#game-over-modal");
      openModal("#end-game-modal");
    });
    $("#end-game-cancel")?.addEventListener("click", () => {
      playSound("ui");
      closeModal("#end-game-modal");
    });
    $("#end-game-confirm")?.addEventListener("click", () => {
      playSound("ui");
      closeModal("#end-game-modal");
      goHome();
    });
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
        ["#rules-modal", "#sources-modal", "#audio-modal", "#card-detail-modal"].forEach((id) => closeModal(id));
        if (!$("#tutorial-modal")?.classList.contains("hidden")) closeTutorial(true);
      }
    });
  }


  let viewportUpdateFrame = 0;

  function applyViewportProfile() {
    cancelAnimationFrame(viewportUpdateFrame);
    viewportUpdateFrame = requestAnimationFrame(() => {
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
      const referenceWidth = mobile ? (orientation === "portrait" ? 390 : 844) : 1440;
      const referenceHeight = mobile ? (orientation === "portrait" ? 844 : 390) : 900;
      const scale = Math.max(mobile ? 0.72 : 0.64, Math.min(1.18, Math.min(width / referenceWidth, height / referenceHeight)));
      const root = document.documentElement;
      root.style.setProperty("--app-viewport-width", `${width}px`);
      root.style.setProperty("--app-viewport-height", `${height}px`);
      root.style.setProperty("--app-screen-width", `${screenWidth}px`);
      root.style.setProperty("--app-screen-height", `${screenHeight}px`);
      root.style.setProperty("--app-screen-aspect-ratio", screenRatio.toFixed(4));
      root.style.setProperty("--app-aspect-ratio", ratio.toFixed(4));
      root.style.setProperty("--app-ui-scale", scale.toFixed(4));
      const topbarHeight = Math.ceil(document.querySelector(".topbar")?.getBoundingClientRect().height || 0);
      if (topbarHeight > 0) root.style.setProperty("--battle-topbar-height", `${topbarHeight}px`);
      root.dataset.deviceProfile = profile;
      root.dataset.orientation = orientation;
      root.dataset.screenOrientation = screenWidth >= screenHeight ? "landscape" : "portrait";
      document.body.dataset.deviceProfile = profile;
      document.body.dataset.orientation = orientation;
      document.body.dataset.compactHeight = height < 700 ? "true" : "false";
    });
  }

  function setupViewportAdaptation() {
    applyViewportProfile();
    window.addEventListener("resize", applyViewportProfile, { passive: true });
    window.addEventListener("orientationchange", applyViewportProfile, { passive: true });
    window.visualViewport?.addEventListener("resize", applyViewportProfile, { passive: true });
    window.visualViewport?.addEventListener("scroll", applyViewportProfile, { passive: true });
  }

  function init() {
    if (state.initialized) return;
    state.initialized = true;
    setupViewportAdaptation();
    migrateAudioSettings();
    setupEvents();
    applyGameFontSize(state.fontSize);
    setAnimationRate(state.animationRate);
    mountGuardianPortraits();
    renderComboRuleList();
    renderStats();
    renderSoundToggle();
    renderAudioSettings();
    guardianSpeak("gameStart");
    document.addEventListener("pointerdown", () => { unlockAudioContext(); syncAmbientToPhase(); }, { once: true });
    document.addEventListener("keydown", () => { unlockAudioContext(); syncAmbientToPhase(); }, { once: true });

    const params = new URLSearchParams(window.location.search);
    const leader = DATA.leaders[params.get("leader")] ? params.get("leader") : "xieAn";
    const difficulty = ["easy", "normal", "hard"].includes(params.get("difficulty"))
      ? params.get("difficulty")
      : "normal";
    state.selectedLeaderId = leader;
    state.selectedDifficulty = difficulty;
    if (params.get("mode") === "learn") {
      state.phase = "learning";
      clearOpeningTimer();
      stopAmbient();
      $("#opening-overlay")?.classList.add("hidden");
      $("#game-screen")?.classList.add("hidden");
      return;
    }
    const languageSwitch = $("#language-switch");
    if (languageSwitch) languageSwitch.href = `battle-en.html?leader=${encodeURIComponent(leader)}&difficulty=${encodeURIComponent(difficulty)}`;
    openOpeningIntro();
  }

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
