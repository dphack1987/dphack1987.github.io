import os

css_path = r'c:\Users\user\Documents\www.mapaturisticodelquindio.com\dphack1987.github.io\assets\css\wix-menu.css'

custom_css = """

/* ==========================================
   FIX MENU CUT-OFF ISSUES
   ========================================== */

/* Ensure the header container doesn't clip content */
#SITE_HEADER {
    overflow: visible !important;
    height: auto !important;
    min-height: 80px !important; /* Ensure enough height */
}

/* Allow the menu container to expand */
.wixui-dropdown-menu {
    width: 100% !important;
    max-width: 100% !important;
    overflow: visible !important;
    display: flex !important;
    justify-content: center !important; /* Center the menu */
}

/* Menu items wrapper */
.wixui-dropdown-menu nav, 
.wixui-dropdown-menu ul {
    display: flex !important;
    flex-wrap: wrap !important; /* Allow wrapping on small screens */
    justify-content: center !important;
    width: 100% !important;
    overflow: visible !important;
}

/* Adjust item spacing */
.wixui-dropdown-menu__item {
    flex: 0 1 auto !important; /* Allow items to shrink/grow properly */
    white-space: nowrap !important; /* Keep button text on one line */
    margin: 4px 8px !important; /* Add vertical margin for wrapping */
}

/* Ensure links inside items fill the space */
.wixui-dropdown-menu__item a {
    width: auto !important;
    display: inline-flex !important;
}

/* Responsive adjustments for smaller screens */
@media (max-width: 1024px) {
    .wixui-dropdown-menu__item a {
        padding: 0 10px !important; /* Reduce padding on smaller screens */
        font-size: 14px !important; /* Slightly smaller font */
    }
}
"""

try:
    with open(css_path, 'a', encoding='utf-8') as f:
        f.write(custom_css)
    print("Successfully appended layout fixes to CSS.")
except Exception as e:
    print(f"Error appending CSS: {e}")
