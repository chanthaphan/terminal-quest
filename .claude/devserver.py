#!/usr/bin/env python3
"""Static file server for web/ that disables caching, so edited ES modules
always reload during development. Usage: python3 .claude/devserver.py <port>"""
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8123
    ThreadingHTTPServer(("127.0.0.1", port), lambda *a: NoCacheHandler(*a, directory="web")).serve_forever()
