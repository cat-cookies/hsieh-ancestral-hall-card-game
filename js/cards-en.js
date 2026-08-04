/* Hsieh Ancestral Hall Card Game v2.30 — heritage knowledge, Method cards, and balance data */
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
    },
    "effect": {
      "label": "Method Card",
      "icon": "✦",
      "color": "effect"
    }
  },
  "difficultyLabels": {
    "easy": "Easy",
    "normal": "Normal",
    "hard": "Hard"
  },
  "rarityDefinitions": {
    "Common": "A widely recognizable cultural element",
    "Rare": "A distinctive cultural element",
    "Epic": "A highly representative cultural element",
    "Legendary": "An exceptional cultural element with strong heritage significance"
  },
  "rarityPolicy": "Heritage labels indicate cultural distinctiveness, representativeness, or collection value only. They do not increase power, change effects, guide the computer player, or directly affect victory.",
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
      "id": "gate-court",
      "name": "Gate to Forecourt",
      "row": "space",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "gatehouse",
        "forecourt"
      ],
      "description": "The gatehouse marks the entrance, while the forecourt receives visitors in a shared open space."
    },
    {
      "id": "court-front",
      "name": "Forecourt to Hall",
      "row": "space",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "forecourt",
        "frontHall"
      ],
      "description": "The forecourt and front hall form a route from outdoor gathering into the main building."
    },
    {
      "id": "hall-courtyard",
      "name": "Hall and Courtyard",
      "row": "space",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "frontHall",
        "courtyard"
      ],
      "description": "The front hall and courtyard provide light, ventilation, and a transition in ritual movement."
    },
    {
      "id": "courtyard-rear",
      "name": "Courtyard to Ritual Core",
      "row": "space",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "courtyard",
        "rearHall"
      ],
      "description": "Passing through the courtyard leads into the rear hall and the ritual core."
    },
    {
      "id": "paired-wings",
      "name": "Paired Wings",
      "row": "space",
      "points": 3,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "leftWing",
        "rightWing"
      ],
      "description": "The two side wings provide space for daily life, education, and collective affairs."
    },
    {
      "id": "rear-huatai",
      "name": "Rear Support",
      "row": "space",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "rearHall",
        "huatai"
      ],
      "description": "The rear hall and huatai create the ritual core and the enclosure behind it."
    },
    {
      "id": "five-elements-pair",
      "name": "Five Elements at Huatai",
      "row": "decoration",
      "points": 3,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "huatai",
        "fiveElements"
      ],
      "description": "The huatai and Five-Element Stones express balance and symbolic order behind the hall."
    },
    {
      "id": "paired-lamps",
      "name": "Paired Lamps",
      "row": "decoration",
      "points": 3,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "maleLamp",
        "femaleLamp"
      ],
      "description": "The paired male and female lamps connect wedding customs with family memory."
    },
    {
      "id": "front-craft",
      "name": "Painted Structure",
      "row": "decoration",
      "points": 3,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "frontHall",
        "dougongPainting"
      ],
      "description": "The front hall and painted dougong show structure and craftsmanship together."
    },
    {
      "id": "treasure-tree",
      "name": "Baoshu and Tree",
      "row": "text",
      "points": 3,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "sterculiaTree",
        "baoshutang"
      ],
      "description": "The hall name and old tree connect lineage symbolism with local memory."
    },
    {
      "id": "root-source-pair",
      "name": "Return to the Source",
      "row": "text",
      "points": 3,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "rearHall",
        "rootSource"
      ],
      "description": "The rear hall and Root-and-Source plaque connect worship with remembrance of origins."
    },
    {
      "id": "ancestral-pair",
      "name": "Ancestral Place",
      "row": "text",
      "points": 3,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "ritualHall",
        "ancestralTablets"
      ],
      "description": "Ancestral tablets in the ritual core make genealogy and worship order visible."
    },
    {
      "id": "gate-name",
      "name": "Named Entrance",
      "row": "text",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "gatehouse",
        "hallInscription"
      ],
      "description": "The gatehouse and hall inscription establish the site’s public identity at the entrance."
    },
    {
      "id": "study-teaching",
      "name": "Study and Teaching",
      "row": "text",
      "points": 3,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "study",
        "ridgeCouplet"
      ],
      "description": "The study and ridge couplet express education, kinship ethics, and remembrance of origins."
    },
    {
      "id": "hall-assembly",
      "name": "Stewardship and Assembly",
      "row": "text",
      "points": 3,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "managementResidence",
        "familyAssembly"
      ],
      "description": "The manager’s residence and clan assembly support long-term stewardship of the hall."
    },
    {
      "id": "banquet-court",
      "name": "Forecourt Banquet",
      "row": "text",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "forecourt",
        "banquet"
      ],
      "description": "The forecourt and communal banquet express gathering and lived memory."
    },
    {
      "id": "childhood-court",
      "name": "Forecourt Play",
      "row": "text",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "forecourt",
        "childhoodPlay"
      ],
      "description": "The forecourt is also where everyday memories form across generations."
    },
    {
      "id": "fruit-memory",
      "name": "Fruit beneath the Tree",
      "row": "text",
      "points": 2,
      "tier": 1,
      "level": "simple",
      "requiresCards": [
        "sterculiaTree",
        "fruitPicking"
      ],
      "description": "The old tree and fruit-picking memories combine natural and emotional heritage value."
    },
    {
      "id": "entrance-identity",
      "name": "Entrance Order",
      "row": "text",
      "points": 4,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "gatehouse",
        "forecourt",
        "hallInscription"
      ],
      "description": "The gatehouse, forecourt, and inscription establish entrance order and ancestral-hall identity."
    },
    {
      "id": "central-axis-lite",
      "name": "Ordered Central Sequence",
      "row": "space",
      "points": 4,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "frontHall",
        "courtyard",
        "rearHall"
      ],
      "description": "The front hall, courtyard, and rear hall form a central progression from public space to ritual core."
    },
    {
      "id": "five-elements-guard",
      "name": "Five-Element Protection",
      "row": "decoration",
      "points": 5,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "huatai",
        "fiveElements",
        "landDragon"
      ],
      "description": "The huatai, Five-Element Stones, and Earth Dragon form a symbolic order of protection behind the hall."
    },
    {
      "id": "ritual-order",
      "name": "Ritual Order",
      "row": "text",
      "points": 4,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "ritualHall",
        "rootSource",
        "ancestralTablets"
      ],
      "description": "The ritual hall, Root-and-Source plaque, and ancestral tablets connect worship, origins, and lineage order."
    },
    {
      "id": "teaching-lineage",
      "name": "Teaching the Lineage",
      "row": "text",
      "points": 5,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "study",
        "ridgeCouplet",
        "ancestorSociety"
      ],
      "description": "The study, ethical ridge couplet, and ancestral association express lineage education and organisation."
    },
    {
      "id": "management-continuity",
      "name": "Continuity of Stewardship",
      "row": "text",
      "points": 5,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "managementResidence",
        "ancestorSociety",
        "familyAssembly"
      ],
      "description": "The manager’s residence, ancestral association, and clan assembly sustain the hall’s operation."
    },
    {
      "id": "craft-order",
      "name": "Ordered Timber Craft",
      "row": "decoration",
      "points": 5,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "stepBeam",
        "beamBlock",
        "rearBracketPainting"
      ],
      "description": "The front-eave beam, beam block, and rear-hall dougong painting reveal structure, craft, and spatial hierarchy."
    },
    {
      "id": "modest-craft",
      "name": "Hierarchy of Ornament",
      "row": "decoration",
      "points": 4,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "stepBeam",
        "plainBackPainting",
        "rearBracketPainting"
      ],
      "description": "Refined and restrained treatments coexist, revealing architectural hierarchy and the allocation of craft effort."
    },
    {
      "id": "living-memory",
      "name": "Forecourt Memories",
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
      "description": "The forecourt, banquet, childhood play, and old tree create intergenerational lived memory."
    },
    {
      "id": "festival-rite",
      "name": "Complete Ritual Scene",
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
      "description": "The ritual hall, Heaven incense burner, seasonal rites, and ancestral tablets complete a worship setting."
    },
    {
      "id": "two-halls-two-wings",
      "name": "Two Halls, Two Wings",
      "row": "space",
      "points": 6,
      "tier": 2,
      "level": "advanced",
      "requiresCards": [
        "frontHall",
        "rearHall",
        "leftWing",
        "rightWing"
      ],
      "description": "The front and rear halls with two side wings form a major Hakka ancestral-hall layout."
    },
    {
      "id": "roof-splendor",
      "name": "Splendour of the Front Hall",
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
      "description": "The front hall, painted dougong, swallowtail ridge, and hall name create a distinctive crafted façade."
    }
  ],
  "tutorialSteps": [
    {
      "title": "Choose a readable mode",
      "body": "Traditional Chinese, Zhuyin and English versions are available, with small, medium and large text."
    },
    {
      "title": "Best of three without hidden bonuses",
      "body": "Both sides use the same cards and scoring. Difficulty changes Guardian decisions, not card power."
    },
    {
      "title": "Four card roles",
      "body": "Space cards build layout; Decoration cards connect craft and symbolism; Text cards carry ritual, organisation and memory; Method cards resolve immediately and go to the graveyard."
    },
    {
      "title": "Twelve-card balanced opening",
      "body": "The opening hand balances card types and guarantees at least two possible two-card starter combos. You may replace up to four cards."
    },
    {
      "title": "Read before playing",
      "body": "Select once to read. Double-click the same card or use the play button to commit it."
    },
    {
      "title": "More starter combos, fewer advanced combos",
      "body": "Starter combos require exactly two cards. Advanced combos require three or four cards and reward planning."
    },
    {
      "title": "Low-frustration Method cards",
      "body": "Method cards draw, cycle, recover or boost your own rows. They do not erase opposing cards or apply large penalties."
    },
    {
      "title": "Cultural marks are not power",
      "body": "Common, Rare, Epic and Legendary describe cultural distinctiveness only."
    },
    {
      "title": "Seven learning puzzles",
      "body": "Paths progress from spatial basics and craft to research methods, digital interpretation and heritage ethics."
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
      "effectText": "Trigger: This is your first Space card. Effect: +1 power.",
      "toastText": "It preserves the hall’s public identity and the traditional distinction between outside and inside.",
      "culturalNote": "The gatehouse marks the outer threshold of the ancestral hall. It separates public approach from the ordered interior and tells visitors what kind of place they are entering.",
      "source": "Project Table 3-3",
      "valueNote": "It preserves the hall’s public identity and the traditional distinction between outside and inside."
    },
    {
      "id": "forecourt",
      "name": "Forecourt",
      "type": "space",
      "power": 4,
      "rarity": "Common",
      "icon": "F",
      "effectText": "Trigger: You have both Gatehouse and Front Hall in play. Effect: +1 power.",
      "toastText": "It shows how an ancestral hall also functioned as a social and everyday gathering place.",
      "culturalNote": "The open forecourt lies between the gatehouse and front hall. It supports movement, gatherings, drying crops, shared meals, and memories of play.",
      "source": "Project Table 3-3",
      "valueNote": "It shows how an ancestral hall also functioned as a social and everyday gathering place."
    },
    {
      "id": "frontHall",
      "name": "Front Hall",
      "type": "space",
      "power": 4,
      "rarity": "Rare",
      "icon": "FH",
      "effectText": "Trigger: You have Front-Hall Bracket Painting, Front-Hall Couplet, Baoshu Hall, or Swallow-Tail Ridge in play. Effect: +1 power for each listed linked card, up to +2.",
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
      "effectText": "Trigger: You have another Space card. Effect: +1 per other Space card, up to +3.",
      "toastText": "It demonstrates how environmental function and ritual sequence were integrated into the building.",
      "culturalNote": "The open courtyard between the front and rear halls provides light, ventilation, drainage, and spatial pause.",
      "source": "Project Table 3-3",
      "valueNote": "It demonstrates how environmental function and ritual sequence were integrated into the building."
    },
    {
      "id": "rearHall",
      "name": "Rear Hall",
      "type": "space",
      "power": 4,
      "rarity": "Epic",
      "icon": "RH",
      "effectText": "Trigger: You have Root and Source or Ancestral Tablets in play. Effect: +1 power.",
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
      "effectText": "Trigger: Right Wing is on your board. Effect: +1 power.",
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
      "effectText": "Trigger: Left Wing is on your board. Effect: +1 power.",
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
      "effectText": "Trigger: Five-Element Stones or Land Dragon is on your board. Effect: +2 power.",
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
      "effectText": "Trigger: Left Wing or Right Wing is on your board. Effect: +2 power.",
      "toastText": "It shows how the ancestral hall adapted to changing community needs while remaining active.",
      "culturalNote": "Some wing spaces later served as studies, meeting rooms, or work areas.",
      "source": "Project",
      "valueNote": "It shows how the ancestral hall adapted to changing community needs while remaining active."
    },
    {
      "id": "ritualHall",
      "name": "Ritual Hall",
      "type": "space",
      "power": 5,
      "rarity": "Rare",
      "icon": "R",
      "effectText": "Trigger: You have Inscription cards in play. Effect: +1 power for each Inscription card, up to +2.",
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
      "effectText": "Trigger: Huatai is on your board. Effect: +2 power.",
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
      "effectText": "Trigger: Huatai or Rear Hall is on your board. Effect: +2 power.",
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
      "effectText": "Trigger: Rear Hall is on your board. Effect: +2 power.",
      "toastText": "It turns architectural space into a place actively used for ceremony.",
      "culturalNote": "The incense burner is a ritual object tied to worship and reverence for Heaven.",
      "source": "Project Figure 3-24, Table 4-2",
      "valueNote": "It turns architectural space into a place actively used for ceremony."
    },
    {
      "id": "dougongPainting",
      "name": "Painted Bracket Sets",
      "type": "decoration",
      "power": 5,
      "rarity": "Epic",
      "icon": "PB",
      "effectText": "Trigger: Front Hall is on your board. Effect: +2 power.",
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
      "effectText": "Trigger: Rear Hall is on your board. Effect: +2 power.",
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
      "effectText": "Trigger: Baoshu Hall is on your board. Effect: +2 power.",
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
      "effectText": "Trigger: Female Lamp is on your board. Effect: +1 power.",
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
      "effectText": "Trigger: Male Lamp is on your board. Effect: +1 power.",
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
      "effectText": "Trigger: Gatehouse or Front Hall is on your board. Effect: +2 power.",
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
      "effectText": "Trigger: Front Hall, Rear Hall, or Ritual Hall is on your board. Effect: +2 power.",
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
      "effectText": "Trigger: Forecourt is on your board. Effect: +2 power.",
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
      "effectText": "Trigger: Front Hall or Sterculia Tree is on your board. Effect: +2 power.",
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
      "effectText": "Trigger: Rear Hall is on your board. Effect: +2 power.",
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
      "effectText": "Trigger: Front Hall is on your board. Effect: +2 power.",
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
      "effectText": "Trigger: Rear Hall is on your board. Effect: +2 power.",
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
      "effectText": "Trigger: You have at least three Space cards. Effect: +3 power.",
      "toastText": "It preserves the hall’s educational and ethical function.",
      "culturalNote": "The ridge couplet condenses kinship, moral order, and remembrance of origins into architectural text.",
      "source": "Project Table 3-4",
      "valueNote": "It preserves the hall’s educational and ethical function."
    },
    {
      "id": "ancestralTablets",
      "name": "Ancestral Tablets and Deities",
      "type": "text",
      "power": 5,
      "rarity": "Legendary",
      "icon": "AT",
      "effectText": "Trigger: Rear Hall or Ritual Hall is on your board. Effect: +2 power.",
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
      "effectText": "Trigger: You have Space cards. Effect: +1 per Space card, up to +3.",
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
      "effectText": "Trigger: You have at least two Space and two Text cards. Effect: +3 power.",
      "toastText": "It preserves the link between ancestral remembrance, seasonality, and community continuity.",
      "culturalNote": "The phrase refers to recurring seasonal worship and the annual rhythm of lineage gathering.",
      "source": "Project Table 3-4",
      "valueNote": "It preserves the link between ancestral remembrance, seasonality, and community continuity."
    },
    {
      "id": "ancestorSociety",
      "name": "Founding-Ancestor Association",
      "type": "text",
      "power": 4,
      "rarity": "Legendary",
      "icon": "FA",
      "effectText": "Trigger: All three of your rows contain at least one card. Effect: +2 power.",
      "toastText": "It shows that the ancestral hall is also a continuing social institution.",
      "culturalNote": "The ancestral association organizes worship, property, gatherings, and cooperation among lineage branches.",
      "source": "Project",
      "valueNote": "It shows that the ancestral hall is also a continuing social institution."
    },
    {
      "id": "managementResidence",
      "name": "Manager’s Residence",
      "type": "space",
      "power": 4,
      "rarity": "Rare",
      "icon": "MR",
      "effectText": "Trigger: You have Founding-Ancestor Association or Clan Representatives’ Assembly. Effect: +2 power.",
      "toastText": "Management depended on long-term stewardship, ritual preparation and organisational work.",
      "culturalNote": "Management depended on long-term stewardship, ritual preparation and organisational work.",
      "valueNote": "Management depended on long-term stewardship, ritual preparation and organisational work.",
      "source": "Project Tables 3-2 and 4-9 to 4-11"
    },
    {
      "id": "phoenixEye",
      "name": "Phoenix-Eye Detail",
      "type": "decoration",
      "power": 4,
      "rarity": "Rare",
      "icon": "PE",
      "effectText": "Trigger: You have Ritual Hall or Rear Hall. Effect: +2 power.",
      "toastText": "A timber detail in the ritual hall that should be read through location, structure and ornament together.",
      "culturalNote": "A timber detail in the ritual hall that should be read through location, structure and ornament together.",
      "valueNote": "A timber detail in the ritual hall that should be read through location, structure and ornament together.",
      "source": "Project Figures 3-32 and 3-33"
    },
    {
      "id": "stepBeam",
      "name": "Front Eave Beam",
      "type": "decoration",
      "power": 4,
      "rarity": "Common",
      "icon": "FB",
      "effectText": "Trigger: You have Front Hall. Effect: +2 power.",
      "toastText": "A structural and decorative observation point in the front hall timber system.",
      "culturalNote": "A structural and decorative observation point in the front hall timber system.",
      "valueNote": "A structural and decorative observation point in the front hall timber system.",
      "source": "Project Figures 3-25 and 3-26"
    },
    {
      "id": "beamBlock",
      "name": "Beam-Block Motif",
      "type": "decoration",
      "power": 4,
      "rarity": "Common",
      "icon": "BM",
      "effectText": "Trigger: You have Front Eave Beam or Front Hall Dougong Painting. Effect: +2 power.",
      "toastText": "A small timber joint that carries both craft and symbolic imagery.",
      "culturalNote": "A small timber joint that carries both craft and symbolic imagery.",
      "valueNote": "A small timber joint that carries both craft and symbolic imagery.",
      "source": "Project Figure 3-27"
    },
    {
      "id": "rearBracketPainting",
      "name": "Rear Hall Dougong Painting",
      "type": "decoration",
      "power": 5,
      "rarity": "Epic",
      "icon": "RP",
      "effectText": "Trigger: You have Rear Hall. Effect: +2 power.",
      "toastText": "Decoration near the ritual core uses a more restrained and ordered visual language.",
      "culturalNote": "Decoration near the ritual core uses a more restrained and ordered visual language.",
      "valueNote": "Decoration near the ritual core uses a more restrained and ordered visual language.",
      "source": "Project Figure 3-31 and Chapter 3, Section 3"
    },
    {
      "id": "plainBackPainting",
      "name": "Plain Rear-Side Painting",
      "type": "decoration",
      "power": 4,
      "rarity": "Common",
      "icon": "PP",
      "effectText": "Trigger: You have Rear Hall Dougong Painting or Beam-Block Motif. Effect: +2 power.",
      "toastText": "Simpler treatment on less visible surfaces reveals hierarchy and allocation of craft effort.",
      "culturalNote": "Simpler treatment on less visible surfaces reveals hierarchy and allocation of craft effort.",
      "valueNote": "Simpler treatment on less visible surfaces reveals hierarchy and allocation of craft effort.",
      "source": "Project Figure 3-29 and Chapter 3, Section 3"
    },
    {
      "id": "familyAssembly",
      "name": "Clan Representatives’ Assembly",
      "type": "text",
      "power": 4,
      "rarity": "Rare",
      "icon": "CA",
      "effectText": "Trigger: You have Manager’s Residence or Founding-Ancestor Association. Effect: +2 power.",
      "toastText": "The hall also supported meetings and collective clan affairs.",
      "culturalNote": "The hall also supported meetings and collective clan affairs.",
      "valueNote": "The hall also supported meetings and collective clan affairs.",
      "source": "Project Tables 4-10 and 4-11"
    },
    {
      "id": "banquet",
      "name": "Forecourt Banquet",
      "type": "text",
      "power": 4,
      "rarity": "Common",
      "icon": "BN",
      "effectText": "Trigger: You have Forecourt. Effect: +2 power.",
      "toastText": "Banquets turn the forecourt from an abstract space into collective lived memory.",
      "culturalNote": "Banquets turn the forecourt from an abstract space into collective lived memory.",
      "valueNote": "Banquets turn the forecourt from an abstract space into collective lived memory.",
      "source": "Project interview notes and Tables 4-10 to 4-11"
    },
    {
      "id": "childhoodPlay",
      "name": "Forecourt Childhood Play",
      "type": "text",
      "power": 4,
      "rarity": "Common",
      "icon": "CP",
      "effectText": "Trigger: You have Forecourt. Effect: +2 power.",
      "toastText": "Children’s play shows how the forecourt supported everyday life across generations.",
      "culturalNote": "Children’s play shows how the forecourt supported everyday life across generations.",
      "valueNote": "Children’s play shows how the forecourt supported everyday life across generations.",
      "source": "Project interview notes and Tables 4-10 to 4-11"
    },
    {
      "id": "fruitPicking",
      "name": "Sterculia Fruit-Picking Memory",
      "type": "text",
      "power": 4,
      "rarity": "Rare",
      "icon": "FP",
      "effectText": "Trigger: You have Sterculia Tree. Effect: +2 power.",
      "toastText": "Fruit picking and play make the old tree part of local emotional memory.",
      "culturalNote": "Fruit picking and play make the old tree part of local emotional memory.",
      "valueNote": "Fruit picking and play make the old tree part of local emotional memory.",
      "source": "Project Tables 3-3 and 4-8, plus interview notes"
    },
    {
      "id": "literatureCrosscheck",
      "name": "Source Cross-Check",
      "type": "effect",
      "power": 0,
      "rarity": "Common",
      "icon": "SC",
      "effectType": "draw",
      "amount": 2,
      "effectText": "Immediate: Draw 2 cards. Then place this card in the graveyard.",
      "toastText": "Comparing multiple sources reduces the risk of relying on one account.",
      "culturalNote": "Comparing multiple sources reduces the risk of relying on one account.",
      "valueNote": "Comparing multiple sources reduces the risk of relying on one account.",
      "source": "Project Chapter 1, Section 4 and Table 3-5"
    },
    {
      "id": "fieldSurvey",
      "name": "On-Site Survey",
      "type": "effect",
      "power": 0,
      "rarity": "Common",
      "icon": "FS",
      "effectType": "boostLowest",
      "amount": 3,
      "effectText": "Immediate: If you have a cultural card in play, give +3 to your lowest-scoring occupied row this round; otherwise draw 1.",
      "toastText": "Field observation checks plans and documents against actual space and use.",
      "culturalNote": "Field observation checks plans and documents against actual space and use.",
      "valueNote": "Field observation checks plans and documents against actual space and use.",
      "source": "Project Chapter 1, Section 4"
    },
    {
      "id": "oralHistory",
      "name": "Oral-History Supplement",
      "type": "effect",
      "power": 0,
      "rarity": "Rare",
      "icon": "OH",
      "effectType": "recover",
      "amount": 1,
      "effectText": "Immediate: Return the lowest-base-power non-Method card from your graveyard to hand; if none, draw 1.",
      "toastText": "Interviews can fill gaps in formal records while retaining limits of memory and interpretation.",
      "culturalNote": "Interviews can fill gaps in formal records while retaining limits of memory and interpretation.",
      "valueNote": "Interviews can fill gaps in formal records while retaining limits of memory and interpretation.",
      "source": "Project Chapter 1, Section 4 and Tables 4-9 to 4-11"
    },
    {
      "id": "repairRecord",
      "name": "Conservation Record",
      "type": "effect",
      "power": 0,
      "rarity": "Rare",
      "icon": "CR",
      "effectType": "boostLowest",
      "amount": 4,
      "effectText": "Immediate: If you have a cultural card in play, give +4 to your lowest-scoring occupied row this round; otherwise draw 1.",
      "toastText": "Recording materials, methods and changes makes conservation traceable.",
      "culturalNote": "Recording materials, methods and changes makes conservation traceable.",
      "valueNote": "Recording materials, methods and changes makes conservation traceable.",
      "source": "Project Chapter 2, Section 4 and Chapter 5"
    },
    {
      "id": "digitalModel",
      "name": "Digital Modelling",
      "type": "effect",
      "power": 0,
      "rarity": "Rare",
      "icon": "DM",
      "effectType": "boostOccupied",
      "amount": 1,
      "effectText": "Immediate: Give +1 to each occupied row this round; if none are occupied, draw 1.",
      "toastText": "Digital models support spatial learning but do not replace field evidence or maintenance.",
      "culturalNote": "Digital models support spatial learning but do not replace field evidence or maintenance.",
      "valueNote": "Digital models support spatial learning but do not replace field evidence or maintenance.",
      "source": "Project abstract, Chapter 4, Section 3, and Chapter 5"
    },
    {
      "id": "respectSite",
      "name": "Respect the Living Site",
      "type": "effect",
      "power": 0,
      "rarity": "Epic",
      "icon": "RS",
      "effectType": "cycle",
      "amount": 2,
      "effectText": "Immediate: Shuffle your lowest-base-power non-Method hand card into the deck, then draw 2; if none, draw 1.",
      "toastText": "Promotion of privately owned heritage must respect owners, residents, rituals and privacy.",
      "culturalNote": "Promotion of privately owned heritage must respect owners, residents, rituals and privacy.",
      "valueNote": "Promotion of privately owned heritage must respect owners, residents, rituals and privacy.",
      "source": "Project research aims, limitations, and Table 5-2"
    }
  ],
  "balancePolicy": "This version prioritises frequent two-card starter combos, fewer three-to-four-card advanced combos, balanced opening hands and low-frustration method cards. Difficulty comes mainly from Guardian decision quality."
};
