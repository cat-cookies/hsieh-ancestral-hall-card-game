/* 
 * 謝氏宗祠文化卡牌遊戲 - 卡牌資料
 * 遊戲效果屬本專案之教育遊戲化設計；文化說明依專題報告與公開文化資產資料整理。
 */

window.GAME_DATA = {
  rows: {
    space: { label: "空間牌", icon: "🏛", color: "space" },
    decoration: { label: "裝飾牌", icon: "🎨", color: "decoration" },
    text: { label: "文字牌", icon: "📜", color: "text" }
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

  cards: [
    {
      id: "gatehouse",
      name: "門樓",
      type: "space",
      power: 5,
      rarity: "常見",
      icon: "門",
      effectText: "若為己方最先打出的空間牌，額外 +2。",
      culturalNote: "宗祠最外側入口，界定內外，也是由外部進入宗祠空間秩序的起點。",
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
      culturalNote: "位於門樓與前堂之間，兼具集會、曬物與活動前場功能；訪談亦提及流水席與兒時活動記憶。",
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
      culturalNote: "位於中軸前段，兼具通行、集會與儀式支援，是日常與禮儀之間的過渡空間。",
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
      culturalNote: "位於前後堂之間，具有採光、通風、排水與空間轉換功能。",
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
      culturalNote: "宗祠中軸核心，用於祖先祭祀與牌位安置，是宗族秩序最重要的神聖空間。",
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
      culturalNote: "謝氏宗祠保留客家祠堂「兩堂兩橫一門樓」格局，橫屋構成宗祠兩側的生活與附屬空間。",
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
      culturalNote: "右橫屋及中央祭祀廳堂仍保有空間使用機能，反映宗祠兼具祭祀與生活使用。",
      source: "國家文化記憶庫"
    },
    {
      id: "huatai",
      name: "化胎",
      type: "space",
      power: 4,
      rarity: "珍稀",
      icon: "化",
      effectText: "若五行石或土地龍神在場，額外 +4。",
      culturalNote: "位於後堂後方，作為空間收束與後場依託，具有穩定、護佑與靠山的象徵。",
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
      culturalNote: "訪談指出部分原居住空間後續作為書房、會議室及工作空間使用，呈現宗祠功能的延續與調整。",
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
      culturalNote: "廳下承載神位、祭祀與禮制秩序，空間與文字系統在此交會。",
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
      culturalNote: "位於化胎壁面，象徵五行調和與空間平衡；專題將其定位為建築中的宇宙秩序象徵。",
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
      culturalNote: "土地龍神與宗祠後場、祭祀及風水觀念相連；部分在地解釋仍待更多專業訪談確認。",
      source: "專題訪談初步整理"
    },
    {
      id: "heavenIncense",
      name: "天公爐",
      type: "decoration",
      power: 5,
      rarity: "珍稀",
      icon: "爐",
      effectText: "若後堂在場，額外 +3。",
      culturalNote: "宗祠祭祀文物之一，與祭祀空間及信仰實踐相連。",
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
      culturalNote: "前堂斗栱與彩繪展現匠師工藝、裝飾表現及吉祥寓意，是抬頭可見的視覺焦點。",
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
      culturalNote: "後堂廳下棟桁、燈桁與門楣下皮形成一直線，專題稱其為「三元及第」。",
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
      culturalNote: "老樹長期陪伴宗祠與聚落，承載孩童玩耍、採果及世代生活記憶。",
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
      culturalNote: "訪談將男燈、女燈與迎娶禮俗列為可轉化為文物卡與習俗卡的重要元素。",
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
      culturalNote: "與男燈共同呈現宗祠相關婚嫁禮俗及家族生活記憶。",
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
      culturalNote: "宗祠建築辨識度高的屋脊元素。訪談對其形成原因提出地方記憶，但相關歷史因果仍需審慎查證。",
      source: "專題訪談整理"
    },
    {
      id: "longevityBrick",
      name: "壽字磚",
      type: "decoration",
      power: 4,
      rarity: "常見",
      icon: "壽",
      effectText: "若前堂、後堂或祭祀廳下任一在場，額外 +3。",
      culturalNote: "受訪者將壽字磚列為具有地方辨識度的建築細部，可用於文化卡牌知識點。",
      source: "專題訪談整理"
    },
    {
      id: "harvestPattern",
      name: "五穀豐收圖樣",
      type: "decoration",
      power: 4,
      rarity: "常見",
      icon: "穀",
      effectText: "若禾埕在場，額外 +4。",
      culturalNote: "訪談提出的代表性裝飾題材，與農村生活、豐收想像及禾埕使用情境相連。",
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
      culturalNote: "前堂中門上方堂號匾額，用以凝聚宗族認同並標示姓氏源流。",
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
      culturalNote: "後堂門額文字，將家族源流、祖先記憶與報本觀念濃縮於匾額之中。",
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
      culturalNote: "前堂門聯藉由家聲與歷史典故勉勵後代，承載宗族認同與倫理期待。",
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
      culturalNote: "後堂門聯強調昭穆秩序、春祭秋嘗與祭祀倫理。",
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
      culturalNote: "廳下棟對以敦倫、親誼、追祖與報本為核心，具有教化族人與強化孝思的作用。",
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
      culturalNote: "祖牌與神位具體呈現世系、祭祀對象與宗族秩序，是宗祠祭祀系統的核心。",
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
      culturalNote: "門樓題字標示宗祠性質與空間身分，使訪客在入口即辨識其公共與宗族意義。",
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
      culturalNote: "祭祀文字將季節性祭儀、祖先追念與家族共同體的延續連結起來。",
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
      culturalNote: "嘗會是宗族制度化的重要組織基礎，串連各房戶的祭祀、管理、集會與宗族向心力。",
      source: "專題第三章"
    }
  ]
};
