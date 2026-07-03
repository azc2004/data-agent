import streamlit as st
import streamlit.components.v1 as components
import os
import json

# Set Streamlit to wide mode
st.set_page_config(page_title="DX Dash Test", layout="wide", initial_sidebar_state="collapsed")

# Custom CSS to hide Streamlit header/footer and make the iframe fullscreen
st.markdown("""
    <style>
        #MainMenu {visibility: hidden;}
        footer {visibility: hidden;}
        header {visibility: hidden;}
        .block-container {
            padding-top: 0rem !important;
            padding-bottom: 0rem !important;
            padding-left: 0rem !important;
            padding-right: 0rem !important;
            max-width: 100% !important;
        }
        iframe {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            border: none;
            z-index: 999999;
        }
    </style>
""", unsafe_allow_html=True)

# Path to the static directory
static_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")

# Helper to read file content safely
def read_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        return f.read()

# Load all files
try:
    html_content = read_file(os.path.join(static_dir, "index.html"))
    css_content = read_file(os.path.join(static_dir, "style.css"))
    js_content = read_file(os.path.join(static_dir, "app.js"))
    
    # Load JSON data
    member_data = read_file(os.path.join(static_dir, "data", "member_data.json"))
    annual_member_data = read_file(os.path.join(static_dir, "data", "annual_member_data.json"))
    
    # Format JSON strings to be safe for JS injection
    # We parse and re-serialize to ensure it's valid JSON
    member_data_json = json.dumps(json.loads(member_data))
    annual_member_data_json = json.dumps(json.loads(annual_member_data))
    
    # Create injection script
    injection_script = f"""
    <script>
        window.memberDataInjected = {member_data_json};
        window.annualMemberDataInjected = {annual_member_data_json};
    </script>
    """
    
    # Inline CSS (replace <link rel="stylesheet" href="style.css">)
    html_content = html_content.replace(
        '<link rel="stylesheet" href="style.css">',
        f"<style>\n{css_content}\n</style>"
    )
    
    # Inline JS and data injection (replace <script src="app.js"></script>)
    html_content = html_content.replace(
        '<script src="app.js"></script>',
        f"{injection_script}\n<script>\n{js_content}\n</script>"
    )
    
    # Render the self-contained HTML
    # Using st.components.v1.html allows rendering HTML code directly
    components.html(html_content, height=1000, scrolling=True)
    
except Exception as e:
    st.error(f"Error loading dashboard files: {str(e)}")
