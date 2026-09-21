# AgroStar — Competitor Website Teardown

**Source:** https://corporate.agrostar.in/
**Analysed:** 2026-09-21
**Why this one:** AgroStar is the clearest example of an Indian agri company that sells inputs but does *not* present itself as a fertiliser company. That is exactly the positioning gap SCT needs to cross.

Companion files:
- [`sct-legacy-content.md`](sct-legacy-content.md) — full content inventory of the old SCT site
- [`sct-legacy-blog-archive.md`](sct-legacy-blog-archive.md) — full text of SCT's 21 blog articles

---

## 1. Competitive landscape (client-supplied, for context)

### Tier A — Direct product competitors (biologicals / soil health)

Swaroop Agro Sciences (Nashik) · IPL Biologicals · Aries Agro · Biostadt India
Regional (Nashik / Maharashtra): SK Biobiz · Enpro Bio Sciences · Godavari Bio-Fertilizer · Ekhande Agro Fertilizers · Farmsons Agri Solutions

### Tier B — Large national competitors

UPL · Coromandel International · IFFCO · Rallis India · Bayer

### Tier C — Digital / agri-platform competitors

DeHaat · CropIn · Ninjacart · other farmer-advisory & agri-commerce platforms

### The 8 to benchmark in detail

UPL · Coromandel · IFFCO · IPL Biologicals · Aries Agro · Biostadt · Swaroop Agro Sciences · **DeHaat**

### Benchmark axes

Hero section → Brand story → Products → Product-detail UX → Soil-health messaging → Farmer benefits → Crop-wise solutions → Research/technology → Farmer testimonials → Dealer network → CTA → Mobile UX → Animations → Typography → Color system → SEO structure

> **Positioning constraint:** SCT's new site should not look like a generic fertiliser company. SCT sits at **agri inputs + biological solutions + agronomy/advisory + farmer programs**.

---

## 2. AgroStar site map

```
/                          Home
/solutions/farm-advisory   ─┐
/solutions/agri-inputs      │  4 solution pages — the spine of the site
/solutions/omni-channel     │
/solutions/market-linkage  ─┘
/our-impact                Proof & ESG data
/about-us                  Leadership
/life-at-agrostar          Culture
/media-mentions            Press
/blog                      Content
/join-us                   Careers — the only hard CTA in the header
/contact
```

**Platform:** Wix Studio. Design credited to Maveristic. Images served as AVIF.
*Worth knowing: everything they achieved is achievable and beatable in Next.js.*

**Header nav:**

```
Our Solutions ── Farm Advisory
              └─ Agri Inputs
              └─ Omnichannel Access
              └─ Market Linkages
Inside AgroStar ── About Us
                └─ Life at AgroStar
                └─ Media Mentions
                └─ AgroStar Stories
Our Impact
Contact Us
[Join Us]  ← button
```

**Footer:** Head office Pune (Nyati Tech Park) · regional offices Gujarat & Mumbai · Phone 020 41504242/43 *(10 AM–6 PM weekdays)* · Customer care 95030-95030 · LinkedIn, Instagram, Facebook, YouTube, X · Privacy Policy · Terms

---

## 3. Page-by-page structure

### 3.1 Home — a table of contents, not a sales page

| Order | Section | Function |
|---|---|---|
| 1 | Hero: *"Empowering millions of Indian farmers to grow more, earn more, sustainably."* | Mission, not product |
| 2 | "IN THE NEWS" strip — *"AgroStar Bags $30 Mn for Omnichannel Expansion, To Invest In AI Capabilities"* | Credibility, one line |
| 3 | Impact stats: 12 states · 12M+ farmers · 73% increased income · 63% reduced chemical usage · Farmer NPS 50 | Proof before pitch |
| 4 | **4 solution cards** — heading + one stat + one line + "Explore" | The whole business in one screen |
| 5 | Investor logo carousel | Trust |
| 6 | Footer | |

