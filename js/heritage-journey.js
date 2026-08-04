(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const STORAGE_KEY = "hsiehHeritageJourneyZhV221";
  const LANG = "zh";
  const branches = [{"id":"space","title":"空間格局","subtitle":"從二堂二橫、中軸動線到化胎與水路","icon":"🏛️","steps":[{"title":"二堂二橫：宗祠的整體骨架","source":"修復計畫與專題整理","body":"謝氏宗祠為二堂二橫的合院格局。中軸上的前堂與後堂形成兩進堂屋，左右橫屋分列兩側。這種配置把祭祀核心、家族共用空間與各房生活空間安排在同一座建築中。","facts":["二堂是前堂與後堂。","二橫是左右橫屋。","整體格局兼具祭祀、生活與宗族公共事務功能。"],"question":"下列何者最能概括謝氏宗祠的主要格局？","choices":["單進單院","二堂二橫","三塔一殿"],"answer":1,"feedback":"二堂二橫是理解謝氏宗祠整體空間的第一個關鍵。"},{"title":"門樓與禾埕：進入宗祠前的前場","source":"修復計畫、現地調查與訪談整理","body":"門樓界定宗祠內外，也建立入口身分。禾埕不是普通空地；它曾承擔曬穀、家族聚會、祭典準備、流水席與孩童活動等用途。從禾埕望向門樓與正身，可看出宗祠與聚落生活的連結。","facts":["門樓具有界定內外與建立入口秩序的作用。","禾埕可在日常生產、聚會與祭典之間轉換。","空間的使用方式也是文化資產知識。"],"question":"禾埕最適合被理解為什麼？","choices":["只供觀賞的庭園","兼具生產、聚會與祭典功能的前場","只供停車的空地"],"answer":1,"feedback":"禾埕的價值來自多重使用，不只是建築前的空白。"},{"title":"前堂、天井與後堂：由外而內的禮序","source":"修復計畫與專題整理","body":"前堂、天井與後堂沿中軸排列。前堂偏向迎接、集會與儀式準備；天井提供採光、通風、排水與空間轉折；後堂集中神龕、祖牌與祭祀活動。人的移動因此逐步由較公共的空間進入祭祀核心。","facts":["中軸線同時整理動線與禮制層次。","天井兼具環境調節與儀式轉場功能。","後堂是祖先祭祀與宗族秩序的核心。"],"question":"哪一個空間最接近祖牌與祭祀核心？","choices":["禾埕","後堂","門樓外側"],"answer":1,"feedback":"後堂是祭祀核心；前堂與天井則形成進入核心前的過渡。"},{"title":"左右橫屋與書房：生活、議事與教化","source":"專題整理與訪談記憶","body":"左右橫屋補充正身空間，曾承擔居住、書房、會議、祭典準備與器物保存等功能。訪談也指出，部分書房空間曾供宗親居住或作為後續會議使用，顯示宗祠不只是祭拜場所，也是宗族日常運作的空間。","facts":["橫屋與前後堂共同構成二堂二橫。","書房反映教育與教化功能。","會議與議事功能呈現宗族組織的公共性。"],"question":"左右橫屋的文化價值主要來自哪一點？","choices":["只作為裝飾背景","承接生活、教育與公共事務","完全不與宗祠活動相關"],"answer":1,"feedback":"橫屋使宗祠兼具祭祀、生活、教育與組織運作。"},{"title":"化胎、蘋婆樹與後場收束","source":"修復計畫、現地調查與訪談整理","body":"化胎位於後堂後方，是宗祠空間的後場收束，也與風水調節及象徵保護有關。化胎上有百年以上的蘋婆樹，長期與宗祠共存；它既是景觀元素，也承載族人採果、玩耍與祖先遷徙傳說等地方記憶。","facts":["化胎位於中軸最內側。","化胎與前方門樓、禾埕、前後堂形成完整前後秩序。","蘋婆樹同時具有自然、生活與記憶價值。"],"question":"蘋婆樹的重要性不只在於樹齡，還包括什麼？","choices":["族人生活記憶與地方敘事","可任意移植的位置","與宗祠毫無關係"],"answer":0,"feedback":"文化資產價值不只在物件本身，也在長期使用與共同記憶。"},{"title":"天井排水與七折水路","source":"訪談在地說法，仍需後續測繪與考證","body":"受訪者提到，天井雨水沿水路轉折排出，地方以「七折水路」理解其路徑，並指出九折具有更高等級的象徵，因此本宗祠以七折為說法。此內容具有地方辨識度，但目前主要來自訪談，應與現地測繪及修復資料交叉確認。","facts":["水路處理與天井排水功能直接相關。","「七折」是地方使用者對水路轉折的說法。","口述知識需標示來源並保留後續考證空間。"],"question":"面對「七折水路」這類訪談知識，最適當的態度是什麼？","choices":["直接當成毫無疑問的唯一史實","完全忽略地方說法","保留在地記憶並與測繪、文獻交叉確認"],"answer":2,"feedback":"文化資產教育應同時尊重地方記憶與資料查證。"}]},{"id":"decoration","title":"建築裝飾","subtitle":"從斗栱、鳳眼到壽字磚與五穀豐收","icon":"🎨","steps":[{"title":"前堂斗栱：結構、出簷與彩繪工藝","source":"修復計畫與專題整理","body":"前堂前後立面共有六組插栱式斗栱。斗栱承接屋面與梁架荷載，也可加深出簷、保護牆身與柱礎。中央兩座斗栱的斗抱、正栱、副栱、碗斗、通梁與托木較為華麗，顯示中軸位置在視覺秩序上的重要性。","facts":["斗栱兼具結構與裝飾作用。","中央斗栱比兩側更華麗。","彩繪與雕刻可呈現匠師技法及觀看主次。"],"question":"前堂中央斗栱較華麗，最能反映什麼？","choices":["中軸位置具有較高視覺重要性","中央構件不需承重","所有斗栱完全相同"],"answer":0,"feedback":"中央構件的裝飾差異，是理解建築視覺秩序的重要線索。"},{"title":"鳳眼：後堂的通風、採光與對稱細部","source":"修復計畫與專題整理","body":"後堂神案後方兩側設有鳳眼。這類孔洞具有通風與採光作用，也因位置、形狀與左右對稱而成為立面構成的一部分。鳳眼不像前堂彩繪那樣醒目，卻維持祭祀空間的整飭與觀視秩序。","facts":["鳳眼位於後堂神案後方兩側。","鳳眼兼具實用與裝飾功能。","對稱配置有助於維持後堂的莊重秩序。"],"question":"鳳眼最完整的功能說明是哪一項？","choices":["只是一個沒有功能的洞","兼具通風、採光與立面秩序","專門用來放置祖牌"],"answer":1,"feedback":"鳳眼是小尺度構件，但同時連結環境功能與建築美感。"},{"title":"燕尾脊：屋頂輪廓與宗祠辨識","source":"修復計畫與訪談整理","body":"燕尾脊以屋脊兩端向上揚起的輪廓形成外觀辨識。它與建築身分、地方審美及家族對宗祠氣勢的理解相關。訪談認為其形成可能與建祠相關人物的地方名望或官職有關，但此說仍待進一步考證，不宜直接視為確定結論。","facts":["燕尾脊是宗祠外觀的重要識別。","屋脊線條與立面比例共同形成建築氣勢。","地方解釋須與文獻及修復資料交叉確認。"],"question":"對燕尾脊的地方傳說，應如何呈現？","choices":["標示為訪談說法並說明仍待考證","直接改寫成確定史實","完全刪除地方記憶"],"answer":0,"feedback":"清楚區分已確認資料與地方說法，才能兼顧可信度與在地性。"},{"title":"五行石與土地龍神：後場的護佑系統","source":"修復計畫與專題整理","body":"化胎壁上的五行石由左至右記錄為木、金、土、水、火。現況象徵形態已不清楚，且與原貌可能有差異；它仍可作為理解方位、氣場與空間平衡的線索。後堂的土地龍神則把土地守護信仰納入宗祠祭祀環境。","facts":["五行石應與化胎、中軸及後堂共同理解。","現況並非原貌，解說時應說明保存狀態。","土地龍神反映土地與空間守護信仰。"],"question":"五行石最不適合被當成什麼？","choices":["整體風水秩序的一部分","完全獨立、與空間無關的裝飾品","保存狀況需說明的文化構件"],"answer":1,"feedback":"五行石的意義來自它與化胎、中軸及祭祀空間的關係。"},{"title":"壽字磚：地方命名與辨識","source":"訪談在地稱呼，具體年代與圖案意涵仍待考證","body":"受訪者把宗祠中的特定磚飾稱為「壽字磚」，並認為它具有辨識度。現有資料支持這一地方稱呼曾被使用，但對其製作年代、構圖來源與完整象徵意義尚不足以作確定判斷。教學時應保留名稱，也要明示資料界線。","facts":["「壽字磚」是受訪者使用的地方稱呼。","名稱本身可作為口述記憶保存。","年代與圖案意涵仍需專業調查。"],"question":"目前對壽字磚最穩健的說法是什麼？","choices":["已完全確認所有年代與象徵","地方稱呼具有價值，但細節仍待調查","它與文化資產無關"],"answer":1,"feedback":"不知道的部分應清楚標示，而不是用看似完整的說法補滿。"},{"title":"五穀豐收：農業生活進入建築裝飾","source":"訪談整理","body":"受訪者指出，門樓紅色裝飾區可見五穀題材，上方配有太極。這類裝飾把農作、歲時循環與祈求豐收的願望帶入建築之中，是理解客庄生活經驗的重要入口。","facts":["五穀題材與農業生產及歲時循環相關。","太極與五穀共同構成地方對安定與豐收的象徵表達。","具體位置與細部仍應配合現地影像及調查資料確認。"],"question":"五穀豐收主要連結哪一類生活經驗？","choices":["海洋航行","農業生產與歲時循環","現代工業製造"],"answer":1,"feedback":"裝飾題材也是地方生活史的證據。"}]},{"id":"text","title":"祭祀文字","subtitle":"從堂號、聯語、祖牌到三元及第與祭祀層次","icon":"📜","steps":[{"title":"謝氏宗祠、寶樹堂與木本水源","source":"修復計畫與專題整理","body":"門樓額題「謝氏宗祠」，直接標示建築性質；前堂中門上方的「寶樹堂」形成家族堂號識別；後堂前方的「木本水源」則以追本溯源的語意連結祖先祭祀與家族記憶。三者由外而內建立不同層次的文字識別。","facts":["門樓題字對外標示宗祠身分。","寶樹堂凝聚謝氏堂號與祖源記憶。","木本水源強調報本追遠。"],"question":"「木本水源」最接近下列哪一項意義？","choices":["追念根源與祖德","描述屋頂材料","記錄天井尺寸"],"answer":0,"feedback":"木本水源把後堂祭祀空間導向慎終追遠的文化意涵。"},{"title":"門聯、棟對與楹聯：寫在建築上的家訓","source":"修復計畫與專題整理","body":"門聯、棟對與楹聯透過成對語句，闡述祖德、敦倫、報本、教化與家風。它們不是附加文字，而是依附在門柱、梁柱與重要構件上，讓建築同時成為道德敘事與價值宣示的載體。","facts":["聯語通常成對配置。","內容可勉勵後代並宣示宗族理念。","位置、書法、材質與原有脈絡都是保存重點。"],"question":"楹聯的文化資產價值只在文字內容嗎？","choices":["是，位置與材質都不重要","不是，內容、位置、書法與材質都重要","只要拍照就能完全取代原物"],"answer":1,"feedback":"文化資產需連同原有位置與物質載體一起理解。"},{"title":"祖牌、譜系與昭穆秩序","source":"修復計畫與專題整理","body":"祖牌以姓名、稱謂、世系與排列位置，把抽象的血緣關係轉化為可見、可辨識、可祭祀的秩序。謝氏宗祠保存多組祖牌，祭祀對象涵蓋始祖、開基祖與各戶派不同世代祖先。原有排列與使用脈絡本身就是重要資訊。","facts":["祖牌具體化宗族世系。","排列反映世代與祭祀層次。","離開原有脈絡後，文化意義可能大幅減弱。"],"question":"保存祖牌時，除了材質與字跡，還應保存什麼？","choices":["原有排列與使用脈絡","只保存最大的一塊","任意重新排序"],"answer":0,"feedback":"祖牌的空間位置與排列，是祭祀秩序的一部分。"},{"title":"三元及第：後堂木構的水平對齊","source":"修復計畫與專題整理","body":"後堂廳下的棟桁下皮、燈桁下皮與門楣下皮形成一直線，計畫圖說稱為「三元及第」。這種構造與視覺上的水平對齊，反映木構配置的嚴整，也讓祭祀主空間呈現端正、穩定的秩序感。","facts":["三元及第在此指三個構件下緣的水平對齊。","它同時是構造與視覺秩序。","後堂重點偏向穩重與祭祀核心完整。"],"question":"本宗祠所稱「三元及第」主要指什麼？","choices":["三場考試的成績","三個木構下緣形成水平對齊","三棵樹的位置"],"answer":1,"feedback":"這裡的三元及第是後堂木構與視覺秩序的專有說明。"},{"title":"天公爐、土地龍神與祭祀層次","source":"修復計畫與專題整理","body":"天公爐連結敬天信仰；後堂的土地龍神則指向土地與空間守護。它們與祖牌、神龕及中軸配置共同構成宗祠祭祀系統。現況位置未必完全符合理想中軸，解說時應同時呈現制度意義與現況差異。","facts":["祭祀系統不只包含祖先祭祀。","敬天、土地守護與祖先祭祀形成不同層次。","現況差異是保存與研究的重要資訊。"],"question":"天公爐主要連結哪一種信仰層次？","choices":["敬天","只供照明","只供儲水"],"answer":0,"feedback":"天公爐是理解宗祠敬天信仰的重要器物。"},{"title":"春祭秋嘗：歲時中的祖先祭祀","source":"專題整理與傳統祭祀概念","body":"「春祭秋嘗」指向依歲時進行祖先祭祀的觀念，使宗祠在特定時間被族人重新使用。文字、祖牌、供品、器物與參與者共同啟動祭祀空間，顯示文化資產不只有靜態建築，也包含持續實踐的儀式知識。","facts":["祭祀與季節循環相連。","儀式會重新啟動宗祠空間。","程序、器物與參與者知識都值得記錄。"],"question":"春祭秋嘗最能說明什麼？","choices":["宗祠只是一棟不使用的建築","祭祀與歲時循環及空間實踐相連","祭祀完全不需要參與者"],"answer":1,"feedback":"有形建築與無形祭祀實踐共同構成宗祠文化。"}]},{"id":"community","title":"地方記憶","subtitle":"從嘗會、祭典、蘋婆樹到迎娶燈具與私人文化資產","icon":"🌾","steps":[{"title":"謝申伯公始祖嘗會：共同維護的制度基礎","source":"修復計畫與專題整理","body":"謝申伯公始祖嘗會由七戶共同集結，總計二百五十五份會份，並由管理人處理會務與祭祀事宜。嘗會使祖先祭祀、財產管理與宗族公共事務制度化，也是宗祠得以興建與持續維護的重要基礎。","facts":["嘗會不是單純聚餐組織。","份額、管理與規約反映制度化運作。","後來功能擴展到獎學、敬老、慈善與敦親睦鄰。"],"question":"始祖嘗會最重要的作用是什麼？","choices":["使祭祀與共同事務有制度可循","只負責販售紀念品","與宗祠維護無關"],"answer":0,"feedback":"宗祠能長期存在，也依賴組織、規約與共同維護。"},{"title":"代表大會、祭祀與流水席","source":"訪談記憶與專題整理","body":"訪談指出，宗祠曾舉辦代表大會、祭祀聚會與大型流水席。這些活動讓禾埕、前堂、後堂及橫屋在不同時間承擔不同任務，也使族人透過聚會重新辨認彼此與家族關係。","facts":["活動會重新啟動不同空間。","流水席與代表大會屬地方生活記憶。","保存工作也應記錄使用程序與參與者經驗。"],"question":"為什麼流水席與代表大會也屬文化資產知識？","choices":["因為它們說明宗祠如何被實際使用","因為只要人多就一定是古蹟","它們與空間完全無關"],"answer":0,"feedback":"文化資產價值也存在於人如何使用空間。"},{"title":"書房、教育與宗族公共事務","source":"訪談記憶與專題整理","body":"書房與相關空間曾供宗親居住、讀書、開會及處理後續工作。嘗會宗旨也逐步納入講學、獎學與敬老。這些資料顯示，宗祠不只保存祖先記憶，也參與後代教育與公共事務。","facts":["教育功能使宗祠成為跨世代學習空間。","會議反映宗族治理與協調。","宗祠角色會隨時代調整。"],"question":"宗祠的書房最能反映哪一項功能？","choices":["教育、會議與知識傳承","只用來堆放垃圾","完全不曾被使用"],"answer":0,"feedback":"書房讓宗祠的教化與公共功能具體可見。"},{"title":"蘋婆樹：採果、玩耍與遷徙傳說","source":"修復計畫與訪談記憶","body":"蘋婆樹已有百年以上歷史。受訪者記得孩童曾在樹下玩耍、採果，也把它與祖先遷徙傳說相連。這些記憶使一棵樹不只是植栽，而成為家族生活、景觀變化與世代經驗的共同見證。","facts":["自然物也可能是文化資產場域的重要部分。","兒時記憶補充圖面與文獻看不到的生活面。","傳說應標示為地方記憶，不宜與已證實史實混寫。"],"question":"蘋婆樹的文化價值主要由什麼共同形成？","choices":["樹齡、場域關係與族人記憶","只由果實價格決定","只看樹高"],"answer":0,"feedback":"自然、空間與人的記憶共同形成地方價值。"},{"title":"男燈與女燈：迎娶時帶回宗祠的記憶","source":"訪談記憶，文物年代與細節仍需進一步調查","body":"受訪者指出，迎娶時會有男燈與女燈成對同行，女方燈具可見八角形形式，並與「添丁」願望相連。宗祠保存的燈具被說明為家族婚姻使用後留存，部分已有百年記憶。這些說法適合保存為文物故事，但仍需進一步進行材質、年代與圖像調查。","facts":["男燈女燈與迎娶習俗相關。","文物價值包含使用情境與家族記憶。","年代與二十四孝等圖像內容需專業調查確認。"],"question":"介紹男燈女燈時，最完整的做法是什麼？","choices":["只說它們很好看","同時說明迎娶用途、地方記憶與待考證部分","把訪談內容全部當成確定年代資料"],"answer":1,"feedback":"文物解說應結合用途、口述記憶與查證界線。"},{"title":"奉茶與女性參與：儀式中的家族辨認","source":"訪談記憶","body":"受訪者回憶婚後需多次奉茶，藉此認識龐大家族中的長輩；她也表示女性在祭祀時可以進入正廳，並非只限於後勤空間。這些內容呈現儀式如何協助新成員辨認親屬，也提醒我們不要用單一想像代替實際地方經驗。","facts":["奉茶具有認識長輩與建立關係的功能。","訪談指出女性可進入正廳參與。","不同家族、年代與儀式可能有所差異，應避免過度概括。"],"question":"從這段訪談最適合得到哪一項認識？","choices":["所有客家家庭儀式都完全相同","地方經驗可修正外界的單一想像","女性一定不能進入正廳"],"answer":1,"feedback":"口述歷史可讓我們看到制度文字之外的實際生活。"},{"title":"私人文化資產：理解、尊重與低干擾接近","source":"專題研究結論","body":"謝氏宗祠是私人所有的文化資產，也仍與家族生活及祭祀活動相連。推廣不應只追求大量觀光人潮，而要尊重所有權人意願、場域安寧與祭祀秩序。線上遊戲、模型與虛擬展示可降低進入門檻，但不能取代實地場域，也不能成為打擾生活的理由。","facts":["私人文化資產同時是文化場域與生活空間。","數位推廣可提供低干擾的學習方式。","保存與推廣必須尊重場域界線。"],"question":"對私人宗祠最適當的推廣原則是什麼？","choices":["以人潮最大化為唯一目標","兼顧理解、所有權人意願與低干擾","不需考慮祭祀與生活秩序"],"answer":1,"feedback":"文化資產教育的核心不只是接近，更是知道如何尊重。"}]},{"id":"method","title":"研究方法","subtitle":"從文獻互證、田野調查到訪談與資料界線","icon":"🔎","steps":[{"title":"文獻分析：先建立可查核的知識基礎","source":"專題第一章研究方法與文獻分析","body":"文化資產遊戲的內容不能只靠印象產生。研究先蒐集修復及再利用計畫、地方文獻、族譜節錄、學術研究與官方資料，再比較不同來源對歷史、空間與構件的記載。當來源彼此一致時，可提高說明的可信度；若內容不同，則應保留差異並繼續查證。","facts":["文獻分析不是把第一個找到的說法直接搬進遊戲。","不同資料的年代、作者、目的與證據基礎可能不同。","卡牌與題目應保留可追溯的資料來源。"],"question":"遇到兩份資料對同一構件說法不同時，最適當的做法是什麼？","choices":["選擇文字較好看的說法","比較來源條件並標示差異，再尋找其他證據","把兩個說法混成一個確定結論"],"answer":1,"feedback":"文獻互證的目的不是消除所有差異，而是讓推論過程可查核。"},{"title":"現地踏查：把圖面與真實空間對起來","source":"專題第一章田野調查與第三章空間分析","body":"現地踏查用來確認門樓、禾埕、前後堂、橫屋、天井、化胎、五行石與其他構件的實際位置、視線、尺度與使用狀態。圖面能提供結構，但現場可補充動線、材質、光線、損壞與後來變更。兩者應互相校對，而不是互相取代。","facts":["平面圖未必呈現所有現況變更。","現場觀察需留下日期、位置與拍攝方向。","不確定之處應記錄為待確認，而非立即猜測。"],"question":"現地踏查最主要補充文獻的哪一項不足？","choices":["讓研究者不必再記錄","確認實際位置、狀態與使用情境","證明所有口述內容都正確"],"answer":1,"feedback":"田野調查把紙面知識重新放回具體場域。"},{"title":"影像與測繪：保存可重複檢視的證據","source":"專題第一章田野調查與第四章模型製作","body":"攝影、短影片與簡易測繪可記錄立面、梁架、斗栱、彩繪、匾額、祖牌及空間尺度，供模型、卡牌與數位展示反覆比對。影像應盡量記錄整體、局部、比例與方向，並避免只拍漂亮細節而失去其原有位置。","facts":["細部照片需要整體位置照片協助判讀。","比例尺、方向與檔名可提高後續使用價值。","影像是研究材料，不等於完整解釋。"],"question":"拍攝斗栱細部時，哪一種作法最有助於後續研究？","choices":["只拍一張極近的美照","同時拍整體位置、局部細節與比例參照","移動構件到光線較好的地方再拍"],"answer":1,"feedback":"可定位、可比較的影像，比單純好看的影像更有研究價值。"},{"title":"口述訪談：補足生活史，也保留其性質","source":"專題第一章、第四章訪談規劃與初步發現","body":"管理人、族人與地方使用者能提供祭祀、婚嫁、流水席、童年活動、修繕與空間使用等書面資料不易呈現的記憶。然而，口述資料受到時間、立場與個人經驗影響，應標示受訪者、訪談時間與內容性質，並與文獻、影像或其他受訪者交叉比對。","facts":["口述歷史能保存生活經驗與地方用語。","個人記憶不必然代表所有族人或所有年代。","尊重口述資料不等於取消查證。"],"question":"對「七折水路」這類訪談說法，最穩健的處理方式是什麼？","choices":["標示為地方說法並進一步測繪、查證","直接列為唯一確定史實","因為不是書面資料就全部刪除"],"answer":0,"feedback":"口述資料的價值與限制都應被清楚呈現。"},{"title":"研究限制：知道哪些結論還不能下","source":"專題第一章研究範圍與限制","body":"本研究以單一宗祠為個案，訪談對象與測試人數有限，部分早期史料亦有斷裂，因此不能把個案結果直接推論為所有客家宗祠的共同規則。遊戲中的知識說明應分辨已確認資料、合理推論、地方記憶與待考證事項。","facts":["單一個案適合深入理解，但不能自動代表全部。","小規模回饋可發現問題，不能宣稱普遍成效。","清楚說明限制能提高可信度。"],"question":"小規模玩家測試最適合支持哪一種結論？","choices":["遊戲已被所有年齡層普遍接受","發現目前版本的理解與操作問題","證明遊戲一定能提升文化認同"],"answer":1,"feedback":"原型測試的主要用途是找問題與修正，而不是過度宣稱效果。"},{"title":"反覆迭代：把測試轉化為版本決策","source":"會議決議與專題設計實作流程","body":"需求提出、原型建置、玩家測試、回饋蒐集與再次修正應形成循環。每次調整都應記錄問題、修改理由、版本差異與測試結果，才能判斷某項改動是否真的改善理解、平衡與可接受性。","facts":["一次完成所有功能容易造成範圍失控。","版本紀錄可追蹤設計決策與退回修改。","測試應同時涵蓋規則、內容、介面與無障礙。"],"question":"哪一項最符合反覆迭代的開發方式？","choices":["每次改動都留下理由與測試結果","只在最後版本才測試","收到任何意見就立刻全部加入"],"answer":0,"feedback":"迭代不是無限制加功能，而是以證據決定保留、修正或移除。"}]},{"id":"digital","title":"數位轉譯","subtitle":"從模型、卡牌到3D與虛擬展示的角色分工","icon":"🧭","steps":[{"title":"三種媒介：看得懂、玩得進去、繼續探索","source":"專題第五章三種媒介互補關係","body":"實體模型主要協助理解宗祠的整體比例與空間關係；卡牌遊戲把人物、空間、裝飾與文字轉為可操作的關聯；數位展示則提供遠距導覽、細部觀看與延伸探索。三者互補，不應把相同內容原封不動重複三次。","facts":["模型偏重空間認知。","卡牌偏重關聯、策略與記憶。","數位展示偏重整合、細節與遠距接近。"],"question":"文化卡牌在三種媒介中最主要的角色是什麼？","choices":["取代所有實地與模型學習","把文化知識轉為可操作的關聯與策略","只展示建築照片"],"answer":1,"feedback":"卡牌的價值在於讓知識成為玩家行動的依據。"},{"title":"3D掃描與建模：建立空間理解，不等於完整保存","source":"專題摘要、第四章數位應用與第五章","body":"3D掃描與建模可記錄形體、尺度與空間關係，也能讓無法大量開放的私人宗祠被遠距理解。但模型品質仍受拍攝死角、設備精度、軟體處理與後續維護影響，不能把數位模型視為實體文化資產的替代品。","facts":["數位模型能協助定位與比較。","缺漏、誤差與後製應留下紀錄。","實體場域、材料與使用脈絡仍不可取代。"],"question":"下列何者最符合數位模型的定位？","choices":["是文化資產本體的完全替代品","是輔助記錄、理解與展示的工具","只要模型完成就不需維護實體"],"answer":1,"feedback":"數位化能擴大接近性，但不能消除對實體保存的責任。"},{"title":"知識點選取：每一個互動都要有學習目的","source":"專題第四章數位應用與動畫知識點規劃","body":"禾埕、化胎、五行石、前堂斗栱彩繪與蘋婆樹等元素適合轉為短動畫或互動知識點，是因為它們能代表空間、風水、工藝與地方記憶。選擇內容時應考量代表性、證據充分度、可理解性與是否能透過互動補充紙本文字。","facts":["不是所有細節都需要製作動畫。","互動形式應服務知識，而非只追求特效。","來源不足的內容需明示不確定性。"],"question":"決定是否把某構件做成動畫時，最優先考量什麼？","choices":["能否使用最多特效","是否有清楚知識目的與可靠資料","畫面是否能塞入最多文字"],"answer":1,"feedback":"數位效果只有在支援理解時才具有教育價值。"},{"title":"遊戲化：回饋要促進理解，而非製造挫折","source":"專題文化卡牌設計與本次平衡原則","body":"遊戲化可透過簡易組合、進階挑戰、即時回饋、拼圖與獎狀維持參與，但規則密度不能壓過文化內容。基礎玩家應容易完成二張組合；熟悉後再嘗試三至四張進階組合。效果牌則宜降低壞運氣，不宜大量破壞對手場面。","facts":["先建立可成功的基礎體驗，再增加挑戰。","難度應來自決策品質，而非隱藏規則。","回饋要說明玩家為何成功或失敗。"],"question":"為提高一般玩家可接受性，哪一種組合配置最適當？","choices":["大多數組合都要求四張牌","二張簡易組合較多，三至四張進階組合較少","完全取消所有組合提示"],"answer":1,"feedback":"較多簡易成功機會能降低挫折，進階組合則保留精熟空間。"},{"title":"長期維運：完成原型只是開始","source":"專題摘要、研究限制與第五章實務挑戰","body":"數位作品需要持續處理瀏覽器相容、連結失效、影像權利、內容修正、設備更新、資料備份與無障礙。若沒有維運責任、版本制度與可替換的內容結構，原型即使一度可用，也可能很快失去教育功能。","facts":["數位內容會因技術與資料變動而老化。","模組化資料較容易修正與擴充。","應保留原始檔、來源與版本紀錄。"],"question":"哪一項最能提高數位文化作品的長期可用性？","choices":["把所有內容寫死且不留原始檔","建立版本、來源、備份與更新責任","只追求首次展示效果"],"answer":1,"feedback":"可維護性是數位文化資產應用的一部分，而不是完成後才處理。"},{"title":"可近性與高齡友善：讓內容真的能被使用","source":"會議決議與使用者介面改善方向","body":"字體大小、文字對比、按鈕尺寸、資訊密度、操作提示、鍵盤操作與行動裝置版面，都會影響玩家能否完成學習。加入注音與英文版本可擴大接近性，但仍需由實際使用者測試，避免只在設計者的裝置上看起來正常。","facts":["無障礙不是只把字放大。","不同年齡與背景使用者應納入測試。","內容易懂與事實正確需要同時維持。"],"question":"高齡友善測試最需要由誰參與？","choices":["只由熟悉專案的開發者","實際高齡使用者及不同背景的一般玩家","只由效能最好的電腦進行"],"answer":1,"feedback":"真實使用者能發現設計者不容易察覺的操作與理解障礙。"}]},{"id":"ethics","title":"保存倫理","subtitle":"在推廣、權利、記憶與不確定性之間作負責任的選擇","icon":"⚖️","steps":[{"title":"私人文化資產：公開程度不是越高越好","source":"專題研究目的、範圍與第五章推廣模式","body":"謝氏宗祠為私人所有，仍與家族生活、祭祀及管理需求相連。推廣應先取得適當同意，尊重開放時間、可拍攝區域與不宜公開的內容。線上遊戲可提供低干擾入口，但不能據此要求所有空間永久對外開放。","facts":["文化資產身分不會消除所有權與生活安寧。","公開範圍應與所有權人及管理者溝通。","數位展示也可能造成隱私與定位風險。"],"question":"對私人宗祠最適當的推廣原則是什麼？","choices":["以最大人流作為唯一成果","在同意、安寧與文化教育之間取得平衡","文化資產一律不得有任何私人界線"],"answer":1,"feedback":"推廣的正當性來自尊重場域，而不是凌駕場域。"},{"title":"訪談同意與敘事權：受訪者不是素材庫","source":"專題訪談規劃與一般研究倫理原則","body":"訪談前應說明研究目的、紀錄方式、使用範圍與是否公開姓名或影像，並讓受訪者能拒答、修正或撤回不願公開的內容。遊戲化轉譯時，也不能為了故事效果扭曲受訪者原意。","facts":["同意應建立在清楚資訊上。","敏感家族資訊不因有趣就必須公開。","引述與改寫都應忠於內容及使用約定。"],"question":"受訪者提供一段家族內部敏感記憶，但表示不願公開，應如何處理？","choices":["因為很有戲劇性仍放入遊戲","尊重其意願，不公開或依約匿名處理","改成沒有名字就可任意使用"],"answer":1,"feedback":"文化推廣不能以犧牲受訪者信任與權益為代價。"},{"title":"不確定性標示：不知道，不等於可以補寫","source":"專題研究限制與多處待考證說明","body":"五行石現況、燕尾脊地方解釋、壽字磚年代與部分婚嫁文物故事，都可能存在資料不足。設計者應用「修復資料記載」「受訪者回憶」「目前推測」「尚待考證」等語句區分證據層次，避免把合理推論包裝成確定史實。","facts":["標示不確定性不會削弱內容，反而提高可信度。","不同證據層次可以同時保留。","題目答案不應建立在尚未證實的唯一說法上。"],"question":"資料不足時，哪一種題目設計最適當？","choices":["要求玩家背誦尚未證實的唯一答案","考玩家辨識資料性質與查證需要","自行編造一個完整故事"],"answer":1,"feedback":"研究倫理也包括不把未知內容偽裝成已知。"},{"title":"文化簡化與刻板印象：易懂不等於扁平化","source":"專題研究者詮釋與轉譯限制","body":"為一般玩家簡化文化知識是必要的，但不能把客家、宗族、女性角色或祭祀制度縮減為固定刻板印象。應說明不同年代、家族與個人經驗可能不同，並避免用單一訪談推論整個族群。","facts":["轉譯需要取捨，但取捨應可說明。","個案經驗不能自動代表整個族群。","多元觀點與例外能降低刻板化。"],"question":"從一位受訪者的婚嫁經驗，可以直接得出什麼？","choices":["所有客家家庭都完全相同","這是重要個人與地方經驗，但仍需避免過度概括","只要是口述就沒有價值"],"answer":1,"feedback":"文化理解需要在具體故事與概括界線之間保持清楚。"},{"title":"影像、圖像與授權：可看見不等於可任意使用","source":"專題影像蒐集流程與專案授權管理需求","body":"宗祠照片、修復圖面、族譜、訪談影像與第三方網站圖片可能分別涉及著作權、肖像、所有權人同意與資料使用條件。正式發布前應確認來源、授權範圍與標示方式，優先使用自製或已取得合法權利的素材。","facts":["網路可下載不等於可再利用。","來源標示與使用授權是不同問題。","敏感位置與私人資訊也需評估是否遮蔽。"],"question":"從官方網站找到一張照片後，最適當的下一步是什麼？","choices":["直接當成完全自由素材","確認使用條款、授權與標示要求","移除浮水印後使用"],"answer":1,"feedback":"負責任的文化推廣也必須尊重素材權利。"},{"title":"成效宣稱：回饋資料要說到證據能支持的程度","source":"專題推廣成效評估限制與玩家測試規劃","body":"玩家表示「有趣」或「比較容易理解」可作為設計回饋，但若沒有前後測、對照、足夠樣本與合適分析，就不能宣稱遊戲已證明能提升文化認同或長期學習。成果報告應區分可用性發現、初步學習反應與正式成效證據。","facts":["滿意度不等同學習成效。","小樣本可用性測試不能代表所有人口。","保守且精確的結論較有研究價值。"],"question":"十位玩家多數表示喜歡遊戲，最能支持哪一項說法？","choices":["初步可接受性良好，仍需更多測試","已證明全國民眾都會提升文化認同","已完成嚴格因果推論"],"answer":0,"feedback":"結論應與研究設計、樣本及量測範圍一致。"}]}];
  let completed = new Set();
  let currentBranch = null;
  let currentStep = 0;
  let answeredCorrectly = false;
  let standalone = false;

  const T = {"close":"關閉","eyebrow":"牌局之外・文化資產深度學習","title":"選一條路，跟守藏者把細節看清楚","intro":"每一節都包含資料性質、完整解說、觀察重點、互動題目與延伸說明。題目由空間與構件基礎，逐步進入研究方法、數位轉譯與保存倫理。答錯時不會直接公布正解；七條支線完成後會拼成完整記憶圖，並可下載背景圖與學習獎狀。","choiceLabel":"選擇玩牌或完成支線","playChoice":"回到牌局結果","startPlay":"開始牌局","learnChoice":"繼續完成文化支線","puzzle":"記憶拼圖","completeTitle":"七條文化學習支線已完成","completeBody":"請輸入姓名，再下載謝氏宗祠完整背景圖與文化資產學習獎狀。","name":"姓名","namePlaceholder":"請輸入姓名","downloadBackground":"下載完整背景圖","downloadCertificate":"下載獎狀","endLearning":"結束學習並回首頁","backHub":"返回支線選單","questionTitle":"互動檢核","reveal":"顯示答案與說明","prev":"上一節","next":"下一節","finishBranch":"完成這條支線","done":"已完成","notDone":"尚未完成","start":"開始探索","source":"資料性質","facts":"觀察與理解","answerPrompt":"請選擇一個答案。","correct":"答對了。","tryAgain":"這個答案還不完整。請先根據上方解說與觀察重點再想一次；若仍不確定，再自行按「顯示答案與說明」。","backgroundFilename":"謝氏宗祠完整背景圖.png","enterName":"請先輸入姓名。","generating":"正在製作獎狀……","failed":"獎狀產生失敗，請重新整理後再試。","generated":"獎狀已產生。","certificateTitle":"謝氏宗祠文化資產學習獎狀","certificateEnglish":"HERITAGE LEARNING CERTIFICATE","certify":"茲證明","certificateBody":"已完成空間格局、建築裝飾、祭祀文字、地方記憶、研究方法、數位轉譯與保存倫理七條文化學習支線。","completedDate":"完成日期","certificateMotto":"理解建築，也理解人、儀式與地方記憶如何共同保存。","certificateFilename":"謝氏宗祠文化資產學習獎狀"};

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
            <div class="heritage-answer-explanation hidden" id="heritage-answer-explanation">
              <div class="heritage-answer-illustration" id="heritage-answer-illustration" aria-hidden="true"></div>
              <div class="heritage-answer-copy">
                <strong id="heritage-answer-heading"></strong>
                <p id="heritage-answer-body"></p>
                <ul id="heritage-answer-points"></ul>
              </div>
            </div>
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



  function explanationTitle(step) {
    return `為什麼是「${step.choices[step.answer]}」？`;
  }

  function explanationBody(step) {
    const first = step.facts?.[0] || "";
    const second = step.facts?.[1] || "";
    return `${step.feedback} ${first}${second ? ` 進一步看，${second}` : ""}`.trim();
  }

  function illustrationSvg(branchId) {
    const icons = {
      space: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 160"><rect width="220" height="160" rx="18" fill="#153238"/><path d="M22 124 Q110 90 198 124 L198 146 L22 146 Z" fill="#25484f"/><path d="M36 92 L72 64 L148 64 L184 92 L184 122 L36 122 Z" fill="#b96c47"/><path d="M24 98 L72 56 L148 56 L196 98" fill="none" stroke="#efcf8d" stroke-width="6" stroke-linecap="round"/><rect x="96" y="88" width="28" height="34" fill="#efe1c1"/><path d="M110 122 V146" stroke="#efcf8d" stroke-width="6"/><path d="M56 122 V146 M164 122 V146" stroke="#cfb27e" stroke-width="4" stroke-dasharray="5 7"/></svg>`,
      decoration: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 160"><rect width="220" height="160" rx="18" fill="#153238"/><rect x="30" y="28" width="160" height="104" rx="12" fill="#203f44" stroke="#efcf8d" stroke-width="4"/><circle cx="72" cy="78" r="12" fill="#efcf8d"/><circle cx="148" cy="78" r="12" fill="#efcf8d"/><path d="M58 36 q14 -16 28 0 q14 16 28 0 q14 -16 28 0 q14 16 28 0" fill="none" stroke="#d76f52" stroke-width="6"/><path d="M48 118 q62 -28 124 0" fill="none" stroke="#efcf8d" stroke-width="5" stroke-dasharray="6 8"/></svg>`,
      text: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 160"><rect width="220" height="160" rx="18" fill="#153238"/><rect x="32" y="30" width="156" height="100" rx="12" fill="#213a41" stroke="#efcf8d" stroke-width="4"/><rect x="48" y="48" width="124" height="18" rx="7" fill="rgba(239,207,141,.2)" stroke="#efcf8d" stroke-width="2.5"/><rect x="48" y="80" width="52" height="34" rx="8" fill="rgba(239,207,141,.18)" stroke="#efcf8d" stroke-width="2.5"/><rect x="120" y="80" width="52" height="34" rx="8" fill="rgba(239,207,141,.18)" stroke="#efcf8d" stroke-width="2.5"/></svg>`,
      community: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 160"><rect width="220" height="160" rx="18" fill="#153238"/><circle cx="62" cy="74" r="18" fill="#efcf8d"/><circle cx="110" cy="62" r="16" fill="#d87c56"/><circle cx="152" cy="78" r="18" fill="#efcf8d"/><path d="M38 126 q72 -38 144 0" fill="none" stroke="#efcf8d" stroke-width="6" stroke-linecap="round"/><path d="M58 112 v24 M110 100 v34 M162 114 v22" stroke="#d3b27a" stroke-width="5" stroke-linecap="round"/></svg>`,
      method: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 160"><rect width="220" height="160" rx="18" fill="#153238"/><circle cx="84" cy="70" r="34" fill="none" stroke="#efcf8d" stroke-width="8"/><path d="M108 96 L154 136" stroke="#efcf8d" stroke-width="10" stroke-linecap="round"/><path d="M42 126 H104 M42 110 H86" stroke="#d76f52" stroke-width="6" stroke-linecap="round"/></svg>`,
      digital: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 160"><rect width="220" height="160" rx="18" fill="#153238"/><path d="M110 24 L176 60 L176 116 L110 144 L44 116 L44 60 Z" fill="none" stroke="#efcf8d" stroke-width="5"/><path d="M110 24 V84 M44 60 L110 84 L176 60 M110 84 V144" stroke="#d76f52" stroke-width="4"/><circle cx="110" cy="84" r="8" fill="#efcf8d"/></svg>`,
      ethics: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 160"><rect width="220" height="160" rx="18" fill="#153238"/><path d="M110 28 V126 M64 48 H156" stroke="#efcf8d" stroke-width="7" stroke-linecap="round"/><path d="M64 48 L38 94 H90 Z M156 48 L130 94 H182 Z" fill="none" stroke="#d76f52" stroke-width="5"/><path d="M78 132 H142" stroke="#efcf8d" stroke-width="8" stroke-linecap="round"/></svg>`
    };
    return icons[branchId] || icons.space;
  }

  function renderExplanation(step, revealed) {
    const box = $("#heritage-answer-explanation");
    if (!box) return;
    $("#heritage-answer-illustration").innerHTML = illustrationSvg(currentBranch.id);
    $("#heritage-answer-heading").textContent = revealed ? explanationTitle(step) : "再看一次重點";
    $("#heritage-answer-body").textContent = revealed ? explanationBody(step) : `先回頭看上方說明與觀察重點，再試著找出最能概括本節核心的答案。`;
    $("#heritage-answer-points").innerHTML = (step.facts || []).map((fact) => `<li>${fact}</li>`).join("");
    box.classList.remove("hidden");
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
      location.href = document.body.classList.contains("zhuyin-mode") ? "index-zhuyin.html" : "index.html";
      return;
    }
    $("#heritage-journey-modal")?.classList.add("hidden");
    $("#game-over-modal")?.classList.remove("hidden");
  }

  function returnToPlay() {
    if (standalone) {
      location.href = document.body.classList.contains("zhuyin-mode") ? "battle-zhuyin.html" : "battle.html";
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
    $("#heritage-answer-explanation")?.classList.add("hidden");
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
      button.classList.toggle("correct", i === step.answer && (reveal || answeredCorrectly));
      button.classList.toggle("incorrect", !reveal && i === index && i !== step.answer);
      button.setAttribute("aria-pressed", i === index ? "true" : "false");
    });
    if (index === step.answer || reveal) {
      answeredCorrectly = true;
      $("#heritage-answer-feedback").textContent = `${T.correct} ${step.feedback}`;
      $("#heritage-detail-next").disabled = false;
      renderExplanation(step, true);
      buttons.forEach((button, i) => button.classList.toggle("correct", i === step.answer));
    } else {
      $("#heritage-answer-feedback").textContent = T.tryAgain;
      $("#heritage-detail-next").disabled = true;
      renderExplanation(step, false);
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
    const family = '"Microsoft JhengHei", "Noto Sans TC", sans-serif';
    let size = maxSize;
    do {
      ctx.font = `${weight} ${size}px ${family}`;
      if (ctx.measureText(text).width <= maxWidth) break;
      size -= 2;
    } while (size > minSize);
    return size;
  }

  function wrapLines(ctx, text, maxWidth) {
    const units = [...text];
    const lines = [];
    let line = "";
    units.forEach((unit) => {
      const next = line + unit;
      if (line && ctx.measureText(next).width > maxWidth) {
        lines.push(line);
        line = unit;
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
      setFittedFont(ctx, T.certificateTitle, 1280, 72, 48, 700);
      ctx.fillText(T.certificateTitle, 800, 205);
      ctx.fillStyle = "#e8e0d0";
      setFittedFont(ctx, T.certificateEnglish, 1160, 34, 26, 500);
      ctx.fillText(T.certificateEnglish, 800, 263);
      setFittedFont(ctx, T.certify, 1100, 42, 30, 500);
      ctx.fillText(T.certify, 800, 365);
      ctx.fillStyle = "#fff";
      setFittedFont(ctx, name, 1080, 74, 40, 700);
      ctx.fillText(name, 800, 470);
      ctx.fillStyle = "#e8e0d0";
      ctx.font = '500 34px "Microsoft JhengHei", "Noto Sans TC", sans-serif';
      drawCenteredWrappedText(ctx, T.certificateBody, 800, 585, 1160, 56, 3);
      ctx.fillStyle = "#f0ddb0";
      ctx.font = '500 29px "Microsoft JhengHei", "Noto Sans TC", sans-serif';
      ctx.fillText(`${T.completedDate}: ${new Date().toLocaleDateString("zh-TW")}`, 800, 820);
      ctx.fillStyle = "#d3c8b2";
      ctx.font = '400 26px "Microsoft JhengHei", "Noto Sans TC", sans-serif';
      drawCenteredWrappedText(ctx, T.certificateMotto, 800, 940, 1160, 42, 3);
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
