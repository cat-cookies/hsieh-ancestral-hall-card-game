/*
 * 謝氏宗祠文化卡牌遊戲 - 卡牌資料
 * 文化內容依使用者提供之專題、文化資產資料與本案已查證內容整理；
 * 力量值、加分與組合技點數屬教育遊戲化轉譯設計。
 */

window.GAME_DATA = {
  rows: {
    space: { label: "空間牌", icon: "🏛", color: "space" },
    decoration: { label: "裝飾牌", icon: "🎨", color: "decoration" },
    text: { label: "文字牌", icon: "📜", color: "text" }
  },

  difficultyLabels: {
    easy: "簡單",
    normal: "普通",
    hard: "困難"
  },

  leaders: {
    xieAn: {
      id: "xieAn",
      name: "謝安",
      title: "東山定局",
      icon: "安",
      description: "家族精神與穩定秩序的象徵。",
      abilityName: "東山定局",
      abilityText: "每場限用一次：本輪三個已有卡牌的出牌區各增加 2 點。",
      quote: "先安其局，再成其勢。"
    },
    xieXuan: {
      id: "xieXuan",
      name: "謝玄",
      title: "臨勢轉機",
      icon: "玄",
      description: "行動力與關鍵逆轉的象徵。",
      abilityName: "臨勢轉機",
      abilityText: "每場限用一次：僅在落後時可用，使本輪目前分數最低的出牌區增加 8 點。",
      quote: "困局之中，仍可轉勢。"
    }
  },

  combos: [
    {
      id: "entrance-identity",
      name: "門庭定名",
      row: "text",
      points: 4,
      tier: 1,
      requiresCards: ["gatehouse", "forecourt", "hallInscription"],
      description: "門樓、禾埕與謝氏宗祠題字共同建立入口識別與宗祠身分。"
    },
    {
      id: "paired-lamps",
      name: "燈火成雙",
      row: "decoration",
      points: 4,
      tier: 1,
      requiresCards: ["maleLamp", "femaleLamp"],
      description: "男燈與女燈同場，象徵婚嫁禮俗與家族生活記憶。"
    },
    {
      id: "treasure-tree",
      name: "寶樹相映",
      row: "text",
      points: 4,
      tier: 1,
      requiresCards: ["sterculiaTree", "baoshutang"],
      description: "堂號與蘋婆樹對照宗祠記憶、生活情境與家族象徵。"
    },
    {
      id: "central-axis-lite",
      name: "前後有序",
      row: "space",
      points: 5,
      tier: 1,
      requiresCards: ["frontHall", "courtyard", "rearHall"],
      description: "前堂、天井與後堂形成清楚的中軸轉換與空間節奏。"
    },
    {
      id: "roof-splendor",
      name: "彩堂揚輝",
      row: "decoration",
      points: 7,
      tier: 2,
      requiresCards: ["frontHall", "dougongPainting", "swallowTail", "baoshutang"],
      description: "前堂、斗栱彩繪、燕尾脊與堂號匾額共同展現外觀識別與裝飾重點。"
    },
    {
      id: "five-elements-guard",
      name: "五行護脈",
      row: "decoration",
      points: 6,
      tier: 2,
      requiresCards: ["huatai", "fiveElements", "landDragon"],
      description: "化胎、五行石與土地龍神形成後場穩定、護佑與宇宙秩序的象徵系統。"
    },
    {
      id: "ritual-order",
      name: "禮序成章",
      row: "text",
      points: 6,
      tier: 2,
      requiresCards: ["rearHall", "rootSource", "ancestralTablets"],
      description: "後堂、木本水源與祖牌神位共同指向祭祀、報本與昭穆秩序。"
    },
    {
      id: "festival-rite",
      name: "祭典全備",
      row: "text",
      points: 8,
      tier: 2,
      requiresCards: ["ritualHall", "heavenIncense", "springAutumn", "ancestralTablets"],
      description: "祭祀廳下、天公爐、春祭秋嘗與祖牌神位共同完成祭祀場景。"
    },
    {
      id: "teaching-lineage",
      name: "教化傳家",
      row: "text",
      points: 6,
      tier: 2,
      requiresCards: ["study", "ridgeCouplet", "ancestorSociety"],
      description: "橫屋書房、敦倫報本棟對與始祖嘗會共同表現宗族教化與組織運作。"
    },
    {
      id: "two-halls-two-wings",
      name: "二堂二橫",
      row: "space",
      points: 8,
      tier: 3,
      requiresCards: ["frontHall", "rearHall", "leftWing", "rightWing"],
      description: "前堂、後堂與左右橫屋共同構成客家宗祠重要格局辨識。"
    },
    {
      id: "central-axis",
      name: "中軸成序",
      row: "space",
      points: 7,
      tier: 3,
      requiresCards: ["gatehouse", "forecourt", "frontHall", "courtyard", "rearHall"],
      description: "由門樓、禾埕、前堂、天井到後堂的完整中軸線明確建立。"
    },
    {
      id: "ancestral-cosmos",
      name: "宗祠全景",
      row: "space",
      points: 10,
      tier: 4,
      requiresCombos: ["two-halls-two-wings", "central-axis", "ritual-order"],
      description: "當格局、動線與祭祀秩序同時成立時，形成整體性的宗祠文化圖景。"
    }
  ],

  tutorialSteps: [
    {
      title: "歡迎來到宗族牌局",
      body: "你將在三輪之內與電腦對手比高低。每輪雙方輪流出牌，直到都選擇 PASS 為止；本輪總分較高者拿下一個勝場。"
    },
    {
      title: "先看三類卡牌",
      body: "空間牌對應宗祠格局與場域，裝飾牌對應屋脊、彩繪、文物與樹木，文字牌則對應堂號、匾額、楹聯與祭祀文字。很多卡牌在一起時會互相加分。"
    },
    {
      title: "開局先換牌",
      body: "第一輪開局前可換至多 3 張手牌。若手上卡牌彼此沒有連動，或高分牌太少、太多，都可以在此重新調整。第二、三輪補牌後各還有一次少量換牌機會。"
    },
    {
      title: "回合只有三種行動",
      body: "輪到你時，只能做三件事之一：打出一張牌、啟動一次領主能力、或直接 PASS。手牌點一下會提起或放回，快速點兩下才會出牌；一旦 PASS，本輪就不能再出手。"
    },
    {
      title: "組合技不會事先提示",
      body: "本作刻意不在場上顯示組合技提示。你需要從規則與牌面說明自行記住哪些元素可以相連。當你真的打成組合時，系統才會以動畫與紀錄通知你已成功觸發。"
    },
    {
      title: "隨時可查看完整說明",
      body: "在手牌上按滑鼠右鍵，或點擊場上卡牌，就能查看該牌的遊戲效果、文化說明與來源。熟悉後即可開始挑戰不同難度。"
    }
  ],

  cards: [
    {
      id: "gatehouse",
      name: "門樓",
      type: "space",
      power: 5,
      rarity: "常見",
      icon: "門",
      effectText: "若為己方最先打出的空間牌，額外 +2。",
      toastText: "宗祠最外側入口，也是辨識宗祠公共身分與進入秩序的起點。",
      culturalNote: "門樓位於宗祠最外側，是內外空間的界面與辨識起點。它不只是出入口，也是訪客辨認建築性質、進入宗族空間秩序的第一道節點。",
      source: "專題表 3-3"
    },
    {
      id: "forecourt",
      name: "禾埕",
      type: "space",
      power: 5,
      rarity: "常見",
      icon: "埕",
      effectText: "若門樓與前堂皆在場，額外 +4。",
      toastText: "禾埕是門樓與前堂之間的前場空間，可供集會、活動與曬物使用。",
      culturalNote: "禾埕位於門樓與前堂之間，是宗祠前場的重要開放空間。它兼具通行、聚會、曬物與臨時活動等功能，也承載流水席、兒時遊戲與社交活動等集體記憶。",
      source: "專題表 3-3、訪談整理"
    },
    {
      id: "frontHall",
      name: "前堂",
      type: "space",
      power: 6,
      rarity: "珍稀",
      icon: "前",
      effectText: "場上每有一張與前堂相連的裝飾或文字牌，最多額外 +4。",
      toastText: "前堂是由外入內的過渡空間，也是集會與禮儀運作的重要前段。",
      culturalNote: "前堂位於中軸前段，是由公共外部空間過渡到祭祀核心的關鍵區域。它兼具動線轉接、集會與儀式支援功能，也常與斗栱彩繪、堂號與楹聯一起構成強烈的視覺與教化界面。",
      source: "專題表 3-3"
    },
    {
      id: "courtyard",
      name: "天井",
      type: "space",
      power: 4,
      rarity: "常見",
      icon: "井",
      effectText: "己方每有一張其他空間牌，最多額外 +4。",
      toastText: "天井提供採光、通風、排水，也是前後堂之間的重要轉換空間。",
      culturalNote: "天井位於前堂與後堂之間，兼具採光、通風、排水與空間過渡功能。它讓建築內外形成可呼吸的節奏，也使前後空間不至於緊貼，而具有清楚的儀式層次。",
      source: "專題表 3-3"
    },
    {
      id: "rearHall",
      name: "後堂",
      type: "space",
      power: 7,
      rarity: "史詩",
      icon: "後",
      effectText: "若「木本水源」或「祖牌與神位」在場，額外 +4。",
      toastText: "後堂是宗祠祭祀核心，承接祖先牌位、禮制秩序與祭典運作。",
      culturalNote: "後堂是謝氏宗祠中軸的核心祭祀空間，祖牌與神位安置於此，並與門額、楹聯與祭儀流程共同構成宗族秩序的中心。它不只是建築深處，也是宗祠最具神聖性與代表性的空間。",
      source: "專題表 3-3"
    },
    {
      id: "leftWing",
      name: "左橫屋",
      type: "space",
      power: 5,
      rarity: "常見",
      icon: "左",
      effectText: "若右橫屋在場，額外 +3。",
      toastText: "左右橫屋與兩堂共同構成客家宗祠常見的格局特色。",
      culturalNote: "左橫屋屬於宗祠兩側的附屬空間之一，與右橫屋共同形成「兩堂二橫一門樓」的重要格局辨識。它反映宗祠並非單一祭祀盒體，而是一個兼具生活、附屬與組織功能的空間群。",
      source: "國家文化記憶庫、專題"
    },
    {
      id: "rightWing",
      name: "右橫屋",
      type: "space",
      power: 5,
      rarity: "常見",
      icon: "右",
      effectText: "若左橫屋在場，額外 +3。",
      toastText: "右橫屋保留附屬空間性質，與中央祭祀空間共同構成完整宗祠。",
      culturalNote: "右橫屋與左橫屋相對應，構成宗祠兩翼的附屬空間。它不僅協助平衡整體格局，也反映宗祠與居住、工作或其他附屬用途之間的連結。",
      source: "國家文化記憶庫、專題"
    },
    {
      id: "huatai",
      name: "化胎",
      type: "space",
      power: 4,
      rarity: "珍稀",
      icon: "化",
      effectText: "若五行石或土地龍神在場，額外 +4。",
      toastText: "化胎位於後堂後方，是後場收束與象徵穩定的關鍵位置。",
      culturalNote: "化胎位於後堂後方，是後場收束的重要構件或空間部位。它常與五行石、土地龍神等象徵性元素一併理解，表現出安定、靠山與後場護佑的意義。",
      source: "專題表 3-3、表 4-8"
    },
    {
      id: "study",
      name: "橫屋書房",
      type: "space",
      power: 4,
      rarity: "常見",
      icon: "書",
      effectText: "若任一橫屋在場，額外 +3。",
      toastText: "部分橫屋後續作為書房、會議與工作空間，反映宗祠功能延續。",
      culturalNote: "依專題訪談整理，宗祠附屬空間在不同時期曾轉為書房、會議室或工作空間使用。橫屋書房因此象徵宗祠功能並非靜止，而是在生活與組織需求中持續調整。",
      source: "專題訪談整理"
    },
    {
      id: "ritualHall",
      name: "祭祀廳下",
      type: "space",
      power: 6,
      rarity: "珍稀",
      icon: "祭",
      effectText: "己方每有一張文字牌，最多額外 +4。",
      toastText: "祭祀廳下承載祭儀進行，也讓空間與文字禮制在此交會。",
      culturalNote: "祭祀廳下是祭儀實際運作的重要位置，空間、神位、供器與文字教化在此相互交會。它使「空間」與「文字」不只是並列知識點，而是在祭祀實踐中彼此支撐。",
      source: "專題第三章"
    },

    {
      id: "fiveElements",
      name: "五行石",
      type: "decoration",
      power: 5,
      rarity: "史詩",
      icon: "五",
      effectText: "若化胎在場，額外 +5。",
      toastText: "五行石常與化胎並置，被用來表現平衡與宇宙秩序的象徵。",
      culturalNote: "五行石位於化胎壁面或其相關位置，象徵金木水火土五行調和。專題將其視為建築中的宇宙秩序與平衡觀念的可視化表現，也是謝氏宗祠辨識度很高的元素之一。",
      source: "專題表 3-3、表 4-8"
    },
    {
      id: "landDragon",
      name: "土地龍神",
      type: "decoration",
      power: 4,
      rarity: "珍稀",
      icon: "龍",
      effectText: "若化胎或後堂在場，額外 +4。",
      toastText: "土地龍神與後場守護、地脈安定及信仰象徵有關。",
      culturalNote: "土地龍神與宗祠後場空間、守護意涵及風水信仰相互連結。它不只是裝飾性的圖像，也反映宗祠建築與地方信仰、地脈安定及護佑想像之間的關係。",
      source: "專題訪談整理、表 4-8"
    },
    {
      id: "heavenIncense",
      name: "天公爐",
      type: "decoration",
      power: 5,
      rarity: "珍稀",
      icon: "爐",
      effectText: "若後堂在場，額外 +3。",
      toastText: "天公爐屬宗祠祭祀器物之一，與祭儀實踐及敬天觀念相連。",
      culturalNote: "天公爐屬於宗祠祭祀文物之一，與祭典行為及宗教性空間實踐相關。它使祭祀空間不僅是靜態建築，也透過器物配置具體化為可被使用的禮儀場域。",
      source: "專題圖 3-24、表 4-2"
    },
    {
      id: "dougongPainting",
      name: "前堂斗栱彩繪",
      type: "decoration",
      power: 6,
      rarity: "史詩",
      icon: "栱",
      effectText: "若前堂在場，額外 +5。",
      toastText: "斗栱彩繪結合結構與裝飾，是前堂最醒目的工藝焦點之一。",
      culturalNote: "前堂斗栱彩繪兼具結構部位與裝飾語彙雙重意義，呈現匠師工藝、吉祥圖像與視覺重點。抬頭可見的彩繪也使前堂具有明顯的禮儀感與藝術性。",
      source: "專題表 4-8"
    },
    {
      id: "threeSuccesses",
      name: "三元及第",
      type: "decoration",
      power: 5,
      rarity: "珍稀",
      icon: "元",
      effectText: "若後堂在場，額外 +4。",
      toastText: "三元及第對應一直線排列的構件與吉祥寓意。",
      culturalNote: "專題將後堂廳下棟桁、燈桁與門楣下皮形成的一直線視為「三元及第」意象。它把構造、視覺軸線與科舉吉祥語彙結合在一起，是宗祠中兼具形式與寓意的細部。",
      source: "專題圖 3-30"
    },
    {
      id: "sterculiaTree",
      name: "蘋婆樹",
      type: "decoration",
      power: 5,
      rarity: "史詩",
      icon: "樹",
      effectText: "若「寶樹堂」在場，額外 +5。",
      toastText: "蘋婆樹長期陪伴宗祠與聚落，也承載世代生活記憶。",
      culturalNote: "蘋婆樹不只是植物景觀，更與宗祠及聚落的日常生活緊密相連。專題與訪談指出，其承載孩童遊戲、採果、乘涼與世代記憶，因此在宗祠經驗中具有高度情感辨識度。",
      source: "專題表 3-3、表 4-8、訪談"
    },
    {
      id: "maleLamp",
      name: "男燈",
      type: "decoration",
      power: 4,
      rarity: "常見",
      icon: "男",
      effectText: "若女燈在場，額外 +4。",
      toastText: "男燈與女燈共同構成婚嫁禮俗記憶中的一組重要文物。",
      culturalNote: "男燈是宗祠婚嫁禮俗脈絡中的文物元素之一。專題訪談將男燈與女燈視為適合轉化為遊戲卡牌的重要題材，用以呈現宗族生活與儀式記憶。",
      source: "專題訪談整理"
    },
    {
      id: "femaleLamp",
      name: "女燈",
      type: "decoration",
      power: 4,
      rarity: "常見",
      icon: "女",
      effectText: "若男燈在場，額外 +4。",
      toastText: "女燈與男燈成對出現，更能表現婚嫁儀式與家族生活連結。",
      culturalNote: "女燈與男燈成對理解，能更完整表現宗祠生活中的婚嫁禮俗。這類文物不僅是物件，也承載儀式時的社會關係、家族延續與情感記憶。",
      source: "專題訪談整理"
    },
    {
      id: "swallowTail",
      name: "燕尾脊",
      type: "decoration",
      power: 6,
      rarity: "史詩",
      icon: "燕",
      effectText: "若門樓或前堂在場，額外 +3。",
      toastText: "燕尾脊是宗祠外觀辨識度極高的屋脊造型。",
      culturalNote: "燕尾脊是宗祠外觀上最醒目的造型語彙之一，能立即提升建築辨識度。其上翹的輪廓與屋面線條相互配合，構成謝氏宗祠的視覺印象與地方建築風格的重要部分。",
      source: "專題訪談整理、建築照片整理"
    },
    {
      id: "longevityBrick",
      name: "壽字磚",
      type: "decoration",
      power: 4,
      rarity: "常見",
      icon: "壽",
      effectText: "若前堂、後堂或祭祀廳下任一在場，額外 +3。",
      toastText: "壽字磚是具有吉祥寓意的建築細部，也有地方辨識度。",
      culturalNote: "壽字磚屬於帶有吉祥寓意的裝飾構件，受訪者亦將其視為具有地方辨識度的建築細部。它提醒玩家，宗祠文化並不只存在於大格局，也存在於反覆出現的細節語彙中。",
      source: "專題訪談整理"
    },
    {
      id: "harvestPattern",
      name: "五穀豐收",
      type: "decoration",
      power: 4,
      rarity: "常見",
      icon: "穀",
      effectText: "若禾埕在場，額外 +4。",
      toastText: "五穀豐收連結農村生活、歲時與禾埕使用情境。",
      culturalNote: "五穀豐收是與農村生活經驗高度連動的裝飾題材。它與禾埕的活動情境、豐收想像及地方生產記憶互相映照，讓裝飾語彙與生活史脈絡連結起來。",
      source: "專題訪談整理"
    },

    {
      id: "baoshutang",
      name: "寶樹堂",
      type: "text",
      power: 4,
      rarity: "史詩",
      icon: "寶",
      effectText: "若前堂或蘋婆樹在場，額外 +5。",
      toastText: "寶樹堂為堂號匾額，具有姓氏認同與堂號標示功能。",
      culturalNote: "「寶樹堂」為前堂中門上方的堂號匾額。堂號在宗祠系統中具有辨識家族源流、凝聚宗族認同與傳達家聲的功能，與蘋婆樹一同出現時，更能形成記憶與象徵的雙重連結。",
      source: "專題表 3-4"
    },
    {
      id: "rootSource",
      name: "木本水源",
      type: "text",
      power: 5,
      rarity: "史詩",
      icon: "源",
      effectText: "若後堂在場，額外 +5。",
      toastText: "木本水源濃縮了家族源流、報本追遠與祖先記憶。",
      culturalNote: "「木本水源」位於後堂門額，是宗祠文字系統中最具代表性的核心語句之一。它將家族源流、報本觀念、祖先追念與宗族自我理解凝聚成短短四字。",
      source: "專題圖 3-18"
    },
    {
      id: "frontCouplet",
      name: "前堂門聯",
      type: "text",
      power: 4,
      rarity: "珍稀",
      icon: "聯",
      effectText: "若前堂在場，額外 +4。",
      toastText: "前堂門聯以典故與家聲語彙勉勵後代，屬入口教化界面。",
      culturalNote: "前堂門聯位於通往內部的重要位置，藉由歷史典故、家聲語彙與倫理價值勉勵後代。其作用不只是裝飾，更是將宗族價值置於人們經過時必然可見的教化界面。",
      source: "專題表 3-4"
    },
    {
      id: "rearCouplet",
      name: "後堂門聯",
      type: "text",
      power: 5,
      rarity: "珍稀",
      icon: "禮",
      effectText: "若後堂在場，額外 +4。",
      toastText: "後堂門聯更靠近祭祀核心，內容多與昭穆與祭祀倫理有關。",
      culturalNote: "後堂門聯位於祭祀核心周邊，因此比前堂門聯更直接地對應祭祀倫理與宗族秩序。它常與昭穆、春祭秋嘗、報本追遠等觀念彼此呼應。",
      source: "專題表 3-4"
    },
    {
      id: "ridgeCouplet",
      name: "棟對：敦倫報本",
      type: "text",
      power: 5,
      rarity: "珍稀",
      icon: "倫",
      effectText: "若己方已有至少 3 張空間牌，額外 +5。",
      toastText: "棟對將敦倫、親誼、追祖與報本等教化語彙集中表達。",
      culturalNote: "廳下棟對以「敦倫」「報本」等語彙為核心，將人倫秩序、宗族親誼、追祖孝思與教化功能結合。它不是獨立的文字裝飾，而是宗祠精神價值的濃縮表述。",
      source: "專題表 3-4"
    },
    {
      id: "ancestralTablets",
      name: "祖牌與神位",
      type: "text",
      power: 6,
      rarity: "傳說",
      icon: "祖",
      effectText: "若後堂或祭祀廳下在場，額外 +5。",
      toastText: "祖牌與神位是宗祠祭祀系統與世系秩序的核心。",
      culturalNote: "祖牌與神位是宗祠祭祀系統的中心元素，具體呈現祭祀對象、世系脈絡與昭穆秩序。玩家若要理解謝氏宗祠的核心，不可忽略其作為祭祀空間的本質。",
      source: "專題表 3-4"
    },
    {
      id: "hallInscription",
      name: "謝氏宗祠題字",
      type: "text",
      power: 3,
      rarity: "常見",
      icon: "謝",
      effectText: "己方每有一張空間牌，本卡最多額外 +5。",
      toastText: "門樓題字直接標示建築性質，使訪客一眼辨識其宗祠身分。",
      culturalNote: "「謝氏宗祠」題字位於門樓，具有直接標示建築性質與姓氏主體的功能。它讓進入者在最外層就能清楚辨識此建築不只是住宅或一般堂屋，而是具有宗族公共性的宗祠。",
      source: "專題表 3-4"
    },
    {
      id: "springAutumn",
      name: "春祭秋嘗",
      type: "text",
      power: 4,
      rarity: "珍稀",
      icon: "祭",
      effectText: "若己方至少有 2 張空間牌與 2 張文字牌，額外 +6。",
      toastText: "春祭秋嘗將季節性祭儀與家族共同體的延續結合起來。",
      culturalNote: "「春祭秋嘗」濃縮了宗祠定期祭儀的節令性與共同體性。它不僅描述活動頻率，也把祖先追念、家族聚集與宗族延續放進一年循環之中。",
      source: "專題表 3-4"
    },
    {
      id: "ancestorSociety",
      name: "謝申伯公始祖嘗會",
      type: "text",
      power: 5,
      rarity: "傳說",
      icon: "會",
      effectText: "若己方三個出牌區皆有卡牌，額外 +6。",
      toastText: "嘗會是宗族制度化的重要組織基礎，關聯祭祀、管理與向心力。",
      culturalNote: "始祖嘗會是宗族制度化的重要組織形式，串連祭祀、資產、聚會、管理與各房之間的向心力。它讓宗祠不只是建築，也是一套持續運作的社會組織。",
      source: "專題第三章"
    }
  ]
};

