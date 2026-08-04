(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const STORAGE_KEY = "hsiehHeritageJourneyEnV221";
  const LANG = "en";
  const branches = [{"id":"space","title":"Spatial Layout","subtitle":"Two halls, two wings, the central axis, rear mound, and drainage","icon":"🏛️","steps":[{"title":"Two Halls and Two Wings","source":"Restoration plan and project synthesis","body":"The hall follows a two-hall, two-wing courtyard layout. The front and rear halls occupy the central axis, while the left and right wings extend along both sides. Ritual space, shared family space, and everyday functions are therefore organized within one architectural whole.","facts":["The two halls are the front and rear halls.","The two wings are the left and right lateral ranges.","The layout combines ritual, domestic, and collective functions."],"question":"Which phrase best describes the hall’s principal layout?","choices":["One hall and one yard","Two halls and two wings","Three towers and one shrine"],"answer":1,"feedback":"Two halls and two wings is the basic key to reading the entire compound."},{"title":"Gatehouse and Forecourt","source":"Restoration plan, fieldwork, and oral history","body":"The gatehouse marks the threshold and identifies the ancestral hall. The forecourt was not empty space: it could support crop processing, gatherings, ritual preparation, banquets, and children’s activities.","facts":["The gatehouse establishes entry order.","The forecourt changes between work, gathering, and ritual use.","Use patterns are part of heritage knowledge."],"question":"How should the forecourt be understood?","choices":["A decorative garden only","A shared work, gathering, and ritual forecourt","A parking lot only"],"answer":1,"feedback":"Its value lies in multiple forms of use."},{"title":"Front Hall, Courtyard, and Rear Hall","source":"Restoration plan and project synthesis","body":"The front hall, courtyard, and rear hall form the ritual axis. The front hall supports reception and preparation; the courtyard brings light, ventilation, drainage, and transition; the rear hall contains ancestral tablets and the ritual core.","facts":["The axis organizes movement and ritual hierarchy.","The courtyard is both environmental and ceremonial.","The rear hall is the ritual core."],"question":"Which space is closest to the ancestral tablets?","choices":["Forecourt","Rear hall","Outside the gatehouse"],"answer":1,"feedback":"The rear hall concentrates ancestral worship."},{"title":"Wings and Study Rooms","source":"Project synthesis and oral history","body":"The side wings supported residence, study, meetings, ritual preparation, and storage. Oral accounts also recall study spaces used by relatives and later meetings, showing that the compound was a working family institution rather than a ritual room alone.","facts":["The wings complete the two-hall, two-wing layout.","Study rooms express educational functions.","Meeting spaces reveal collective governance."],"question":"What is the main heritage significance of the wings?","choices":["They are decorative scenery only","They supported life, education, and collective affairs","They were unrelated to the hall"],"answer":1,"feedback":"The wings connect ritual architecture with everyday family organization."},{"title":"Rear Mound and Sterculia Tree","source":"Restoration plan, fieldwork, and oral history","body":"The rear mound closes the axis behind the rear hall and carries geomantic and protective meanings. A century-old Sterculia tree grows there. Memories of gathering fruit, playing under the tree, and migration stories make it part of both landscape and family memory.","facts":["The rear mound closes the innermost axis.","It completes the front-to-back spatial order.","The tree holds natural, lived, and remembered value."],"question":"Why is the Sterculia tree important beyond its age?","choices":["It carries family memory and local stories","It can be moved anywhere without loss","It has no relation to the hall"],"answer":0,"feedback":"Heritage value also comes from long-term use and shared memory."},{"title":"Courtyard Drainage and the Seven-Turn Watercourse","source":"Local oral account; requires further measurement and verification","body":"An interviewee described rainwater leaving the courtyard through a seven-turn route. The account also contrasts seven turns with the higher symbolic status of nine. This is a locally meaningful interpretation, but it should be checked against measured drawings and restoration records.","facts":["The route relates to courtyard drainage.","Seven turns is a local description of the path.","Oral knowledge should be preserved and verified."],"question":"How should a local account such as the seven-turn watercourse be handled?","choices":["Treat it as unquestionable fact","Discard it completely","Preserve it and cross-check it with drawings and documents"],"answer":2,"feedback":"Good heritage interpretation respects memory and verifies evidence."}]},{"id":"decoration","title":"Architectural Ornament","subtitle":"Bracket sets, phoenix-eye openings, ridge forms, tiles, and harvest motifs","icon":"🎨","steps":[{"title":"Front-Hall Bracket Sets","source":"Restoration plan and project synthesis","body":"Six inserted bracket sets appear on the front and rear faces of the front hall. They carry roof loads, extend the eaves, protect walls and column bases, and display carving and painted craftsmanship. The two central sets are the most elaborate, emphasizing the visual importance of the central axis.","facts":["Bracket sets are structural and decorative.","The central sets are more elaborate.","Paint and carving reveal craft and visual hierarchy."],"question":"Why are the central bracket sets more elaborate?","choices":["The central axis has greater visual importance","They carry no load","All bracket sets are identical"],"answer":0,"feedback":"Variation in ornament helps reveal architectural hierarchy."},{"title":"Phoenix-Eye Openings","source":"Restoration plan and project synthesis","body":"Phoenix-eye openings appear on both sides behind the altar in the rear hall. They bring ventilation and light, while their form, position, and symmetry also contribute to the ordered appearance of the ritual interior.","facts":["They sit behind the altar on both sides.","They combine practical and ornamental functions.","Symmetry supports the rear hall’s formal order."],"question":"Which description is most complete?","choices":["A purposeless hole","Ventilation, light, and compositional order","A place for ancestral tablets"],"answer":1,"feedback":"A small opening can connect environmental function and visual order."},{"title":"Swallow-Tail Ridge","source":"Restoration plan and oral history","body":"The upward-curving ridge ends create a distinctive silhouette. They relate to architectural identity, local aesthetics, and family status. A local explanation links them to the standing of people involved in construction, but that account remains to be verified.","facts":["The ridge is an important exterior identifier.","Silhouette and façade proportions create presence.","Local explanations must be marked as oral accounts when unverified."],"question":"How should the local explanation be presented?","choices":["As an oral account requiring verification","As certain fact","It should be erased entirely"],"answer":0,"feedback":"Clear source labeling protects both credibility and local memory."},{"title":"Five-Element Stones and the Land Dragon","source":"Restoration plan and project synthesis","body":"The five-element stones on the rear mound wall are recorded from left to right as wood, metal, earth, water, and fire. Their present form differs from the original. Together with the rear mound and Land Dragon tablet, they help explain balance, orientation, and spatial protection.","facts":["The stones belong to a larger spatial system.","Their altered condition must be explained.","The Land Dragon expresses protection of land and place."],"question":"What should the stones not be treated as?","choices":["Part of the geomantic system","An isolated decoration unrelated to space","A feature whose present condition matters"],"answer":1,"feedback":"Their meaning depends on spatial relationships."},{"title":"Longevity-Character Brick","source":"Local oral name; date and full iconography require further study","body":"An interviewee referred to a particular brick ornament as a longevity-character brick. The name is valuable local vocabulary, but current evidence does not fully establish its production date or complete symbolism. Interpretation should preserve the name while stating the limit of present knowledge.","facts":["The term comes from oral history.","Local naming is itself worth recording.","Date and symbolism require specialist study."],"question":"Which statement is most responsible?","choices":["Everything about it is fully known","The local name is valuable, while details still require study","It has no heritage relevance"],"answer":1,"feedback":"Uncertainty should be stated rather than filled with invented certainty."},{"title":"Bountiful Harvest","source":"Oral history","body":"An interviewee described five-grain imagery in a red ornamental area of the gatehouse, with a taiji symbol above. The composition connects agricultural work, seasonal cycles, and hopes for security and abundance.","facts":["The five-grain imagery relates to agriculture and seasonal cycles.","The taiji and grain imagery together express hopes for balance, stability, and harvest.","Exact placement and details should be checked against site photographs and survey records."],"question":"Which life experience does the motif chiefly evoke?","choices":["Ocean navigation","Agriculture and seasonal cycles","Modern factory production"],"answer":1,"feedback":"Ornament can preserve evidence of local life."}]},{"id":"text","title":"Ritual Texts","subtitle":"Hall names, paired inscriptions, tablets, structural order, and ritual levels","icon":"📜","steps":[{"title":"Hsieh Ancestral Hall, Baoshu Hall, and Root and Source","source":"Restoration plan and project synthesis","body":"The gate inscription identifies the building as the Hsieh Ancestral Hall. Baoshu Hall establishes the lineage hall name at the front hall, while Root and Source at the rear hall links ancestral worship with remembrance of origins.","facts":["The gate inscription identifies the building.","Baoshu Hall carries lineage identity.","Root and Source expresses remembrance of origins."],"question":"What does Root and Source primarily express?","choices":["Remembering origins and ancestral virtue","Roof material","Courtyard dimensions"],"answer":0,"feedback":"The phrase directs the rear hall toward remembrance and reciprocity."},{"title":"Door Couplets and Beam Inscriptions","source":"Restoration plan and project synthesis","body":"Paired inscriptions express ancestral virtue, kinship ethics, remembrance, education, and family ideals. Their location on doors, columns, and structural members matters as much as wording, calligraphy, and material.","facts":["Couplets are usually paired.","They instruct descendants and state lineage values.","Position, script, material, and context must be preserved."],"question":"Does their value lie only in the words?","choices":["Yes","No; wording, location, calligraphy, material, and context all matter","A photograph fully replaces the original"],"answer":1,"feedback":"Textual heritage is also material and spatial."},{"title":"Ancestral Tablets and Genealogy","source":"Restoration plan and project synthesis","body":"Names, titles, generations, and placement turn abstract kinship into a visible ritual order. The hall preserves tablets for founding and later ancestors across different branches. Their original arrangement is crucial evidence.","facts":["Tablets materialize genealogy.","Arrangement expresses generational hierarchy.","Removing context can weaken meaning."],"question":"What must be preserved besides material and lettering?","choices":["Original arrangement and use context","Only the largest tablet","A random new order"],"answer":0,"feedback":"Placement is part of ritual order."},{"title":"Threefold Success","source":"Restoration plan and project synthesis","body":"In the rear hall, the lower edges of three timber elements align horizontally. The documentation calls this Threefold Success. The alignment expresses structural precision and the formal stability expected in the ritual core.","facts":["The phrase refers here to horizontal alignment.","It is both structural and visual order.","The rear hall favors stability over display."],"question":"What does Threefold Success refer to here?","choices":["Three examination scores","Horizontal alignment of three timber edges","Three trees"],"answer":1,"feedback":"It is a specific description of timber and visual order."},{"title":"Heaven Incense Burner and Land Dragon","source":"Restoration plan and project synthesis","body":"The Heaven incense burner expresses reverence for heaven, while the Land Dragon tablet relates to protection of land and place. Together with ancestral tablets and the central axis, they form several ritual levels within the hall.","facts":["The ritual system extends beyond ancestral worship.","Heaven, land, and ancestors form distinct levels.","Present spatial differences should be documented."],"question":"Which ritual level does the Heaven incense burner chiefly express?","choices":["Reverence for heaven","Lighting only","Water storage"],"answer":0,"feedback":"The burner is a key sign of the heaven-worship level."},{"title":"Spring Rites and Autumn Offerings","source":"Project synthesis and traditional ritual concepts","body":"Seasonal ancestral rites reactivate the hall through people, offerings, objects, and procedure. They show that heritage consists not only of a static building, but also of ritual knowledge continuously practiced in time.","facts":["Ritual is tied to seasonal cycles.","Ceremony reactivates the building.","Procedure and participant knowledge deserve documentation."],"question":"What do seasonal rites demonstrate?","choices":["The hall is never used","Ritual, time, and space are connected","Participants are unnecessary"],"answer":1,"feedback":"Tangible architecture and intangible practice form one heritage system."}]},{"id":"community","title":"Local Memory","subtitle":"Lineage organization, gatherings, trees, wedding lamps, and private heritage","icon":"🌾","steps":[{"title":"The Founding Ancestor Association","source":"Restoration plan and project synthesis","body":"Seven household groups formed the association with 255 shares and designated managers for ritual and common affairs. This structure institutionalized worship, property management, and collective responsibilities, helping the hall to be built and maintained.","facts":["The association was more than a social gathering.","Shares, managers, and rules show institutional organization.","Later aims included education, elder respect, charity, and neighborhood relations."],"question":"What was its central role?","choices":["Organizing shared ritual and collective affairs","Selling souvenirs only","Having no relation to maintenance"],"answer":0,"feedback":"Long-term heritage survival depends on institutions as well as buildings."},{"title":"Representative Meetings, Rites, and Banquets","source":"Oral history and project synthesis","body":"Oral accounts recall representative meetings, ritual gatherings, and large communal banquets. These events activated the forecourt, halls, and wings in different ways and helped relatives recognize one another and renew collective ties.","facts":["Events reactivate architectural space.","Banquets and meetings are local memory.","Preservation should record procedures and experiences."],"question":"Why are banquets and meetings heritage knowledge?","choices":["They show how the hall was actually used","Any crowd automatically creates a monument","They have no spatial relation"],"answer":0,"feedback":"Heritage also lies in patterns of use."},{"title":"Study Rooms and Collective Affairs","source":"Oral history and project synthesis","body":"Study rooms supported residence, learning, meetings, and later work. The association’s purposes also expanded to education, scholarships, and care for elders, showing that the hall participated in intergenerational learning and governance.","facts":["Education creates intergenerational transmission.","Meetings show collective coordination.","The hall’s role changed over time."],"question":"What function do the study rooms reveal?","choices":["Education, meetings, and knowledge transmission","Waste storage only","No use at all"],"answer":0,"feedback":"Study spaces make educational and collective functions visible."},{"title":"The Sterculia Tree","source":"Restoration plan and oral history","body":"The century-old tree carries memories of children playing and gathering fruit, as well as migration stories. It is therefore not merely vegetation, but a witness to landscape, family life, and generational experience.","facts":["Natural features can be part of a heritage site.","Childhood memories add lived history.","Legends should be labeled as oral memory."],"question":"What forms the tree’s heritage value?","choices":["Age, place, and family memory together","Fruit price alone","Height alone"],"answer":0,"feedback":"Nature, place, and memory work together."},{"title":"Male and Female Wedding Lamps","source":"Oral history; dates and imagery need further study","body":"An interviewee described paired lamps used in wedding processions. The female lamp could be octagonal and related to wishes for descendants. Lamps retained at the hall were linked to family marriages and century-long memory, but their materials, dates, and imagery require further documentation.","facts":["The lamps relate to wedding custom.","Use context and memory are part of object value.","Dates and imagery require specialist verification."],"question":"What is the best interpretation method?","choices":["Discuss only appearance","Explain use, memory, and what still requires verification","Treat every oral detail as a confirmed date"],"answer":1,"feedback":"Object interpretation should combine use, oral memory, and evidence limits."},{"title":"Tea Service and Women’s Participation","source":"Oral history","body":"An interviewee recalled repeated tea service after marriage as a way to learn the many senior relatives. She also stated that women could enter the main hall during rites rather than remaining only in support spaces. Such testimony corrects overly simple assumptions, while differences across families and periods must still be respected.","facts":["Tea service helped identify elders and build relationships.","The interview described women entering the main hall.","One account should not be generalized to every family and era."],"question":"What is the most responsible lesson?","choices":["All Hakka families are identical","Local experience can correct simplistic assumptions","Women could never enter the main hall"],"answer":1,"feedback":"Oral history reveals lived practice beyond formal descriptions."},{"title":"Private Heritage and Low-Impact Access","source":"Project conclusion","body":"The hall is privately owned and remains connected to family life and ritual. Promotion should respect owners, quiet use, and ritual order rather than maximize visitor numbers. Digital games, models, and virtual displays can offer lower-impact access, but should not replace the site or justify disturbance.","facts":["Private heritage is also lived space.","Digital interpretation can reduce physical pressure.","Access must respect boundaries."],"question":"Which principle is most appropriate?","choices":["Maximize crowds at all costs","Balance learning, owner wishes, and low impact","Ignore ritual and family life"],"answer":1,"feedback":"Heritage education includes learning how to approach a place respectfully."}]},{"id":"method","title":"Research Methods","subtitle":"From source cross-checking and fieldwork to interviews and evidence limits","icon":"🔎","steps":[{"title":"Literature review: build a traceable knowledge base","source":"Chapter 1 research methods and literature review","body":"Heritage game content should not be created from impressions alone. Repair reports, local histories, genealogy excerpts, academic studies, and official records must be compared. Agreement can strengthen confidence; disagreement should be preserved and investigated rather than hidden.","facts":["A literature review does not copy the first available claim.","Sources differ in date, purpose, author, and evidence.","Cards and questions should retain traceable sources."],"question":"Two sources disagree about one building element. What is the best response?","choices":["Use the more attractive wording","Compare source conditions, mark the difference, and seek more evidence","Merge them into one certain statement"],"answer":1,"feedback":"Cross-checking makes the reasoning auditable instead of forcing false certainty."},{"title":"Field survey: connect drawings with the actual site","source":"Chapter 1 fieldwork and Chapter 3 spatial analysis","body":"Fieldwork confirms the positions, sightlines, scale, materials, condition, and use of the gatehouse, forecourt, halls, wings, courtyards, huatai, and other elements. Drawings provide structure; the site adds current conditions and later changes.","facts":["Drawings may not show every later alteration.","Observations need date, location, and viewing direction.","Uncertain findings should be marked for verification."],"question":"What does fieldwork most directly add to written sources?","choices":["It removes the need to document anything","It confirms actual position, condition, and use","It proves every oral account is correct"],"answer":1,"feedback":"Fieldwork places documentary knowledge back into the physical setting."},{"title":"Photography and measurement: evidence that can be checked again","source":"Chapter 1 fieldwork and Chapter 4 model production","body":"Photographs, video, and measured notes can record facades, frames, brackets, paintings, plaques, tablets, and dimensions. Useful records include context, detail, scale, and direction instead of isolated attractive close-ups.","facts":["Detail images need wider location images.","Scale, direction, and file naming improve reuse.","An image is evidence, not a complete interpretation."],"question":"What is the strongest way to photograph a bracket detail?","choices":["Take only one extreme close-up","Record its location, detail, and a scale reference","Move it elsewhere for better light"],"answer":1,"feedback":"Locatable and comparable images support later research and design."},{"title":"Oral history: preserve lived experience and its limits","source":"Chapter 1 and Chapter 4 interview planning","body":"Managers and family members can describe rituals, weddings, banquets, childhood play, repairs, and space use that documents may omit. Memory is shaped by time and viewpoint, so interview date, speaker, and evidence type should be recorded and compared with other sources.","facts":["Oral history preserves local terms and lived experience.","One memory does not represent every generation or family member.","Respect for testimony still includes verification."],"question":"How should a local account such as the “seven-turn water route” be handled?","choices":["Label it as local knowledge and verify it through survey and documents","Declare it the only certain fact","Delete it because it is oral"],"answer":0,"feedback":"Both the value and limitations of oral evidence should remain visible."},{"title":"Research limits: know what the evidence cannot support","source":"Chapter 1 scope and limitations","body":"A single-site study with limited interviews and small-scale testing cannot automatically represent all Hakka ancestral halls or all users. Game explanations should distinguish confirmed evidence, inference, local memory, and unresolved questions.","facts":["A case study gives depth but not automatic universality.","Small feedback samples identify problems but do not prove broad effects.","Explicit limitations improve credibility."],"question":"What can a small player test most reasonably support?","choices":["Universal acceptance across all ages","Identification of current comprehension and usability problems","Proof of increased cultural identity"],"answer":1,"feedback":"Prototype testing is mainly for finding and correcting problems."},{"title":"Iteration: turn tests into documented design decisions","source":"Meeting decisions and design workflow","body":"Requirements, prototypes, player tests, feedback, and revision form a cycle. Each change should record the problem, rationale, version difference, and test result so the team can see whether it improved balance, comprehension, and acceptability.","facts":["Trying to complete every feature at once creates scope risk.","Version records support review and rollback.","Testing should cover rules, content, interface, and accessibility."],"question":"Which practice best represents iterative development?","choices":["Record the reason and test result for each change","Test only after the final release","Add every suggestion immediately"],"answer":0,"feedback":"Iteration uses evidence to retain, revise, or remove features."}]},{"id":"digital","title":"Digital Interpretation","subtitle":"How models, cards, 3D, and virtual displays divide the work","icon":"🧭","steps":[{"title":"Three media: see, play, and continue exploring","source":"Chapter 5 complementary media roles","body":"The physical model supports spatial understanding; the card game turns people, spaces, ornaments, and texts into playable relationships; digital displays support remote tours, close inspection, and extended exploration. They should complement rather than duplicate one another.","facts":["Models emphasize spatial cognition.","Cards emphasize relationships, strategy, and memory.","Digital displays integrate detail and remote access."],"question":"What is the card game’s main role?","choices":["Replace every site visit and model","Turn heritage knowledge into playable relationships and decisions","Only display photographs"],"answer":1,"feedback":"The game matters when knowledge becomes part of player action."},{"title":"3D scanning and modeling: support understanding, not replacement","source":"Abstract, Chapter 4, and Chapter 5","body":"3D scanning and modeling can document form, scale, and spatial relations and provide low-impact remote access. Quality still depends on occlusion, precision, processing, and maintenance, so a model cannot replace the material site.","facts":["Models assist location and comparison.","Gaps, error, and editing should be documented.","Material, setting, and use remain irreplaceable."],"question":"What is the best description of a digital model?","choices":["A complete replacement for the heritage asset","A tool for documentation, understanding, and display","A reason to stop maintaining the real site"],"answer":1,"feedback":"Digital access expands learning without cancelling physical conservation."},{"title":"Selecting knowledge points: every interaction needs a purpose","source":"Chapter 4 digital knowledge-point planning","body":"The forecourt, huatai, five-element stones, bracket paintings, and sterculia tree were selected because they represent space, geomancy, craft, and local memory. Selection should consider significance, evidence, clarity, and whether interaction adds value.","facts":["Not every detail needs an animation.","Interaction should serve knowledge rather than spectacle.","Uncertain content needs clear labels."],"question":"What should come first when choosing an animation topic?","choices":["The maximum number of visual effects","A clear learning purpose supported by evidence","The maximum amount of text on screen"],"answer":1,"feedback":"Digital effects have educational value only when they improve understanding."},{"title":"Gamification: feedback should teach, not frustrate","source":"Card-game design and v2.30 balance policy","body":"Basic combos, advanced challenges, immediate feedback, puzzles, and certificates can sustain engagement, but rules must not overwhelm heritage content. Two-card combos should be common; three- to four-card combos should be less frequent. Method cards should reduce bad luck rather than repeatedly destroy the opponent’s board.","facts":["Create achievable early success before deeper challenge.","Difficulty should come from decisions, not hidden rules.","Feedback should explain why an action worked."],"question":"Which combo distribution best supports broad acceptability?","choices":["Most combos require four cards","More two-card basics and fewer three- to four-card advanced combos","No combo guidance at all"],"answer":1,"feedback":"Frequent basic success lowers frustration while advanced patterns preserve mastery."},{"title":"Maintenance: an operational prototype is only the beginning","source":"Abstract, limitations, and Chapter 5 challenges","body":"Digital works require browser compatibility, link checks, rights management, content correction, backups, accessibility, and clear update responsibility. Modular data and version records make expansion safer.","facts":["Digital content ages as technology and evidence change.","Modular data is easier to revise.","Original files, sources, and versions should be retained."],"question":"What most improves long-term usability?","choices":["Hard-code everything and discard source files","Maintain versions, sources, backups, and update responsibility","Focus only on the first exhibition"],"answer":1,"feedback":"Maintainability is part of digital heritage practice."},{"title":"Accessibility and older users: make the design genuinely usable","source":"Meeting decisions on interface improvement","body":"Font size, contrast, button dimensions, information density, guidance, keyboard access, and mobile layout affect whether users can complete the experience. Actual older users and people with different backgrounds must test the design.","facts":["Accessibility is more than enlarging text.","Different ages and backgrounds should be included.","Clarity and factual accuracy must coexist."],"question":"Who should participate in older-user-friendly testing?","choices":["Only developers familiar with the project","Older users and general players with varied backgrounds","Only high-performance computers"],"answer":1,"feedback":"Real users expose barriers that designers may not notice."}]},{"id":"ethics","title":"Conservation Ethics","subtitle":"Responsible choices among access, rights, memory, and uncertainty","icon":"⚖️","steps":[{"title":"Private heritage: maximum exposure is not the only goal","source":"Research purposes, scope, and Chapter 5","body":"The hall is privately owned and remains connected to family life and ritual. Outreach should respect consent, opening times, photographable areas, and sensitive information. Digital access does not justify unrestricted physical access.","facts":["Heritage status does not erase ownership or privacy.","Access conditions require communication with managers and owners.","Digital display can also create privacy and location risks."],"question":"What is the most appropriate outreach principle?","choices":["Maximize visitor volume at all costs","Balance consent, quiet enjoyment, and education","Assume private boundaries no longer apply"],"answer":1,"feedback":"Legitimate outreach begins by respecting the living site."},{"title":"Interview consent and narrative rights","source":"Interview planning and general research ethics","body":"Participants should understand the purpose, recording method, use, and identity disclosure before agreeing. They should be able to refuse, correct, or withdraw sensitive material. Game adaptation must not distort testimony for dramatic effect.","facts":["Consent requires understandable information.","Interesting family information is not automatically public.","Quotation and adaptation must follow the agreed use."],"question":"A participant shares a sensitive memory but refuses publication. What should happen?","choices":["Use it because it is dramatic","Respect the request and omit or anonymize it as agreed","Remove the name and use it without further limits"],"answer":1,"feedback":"Outreach cannot be built by sacrificing participant trust and rights."},{"title":"Marking uncertainty: gaps are not invitations to invent","source":"Research limitations and unresolved evidence","body":"Some claims about stones, roof forms, bricks, or wedding objects remain incomplete. Wording such as “the repair report records,” “an interviewee recalled,” “current inference,” and “requires further study” distinguishes evidence levels.","facts":["Uncertainty labels strengthen credibility.","Different evidence levels can coexist.","Quiz answers should not depend on an unverified single claim."],"question":"What is the best question design when evidence is incomplete?","choices":["Require memorization of an unverified answer","Ask learners to identify the evidence type and need for verification","Invent a complete story"],"answer":1,"feedback":"Research ethics includes not presenting the unknown as known."},{"title":"Simplification without stereotyping","source":"Researcher interpretation and translation limitations","body":"Simplification helps general audiences, but Hakka identity, kinship, women’s roles, and ritual cannot be reduced to fixed stereotypes. Differences among periods, families, and personal experiences must remain visible.","facts":["Translation requires choices that should be explainable.","One case cannot represent an entire population.","Multiple views and exceptions reduce stereotyping."],"question":"What can one interviewee’s wedding experience establish?","choices":["Every Hakka family is identical","It is valuable local experience but should not be overgeneralized","Oral experience has no value"],"answer":1,"feedback":"Good interpretation keeps the boundary between a concrete story and a broad claim."},{"title":"Images, rights, and permission","source":"Image collection and project rights management","body":"Photographs, repair drawings, genealogies, interview images, and third-party website material may involve copyright, portrait rights, owner consent, and use terms. Publication should verify rights and attribution and prefer self-produced or properly licensed material.","facts":["Downloadable does not mean reusable.","Attribution and permission are different requirements.","Sensitive locations and personal data may need masking."],"question":"After finding an image on an official website, what comes next?","choices":["Assume it is unrestricted","Check use terms, permission, and attribution requirements","Remove the watermark and reuse it"],"answer":1,"feedback":"Responsible heritage education also respects the rights attached to source material."},{"title":"Claims about effectiveness: match conclusions to evidence","source":"Limitations of evaluation and player-testing plan","body":"Players saying a game is enjoyable or clear is useful design feedback, but without pre/post measures, comparison, sufficient sample size, and analysis, it does not prove long-term learning or cultural identity effects.","facts":["Satisfaction is not the same as learning impact.","Small usability samples do not represent everyone.","Precise, limited conclusions have greater research value."],"question":"Ten players mostly liked the game. What can be said?","choices":["Initial acceptability is promising, but more testing is needed","All citizens will gain cultural identity","A strict causal effect has been proven"],"answer":0,"feedback":"Conclusions should match the design, sample, and measurements actually used."}]}];
  let completed = new Set();
  let currentBranch = null;
  let currentStep = 0;
  let answeredCorrectly = false;
  let standalone = false;

  const T = {"close":"Close","eyebrow":"Beyond the Match · Detailed Heritage Learning","title":"Choose a path and examine the details with the Guardian","intro":"Each lesson shows its evidence type, explanation, observation points, and an interactive question. The sequence moves from spatial and material foundations to research methods, digital interpretation, and conservation ethics. Complete all seven paths to reveal the memory image and download a certificate.","choiceLabel":"Choose card play or heritage learning","playChoice":"Return to Match Result","startPlay":"Start Card Match","learnChoice":"Continue Heritage Paths","puzzle":"Memory Puzzle","completeTitle":"All Seven Heritage Learning Paths Completed","completeBody":"Enter your name to download the full ancestral hall background and a heritage learning certificate.","name":"Name","namePlaceholder":"Enter your name","downloadBackground":"Download Full Background","downloadCertificate":"Download Certificate","endLearning":"Finish Learning and Return Home","backHub":"Back to Path Menu","questionTitle":"Interactive Check","reveal":"Show Answer and Explanation","prev":"Previous","next":"Next","finishBranch":"Complete This Path","done":"Completed","notDone":"Not completed","start":"Start Exploring","source":"Source type","facts":"Observe and Understand","answerPrompt":"Choose one answer.","correct":"Correct.","tryAgain":"That answer is incomplete. Try again or use “Show Answer and Explanation.”","backgroundFilename":"Hsieh_Ancestral_Hall_Background.png","enterName":"Please enter your name first.","generating":"Generating certificate…","failed":"Certificate generation failed. Reload the page and try again.","generated":"Certificate generated.","certificateTitle":"Hsieh Ancestral Hall","certificateEnglish":"HERITAGE LEARNING CERTIFICATE","certify":"This certifies that","certificateBody":"has completed seven paths: Spatial Layout, Architectural Ornament, Ritual Texts, Local Memory, Research Methods, Digital Interpretation, and Conservation Ethics.","completedDate":"Completion date","certificateMotto":"To understand the building is also to understand the people, rituals, and memories that sustain it.","certificateFilename":"Hsieh_Ancestral_Hall_Heritage_Certificate"};

  function safeGet(key, fallback = null) { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } }
  function safeSet(key, value) { try { localStorage.setItem(key, value); } catch {} }

  function loadProgress() {
    try {
      const saved = JSON.parse(safeGet(STORAGE_KEY, "[]"));
      completed = new Set(Array.isArray(saved) ? saved.filter((id) => branches.some((b) => b.id === id)) : []);
    } catch { completed = new Set(); }
  }
  function saveProgress() { safeSet(STORAGE_KEY, JSON.stringify([...completed])); }

  function ensureUi() {
    if ($("#heritage-journey-modal")) return;
    const modal = document.createElement("div");
    modal.id = "heritage-journey-modal";
    modal.className = "modal hidden heritage-journey-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "heritage-journey-title");
    modal.innerHTML = `
      <div class="modal-panel heritage-journey-panel">
        <button aria-label="${T.close}" class="modal-close" id="heritage-journey-close" type="button">×</button>
        <section id="heritage-journey-hub">
          <p class="eyebrow">${T.eyebrow}</p>
          <h2 id="heritage-journey-title">${T.title}</h2>
          <p class="heritage-journey-intro">${T.intro}</p>
          <div class="heritage-path-choice" role="group" aria-label="${T.choiceLabel}">
            <button class="secondary-button" id="heritage-return-play" type="button">${T.playChoice}</button>
            <button class="primary-button" id="heritage-continue-learning" type="button">${T.learnChoice}</button>
          </div>
          <div class="heritage-branch-grid" id="heritage-branch-grid"></div>
          <section class="memory-puzzle-section">
            <div class="memory-puzzle-heading"><strong>${T.puzzle}</strong><span id="memory-puzzle-count">0／7</span></div>
            <div class="memory-puzzle-grid" id="memory-puzzle-grid"></div>
          </section>
          <section class="heritage-completion-panel hidden" id="heritage-completion-panel">
            <h3>${T.completeTitle}</h3>
            <p>${T.completeBody}</p>
            <label class="field-label" for="certificate-name">${T.name}</label>
            <input class="select-input" id="certificate-name" maxlength="40" placeholder="${T.namePlaceholder}" type="text"/>
            <div class="modal-actions">
              <button class="secondary-button" id="download-background" type="button">${T.downloadBackground}</button>
              <button class="primary-button" id="download-certificate" type="button">${T.downloadCertificate}</button>
            </div>
            <p class="certificate-status" id="certificate-status" aria-live="polite"></p>
          </section>
          <div class="modal-actions heritage-exit-actions">
            <button class="secondary-button" id="heritage-end-learning" type="button">${T.endLearning}</button>
          </div>
        </section>
        <section class="heritage-branch-detail hidden" id="heritage-branch-detail">
          <div class="heritage-detail-topline"><span id="heritage-detail-progress"></span><button class="ghost-button" id="heritage-back-hub" type="button">${T.backHub}</button></div>
          <p class="eyebrow" id="heritage-detail-kicker"></p>
          <h2 id="heritage-detail-title"></h2>
          <span class="heritage-source-badge" id="heritage-detail-source"></span>
          <p class="heritage-detail-body" id="heritage-detail-body"></p>
          <div class="heritage-facts" id="heritage-detail-facts"></div>
          <section class="heritage-question-panel" aria-labelledby="heritage-question-title">
            <h3 id="heritage-question-title">${T.questionTitle}</h3>
            <p id="heritage-question-text"></p>
            <div class="heritage-answer-grid" id="heritage-answer-grid"></div>
            <p class="heritage-answer-feedback" id="heritage-answer-feedback" aria-live="polite"></p>
            <button class="ghost-button" id="heritage-reveal-answer" type="button">${T.reveal}</button>
          </section>
          <div class="modal-actions">
            <button class="secondary-button" id="heritage-detail-prev" type="button">${T.prev}</button>
            <button class="primary-button" id="heritage-detail-next" type="button" disabled>${T.next}</button>
          </div>
        </section>
      </div>`;
    document.body.appendChild(modal);
  }

  function renderHub() {
    const grid = $("#heritage-branch-grid");
    grid.innerHTML = branches.map((branch) => `
      <button class="heritage-branch-button ${completed.has(branch.id) ? "completed" : ""}" data-branch="${branch.id}" type="button">
        <span class="heritage-branch-icon" aria-hidden="true">${branch.icon}</span>
        <span><strong>${branch.title}</strong><small>${branch.subtitle}</small></span>
        <b>${completed.has(branch.id) ? T.done : T.start}</b>
      </button>`).join("");
    const puzzle = $("#memory-puzzle-grid");
    const puzzleColumns = 3;
    const puzzleRows = Math.ceil(branches.length / puzzleColumns);
    puzzle.style.setProperty("--puzzle-columns", puzzleColumns);
    puzzle.style.setProperty("--puzzle-rows", puzzleRows);
    puzzle.innerHTML = branches.map((branch, index) => {
      const column = index % puzzleColumns;
      const row = Math.floor(index / puzzleColumns);
      const x = puzzleColumns === 1 ? 0 : (column / (puzzleColumns - 1)) * 100;
      const y = puzzleRows === 1 ? 0 : (row / (puzzleRows - 1)) * 100;
      return `<div class="memory-puzzle-piece ${completed.has(branch.id) ? "revealed" : ""}" style="--piece-x:${x}%;--piece-y:${y}%;--piece-bg-x:${puzzleColumns * 100}%;--piece-bg-y:${puzzleRows * 100}%" aria-label="${branch.title}: ${completed.has(branch.id) ? T.done : T.notDone}"><span>${completed.has(branch.id) ? branch.icon : "?"}</span></div>`;
    }).join("");
    $("#memory-puzzle-count").textContent = `${completed.size}／${branches.length}`;
    $("#heritage-completion-panel").classList.toggle("hidden", completed.size !== branches.length);
    const playChoiceButton = $("#heritage-return-play");
    playChoiceButton.classList.remove("hidden");
    playChoiceButton.textContent = standalone ? T.startPlay : T.playChoice;
  }

  function openJourney(options = {}) {
    ensureUi();
    standalone = Boolean(options.standalone) || new URLSearchParams(location.search).get("mode") === "learn";
    loadProgress();
    renderHub();
    $("#opening-overlay")?.classList.add("hidden");
    $("#ending-overlay")?.classList.add("hidden");
    $("#game-over-modal")?.classList.add("hidden");
    if (standalone) $("#game-screen")?.classList.add("hidden");
    $("#heritage-journey-hub").classList.remove("hidden");
    $("#heritage-branch-detail").classList.add("hidden");
    $("#heritage-journey-modal").classList.remove("hidden");
    $("#heritage-journey-title")?.focus?.();
  }

  function closeJourney() {
    if (standalone) {
      location.href = "index-en.html";
      return;
    }
    $("#heritage-journey-modal")?.classList.add("hidden");
    $("#game-over-modal")?.classList.remove("hidden");
  }

  function returnToPlay() {
    if (standalone) {
      location.href = "battle-en.html";
      return;
    }
    closeJourney();
  }

  function endLearning() {
    const home = LANG === "en" ? "index-en.html" : (document.body.classList.contains("zhuyin-mode") ? "index-zhuyin.html" : "index.html");
    location.href = home;
  }

  function openBranch(id) {
    currentBranch = branches.find((branch) => branch.id === id);
    if (!currentBranch) return;
    currentStep = 0;
    $("#heritage-journey-hub").classList.add("hidden");
    $("#heritage-branch-detail").classList.remove("hidden");
    renderBranchStep();
  }

  function renderBranchStep() {
    const step = currentBranch.steps[currentStep];
    answeredCorrectly = false;
    $("#heritage-detail-progress").textContent = `${currentBranch.title}｜${currentStep + 1}／${currentBranch.steps.length}`;
    $("#heritage-detail-kicker").textContent = currentBranch.subtitle;
    $("#heritage-detail-title").textContent = step.title;
    $("#heritage-detail-source").textContent = `${T.source}: ${step.source}`;
    $("#heritage-detail-body").textContent = step.body;
    $("#heritage-detail-facts").innerHTML = `<h3>${T.facts}</h3><ul>${step.facts.map((fact) => `<li>${fact}</li>`).join("")}</ul>`;
    $("#heritage-question-text").textContent = step.question;
    $("#heritage-answer-grid").innerHTML = step.choices.map((choice, index) => `<button class="heritage-answer-button" data-answer="${index}" type="button">${choice}</button>`).join("");
    $("#heritage-answer-feedback").textContent = T.answerPrompt;
    $("#heritage-detail-prev").disabled = currentStep === 0;
    const next = $("#heritage-detail-next");
    next.disabled = true;
    next.textContent = currentStep === currentBranch.steps.length - 1 ? T.finishBranch : T.next;
    $("#heritage-branch-detail").scrollTop = 0;
  }

  function answerQuestion(index, reveal = false) {
    const step = currentBranch.steps[currentStep];
    const buttons = [...document.querySelectorAll(".heritage-answer-button")];
    buttons.forEach((button, i) => {
      button.classList.toggle("correct", i === step.answer);
      if (!reveal) button.classList.toggle("incorrect", i === index && i !== step.answer);
      button.setAttribute("aria-pressed", i === index ? "true" : "false");
    });
    if (index === step.answer || reveal) {
      answeredCorrectly = true;
      $("#heritage-answer-feedback").textContent = `${T.correct} ${step.feedback}`;
      $("#heritage-detail-next").disabled = false;
    } else {
      $("#heritage-answer-feedback").textContent = T.tryAgain;
    }
  }

  function nextStep() {
    if (!answeredCorrectly) return;
    if (currentStep < currentBranch.steps.length - 1) {
      currentStep += 1;
      renderBranchStep();
      return;
    }
    completed.add(currentBranch.id);
    saveProgress();
    $("#heritage-journey-hub").classList.remove("hidden");
    $("#heritage-branch-detail").classList.add("hidden");
    renderHub();
  }
  function previousStep() { if (currentStep > 0) { currentStep -= 1; renderBranchStep(); } }
  function backToHub() { $("#heritage-journey-hub").classList.remove("hidden"); $("#heritage-branch-detail").classList.add("hidden"); renderHub(); }

  function triggerDownload(href, filename) { const a = document.createElement("a"); a.href = href; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); }
  function downloadBackground() { triggerDownload("assets/real-hall.png", T.backgroundFilename); }
  function loadImage(src) { return new Promise((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = src; }); }
  function drawCover(ctx, image, width, height) { const scale = Math.max(width / image.width, height / image.height); const sw = width / scale; const sh = height / scale; ctx.drawImage(image, (image.width-sw)/2, (image.height-sh)/2, sw, sh, 0, 0, width, height); }

  function setFittedFont(ctx, text, maxWidth, maxSize, minSize, weight = 400) {
    const family = '"Segoe UI", Arial, sans-serif';
    let size = maxSize;
    do {
      ctx.font = `${weight} ${size}px ${family}`;
      if (ctx.measureText(text).width <= maxWidth) break;
      size -= 2;
    } while (size > minSize);
    return size;
  }

  function wrapLines(ctx, text, maxWidth) {
    const words = text.trim().split(/\s+/);
    const lines = [];
    let line = "";
    words.forEach((word) => {
      const next = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(next).width > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    });
    if (line) lines.push(line);
    return lines;
  }

  function drawCenteredWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
    const lines = wrapLines(ctx, text, maxWidth).slice(0, maxLines);
    lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
    return y + Math.max(0, lines.length - 1) * lineHeight;
  }

  async function downloadCertificate() {
    const status = $("#certificate-status");
    const name = $("#certificate-name").value.trim();
    if (!name) { status.textContent = T.enterName; $("#certificate-name").focus(); return; }
    status.textContent = T.generating;
    try {
      const image = await loadImage("assets/real-hall.png");
      const canvas = document.createElement("canvas"); canvas.width = 1600; canvas.height = 1130;
      const ctx = canvas.getContext("2d"); drawCover(ctx, image, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(0,0,0,canvas.height); gradient.addColorStop(0,"rgba(5,17,20,.55)"); gradient.addColorStop(.5,"rgba(5,17,20,.72)"); gradient.addColorStop(1,"rgba(5,17,20,.9)"); ctx.fillStyle=gradient; ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.strokeStyle="#e4c27e"; ctx.lineWidth=10; ctx.strokeRect(44,44,canvas.width-88,canvas.height-88); ctx.strokeStyle="rgba(228,194,126,.55)"; ctx.lineWidth=3; ctx.strokeRect(68,68,canvas.width-136,canvas.height-136);
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#f0ddb0";
      setFittedFont(ctx, T.certificateTitle, 1280, 68, 46, 700);
      ctx.fillText(T.certificateTitle, 800, 172);
      setFittedFont(ctx, T.certificateEnglish, 1280, 42, 30, 600);
      ctx.fillText(T.certificateEnglish, 800, 235);

      ctx.fillStyle = "#e8e0d0";
      setFittedFont(ctx, T.certify, 1100, 38, 28, 500);
      ctx.fillText(T.certify, 800, 340);

      ctx.fillStyle = "#fff";
      setFittedFont(ctx, name, 1080, 78, 42, 700);
      ctx.fillText(name, 800, 450);

      ctx.fillStyle = "#e8e0d0";
      ctx.font = '500 32px "Segoe UI", Arial, sans-serif';
      drawCenteredWrappedText(ctx, T.certificateBody, 800, 560, 1180, 48, 3);

      ctx.fillStyle = "#f0ddb0";
      ctx.font = '500 29px "Segoe UI", Arial, sans-serif';
      ctx.fillText(`${T.completedDate}: ${new Date().toLocaleDateString("en-US")}`, 800, 790);

      ctx.fillStyle = "#d3c8b2";
      ctx.font = '400 25px "Segoe UI", Arial, sans-serif';
      drawCenteredWrappedText(ctx, T.certificateMotto, 800, 910, 1160, 38, 3);
      canvas.toBlob((blob) => { if (!blob) { status.textContent=T.failed; return; } const url=URL.createObjectURL(blob); triggerDownload(url,`${name}_${T.certificateFilename}.png`); setTimeout(()=>URL.revokeObjectURL(url),1000); status.textContent=T.generated; },"image/png");
    } catch (error) { console.error(error); status.textContent=T.failed; }
  }

  function handleClick(event) {
    const branchButton = event.target.closest("[data-branch]"); if (branchButton) { openBranch(branchButton.dataset.branch); return; }
    const answer = event.target.closest("[data-answer]"); if (answer) { answerQuestion(Number(answer.dataset.answer)); return; }
    const id = event.target.closest("button")?.id;
    if (id === "heritage-journey-close") closeJourney();
    else if (id === "heritage-back-hub") backToHub();
    else if (id === "heritage-detail-prev") previousStep();
    else if (id === "heritage-detail-next") nextStep();
    else if (id === "heritage-reveal-answer") answerQuestion(currentBranch.steps[currentStep].answer, true);
    else if (id === "download-background") downloadBackground();
    else if (id === "download-certificate") downloadCertificate();
    else if (id === "heritage-return-play") returnToPlay();
    else if (id === "heritage-continue-learning") $("#heritage-branch-grid")?.scrollIntoView({behavior:"smooth",block:"start"});
    else if (id === "heritage-end-learning") endLearning();
  }

  function init() {
    ensureUi(); loadProgress();
    document.addEventListener("click", (event) => {
      if (event.target.closest("#heritage-journey-button, #heritage-start-button")) { event.preventDefault(); openJourney({standalone: event.target.closest("#heritage-start-button") != null}); return; }
      if (event.target.closest("#heritage-journey-modal")) handleClick(event);
    });
    $("#heritage-journey-modal")?.addEventListener("click", (event) => { if (event.target === event.currentTarget) closeJourney(); });
    if (new URLSearchParams(location.search).get("mode") === "learn") setTimeout(() => openJourney({standalone:true}), 0);
  }

  window.HSIEH_HERITAGE_JOURNEY = { open: openJourney, close: closeJourney, branches };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once:true }); else init();
})();
