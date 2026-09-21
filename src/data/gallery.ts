import { images } from "@/data/images";

/**
 * GALLERY
 * =======
 * Two archives, one viewer.
 *
 *   · Photographs — what the fields look like.
 *   · Videos      — SCT's own YouTube channel, where farmers speak for
 *                   themselves. This is the strongest proof the company has.
 *
 * Both feed <Lightbox />, so a photo and a video open in the same box, with
 * the same controls, and the arrows walk through either set the same way.
 */

/* ==========================================================================
   PHOTOGRAPHS
   --------------------------------------------------------------------------
   Sourced from the central registry (src/data/images.ts) rather than from raw
   paths, so swapping artwork stays a one-line change there. The old site's
   twenty gallery uploads are NOT used: finalapi.soilchargertechnology.com has
   lost those files and every one of them now 404s — which is why the gallery
   on the live site renders as a grid of broken-image icons.
   
   REPLACE THIS. Drop SCT's own field photography into /public/images/gallery/
   and list it here with a real caption; the grid and the viewer need no other
   change.
   ========================================================================== */

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  /** Printed under the photo in the viewer. */
  caption: string;
};

type RegistryImage = { readonly src: string; readonly alt: string };

/** The registry's `alt` is already a full sentence, so it doubles as caption. */
const fromRegistry = (id: string, entry: RegistryImage): GalleryPhoto => ({
  id,
  src: entry.src,
  alt: entry.alt,
  caption: entry.alt,
});

export const galleryPhotos: GalleryPhoto[] = [
  fromRegistry("farmer-woman", images.farmers.woman),
  fromRegistry("crop-grapes", images.crops.grapes),
  fromRegistry("soil-profile", images.soil.profile),
  fromRegistry("farmers-group", images.farmers.group),
  fromRegistry("hero-field", images.hero.main),
  fromRegistry("crop-sugarcane", images.crops.sugarcane),
  fromRegistry("farmer-harvest", images.farmers.harvest),
  fromRegistry("soil-compost", images.soil.compost),
  fromRegistry("crop-pomegranate", images.crops.pomegranate),
  fromRegistry("farmer-tractor", images.farmers.tractor),
  fromRegistry("crop-wheat", images.crops.wheat),
  fromRegistry("soil-survey", images.soil.survey),
  fromRegistry("hero-sunset", images.hero.sunset),
  fromRegistry("crop-banana", images.crops.banana),
  fromRegistry("farmer-bullock", images.farmers.bullock),
  fromRegistry("soil-mycorrhiza", images.soil.mycorrhiza),
  fromRegistry("crop-vegetables", images.crops.vegetables),
  fromRegistry("farmer-youth", images.farmers.youth),
  fromRegistry("crop-cotton", images.crops.cotton),
  fromRegistry("soil-irrigation", images.soil.irrigation),
  fromRegistry("crop-maize", images.crops.maize),
  fromRegistry("farmers-paddy", images.farmers.field),
  fromRegistry("crop-hillside", images.crops.hillside),
  fromRegistry("hero-landscape", images.hero.landscape),
];

/* ==========================================================================
   VIDEOS
   --------------------------------------------------------------------------
   The video gallery the old site carried, recovered from
   docs/sct-legacy-content.md. It listed 51 ids; six of them are now removed or
   private on YouTube:

     00qYwcwZJI8  8MrtsDC-OW8  CO-RYQan-lM  QDE0Y7Nyc8I  XxONf5bnc6s  lYqr1fmmxZk

   Those are deleted here rather than left in place. A dead id does not read as
   a broken image: YouTube answers its thumbnail with a 404 *and a grey
   placeholder JPEG in the body*, which browsers render happily — so the tile
   shows as a blank grey box with a play button on it, which is what the old
   gallery does today. <VideoGrid /> additionally drops any tile whose
   thumbnail arrives at placeholder size, so the grid stays clean when the next
   one dies.

   The first eight are the ones the old homepage featured, so they lead here
   too. Titles were read from YouTube's oEmbed endpoint on 2026-09-21. They are
   accessible names only and are never printed — the thumbnail already carries
   the title burnt into the frame, which is the line a farmer actually reads.

   To re-check the list, put each id through
   https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<id>&format=json
   — 200 means live, 403 or 404 means gone.
   ========================================================================== */

export type GalleryVideo = {
  id: string;
  youtubeId: string;
  /** The real YouTube title. Accessible name only — see the note above. */
  label: string;
};

