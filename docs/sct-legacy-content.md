# SCT Legacy Website — Full Content Inventory

**Source:** http://www.soilchargertechnology.com/
**Scraped:** 2026-09-21
**Purpose:** Single source of truth for all copy, imagery, links, counters and data on the old site, to be used as the content reference while building the redesign.

Companion files:
- [`sct-legacy-blog-archive.md`](sct-legacy-blog-archive.md) — full text of all 21 blog articles
- [`agrostar-benchmark.md`](agrostar-benchmark.md) — competitor teardown (AgroStar)

> **Note on sourcing:** everything below is copied verbatim from the live site, including its typos ("WALTHIER", "Devlopment Director", "Usefull Links", "vedio-gallery"). Typos are preserved deliberately so nothing is lost — fix them in the redesign, don't re-derive them.

---

## 1. Site map (old site)

| Page | URL |
|---|---|
| Home | `/` |
| About Us / Company Profile | `/about-us` |
| Vision & Mission | `/vision-mission` |
| Our Team | `/our-team` |
| Products (listing) | `/products` |
| Product detail | `/sub-product/{id}` — 21 products |
| Photo Gallery | `/photo-gallery` · `/sub-photo-gallery` |
| Video Gallery | `/vedio-gallery` · `/sub-vedio-gallery` *(sic — misspelled in the URL)* |
| Blogs (listing) | `/blogs` |
| Blog detail | `/sub-blogs?id={id}` — 21 articles |
| Careers | `/careers` |

**Backend / media host:** `https://finalapi.soilchargertechnology.com/public/uploads/web/...`
**Static asset host:** `https://soilchargertechnology.com/public/img/...`

**Navigation structure:**

```
Home
Company Profile ── Vision-Mission
                └─ About Us
                └─ Our Team
Gallery ───────── Photo Gallery
                └─ Video Gallery
Products
Career ────────── Internship
                └─ SCT Business Recruitment
                └─ Job Vacancy
Blog
Contact
Language ──────── English | Marathi | Hindi
```

**Language switcher:** English / Marathi / Hindi — in the header on every page. Live content is mixed English + Marathi.

---

## 2. Brand identity & contact

- **Company name:** Soil Charger Technology (also appears as "Soil Charger Technologies INC")
- **Page title:** `Soil Charger Technology`
- **Meta description:** *(empty — no SEO description set on any page)*
- **Certification claim:** AN ISO 9001:2008 CERTIFIED COMPANY
- **Founder:** Mr. Ram Mukhekar — Nashik, Maharashtra
- **Key years:** SCT founded 2015 · SCT Saptapadi 2021 · SCT Vedic from 10 years of research
- **Logo:** `https://soilchargertechnology.com/public/img/logo/soillogo2.jpg`
- **ISO badge:** `https://soilchargertechnology.com/public/img/iso/ISO.png`

### Address

> Shop No.3, lower ground flow, below passport office, star zone mall, Nashik - Pune highway, Nashik - 422 101

### Phones

| Number | Use |
|---|---|
| +91 8669200221 | Primary |
| +91 9881798028 | Secondary |

`callto:` variants used in markup: `866 920 0221`, `988 179 8028`

### WhatsApp links

- `https://wa.me/918669200221?text=Hello`
- `https://wa.me/8669200226?text=Hello`
- `https://wa.me/918669950005?text=Hello`
- `https://wa.me/919545710002?text=Hello`

### Email

| Address | Purpose |
|---|---|
| soilchargertech@gmail.com | Header |
| soilchargertec@gmail.com | For Officials (footer) |
| salessoiltec1@gmail.com | For Sales |
| hr.soiltec@gmail.com | For Careers |

### Social

| Platform | URL |
|---|---|
| YouTube | https://www.youtube.com/@SOILCHARGERTECHNOLOGYOFFICIAL |
| Facebook | https://www.facebook.com/Soil.Charger.Technology |
| Instagram | https://www.instagram.com/sct_vedic_technology_official/ |
| Twitter/X | https://twitter.com/GoldenOpportu10 |
| YouTube (legacy) | https://www.youtube.com/user/ramanu7985 |

### Footer

- **Useful Links:** Home · Gallery · Careers · Blogs · Company Profile · Products · Distribution · Send Enquiry
- **Website:** www.soilchargertechnology.com
- **Copyright:** ©2026 All rights reserved Soil Charger Technology

### Typography in use (old site)

- `Open Sans` (300–800, incl. italics) — body
- `Abril Fatface` — display
- `Beau Rivage` — script accent
- `Libre Baskerville` (italic) — accent

---

## 3. Homepage — section by section

### 3.1 Hero carousel

**Headline:** `SOIL Is HEALTHIER, FARMER WALTHIER` *(sic — "WEALTHIER")*
**Sub-headline:** `We Are India's Leading Organic Farming Group`
**CTA:** `Shop Now`
**Secondary:** "Export Form" modal

Carousel images (4 slides):

```
https://finalapi.soilchargertechnology.com/public/uploads/web/coverphoto/2404202411374961_coverphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/coverphoto/1405202406113545_coverphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/coverphoto/14092024043756123_coverphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/coverphoto/10122024075152137_coverphoto.png
```

### 3.2 The 4 Pillars of Soil Charger Technology

> **4-piller Of Soil Charger Technology** *(sic)*

| # | Pillar |
|---|---|
| 1 | Work on **nourishment**, not on disease. |
| 2 | Work on **soil**, not on climate. |
| 3 | Work on **humus**, not with other things. |
| 4 | Work on **leaf and roots**, not on fruits. |

*This is SCT's core philosophy block — effectively a brand manifesto. Strong candidate to lead the new homepage.*

### 3.3 The 3 Principles of Soil Charger Technology

