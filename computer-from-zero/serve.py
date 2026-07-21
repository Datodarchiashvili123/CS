#!/usr/bin/env python3
"""ლოკალური dev სერვერი ქეშის გარეშე — ცვლილებები ყოველთვის მაშინვე ჩანს.

გაშვება:  python3 serve.py
შემდეგ გახსენი:  http://127.0.0.1:8000
"""
import http.server
import socketserver

PORT = 8000


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        self.send_header("Pragma", "no-cache")
        super().end_headers()


if __name__ == "__main__":
    with socketserver.TCPServer(("127.0.0.1", PORT), NoCacheHandler) as httpd:
        print("Serving http://127.0.0.1:%d  (ქეში გამორთულია)" % PORT)
        httpd.serve_forever()
