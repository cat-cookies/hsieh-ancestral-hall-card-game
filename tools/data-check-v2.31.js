const fs = require('fs');
const vm = require('vm');
const path = require('path');
const root = path.resolve(__dirname, '..');

const currentVersion = fs.readFileSync(path.join(root, 'VERSION.txt'), 'utf8').trim();

function loadGameData(file) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  return context.window.GAME_DATA;
}
function loadBranches(file) {
  const text = fs.readFileSync(path.join(root, file), 'utf8');
  const match = text.match(/const branches = (\[[\s\S]*?\]);\n\s*let completed/);
  if (!match) throw new Error(`Unable to parse learning branches: ${file}`);
  return JSON.parse(match[1]);
}
function assert(condition, message) { if (!condition) throw new Error(message); }
function ids(items) { return items.map((item) => item.id); }
function duplicates(values) { return values.filter((value, index) => values.indexOf(value) !== index); }

function loadProjectConfig() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, 'js/project-config.js'), 'utf8'), context);
  return context.window.PROJECT_CONFIG;
}

assert(currentVersion === '2.31', `VERSION.txt mismatch: ${currentVersion}`);
const projectConfig = loadProjectConfig();
assert(projectConfig.version === currentVersion, `project-config version mismatch: ${projectConfig.version} vs ${currentVersion}`);
const feedbackCode = fs.readFileSync(path.join(root, 'js/feedback.js'), 'utf8');
assert(feedbackCode.includes(`config.version || "${currentVersion}"`), 'Feedback fallback version is stale');

const zh = loadGameData('js/cards.js');
const en = loadGameData('js/cards-en.js');
const zhBranches = loadBranches('js/heritage-journey.js');
const enBranches = loadBranches('js/heritage-journey-en.js');
const allowedTypes = new Set(['space', 'decoration', 'text', 'effect']);
const allowedEffects = new Set(['draw', 'boostLowest', 'recover', 'boostOccupied', 'cycle']);
const cardIds = ids(zh.cards);
const cardIdSet = new Set(cardIds);
const comboIds = ids(zh.combos);
const comboIdSet = new Set(comboIds);

assert(duplicates(cardIds).length === 0, `Duplicate card IDs: ${duplicates(cardIds).join(', ')}`);
assert(duplicates(comboIds).length === 0, `Duplicate combo IDs: ${duplicates(comboIds).join(', ')}`);
assert(zh.cards.length === 46, `Expected 46 cards, got ${zh.cards.length}`);
assert(zh.combos.length === 36, `Expected 36 combos, got ${zh.combos.length}`);
assert(Object.keys(zh.leaders).length === 2, 'Expected 2 leaders');
assert(Object.keys(zh.difficultyLabels).length === 3, 'Expected 3 difficulty levels');
assert(Object.keys(zh.rows).length === 4, 'Expected 4 card types');

for (const card of zh.cards) {
  assert(allowedTypes.has(card.type), `Unknown card type: ${card.id}:${card.type}`);
  ['id', 'name', 'type', 'rarity', 'icon', 'effectText', 'toastText', 'culturalNote', 'valueNote', 'source'].forEach((field) => {
    assert(String(card[field] ?? '').trim().length > 0, `Missing ${field}: ${card.id}`);
  });
  if (card.type === 'effect') {
    assert(card.power === 0, `Effect card must have zero power: ${card.id}`);
    assert(allowedEffects.has(card.effectType), `Unknown effect type: ${card.id}:${card.effectType}`);
    assert(Number.isFinite(card.amount) && card.amount > 0 && card.amount <= 4, `Invalid effect amount: ${card.id}`);
  } else {
    assert(Number.isInteger(card.power) && card.power >= 3 && card.power <= 6, `Cultural card power outside 3–6: ${card.id}`);
  }
}