export const galleryVideos: GalleryVideo[] = [
  { id: "5dgn2MmWAj0", youtubeId: "5dgn2MmWAj0", label: "SCT Vedic - How should be the general schedule of all crops❓️" },
  { id: "95KV8p8FrUc", youtubeId: "95KV8p8FrUc", label: "SCTवैदीक मिल्क चार्जर भाग -1 काय आहे व कसे काम करते⁉️🐄जनावरांच्या सर्व समस्यांपासून कायमची सुटका ‼️" },
  { id: "O_rOfMok8Yw", youtubeId: "O_rOfMok8Yw", label: "जो स्वताची मदत करतो , देव त्याची मदत करतो , ७५ लाखांचे कर्ज फेडले ‼️#farming #soil #organic #vedic" },
  { id: "ekehapFh1VY", youtubeId: "ekehapFh1VY", label: "70-80दिवसांपुढील द्राक्ष🍇बागेचे साईज,कलर समस्यांसाठी SCT वैदिकचे पोषण व्यवस्थापन मार्गदर्शक सौरभ सर" },
  { id: "o28eO-Xxhg4", youtubeId: "o28eO-Xxhg4", label: "₹ 25-30 चा रेट ₹38 वर आणि 4 महिने झाले तरी 24 लिटर दूध देते #cow #cattle #veteran #bufalo #dairymilk" },
  { id: "qG0yrB5O4No", youtubeId: "qG0yrB5O4No", label: "SCTवैदीक 🐄मिल्क चार्जर भाग -2 🐄शेतकर्यांचे वापराबाबत प्रश्न व राम सरांचे सायंटीफीक उत्तरे‼️" },
  { id: "tb24EzQxM0o", youtubeId: "tb24EzQxM0o", label: "SCT वैदिक वापरण्यापूर्वी राम सरांचे शेतकरी बांधवांशी हितगुज" },
  { id: "tp7vlKSZreU", youtubeId: "tp7vlKSZreU", label: "म्हैशीची फैट 16.5 लागली व बाजार ₹ 102‼️मिल्क चार्जर आहे तर शक्य आहे #farming #cow #cattle #veteran" },
  { id: "0i3ZAhGY3A0", youtubeId: "0i3ZAhGY3A0", label: "Soil charger tech. SCT वैदीक - 🍇गोडी छाटनी २०२१ मार्गदर्शक सामान्य द्राक्ष शेड्यूल ‼️" },
  { id: "2-h9xKGHCbU", youtubeId: "2-h9xKGHCbU", label: "SCT वैदिक टेक्नॉलॉजी इस्तमाल कैसे करे ❓ कोनसी बाते ध्यान मे रखे जाने और सफल हो जाये ‼️" },
  { id: "4o6TTbOjQLg", youtubeId: "4o6TTbOjQLg", label: "SCT-🍇शेतकर्यांच्या प्रश्नांना राम सरांचे मार्गदर्शन‼️ द्राक्ष,🥬भाजीपाला व फळबागांसाठी SCT वैदीक 👌" },
  { id: "5wj5w4DdNvY", youtubeId: "5wj5w4DdNvY", label: "“SCT Vedic”(सॅाईल चार्जर टेक्नोलोजी वैदीक) लॉंचिंग,शेतकर्यांसाठी एक ऐतीहासीक क्षण‼️वैदीक हरितक्रांती" },
  { id: "7n_kqvXW_2I", youtubeId: "7n_kqvXW_2I", label: "संतरा बगीचा फलझडना और अन्य समस्याओ पर चर्चा.SCTवैदिकके उपाय,मा.श्री.राम सरजीका शाश्रशूद्ध मार्गदर्शन" },
  { id: "AhzMnzz_k2s", youtubeId: "AhzMnzz_k2s", label: "जिल्ह्यातून आलेल्या शेतकर्यानी,राम सरांसोबत हरभरा पिकास अनोखी भेट,हरभरा पिकाचे सर्वत्र होतेय कौतुक‼️" },
  { id: "Apo5yO3PtPU", youtubeId: "Apo5yO3PtPU", label: "एकदाचा तण व उंदरांचा १००% बंदोबस्त करन्याचा नैसर्गिक उपाय सापडला #शेती #शेतकरी #soil #ऊस #गन्ना #cow" },
  { id: "CAJKIM14vtY", youtubeId: "CAJKIM14vtY", label: "SCTवैदिक🌼शेवंती अर्धा एकरात महिन्याला💰 4 लाखांचे उत्पन्न💰तोडून थकले लेबर‼️जगातील नं 1 क्वालीटी ‼️" },
  { id: "DP4DHTDSceo", youtubeId: "DP4DHTDSceo", label: "SCTवैदीक-द्राक्ष 🍇शेती नेमकी चुकते कुठे⁉️२०वर्षांत प्रथमच निम्म्या खर्चात पिकवली एक्स्पोर्ट क्वालीटी" },
  { id: "D_3Uak6XCaI", youtubeId: "D_3Uak6XCaI", label: "SCT वैदिक वापरा केळी एक्स्पोर्ट करा‼️मन विचलित होणाऱ्या शेतकऱ्यांनी तर अवश्य पहावे" },
  { id: "DyuwR4HxwFQ", youtubeId: "DyuwR4HxwFQ", label: "Soil charger tech. भाग १ - SCTवैदिक का गरज आहे आजच्या पिढीला⁉️ शेवटपर्यंत पहा ‼️पुन्हा पुन्हा पहा‼️" },
  { id: "Hgj85i08JhY", youtubeId: "Hgj85i08JhY", label: "Soil charger tech. युरीयाला नाही म्हणा ☝️ जमिनिला नापिक करन्यापासून वाचवा ‼️💐स्व. आईंना समर्पित 💐" },
  { id: "ItKHaNATsJ4", youtubeId: "ItKHaNATsJ4", label: "SCTवैदीक-द्राक्ष शेतकर्याच्या छातीवरचा तात्या विंचू फेकूणद्या‼️एनर्जी फूलघड 🍇cool‼️अतिरेकीपोषण द्या💪" },
  { id: "KYgor_C98yk", youtubeId: "KYgor_C98yk", label: "SCTवैदिक ड्रॅगन प्रतिपोल 5 हजार उत्पन्न,15 दिवसांपेक्षा जास्त टिकवण क्षमता पोषण द्याल तर शोषण थांबते" },
  { id: "L6YsUl2WuCQ", youtubeId: "L6YsUl2WuCQ", label: "SCTवैदिक - ♻️ भाग ३ प्रोडक्ट कोम्बिनेशन आणि भाजीपाला / फळबागा शेड्यूल व शेतकर्यांची प्रश्नोत्तरे ‼️" },
  { id: "McmLzy5yM7Q", youtubeId: "McmLzy5yM7Q", label: "SCTवैदीक-मुळे द्राक्षबागांचे ९०%समस्या दूर होनार ,२२वर्ष डाळिंबाचे शेतकरी-आरोग्याची किंमत मोजू नका‼️" },
  { id: "Mrv95W5zGDQ", youtubeId: "Mrv95W5zGDQ", label: "SCTवैदीक- हळद 🥐शेतकर्यांना येणार सोन्याचे दिवस, औषधी हळद पिकनार‼️गावात फक्त वैदीकचे प्लॅाट हिरवे🍃" },
  { id: "NORL-e3UYZM", youtubeId: "NORL-e3UYZM", label: "SCTवैदीक- वांगे 🍆प्रथम रासायनिक व नंतर वैदीक ची ट्रीटमेंट, पाने फुले फळांमधील फरक पाहूण चकीत व्हाल‼️" },
  { id: "NvyBgX8BezM", youtubeId: "NvyBgX8BezM", label: "12वर्षात केमिकलच्या शेतीत 3 बहार नफ्यात तर9 तोट्यात लाखोंचे कर्ज,SCTवैदिक शिवाय शेती जिवंत होणे नाही" },
  { id: "OkkonP8pnqQ", youtubeId: "OkkonP8pnqQ", label: "SCTवैदिक ऊस पाहून थक्क व्हाल‼️ डोळे झाकून वापरू शकाल अस तंत्रज्ञान मानले राम सरांचे आभार" },
  { id: "PYmWvPT_Zts", youtubeId: "PYmWvPT_Zts", label: "दोडक्याची केनोपी पाहून चकित व्हाल #farming #soil #organic #vedic #crops" },
  { id: "RTa31XV5SWA", youtubeId: "RTa31XV5SWA", label: "SCTवैदिक मस्त👌 पेरू प्लॉट जबरदस्त💪 एकरात पहिल्या बहारात१८ टन माल😳मंदीच्या काळात मिळाला दरवाढ" },
  { id: "U_K36NQlbIs", youtubeId: "U_K36NQlbIs", label: "Soil Charger tech. खेती करनेसे पहले, किसान को कमसे कम इतना तो मालूम होना चाहीए की पौधा चाहता क्या है" },
  { id: "aOBGuXRJ2Wc", youtubeId: "aOBGuXRJ2Wc", label: "4 महिन्याची पपईची जोमदार वाढ व सेटींग पाहून तुम्ही म्हणाल,झकास #farming #soil #organic #vedic #crops" },
  { id: "dKHi8lnDDPw", youtubeId: "dKHi8lnDDPw", label: "मजूरी करनारा देखील मालक बनू शकतो फक्त ज्ञानाचं भांडवल उभं करा #soil #शेती #शेतकरी #फळबाग #भाजीपाला" },
  { id: "dg7PjY9rJxw", youtubeId: "dg7PjY9rJxw", label: "Soil charger tech.घटस्थापना SCT OFF नाशिक ☝️प्रतिकूल वातावरणात SCTचे परिणाम स्पष्ट करनारा प्रयोग‼️" },
  { id: "eLnNJ2rCGHQ", youtubeId: "eLnNJ2rCGHQ", label: "SCTवैदीक सर्व पिकांचे साधारण शेड्यूल कसे असावे ⁉️ राम सरांचे मार्गदर्शन 🙏" },
  { id: "ff7ogTLM2UM", youtubeId: "ff7ogTLM2UM", label: "SCTवैदीक- 💧अमृतजल चे विज्ञान पाण्याला करते जिवंत आणि ऊर्जावान ‼️पाण्याबद्दल तुम्ही हे ऐकलेय का ⁉️" },
  { id: "jQqVxFjWswI", youtubeId: "jQqVxFjWswI", label: "SCTवैदिक क्रांतीदिन व अमृतमहोत्सव शुभप्रसंगी शेतकर्यांसाठी राम सरांकडून इन्स्टंट चार्जेरची अनोखी भेट" },
  { id: "jjoG7VfJjEw", youtubeId: "jjoG7VfJjEw", label: "SCTवैदिक.मोदी जी ने मन कि बात मे उल्लेख किये हुये मोरिंगा प्लॉट कि SCTवैदिक के साथ यशोगाथा जरूर देखे" },
  { id: "jsTQVgDWjfw", youtubeId: "jsTQVgDWjfw", label: "20गुंठ्यात 1टण शेवंतीचा🌼 तोडा.सरपंचांनी केले कौतुक,खर्च कमी उत्पन्न जास्त." },
  { id: "lw9KRu8LKUQ", youtubeId: "lw9KRu8LKUQ", label: "SCT वैदीक : भाग २. प्रोडक्ट ची ओळख , उपयोग व कार्यपद्धती ‼️राम सरांचे मार्गदर्शन 💐" },
  { id: "od6nKtmyErE", youtubeId: "od6nKtmyErE", label: "SCTवैदिक वापरा अशक्य ते शक्य करा,डाळिंबातून लखपती होण्याचे रहस्य,रेस्ट नदेता नं1हस्त बहार केसकरसाहेब" },
  { id: "qDDNwcBGOEo", youtubeId: "qDDNwcBGOEo", label: "SCTवैदीक उन्हाळी कांदा एकरी450बॅग आणि पावसाळी 250बॅग,1च वेळ चारापाणी करूनही 1 नंबर गाईंचा गोठा कसा⁉️" },
  { id: "t6pu8JBSnJ8", youtubeId: "t6pu8JBSnJ8", label: "SCTवैदीक-का वापरावे⁉️केमिकल शेतकर्याचे डोळे उघडनारी मुलाखत‼️राम सरांच्या मित्रांची 8 वर्षांनी भेट 🤝" },
  { id: "uRBmNI9ES8E", youtubeId: "uRBmNI9ES8E", label: "SCTवैदीक-प्रदुषीत व निर्जीव शेतीच्या पाण्याची जागतिक दर्जाची समस्या सोडविनारे तंत्रज्ञान- ‘अमृत💧जल‘" },
  { id: "xwbdp0llwug", youtubeId: "xwbdp0llwug", label: "SCTवैदीक आल्याची पंचक्रोशीत कोणत्याही आल्याच्या शेताबरोबर तुलना होऊ शकत नाही‼️" },
];

/**
 * YouTube's own thumbnail, straight from its CDN — no file to host and it
 * follows the video if the channel re-uploads artwork.
 *
 *   sm — 320x180, true 16:9. The grid.
 *   lg — 480x360, 4:3 with letterbox bars; cropped with object-cover in the
 *        viewer, which is why the grid does not use it.
 */
export function youtubeThumb(youtubeId: string, size: "sm" | "lg" = "sm"): string {
  const file = size === "sm" ? "mqdefault" : "hqdefault";
  return `https://i.ytimg.com/vi/${youtubeId}/${file}.jpg`;
}

/**
 * The privacy-preserving embed host. It sets no tracking cookie until the
 * visitor actually presses play, which is the difference that matters for the
 * claim made on /privacy.
 */
export function youtubeEmbed(youtubeId: string, autoplay: boolean): string {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    ...(autoplay ? { autoplay: "1" } : {}),
  });
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?${params.toString()}`;
}
