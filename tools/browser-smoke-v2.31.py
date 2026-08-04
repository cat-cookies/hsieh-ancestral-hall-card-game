from pathlib import Path
import re
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
PAGES = [
    ("index.html", "home-zh", ["js/cards.js", "js/catalog.js", "js/home.js", "js/accessibility.js", "js/layout-calibration.js"]),
    ("index-zhuyin.html", "home-zhuyin", ["js/cards.js", "js/catalog.js", "js/home.js", "js/accessibility.js", "js/layout-calibration.js", "js/zhuyin.js"]),
    ("index-en.html", "home-en", ["js/cards-en.js", "js/catalog-en.js", "js/home-en.js", "js/accessibility.js", "js/layout-calibration.js"]),
]
def load_page(page, html_file, scripts):
    html = (ROOT / html_file).read_text(encoding="utf-8")
    html = re.sub(r'<script[^>]*src="[^"]+"[^>]*></script>', '', html, flags=re.I)
    html = re.sub(r'<link[^>]*href="styles\.css[^>]*>', '', html, flags=re.I)
    page.set_content(html, wait_until="domcontentloaded")
    page.add_style_tag(content=(ROOT / "styles.css").read_text(encoding="utf-8"))
    for script in scripts:
        page.add_script_tag(content=(ROOT / script).read_text(encoding="utf-8"))
    page.wait_for_timeout(600)

errors = []
checks = []
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path="/usr/bin/chromium", args=["--no-sandbox", "--disable-gpu", "--disable-background-networking"])
    for viewport in ({"width": 1440, "height": 900}, {"width": 390, "height": 844}):
        for html_file, label, scripts in PAGES:
            print(f"START {label} {viewport}", flush=True)
            page = browser.new_page(viewport=viewport)
            page.on("pageerror", lambda exc, label=label: errors.append(f"{label}: pageerror: {exc}"))
            load_page(page, html_file, scripts)
            overflow = page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
            if overflow > 2:
                errors.append(f"{label} {viewport['width']}px: horizontal overflow {overflow}px")
            if label.startswith("home-"):
                values = page.locator("[data-game-stat]").all_text_contents()
                if values != ["46", "40", "6", "4", "36", "24", "12", "2", "3"]:
                    errors.append(f"{label}: dynamic facts mismatch {values}")
                page.evaluate("document.querySelector(\"#rules-button\").click()")
                page.wait_for_timeout(80)
                combo_count = page.locator("#combo-rule-list .combo-rule-item").count()
                if combo_count != 36:
                    errors.append(f"{label}: expected 36 combo rules, got {combo_count}")
                page.evaluate("document.querySelector(\"#rules-modal\").classList.add(\"hidden\")")
                page.evaluate("document.querySelector(\"#cards-button\").click()")
                page.wait_for_timeout(80)
                card_count = page.locator("#card-library-grid > *").count()
                if card_count != 46:
                    errors.append(f"{label}: expected 46 catalog cards, got {card_count}")
            else:
                combo_count = page.locator("#combo-rule-list .combo-rule-item").count()
                if combo_count != 36:
                    errors.append(f"{label}: expected 36 battle combo rules, got {combo_count}")
                page.evaluate("document.querySelector(\"#opening-skip\").click()")
                page.wait_for_timeout(120)
                classes = page.locator("#mulligan-overlay").get_attribute("class") or ""
                if "hidden" in classes:
                    errors.append(f"{label}: mulligan overlay did not open")
                hand_count = page.locator("#mulligan-cards > *").count()
                if hand_count != 12:
                    errors.append(f"{label}: expected 12 opening cards, got {hand_count}")
                page.evaluate("document.querySelector(\"#mulligan-confirm\").click()")
                page.wait_for_timeout(180)
                if not (page.locator("#round-indicator").text_content() or "").strip():
                    errors.append(f"{label}: round indicator missing after mulligan")
            checks.append(f"PASS {label} @ {viewport['width']}x{viewport['height']}")
            print(checks[-1], flush=True)
            page.close()

    # Battle pages: CSS/layout smoke test without starting asynchronous match timers.
    for viewport in ({"width": 1440, "height": 900}, {"width": 390, "height": 844}):
        for html_file, label in [("battle.html", "battle-zh"), ("battle-zhuyin.html", "battle-zhuyin"), ("battle-en.html", "battle-en")]:
            print(f"START {label} layout {viewport}", flush=True)
            page = browser.new_page(viewport=viewport)
            html = (ROOT / html_file).read_text(encoding="utf-8")
            html = re.sub(r'<script[^>]*src="[^"]+"[^>]*></script>', '', html, flags=re.I)
            html = re.sub(r'<link[^>]*href="styles\.css[^>]*>', '', html, flags=re.I)
            page.set_content(html, wait_until="domcontentloaded")
            page.add_style_tag(content=(ROOT / "styles.css").read_text(encoding="utf-8"))
            page.wait_for_timeout(100)
            overflow = page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
            if overflow > 2:
                errors.append(f"{label} {viewport['width']}px: horizontal overflow {overflow}px")
            checks.append(f"PASS {label} layout @ {viewport['width']}x{viewport['height']}")
            print(checks[-1], flush=True)
            page.close()
    browser.close()

print("\n".join(checks))
if errors:
    print("\nFAILURES")
    print("\n".join(errors))
    raise SystemExit(1)
print("\nAll browser smoke checks passed.")
