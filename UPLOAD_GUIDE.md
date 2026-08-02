# GitHub Pages 更新指南

## 需要上傳的內容

請將 ZIP 解壓縮後，將資料夾內的全部檔案與資料夾上傳至 GitHub 儲存庫根目錄，包括：

```text
index.html
battle.html
index-en.html
battle-en.html
styles.css
assets/
js/
.nojekyll
```

`js/` 內同時包含中文與英文的獨立資源，請全部保留：

```text
cards.js
catalog.js
home.js
game.js
cards-en.js
catalog-en.js
home-en.js
game-en.js
```

## 網頁操作

1. 開啟 GitHub 儲存庫。
2. 選擇 `Add file → Upload files`。
3. 將解壓縮後的全部內容拖入上傳區。
4. 確認同名檔案會覆蓋舊版。
5. 填寫提交說明，例如：`更新謝氏宗祠卡牌遊戲 v2.17`。
6. 按下 `Commit changes`。
7. 等待 GitHub Pages 重新部署。
8. 開啟網站後按 `Ctrl + F5` 強制重新整理。

不要只上傳 ZIP，也不要只替換 `index.html`。
