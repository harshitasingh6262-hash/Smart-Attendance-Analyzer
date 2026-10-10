"""
Smart Attendance Analyzer - Local Development & Production Server
Serves the website locally with zero external dependencies.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and disable cache during testing
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def run_server():
    port = PORT
    for attempt in range(5):
        try:
            with socketserver.TCPServer(("", port), Handler) as httpd:
                print("=" * 60)
                print("[*] SMART ATTENDANCE ANALYZER (College AMS AI Edition)")
                print("=" * 60)
                print(f"[+] Server is live at: http://localhost:{port}")
                print(f"[*] Root directory:    {DIRECTORY}")
                print("Press Ctrl+C to stop the server.")
                print("=" * 60)
                
                # Automatically open in default web browser if specified or on startup
                if "--open" in sys.argv:
                    webbrowser.open(f"http://localhost:{port}")
                    
                httpd.serve_forever()
                break
        except OSError:
            port += 1

if __name__ == "__main__":
    run_server()
