import streamlit as st
import streamlit.components.v1 as components

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

# Use iframe to render the dashboard from the static directory served by Streamlit
components.iframe("/app/static/index.html")
