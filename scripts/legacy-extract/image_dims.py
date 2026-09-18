"""Read real pixel dimensions for every legacy product/blog image.

Explicit width/height on every <Image> is what keeps CLS at zero; the old site
shipped 69 of 94 images with no dimensions at all. These must be measured, not
guessed, so we fetch just enough bytes to read each file's header.
"""
import json, struct, sys, urllib.request, io

sys.stdout.reconfigure(encoding='utf-8')


def fetch(url: str, nbytes: int = 65536) -> bytes:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read(nbytes)


def png_size(b: bytes):
    if b[:8] == b'\x89PNG\r\n\x1a\n' and b[12:16] == b'IHDR':
        return struct.unpack('>II', b[16:24])
    return None


def jpeg_size(b: bytes):
    f = io.BytesIO(b)
    if f.read(2) != b'\xff\xd8':
        return None
    while True:
        marker = f.read(2)
        if len(marker) < 2 or marker[0] != 0xFF:
            return None
        code = marker[1]
        (length,) = struct.unpack('>H', f.read(2))
        # SOF0..SOF15 except DHT(C4)/JPG(C8)/DAC(CC) carry the frame dimensions.
        if 0xC0 <= code <= 0xCF and code not in (0xC4, 0xC8, 0xCC):
            f.read(1)
            h, w = struct.unpack('>HH', f.read(4))
            return (w, h)
        f.seek(length - 2, 1)


def size_of(url: str):
    b = fetch(url)
    return png_size(b) or jpeg_size(b), len(b)


results = {}
for name in ('products', 'articles'):
    items = json.load(open(f'out/{name}.json', encoding='utf-8'))
    for it in items:
        url = it.get('image')
        if not url or url in results:
            continue
        try:
            dims, _ = size_of(url)
            results[url] = list(dims) if dims else None
            status = f'{dims[0]}x{dims[1]}' if dims else 'UNREADABLE'
        except Exception as e:
            results[url] = None
            status = f'ERROR {type(e).__name__}'
        print(f'{status:<14} {url.rsplit("/", 1)[-1]}')

json.dump(results, open('out/image-dims.json', 'w', encoding='utf-8'), indent=2)
ok = sum(1 for v in results.values() if v)
print(f'\n{ok}/{len(results)} images measured')