const simple = zh.combos.filter((combo) => combo.level === 'simple');
const advanced = zh.combos.filter((combo) => combo.level === 'advanced');
assert(simple.length === 24, `Expected 24 starter combos, got ${simple.length}`);
assert(advanced.length === 12, `Expected 12 advanced combos, got ${advanced.length}`);
for (const combo of zh.combos) {
  ['id', 'name', 'description', 'level'].forEach((field) => assert(String(combo[field] ?? '').trim(), `Missing combo ${field}: ${combo.id}`));
  assert(Array.isArray(combo.requiresCards), `Missing requiresCards: ${combo.id}`);
  assert(new Set(combo.requiresCards).size === combo.requiresCards.length, `Duplicate card inside combo: ${combo.id}`);
  combo.requiresCards.forEach((id) => assert(cardIdSet.has(id), `Invalid card reference ${combo.id}:${id}`));
  (combo.requiresCombos || []).forEach((id) => assert(comboIdSet.has(id) && id !== combo.id, `Invalid combo dependency ${combo.id}:${id}`));
  if (combo.level === 'simple') {
    assert(combo.requiresCards.length === 2, `Starter combo must use exactly 2 cards: ${combo.id}`);
    assert(combo.points >= 2 && combo.points <= 3, `Starter combo points outside 2–3: ${combo.id}`);
  } else if (combo.level === 'advanced') {
    assert(combo.requiresCards.length >= 3 && combo.requiresCards.length <= 4, `Advanced combo must use 3–4 cards: ${combo.id}`);
    assert(combo.points >= 4 && combo.points <= 7, `Advanced combo points outside 4–7: ${combo.id}`);
  } else throw new Error(`Unknown combo level: ${combo.id}:${combo.level}`);
}

// Dependency cycle check.
const visiting = new Set(); const visited = new Set();
function visit(comboId) {
  if (visiting.has(comboId)) throw new Error(`Combo dependency cycle at ${comboId}`);
  if (visited.has(comboId)) return;
  visiting.add(comboId);
  const combo = zh.combos.find((item) => item.id === comboId);
  (combo.requiresCombos || []).forEach(visit);
  visiting.delete(comboId); visited.add(comboId);
}
comboIds.forEach(visit);

