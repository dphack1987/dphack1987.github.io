import os

def update_html_files():
    root_dir = os.getcwd()
    css_link = '<link rel="stylesheet" href="assets/css/wix-menu.css">'
    
    # Walk through all files in the directory
    for filename in os.listdir(root_dir):
        if filename.endswith(".html"):
            file_path = os.path.join(root_dir, filename)
            
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Check if the link already exists
                if 'assets/css/wix-menu.css' in content:
                    print(f"Skipping {filename}: Already has CSS link")
                    continue
                
                # Insert the link before the closing head tag
                if '</head>' in content:
                    new_content = content.replace('</head>', f'  {css_link}\n</head>')
                    
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {filename}")
                else:
                    print(f"Skipping {filename}: No </head> tag found")
                    
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    update_html_files()
