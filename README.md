# 謝氏宗祠・宗族牌局 v2.27

以謝氏宗祠的空間格局、建築裝飾、祭祀文字、宗族制度與地方記憶為內容基礎，結合三輪對戰、手牌管理、文化組合技與文化資產互動支線的教育型卡牌遊戲。

## 三種獨立語言入口

```text
index.html             正體中文首頁，不顯示注音
battle.html            正體中文對戰頁，不顯示注音
index-zhuyin.html      正體中文＋注音符號首頁
battle-zhuyin.html     正體中文＋注音符號對戰頁
index-en.html          English home page
battle-en.html         English battle page
```

英文版使用獨立的英文資料與程式：

```text
js/cards-en.js
js/catalog-en.js
js/home-en.js
js/game-en.js
js/heritage-journey-en.js
```

正體中文無注音版使用：

```text
js/cards.js
js/catalog.js
js/home.js
js/game.js
js/heritage-journey.js
```

注音版在正體中文內容上另載入 `js/zhuyin.js`，以 Ruby 標記顯示注音，不會同時載入英文遊戲資料。

## v2.21 核心改進

- 小、中、大字級按鈕可正常使用，並提高按鈕、說明、對戰資訊與學習支線的實際字級。
- 依 `visualViewport`、螢幕比例、直向／橫向與觸控狀態調整版面。
- 點一下手牌只會選取並顯示效果；快速點兩下才會出牌。
- 手機以可讀的選牌效果面板取代滑鼠懸停，不需依賴長按。
- 修正第一張手牌的效果提示箭頭錯指相鄰卡牌。
- 牌局結束後可選擇繼續玩牌、完成文化支線學習或結束遊戲。
- 文化支線包含空間格局、建築裝飾、祭祀文字與地方記憶，並加入互動題目、記憶拼圖、背景圖與獎狀下載。
- 文化內容補入鳳眼、斗栱、三元及第、五行石、七折水路、壽字磚、五穀豐收、男女燈與蘋婆樹等資料重點。
- 對訪談所得內容明確標示「訪談記憶／待考證」，避免與修復計畫或專題已整理內容混寫。

## GitHub Pages 上傳

1. 解壓縮 ZIP。
2. 將解壓縮後的全部檔案與資料夾上傳至 GitHub 儲存庫根目錄。
3. 覆蓋既有檔案並提交變更。
4. 等待 GitHub Pages 重新部署，再按 `Ctrl + F5` 強制重新整理。

不可只上傳 `index.html`，否則注音版、英文版、文化支線、圖片與程式資源不會完整更新。
