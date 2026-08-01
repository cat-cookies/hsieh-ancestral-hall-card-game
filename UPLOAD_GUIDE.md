# GitHub Pages 更新步驟（v2.8 雙頁版）

這一版不能只替換 `index.html`，因為戰鬥畫面已獨立成 `battle.html`。請把解壓縮後的全部檔案與資料夾一起上傳。

## 最簡單更新方式

1. 下載並解壓縮本 ZIP。
2. 打開解壓縮後的資料夾。
3. 在 GitHub 進入：

```text
cat-cookies / hsieh-ancestral-hall-card-game
```

4. 點：

```text
Add file → Upload files
```

5. 將解壓縮後資料夾內的所有內容一起拖入上傳區，包括：

```text
index.html
battle.html
styles.css
assets 資料夾
js 資料夾
.nojekyll
README.md
```

6. GitHub 顯示同名檔案時，代表將覆蓋舊版，這是正常的。
7. 提交說明可填：

```text
更新為 v2.8 雙頁對戰版
```

8. 選擇：

```text
Commit directly to the main branch
```

9. 按 `Commit changes`。
10. 等待 GitHub Pages 重新部署約 1 至 10 分鐘。
11. 開啟原網站並按 `Ctrl + F5` 強制重新整理。

## 正確結果

首頁網址仍是：

```text
https://cat-cookies.github.io/hsieh-ancestral-hall-card-game/
```

按下「開始牌局」後，網址應變成類似：

```text
https://cat-cookies.github.io/hsieh-ancestral-hall-card-game/battle.html?leader=xieAn&difficulty=normal
```

只要網址中出現 `battle.html`，就代表已經真正前往下一頁。

## 常見錯誤

### 只上傳 index.html

結果：首頁可以開啟，但按「開始牌局」會顯示找不到頁面。

處理：補上 `battle.html`、`styles.css`、`assets` 與 `js`。

### 把 ZIP 直接上傳

結果：GitHub Pages 不會自動解壓縮。

處理：必須先在電腦解壓縮，再上傳裡面的內容。

### battle.html 被放進其他資料夾

結果：首頁連結會找不到對戰頁。

處理：`battle.html` 必須與 `index.html` 位於同一層。
