#!/usr/bin/env python3
"""
Regenerates rss.xml from posts.json.

Run this from the project root any time you add or edit a post:
    python3 build_rss.py

Update SITE_URL below once the blog is live at its real address.
"""
import json
import html
from datetime import datetime, timezone
from pathlib import Path

SITE_URL = "https://blog.ervbo.com"
SITE_TITLE = "Erv's Notebook"
SITE_DESCRIPTION = "Short reflections on Scripture, physics, and the space where they meet."

ROOT = Path(__file__).parent
posts = json.loads((ROOT / "posts.json").read_text())
posts.sort(key=lambda p: p["date"], reverse=True)

def rfc822(date_str):
    dt = datetime.strptime(date_str, "%Y-%m-%d").replace(tzinfo=timezone.utc)
    return dt.strftime("%a, %d %b %Y %H:%M:%S %z")

items = []
for p in posts:
    url = f"{SITE_URL}/posts/{p['slug']}.html"
    items.append(f"""    <item>
      <title>{html.escape(p['title'])}</title>
      <link>{url}</link>
      <guid>{url}</guid>
      <pubDate>{rfc822(p['date'])}</pubDate>
      <category>{p['tag'].capitalize()}</category>
      <description>{html.escape(p['excerpt'])}</description>
    </item>""")

rss = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>{html.escape(SITE_TITLE)}</title>
    <link>{SITE_URL}</link>
    <description>{html.escape(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
{chr(10).join(items)}
  </channel>
</rss>
"""

(ROOT / "rss.xml").write_text(rss)
print(f"Wrote rss.xml with {len(posts)} posts.")