The homepage sells **nothing**. It routes. Each of the four cards carries exactly one number:

| Card | Stat | Line |
|---|---|---|
| Farm Advisory | 15 Million advisory interactions | "Asia's largest farmer advisory platform" |
| Agri Inputs | 200+ Agri input products | Yield improvement and cost reduction |
| Omnichannel Access | 10,000+ Retail Stores | App, advisory centres, Saathi Stores |
| Global Market Linkages | 100,000+ MT of F&V processed annually | 25+ countries via the Kimaye brand |

### 3.2 `/solutions/agri-inputs` — the product page, and the one to study

| Order | Section | Content |
|---|---|---|
| 1 | Hero | *"Quality inputs at affordable prices, for every crop."* — portfolio of trusted seeds, crop nutrition and protection through India's distribution network |
| 2 | **3 outcome stats** | 80% reported higher germination for AgroStar seeds · 90% reported yield increase from crop nutrition products · 60% reported reduction in chemical fertilisers like Urea and DAP |
| 3 | **4 category cards** | Seeds (hybrid + open-pollinated, 30+ crops) · Crop Nutrition (organic fertilisers, biostimulants) · Crop Protection (pesticides, insecticides, fungicides — *explicitly excludes red-triangle products*) · Farm Implements (torches, tarpaulin, sprayers) |
| 4 | Retailer benefits | Complete portfolio · higher margins through disintermediation · increased store footfall |
| 5 | **Product development process** | Identify Gaps → Assessment & Validation → Agronomy Advisory Integration → Farmer Feedback Loop |
| 6 | Digital platform features (animated) | AI Crop Diagnosis · Weather Insights · Digital Agri Knowledge · Product Marketplace |
| 7 | Supply chain | Fruit care partnerships, infrastructure, packaging, farm-to-fork traceability |
| 8 | Close | *"The World is our Marketplace"* + client journey carousel |

**Critical observation: there is no catalog.** No SKU grid, no prices, no filters, no product detail pages. Four categories and a narrative. The corporate site sells the *capability*; the app sells the *products*.

### 3.3 `/solutions/farm-advisory`

Hero: *"Asia's largest Agri-Advisory platform, powered by technology"* — "connects with over 100,000 farmers every day."

**"Advice that Transforms Livelihoods"** — 4 stat cards:

- 15 Million agronomy queries resolved till date
- 400 Million views on agronomy videos
- 11 local languages supported
- 63% of farmers find no alternative to AgroStar's advisory

Then app features (4 animated GIFs), retailer tools, testimonials, farmer reviews.

**Closing CTA is a human one:** *"Instant and personalised advisory at AgroStar's Agronomy Advisory Center — AgroStar employs over 500 BSc Agronomists who consult with 25,000 farmers every day, live."* → **Call Us: 9503095030**

### 3.4 `/solutions/omni-channel`

Hero: *"1 Omnichannel platform, 3 touchpoints"* / *"To serve farmers wherever, whenever they need us."*

Stats: 12M+ farmers reached at their channel of choice · 7,500+ pincodes across 12 states · 10,000+ Saathi Stores · 400+ last-mile delivery partners

| Channel | Audience | Content | CTA |
|---|---|---|---|
| **Saathi Stores** | Local entrepreneurs | Full portfolio, higher margins, more footfall | *Join as a Saathi Partner* |
| **Saathi App** | Retailers — "Industry Gold Standard Platform" | Transparent ledger (Hisaab), AI-recommended cart, Grahak (access to 12M farmers), price discovery | Download |
| **Farmer App** | Farmers — "One stop solution" | AI crop diagnosis, weather, knowledge, marketplace + doorstep delivery | Download |

Plus: Agri Advisory Centre (500+ agricultural graduates), free doorstep delivery on digital channels.

### 3.5 `/solutions/market-linkage`

Hero: *"Bringing Indian farmers close to the world."* Sub-brand **Kimaye** gets its own logo and identity.

