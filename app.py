import streamlit as st
import streamlit.components.v1 as components
import os
import threading
import http.server
import socketserver
import time

# Set Streamlit to wide mode
st.set_page_config(page_title="DX Dash Test", layout="wide", initial_sidebar_state="collapsed")

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

# Start the server in a background thread if it's not already running
if 'server_thread' not in st.session_state:
    # Check if port is already in use
    import socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('127.0.0.1', PORT))
    if result != 0:
        thread = threading.Thread(target=start_server, daemon=True)
        thread.start()
        st.session_state.server_thread = thread
        time.sleep(1) # give it a second to start
    sock.close()

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

# Use iframe to render the dashboard
components.iframe(f"http://localhost:{PORT}")