> **3-Principle Of Soil Charger Technology**

#### First — **Method** *("Follow Nutrition" / "Important")*

> Understand the meaning of 100% SCT...

1. A basal dose of **Krushi Amrut, Root Charger, and Nutri Charger** should be given after every **60 days** as per the requirement of the plant.
2. In every application of soil or drip or drenching, at least once a week use **Soil Charger 1 ltr** and **Health Charger 600 gm** for **1 acre**.
3. Each spray must be mixed with a **Fruit Charger**.

#### Second — **Rule** *("Avoid Damage" / "More Important")*

> Things that are strictly prohibited to do. It must be avoided.

1. Do not cultivate any soil that will cause movement or exposure. Mulching should not be done by part of trunk. (Weeds should not be cut in rainy weather or when it is raining — do in a dry environment.)
2. Do not use any chemical fertilizer (granular or water-soluble).
3. For crop protection use only **Pest Fighter, Pest Cleaner, Disease Fighter and Fungi Cleaner**. Do not use any chemicals.

#### Third — **Meditation** *("More Important")*

1. Watching daily videos posted on the YouTube channel and preparing notes and comments. **This is the breath of SCT VEDIC.**
2. Study the articles published daily on the WhatsApp group. **This is the water for SCT VEDIC users.**
3. 3–5 min of daily discussion with at least one new or old user farmer, or with each other directly or on call, about the SCT issue. **This is the food for SCT USER.**

> ⚠️ On the live site the three modal popups have their bullets **shuffled between them** — the Method modal carries a Meditation bullet, the Meditation modal carries a Rule bullet, etc. The grouping above is the corrected, logical one. Fix in the redesign.

### 3.4 Homepage section order (old site)

```
 1. Hero carousel (4 slides) + Export Form modal
 2. 4 Pillars
 3. 3 Principles (3 cards → modal popups)
 4. About Us (founder letter)
 5. Vision / Mission
 6. Photo Gallery (+ "view more")
 7. Video Gallery (+ "view more")
 8. Our Products (21 products, name-chip filter)
 9. Career (3 entry points → 3 form modals)
10. Latest News & Articles (21 blog cards)
11. Counter stats (5 counters)
12. What Our Farmer's Say (testimonials + "ADD TESTIMONIAL")
13. Meet Our Team Members (5 people)
14. ISO 9001:2008 block + company blurb
15. Get In Touch / Contact footer
```

---

## 4. About Us — founder's letter (verbatim)

**Mr. Ram Mukhekar** — *Founder, Soil Charger Technology* — Nashik, Maharashtra
Image: `https://finalapi.soilchargertechnology.com/public/uploads/web/aboutus/270420241033535_companyprofile.png`

> **Friends,**
>
> After the Green Revolution, humans, out of a desire for higher income, interfered with the natural life cycle of crops and overused entrepreneurs and chemicals. As a result, the health of crop and soil was endangered. Recognizing this threat in **2015**, SCT gave first priority to increase soil fertility and organic carbon. Its first objective was to provide a strong source of organic carbon.
>
> Gradually realizing the importance of organic carbon, SCT has worked to alleviate the prosperity of farmers. Soil pollution stopped by providing strong alternatives.
>
> The **3rd step** is to stop the use of synthetic PGR and provide a safe alternative to the development of natural hormones in crops with the help of **Mycorrhiza**.
>
> The **4th step** is to stop the flow of toxic pollutants in the name of crop protection. Although thousands of farmers have shown from their experience that nutrition is the only option for crop protection, the management of **SCT Saptapadi** was born in **2021** after some farmers made management mistakes.
>
> The journey of Vedic from SCT. From **2015–19**, it was impossible to satisfy his appetite using only SCT, so he had to rely on chemical fertilizers. Vedic Scientists, myself & team have come up with **10 years of research** and Vedic technology has been born through the teachings of SCT and Vedic.
>
> Today, the SCT Vedic will be a revolutionary step in the Indian agricultural sector as India becomes a superpower in the 21st century. We have faith in agriculture and soil to complete farmers' dream.

### Timeline extractable from this letter

Useful for a redesign journey/timeline section:

| Year | Milestone |
|---|---|
| 2015 | SCT founded — first priority: soil fertility + organic carbon |
| 2015–19 | Chemical fertilizers still needed alongside SCT |
| Step 3 | Replace synthetic PGR with Mycorrhiza-based natural hormone development |
| Step 4 | Stop toxic crop-protection pollutants |
| 2021 | **SCT Saptapadi** management system born |
| — | **SCT Vedic** — product of 10 years of research |

### ISO / company blurb (footer block)

> **AN ISO 9001:2008 CERTIFIED COMPANY**
>
> At Soil Charger Technologies INC we know our responsibility to offer eco friendly products and services that efficiently satisfy the growing food, fuel, and fodder demands driven by social and economic development in a safe and sustainable manner.
>
> Our company is a leading biotech company who is active in the field of research, manufacturing and marketing of unique organic products for all…

---

## 5. Vision & Mission (verbatim)

### Vision

1. Prosperous and Permanent farmings
2. Production of 100% nutritious and non-toxic agricultural goods.
3. Inheritance of fertile soil and pure water for the next generation.
4. Sustainable and prosperous agriculture with quality and quantity.

### Mission

1. We want to make India truly agricultural and bring in a farmers' state
2. We want to encourage the youth to cultivate with joy and to encourage youth to think positively about agriculture.

---

## 6. Products — overview

### Intro copy (verbatim)

> **Our Products**
>
> Increase the soil fertility and strength of plant. Healthy plant development is our main aim. From last three years our technology experts Mr. Ram Mukhekar ji is educating and train farmers and want to make them independent for treatment and dicisions. Available platform to discuss various problems frankly and searching scientific way to resolve that problem from root.

