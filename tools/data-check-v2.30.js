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
const zh = load('js/cards.js');
const en = load('js/cards-en.js');
const ids = zh.cards.map((card) => card.id);
const unique = new Set(ids);
const comboIds = new Set();
const invalidReferences = [];
zh.combos.forEach((combo) => {
  if (comboIds.has(combo.id)) throw new Error(`Duplicate combo ID: ${combo.id}`);
  comboIds.add(combo.id);
  (combo.requiresCards || []).forEach((id) => { if (!unique.has(id)) invalidReferences.push(`${combo.id}:${id}`); });
});
const simple = zh.combos.filter((combo) => combo.level === 'simple');
const advanced = zh.combos.filter((combo) => combo.level === 'advanced');
if (unique.size !== ids.length) throw new Error('Duplicate card ID');
if (invalidReferences.length) throw new Error(`Invalid combo references: ${invalidReferences.join(', ')}`);
if (simple.some((combo) => combo.requiresCards.length !== 2)) throw new Error('Simple combo is not exactly two cards');
if (advanced.some((combo) => combo.requiresCards.length < 3 || combo.requiresCards.length > 4)) throw new Error('Advanced combo is not three to four cards');
if (JSON.stringify([...ids].sort()) !== JSON.stringify(en.cards.map((card) => card.id).sort())) throw new Error('English card IDs do not match');
console.log(JSON.stringify({
  cards: zh.cards.length,
  effects: zh.cards.filter((card) => card.type === 'effect').length,
  combos: zh.combos.length,
  simple: simple.length,
  advanced: advanced.length,
  typeCounts: Object.fromEntries(['space', 'decoration', 'text', 'effect'].map((type) => [type, zh.cards.filter((card) => card.type === type).length]))
}, null, 2));
