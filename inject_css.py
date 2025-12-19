import os
import re

def update_html_files():
    root_dir = os.getcwd()
    # Use absolute path for GitHub Pages root
    css_link = '<link rel="stylesheet" href="/assets/css/wix-menu.css">'
    home_marker = 'Mapa Turístico del Quindío'

    def remove_home_header(block: str) -> str:
        pos = block.find('<header')
        changed = False
        while pos != -1:
            end = block.find('</header>', pos)
            if end == -1:
                break
            segment = block[pos:end+len('</header>')]
            if home_marker in segment:
                block = block.replace(segment, '')
                changed = True
                pos = block.find('<header')
            else:
                pos = block.find('<header', end)
        return block
    
    def remove_global_header(block: str) -> str:
        start = block.find('<div class="global-header"')
        while start != -1:
            end = block.find('</div>', start)
            if end == -1:
                break
            block = block[:start] + block[end+6:]
            start = block.find('<div class="global-header"')
        return block
    
    def normalize_wix_css_link(block: str) -> str:
        # Remove any existing wix-menu.css links (relative or absolute)
        block = re.sub(r'<link[^>]+href="[^"]*assets/css/wix-menu\.css"[^>]*>\s*', '', block, flags=re.IGNORECASE)
        # Ensure a single absolute link before </head>
        if '</head>' in block and '"/assets/css/wix-menu.css"' not in block:
            block = block.replace('</head>', f'  {css_link}\n</head>')
        return block
    
    count = 0
    # Walk through all files in the directory and subdirectories
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith(".html"):
                file_path = os.path.join(dirpath, filename)
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                    # Remove any previously injected Home header to restore original Wix header
                    if home_marker in content and '<header' in content:
                        content = remove_home_header(content)
                    
                    # Remove any previously injected global header block
                    if 'class="global-header"' in content:
                        content = remove_global_header(content)
                    
                    # Normalize CSS link to a single absolute link
                    content = normalize_wix_css_link(content)
                    
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated {filename} in {dirpath}")
                    count += 1
                    
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
    
    print(f"Total files updated: {count}")

if __name__ == "__main__":
    update_html_files()