### How products are presented on the old site

- **Filter:** a single "All" chip plus one chip per product name (21 chips). No category grouping, no crop-wise grouping, no pricing.
- **Card:** product image + name + "Read More" → `/sub-product/{id}`
- **Detail page:** breadcrumb → name → image → short intro → "Product Description" → advantages/functions list → dosage/ratio → packing → "Additional Information" (duplicates the description verbatim) → Reviews → "Add A Reviews"

### Product range at a glance

**"SUPER" line — liquid / spray (8):**
Super Soil Charger · Super Fruit Charger · Super Crop Charger · Super Flower Charger · Super Size Charger · Super Water Charger · Super Plant Cleaner · Super Plant Fighter

**"SCT VEDIC" line — granular / powder (10):**
Nutri Charger · Root Charger · Health Charger · Leaf Charger · Setting Charger · Quality Charger · Plant Charger · Health Fighter · Milk Charger · Energy Booster

**Bagged soil products (3):**
SCT Vedic Shakti · Vedic Samrat (30 kg) · Vedic Miracle (10 kg)

**Named in the Enquiry Form dropdown but with no product page:**
Super Fungi Charger · Super Pest Charger · **Krushi Amrut** · **Green Gujrat**

> ⚠️ **Gaps to resolve before design starts**
> - **Krushi Amrut** is named in the 3 Principles as a core basal-dose product and appears in the enquiry dropdown, but has **no product page and no description anywhere**.
> - Same for **Green Gujrat**, **Super Fungi Charger**, **Super Pest Charger**.
> - **SCT Vedic Milk Charger** (id 125) and **SCT Vedic Energy Booster** (id 134) have pages but the description field is literally just `.` — **empty content**.
> - The 3 Principles also reference **Disease Fighter** and **Fungi Cleaner**, which do not exist as products either. The closest matches on the site are *Health Fighter* and *Plant Cleaner*. Naming needs to be reconciled with the client.

---

## 7. Full product catalogue (21 products, verbatim)

Image URL pattern: `https://finalapi.soilchargertechnology.com/public/uploads/web/product/{id}_product1.png`
(ids 178/179/180 use `.jpg` with a datestamp prefix — see table in §7.22)

### 7.1 SUPER SOIL CHARGER — `/sub-product/88`

> Super Soil Charger is an eco-friendly natural organic product under the Indian Government's initiative and patented agricultural products of the Government of India.

**Functions of Super Soil Charger:**

1. Helps to increase organic carbon in the soil.
2. Fertilizers uptake rapidly by increasing the number of white roots.
3. Controls the content of soil (pH) and desiccation (EC).
4. Helps in the chelation of metal and chemical fertilizers in the soil.
5. Sterile soil converts into fertile soil.
6. There is an increase in the metabolism of micro organisms in the soil.
7. If water drought it reduces the stress on the crop, thus increasing the crop's volatility even in low water.
8. Protects the crop from extreme cold and extreme heat.

**Ratio:** Orchards 3 to 5 liters per acre · Vegetable 1 to 3 liters per acre (regular per month)
**Packing:** 2 liter, 5 liter, 20 liter

### 7.2 SUPER FRUIT CHARGER — `/sub-product/92`

> Super Fruit Charger maintains the nitrogen ratio of the crop to the vitamins of the crop, helping to increase the enzyme growth.

**Ratio:** 15 ml per liter for orchard / 10 ml per liter for vegetable crop (5 to 7 ml for grapes)
**Packing:** 5 liter, 20 liter

### 7.3 SUPER CROP CHARGER — `/sub-product/95`

> Super Crop Charger — Botanical and Mineral Fertilizer, made from ???% organic technology and natural ingredients

*(The `???%` is literally what is on the live site — a CMS placeholder that was never filled. Almost certainly should read 100%.)*

**Ratio:** By spraying 2.3 ml per liter
**Packing:** 1 liter, 5 liter

### 7.4 SUPER FLOWER CHARGER — `/sub-product/97`

> Super Flower Charger is a Botanical and Mineral Fertilizer made from 100% Organic Technology and Natural Ingredients and flowering.

**Ratio:** Spray 2–3 milliliters per liter (use 1 to 2 times a day) / 500 to 1000 ml per acre drip.
**Packing:** 1 liter, 5 liter

### 7.5 SUPER SIZE CHARGER — `/sub-product/99`

> Super Size Charger is a botanical and mineral fertilizer made from 100% organic technology and natural ingredients.

**Ratio:** Use 2 to 3 ml per liter spray and 1 liter from drip for 3 to 4 times per acre drip.
**Packing:** 1 liter, 5 liter

### 7.6 SUPER WATER CHARGER — `/sub-product/101`

> Super Water Charger (Every drop of medicine makes it valuable). Super Water Charger made by Indian technology.

**Ratio:** Spraying 0.1 ml per liter of water / drip: 50 to 100 ml per acre with the medicine, increasing the effect of the drug.
**Packing:** 100 ml, 500 ml, 1000 ml

### 7.7 SUPER PLANT FIGHTER — `/sub-product/104`

> Super Plant Fighter is an international and botanical pest replayer and killer and extremely beneficial for organic control of all sucking insects (Thrips, Mawas, Jassids, Red Spiders, Millibug, White Bees, and others) and is Olycine Active Quill in Organic Super Fighter.

**Ratio:** 1 – 1.5 ml per liter spray
**Packing:** 250 ml, 1 liter
**Note:** Use of Super Water Charger 0.1 ml together for effective results.

### 7.8 SUPER PLANT CLEANER — `/sub-product/107`

> Super Plant Cleaner is an internationally-classed organic broad spectrum fungicidal fertilizer. The natural phosphorus available in Super Fungi Cleaner is immediately activated and its antifungal properties reflect various types of fungal diseases.

