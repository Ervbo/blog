# Erv's Notebook

A small, plain, static blog for your Biblical and Technical summaries — one site, two tags, no framework, no build step (except the optional RSS regeneration).

## What's here

```
index.html          — post list, with All / Biblical / Technical filter buttons
posts.json           — the manifest that drives the list (title, date, tag, excerpt, slug)
posts/               — one static HTML file per post
posts/template.html  — copy this to start a new post
style.css            — all styling (light + dark mode)
theme.js             — dark/light toggle (shared by every page)
script.js            — renders + filters the post list on index.html
rss.xml              — auto-generated feed; regenerate with build_rss.py
build_rss.py         — run `python3 build_rss.py` after adding a post
```

## Adding a new post (3 steps)

1. Copy `posts/template.html` to `posts/your-slug-here.html` and fill in the title, date, tag (`biblical` or `technical`), and paragraphs. Instructions are in comments at the top of the template.
2. Add a matching entry to `posts.json`:
   ```json
   {
     "slug": "your-slug-here",
     "title": "Your Post Title",
     "date": "2026-08-01",
     "tag": "biblical",
     "excerpt": "One sentence that shows up in the list and the RSS feed."
   }
   ```
3. Run `python3 build_rss.py` to refresh the RSS feed, then commit and push.

That's it — no rebuild, no npm install. It's the same "edit HTML, push to GitHub" workflow you already use for the Bible app.

## Deploying (same pattern as ervbible.ervbo.com)

1. Create a new GitHub repo (e.g. `Ervbo/blog`) and push this folder to it.
2. In Netlify: **Add new site → Import an existing project**, connect the repo. No build command needed — publish directory is the repo root (`.`).
3. Once it deploys to a `*.netlify.app` URL, go to **Domain settings → Add custom domain** and add `blog.ervbo.com`.
4. In GoDaddy DNS for `ervbo.com`, add the CNAME record Netlify gives you for `blog` (same way you pointed `ervbible` at Netlify).
5. Wait for DNS + SSL to propagate (usually under an hour), and `blog.ervbo.com` is live.

## Notifying friends without spamming their inbox

- Share the link once (`blog.ervbo.com`) — people can bookmark it and check whenever they like.
- Tech-savvy friends can subscribe to `blog.ervbo.com/rss.xml` in any RSS reader (Feedly, NetNewsWire, Inoreader) and get new posts without any email at all.
- For everyone else, send an occasional digest email — monthly, or whenever you've published a few new pieces — with direct links, instead of one email per post.

## Later, if you want to go further

- Point `blog.ervbo.com` at this instead of emailing, and mention it once in your next batch of summaries so people know where to look going forward.
- If the list ever gets long, the tag filter already scales — no restructuring needed.
