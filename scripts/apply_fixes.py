import re
from pathlib import Path
root = Path('.')
html_files = list(root.rglob('*.html'))
changes = []
for p in html_files:
    text = p.read_text(encoding='utf-8')
    new = text
    # replace ./anunciate.html -> /anunciate.html
    new = new.replace('./anunciate.html', '/anunciate.html')
    # replace ./index.html with / preserving fragment/query
    # patterns: ./index.html#fragment or ./index.html?query or ./index.html
    new = re.sub(r"\.\/index\.html(?=[#?])", '/', new)
    new = new.replace('./index.html', '/')
    if new != text:
        bak = p.with_suffix(p.suffix + '.bak')
        if not bak.exists():
            p.rename(bak)
            bak.write_text(text, encoding='utf-8')
            # restore original name for editing
            bak.replace(p)
        else:
            # make a numbered backup
            i = 1
            while True:
                bak2 = p.with_suffix(p.suffix + f'.bak{i}')
                if not bak2.exists():
                    p.rename(bak2)
                    bak2.write_text(text, encoding='utf-8')
                    bak2.replace(p)
                    break
                i += 1
        p.write_text(new, encoding='utf-8')
        changes.append(str(p))
print('Modified files:')
for c in changes:
    print(c)
print('Done')
