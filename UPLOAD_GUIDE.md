# GitHub Pages 更新教學

你目前的網站網址為：

```text
https://cat-cookies.github.io/hsieh-ancestral-hall-card-game/
```

本次更新最簡單的方法，是用新版 `index.html` 覆蓋舊版。

## 方法一：只更新一個檔案

1. 解壓縮下載的 ZIP。
2. 找到最外層的 `index.html`。
3. 進入 GitHub 儲存庫：

```text
cat-cookies / hsieh-ancestral-hall-card-game
```

4. 點選原本的 `index.html`。
5. 點右上角的垃圾桶圖示刪除舊檔，或直接使用 `Add file → Upload files` 上傳同名新檔。
6. 將新版 `index.html` 拖入上傳區。
7. 往下按 `Commit changes`。
8. 等待約 1 至 5 分鐘。
9. 開啟：

```text
https://cat-cookies.github.io/hsieh-ancestral-hall-card-game/
```

10. 若仍看到舊畫面，按 `Ctrl + F5` 強制重新整理。

## 方法二：上傳完整專案

ZIP 內的 `source-code` 資料夾保留分檔原始碼，適合日後修改。若要完整上傳，請將資料夾內的檔案與子資料夾放到儲存庫根目錄。

至少要包含：

```text
index.html
styles.css
js/
assets/
```

你目前的 GitHub Pages 已設定為：

```text
Deploy from a branch
main
/(root)
```

因此只要 `main` 分支根目錄有 `index.html`，網站就會自動更新，不必重新設定 Pages。

## 常見問題

### 上傳後顯示 404

檢查 `index.html` 是否位於儲存庫最外層，而不是放在 ZIP 或額外資料夾內。

### 畫面仍是舊版

等待數分鐘，再按 `Ctrl + F5`。也可使用無痕視窗測試。

### 圖片沒有出現

若使用單檔版 `index.html`，圖片已內嵌，不需要另外上傳圖片。若使用分檔原始碼，必須一併上傳 `assets` 資料夾。
