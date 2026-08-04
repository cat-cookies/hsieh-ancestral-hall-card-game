const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'js/cards.js'), 'utf8'), context);
const DATA = context.window.GAME_DATA;
const ROWS = ['text', 'decoration', 'space'];

let seed = 2310805;
function random() {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
}

function boardOf(cards) {
  const board = { space: [], decoration: [], text: [] };
  cards.forEach((card, index) => {
    if (board[card.type]) board[card.type].push({ ...card, uid: `${card.id}-${index}` });
  });
  return board;
}
function allCards(board) { return [...board.space, ...board.decoration, ...board.text]; }
function hasCard(board, id) { return allCards(board).some((card) => card.id === id); }
function countType(board, type) { return board[type].length; }
function countIds(board, ids) { return allCards(board).filter((card) => ids.includes(card.id)).length; }
function directBonus(card, board) {
  switch (card.id) {
    case 'gatehouse': return board.space[0]?.uid === card.uid ? 1 : 0;
    case 'forecourt': return hasCard(board, 'gatehouse') && hasCard(board, 'frontHall') ? 1 : 0;
    case 'frontHall': return countIds(board, ['dougongPainting', 'frontCouplet', 'baoshutang', 'swallowTail']) > 0 ? 1 : 0;
    case 'courtyard': return Math.min(2, Math.max(0, countType(board, 'space') - 1));
    case 'rearHall': return hasCard(board, 'rootSource') || hasCard(board, 'ancestralTablets') ? 1 : 0;
    case 'leftWing': return hasCard(board, 'rightWing') ? 1 : 0;
    case 'rightWing': return hasCard(board, 'leftWing') ? 1 : 0;
    case 'huatai': return hasCard(board, 'fiveElements') || hasCard(board, 'landDragon') ? 2 : 0;
    case 'study': return hasCard(board, 'leftWing') || hasCard(board, 'rightWing') ? 2 : 0;
    case 'ritualHall': return countType(board, 'text') > 0 ? 1 : 0;
    case 'fiveElements': return hasCard(board, 'huatai') ? 2 : 0;
    case 'landDragon': return hasCard(board, 'huatai') || hasCard(board, 'rearHall') ? 2 : 0;
    case 'heavenIncense': return hasCard(board, 'rearHall') ? 2 : 0;
    case 'dougongPainting': return hasCard(board, 'frontHall') ? 2 : 0;
    case 'threeSuccesses': return hasCard(board, 'rearHall') ? 2 : 0;
    case 'sterculiaTree': return hasCard(board, 'baoshutang') ? 2 : 0;
    case 'maleLamp': return hasCard(board, 'femaleLamp') ? 1 : 0;
    case 'femaleLamp': return hasCard(board, 'maleLamp') ? 1 : 0;
    case 'swallowTail': return hasCard(board, 'gatehouse') || hasCard(board, 'frontHall') ? 2 : 0;
    case 'longevityBrick': return countIds(board, ['frontHall', 'rearHall', 'ritualHall']) > 0 ? 2 : 0;
    case 'harvestPattern': return hasCard(board, 'forecourt') ? 2 : 0;
    case 'baoshutang': return hasCard(board, 'frontHall') || hasCard(board, 'sterculiaTree') ? 2 : 0;
    case 'rootSource': return hasCard(board, 'rearHall') ? 2 : 0;
    case 'frontCouplet': return hasCard(board, 'frontHall') ? 2 : 0;
    case 'rearCouplet': return hasCard(board, 'rearHall') ? 2 : 0;
    case 'ridgeCouplet': return countType(board, 'space') >= 3 ? 3 : 0;
    case 'ancestralTablets': return hasCard(board, 'rearHall') || hasCard(board, 'ritualHall') ? 2 : 0;
    case 'hallInscription': return Math.min(3, countType(board, 'space'));
    case 'springAutumn': return countType(board, 'space') >= 2 && countType(board, 'text') >= 2 ? 3 : 0;
    case 'ancestorSociety': return ROWS.every((row) => board[row].length > 0) ? 2 : 0;
    case 'managementResidence': return hasCard(board, 'ancestorSociety') || hasCard(board, 'familyAssembly') ? 2 : 0;
    case 'phoenixEye': return hasCard(board, 'ritualHall') || hasCard(board, 'rearHall') ? 2 : 0;
    case 'stepBeam': return hasCard(board, 'frontHall') ? 2 : 0;
    case 'beamBlock': return hasCard(board, 'stepBeam') || hasCard(board, 'dougongPainting') ? 2 : 0;
    case 'rearBracketPainting': return hasCard(board, 'rearHall') ? 2 : 0;
    case 'plainBackPainting': return hasCard(board, 'rearBracketPainting') || hasCard(board, 'beamBlock') ? 2 : 0;
    case 'familyAssembly': return hasCard(board, 'managementResidence') || hasCard(board, 'ancestorSociety') ? 2 : 0;
    case 'banquet': return hasCard(board, 'forecourt') ? 2 : 0;
    case 'childhoodPlay': return hasCard(board, 'forecourt') ? 2 : 0;
    case 'fruitPicking': return hasCard(board, 'sterculiaTree') ? 2 : 0;
    default: return 0;
  }
}
function completedCombos(board) {
  return DATA.combos.filter((combo) => (combo.requiresCards || []).every((id) => hasCard(board, id)));
}
function score(cards) {
  const board = boardOf(cards);
  const cardScore = allCards(board).reduce((sum, card) => sum + card.power + directBonus(card, board), 0);
  return cardScore + completedCombos(board).reduce((sum, combo) => sum + combo.points, 0);
}
function sampleOthers(cards, excludedId, count) {
  const pool = cards.filter((card) => card.id !== excludedId);
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [pool[index], pool[swap]] = [pool[swap], pool[index]];
  }
  return pool.slice(0, count);
}

const culturalCards = DATA.cards.filter((card) => card.type !== 'effect');
const samplesPerCard = 12000;
const statistics = culturalCards.map((card) => {
  let sum = 0;
  let sumSquares = 0;
  let minimum = Infinity;
  let maximum = -Infinity;
  for (let sample = 0; sample < samplesPerCard; sample += 1) {
    const otherCount = 4 + Math.floor(random() * 6);
    const others = sampleOthers(culturalCards, card.id, otherCount);
    const marginal = score([...others, card]) - score(others);
    sum += marginal;
    sumSquares += marginal * marginal;
    minimum = Math.min(minimum, marginal);
    maximum = Math.max(maximum, marginal);
  }
  const average = sum / samplesPerCard;
  return {
    id: card.id,
    name: card.name,
    basePower: card.power,
    average,
    standardDeviation: Math.sqrt(sumSquares / samplesPerCard - average * average),
    minimum,
    maximum
  };
}).sort((a, b) => b.average - a.average);

const overallAverage = statistics.reduce((sum, item) => sum + item.average, 0) / statistics.length;
const betweenCardSD = Math.sqrt(statistics.reduce((sum, item) => sum + (item.average - overallAverage) ** 2, 0) / statistics.length);
const output = {
  seed: 2310805,
  samplesPerCard,
  culturalCardCount: culturalCards.length,
  overallAverage: Number(overallAverage.toFixed(2)),
  betweenCardSD: Number(betweenCardSD.toFixed(2)),
  range: Number((statistics[0].average - statistics.at(-1).average).toFixed(2)),
  top: statistics.slice(0, 6).map((item) => ({ name: item.name, average: Number(item.average.toFixed(2)) })),
  bottom: statistics.slice(-6).map((item) => ({ name: item.name, average: Number(item.average.toFixed(2)) }))
};
console.log(JSON.stringify(output, null, 2));