*"Pioneering Indian F&V exports for over a decade"* — 25+ countries · 100K+ MT exported in FY25 · <1% post-harvest food loss

**Export excellence — 4 pillars:** Fruit Care (farmer partnerships) · State-of-the-art supply chain · Packaging innovations · Farm-to-fork traceability

**Named client testimonial:** Mr. Salim M A, Director, Lulu Group International — partnership began 2016 with pomegranates, expanded to dragon fruit, banana and guava.

### 3.6 `/our-impact` — the strongest page on the site

Structured like an ESG report, not a marketing page.

**Hero stats:** 81% of farmers report increased yield · 73% report improved quality of life · 470K MT CO2e abatement · 1 trillion litres of water conserved

**Mission line:** *"The AgroStar model ensures that farmer prosperity and environmental sustainability are not competing goals but complementary outcomes."*

#### Planet — "The Indian Fertilizer Challenge"

India is the world's third-largest emitter; agriculture is 14% of the national total. Then a comparison table:

| Country | Fertiliser consumption |
|---|---|
| India | **259 kg/hectare** |
| China | 104 kg/hectare |
| Brazil | 33 kg/hectare |
| USA | 20 kg/hectare |
| Argentina | 20 kg/hectare |

Their answer: 60% of farmers reduced DAP/Urea · 120,000 MT CO2e abated in FY25 · >1 trillion litres water conserved (80% of it in moderate-to-severe water stress regions) · soil water retention up 10–15% · <1% post-harvest food wastage vs 8–10% global.

#### Social — three paired stat blocks

| Theme | Stats |
|---|---|
| Growing More, Using Less | 81% increased production · 41% gained >25% · 19% average change |
| Smart Farming, Lower Costs | 53% reduced cultivation expenses · 43% cut costs >25% · 32% average reduction |
| Where Yield Meets Income | 70% significant income growth · 41% increases above 25% · 73% average income change |

#### "Impact Beyond the Farm" — where the extra income went

33% children's education · 26% housing enhancement · 23% asset acquisition · 18% debt repayment

#### Gated downloads

- AgroStar ESG Report 2024
- **Farmer Impact Survey by 60 Decibels** (third-party verified)

Form captures: Name, Email, Organization Name.

> **No farmer testimonials on this page at all.** Deliberate — the page is aimed at investors, partners and press, so it leans entirely on third-party audited numbers.

### 3.7 `/about-us`

Tagline: *"AgroStar is India's leading AgriTech company with a singular mission—#HelpingFarmersWin. A decade of impact across People and Planet. And we're just getting started. It is still day 1..."*

Leadership grid — 9 people, photo + title + expandable bio:

Shardul Sheth (CEO & Co-Founder) · Sitanshu Sheth (COO & Co-Founder) · Ritesh Alladwar (CFO) · Sunil Jain (CTO) · Kalpesh Khivasara (President International Sales) · Priyanjali Kharbas (SVP People Practices) · Prachi Singh (SVP People Practices) · **Faraz Hussain (SVP Crop Care)** · **Dr. Devraj Arya (VP R&D)**

Science leadership is made visible.

---

## 4. How AgroStar focuses on product — the mechanics

**1. Category cards, never a catalog.** Four categories, no SKUs, no prices, no filters. Corporate site sells capability; app sells products. Clean separation of concerns.

**2. Every product claim is a farmer outcome with a percentage.** Not "high-quality biostimulants" but "90% reported an increase in yield." The subject of every sentence is the farmer, not the company.

**3. They show the R&D process instead of the R&D.**

```
Identify Gaps → Assessment & Validation → Agronomy Advisory Integration → Farmer Feedback Loop
```

The single smartest block on the site. It converts "we sell fertiliser" into "we run a closed-loop system." Cheap to build, and no generic fertiliser company has it.

**4. Product is always bundled with advisory.** Step 3 of the loop is literally "Agronomy Advisory Integration." The product is never presented standing alone.

