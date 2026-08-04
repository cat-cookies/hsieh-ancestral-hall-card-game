const fs = require('fs');
const vm = require('vm');
const path = require('path');
const root = path.resolve(__dirname, '..');

function load(file) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  return context.window.GAME_DATA;
}
function assert(condition, message) { if (!condition) throw new Error(message); }
const DATA = load('js/cards.js');

let seed = 2310805;
function random() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function makeDeck() {
  const cardById = new Map(DATA.cards.map((card) => [card.id, card]));
  const simpleCombos = shuffle(DATA.combos.filter((combo) => combo.level === 'simple' && (combo.requiresCards || []).length === 2));
  const openingIds = []; const openingSet = new Set();
  const addOpeningCard = (id) => { if (!openingSet.has(id) && cardById.has(id)) { openingSet.add(id); openingIds.push(id); } };
  let guaranteedCombos = 0;
  simpleCombos.forEach((combo) => {
    if (guaranteedCombos >= 2) return;
    const ids = combo.requiresCards || [];
    if (ids.every((id) => !openingSet.has(id))) { ids.forEach(addOpeningCard); guaranteedCombos += 1; }
  });
  const targets = { space: 4, decoration: 4, text: 3, effect: 1 };
  const countTypes = () => openingIds.reduce((counts, id) => {
    const type = cardById.get(id)?.type; if (type) counts[type] = (counts[type] || 0) + 1; return counts;
  }, { space: 0, decoration: 0, text: 0, effect: 0 });
  const available = shuffle(DATA.cards.filter((card) => !openingSet.has(card.id)));
  while (openingIds.length < 12 && available.length) {
    const counts = countTypes();
    const neededTypes = Object.keys(targets).sort((a, b) => (targets[b] - (counts[b] || 0)) - (targets[a] - (counts[a] || 0)));
    let index = available.findIndex((card) => neededTypes.some((type) => type === card.type && (counts[type] || 0) < targets[type]));
    if (index < 0) index = 0;
    addOpeningCard(available.splice(index, 1)[0].id);
  }
  const opening = shuffle(openingIds.map((id) => cardById.get(id)));
  const remainder = shuffle(DATA.cards.filter((card) => !openingSet.has(card.id)));
  return [...remainder, ...opening];
}
function completedSimple(hand) {
  const set = new Set(hand.map((card) => card.id));
  return DATA.combos.filter((combo) => combo.level === 'simple' && combo.requiresCards.every((id) => set.has(id))).length;
}

const simulations = 20000;
const typeRanges = { space: [Infinity, -Infinity], decoration: [Infinity, -Infinity], text: [Infinity, -Infinity], effect: [Infinity, -Infinity] };
let minSimple = Infinity; let maxSimple = -Infinity;
for (let i = 0; i < simulations; i += 1) {
  const deck = makeDeck();
  assert(deck.length === 46, `Deck length mismatch at simulation ${i}`);
  assert(new Set(deck.map((card) => card.id)).size === 46, `Duplicate/missing card at simulation ${i}`);
  const hand = deck.slice(-12);
  assert(hand.length === 12, `Opening hand mismatch at simulation ${i}`);
  const simpleCount = completedSimple(hand);
  minSimple = Math.min(minSimple, simpleCount); maxSimple = Math.max(maxSimple, simpleCount);
  assert(simpleCount >= 2, `Opening hand lacks two starter combos at simulation ${i}`);
  for (const type of Object.keys(typeRanges)) {
    const count = hand.filter((card) => card.type === type).length;
    typeRanges[type][0] = Math.min(typeRanges[type][0], count);
    typeRanges[type][1] = Math.max(typeRanges[type][1], count);
  }
  assert(hand.some((card) => card.type === 'effect'), `Opening hand lacks effect card at simulation ${i}`);
}

const zhCode = fs.readFileSync(path.join(root, 'js/game.js'), 'utf8');
const enCode = fs.readFileSync(path.join(root, 'js/game-en.js'), 'utf8');
for (const [label, code] of [['zh', zhCode], ['en', enCode]]) {
  const tieBlock = code.match(/if \(winner === \"tie\"\) \{([\s\S]*?)\n    \} else \{/);
  assert(tieBlock && !/roundWins \+= 1/.test(tieBlock[1]), `${label}: tied round still adds a marker`);
  assert(code.includes('roundBoosts[eligible[0]] += 7'), `${label}: Xie Xuan boost is not 7`);
  assert(code.includes('actor.roundBoosts[row] += 2'), `${label}: Xie An row boost is not 2`);
  assert(code.includes('state.roundWins >= 2') === false, `${label}: suspicious state-level win field`);
  assert(/state\.player\.roundWins >= 2 \|\| state\.ai\.roundWins >= 2 \|\| state\.round >= 3/.test(code), `${label}: match-end condition mismatch`);
  assert(!/difficulty[^\n]{0,120}(power|roundBoosts\[[^\]]+\] \+=|combo\.points)/i.test(code), `${label}: difficulty appears to modify score values`);
}

console.log(JSON.stringify({
  version: '2.31',
  openingSimulations: simulations,
  openingCards: 12,
  starterCombosInOpening: { minimum: minSimple, maximum: maxSimple },
  openingTypeRanges: Object.fromEntries(Object.entries(typeRanges).map(([key, value]) => [key, { minimum: value[0], maximum: value[1] }])),
  tiedRoundRule: 'no marker to either side',
  xieAnMaximumGain: 6,
  xieXuanConditionalGain: 7,
  hiddenDifficultyScoreBonus: false
}, null, 2));