**Ratio:** 1–2 grams per liter spray
**Packing:** 250 g / 1 kg
**Note:** Taking a Fruit Charger and a Super Water Charger along with it provides effective results.

### 7.9 SCT VEDIC NUTRI CHARGER — `/sub-product/111`

> Vedic Nutri Charger is a fantastic product with powerful alternatives to chemical nutrition. It provides natural nutrition to the crops in the field and makes it possible to grow natural agricultural products like forest.

**Advantages:**

1. Helps to have vigorous new shoots, abundant flowering and fruiting.
2. The Nutri Charger is a natural mineral basket in itself so it is ready to use. This keeps the crop straggled during emergencies.
3. Helps in the metabolism of plants.
4. Soil friendly bacteria create a friendly environment with fungi, as well as increase soil productivity and health.
5. Increases soil texture and humidity. Increases soil, water and nutrient holding capacity.
6. Develops strong cell structure by supplying essential vitamins to the crop.
7. Natural nitrogen, phosphorus and potash accelerate the synthesis process. Fills the need for additional elements of the hybrid variety.
8. The natural nutrients in the Nutri Charger cause extraordinary changes in the natural texture and aroma of the roots, leaves, flowers and fruits.

**Application:** Basal Dose 3–5 kg per acre · By drip or drenching 1.2 kg

### 7.10 SCT VEDIC ROOT CHARGER — `/sub-product/113`

> Vedic Root Charger is a natural food that charges the roots of the plant. Helps plant roots to regenerate friendly bacteria, fungi and other organisms.

**Advantages:**

1. The Vedic Root Charger is an atomic bomb of natural elements for roots.
2. The Root Charger promotes the uptake of elements by increasing the ion concentration (CEC) in the roots.
3. Since the Vedic Root Charger itself is a storehouse of elements, the overall development of white roots extends their life.
4. Vedic Root Charger enhances receptivity, activation and stress tolerance in roots.
5. The Vedic Root Charger helps in the process of symbiosis of plant fungi by sending signals to mycorrhiza and bacteria in the soil.
6. With the use of Vedic Root Charger, the soil becomes fertile and spongy.
7. The combined use of Vedic Root Charger and Soil Charger can control the disease and all soil borne diseases.
8. The natural ingredients in the Vedic Root Charger will increase the number of bacteria and fungi in the soil around the roots.

**Application:** Basal Dose 3–5 kg per acre · By drip or drenching 1.2 kg

### 7.11 SCT VEDIC HEALTH CHARGER — `/sub-product/115`

> Rare and extremely powerful minerals are naturally available from Vedic Health Charger to strengthen the DNA in the crop. Helps to make soil fertile. Vedic Health Charger makes crop grow naturally and vigorously without any stimulant.

**Advantages:**

1. Strengthening of DNA and RNA in plant cells builds immunity against all kinds of diseases.
2. Significant improvement in crop quality is observed by stopping mutations (genetic chase) in plant cells.
3. Increases the medicinal properties of the crop.
4. Prevention of crop from wilt diseases and damping off.
5. Weak and stressed crops get rejuvenation.
6. Barren and alkaline soils are fertile and lively.
7. Increases the life span and increases the productivity of the crop.
8. Provides nutrition for balanced metabolism in crops.

**Dosage:** Spray 3 gm per liter · Soil 1.2 kg/acre

### 7.12 SCT VEDIC LEAF CHARGER — `/sub-product/116`

> Leaf Charger is a mineral basket, it helps in plant metabolism. Since the Leaf Charger is a natural storehouse of all the main, secondary, macronutrients and micronutrients required by the crop, the plant itself produces vital and essential enzymes, proteins and auxins. The Leaf Charger provides a source of natural elements for the overall growth and protection of the leaves.

**Advantages:**

1. Charges the chlorophyll in all the cells in energy.
2. Increases leaf and branch extension.
3. Increases food production and canopy of leaf.
4. Provides the element needed for photosynthesis, thus increasing leaf storage.
5. Increases leaf thickness and immunity in adverse conditions.
6. Protects the plant through leaf nutrition in adverse conditions.
7. Provides storage for abundant fruiting and flowering.

**Dosage:** Spray 3 gm per liter · Soil 1.2 kg/acre

### 7.13 SCT VEDIC SETTING CHARGER — `/sub-product/117`

> SCT Vedic Setting Charger is a multi-problem solution to many problems of farmers related to setting. The Setting Charger serves to provide nutrients that are conducive to the production of hormones and enzymes necessary for flowering and fruiting.

**Advantages:**

1. The Setting Charger fills the deficiency of all the elements that cause the defoliation of flower.
2. The Vedic Setting Charger improves the flowering pattern of the plant and produces strong and vigorous buds.
3. Since the Vedic Setting Charger is a natural food, it continues to nourish flowers in hostile environments.
4. The Vedic Setting Charger lengthens the buds and flower stalks.
5. The Vedic Setting Charger nourishes the extra flowers attached to the plants.
6. The Vedic Setting Charger creates a lot of nectar in the flower so the bees are attracted.

**Application:** Spray 3 g/litre · Soil 1.2 kg/acre

### 7.14 SCT VEDIC QUALITY CHARGER — `/sub-product/118`

> SCT Vedic's Quality Charger is the panacea for this problem. The store of natural nutrients in Vedic Quality Charger enhances the size, taste, colour, lustre, aroma and sugar of agricultural product. The best nutrition to the crops and produces the tastiest agricultural products which is in great demand in the market.

**Advantages:**

