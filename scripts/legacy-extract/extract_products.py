"""Extract structured product data from the legacy Laravel product pages."""
import re, html, json, sys, os

IDS = [88, 92, 95, 97, 99, 101, 104, 107, 111, 113, 115,
       116, 117, 118, 124, 125, 127, 134, 178, 179, 180]

sys.stdout.reconfigure(encoding='utf-8')


def text_lines(fragment: str) -> list[str]:
    """Strip the CMS's inline-styled markup down to clean text lines."""
    s = re.sub(r'(?is)<(script|style)[^>]*>.*?</\1>', ' ', fragment)
    s = re.sub(r'(?i)<(br|/p|/div|/li|/h[1-6]|/tr)[^>]*>', '\n', s)
    s = re.sub(r'(?s)<[^>]+>', '', s)
    s = html.unescape(s)
    s = s.replace(' ', ' ').replace('​', '')
    out = []
    for line in s.split('\n'):
        line = re.sub(r'[ \t]+', ' ', line).strip()
        if line:
            out.append(line)
    return out


def slugify(name: str) -> str:
    s = name.lower().strip()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-')


products = []
for pid in IDS:
    path = f'products/{pid}.html'
    raw = open(path, encoding='utf-8', errors='ignore').read()

    # Name: the first <h4 class="mb-4"> inside the tab pane.
    m = re.search(r'<h4 class="mb-4">\s*(.*?)\s*</h4>', raw, re.S)
    name = html.unescape(re.sub(r'<[^>]+>', '', m.group(1))).strip() if m else ''

    # Product image, hosted on the legacy API.
    mi = re.search(
        r'(https://finalapi\.soilchargertechnology\.com/public/uploads/web/product/[^"\']+)', raw)
    image = mi.group(1) if mi else None

    # Everything between the image row and the Reviews section is the body.
    start = raw.find('s_product_img')
    end = raw.find('Additional Information')
    if end < 0:
        end = raw.find('Reviews')
    body = raw[start:end] if start >= 0 and end > start else ''

    lines = text_lines(body)

    # Short description: first substantial line before "Product Description:".
    short = ''
    for ln in lines:
        if ln.lower().startswith('product description'):
            break
        if len(ln) > 40:
            short = ln
            break

    functions, ratio, packing = [], None, None
    for ln in lines:
        low = ln.lower()
        if re.match(r'^\d+[\.\)]\s', ln):
            functions.append(re.sub(r'^\d+[\.\)]\s*', '', ln).strip())
        elif low.startswith('ratio'):
            ratio = re.sub(r'^ratio\s*[:\-]*\s*', '', ln, flags=re.I).strip()
        elif low.startswith('packing') or low.startswith('packaging'):
            packing = re.sub(r'^pack(ing|aging)\s*[:\-]*\s*', '', ln, flags=re.I).strip()

    # Everything that is not a heading, the short desc, a numbered function,
    # ratio or packing — kept so no source copy is silently dropped.
    consumed = {short, ratio, packing}
    extra = [
        ln for ln in lines
        if ln not in consumed
        and not ln.lower().startswith(('product description', 's_product_img', 'ratio', 'packing', 'packaging'))
        and not re.match(r'^\d+[\.\)]\s', ln)
        and ln not in ('.', '-')
        and len(ln) > 2
    ]

    # A page whose body is empty or a single "." placeholder has no real content.
    meaningful = bool(short or functions or ratio or packing)

    products.append({
        'legacyId': pid,
        'name': name,
        'slug': slugify(name),
        'image': image,
        'shortDescription': short,
        'functions': functions,
        'ratio': ratio,
        'packing': packing,
        'extraLines': extra,
        'hasContent': meaningful,
    })

os.makedirs('out', exist_ok=True)
with open('out/products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f'{len(products)} products extracted\n')
for p in products:
    print(f"{p['legacyId']:>4}  {p['slug']:<28} fn={len(p['functions']):<2} "
          f"ratio={'Y' if p['ratio'] else '-'} pack={'Y' if p['packing'] else '-'} "
          f"img={'Y' if p['image'] else '-'} short={len(p['shortDescription']):<4} {'' if p['hasContent'] else '<-- EMPTY ON LIVE SITE'}")
