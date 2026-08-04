/* 謝氏宗祠文化卡牌遊戲 v2.31－最終一致性、內容與平衡資料 */
window.GAME_DATA = {
  "rows": {
    "space": {
      "label": "空間牌",
      "icon": "🏛",
      "color": "space"
    },
    "decoration": {
      "label": "裝飾牌",
      "icon": "🎨",
      "color": "decoration"
    },
    "text": {
      "label": "文字牌",
      "icon": "📜",
      "color": "text"
    },
    "effect": {
      "label": "效果牌",
      "icon": "✦",
      "color": "effect"
    }
  },
  "difficultyLabels": {
    "easy": "簡單",
    "normal": "普通",
    "hard": "困難"
  },
  "rarityDefinitions": {
    "常見": "常見文化元素：作為辨識宗祠的基礎線索。",
    "珍稀": "地方特色元素：具有較鮮明的場域或文化辨識度。",
    "史詩": "高度代表性元素：能集中呈現重要文化價值。",
    "傳說": "高度特殊或罕見元素：屬核心文化記憶或制度象徵。"
  },
  "rarityPolicy": "文化標記只表示文化特殊性、代表性或收藏價值；不增加力量、不改變技能，也不直接影響勝負。",
  "leaders": {
    "xieAn": {
      "id": "xieAn",
      "name": "謝安",
      "title": "東山定局",
      "icon": "安",
      "description": "家族精神與穩定秩序的象徵。",
      "abilityName": "東山定局",
      "abilityText": "每場限用一次：本輪三個已有卡牌的出牌區各增加 2 點。",
      "quote": "先安其局，再成其勢。"
    },
    "xieXuan": {
      "id": "xieXuan",
      "name": "謝玄",
      "title": "臨勢轉機",
      "icon": "玄",
      "description": "行動力與關鍵逆轉的象徵。",
      "abilityName": "臨勢轉機",
      "abilityText": "每場限用一次：僅在落後時可用，使本輪目前分數最低的出牌區增加 7 點。",
      "quote": "困局之中，仍可轉勢。"
    }
  },
  "combos": [
    {
      "id": "gate-court",
      "name": "門埕相接",
      "row": "space",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "gatehouse",
        "forecourt"
      ],
      "description": "門樓界定入口，禾埕承接進入後的公共前場。"
    },
    {
      "id": "court-front",
      "name": "埕堂相迎",
      "row": "space",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "forecourt",
        "frontHall"
      ],
      "description": "禾埕與前堂連成由戶外活動進入堂屋的路徑。"
    },
    {
      "id": "hall-courtyard",
      "name": "堂井轉折",
      "row": "space",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "frontHall",
        "courtyard"
      ],
      "description": "前堂與天井共同形成採光、通風與儀式轉場。"
    },
    {
      "id": "courtyard-rear",
      "name": "由井入祀",
      "row": "space",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "courtyard",
        "rearHall"
      ],
      "description": "穿越天井後進入後堂祭祀核心。"
    },
    {
      "id": "paired-wings",
      "name": "左右成翼",
      "row": "space",
      "points": 3,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "leftWing",
        "rightWing"
      ],
      "description": "左右橫屋共同補足宗祠生活、教育與公共事務空間。"
    },
    {
      "id": "rear-huatai",
      "name": "後場有靠",
      "row": "space",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "rearHall",
        "huatai"
      ],
      "description": "後堂與化胎形成祭祀核心及後場收束。"
    },
    {
      "id": "five-elements-pair",
      "name": "五行依胎",
      "row": "decoration",
      "points": 3,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "huatai",
        "fiveElements"
      ],
      "description": "化胎與五行石共同表現後場平衡與象徵秩序。"
    },
    {
      "id": "paired-lamps",
      "name": "燈火成雙",
      "row": "decoration",
      "points": 3,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "maleLamp",
        "femaleLamp"
      ],
      "description": "男燈與女燈共同連結迎娶禮俗與家族生活記憶。"
    },
    {
      "id": "front-craft",
      "name": "彩堂承構",
      "row": "decoration",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "frontHall",
        "dougongPainting"
      ],
      "description": "前堂空間與斗栱彩繪共同呈現構造與工藝。"
    },
    {
      "id": "treasure-tree",
      "name": "寶樹相映",
      "row": "text",
      "points": 3,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "sterculiaTree",
        "baoshutang"
      ],
      "description": "堂號與老樹共同連結家族象徵與地方記憶。"
    },
    {
      "id": "root-source-pair",
      "name": "木本報源",
      "row": "text",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "rearHall",
        "rootSource"
      ],
      "description": "後堂與木本水源匾額共同指向祭祀與報本。"
    },
    {
      "id": "ancestral-pair",
      "name": "祖位入祀",
      "row": "text",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "ritualHall",
        "ancestralTablets"
      ],
      "description": "祖牌安置於祭祀核心，使世系與祭祀秩序具體可見。"
    },
    {
      "id": "gate-name",
      "name": "門庭定名",
      "row": "text",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "gatehouse",
        "hallInscription"
      ],
      "description": "門樓與宗祠題字共同建立最外層公共識別。"
    },
    {
      "id": "study-teaching",
      "name": "書房教化",
      "row": "text",
      "points": 3,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "study",
        "ridgeCouplet"
      ],
      "description": "書房與敦倫報本棟對共同呈現教育與倫理教化。"
    },
    {
      "id": "hall-assembly",
      "name": "管理議事",
      "row": "text",
      "points": 3,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "managementResidence",
        "familyAssembly"
      ],
      "description": "管理空間與宗親議事共同支撐宗祠長期運作。"
    },
    {
      "id": "banquet-court",
      "name": "埕前設席",
      "row": "text",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "forecourt",
        "banquet"
      ],
      "description": "禾埕與流水席共同呈現聚會及生活記憶。"
    },
    {
      "id": "childhood-court",
      "name": "埕上童遊",
      "row": "text",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "forecourt",
        "childhoodPlay"
      ],
      "description": "禾埕也是不同世代形成日常記憶的場所。"
    },
    {
      "id": "fruit-memory",
      "name": "樹下採果",
      "row": "text",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "sterculiaTree",
        "fruitPicking"
      ],
      "description": "老樹與採果記憶共同形成自然與情感價值。"
    },
    {
      "id": "rear-order-detail",
      "name": "後堂成序",
      "row": "decoration",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "threeSuccesses",
        "rearBracketPainting"
      ],
      "description": "後堂構件的水平秩序與彩繪工藝共同呈現祭祀核心的穩重層次。"
    },
    {
      "id": "front-text-teaching",
      "name": "堂聯教化",
      "row": "text",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "frontCouplet",
        "baoshutang"
      ],
      "description": "堂號與門聯共同在前堂入口傳達家聲、典故與倫理教化。"
    },
    {
      "id": "harvest-banquet",
      "name": "豐年成席",
      "row": "text",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "harvestPattern",
        "banquet"
      ],
      "description": "五穀豐收的圖像與禾埕宴席記憶連結農村生產、歲時與共享。"
    },
    {
      "id": "phoenix-rear-craft",
      "name": "廳下觀構",
      "row": "decoration",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "phoenixEye",
        "rearBracketPainting"
      ],
      "description": "鳳眼與後堂斗栱彩繪需連同位置、構造及祭祀空間一併理解。"
    },
    {
      "id": "plain-beam-detail",
      "name": "繁簡相映",
      "row": "decoration",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "plainBackPainting",
        "beamBlock"
      ],
      "description": "束木圖騰與較樸素的背面彩繪呈現工藝資源依觀看位置配置的主次。"
    },
    {
      "id": "brick-front-text",
      "name": "福壽入門",
      "row": "text",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "longevityBrick",
        "frontCouplet"
      ],
      "description": "吉祥建築細部與入口教化文字共同呈現家族對福澤、倫理與延續的期待。"
    },
    {
      "id": "entrance-identity",
      "name": "入口成序",
      "row": "text",
      "points": 4,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "gatehouse",
        "forecourt",
        "hallInscription"
      ],
      "description": "門樓、禾埕與題字共同建立入口、前場及宗祠身分。"
    },
    {
      "id": "central-axis-lite",
      "name": "前後有序",
      "row": "space",
      "points": 4,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "frontHall",
        "courtyard",
        "rearHall"
      ],
      "description": "前堂、天井與後堂形成由公共至祭祀核心的中軸轉換。"
    },
    {
      "id": "five-elements-guard",
      "name": "五行護脈",
      "row": "decoration",
      "points": 5,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "huatai",
        "fiveElements",
        "landDragon"
      ],
      "description": "化胎、五行石與土地龍神共同構成後場護佑與秩序象徵。"
    },
    {
      "id": "ritual-order",
      "name": "禮序成章",
      "row": "text",
      "points": 4,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "ritualHall",
        "rootSource",
        "ancestralTablets"
      ],
      "description": "後堂、木本水源與祖牌共同指向祭祀、報本與世系秩序。"
    },
    {
      "id": "teaching-lineage",
      "name": "教化傳家",
      "row": "text",
      "points": 5,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "study",
        "ridgeCouplet",
        "ancestorSociety"
      ],
      "description": "書房、敦倫報本棟對與嘗會制度共同表現宗族教化與組織。"
    },
    {
      "id": "management-continuity",
      "name": "宗務相承",
      "row": "text",
      "points": 5,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "managementResidence",
        "ancestorSociety",
        "familyAssembly"
      ],
      "description": "管理空間、嘗會與宗親議事共同維持宗祠運作。"
    },
    {
      "id": "craft-order",
      "name": "木構有序",
      "row": "decoration",
      "points": 5,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "stepBeam",
        "beamBlock",
        "rearBracketPainting"
      ],
      "description": "通樑、束木與後堂斗栱彩繪呈現構造、工藝與空間層級。"
    },
    {
      "id": "modest-craft",
      "name": "繁簡有別",
      "row": "decoration",
      "points": 4,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "stepBeam",
        "plainBackPainting",
        "rearBracketPainting"
      ],
      "description": "精緻與樸素處理並存，反映建築主次及工藝資源配置。"
    },
    {
      "id": "living-memory",
      "name": "禾埕歲月",
      "row": "text",
      "points": 6,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "forecourt",
        "banquet",
        "childhoodPlay",
        "sterculiaTree"
      ],
      "description": "禾埕、流水席、童遊與老樹共同形成跨世代生活記憶。"
    },
    {
      "id": "festival-rite",
      "name": "祭典全備",
      "row": "text",
      "points": 7,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "ritualHall",
        "heavenIncense",
        "springAutumn",
        "ancestralTablets"
      ],
      "description": "祭祀廳下、天公爐、春祭秋嘗與祖牌共同完成祭祀場景。"
    },
    {
      "id": "two-halls-two-wings",
      "name": "二堂二橫",
      "row": "space",
      "points": 5,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "frontHall",
        "rearHall",
        "leftWing",
        "rightWing"
      ],
      "description": "前後堂與左右橫屋共同構成客家宗祠重要格局。"
    },
    {
      "id": "roof-splendor",
      "name": "彩堂揚輝",
      "row": "decoration",
      "points": 6,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "dougongPainting",
        "stepBeam",
        "swallowTail",
        "baoshutang"
      ],
      "description": "前堂、斗栱彩繪、燕尾脊與堂號共同展現外觀識別及工藝重點。"
    }
  ],
  "tutorialSteps": [
    {
      "title": "先選擇最適合你的閱讀方式",
      "body": "網站提供正體中文、注音版與英文版；字級可選小、中、大。設定會保留在同一部裝置。"
    },
    {
      "title": "最多三輪，難度不靠暗中加分",
      "body": "雙方使用同一套卡牌與計分規則。簡單、普通與困難主要改變守藏者的換牌、出牌、資源保留與 PASS 判斷，不會偷偷提高卡牌力量。"
    },
    {
      "title": "四類牌各有清楚角色",
      "body": "空間牌建立格局，裝飾牌連結工藝與象徵，文字牌承載禮制、制度與地方記憶；效果牌使用後立即結算並進入墓地，不留在出牌區。"
    },
    {
      "title": "起手十二張，並保證至少兩組簡易線索",
      "body": "起手牌會平衡四類牌的比例，並至少包含兩組可完成的二張簡易組合。第一輪可換至多四張，第二、三輪各補兩張並可再換一張。"
    },
    {
      "title": "點一下閱讀，確認後才出牌",
      "body": "點一下手牌只會選取並顯示效果；快速點兩下同一張牌或按「打出這張牌」才會正式出牌，以降低誤觸。"
    },
    {
      "title": "簡易組合多，進階組合少而明確",
      "body": "簡易組合固定由兩張牌形成，適合初次遊玩；進階組合由三至四張牌形成，分數較高但需要規劃。遊戲指南會清楚標示所需牌數。"
    },
    {
      "title": "效果牌提供調整，不直接破壞對手",
      "body": "效果牌以抽牌、換牌、取回與己方列區加成為主，避免取消對手卡牌或大量扣分造成挫折；使用效果牌同樣會消耗一次行動。"
    },
    {
      "title": "文化標記只表示文化特殊性",
      "body": "常見、珍稀、史詩與傳說只描述文化元素的特殊性、代表性或收藏價值，不增加力量，也不影響守藏者選牌。"
    },
    {
      "title": "牌局之外有七類學習拼圖",
      "body": "文化支線由基礎空間、建築工藝、祭祀文字、地方記憶、研究方法、數位轉譯與保存倫理組成；題目由基礎辨識逐步進入方法與倫理判斷。"
    }
  ],
  "cards": [
    {
      "id": "gatehouse",
      "name": "門樓",
      "type": "space",
      "power": 5,
      "rarity": "常見",
      "icon": "門",
      "effectText": "啟動條件：本卡是己方第一張打出的空間牌。效果：本卡力量 +1。",
      "toastText": "宗祠最外側入口，也是辨識宗祠公共身分與進入秩序的起點。",
      "culturalNote": "門樓位於宗祠最外側，是內外空間的界面與辨識起點。它不只是出入口，也是訪客辨認建築性質、進入宗族空間秩序的第一道節點。",
      "source": "專題表 3-3",
      "valueNote": "門樓保存了宗祠最外層的公共識別。從這裡開始，訪客能清楚辨認建築的宗族性質，也能理解傳統宗祠如何透過入口建立內外有別、主次分明的空間秩序。"
    },
    {
      "id": "forecourt",
      "name": "禾埕",
      "type": "space",
      "power": 4,
      "rarity": "常見",
      "icon": "埕",
      "effectText": "啟動條件：己方場上同時有「門樓」與「前堂」。效果：本卡力量 +1。",
      "toastText": "禾埕是門樓與前堂之間的前場空間，可供集會、活動與曬物使用。",
      "culturalNote": "禾埕位於門樓與前堂之間，是宗祠前場的重要開放空間。它兼具通行、聚會、曬物與臨時活動等功能，也承載流水席、兒時遊戲與社交活動等集體記憶。",
      "source": "專題表 3-3、訪談整理",
      "valueNote": "禾埕的價值在於保存宗祠與日常生活的連結。它不是單純的空地，而是聚會、宴席、曬物與兒時活動曾經發生的地方，能讓建築史與地方生活史被一起看見。"
    },
    {
      "id": "frontHall",
      "name": "前堂",
      "type": "space",
      "power": 4,
      "rarity": "珍稀",
      "icon": "前",
      "effectText": "啟動條件：己方場上有「前堂斗栱彩繪」、「前堂門聯」、「寶樹堂」或「燕尾脊」。效果：任有 1 張指定連動牌時，本卡力量 +1。",
      "toastText": "前堂是由外入內的過渡空間，也是集會與禮儀運作的重要前段。",
      "culturalNote": "前堂位於中軸前段，是由公共外部空間過渡到祭祀核心的關鍵區域。它兼具動線轉接、集會與儀式支援功能，也常與斗栱彩繪、堂號與楹聯一起構成強烈的視覺與教化界面。",
      "source": "專題表 3-3",
      "valueNote": "前堂是謝氏宗祠由公共空間走向祭祀核心的重要轉折。它同時集中匾額、楹聯與木構裝飾，最能呈現宗祠如何把空間、工藝與宗族教化整合在一起。"
    },
    {
      "id": "courtyard",
      "name": "天井",
      "type": "space",
      "power": 4,
      "rarity": "常見",
      "icon": "井",
      "effectText": "啟動條件：己方場上有其他空間牌。效果：每有 1 張其他空間牌，本卡力量 +1，最多 +2。",
      "toastText": "天井提供採光、通風、排水，也是前後堂之間的重要轉換空間。",
      "culturalNote": "天井位於前堂與後堂之間，兼具採光、通風、排水與空間過渡功能。它讓建築內外形成可呼吸的節奏，也使前後空間不至於緊貼，而具有清楚的儀式層次。",
      "source": "專題表 3-3",
      "valueNote": "天井保存了傳統建築因應南部氣候的環境智慧。採光、通風、排水與空間轉換都在這裡發生，也讓前堂與後堂之間形成有層次的儀式動線。"
    },
    {
      "id": "rearHall",
      "name": "後堂",
      "type": "space",
      "power": 3,
      "rarity": "史詩",
      "icon": "後",
      "effectText": "啟動條件：己方場上有「木本水源」或「祖牌與神位」。效果：本卡力量 +1。",
      "toastText": "後堂是宗祠祭祀核心，承接祖先牌位、禮制秩序與祭典運作。",
      "culturalNote": "後堂是謝氏宗祠中軸的核心祭祀空間，祖牌與神位安置於此，並與門額、楹聯與祭儀流程共同構成宗族秩序的中心。它不只是建築深處，也是宗祠最具神聖性與代表性的空間。",
      "source": "專題表 3-3",
      "valueNote": "後堂是整座宗祠最核心的文化空間。祖先祭祀、牌位安置與宗族秩序都集中於此，因此它不只是建築的最深處，也是謝氏宗族歷史與精神認同的中心。"
    },
    {
      "id": "leftWing",
      "name": "左橫屋",
      "type": "space",
      "power": 5,
      "rarity": "常見",
      "icon": "左",
      "effectText": "啟動條件：己方場上有「右橫屋」。效果：本卡力量 +1。",
      "toastText": "左右橫屋與兩堂共同構成客家宗祠常見的格局特色。",
      "culturalNote": "左橫屋屬於宗祠兩側的附屬空間之一，與右橫屋共同形成「兩堂二橫一門樓」的重要格局辨識。它反映宗祠並非單一祭祀盒體，而是一個兼具生活、附屬與組織功能的空間群。",
      "source": "國家文化記憶庫、專題",
      "valueNote": "左橫屋讓我們看見宗祠並非只有祭祀功能。橫屋保存生活、工作與附屬使用的痕跡，也讓『二堂二橫』的客家宗祠格局具有完整性。"
    },
    {
      "id": "rightWing",
      "name": "右橫屋",
      "type": "space",
      "power": 5,
      "rarity": "常見",
      "icon": "右",
      "effectText": "啟動條件：己方場上有「左橫屋」。效果：本卡力量 +1。",
      "toastText": "右橫屋保留附屬空間性質，與中央祭祀空間共同構成完整宗祠。",
      "culturalNote": "右橫屋與左橫屋相對應，構成宗祠兩翼的附屬空間。它不僅協助平衡整體格局，也反映宗祠與居住、工作或其他附屬用途之間的連結。",
      "source": "國家文化記憶庫、專題",
      "valueNote": "右橫屋與左橫屋共同形成兩翼空間，呈現宗祠在祭祀之外仍具有生活與組織功能。這類附屬空間，是理解傳統家族如何共同生活與運作的重要證據。"
    },
    {
      "id": "huatai",
      "name": "化胎",
      "type": "space",
      "power": 4,
      "rarity": "珍稀",
      "icon": "化",
      "effectText": "啟動條件：己方場上有「五行石」或「土地龍神」。效果：本卡力量 +2。",
      "toastText": "化胎位於後堂後方，是後場收束與象徵穩定的關鍵位置。",
      "culturalNote": "化胎位於後堂後方，是後場收束的重要構件或空間部位。它常與五行石、土地龍神等象徵性元素一併理解，表現出安定、靠山與後場護佑的意義。",
      "source": "專題表 3-3、表 4-8",
      "valueNote": "化胎位於後堂後方，是整體空間的收束位置。它所保存的不只是構造形式，也包含傳統社會對靠山、穩定、護佑與風水秩序的理解。"
    },
    {
      "id": "study",
      "name": "橫屋書房",
      "type": "space",
      "power": 4,
      "rarity": "常見",
      "icon": "書",
      "effectText": "啟動條件：己方場上有「左橫屋」或「右橫屋」。效果：本卡力量 +2。",
      "toastText": "部分橫屋後續作為書房、會議與工作空間，反映宗祠功能延續。",
      "culturalNote": "依專題訪談整理，宗祠附屬空間在不同時期曾轉為書房、會議室或工作空間使用。橫屋書房因此象徵宗祠功能並非靜止，而是在生活與組織需求中持續調整。",
      "source": "專題訪談整理",
      "valueNote": "橫屋書房呈現宗祠功能隨時代調整的能力。它讓我們看見文化資產不是只能被靜態保存，也能在尊重原有空間的前提下延續使用、會議與教育功能。"
    },
    {
      "id": "ritualHall",
      "name": "祭祀廳下",
      "type": "space",
      "power": 4,
      "rarity": "珍稀",
      "icon": "祭",
      "effectText": "啟動條件：己方場上有文字牌。效果：任有 1 張文字牌時，本卡力量 +1。",
      "toastText": "祭祀廳下承載祭儀進行，也讓空間與文字禮制在此交會。",
      "culturalNote": "祭祀廳下是祭儀實際運作的重要位置，空間、神位、供器與文字教化在此相互交會。它使「空間」與「文字」不只是並列知識點，而是在祭祀實踐中彼此支撐。",
      "source": "專題第三章",
      "valueNote": "祭祀廳下保存了宗祠真正被使用時的禮儀場景。神位、供器、文字與人的行動都在這裡交會，是理解祭祀制度如何落實於空間的重要位置。"
    },
    {
      "id": "fiveElements",
      "name": "五行石",
      "type": "decoration",
      "power": 5,
      "rarity": "史詩",
      "icon": "五",
      "effectText": "啟動條件：己方場上有「化胎」。效果：本卡力量 +2。",
      "toastText": "五行石常與化胎並置，被用來表現平衡與宇宙秩序的象徵。",
      "culturalNote": "五行石位於化胎壁面或其相關位置，象徵金木水火土五行調和。專題將其視為建築中的宇宙秩序與平衡觀念的可視化表現，也是謝氏宗祠辨識度很高的元素之一。",
      "source": "專題表 3-3、表 4-8",
      "valueNote": "五行石把抽象的五行觀念轉化為可見的建築元素。它具有高度辨識度，也讓後人能從具體構件理解傳統社會對平衡、秩序與環境關係的想像。"
    },
    {
      "id": "landDragon",
      "name": "土地龍神",
      "type": "decoration",
      "power": 4,
      "rarity": "珍稀",
      "icon": "龍",
      "effectText": "啟動條件：己方場上有「化胎」或「後堂」。效果：本卡力量 +2。",
      "toastText": "土地龍神與後場守護、地脈安定及信仰象徵有關。",
      "culturalNote": "土地龍神與宗祠後場空間、守護意涵及風水信仰相互連結。它不只是裝飾性的圖像，也反映宗祠建築與地方信仰、地脈安定及護佑想像之間的關係。",
      "source": "專題訪談整理、表 4-8",
      "valueNote": "土地龍神保存了宗祠建築與地方信仰的連結。它提醒我們，傳統建築的價值不能只看形式，還要理解居民如何透過信仰解釋土地、地脈與空間安全。"
    },
    {
      "id": "heavenIncense",
      "name": "天公爐",
      "type": "decoration",
      "power": 5,
      "rarity": "珍稀",
      "icon": "爐",
      "effectText": "啟動條件：己方場上有「後堂」。效果：本卡力量 +2。",
      "toastText": "天公爐屬宗祠祭祀器物之一，與祭儀實踐及敬天觀念相連。",
      "culturalNote": "天公爐屬於宗祠祭祀文物之一，與祭典行為及宗教性空間實踐相關。它使祭祀空間不僅是靜態建築，也透過器物配置具體化為可被使用的禮儀場域。",
      "source": "專題圖 3-24、表 4-2",
      "valueNote": "天公爐使祭祀空間從靜態建築轉化為實際運作的禮儀場域。它保存敬天與祭祀行為的物質證據，也能幫助觀眾理解宗祠如何被使用。"
    },
    {
      "id": "dougongPainting",
      "name": "前堂斗栱彩繪",
      "type": "decoration",
      "power": 5,
      "rarity": "史詩",
      "icon": "栱",
      "effectText": "啟動條件：己方場上有「前堂」。效果：本卡力量 +2。",
      "toastText": "斗栱彩繪結合結構與裝飾，是前堂最醒目的工藝焦點之一。",
      "culturalNote": "前堂斗栱彩繪兼具結構部位與裝飾語彙雙重意義，呈現匠師工藝、吉祥圖像與視覺重點。抬頭可見的彩繪也使前堂具有明顯的禮儀感與藝術性。",
      "source": "專題表 4-8",
      "valueNote": "前堂斗栱彩繪兼具結構、工藝與審美價值。它集中呈現匠師技術、色彩配置與吉祥寓意，是謝氏宗祠最適合用來說明傳統木構藝術的重點之一。"
    },
    {
      "id": "threeSuccesses",
      "name": "三元及第",
      "type": "decoration",
      "power": 5,
      "rarity": "珍稀",
      "icon": "元",
      "effectText": "啟動條件：己方場上有「後堂」。效果：本卡力量 +2。",
      "toastText": "三元及第對應一直線排列的構件與吉祥寓意。",
      "culturalNote": "專題將後堂廳下棟桁、燈桁與門楣下皮形成的一直線視為「三元及第」意象。它把構造、視覺軸線與科舉吉祥語彙結合在一起，是宗祠中兼具形式與寓意的細部。",
      "source": "專題圖 3-30",
      "valueNote": "『三元及第』把構件排列與吉祥文化連結起來，呈現傳統建築如何藉由視覺秩序寄託功名與家族期待。這種意涵，是保存構件位置與整體關係的重要理由。"
    },
    {
      "id": "sterculiaTree",
      "name": "蘋婆樹",
      "type": "decoration",
      "power": 5,
      "rarity": "史詩",
      "icon": "樹",
      "effectText": "啟動條件：己方場上有「寶樹堂」。效果：本卡力量 +2。",
      "toastText": "蘋婆樹長期陪伴宗祠與聚落，也承載世代生活記憶。",
      "culturalNote": "蘋婆樹不只是植物景觀，更與宗祠及聚落的日常生活緊密相連。專題與訪談指出，其承載孩童遊戲、採果、乘涼與世代記憶，因此在宗祠經驗中具有高度情感辨識度。",
      "source": "專題表 3-3、表 4-8、訪談",
      "valueNote": "蘋婆樹的價值不只在樹齡或景觀，而在於它與宗祠生活共同累積的記憶。孩童遊戲、採果與乘涼等經驗，使自然元素也成為文化資產的一部分。"
    },
    {
      "id": "maleLamp",
      "name": "男燈",
      "type": "decoration",
      "power": 4,
      "rarity": "常見",
      "icon": "男",
      "effectText": "啟動條件：己方場上有「女燈」。效果：本卡力量 +1。",
      "toastText": "男燈與女燈共同構成婚嫁禮俗記憶中的一組重要文物。",
      "culturalNote": "男燈是宗祠婚嫁禮俗脈絡中的文物元素之一。專題訪談將男燈與女燈視為適合轉化為遊戲卡牌的重要題材，用以呈現宗族生活與儀式記憶。",
      "source": "專題訪談整理",
      "valueNote": "男燈保存了宗祠相關婚嫁禮俗的物質記憶。透過這類器物，可以把抽象的家族延續與婚姻制度，轉化為一般人容易理解的生活故事。"
    },
    {
      "id": "femaleLamp",
      "name": "女燈",
      "type": "decoration",
      "power": 4,
      "rarity": "常見",
      "icon": "女",
      "effectText": "啟動條件：己方場上有「男燈」。效果：本卡力量 +1。",
      "toastText": "女燈與男燈成對出現，更能表現婚嫁儀式與家族生活連結。",
      "culturalNote": "女燈與男燈成對理解，能更完整表現宗祠生活中的婚嫁禮俗。這類文物不僅是物件，也承載儀式時的社會關係、家族延續與情感記憶。",
      "source": "專題訪談整理",
      "valueNote": "女燈與男燈成對出現時，更能完整呈現婚嫁儀式與家族關係。這類生活文物讓宗祠文化不只停留在建築，也回到人的生命歷程。"
    },
    {
      "id": "swallowTail",
      "name": "燕尾脊",
      "type": "decoration",
      "power": 6,
      "rarity": "史詩",
      "icon": "燕",
      "effectText": "啟動條件：己方場上有「門樓」或「前堂」。效果：本卡力量 +2。",
      "toastText": "燕尾脊是宗祠外觀辨識度極高的屋脊造型。",
      "culturalNote": "燕尾脊是宗祠外觀上最醒目的造型語彙之一，能立即提升建築辨識度。其上翹的輪廓與屋面線條相互配合，構成謝氏宗祠的視覺印象與地方建築風格的重要部分。",
      "source": "專題訪談整理、建築照片整理",
      "valueNote": "燕尾脊是謝氏宗祠外觀辨識度最高的元素之一。保存屋脊，不只是保存造型，更是保留地方建築風格、工法與整體天際線的重要證據。"
    },
    {
      "id": "longevityBrick",
      "name": "壽字磚",
      "type": "decoration",
      "power": 4,
      "rarity": "常見",
      "icon": "壽",
      "effectText": "啟動條件：己方場上有「前堂」、「後堂」或「祭祀廳下」。效果：本卡力量 +2。",
      "toastText": "壽字磚是具有吉祥寓意的建築細部，也有地方辨識度。",
      "culturalNote": "壽字磚屬於帶有吉祥寓意的裝飾構件，受訪者亦將其視為具有地方辨識度的建築細部。它提醒玩家，宗祠文化並不只存在於大格局，也存在於反覆出現的細節語彙中。",
      "source": "專題訪談整理",
      "valueNote": "壽字磚讓我們看到吉祥觀念如何進入建築細節。它雖然尺度不大，卻能補充宗祠對長壽、福澤與家族延續的價值想像。"
    },
    {
      "id": "harvestPattern",
      "name": "五穀豐收",
      "type": "decoration",
      "power": 4,
      "rarity": "常見",
      "icon": "穀",
      "effectText": "啟動條件：己方場上有「禾埕」。效果：本卡力量 +2。",
      "toastText": "五穀豐收連結農村生活、歲時與禾埕使用情境。",
      "culturalNote": "五穀豐收是與農村生活經驗高度連動的裝飾題材。它與禾埕的活動情境、豐收想像及地方生產記憶互相映照，讓裝飾語彙與生活史脈絡連結起來。",
      "source": "專題訪談整理",
      "valueNote": "五穀豐收把宗祠裝飾與農村生活連在一起。它反映地方社會對生產、歲時與豐收的期待，也讓建築裝飾具有清楚的生活史脈絡。"
    },
    {
      "id": "baoshutang",
      "name": "寶樹堂",
      "type": "text",
      "power": 4,
      "rarity": "史詩",
      "icon": "寶",
      "effectText": "啟動條件：己方場上有「前堂」或「蘋婆樹」。效果：本卡力量 +2。",
      "toastText": "寶樹堂為堂號匾額，具有姓氏認同與堂號標示功能。",
      "culturalNote": "「寶樹堂」為前堂中門上方的堂號匾額。堂號在宗祠系統中具有辨識家族源流、凝聚宗族認同與傳達家聲的功能，與蘋婆樹一同出現時，更能形成記憶與象徵的雙重連結。",
      "source": "專題表 3-4",
      "valueNote": "『寶樹堂』是宗族辨識與家聲傳承的重要文字標誌。堂號讓建築不只是空間，也成為族人確認共同來源與身分認同的文化媒介。"
    },
    {
      "id": "rootSource",
      "name": "木本水源",
      "type": "text",
      "power": 5,
      "rarity": "史詩",
      "icon": "源",
      "effectText": "啟動條件：己方場上有「後堂」。效果：本卡力量 +2。",
      "toastText": "木本水源濃縮了家族源流、報本追遠與祖先記憶。",
      "culturalNote": "「木本水源」位於後堂門額，是宗祠文字系統中最具代表性的核心語句之一。它將家族源流、報本觀念、祖先追念與宗族自我理解凝聚成短短四字。",
      "source": "專題圖 3-18",
      "valueNote": "『木本水源』以四個字濃縮報本追遠的核心價值。它讓觀眾直接理解宗祠存在的理由：記得家族從何而來，並維持祖先、後代與共同體之間的連結。"
    },
    {
      "id": "frontCouplet",
      "name": "前堂門聯",
      "type": "text",
      "power": 4,
      "rarity": "珍稀",
      "icon": "聯",
      "effectText": "啟動條件：己方場上有「前堂」。效果：本卡力量 +2。",
      "toastText": "前堂門聯以典故與家聲語彙勉勵後代，屬入口教化界面。",
      "culturalNote": "前堂門聯位於通往內部的重要位置，藉由歷史典故、家聲語彙與倫理價值勉勵後代。其作用不只是裝飾，更是將宗族價值置於人們經過時必然可見的教化界面。",
      "source": "專題表 3-4",
      "valueNote": "前堂門聯位於人們經常經過的入口位置，具有明顯的教化功能。它將家聲、典故與倫理價值放進日常觀看之中，是建築文字系統的重要部分。"
    },
    {
      "id": "rearCouplet",
      "name": "後堂門聯",
      "type": "text",
      "power": 5,
      "rarity": "珍稀",
      "icon": "禮",
      "effectText": "啟動條件：己方場上有「後堂」。效果：本卡力量 +2。",
      "toastText": "後堂門聯更靠近祭祀核心，內容多與昭穆與祭祀倫理有關。",
      "culturalNote": "後堂門聯位於祭祀核心周邊，因此比前堂門聯更直接地對應祭祀倫理與宗族秩序。它常與昭穆、春祭秋嘗、報本追遠等觀念彼此呼應。",
      "source": "專題表 3-4",
      "valueNote": "後堂門聯靠近祭祀核心，保存昭穆、祭典與孝思等禮制觀念。它讓宗祠的祭祀秩序不只透過空間表現，也透過文字被清楚說明。"
    },
    {
      "id": "ridgeCouplet",
      "name": "棟對：敦倫報本",
      "type": "text",
      "power": 5,
      "rarity": "珍稀",
      "icon": "倫",
      "effectText": "啟動條件：己方場上至少有 3 張空間牌。效果：本卡力量 +3。",
      "toastText": "棟對將敦倫、親誼、追祖與報本等教化語彙集中表達。",
      "culturalNote": "廳下棟對以「敦倫」「報本」等語彙為核心，將人倫秩序、宗族親誼、追祖孝思與教化功能結合。它不是獨立的文字裝飾，而是宗祠精神價值的濃縮表述。",
      "source": "專題表 3-4",
      "valueNote": "『敦倫報本』把宗祠最重視的人倫、親誼與追祖觀念直接說出來。保存這類棟對，有助於理解宗祠如何透過建築文字教育族人。"
    },
    {
      "id": "ancestralTablets",
      "name": "祖牌與神位",
      "type": "text",
      "power": 5,
      "rarity": "傳說",
      "icon": "祖",
      "effectText": "啟動條件：己方場上有「後堂」或「祭祀廳下」。效果：本卡力量 +2。",
      "toastText": "祖牌與神位是宗祠祭祀系統與世系秩序的核心。",
      "culturalNote": "祖牌與神位是宗祠祭祀系統的中心元素，具體呈現祭祀對象、世系脈絡與昭穆秩序。玩家若要理解謝氏宗祠的核心，不可忽略其作為祭祀空間的本質。",
      "source": "專題表 3-4",
      "valueNote": "祖牌與神位是謝氏宗祠作為祭祀空間的核心證據。它們保存世系、祭祀對象與宗族記憶，也是理解宗祠不能只看外觀的關鍵。"
    },
    {
      "id": "hallInscription",
      "name": "謝氏宗祠題字",
      "type": "text",
      "power": 3,
      "rarity": "常見",
      "icon": "謝",
      "effectText": "啟動條件：己方場上有空間牌。效果：每有 1 張空間牌，本卡力量 +1，最多 +3。",
      "toastText": "門樓題字直接標示建築性質，使訪客一眼辨識其宗祠身分。",
      "culturalNote": "「謝氏宗祠」題字位於門樓，具有直接標示建築性質與姓氏主體的功能。它讓進入者在最外層就能清楚辨識此建築不只是住宅或一般堂屋，而是具有宗族公共性的宗祠。",
      "source": "專題表 3-4",
      "valueNote": "『謝氏宗祠』題字讓建築的性質與主體一目了然。它具有公共識別、宗族身分與入口導引功能，是宗祠與一般住宅之間最直接的區別。"
    },
    {
      "id": "springAutumn",
      "name": "春祭秋嘗",
      "type": "text",
      "power": 4,
      "rarity": "珍稀",
      "icon": "祭",
      "effectText": "啟動條件：己方場上至少有 2 張空間牌與 2 張文字牌。效果：本卡力量 +3。",
      "toastText": "春祭秋嘗將季節性祭儀與家族共同體的延續結合起來。",
      "culturalNote": "「春祭秋嘗」濃縮了宗祠定期祭儀的節令性與共同體性。它不僅描述活動頻率，也把祖先追念、家族聚集與宗族延續放進一年循環之中。",
      "source": "專題表 3-4",
      "valueNote": "『春祭秋嘗』保存了祭祀與節令循環的關係。它讓宗祠文化從單次活動延伸為年年重複的共同實踐，展現宗族如何透過祭典維持連結。"
    },
    {
      "id": "ancestorSociety",
      "name": "謝申伯公始祖嘗會",
      "type": "text",
      "power": 4,
      "rarity": "傳說",
      "icon": "會",
      "effectText": "啟動條件：己方三個出牌區皆已有卡牌。效果：本卡力量 +2。",
      "toastText": "嘗會是宗族制度化的重要組織基礎，關聯祭祀、管理與向心力。",
      "culturalNote": "始祖嘗會是宗族制度化的重要組織形式，串連祭祀、資產、聚會、管理與各房之間的向心力。它讓宗祠不只是建築，也是一套持續運作的社會組織。",
      "source": "專題第三章",
      "valueNote": "謝申伯公始祖嘗會顯示宗祠背後有一套長期運作的宗族組織。它串連祭祀、管理、集會與各房合作，說明文化資產的價值也存在於制度與人際網絡之中。"
    },
    {
      "id": "managementResidence",
      "name": "管理人宅第",
      "type": "space",
      "power": 4,
      "rarity": "珍稀",
      "icon": "管",
      "effectText": "啟動條件：己方場上有「謝申伯公始祖嘗會」或「宗親代表大會」。效果：本卡力量 +2。",
      "toastText": "管理人宅第反映宗祠維護、祭祀與組織運作需要長期有人承擔。",
      "culturalNote": "管理人居住與工作空間連結日常維護、修繕決策、祭祀準備與嘗會運作。它提醒我們，文化資產的延續不只依靠建築本體，也依靠持續投入管理的人與制度。",
      "valueNote": "呈現私人宗祠中管理、居住與公共文化功能彼此交織的特性。",
      "source": "專題表 3-2、表 4-9 至表 4-11"
    },
    {
      "id": "phoenixEye",
      "name": "廳下鳳眼",
      "type": "decoration",
      "power": 4,
      "rarity": "珍稀",
      "icon": "鳳",
      "effectText": "啟動條件：己方場上有「祭祀廳下」或「後堂」。效果：本卡力量 +2。",
      "toastText": "鳳眼是廳下木構細部之一，需從位置、構造與裝飾關係共同辨識。",
      "culturalNote": "廳下鳳眼位於重要祭祀空間的木構細部。它不宜只被理解為圖案，而應連同所在位置、構造功能與整體禮制空間一起觀察。",
      "valueNote": "保存建築細部可協助辨識傳統匠作、構造與審美秩序。",
      "source": "專題圖 3-32、圖 3-33"
    },
    {
      "id": "stepBeam",
      "name": "步口通樑",
      "type": "decoration",
      "power": 4,
      "rarity": "常見",
      "icon": "樑",
      "effectText": "啟動條件：己方場上有「前堂」。效果：本卡力量 +2。",
      "toastText": "步口通樑是前堂木構與裝飾觀察的重要節點。",
      "culturalNote": "步口通樑位於前堂木構系統中，既承擔構造關係，也可見圖騰與裝飾處理。理解它時，需要同時看構件位置、受力關係與視覺表現。",
      "valueNote": "呈現傳統建築構造與裝飾並非彼此分離，而是共同形成空間經驗。",
      "source": "專題圖 3-25、圖 3-26"
    },
    {
      "id": "beamBlock",
      "name": "束木圖騰",
      "type": "decoration",
      "power": 4,
      "rarity": "常見",
      "icon": "束",
      "effectText": "啟動條件：己方場上有「步口通樑」或「前堂斗栱彩繪」。效果：本卡力量 +2。",
      "toastText": "束木上的圖騰讓較小的木構節點也能承載工藝與象徵。",
      "culturalNote": "束木屬於木構細節之一，其圖騰與彩繪使構造節點同時成為視覺焦點。觀察這類細部，可理解匠師如何在有限位置中安排圖像與節奏。",
      "valueNote": "細部記錄能補足只看整體立面時容易忽略的工藝資訊。",
      "source": "專題圖 3-27"
    },
    {
      "id": "rearBracketPainting",
      "name": "後堂斗栱彩繪",
      "type": "decoration",
      "power": 5,
      "rarity": "史詩",
      "icon": "後彩",
      "effectText": "啟動條件：己方場上有「後堂」。效果：本卡力量 +2。",
      "toastText": "後堂斗栱彩繪較強調祭祀核心的穩重與秩序。",
      "culturalNote": "後堂斗栱彩繪位於祭祀核心附近，與前堂較外顯的裝飾表現形成對照。其價值在於呈現不同空間層級如何採取不同的工藝語氣。",
      "valueNote": "比較前後堂裝飾可理解建築中的主次、禮制與視覺階序。",
      "source": "專題圖 3-31、第三章第三節"
    },
    {
      "id": "plainBackPainting",
      "name": "背面簡易彩繪",
      "type": "decoration",
      "power": 4,
      "rarity": "常見",
      "icon": "素",
      "effectText": "啟動條件：己方場上有「後堂斗栱彩繪」或「束木圖騰」。效果：本卡力量 +2。",
      "toastText": "較樸素的背面彩繪同樣能說明建築如何分配工藝資源。",
      "culturalNote": "宗祠裝飾並非每一面都追求同樣繁複。重要觀看位置較精緻，次要或背向部位較樸素，反映傳統建築主次分明的構圖與資源配置。",
      "valueNote": "保存樸素部位有助於理解完整工藝系統，而非只保留最華麗的局部。",
      "source": "專題圖 3-29、第三章第三節"
    },
    {
      "id": "familyAssembly",
      "name": "宗親代表大會",
      "type": "text",
      "power": 4,
      "rarity": "珍稀",
      "icon": "會",
      "effectText": "啟動條件：己方場上有「管理人宅第」或「謝申伯公始祖嘗會」。效果：本卡力量 +2。",
      "toastText": "宗祠也曾是宗親議事、代表大會與公共事務運作的空間。",
      "culturalNote": "訪談資料顯示，宗祠除祭祀外，也承擔會議、代表大會與宗族公共事務。這些活動說明建築價值來自持續使用與組織關係，而非只有外觀。",
      "valueNote": "呈現宗祠作為宗族公共治理空間的社會價值。",
      "source": "專題表 4-10、表 4-11"
    },
    {
      "id": "banquet",
      "name": "禾埕流水席",
      "type": "text",
      "power": 4,
      "rarity": "常見",
      "icon": "席",
      "effectText": "啟動條件：己方場上有「禾埕」。效果：本卡力量 +2。",
      "toastText": "流水席讓禾埕從空間名詞轉為可被記憶的集體生活場景。",
      "culturalNote": "禾埕曾承擔祭典準備、聚會與流水席等活動。這類生活經驗使文化資產不只是一座建築，也成為族人共同勞動、飲食與交往的場所。",
      "valueNote": "生活記憶補足正式史料較少記錄的日常文化。",
      "source": "專題訪談整理、表 4-10 至表 4-11"
    },
    {
      "id": "childhoodPlay",
      "name": "禾埕童遊",
      "type": "text",
      "power": 4,
      "rarity": "常見",
      "icon": "遊",
      "effectText": "啟動條件：己方場上有「禾埕」。效果：本卡力量 +2。",
      "toastText": "孩童遊戲記憶顯示宗祠前場也參與不同世代的日常生活。",
      "culturalNote": "訪談中的兒時玩耍經驗，讓禾埕不只是功能性的活動前場，也成為世代記憶與地方情感的載體。口述資料可補充圖面與制度文件看不到的使用方式。",
      "valueNote": "保存文化資產也包含理解人如何在其中生活與形成記憶。",
      "source": "專題訪談整理、表 4-10 至表 4-11"
    },
    {
      "id": "fruitPicking",
      "name": "蘋婆採果記憶",
      "type": "text",
      "power": 4,
      "rarity": "珍稀",
      "icon": "果",
      "effectText": "啟動條件：己方場上有「蘋婆樹」。效果：本卡力量 +2。",
      "toastText": "採果、玩耍與老樹傳說共同形成蘋婆樹的地方情感。",
      "culturalNote": "蘋婆樹的文化意義來自長期陪伴宗祠與族人的生活。採果、玩耍、樹影與相關傳說使自然物成為地方記憶的一部分。",
      "valueNote": "文化資產價值可同時存在於建築、自然環境與生活記憶之中。",
      "source": "專題表 3-3、表 4-8、訪談整理"
    },
    {
      "id": "literatureCrosscheck",
      "name": "文獻互證",
      "type": "effect",
      "power": 0,
      "rarity": "常見",
      "icon": "證",
      "effectType": "draw",
      "amount": 2,
      "effectText": "立即效果：抽 2 張牌。本卡使用後進入墓地，不留在出牌區。",
      "toastText": "不同文獻相互比對，可降低只依單一來源解釋文化資產的風險。",
      "culturalNote": "文獻分析需比較專書、論文、修復計畫、地方文獻與族譜等不同資料，辨認彼此可支持與仍待查證之處。",
      "valueNote": "以來源互證提升文化敘事的可追溯性與可信度。",
      "source": "專題第一章第四節、表 3-5"
    },
    {
      "id": "fieldSurvey",
      "name": "現地踏查",
      "type": "effect",
      "power": 0,
      "rarity": "常見",
      "icon": "查",
      "effectType": "boostLowest",
      "amount": 3,
      "effectText": "立即效果：若場上已有文化牌，本輪目前總分最低的出牌區 +3；若場上為空，改抽 1 張牌。本卡使用後進入墓地。",
      "toastText": "現地踏查可校正文獻與圖面，補充動線、尺度與實際使用狀態。",
      "culturalNote": "現地踏查透過空間觀察、測繪輔助、攝影與影像記錄，確認建築位置、尺度、動線與使用情況。",
      "valueNote": "將書面資料與現場狀態對照，是文化資產研究的重要程序。",
      "source": "專題第一章第四節"
    },
    {
      "id": "oralHistory",
      "name": "口述補白",
      "type": "effect",
      "power": 0,
      "rarity": "珍稀",
      "icon": "述",
      "effectType": "recover",
      "amount": 1,
      "effectText": "立即效果：從己方墓地取回 1 張基礎力量最低的非效果牌；若無牌可取回，改抽 1 張牌。",
      "toastText": "口述資料可補足制度文件未記錄的生活經驗，但仍需辨識記憶與詮釋限制。",
      "culturalNote": "訪談能補充空間使用、祭祀、流水席、童遊與採果等生活記憶；研究者仍應交代受訪者位置、資料性質與可能限制。",
      "valueNote": "讓地方經驗進入文化詮釋，同時保留來源與不確定性。",
      "source": "專題第一章第四節、表 4-9 至表 4-11"
    },
    {
      "id": "repairRecord",
      "name": "修復紀錄",
      "type": "effect",
      "power": 0,
      "rarity": "珍稀",
      "icon": "修",
      "effectType": "boostLowest",
      "amount": 4,
      "effectText": "立即效果：若場上已有文化牌，本輪目前總分最低的出牌區 +4；若場上為空，改抽 1 張牌。本卡使用後進入墓地。",
      "toastText": "修復前後與工法紀錄能把保存過程本身轉化為學習內容。",
      "culturalNote": "修復紀錄不只保存結果，也保存材料、工法、變更與決策脈絡。完整紀錄可供後續維護、教育與研究使用。",
      "valueNote": "保存過程的可追溯性，是文化資產長期維護的重要基礎。",
      "source": "專題第二章第四節、第五章"
    },
    {
      "id": "digitalModel",
      "name": "數位建模",
      "type": "effect",
      "power": 0,
      "rarity": "珍稀",
      "icon": "模",
      "effectType": "boostOccupied",
      "amount": 1,
      "effectText": "立即效果：本輪每個已有卡牌的出牌區各 +1；若尚無出牌區有牌，改抽 1 張牌。",
      "toastText": "數位模型能協助理解空間與細部，但不能取代實地資料與長期維護。",
      "culturalNote": "3D 掃描、建模與虛擬展示可支援空間理解、遠距學習與細部記錄；其限制包括設備、操作門檻、品質控管與後續維運。",
      "valueNote": "數位工具應作為文化理解的輔助，而非脫離來源的視覺替代品。",
      "source": "專題摘要、第四章第三節、第五章"
    },
    {
      "id": "respectSite",
      "name": "尊重場域",
      "type": "effect",
      "power": 0,
      "rarity": "史詩",
      "icon": "尊",
      "effectType": "cycle",
      "amount": 2,
      "effectText": "立即效果：將手牌中基礎力量最低的 1 張非效果牌洗回牌庫，再抽 2 張牌；若無可置換牌，改抽 1 張牌。",
      "toastText": "私人文化資產的推廣必須兼顧所有權人意願、生活安寧、祭祀秩序與必要隱私。",
      "culturalNote": "謝氏宗祠為私人所有文化資產。線上與虛擬推廣的目的，是在降低實地干擾的前提下提供接觸入口，不代表場域必須無限制公開。",
      "valueNote": "文化推廣不能凌駕於權利、生活、祭祀與社群關係之上。",
      "source": "專題研究目的、研究限制、表 5-2"
    }
  ],
  "cardValueNotes": {
    "gatehouse": "門樓保存了宗祠最外層的公共識別。從這裡開始，訪客能清楚辨認建築的宗族性質，也能理解傳統宗祠如何透過入口建立內外有別、主次分明的空間秩序。",
    "forecourt": "禾埕的價值在於保存宗祠與日常生活的連結。它不是單純的空地，而是聚會、宴席、曬物與兒時活動曾經發生的地方，能讓建築史與地方生活史被一起看見。",
    "frontHall": "前堂是謝氏宗祠由公共空間走向祭祀核心的重要轉折。它同時集中匾額、楹聯與木構裝飾，最能呈現宗祠如何把空間、工藝與宗族教化整合在一起。",
    "courtyard": "天井保存了傳統建築因應南部氣候的環境智慧。採光、通風、排水與空間轉換都在這裡發生，也讓前堂與後堂之間形成有層次的儀式動線。",
    "rearHall": "後堂是整座宗祠最核心的文化空間。祖先祭祀、牌位安置與宗族秩序都集中於此，因此它不只是建築的最深處，也是謝氏宗族歷史與精神認同的中心。",
    "leftWing": "左橫屋讓我們看見宗祠並非只有祭祀功能。橫屋保存生活、工作與附屬使用的痕跡，也讓『二堂二橫』的客家宗祠格局具有完整性。",
    "rightWing": "右橫屋與左橫屋共同形成兩翼空間，呈現宗祠在祭祀之外仍具有生活與組織功能。這類附屬空間，是理解傳統家族如何共同生活與運作的重要證據。",
    "huatai": "化胎位於後堂後方，是整體空間的收束位置。它所保存的不只是構造形式，也包含傳統社會對靠山、穩定、護佑與風水秩序的理解。",
    "study": "橫屋書房呈現宗祠功能隨時代調整的能力。它讓我們看見文化資產不是只能被靜態保存，也能在尊重原有空間的前提下延續使用、會議與教育功能。",
    "ritualHall": "祭祀廳下保存了宗祠真正被使用時的禮儀場景。神位、供器、文字與人的行動都在這裡交會，是理解祭祀制度如何落實於空間的重要位置。",
    "fiveElements": "五行石把抽象的五行觀念轉化為可見的建築元素。它具有高度辨識度，也讓後人能從具體構件理解傳統社會對平衡、秩序與環境關係的想像。",
    "landDragon": "土地龍神保存了宗祠建築與地方信仰的連結。它提醒我們，傳統建築的價值不能只看形式，還要理解居民如何透過信仰解釋土地、地脈與空間安全。",
    "heavenIncense": "天公爐使祭祀空間從靜態建築轉化為實際運作的禮儀場域。它保存敬天與祭祀行為的物質證據，也能幫助觀眾理解宗祠如何被使用。",
    "dougongPainting": "前堂斗栱彩繪兼具結構、工藝與審美價值。它集中呈現匠師技術、色彩配置與吉祥寓意，是謝氏宗祠最適合用來說明傳統木構藝術的重點之一。",
    "threeSuccesses": "『三元及第』把構件排列與吉祥文化連結起來，呈現傳統建築如何藉由視覺秩序寄託功名與家族期待。這種意涵，是保存構件位置與整體關係的重要理由。",
    "sterculiaTree": "蘋婆樹的價值不只在樹齡或景觀，而在於它與宗祠生活共同累積的記憶。孩童遊戲、採果與乘涼等經驗，使自然元素也成為文化資產的一部分。",
    "maleLamp": "男燈保存了宗祠相關婚嫁禮俗的物質記憶。透過這類器物，可以把抽象的家族延續與婚姻制度，轉化為一般人容易理解的生活故事。",
    "femaleLamp": "女燈與男燈成對出現時，更能完整呈現婚嫁儀式與家族關係。這類生活文物讓宗祠文化不只停留在建築，也回到人的生命歷程。",
    "swallowTail": "燕尾脊是謝氏宗祠外觀辨識度最高的元素之一。保存屋脊，不只是保存造型，更是保留地方建築風格、工法與整體天際線的重要證據。",
    "longevityBrick": "壽字磚讓我們看到吉祥觀念如何進入建築細節。它雖然尺度不大，卻能補充宗祠對長壽、福澤與家族延續的價值想像。",
    "harvestPattern": "五穀豐收把宗祠裝飾與農村生活連在一起。它反映地方社會對生產、歲時與豐收的期待，也讓建築裝飾具有清楚的生活史脈絡。",
    "baoshutang": "『寶樹堂』是宗族辨識與家聲傳承的重要文字標誌。堂號讓建築不只是空間，也成為族人確認共同來源與身分認同的文化媒介。",
    "rootSource": "『木本水源』以四個字濃縮報本追遠的核心價值。它讓觀眾直接理解宗祠存在的理由：記得家族從何而來，並維持祖先、後代與共同體之間的連結。",
    "frontCouplet": "前堂門聯位於人們經常經過的入口位置，具有明顯的教化功能。它將家聲、典故與倫理價值放進日常觀看之中，是建築文字系統的重要部分。",
    "rearCouplet": "後堂門聯靠近祭祀核心，保存昭穆、祭典與孝思等禮制觀念。它讓宗祠的祭祀秩序不只透過空間表現，也透過文字被清楚說明。",
    "ridgeCouplet": "『敦倫報本』把宗祠最重視的人倫、親誼與追祖觀念直接說出來。保存這類棟對，有助於理解宗祠如何透過建築文字教育族人。",
    "ancestralTablets": "祖牌與神位是謝氏宗祠作為祭祀空間的核心證據。它們保存世系、祭祀對象與宗族記憶，也是理解宗祠不能只看外觀的關鍵。",
    "hallInscription": "『謝氏宗祠』題字讓建築的性質與主體一目了然。它具有公共識別、宗族身分與入口導引功能，是宗祠與一般住宅之間最直接的區別。",
    "springAutumn": "『春祭秋嘗』保存了祭祀與節令循環的關係。它讓宗祠文化從單次活動延伸為年年重複的共同實踐，展現宗族如何透過祭典維持連結。",
    "ancestorSociety": "謝申伯公始祖嘗會顯示宗祠背後有一套長期運作的宗族組織。它串連祭祀、管理、集會與各房合作，說明文化資產的價值也存在於制度與人際網絡之中。"
  },
  "balancePolicy": "本版以高頻率二張簡易組合、較少量三至四張進階組合、平衡起手與低干擾效果牌降低運氣挫折；難度主要由守藏者決策品質決定。"
};
