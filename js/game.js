/* 謝氏宗祠文化卡牌遊戲 - 遊戲主程式 */
(() => {
  "use strict";

  const DATA = window.GAME_DATA;
  const ROW_ORDER = ["text", "decoration", "space"];
  const SIDE_LABEL = { player: "你", ai: "守藏者" };

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
    player: null,
    ai: null,
    round: 1,
    turn: "player",
    nextStarter: "player",
    logs: [],
    mulligan: null,
    pendingRound: null,
    gameRecorded: false,
    aiThinking: false
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

    if (["frontHall", "rearHall", "leftWing", "rightWing"].every((id) => hasCard(board, id))) {
      combos.push({
        id: "two-halls-two-wings",
        name: "二堂二橫",
        row: "space",
        points: 8,
        description: "前堂、後堂與左右橫屋共同構成完整格局。"
      });
    }

    if (["gatehouse", "forecourt", "frontHall", "courtyard", "rearHall"].every((id) => hasCard(board, id))) {
      combos.push({
        id: "central-axis",
        name: "中軸成序",
        row: "space",
        points: 6,
        description: "由門樓、禾埕、前堂、天井至後堂形成清楚的空間秩序。"
      });
    }

    if (["huatai", "fiveElements", "landDragon"].every((id) => hasCard(board, id))) {
      combos.push({
        id: "five-elements-guard",
        name: "五行護脈",
        row: "decoration",
        points: 5,
        description: "化胎、五行石與土地龍神形成後場象徵組合。"
      });
    }

    if (["rearHall", "rootSource", "ancestralTablets"].every((id) => hasCard(board, id))) {
      combos.push({
        id: "ritual-order",
        name: "禮序成章",
        row: "text",
        points: 5,
        description: "後堂、門額與祖牌共同呈現祭祀及世系秩序。"
      });
    }

    if (["maleLamp", "femaleLamp"].every((id) => hasCard(board, id))) {
      combos.push({
        id: "paired-lamps",
        name: "燈火成雙",
        row: "decoration",
        points: 3,
        description: "男燈與女燈共同連結婚嫁禮俗記憶。"
      });
    }

    if (["sterculiaTree", "baoshutang"].every((id) => hasCard(board, id))) {
      combos.push({
        id: "treasure-tree",
        name: "寶樹相映",
        row: "text",
        points: 3,
        description: "蘋婆樹的生活記憶與「寶樹堂」堂號相互呼應。"
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

  function showToast(title, text, duration = 3600) {
    const toast = $("#culture-toast");
    $("#culture-toast-title").textContent = title;
    $("#culture-toast-text").textContent = text;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), duration);
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

  function startGame() {
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

    drawCards("player", 10);
    drawCards("ai", 10);

    $("#start-screen").classList.add("hidden");
    $("#game-screen").classList.remove("hidden");
    addLog("雙方各抽取 10 張起始手牌，可進行換牌。");
    showMulligan(3, "initial");
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

  function chooseAiMulligans(max) {
    const actor = state.ai;
    return [...actor.hand]
      .sort((a, b) => {
        const rarityWeight = { "傳說": 4, "史詩": 3, "珍稀": 2, "常見": 1 };
        const aScore = a.power + rarityWeight[a.rarity] * 0.25 + Math.random();
        const bScore = b.power + rarityWeight[b.rarity] * 0.25 + Math.random();
        return aScore - bScore;
      })
      .slice(0, max)
      .filter((card) => card.power <= 5)
      .map((card) => card.uid);
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
      showToast(card.name, card.culturalNote);
    }

    const beforeCombos = new Set(before.combos.map((combo) => combo.id));
    after.combos
      .filter((combo) => !beforeCombos.has(combo.id))
      .forEach((combo) => addLog(`${SIDE_LABEL[side]}完成「${combo.name}」連結，額外 +${combo.points}。`, side));

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
    addLog(`${SIDE_LABEL[side]}選擇 Pass，本輪不能再出牌。`, side);
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
      addLog(`${SIDE_LABEL[side]}已無可執行動作，自動 Pass。`, side);
    }

    if (state.player.passed && state.ai.passed) {
      renderGame();
      void endRound();
      return;
    }

    if (opponent.passed) {
      state.turn = side;
    } else if (actor.passed) {
      state.turn = opponentSide;
    } else {
      state.turn = opponentSide;
    }

    renderGame();

    if (state.turn === "ai" && !state.ai.passed) scheduleAiTurn();
  }

  function simulateCardDelta(side, card) {
    const actor = sideState(side);
    const board = {
      space: [...actor.board.space],
      decoration: [...actor.board.decoration],
      text: [...actor.board.text]
    };
    const before = evaluateBoard(side).total;
    board[card.type].push(card);
    const after = evaluateBoard(side, board, actor.roundBoosts).total;
    return after - before;
  }

  function aiShouldUseLeader() {
    if (!canUseLeader("ai")) return false;
    const leader = DATA.leaders[state.ai.leaderId];
    const aiScore = evaluateBoard("ai").total;
    const playerScore = evaluateBoard("player").total;
    const diff = aiScore - playerScore;

    if (leader.id === "xieXuan") return diff <= -6;
    const occupiedRows = ROW_ORDER.filter((row) => state.ai.board[row].length > 0).length;
    return occupiedRows >= 2 && (state.round >= 2 || state.ai.hand.length <= 5);
  }

  function aiShouldPass() {
    const aiScore = evaluateBoard("ai").total;
    const playerScore = evaluateBoard("player").total;
    const diff = aiScore - playerScore;
    const aiHand = state.ai.hand.length;
    const playerHand = state.player.hand.length;

    if (state.player.passed) return diff > 0;
    if (aiHand === 0 && state.ai.leaderUsed) return true;

    if (diff >= 12 && aiHand <= playerHand) {
      return Math.random() < 0.65;
    }

    if (diff > 0 && aiHand + 1 < playerHand) {
      return Math.random() < 0.7;
    }

    if (diff <= -18 && state.round === 1 && state.ai.roundWins === 0 && aiHand <= playerHand) {
      return Math.random() < 0.72;
    }

    if (aiHand <= 2 && diff > -4) return true;
    return false;
  }

  async function scheduleAiTurn() {
    if (state.aiThinking || state.phase !== "playing" || state.turn !== "ai" || state.ai.passed) return;
    state.aiThinking = true;
    renderGame();
    await wait(650 + Math.floor(Math.random() * 500));

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

    const ranked = state.ai.hand
      .map((card) => ({
        card,
        delta: simulateCardDelta("ai", card) + Math.random() * 2.2
      }))
      .sort((a, b) => b.delta - a.delta);

    state.aiThinking = false;
    playCard("ai", ranked[0].card.uid);
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
      : `下一輪由${SIDE_LABEL[state.nextStarter]}先手；場上卡牌將進入墓地。`;
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
      ? "你在人物、空間、裝飾與文字之間建立了更完整的文化連結。"
      : result === "ai"
        ? "重新調整手牌資源與空間配置，再挑戰一次。"
        : "雙方對宗祠文化的配置勢均力敵。";

    $("#game-over-title").textContent = title;
    $("#game-over-score").textContent = `${state.player.roundWins} ： ${state.ai.roundWins}`;
    $("#game-over-detail").textContent = detail;
    $("#game-over-modal").classList.remove("hidden");
    renderStats();
  }

  function restartGame() {
    $("#game-over-modal").classList.add("hidden");
    $("#round-result-modal").classList.add("hidden");
    $("#game-screen").classList.add("hidden");
    $("#start-screen").classList.remove("hidden");
    state.phase = "start";
    renderStats();
  }

  function createCardElement(card, side, location, evaluation = null) {
    const el = document.createElement("button");
    const row = DATA.rows[card.type];
    const powerInfo = evaluation?.cardPowers?.get(card.uid);
    const effective = powerInfo ? powerInfo.effective : card.power;
    const bonus = powerInfo ? powerInfo.bonus : 0;

    el.type = "button";
    el.className = `game-card card-${card.type} rarity-${card.rarity} location-${location}`;
    el.dataset.uid = card.uid;
    el.setAttribute("aria-label", `${card.name}，${row.label}，力量 ${effective}`);

    el.innerHTML = `
      <span class="card-power ${bonus > 0 ? "boosted" : ""}">${effective}</span>
      <span class="card-rarity">${card.rarity}</span>
      <span class="card-art" aria-hidden="true">
        <span class="card-art-halo"></span>
        <span class="card-glyph">${card.icon}</span>
        <span class="card-roof"></span>
      </span>
      <span class="card-type">${row.icon} ${row.label}</span>
      <strong class="card-name">${card.name}</strong>
      <span class="card-effect">${card.effectText}</span>
      ${bonus > 0 ? `<span class="card-bonus">基礎 ${card.power} ＋連結 ${bonus}</span>` : ""}
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
    $("#"+side+"-total").textContent = evaluation.total;
    $("#"+side+"-hand-count").textContent = actor.hand.length;
    $("#"+side+"-deck-count").textContent = actor.deck.length;
    $("#"+side+"-grave-count").textContent = actor.graveyard.length;
    $("#"+side+"-pass-badge").classList.toggle("hidden", !actor.passed);

    ROW_ORDER.forEach((row) => {
      const container = $(`#${side}-${row}-cards`);
      container.innerHTML = "";
      actor.board[row].forEach((card) => {
        container.appendChild(createCardElement(card, side, "board", evaluation));
      });
      $(`#${side}-${row}-score`).textContent = evaluation.rowTotals[row];
      $(`#${side}-${row}-boost`).textContent = actor.roundBoosts[row] > 0 ? `領主 +${actor.roundBoosts[row]}` : "";
    });

    const comboContainer = $(`#${side}-combos`);
    comboContainer.innerHTML = evaluation.combos.length
      ? evaluation.combos.map((combo) => `<span title="${combo.description}">${combo.name} +${combo.points}</span>`).join("")
      : "<em>尚未形成大型連結</em>";
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
      if (state.aiThinking) status = "守藏者正在思考配置……";
      else if (state.turn === "player") status = state.player.passed ? "你已 Pass，等待對方完成本輪。" : "輪到你：打出一張牌、使用領主能力或 Pass。";
      else status = "輪到守藏者。";
    } else if (state.phase === "roundEnd") {
      status = "本輪已結算。";
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
    $("#card-detail-source").textContent = card.source;
    $("#card-detail-modal").classList.remove("hidden");
  }

  function openModal(id) {
    $(id).classList.remove("hidden");
  }

  function closeModal(id) {
    $(id).classList.add("hidden");
  }

  function setupEvents() {
    $$(".leader-choice").forEach((button) => {
      button.addEventListener("click", () => selectLeader(button.dataset.leader));
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
    $("#return-home").addEventListener("click", restartGame);

    $("#rules-button").addEventListener("click", () => openModal("#rules-modal"));
    $("#sources-button").addEventListener("click", () => openModal("#sources-modal"));
    $("#start-rules").addEventListener("click", () => openModal("#rules-modal"));

    $$("[data-close]").forEach((button) => {
      button.addEventListener("click", () => closeModal(button.dataset.close));
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
      }
    });
  }

  function init() {
    setupEvents();
    selectLeader("xieAn");
    renderStats();
  }

  window.addEventListener("DOMContentLoaded", init);
})();
