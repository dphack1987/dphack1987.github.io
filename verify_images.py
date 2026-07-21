import pathlib
import re
root = pathlib.Path('.').resolve()
refs = []
pattern_html = re.compile(r'<img[^>]+src=["\']([^"\']+)["\']', re.I)
pattern_css = re.compile(r'url\(["\']?([^"\')]+)["\']?\)', re.I)
for path in root.rglob('*'):
    if path.suffix.lower() in ['.html', '.css']:
        text = path.read_text(encoding='utf-8', errors='ignore')
        pat = pattern_html if path.suffix.lower() == '.html' else pattern_css
        for m in pat.finditer(text):
            ref = m.group(1).strip()
            if re.search(r'\.(png|jpe?g|gif|webp|svg|avif)$', ref, re.I):
                refs.append((path.relative_to(root), ref))
missing = []
for file, ref in refs:
    if re.match(r'^[a-zA-Z]+:|^//', ref):
        continue
    candidate = (root / file.parent / ref).resolve()
    if not candidate.exists():
        candidate = (root / ref.lstrip('/\\')).resolve()
    if not candidate.exists():
        missing.append((str(file), ref))
with open('verify_images_summary.txt', 'w', encoding='utf-8') as out:
    out.write(f'TOTAL_REFS:{len(refs)}\nMISSING:{len(missing)}\n')
    for file, ref in missing[:200]:
        out.write(f'{file} => {ref}\n')
print('done')