1. Plants produce GA, cytokines, hormones for fruit growth.
2. The Vedic Quality Charger protects the fruit from cracking due to balanced nutrition.
3. Protects crops from sunburn by increasing the internal growth of plants.
4. Helps in uniform size and quality by smoothing the function of phloem in the plant.
5. Distributes sugar evenly in fruits and crops. Brings remarkable taste and crunch to leaves, flowers, fruits. Creates nectar-like nutrients by increasing the durability of agricultural products and fruits.

**Application:** Spray 3 gm/litre · Soil 1.2 kg/acre

### 7.15 SCT VEDIC PLANT CHARGER — `/sub-product/124`

> Vedic Pest Cleaners create a protective coating on the crop with the help of natural alkaloids, enzymes. Replaces the insect-like smell of crops. As a result, pests stay away from crops and starve to death. SCT Vedic Pest Cleaner works interstitially by being absorbed into the dye of the plant. So the crop kills the insects by making them repellent and harmful alkaloids.

*(Note: the page is titled **Plant Charger** but all the body copy describes **Pest Cleaner**. Content mismatch on the live site — needs client clarification.)*

**Advantages:**

1. The alkaloids in the Vedic Pest Cleaner play an important role in plant metabolism and catabolism and protect the plant from predators.
2. Vedic Pest Cleaner works as an excellent repellent so sucking insects do not attack the crop.
3. Vedic Pest Cleaner creates a protective coating on leaves, flowers, fruits.
4. The pungent and bitter taste in Vedic Pest Cleaner keeps the insects away from the crop.
5. Vedic Pest Cleaner attracts insect predators, so natural control of the enemy insects is done. Various natural ingredients in Pest Cleaner strengthen the epidermis of leaves, flowers and fruits.
6. Vedic Pest Cleaner is nutritious for bees and all friendly insects and is only annoying for enemy insects.

**Application:** Spray 3 g/litre
**Packing:** 600 gm

### 7.16 SCT VEDIC MILK CHARGER — `/sub-product/125`

> *(No description on the live site — the content field contains only a full stop.)*

**⚠️ Content needed from client.**

### 7.17 SCT VEDIC HEALTH FIGHTER — `/sub-product/127`

> It works in *(intro is truncated on the live site)*

**Advantages:**

1. Vedic Health Fighter is the world's first trident action (fungal, bacterial and viral) therapeutic product.
2. Health Fighter works best in both pre- and post-disease conditions.
3. Health Fighter works well for dead disease if given from the ground along with Soil Charger.
4. The natural herbal extract from Health Fighter is absorbed into the epidermic cells of the crop and enhances the internal immunity of the crop (**SAR — Systemic Acquired Resistance**) and protects against a variety of fungal, bacterial and viral diseases.
5. Since Disease Fighter is an oil base product, it creates a protective coating from bacteria, viruses and fungi by applying a glossy coating around the crop.

**Application:** Spray 3–5 ml/litre · Soil 1–2 litre/acre
**Packing:** 1 litre
**Note:** *This product is recommended for 100% SCT Vedic (Soil Charger Technology) user farmers only.*

### 7.18 SCT VEDIC ENERGY BOOSTER — `/sub-product/134`

> *(No description on the live site — the content field contains only a full stop.)*

**⚠️ Content needed from client.**

### 7.19 SCT VEDIC SHAKTI — `/sub-product/178`

**Dosage:** Rain-fed crop: 3–4 bags per acre · Horticulture: 2–4 bags with RNPH=K

**Benefits:**

- Balances the carbon-nitrogen ratio in the crop, enhancing resistance.
- Increases the rate of crop metabolism for balanced growth by providing necessary natural nutrition.
- Enhances crop productivity and increases the harvesting cycle.
- Increases the nutritional and medicinal properties in crops.

### 7.20 VEDIC SAMRAT (30 KG) — `/sub-product/179`

**Dosage:** Rain-fed crop: 3–4 bags per acre · Horticulture: 2–4 bags with RNPH=K

**Key Benefits:**

- Enhances soil fertility and livens the soil, increasing productivity.
- Improves soil structure and health, thereby increasing water holding capacity.
- Promotes the development of crop roots, increasing their ability to absorb nutrients.
- Supplies **72 types of natural trace elements** necessary for crop growth, reducing plant stress.
- Develops internal protection systems (**SAR**) of crops, boosting their disease resistance capabilities.

### 7.21 VEDIC MIRACLE (10 KG) — `/sub-product/180`

**Dosage:** Rain-fed crops: 2 bags per acre · Horticulture: 2 bags with RNPH=K

**Benefits:**

- Provides instant energy to the crops.
- Increases the availability of essential soil nutrients.
- Supplies necessary natural micronutrients for the growth of crops.
- Enables the production of enzymes, hormones, and other substances essential for crop development.
- Nourishes beneficial microbes and fungi by bringing life to the soil.
- Enhances the germination capacity of seeds under adverse conditions, ensuring robust crop establishment.

### 7.22 Product ID → image map

| ID | Product | Image URL |
|---|---|---|
| 88 | Super Soil Charger | `.../product/88_product1.png` |
| 92 | Super Fruit Charger | `.../product/92_product1.png` |
| 95 | Super Crop Charger | `.../product/95_product1.png` |
| 97 | Super Flower Charger | `.../product/97_product1.png` |
| 99 | Super Size Charger | `.../product/99_product1.png` |
| 101 | Super Water Charger | `.../product/101_product1.png` |
| 104 | Super Plant Fighter | `.../product/104_product1.png` |
| 107 | Super Plant Cleaner | `.../product/107_product1.png` |
| 111 | SCT Vedic Nutri Charger | `.../product/111_product1.png` |
| 113 | SCT Vedic Root Charger | `.../product/113_product1.png` |
| 115 | SCT Vedic Health Charger | `.../product/115_product1.png` |
| 116 | SCT Vedic Leaf Charger | `.../product/116_product1.png` |
| 117 | SCT Vedic Setting Charger | `.../product/117_product1.png` |
| 118 | SCT Vedic Quality Charger | `.../product/118_product1.png` |
| 124 | SCT Vedic Plant Charger | `.../product/124_product1.png` |
| 125 | SCT Vedic Milk Charger | `.../product/125_product1.png` |
| 127 | SCT Vedic Health Fighter | `.../product/127_product1.png` |
| 134 | SCT Vedic Energy Booster | `.../product/134_product1.png` |
| 178 | SCT Vedic Shakti | `.../product/20092024090556178_product1.jpg` |
| 179 | Vedic Samrat | `.../product/20092024091025179_product1.jpg` |
| 180 | Vedic Miracle | `.../product/20092024103056180_product1.jpg` |