**5. One number per claim, repeated everywhere.** 12M farmers · 10,000 stores · 200+ products · 500 agronomists. The same numbers appear on home → solution page → impact page. Memorable by repetition.

**6. Trust by naming.** Real executives with real titles. A named client at a named company. A third-party survey firm (60 Decibels). Investor logos. Two phone numbers *with office hours*.

**7. Every audience has its own door.**

| Audience | Door | CTA |
|---|---|---|
| Farmer | Farmer App | Download |
| Retailer | Saathi Stores / Saathi App | Join as a Saathi Partner |
| Exporter / buyer | Kimaye | — |
| Talent | Join Us | Header button |
| Investor / press | Our Impact | Gated report download |

**8. Negative space as trust.** "Crop Protection — *excludes red triangle products*." Saying what they refuse to sell is a strong signal for a sustainability-positioned brand.

---

## 5. What to take for SCT — ranked

| # | Pattern | Why it fits SCT | SCT's raw material |
|---|---|---|---|
| 1 | **The 4-step product development loop** | Highest-value pattern on the site; maps directly onto SCT's soil-biology story and is the main defence against looking like a generic fertiliser company | The founder's letter already describes a 4-step evolution (organic carbon → alternatives → Mycorrhiza/PGR → crop protection) |
| 2 | **Outcome stats over product specs** | SCT needs its own "60% reduced Urea/DAP" | Needs field-trial or farmer-survey data — currently missing |
| 3 | **A dedicated Impact page with a problem table** | AgroStar's India-vs-world fertiliser table is the most persuasive thing they made; SCT's soil-degradation story is more visceral | The blog archive is full of this argument already |
| 4 | **Category cards, not a catalog** | 21 products with no grouping is the old site's biggest UX failure | Natural groups already exist: SUPER line / VEDIC line / bagged soil products |
| 5 | **A door per audience** | Farmer · dealer/distributor · agronomist-institution · export buyer | Distributor form and Export form already exist — they just have no landing page |
| 6 | **Visible science leadership** | Counters the "unproven organic product" objection | Founder + Technical Expert + Production Director already on staff |
| 7 | **One number repeated everywhere** | Builds recall | 1M farmers · 155K subscribers · 460 distributors · 50K seminars — already on the old site |
| 8 | **Human CTA (Call Us + hours)** | SCT's audience lives on WhatsApp and phone | 4 WhatsApp numbers + 2 phone lines already wired in |

---

## 6. Where NOT to follow AgroStar

| Weakness | SCT's advantage |
|---|---|
| Homepage is bland — pure routing, no story | SCT has a founder origin story with real dates |
| About page skips the founding story entirely | The founder's letter is genuinely good copy |
| Almost no emotional register in the copy | SCT's Marathi content is emotionally direct and farmer-to-farmer |
| Thin on farmer testimonials | *(SCT is currently worse here — only 2. But it's a solvable gap and AgroStar has left the space open)* |
| No crop-wise solutions | SCT's blog already has crop-specific depth (grapes, pomegranate) |
| Corporate distance — the founders aren't the voice | Ram Mukhekar is a recognisable, present voice with 155K YouTube subscribers |

**Summary:** AgroStar wins on structure, proof and discipline. It loses on story, warmth and crop specificity. SCT's brief already calls for brand story + farmer testimonials + crop-wise solutions — which is exactly the gap AgroStar leaves open.

---

## 7. Method note

This teardown was built from markdown extractions of the live pages. A few blocks (the retailer-benefits trio, the 4-step development loop, the Kimaye pillars) appeared in the extraction of *multiple* solution pages. Either AgroStar reuses a shared section library across pages, or the converter picked up DOM that is visually hidden per-page. That distinction is not resolvable from text alone, and it does not change any conclusion above — but if it matters for an IA decision, verify in a browser first.

The remaining 7 benchmark sites (UPL, Coromandel, IFFCO, IPL Biologicals, Aries Agro, Biostadt, Swaroop Agro Sciences) have not been analysed yet.