/* 文化資產簡報式教學補充：以口語通順方式說明每張卡牌所彰顯的保存價值。 */
window.GAME_DATA.cardValueNotes = {
  gatehouse: "門樓保存了宗祠最外層的公共識別。從這裡開始，訪客能清楚辨認建築的宗族性質，也能理解傳統宗祠如何透過入口建立內外有別、主次分明的空間秩序。",
  forecourt: "禾埕的價值在於保存宗祠與日常生活的連結。它不是單純的空地，而是聚會、宴席、曬物與兒時活動曾經發生的地方，能讓建築史與地方生活史被一起看見。",
  frontHall: "前堂是謝氏宗祠由公共空間走向祭祀核心的重要轉折。它同時集中匾額、楹聯與木構裝飾，最能呈現宗祠如何把空間、工藝與宗族教化整合在一起。",
  courtyard: "天井保存了傳統建築因應南部氣候的環境智慧。採光、通風、排水與空間轉換都在這裡發生，也讓前堂與後堂之間形成有層次的儀式動線。",
  rearHall: "後堂是整座宗祠最核心的文化空間。祖先祭祀、牌位安置與宗族秩序都集中於此，因此它不只是建築的最深處，也是謝氏宗族歷史與精神認同的中心。",
  leftWing: "左橫屋讓我們看見宗祠並非只有祭祀功能。橫屋保存生活、工作與附屬使用的痕跡，也讓『二堂二橫』的客家宗祠格局具有完整性。",
  rightWing: "右橫屋與左橫屋共同形成兩翼空間，呈現宗祠在祭祀之外仍具有生活與組織功能。這類附屬空間，是理解傳統家族如何共同生活與運作的重要證據。",
  huatai: "化胎位於後堂後方，是整體空間的收束位置。它所保存的不只是構造形式，也包含傳統社會對靠山、穩定、護佑與風水秩序的理解。",
  study: "橫屋書房呈現宗祠功能隨時代調整的能力。它讓我們看見文化資產不是只能被靜態保存，也能在尊重原有空間的前提下延續使用、會議與教育功能。",
  ritualHall: "祭祀廳下保存了宗祠真正被使用時的禮儀場景。神位、供器、文字與人的行動都在這裡交會，是理解祭祀制度如何落實於空間的重要位置。",
  fiveElements: "五行石把抽象的五行觀念轉化為可見的建築元素。它具有高度辨識度，也讓後人能從具體構件理解傳統社會對平衡、秩序與環境關係的想像。",
  landDragon: "土地龍神保存了宗祠建築與地方信仰的連結。它提醒我們，傳統建築的價值不能只看形式，還要理解居民如何透過信仰解釋土地、地脈與空間安全。",
  heavenIncense: "天公爐使祭祀空間從靜態建築轉化為實際運作的禮儀場域。它保存敬天與祭祀行為的物質證據，也能幫助觀眾理解宗祠如何被使用。",
  dougongPainting: "前堂斗栱彩繪兼具結構、工藝與審美價值。它集中呈現匠師技術、色彩配置與吉祥寓意，是謝氏宗祠最適合用來說明傳統木構藝術的重點之一。",
  threeSuccesses: "『三元及第』把構件排列與吉祥文化連結起來，呈現傳統建築如何藉由視覺秩序寄託功名與家族期待。這種意涵，是保存構件位置與整體關係的重要理由。",
  sterculiaTree: "蘋婆樹的價值不只在樹齡或景觀，而在於它與宗祠生活共同累積的記憶。孩童遊戲、採果與乘涼等經驗，使自然元素也成為文化資產的一部分。",
  maleLamp: "男燈保存了宗祠相關婚嫁禮俗的物質記憶。透過這類器物，可以把抽象的家族延續與婚姻制度，轉化為一般人容易理解的生活故事。",
  femaleLamp: "女燈與男燈成對出現時，更能完整呈現婚嫁儀式與家族關係。這類生活文物讓宗祠文化不只停留在建築，也回到人的生命歷程。",
  swallowTail: "燕尾脊是謝氏宗祠外觀辨識度最高的元素之一。保存屋脊，不只是保存造型，更是保留地方建築風格、工法與整體天際線的重要證據。",
  longevityBrick: "壽字磚讓我們看到吉祥觀念如何進入建築細節。它雖然尺度不大，卻能補充宗祠對長壽、福澤與家族延續的價值想像。",
  harvestPattern: "五穀豐收把宗祠裝飾與農村生活連在一起。它反映地方社會對生產、歲時與豐收的期待，也讓建築裝飾具有清楚的生活史脈絡。",
  baoshutang: "『寶樹堂』是宗族辨識與家聲傳承的重要文字標誌。堂號讓建築不只是空間，也成為族人確認共同來源與身分認同的文化媒介。",
  rootSource: "『木本水源』以四個字濃縮報本追遠的核心價值。它讓觀眾直接理解宗祠存在的理由：記得家族從何而來，並維持祖先、後代與共同體之間的連結。",
  frontCouplet: "前堂門聯位於人們經常經過的入口位置，具有明顯的教化功能。它將家聲、典故與倫理價值放進日常觀看之中，是建築文字系統的重要部分。",
  rearCouplet: "後堂門聯靠近祭祀核心，保存昭穆、祭典與孝思等禮制觀念。它讓宗祠的祭祀秩序不只透過空間表現，也透過文字被清楚說明。",
  ridgeCouplet: "『敦倫報本』把宗祠最重視的人倫、親誼與追祖觀念直接說出來。保存這類棟對，有助於理解宗祠如何透過建築文字教育族人。",
  ancestralTablets: "祖牌與神位是謝氏宗祠作為祭祀空間的核心證據。它們保存世系、祭祀對象與宗族記憶，也是理解宗祠不能只看外觀的關鍵。",
  hallInscription: "『謝氏宗祠』題字讓建築的性質與主體一目了然。它具有公共識別、宗族身分與入口導引功能，是宗祠與一般住宅之間最直接的區別。",
  springAutumn: "『春祭秋嘗』保存了祭祀與節令循環的關係。它讓宗祠文化從單次活動延伸為年年重複的共同實踐，展現宗族如何透過祭典維持連結。",
  ancestorSociety: "謝申伯公始祖嘗會顯示宗祠背後有一套長期運作的宗族組織。它串連祭祀、管理、集會與各房合作，說明文化資產的價值也存在於制度與人際網絡之中。"
};

window.GAME_DATA.cards.forEach((card) => {
  card.valueNote = window.GAME_DATA.cardValueNotes[card.id] || "這張卡牌呈現謝氏宗祠歷史、空間、工藝或禮制的一個重要面向，透過保存與解說，可協助大眾理解文化資產的整體價值。";
});