Base: `https://finalapi.soilchargertechnology.com/public/uploads/web`

---

## 8. Counters / statistics

These are the `data-max` values driving the animated counters on the homepage. The suffix column is the literal text rendered next to the number on the old site.

| Metric | Value | Suffix shown | Icon |
|---|---|---|---|
| FARMER | **1,000,000** | `+` | `fa-male` |
| YOUTUBE SUBSCRIBER | **155,000** | `K` | `fab fa-youtube` |
| APP DOWNLOAD | **5,000** | `K` | `fa-download` |
| SEMINAR MEETING | **50,000** | — | `fa-handshake` |
| DISTRIBUTOR | **460** | — | `fa-users` |

> ⚠️ The `K` suffixes are wrong on the old site: it counts up to the literal 155,000 and then prints "K" after it, so the page reads "155000 K". Same for App Download → "5000 K". Decide the real intended values with the client (likely 155K subscribers and 5K downloads) before reusing these numbers.

---

## 9. Testimonials (verbatim)

Section heading: **What Our Farmer's Say** · CTA: **ADD TESTIMONIAL** (opens a form with OTP mobile verification)

**Form fields:** Full Name · Mobile Number · Feedback · Upload Image · Upload Video → OTP verify → Submit

### Testimonial 1

> आपले जर आरोग्य असेल तरच आपल्याला इतर गोष्टी मिळतील, आणि SCT वैदिक हे आरोग्य देणारे तंत्रज्ञान आहे

— **दादासाहेब आहेर**, पिंपरी निर्मल, राहता, अहमदनगर · 9730380730
Image: `https://finalapi.soilchargertechnology.com/public/uploads/web/testimonials/62_Testimonials.png`

*(EN: "Only if we have health will we get other things — and SCT Vedic is the technology that gives health.")*

### Testimonial 2

> बिनधास्त आणि नीरधास्त जीवन जगायचे असेल तर शेतकऱ्यांनी SCT वैदिक कडे वळायला पाहिजे.

— **रोहन माने**, मोबाईल नं. 8951717111
Image: `https://finalapi.soilchargertechnology.com/public/uploads/web/testimonials/59_Testimonials.png`

*(EN: "If farmers want to live a carefree and fearless life, they should turn to SCT Vedic.")*

> Only **2 testimonials** exist on the whole site, and neither has a farm/crop/location photo — just a headshot. This is a major content gap given how central farmer proof is to the category. Collect more before the redesign ships.

---

## 10. Team (verbatim)

Section heading: **Meet Our Team Members**

| Name | Role | Image |
|---|---|---|
| Aniket Sahane | Director | `.../img/team/team1.png` |
| Rushikesh Hadwale | Production Director | `.../img/team/team2.png` |
| Prasad Mukhekar | Devlopment Director *(sic)* | `.../img/team/team3.png` |
| Arun Patole | General Manager | `.../img/team/team4.png` |
| Bhausabheb Khemnar | Technical Expert | `.../img/team/team5.png` |

Base: `https://soilchargertechnology.com/public`

> Note: **Mr. Ram Mukhekar (Founder)** does not appear on the Our Team page — he appears only in the About Us letter. Worth unifying in the redesign.

---

## 11. Photo gallery (20 images)

Section heading: **Photo Gallery** · sub-label: **your dream gallery** · CTA: **view more**

```
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/18092024090106276_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/222_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/223_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/225_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/227_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/230_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/233_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/234_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/241_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/242_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/243_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/244_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/245_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/246_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/247_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/255_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/256_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/257_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/260_gallaryphoto.png
https://finalapi.soilchargertechnology.com/public/uploads/web/gallaryphoto/261_gallaryphoto.png
```

> Gallery images carry **no captions, titles or alt text** on the old site.

---

## 12. Video gallery — 51 YouTube videos

**Channel:** https://www.youtube.com/@SOILCHARGERTECHNOLOGYOFFICIAL
Section heading: **Video Gallery** · CTA: **view more**
Embed pattern: `https://www.youtube.com/embed/{ID}`

### Full video ID list

```
00qYwcwZJI8   0i3ZAhGY3A0   2-h9xKGHCbU   4o6TTbOjQLg   5dgn2MmWAj0
5wj5w4DdNvY   7n_kqvXW_2I   8MrtsDC-OW8   95KV8p8FrUc   AhzMnzz_k2s
Apo5yO3PtPU   CAJKIM14vtY   CO-RYQan-lM   DP4DHTDSceo   D_3Uak6XCaI
DyuwR4HxwFQ   Hgj85i08JhY   ItKHaNATsJ4   KYgor_C98yk   L6YsUl2WuCQ
McmLzy5yM7Q   Mrv95W5zGDQ   NORL-e3UYZM   NvyBgX8BezM   O_rOfMok8Yw
OkkonP8pnqQ   PYmWvPT_Zts   QDE0Y7Nyc8I   RTa31XV5SWA   U_K36NQlbIs
XxONf5bnc6s   aOBGuXRJ2Wc   dKHi8lnDDPw   dg7PjY9rJxw   eLnNJ2rCGHQ
ekehapFh1VY   ff7ogTLM2UM   jQqVxFjWswI   jjoG7VfJjEw   jsTQVgDWjfw
lYqr1fmmxZk   lw9KRu8LKUQ   o28eO-Xxhg4   od6nKtmyErE   qDDNwcBGOEo
qG0yrB5O4No   t6pu8JBSnJ8   tb24EzQxM0o   tp7vlKSZreU   uRBmNI9ES8E
xwbdp0llwug
```

