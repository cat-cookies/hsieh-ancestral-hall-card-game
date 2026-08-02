/* English data resource: loaded only by English pages. */
window.GAME_DATA = {
  "rows": {
    "space": {
      "label": "Space Card",
      "icon": "🏛",
      "color": "space"
    },
    "decoration": {
      "label": "Ornament Card",
      "icon": "🎨",
      "color": "decoration"
    },
    "text": {
      "label": "Inscription Card",
      "icon": "📜",
      "color": "text"
    }
  },
  "difficultyLabels": {
    "easy": "Easy",
    "normal": "Normal",
    "hard": "Hard"
  },
  "leaders": {
    "xieAn": {
      "id": "xieAn",
      "name": "Xie An",
      "title": "Settling the Eastern Hills",
      "icon": "A",
      "description": "A symbol of composure and ordered judgment.",
      "abilityName": "Settling the Eastern Hills",
      "abilityText": "Once per match: each occupied row gains 2 points.",
      "quote": "Settle the field before shaping the outcome."
    },
    "xieXuan": {
      "id": "xieXuan",
      "name": "Xie Xuan",
      "title": "Turning the Tide",
      "icon": "X",
      "description": "A symbol of decisive action at a critical moment.",
      "abilityName": "Turning the Tide",
      "abilityText": "Once per match, while behind: the lowest-scoring occupied row gains 8 points.",
      "quote": "A difficult position can still be turned."
    }
  },
  "combos": [
    {
      "id": "entrance-identity",
      "name": "Naming the Threshold",
      "row": "text",
      "points": 4,
      "tier": 1,
      "requiresCards": [
        "gatehouse",
        "forecourt",
        "hallInscription"
      ],
      "description": "Gatehouse, forecourt, and the hall inscription establish the entrance sequence and the identity of the ancestral hall."
    },
    {
      "id": "paired-lamps",
      "name": "Paired Lanterns",
      "row": "decoration",
      "points": 4,
      "tier": 1,
      "requiresCards": [
        "maleLamp",
        "femaleLamp"
      ],
      "description": "The male and female lanterns recall marriage customs and family life."
    },
    {
      "id": "treasure-tree",
      "name": "The Hall and the Tree",
      "row": "text",
      "points": 4,
      "tier": 1,
      "requiresCards": [
        "sterculiaTree",
        "baoshutang"
      ],
      "description": "The Baoshu Hall plaque and the Sterculia tree join lineage symbolism with lived memory."
    },
    {
      "id": "central-axis-lite",
      "name": "Ordered Front and Rear",
      "row": "space",
      "points": 5,
      "tier": 1,
      "requiresCards": [
        "frontHall",
        "courtyard",
        "rearHall"
      ],
      "description": "Front hall, courtyard, and rear hall form a clear axial progression."
    },
    {
      "id": "roof-splendor",
      "name": "Radiance of the Painted Hall",
      "row": "decoration",
      "points": 7,
      "tier": 2,
      "requiresCards": [
        "frontHall",
        "dougongPainting",
        "swallowTail",
        "baoshutang"
      ],
      "description": "Front hall, painted bracket sets, swallowtail ridge, and hall plaque create a strong architectural identity."
    },
    {
      "id": "five-elements-guard",
      "name": "Five-Element Protection",
      "row": "decoration",
      "points": 6,
      "tier": 2,
      "requiresCards": [
        "huatai",
        "fiveElements",
        "landDragon"
      ],
      "description": "Huatai, Five-Element Stones, and the Earth Dragon Spirit form a symbolic system of balance and protection."
    },
    {
      "id": "ritual-order",
      "name": "Ritual Order in Words",
      "row": "text",
      "points": 6,
      "tier": 2,
      "requiresCards": [
        "rearHall",
        "rootSource",
        "ancestralTablets"
      ],
      "description": "Rear hall, Root and Source, and ancestral tablets unite worship, remembrance, and generational order."
    },
    {
      "id": "festival-rite",
      "name": "A Complete Festival Rite",
      "row": "text",
      "points": 8,
      "tier": 2,
      "requiresCards": [
        "ritualHall",
        "heavenIncense",
        "springAutumn",
        "ancestralTablets"
      ],
      "description": "Ritual hall, Heaven Incense Burner, seasonal rites, and ancestral tablets complete the ceremonial setting."
    },
    {
      "id": "teaching-lineage",
      "name": "Teaching Through Lineage",
      "row": "text",
      "points": 6,
      "tier": 2,
      "requiresCards": [
        "study",
        "ridgeCouplet",
        "ancestorSociety"
      ],
      "description": "Study, moral ridge couplet, and ancestral association connect education with lineage organization."
    },
    {
      "id": "two-halls-two-wings",
      "name": "Two Halls, Two Wings",
      "row": "space",
      "points": 8,
      "tier": 3,
      "requiresCards": [
        "frontHall",
        "rearHall",
        "leftWing",
        "rightWing"
      ],
      "description": "Front and rear halls with the two side wings form a key Hakka ancestral-hall layout."
    },
    {
      "id": "central-axis",
      "name": "The Axial Sequence",
      "row": "space",
      "points": 7,
      "tier": 3,
      "requiresCards": [
        "gatehouse",
        "forecourt",
        "frontHall",
        "courtyard",
        "rearHall"
      ],
      "description": "Gatehouse, forecourt, front hall, courtyard, and rear hall establish the complete central route."
    },
    {
      "id": "ancestral-cosmos",
      "name": "The Ancestral Hall as a Whole",
      "row": "space",
      "points": 10,
      "tier": 4,
      "requiresCombos": [
        "two-halls-two-wings",
        "central-axis",
        "ritual-order"
      ],
      "description": "When layout, movement, and ritual order all hold together, the entire cultural landscape comes into view."
    }
  ],
  "tutorialSteps": [
    {
      "title": "Welcome to the Lineage Match",
      "body": "You will play up to three rounds against the Guardian. Players alternate actions until both pass; the higher total wins the round."
    },
    {
      "title": "Read the Three Card Types",
      "body": "Space cards show layout, Ornament cards show craft and belief, and Inscription cards show plaques, couplets, and ritual writing."
    },
    {
      "title": "Mulligan Before the Round",
      "body": "Before round one, you may replace up to three cards. Later rounds allow one additional replacement after drawing."
    },
    {
      "title": "Three Possible Actions",
      "body": "On your turn, click once to raise or lower a card and double-click quickly to play it. You may instead use your one-time leader ability or pass."
    },
    {
      "title": "Combos Are Not Announced in Advance",
      "body": "The board does not reveal combo hints. Learn the relationships from the guide and card descriptions; an animation appears only after a combo is completed."
    },
    {
      "title": "Inspect Any Card",
      "body": "Right-click a hand card, or click a card already on the board, to read its full effect and heritage explanation."
    }
  ],
  "cards": [
    {
      "id": "gatehouse",
      "name": "Gatehouse",
      "type": "space",
      "power": 5,
      "rarity": "Common",
      "icon": "G",
      "effectText": "If this is your first Space card, gain +2.",
      "toastText": "It preserves the hall’s public identity and the traditional distinction between outside and inside.",
      "culturalNote": "The gatehouse marks the outer threshold of the ancestral hall. It separates public approach from the ordered interior and tells visitors what kind of place they are entering.",
      "source": "Project Table 3-3",
      "valueNote": "It preserves the hall’s public identity and the traditional distinction between outside and inside."
    },
    {
      "id": "forecourt",
      "name": "Forecourt",
      "type": "space",
      "power": 5,
      "rarity": "Common",
      "icon": "F",
      "effectText": "If Gatehouse and Front Hall are both present, gain +4.",
      "toastText": "It shows how an ancestral hall also functioned as a social and everyday gathering place.",
      "culturalNote": "The open forecourt lies between the gatehouse and front hall. It supports movement, gatherings, drying crops, shared meals, and memories of play.",
      "source": "Project Table 3-3",
      "valueNote": "It shows how an ancestral hall also functioned as a social and everyday gathering place."
    },
    {
      "id": "frontHall",
      "name": "Front Hall",
      "type": "space",
      "power": 6,
      "rarity": "Rare",
      "icon": "FH",
      "effectText": "Gain up to +4 from connected Ornament or Inscription cards.",
      "toastText": "It preserves the hall’s ceremonial approach and its most public layer of visual teaching.",
      "culturalNote": "The front hall is the transition from the public exterior to the ritual core. It supports gatherings, circulation, and visible instruction through painted woodwork and inscriptions.",
      "source": "Project Table 3-3",
      "valueNote": "It preserves the hall’s ceremonial approach and its most public layer of visual teaching."
    },
    {
      "id": "courtyard",
      "name": "Courtyard",
      "type": "space",
      "power": 4,
      "rarity": "Common",
      "icon": "C",
      "effectText": "Gain up to +4 for your other Space cards.",
      "toastText": "It demonstrates how environmental function and ritual sequence were integrated into the building.",
      "culturalNote": "The open courtyard between the front and rear halls provides light, ventilation, drainage, and spatial pause.",
      "source": "Project Table 3-3",
      "valueNote": "It demonstrates how environmental function and ritual sequence were integrated into the building."
    },
    {
      "id": "rearHall",
      "name": "Rear Hall",
      "type": "space",
      "power": 7,
      "rarity": "Epic",
      "icon": "RH",
      "effectText": "If Root and Source or Ancestral Tablets is present, gain +4.",
      "toastText": "It preserves the most sacred spatial layer and the core of lineage worship.",
      "culturalNote": "The rear hall is the ritual center where ancestral tablets, inscriptions, and worship practices meet.",
      "source": "Project Table 3-3",
      "valueNote": "It preserves the most sacred spatial layer and the core of lineage worship."
    },
    {
      "id": "leftWing",
      "name": "Left Wing",
      "type": "space",
      "power": 5,
      "rarity": "Common",
      "icon": "LW",
      "effectText": "If Right Wing is present, gain +3.",
      "toastText": "Together with the right wing, it helps define the characteristic two-hall, two-wing layout.",
      "culturalNote": "The left side wing forms one half of the ancillary spaces beside the central halls.",
      "source": "Project",
      "valueNote": "Together with the right wing, it helps define the characteristic two-hall, two-wing layout."
    },
    {
      "id": "rightWing",
      "name": "Right Wing",
      "type": "space",
      "power": 5,
      "rarity": "Common",
      "icon": "RW",
      "effectText": "If Left Wing is present, gain +3.",
      "toastText": "It shows that the ancestral hall was a spatial complex rather than a single shrine room.",
      "culturalNote": "The right side wing balances the left and supports the hall’s ancillary functions.",
      "source": "Project",
      "valueNote": "It shows that the ancestral hall was a spatial complex rather than a single shrine room."
    },
    {
      "id": "huatai",
      "name": "Huatai Rear Mound",
      "type": "space",
      "power": 4,
      "rarity": "Rare",
      "icon": "H",
      "effectText": "If Five-Element Stones or Earth Dragon Spirit is present, gain +4.",
      "toastText": "It preserves the symbolic relationship between architecture, landscape, and protection.",
      "culturalNote": "The huatai behind the rear hall closes the rear edge of the complex and is associated with stability and support.",
      "source": "Project Table 3-3, Table 4-8",
      "valueNote": "It preserves the symbolic relationship between architecture, landscape, and protection."
    },
    {
      "id": "study",
      "name": "Wing Study",
      "type": "space",
      "power": 4,
      "rarity": "Common",
      "icon": "S",
      "effectText": "If either side wing is present, gain +3.",
      "toastText": "It shows how the ancestral hall adapted to changing community needs while remaining active.",
      "culturalNote": "Some wing spaces later served as studies, meeting rooms, or work areas.",
      "source": "Project",
      "valueNote": "It shows how the ancestral hall adapted to changing community needs while remaining active."
    },
    {
      "id": "ritualHall",
      "name": "Ritual Hall",
      "type": "space",
      "power": 6,
      "rarity": "Rare",
      "icon": "R",
      "effectText": "Gain up to +4 for your Inscription cards.",
      "toastText": "It makes the ceremonial function of the hall visible as a living system.",
      "culturalNote": "The ritual hall is where space, ancestral tablets, vessels, and written teachings come together in practice.",
      "source": "Project",
      "valueNote": "It makes the ceremonial function of the hall visible as a living system."
    },
    {
      "id": "fiveElements",
      "name": "Five-Element Stones",
      "type": "decoration",
      "power": 5,
      "rarity": "Epic",
      "icon": "5E",
      "effectText": "If Huatai Rear Mound is present, gain +5.",
      "toastText": "They preserve a visible expression of cosmological order within the building.",
      "culturalNote": "These stones symbolize balance among metal, wood, water, fire, and earth.",
      "source": "Project Table 3-3, Table 4-8",
      "valueNote": "They preserve a visible expression of cosmological order within the building."
    },
    {
      "id": "landDragon",
      "name": "Earth Dragon Spirit",
      "type": "decoration",
      "power": 4,
      "rarity": "Rare",
      "icon": "D",
      "effectText": "If Huatai Rear Mound or Rear Hall is present, gain +4.",
      "toastText": "It connects the hall to ideas of land, geomancy, and spiritual guardianship.",
      "culturalNote": "The Earth Dragon Spirit relates to the rear precinct, local belief, and the protection of the site.",
      "source": "Project , Table 4-8",
      "valueNote": "It connects the hall to ideas of land, geomancy, and spiritual guardianship."
    },
    {
      "id": "heavenIncense",
      "name": "Heaven Incense Burner",
      "type": "decoration",
      "power": 5,
      "rarity": "Rare",
      "icon": "IB",
      "effectText": "If Rear Hall is present, gain +3.",
      "toastText": "It turns architectural space into a place actively used for ceremony.",
      "culturalNote": "The incense burner is a ritual object tied to worship and reverence for Heaven.",
      "source": "Project Figure 3-24, Table 4-2",
      "valueNote": "It turns architectural space into a place actively used for ceremony."
    },
    {
      "id": "dougongPainting",
      "name": "Painted Bracket Sets",
      "type": "decoration",
      "power": 6,
      "rarity": "Epic",
      "icon": "PB",
      "effectText": "If Front Hall is present, gain +5.",
      "toastText": "They preserve highly visible evidence of timber craftsmanship and decorative tradition.",
      "culturalNote": "Painted bracket sets combine structural craft with auspicious imagery and vivid color.",
      "source": "Project Table 4-8",
      "valueNote": "They preserve highly visible evidence of timber craftsmanship and decorative tradition."
    },
    {
      "id": "threeSuccesses",
      "name": "Threefold Success",
      "type": "decoration",
      "power": 5,
      "rarity": "Rare",
      "icon": "3S",
      "effectText": "If Rear Hall is present, gain +4.",
      "toastText": "It shows how construction, visual alignment, and symbolic language can overlap.",
      "culturalNote": "Aligned structural elements in the rear hall are interpreted through the auspicious phrase “Threefold Success.”",
      "source": "Project Figure 3-30",
      "valueNote": "It shows how construction, visual alignment, and symbolic language can overlap."
    },
    {
      "id": "sterculiaTree",
      "name": "Sterculia Tree",
      "type": "decoration",
      "power": 5,
      "rarity": "Epic",
      "icon": "T",
      "effectText": "If Baoshu Hall is present, gain +5.",
      "toastText": "Its value lies in living memory and the relationship between heritage place and community life.",
      "culturalNote": "The old tree is linked with shade, fruit, childhood play, and shared memory around the hall.",
      "source": "Project Table 3-3, Table 4-8",
      "valueNote": "Its value lies in living memory and the relationship between heritage place and community life."
    },
    {
      "id": "maleLamp",
      "name": "Male Lantern",
      "type": "decoration",
      "power": 4,
      "rarity": "Common",
      "icon": "ML",
      "effectText": "If Female Lantern is present, gain +4.",
      "toastText": "It preserves an everyday ritual memory that architecture alone cannot tell.",
      "culturalNote": "The male lantern belongs to the material culture of marriage customs and family ceremony.",
      "source": "Project",
      "valueNote": "It preserves an everyday ritual memory that architecture alone cannot tell."
    },
    {
      "id": "femaleLamp",
      "name": "Female Lantern",
      "type": "decoration",
      "power": 4,
      "rarity": "Common",
      "icon": "FL",
      "effectText": "If Male Lantern is present, gain +4.",
      "toastText": "Together they preserve social relationships, ceremony, and family continuity.",
      "culturalNote": "The female lantern forms a pair with the male lantern in marriage-related custom.",
      "source": "Project",
      "valueNote": "Together they preserve social relationships, ceremony, and family continuity."
    },
    {
      "id": "swallowTail",
      "name": "Swallowtail Ridge",
      "type": "decoration",
      "power": 6,
      "rarity": "Epic",
      "icon": "SR",
      "effectText": "If Gatehouse or Front Hall is present, gain +3.",
      "toastText": "It preserves a strong regional architectural silhouette and public identity.",
      "culturalNote": "The rising swallowtail ridge is one of the hall’s most recognizable exterior forms.",
      "source": "Project",
      "valueNote": "It preserves a strong regional architectural silhouette and public identity."
    },
    {
      "id": "longevityBrick",
      "name": "Longevity Brick",
      "type": "decoration",
      "power": 4,
      "rarity": "Common",
      "icon": "LB",
      "effectText": "If Front Hall, Rear Hall, or Ritual Hall is present, gain +3.",
      "toastText": "They show how heritage value is carried by repeated small elements as well as major spaces.",
      "culturalNote": "Bricks bearing the longevity character are auspicious details embedded in the building.",
      "source": "Project",
      "valueNote": "They show how heritage value is carried by repeated small elements as well as major spaces."
    },
    {
      "id": "harvestPattern",
      "name": "Bountiful Harvest",
      "type": "decoration",
      "power": 4,
      "rarity": "Common",
      "icon": "HP",
      "effectText": "If Forecourt is present, gain +4.",
      "toastText": "It preserves the relationship between rural production and ancestral-hall culture.",
      "culturalNote": "Harvest imagery connects ornament with agricultural life, seasonality, and the use of the forecourt.",
      "source": "Project",
      "valueNote": "It preserves the relationship between rural production and ancestral-hall culture."
    },
    {
      "id": "baoshutang",
      "name": "Baoshu Hall",
      "type": "text",
      "power": 4,
      "rarity": "Epic",
      "icon": "BH",
      "effectText": "If Front Hall or Sterculia Tree is present, gain +5.",
      "toastText": "It is a key marker of lineage identity and collective memory.",
      "culturalNote": "The Baoshu Hall plaque identifies the lineage hall and condenses family origin and reputation into a public name.",
      "source": "Project Table 3-4",
      "valueNote": "It is a key marker of lineage identity and collective memory."
    },
    {
      "id": "rootSource",
      "name": "Root and Source",
      "type": "text",
      "power": 5,
      "rarity": "Epic",
      "icon": "RS",
      "effectText": "If Rear Hall is present, gain +5.",
      "toastText": "It preserves the central moral language of tracing one’s source and honoring forebears.",
      "culturalNote": "The phrase “Root and Source” expresses origin, remembrance, and gratitude to ancestors.",
      "source": "Project Figure 3-18",
      "valueNote": "It preserves the central moral language of tracing one’s source and honoring forebears."
    },
    {
      "id": "frontCouplet",
      "name": "Front-Hall Couplets",
      "type": "text",
      "power": 4,
      "rarity": "Rare",
      "icon": "FC",
      "effectText": "If Front Hall is present, gain +4.",
      "toastText": "They preserve the public teaching role of ancestral-hall inscriptions.",
      "culturalNote": "The front-hall couplets use historical allusion and family ideals to instruct later generations.",
      "source": "Project Table 3-4",
      "valueNote": "They preserve the public teaching role of ancestral-hall inscriptions."
    },
    {
      "id": "rearCouplet",
      "name": "Rear-Hall Couplets",
      "type": "text",
      "power": 5,
      "rarity": "Rare",
      "icon": "RC",
      "effectText": "If Rear Hall is present, gain +4.",
      "toastText": "They preserve the ethical language surrounding ancestral rites.",
      "culturalNote": "Closer to the ritual core, these couplets address worship, generational order, and remembrance.",
      "source": "Project Table 3-4",
      "valueNote": "They preserve the ethical language surrounding ancestral rites."
    },
    {
      "id": "ridgeCouplet",
      "name": "Ridge Couplet: Kinship and Origins",
      "type": "text",
      "power": 5,
      "rarity": "Rare",
      "icon": "KC",
      "effectText": "If you have at least 3 Space cards, gain +5.",
      "toastText": "It preserves the hall’s educational and ethical function.",
      "culturalNote": "The ridge couplet condenses kinship, moral order, and remembrance of origins into architectural text.",
      "source": "Project Table 3-4",
      "valueNote": "It preserves the hall’s educational and ethical function."
    },
    {
      "id": "ancestralTablets",
      "name": "Ancestral Tablets and Deities",
      "type": "text",
      "power": 6,
      "rarity": "Legendary",
      "icon": "AT",
      "effectText": "If Rear Hall or Ritual Hall is present, gain +5.",
      "toastText": "They are central to the hall’s ritual purpose and genealogical order.",
      "culturalNote": "Ancestral tablets identify the objects of worship and organize lineage and generational memory.",
      "source": "Project Table 3-4",
      "valueNote": "They are central to the hall’s ritual purpose and genealogical order."
    },
    {
      "id": "hallInscription",
      "name": "Hsieh Ancestral Hall Inscription",
      "type": "text",
      "power": 3,
      "rarity": "Common",
      "icon": "HI",
      "effectText": "Gain up to +5 for your Space cards.",
      "toastText": "It preserves the hall’s public name, lineage ownership, and communal identity.",
      "culturalNote": "The gatehouse inscription directly identifies the building as the Hsieh ancestral hall.",
      "source": "Project Table 3-4",
      "valueNote": "It preserves the hall’s public name, lineage ownership, and communal identity."
    },
    {
      "id": "springAutumn",
      "name": "Spring Rites, Autumn Offerings",
      "type": "text",
      "power": 4,
      "rarity": "Rare",
      "icon": "SA",
      "effectText": "If you have at least 2 Space and 2 Inscription cards, gain +6.",
      "toastText": "It preserves the link between ancestral remembrance, seasonality, and community continuity.",
      "culturalNote": "The phrase refers to recurring seasonal worship and the annual rhythm of lineage gathering.",
      "source": "Project Table 3-4",
      "valueNote": "It preserves the link between ancestral remembrance, seasonality, and community continuity."
    },
    {
      "id": "ancestorSociety",
      "name": "Founding-Ancestor Association",
      "type": "text",
      "power": 5,
      "rarity": "Legendary",
      "icon": "FA",
      "effectText": "If all three rows contain cards, gain +6.",
      "toastText": "It shows that the ancestral hall is also a continuing social institution.",
      "culturalNote": "The ancestral association organizes worship, property, gatherings, and cooperation among lineage branches.",
      "source": "Project",
      "valueNote": "It shows that the ancestral hall is also a continuing social institution."
    }
  ]
};