// Every cultural card must have either a direct rule or combo role.
const gameCode = fs.readFileSync(path.join(root, 'js/game.js'), 'utf8');
const directIds = new Set([...gameCode.matchAll(/case "([^"]+)":\n\s*return/g)].map((match) => match[1]));
const comboCardIds = new Set(zh.combos.flatMap((combo) => combo.requiresCards || []));
zh.cards.filter((card) => card.type !== 'effect').forEach((card) => {
  assert(directIds.has(card.id) || comboCardIds.has(card.id), `Cultural card has neither direct effect nor combo role: ${card.id}`);
});

// Chinese/English gameplay data parity.
assert(JSON.stringify(ids(zh.cards)) === JSON.stringify(ids(en.cards)), 'Chinese/English card order or IDs differ');
assert(JSON.stringify(ids(zh.combos)) === JSON.stringify(ids(en.combos)), 'Chinese/English combo order or IDs differ');
for (let i = 0; i < zh.cards.length; i += 1) {
  const a = zh.cards[i]; const b = en.cards[i];
  ['id', 'type', 'power', 'effectType', 'amount'].forEach((field) => assert(a[field] === b[field], `Card parity mismatch ${a.id}:${field}`));
}
for (let i = 0; i < zh.combos.length; i += 1) {
  const a = zh.combos[i]; const b = en.combos[i];
  assert(a.level === b.level && a.points === b.points, `Combo parity mismatch ${a.id}`);
  assert(JSON.stringify(a.requiresCards) === JSON.stringify(b.requiresCards), `Combo requirements mismatch ${a.id}`);
}

// Learning paths and question integrity.
assert(zhBranches.length === 7 && enBranches.length === 7, 'Expected 7 learning branches in both languages');
assert(JSON.stringify(ids(zhBranches)) === JSON.stringify(ids(enBranches)), 'Learning branch IDs differ across languages');
let questionCount = 0;
for (const branch of zhBranches) {
  assert(branch.title && branch.subtitle && branch.icon, `Incomplete branch metadata: ${branch.id}`);
  assert(Array.isArray(branch.steps) && branch.steps.length >= 6, `Branch too short: ${branch.id}`);
  for (const step of branch.steps) {
    questionCount += 1;
    ['title', 'source', 'body', 'question', 'feedback'].forEach((field) => assert(String(step[field] ?? '').trim(), `Missing learning ${field}: ${branch.id}`));
    assert(Array.isArray(step.facts) && step.facts.length >= 3, `Insufficient facts: ${branch.id}:${step.title}`);
    assert(Array.isArray(step.choices) && step.choices.length === 3, `Question must have 3 choices: ${branch.id}:${step.title}`);
    assert(Number.isInteger(step.answer) && step.answer >= 0 && step.answer < step.choices.length, `Invalid answer: ${branch.id}:${step.title}`);
  }
}
assert(questionCount === 43, `Expected 43 learning questions, got ${questionCount}`);
assert(enBranches.reduce((sum, branch) => sum + branch.steps.length, 0) === questionCount, 'English question count differs');

// Public UI, active-document and version consistency.
const pages = ['index.html', 'index-zhuyin.html', 'index-en.html', 'battle.html', 'battle-zhuyin.html', 'battle-en.html'];
const forbidden = [/30 張文化卡牌/, /30 heritage cards/i, /11 組文化連結/, /11 heritage combos/i, /十張起手/, /ten-card hands/i, /大型組合技/, /Major Combo List/i, /三局兩勝/, /三輪兩勝/, /一回合一張牌/, /\?v=2\.30/];
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  forbidden.forEach((pattern) => assert(!pattern.test(html), `Stale UI text in ${page}: ${pattern}`));
  const cacheVersions = [...html.matchAll(/\?v=(\d+\.\d+)/g)].map((match) => match[1]);
  assert(cacheVersions.length > 0, `No cache version found in ${page}`);
  cacheVersions.forEach((value) => assert(value === currentVersion, `Cache version mismatch in ${page}: ${value}`));
}
const activeDocs = ['README.md', 'SOURCES.md', 'GITHUB_PROJECT_SETTINGS.md', '先讀我.txt'];
for (const file of activeDocs) {
  const text = fs.readFileSync(path.join(root, file), 'utf8');
  forbidden.forEach((pattern) => assert(!pattern.test(text), `Stale active-document text in ${file}: ${pattern}`));
}
const homeZh = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const statExpectations = {
  cards: 46, culturalCards: 40, effectCards: 6, types: 4, combos: 36,
  simpleCombos: 24, advancedCombos: 12, leaders: 2, difficulties: 3
};
for (const [key, expected] of Object.entries(statExpectations)) {
  assert(homeZh.includes(`data-game-stat="${key}"`), `Missing dynamic home stat: ${key}`);
  const match = homeZh.match(new RegExp(`data-game-stat="${key}">([0-9]+)<`));
  assert(match && Number(match[1]) === expected, `Static fallback stat mismatch: ${key}`);
}
assert(homeZh.includes('最多三輪・每次行動擇一'), 'Chinese hero wording is not current');
const homeEn = fs.readFileSync(path.join(root, 'index-en.html'), 'utf8');
assert(homeEn.includes('Up to Three Rounds · One Action per Turn'), 'English hero wording is not current');
assert(!/rarity[^\n]{0,100}(score|power|選牌|加分)/i.test(gameCode), 'Rarity may be influencing gameplay logic');

console.log(JSON.stringify({
  version: currentVersion,
  cards: zh.cards.length,
  cardTypes: Object.fromEntries([...allowedTypes].map((type) => [type, zh.cards.filter((card) => card.type === type).length])),
  combos: zh.combos.length,
  starterCombos: simple.length,
  advancedCombos: advanced.length,
  leaders: Object.keys(zh.leaders).length,
  difficulties: Object.keys(zh.difficultyLabels).length,
  learningBranches: zhBranches.length,
  learningQuestions: questionCount,
  publicPagesChecked: pages.length
}, null, 2));
