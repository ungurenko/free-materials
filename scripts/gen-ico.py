#!/usr/bin/env python3
"""Один скрипт: PNG 256 → Pillow пересжатает в 4 размера для favicon.ico."""
from PIL import Image
import os

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src_png = os.path.join(root, ".favicon-256.png")
sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]

base = Image.open(src_png).convert("RGBA")
out = os.path.join(root, "src", "app", "favicon.ico")
base.save(out, format="ICO", sizes=sizes)
print(f"✓ favicon.ico sizes={sorted(Image.open(out).info['sizes'])}  {os.path.getsize(out)} bytes")