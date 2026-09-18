"""Extract structured article data from the legacy Laravel blog pages."""
import re, html, json, sys, os, unicodedata

IDS = [2, 3, 12, 14, 15, 16, 17, 32, 33, 34, 63,
       64, 75, 76, 77, 113, 128, 129, 130, 131, 133]

sys.stdout.reconfigure(encoding='utf-8')

DEVANAGARI = re.compile(r'[ऀ-ॿ]')


def text_lines(fragment: str) -> list[str]:
    s = re.sub(r'(?is)<(script|style)[^>]*>.*?</\1>', ' ', fragment)
    s = re.sub(r'(?i)<(br|/p|/div|/li|/h[1-6]|/tr)[^>]*>', '\n', s)
    s = re.sub(r'(?s)<[^>]+>', '', s)
    s = html.unescape(s).replace(' ', ' ').replace('​', '')
    out = []
    for line in s.split('\n'):
        line = re.sub(r'[ \t]+', ' ', line).strip()
        if line and line not in ('.', '-'):
            out.append(line)
    return out


def slugify(title: str) -> str:
    """ASCII slug. Devanagari titles transliterate to nothing, so those fall
    back to a stable id-based slug rather than colliding on an empty string."""
    s = unicodedata.normalize('NFKD', title)
    s = s.encode('ascii', 'ignore').decode('ascii').lower()
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return re.sub(r'-+', '-', s)[:70].strip('-')


articles = []
for aid in IDS:
    raw = open(f'blogs/{aid}.html', encoding='utf-8', errors='ignore').read()

    m = re.search(r'<h4 class="mt-5">\s*(.*?)\s*</h4>', raw, re.S)
    title = html.unescape(re.sub(r'<[^>]+>', '', m.group(1))).strip() if m else ''

    mi = re.search(
        r'(https://finalapi\.soilchargertechnology\.com/public/uploads/web/blog/[^"\']+)', raw)
    image = mi.group(1) if mi else None

    start = raw.find('s_blog_img')
    end = raw.find('Get In Touch', start if start > 0 else 0)
    body = raw[start:end] if start >= 0 and end > start else ''

    lines = [ln for ln in text_lines(body)
             if ln != title and not ln.startswith('s_blog_img')]

    # Author credit is baked into many titles: "… Author By Mr. Ram Mukhekar Sir."
    author = None
    am = re.search(r'Author\s*By\s*(.+?)\.?\s*$', title, re.I)
    clean_title = title
    if am:
        author = am.group(1).strip().rstrip('.')
        clean_title = title[:am.start()].strip().rstrip('.').strip()
    clean_title = re.sub(r'\.{2,}$', '', clean_title).strip()

    lang = 'mr' if DEVANAGARI.search(clean_title or ' '.join(lines[:3])) else 'en'

    # Devanagari titles strip to nothing (or to a meaningless fragment like
    # "sct") under ASCII slugification. Rather than machine-translating a
    # Marathi headline into an English slug we would be inventing, these get a
    # stable id-based slug and are flagged for a human-supplied one.
    ascii_slug = slugify(clean_title)
    slug_needs_review = lang == 'mr' or len(ascii_slug) < 5
    slug = ascii_slug if not slug_needs_review else f'article-{aid}'

    articles.append({
        'legacyId': aid,
        'title': clean_title,
        'slug': slug,
        'slugNeedsReview': slug_needs_review,
        'language': lang,
        'author': author,
        'image': image,
        'excerpt': (lines[0][:220] if lines else ''),
        'paragraphs': lines,
        'hasContent': bool(lines),
    })

# Guarantee global slug uniqueness — a collision would silently shadow a route.
seen: dict[str, int] = {}
for a in articles:
    if a['slug'] in seen:
        a['slug'] = f"{a['slug']}-{a['legacyId']}"
        a['slugNeedsReview'] = True
    seen[a['slug']] = a['legacyId']

os.makedirs('out', exist_ok=True)
with open('out/articles.json', 'w', encoding='utf-8') as f:
    json.dump(articles, f, indent=2, ensure_ascii=False)

print(f'{len(articles)} articles extracted\n')
for a in articles:
    flag = '' if a['hasContent'] else '  <-- EMPTY'
    print(f"{a['legacyId']:>4}  {a['language']}  {a['slug'][:42]:<44} "
          f"paras={len(a['paragraphs']):<3} img={'Y' if a['image'] else '-'}{flag}")

dupes = [s for s in {a['slug'] for a in articles}
         if sum(1 for a in articles if a['slug'] == s) > 1]
print('\nduplicate slugs:', dupes or 'none')