### The 8 videos featured on the homepage

```
5dgn2MmWAj0   95KV8p8FrUc   O_rOfMok8Yw   ekehapFh1VY
o28eO-Xxhg4   qG0yrB5O4No   tb24EzQxM0o   tp7vlKSZreU
```

### Other video reference in markup

`https://www.youtube.com/watch?v=pB5BUEr5mHM&t=1s`

> Videos have **no titles, descriptions or thumbnails** stored locally — just bare embeds in a grid. Titles will need to be pulled from YouTube (or the YouTube Data API) for the redesign.

---

## 13. Blog index — 21 articles

Section heading: **Latest News & Articles** · card CTA: **Read More**
Detail URL: `/sub-blogs?id={id}`
**Full article bodies are in [`sct-legacy-blog-archive.md`](sct-legacy-blog-archive.md).**

| ID | Full title | Image |
|---|---|---|
| 2 | What is soil Charger technology.... Author By Mr. Ram Mukhekar Sir. | `.../blog/2_companyprofile.jpg` |
| 3 | Bacteria are the soul of agriculture | `.../blog/3_blog1.jpg` |
| 12 | बहार धरलेल्या बागेत तणनाशकांचा वापर म्हणजे माणसाला जिवंत जाळणे होय !! | `.../blog/12_blog1.png` |
| 14 | सेंद्रिय कर्ब | `.../blog/14_blog1.png` |
| 15 | बागेला रेस्ट ट्रीटमेंट सुरु करण्यापूर्वी... हे वाचले का ⁉ मग पुन्हा पुन्हा काळजीपूर्वक व अभ्यासपूर्वक वाचा ...अनावश्यक खर्च वाचेल व उत्पन्नचि शाश्वती येईल.. | `.../blog/15_companyprofile.png` |
| 16 | वाटर सोलुबल ला दानेदार खते पर्याय ठरू शकतात का⁉ त्याचे फायदे तोटे काय ⁉ | `.../blog/16_blog1.png` |
| 17 | फॅास्पोरिक ॲसिड , नायट्रीक ॲसिड , सल्फ्यूरिक एसिड बहर काळात ड्रीपमधून बोधामध्ये मातीतील क्षारांचे विघटन करन्यासाठी वापरने योग्य आहे का ⁉ त्याला ओरगॅनिक पर्याय नाहीत का ⁉ | `.../blog/17_blog1.png` |
| 32 | आज प्रत्येत SCT युजरच्या मनात घोळनारा एकच प्रश्न⁉️ SCT वैदीक काय आहे ⁉️ | `.../blog/32_blog1.png` |
| 33 | थंडीत सेंद्रीय कर्बाचे प्रमाण वाढवणे. | `.../blog/33_blog1.png` |
| 34 | आजपर्यंत रासायनिक पद्धतीने शेती करत होतो ,डायरेक्ट SCT वैदीक वर शेती करू शकतो काय ⁉️ | `.../blog/34_companyprofile.png` |
| 63 | बहार धरलेल्या बागेत तणनाशकांचा वापर म्हणजे माणसाला जिवंत जाळणे होय ‼ | `.../blog/63_blog1.png` |
| 64 | SCT वैदीक चे प्रोडक्ट महाग का वाटतात ? | `.../blog/64_blog1.png` |
| 75 | Is Our Soil Healthy? | `.../blog/0405202404520675_blog1.jpg` |
| 76 | Death Of Agriculture? | `.../blog/0405202412170276_blog1.jpg` |
| 77 | "India's Agricultural Imports Exports: Trends & Insights" | `.../blog/0605202407142077_blog1.jpg` |
| 113 | India's Agriculture Revolution: A Vibrant Tale of Transformation | `.../blog/06052024113704113_blog1.jpg` |
| 128 | Can mine coal or wood ash be used for carbon? | `.../blog/08052024094334128_blog1.jpg` |
| 129 | Cancer | `.../blog/09052024075842129_companyprofile.jpg` |
| 130 | Chemical Used in Flowering | `.../blog/10052024072327130_blog1.jpg` |
| 131 | Waste Decomposer | `.../blog/11052024073140131_blog1.jpg` |
| 133 | Grape Farming | `.../blog/13052024115449133_blog1.jpg` |

Base: `https://finalapi.soilchargertechnology.com/public/uploads/web`

**Language split:** 11 English · 10 Marathi.
**Themes:** organic carbon, soil health, chemical harm & cancer, grape farming, waste decomposer, agricultural imports/economy, SCT product pricing justification.

> Note: blog IDs 12 and 63 share the same title — likely a duplicate. Confirm before migrating.

---

## 14. Forms on the old site

The old site is form-heavy. Six distinct forms, all as modals:

### 14.1 Export Form *(on hero)*

Name/Company Name · Mobile Number · City · State · Country · Pincode · Requirements → Submit

### 14.2 Enquiry Form *(footer, site-wide)*

Product dropdown → Super Soil Charger · Super Fruit Charger · Super Flower Charger · Super Crop Charger · Super Size Charger · Super Water Charger · Super Fungi Charger · Super Pest Charger · **Krushi Amrut** · **Green Gujrat**

