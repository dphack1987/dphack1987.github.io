import os

def update_html_files():
    root_dir = os.getcwd()
    # Use absolute path for GitHub Pages root
    css_link = '<link rel="stylesheet" href="/assets/css/wix-menu.css">'
    home_path = os.path.join(root_dir, 'home.html')
    with open(home_path, 'r', encoding='utf-8') as hf:
        home_content = hf.read()
    h_start = home_content.find('<header>')
    h_end = home_content.find('</header>')
    home_header = ''
    if h_start != -1 and h_end != -1:
        home_header = home_content[h_start:h_end+len('</header>')]
        home_header = home_header.replace('href="./', 'href="/')
    
    count = 0
    # Walk through all files in the directory and subdirectories
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith(".html"):
                file_path = os.path.join(dirpath, filename)
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Check if the link already exists (checking both relative and absolute)
                    if 'assets/css/wix-menu.css' in content:
                        # If it has the old relative link 'assets/css...', replace it or leave it?
                        # If it's deep, the relative link is broken. 
                        # Let's force update to absolute path if it's the wrong relative one,
                        # or just ensure the absolute one is there.
                        # Simplest: if it has EXACTLY '/assets/css/wix-menu.css', skip.
                        if '"/assets/css/wix-menu.css"' in content:
                            # print(f"Skipping {filename}: Already has correct absolute CSS link")
                            pass
                        else:
                            # It might have the relative one 'assets/css/...'. 
                            # Let's replace the relative one with absolute if found, or just add absolute.
                            # To avoid duplicates, let's remove the old one first if it exists without slash
                            content = content.replace('<link rel="stylesheet" href="assets/css/wix-menu.css">', '')
                    
                    # Insert the link before the closing head tag
                    if '</head>' in content and '"/assets/css/wix-menu.css"' not in content:
                        content = content.replace('</head>', f'  {css_link}\n</head>')
                    
                    # Inject Home header HTML right after the opening body tag if not present
                    if home_header and '<header>' not in content:
                        if '<body>' in content:
                            content = content.replace('<body>', '<body>\n' + home_header + '\n', 1)
                        elif '<body ' in content:
                            start = content.find('<body ')
                            end = content.find('>', start)
                            if start != -1 and end != -1:
                                content = content[:end+1] + '\n' + home_header + '\n' + content[end+1:]
                    
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated {filename} in {dirpath}")
                    count += 1
                    
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
    
    print(f"Total files updated: {count}")

if __name__ == "__main__":
    update_html_files()
