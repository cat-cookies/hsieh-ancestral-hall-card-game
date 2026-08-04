from pathlib import Path
import json
import re
import time
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = [
    "js/project-config.js", "js/cards.js", "js/catalog.js", "js/game.js",
    "js/heritage-journey.js", "js/feedback.js", "js/accessibility.js",
    "js/layout-calibration.js",
]


def load_battle(page, difficulty: str, leader: str, seed: int) -> None:
    html = (ROOT / "battle.html").read_text(encoding="utf-8")
    html = re.sub(r'<script[^>]*src="[^"]+"[^>]*></script>', "", html, flags=re.I)
    html = re.sub(r'<link[^>]*href="styles\.css[^>]*>', "", html, flags=re.I)
    html = re.sub(r'<link[^>]*href="https?://[^"]+"[^>]*>', "", html, flags=re.I)
    page.set_content(html, wait_until="domcontentloaded")
    page.evaluate(
        '(url) => history.replaceState({}, "", url)',
        f"about:blank?leader={leader}&difficulty={difficulty}",
    )
    page.evaluate(
        f"""(() => {{
          let seed = {seed} >>> 0;
          Math.random = () => {{
            seed = (1664525 * seed + 1013904223) >>> 0;
            return seed / 4294967296;
          }};
          const nativeSetTimeout = window.setTimeout.bind(window);
          window.setTimeout = (fn, ms = 0, ...args) =>
            nativeSetTimeout(fn, Math.min(Number(ms) || 0, 2), ...args);
          const nativeSetInterval = window.setInterval.bind(window);
          window.setInterval = (fn, ms = 0, ...args) =>
            nativeSetInterval(fn, Math.min(Number(ms) || 0, 10), ...args);
          try {{
            localStorage.setItem('hsiehCardGameSoundEnabled', '0');
            localStorage.setItem('hsiehCardGameTutorialSeen', '1');
          }} catch (error) {{}}
        }})()"""
    )
    page.add_style_tag(content=(ROOT / "styles.css").read_text(encoding="utf-8"))
    for script in SCRIPTS:
        page.add_script_tag(content=(ROOT / script).read_text(encoding="utf-8"))
    page.wait_for_timeout(30)


def run_match(page, difficulty: str, leader: str, seed: int) -> dict:
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    load_battle(page, difficulty, leader, seed)

    if page.locator("#opening-overlay:not(.hidden)").count():
        page.locator("#opening-skip").click(force=True)
    page.wait_for_selector("#mulligan-overlay:not(.hidden)", timeout=5000)
    page.locator("#mulligan-confirm").click(force=True)

    last_round = ""
    played_this_round = 0
    actions = 0
    result = None
    deadline = time.time() + 18

    while time.time() < deadline:
        actions += 1
        if errors:
            raise RuntimeError(f"Browser errors: {errors}")

        if page.locator("#tutorial-modal:not(.hidden)").count():
            page.locator("#tutorial-skip").click(force=True)
            page.wait_for_timeout(5)
            continue
        if page.locator("#mulligan-overlay:not(.hidden)").count():
            page.locator("#mulligan-confirm").click(force=True)
            page.wait_for_timeout(8)
            continue
        if page.locator("#round-result-modal:not(.hidden)").count():
            page.locator("#round-result-continue").click(force=True)
            page.wait_for_timeout(10)
            continue
        if page.locator("#ending-overlay:not(.hidden)").count():
            page.locator("#ending-continue").click(force=True)
            page.wait_for_timeout(10)
            continue
        if page.locator("#game-over-modal:not(.hidden)").count():
            result = {
                "difficulty": difficulty,
                "leader": leader,
                "title": page.locator("#game-over-title").inner_text(),
                "score": page.locator("#game-over-score").inner_text(),
                "lastRound": last_round,
                "scriptedActions": actions,
            }
            break

        round_text = (page.locator("#round-label").inner_text() or "").strip()
        if round_text != last_round:
            last_round = round_text
            played_this_round = 0

        pass_button = page.locator("#pass-action")
        if pass_button.count() and pass_button.is_enabled():
            player_total = int((page.locator("#player-total").inner_text() or "0").strip())
            ai_total = int((page.locator("#ai-total").inner_text() or "0").strip())
            hand_count = int((page.locator("#player-hand-count").inner_text() or "0").strip())
            ai_passed = "hidden" not in (page.locator("#ai-pass-badge").get_attribute("class") or "")
            leader_button = page.locator("#leader-action")

            if (ai_passed and player_total > ai_total) or played_this_round >= 4 or hand_count == 0:
                pass_button.click(force=True)
                page.wait_for_timeout(8)
                continue
            if leader_button.is_enabled() and played_this_round >= 3 and player_total < ai_total:
                leader_button.click(force=True)
                page.wait_for_timeout(8)
                continue

            cards = page.locator("#player-hand .game-card")
            count = cards.count()
            if count:
                best_index = 0
                best_power = -1
                for index in range(count):
                    label = cards.nth(index).get_attribute("aria-label") or ""
                    match = re.search(r"力量\s*(\d+)", label)
                    power = int(match.group(1)) if match else 0
                    if power > best_power:
                        best_power = power
                        best_index = index
                cards.nth(best_index).evaluate("(element) => { element.click(); element.click(); }")
                played_this_round += 1
                page.wait_for_timeout(8)
                continue

        page.wait_for_timeout(5)

    if result is None:
        status = page.locator("#turn-status").inner_text() if page.locator("#turn-status").count() else "missing"
        raise RuntimeError(f"Match did not finish: {difficulty}/{leader}; round={last_round}; status={status}")

    score_match = re.fullmatch(r"\s*(\d+)\s*[：:]\s*(\d+)\s*", result["score"])
    if not score_match:
        raise RuntimeError(f"Invalid final score: {result['score']}")
    player_wins, ai_wins = map(int, score_match.groups())
    if not (0 <= player_wins <= 2 and 0 <= ai_wins <= 2):
        raise RuntimeError(f"Round wins outside 0–2: {result['score']}")
    if last_round not in {"第 2 輪", "第 3 輪"}:
        raise RuntimeError(f"Match ended outside rounds 2–3: {last_round}")
    return result


def main() -> None:
    cases = [
        (difficulty, leader, 2310805 + index * 97)
        for index, (difficulty, leader) in enumerate(
            (("easy", "xieAn"), ("easy", "xieXuan"),
             ("normal", "xieAn"), ("normal", "xieXuan"),
             ("hard", "xieAn"), ("hard", "xieXuan"))
        )
    ]
    results = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            headless=True,
            executable_path="/usr/bin/chromium",
            args=["--no-sandbox", "--disable-gpu", "--disable-background-networking"],
        )
        for difficulty, leader, seed in cases:
            page = browser.new_page(viewport={"width": 1280, "height": 800})
            page.set_default_timeout(2500)
            results.append(run_match(page, difficulty, leader, seed))
            page.close()
        browser.close()

    print(json.dumps({"matchesCompleted": len(results), "results": results}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
