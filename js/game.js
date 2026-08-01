/* 謝氏宗祠文化卡牌遊戲 - 遊戲主程式 */
(() => {
  "use strict";

  const DATA = window.GAME_DATA;
  const ROW_ORDER = ["text", "decoration", "space"];
  const SIDE_LABEL = { player: "你", ai: "守藏者" };
  const RARITY_WEIGHT = { "常見": 1, "珍稀": 2, "史詩": 3, "傳說": 4 };
  const CARD_ART_CACHE = new Map();

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
    comboAnimating: false
  };

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
    combos.forEach((combo) => state.comboAnimationQueue.push({ combo, side }));
    if (!state.comboAnimating) {
      void playNextComboAnimation();
    }
  }

  async function playNextComboAnimation() {
    const burst = $("#combo-burst");
    if (!state.comboAnimationQueue.length) {
      state.comboAnimating = false;
      burst.classList.add("hidden");
      return;
    }
    state.comboAnimating = true;
    const item = state.comboAnimationQueue.shift();
    $("#combo-burst-side").textContent = `${SIDE_LABEL[item.side]}觸發組合技`;
    $("#combo-burst-title").textContent = item.combo.name;
    $("#combo-burst-points").textContent = `+${item.combo.points}`;
    burst.classList.remove("hidden");
    burst.classList.remove("bursting");
    void burst.offsetWidth;
    burst.classList.add("bursting");
    await wait(1600);
    burst.classList.remove("bursting");
    burst.classList.add("hidden");
    await wait(120);
    void playNextComboAnimation();
  }

  function loadStats() {
    try {
      return JSON.parse(localStorage.getItem("hsiehCardGameStats")) || { wins: 0, losses: 0, draws: 0 };
    } catch {
      return { wins: 0, losses: 0, draws: 0 };
    }
  }

  function saveStats(stats) {
    localStorage.setItem("hsiehCardGameStats", JSON.stringify(stats));
  }

  function renderStats() {
    const stats = loadStats();
    $("#lifetime-stats").textContent = `累計：${stats.wins} 勝／${stats.losses} 敗／${stats.draws} 和`;
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

  function showStartScreen() {
    ["#game-over-modal", "#round-result-modal", "#rules-modal", "#sources-modal", "#card-detail-modal", "#tutorial-modal", "#mulligan-overlay"].forEach((id) => $(id).classList.add("hidden"));
    $("#game-screen").classList.add("hidden");
    $("#start-screen").classList.remove("hidden");
    state.phase = "start";
    renderStats();
  }

  function goHome() {
    showStartScreen();
  }

  function startGame() {
    state.selectedDifficulty = getDifficulty();
    const aiLeaderId = state.selectedLeaderId === "xieAn" ? "xieXuan" : "xieAn";
    state.player = makeSide("player", state.selectedLeaderId);
    state.ai = makeSide("ai", aiLeaderId);
    state.round = 1;
    state.turn = "player";
    state.nextStarter = "player";
    state.logs = [];
    state.pendingRound = null;
    state.gameRecorded = false;
    state.aiThinking = false;
    state.comboAnimationQueue = [];
    state.comboAnimating = false;

    ["#game-over-modal", "#round-result-modal", "#rules-modal", "#sources-modal", "#card-detail-modal", "#tutorial-modal", "#mulligan-overlay"].forEach((id) => $(id).classList.add("hidden"));

    drawCards("player", 10);
    drawCards("ai", 10);

    $("#start-screen").classList.add("hidden");
    $("#game-screen").classList.remove("hidden");
    updateDifficultyBadge();
    addLog(`雙方各抽取 10 張起始手牌；本場難度為${DATA.difficultyLabels[state.selectedDifficulty]}。`);

    const shouldShowTutorial = $("#auto-tutorial").checked || !localStorage.getItem("hsiehCardGameTutorialSeen");
    renderGame();

    if (shouldShowTutorial) {
      openTutorial(() => {
        localStorage.setItem("hsiehCardGameTutorialSeen", "1");
        showMulligan(3, "initial");
      });
    } else {
      showMulligan(3, "initial");
    }
  }

  function restartCurrentGame() {
    if (state.phase === "start") return;
    startGame();
  }

  function showMulligan(max, mode) {
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
    if (state.aiThinking || state.phase !== "playing" || state.turn !== "ai" || state.ai.passed) return;
    state.aiThinking = true;
    renderGame();
    await wait(620 + Math.floor(Math.random() * 420));

    if (state.phase !== "playing" || state.turn !== "ai" || state.ai.passed) {
      state.aiThinking = false;
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
      ? "你成功在人物、空間、裝飾與文字之間建立更完整的文化連結。"
      : result === "ai"
        ? "試著重新安排換牌、PASS 時機與大型組合技節奏，再挑戰一次。"
        : "雙方在宗祠文化配置上的理解勢均力敵。";

    $("#game-over-title").textContent = title;
    $("#game-over-score").textContent = `${state.player.roundWins} ： ${state.ai.roundWins}`;
    $("#game-over-detail").textContent = detail;
    $("#game-over-modal").classList.remove("hidden");
    renderStats();
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140">
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
      const uri = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
      CARD_ART_CACHE.set(card.id, uri);
      return uri;
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

  function createCardElement(card, side, location, evaluation = null) {
    const el = document.createElement("button");
    const row = DATA.rows[card.type];
    const powerInfo = evaluation?.cardPowers?.get(card.uid);
    const effective = powerInfo ? powerInfo.effective : card.power;
    const bonus = powerInfo ? powerInfo.bonus : 0;
    const artUri = createCardArtSvg(card);

    el.type = "button";
    el.className = `game-card card-${card.type} rarity-${card.rarity} location-${location}`;
    el.dataset.uid = card.uid;
    el.setAttribute("aria-label", `${card.name}，${row.label}，力量 ${effective}`);

    el.innerHTML = `
      <span class="card-power ${bonus > 0 ? "boosted" : ""}">${effective}</span>
      <span class="card-rarity">${card.rarity}</span>
      <span class="card-art" aria-hidden="true">
        <img class="card-illustration" src="${artUri}" alt="${card.name}插圖">
      </span>
      <span class="card-type">${row.icon} ${row.label}</span>
      <strong class="card-name">${card.name}</strong>
      <span class="card-effect">${card.effectText}</span>
      ${bonus > 0 ? `<span class="card-bonus">基礎 ${card.power} ＋連動 ${bonus}</span>` : ""}
    `;

    el.addEventListener("contextmenu", (event) => {
      event.preventDefault();
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
      el.disabled = !playable;
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
    $(id).classList.remove("hidden");
  }

  function closeModal(id) {
    $(id).classList.add("hidden");
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
    $("#tutorial-modal").classList.add("hidden");
    const callback = state.tutorial.afterClose;
    state.tutorial.afterClose = null;
    if (runCallback && typeof callback === "function") callback();
  }

  function setupEvents() {
    $$(".leader-choice").forEach((button) => {
      button.addEventListener("click", () => selectLeader(button.dataset.leader));
    });

    $("#brand-home").addEventListener("click", (event) => {
      event.preventDefault();
      goHome();
    });

    $("#start-game").addEventListener("click", startGame);
    $("#mulligan-confirm").addEventListener("click", confirmMulligan);
    $("#pass-action").addEventListener("click", () => pass("player"));
    $("#leader-action").addEventListener("click", () => useLeader("player"));
    $("#round-result-continue").addEventListener("click", continueAfterRound);
    $("#play-again").addEventListener("click", () => {
      $("#game-over-modal").classList.add("hidden");
      startGame();
    });
    $("#return-home").addEventListener("click", goHome);

    $("#rules-button").addEventListener("click", () => openModal("#rules-modal"));
    $("#sources-button").addEventListener("click", () => openModal("#sources-modal"));
    $("#start-rules").addEventListener("click", () => openModal("#rules-modal"));
    $("#tutorial-button").addEventListener("click", () => openTutorial());
    $("#game-tutorial").addEventListener("click", () => openTutorial());

    $("#restart-button").addEventListener("click", () => {
      if (state.phase === "start") return;
      restartCurrentGame();
    });
    $("#game-restart").addEventListener("click", restartCurrentGame);
    $("#game-home").addEventListener("click", goHome);

    $("#tutorial-prev").addEventListener("click", () => {
      if (state.tutorial.step > 0) state.tutorial.step -= 1;
      renderTutorialStep();
    });
    $("#tutorial-next").addEventListener("click", () => {
      if (state.tutorial.step < DATA.tutorialSteps.length - 1) {
        state.tutorial.step += 1;
        renderTutorialStep();
      } else {
        closeTutorial(true);
      }
    });
    $("#tutorial-skip").addEventListener("click", () => closeTutorial(true));
    $("#tutorial-close").addEventListener("click", () => closeTutorial(true));

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

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        ["#rules-modal", "#sources-modal", "#card-detail-modal"].forEach((id) => closeModal(id));
        if (!$("#tutorial-modal").classList.contains("hidden")) closeTutorial(true);
      }
    });
  }

  function init() {
    setupEvents();
    renderComboRuleList();
    selectLeader("xieAn");
    renderStats();
  }

  window.addEventListener("DOMContentLoaded", init);
})();