Department routing options: **SCT Consulting · SCT Sales · SCT Management**

### 14.3 Internship Form

Full Name · Email · Mobile Number · Qualification · Address · Upload Resume → Save

### 14.4 SCT Business Recruitment / Distributor Application Form

The largest form on the site — a full distributor onboarding application:

**Personal Details:** First Name · Middle Name · Last Name · Mobile Number · Alternate Mobile Number · Email · State *(36-state dropdown)* · District · Taluka · Village

**Business Details:** Address of where to start · State · District · Taluka · Village

**Required Documents (uploads):** Aadhar Card (Front) · Aadhar Card (Back) · PAN Card · Shop ACT / NOC / Rent Agreement · Light Bill · SCT Product Purchase Bill

**Necessary Questions:**

1. Where you can open the shop? → *Village Level / Taluka Level / District Level*
2. Can you use Soil Charger Technology? → *Yes / No*
3. Why do you want to take distributorship?
4. If you used it, tell your experience & information?
5. Share your experience in farm & garden?
6. How many farmers do you want to work with? & approximately how much of the technology can you reach to the farmers? What is your goal?

### 14.5 Job Vacancy Form

Full Name · Email · Mobile Number · Qualification · Previous Experience (From / To) · Address · Upload Resume → Submit

### 14.6 Add Testimonial Form

Full Name · Mobile Number · Feedback · Upload Image · Upload Video → **OTP verification** → Submit

### Careers page structure

Three tracks: **Internship** · **SCT Business Association** · **Employment**
Images: `.../img/career/career1.png`, `career2.png`, `career3.png`

---

## 15. Static / theme assets

```
https://soilchargertechnology.com/public/img/logo/soillogo2.jpg          logo
https://soilchargertechnology.com/public/img/iso/ISO.png                 ISO 9001:2008 badge
https://soilchargertechnology.com/public/img/leaf.png                    testimonial leaf motif
https://soilchargertechnology.com/public/img/leaficon.png                leaf icon
https://soilchargertechnology.com/public/img/soil1.png
https://soilchargertechnology.com/public/img/chemicle.png
https://soilchargertechnology.com/public/img/dryfruits.png
https://soilchargertechnology.com/public/img/i2.png
https://soilchargertechnology.com/public/img/i4.png
https://soilchargertechnology.com/public/img/images/organic_item_shape02.png
https://soilchargertechnology.com/public/img/bg/subbanner.jpg            inner-page banner
https://soilchargertechnology.com/public/img/bg/subbanner00.png
https://soilchargertechnology.com/public/img/career/career1.png
https://soilchargertechnology.com/public/img/career/career2.png
https://soilchargertechnology.com/public/img/career/career3.png
https://soilchargertechnology.com/public/img/team/team1.png … team5.png
https://soilchargertechnology.com/public/img/icon/Call.png
https://soilchargertechnology.com/public/img/icon/whatsapp-button.png
https://soilchargertechnology.com/public/img/icon/Youtube.png
https://soilchargertechnology.com/public/img/icon/Instgram.png
https://soilchargertechnology.com/public/img/icon/facebook.png
https://soilchargertechnology.com/public/img/icon/twitter.png
https://soilchargertechnology.com/public/img/icon/web.png
https://soilchargertechnology.com/public/img/icon/eye.gif
https://soilchargertechnology.com/public/img/icon/rocket.gif
```

**Total distinct images across the site: 102.**

---

## 16. Content gaps to close before the redesign ships

Collected from everything above — these need client input, not design:

| # | Gap | Where |
|---|---|---|
| 1 | **Krushi Amrut** has no product page, yet it's a core basal-dose product in the 3 Principles | §6, §7 |
| 2 | **Green Gujrat**, **Super Fungi Charger**, **Super Pest Charger** in enquiry dropdown, no pages | §6 |
| 3 | **Milk Charger** and **Energy Booster** pages are empty | §7.16, §7.18 |
| 4 | **Plant Charger** page describes **Pest Cleaner** — content mismatch | §7.15 |
| 5 | `???%` placeholder never filled on Super Crop Charger | §7.3 |
| 6 | **Disease Fighter / Fungi Cleaner** named in principles but don't exist as products | §6 |
| 7 | Counter suffixes render as "155000 K" — real intended values unknown | §8 |
| 8 | Only **2 testimonials** site-wide, both headshots only | §9 |
| 9 | **51 videos with no titles** — need titles/descriptions | §12 |
| 10 | **20 gallery images with no captions or alt text** | §11 |
| 11 | Founder not on the Our Team page | §10 |
| 12 | **Zero meta descriptions** site-wide — no SEO foundation at all | §2 |
| 13 | No crop-wise grouping anywhere, despite crop-specific content in the blogs (grapes etc.) | §6, §13 |
| 14 | Blog IDs 12 and 63 appear to be duplicates | §13 |
| 15 | 3 Principles modal content is shuffled between the three modals | §3.3 |

---

## 17. What the old site has that the redesign must not lose

1. **The 4 Pillars** — the single strongest piece of brand IP on the site.
2. **The 3 Principles (Method / Rule / Meditation)** — a genuine, ownable system; the "Meditation" principle (daily video + WhatsApp + farmer-to-farmer discussion) is a real community mechanic, not marketing.
3. **The founder's letter** — a first-person origin story with dates. Rare and valuable.
4. **Dosage and packing data on every product** — farmers actually use this. Keep it prominent and make it scannable.
5. **The distributor application flow** — a real business function with document uploads and qualifying questions.
6. **51 YouTube videos + 21 long-form articles** — a substantial content library, currently buried.
7. **Trilingual intent** (EN / Marathi / Hindi).
8. **WhatsApp as a primary channel** — four numbers wired in. This is how the audience actually communicates.
