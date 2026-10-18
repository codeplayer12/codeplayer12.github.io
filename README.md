# noble.log

My cybersecurity learning journey blog. Jekyll on GitHub Pages, custom terminal theme.

## Go live (about 10 minutes)

1. On GitHub, create a **new public repo** named exactly **`codeplayer12.github.io`**. Don't add a README.
2. Upload everything in this folder: on the empty repo page, click **uploading an existing file**, drag the whole folder contents in (including the folders starting with `_`), and commit.
   - Or from a terminal:
     ```bash
     cd blog
     git init -b main
     git add .
     git commit -m "Launch blog"
     git remote add origin https://github.com/codeplayer12/codeplayer12.github.io.git
     git push -u origin main
     ```
3. Go to **Settings → Pages**. Under *Build and deployment*, set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**, then Save.
4. After a minute or two the site is live at **https://codeplayer12.github.io**. Progress shows under the repo's **Actions** tab.

## Connect your Namecheap domain

1. Namecheap → **Domain List → Manage → Advanced DNS**. Delete any existing parking records (the default `CNAME www → parkingpage.namecheap.com` and any URL Redirect record).
2. Add these records:

   | Type | Host | Value |
   |---|---|---|
   | A Record | @ | 185.199.108.153 |
   | A Record | @ | 185.199.109.153 |
   | A Record | @ | 185.199.110.153 |
   | A Record | @ | 185.199.111.153 |
   | CNAME Record | www | codeplayer12.github.io. |

3. In the GitHub repo: **Settings → Pages → Custom domain**, enter `yourdomain.com` and save. GitHub adds a `CNAME` file to the repo for you.
4. Once the DNS check passes (minutes to a few hours), tick **Enforce HTTPS**.
5. In `_config.yml`, change `url:` to `https://yourdomain.com` and commit.

Tip: in GitHub **Settings → Pages**, verify your domain too. It stops anyone else from pointing their GitHub site at it.

## Writing a post

1. Create a file in `_posts/` named `YYYY-MM-DD-short-title.md`. You can do this straight on github.com: open `_posts`, **Add file → Create new file**.
2. Start it with front matter, then write Markdown:

   ```markdown
   ---
   title: "Your Post Title"
   summary: "One sentence shown on the home page and in search."
   tags: [htb, linux]
   category: writeup
   ---

   Your post starts here.
   ```
3. Commit. The site rebuilds itself in about a minute.

Ready-made starting points are in `_templates/` (a box writeup and a progress update). That folder is never published.

**Images:** put them in `assets/img/` and use `![alt text](/assets/img/name.png)`.

**Note on dates:** a post with a date or time in the future won't appear until that time has passed.

## Updating certifications

Edit `_data/certs.yml`. Change `status:` to `earned`, `in-progress` or `planned`, and paste a Credly link into `verify:`. The home page and certs page update automatically.

## Changing the name or links

Everything is in `_config.yml`: blog title, tagline, description, LinkedIn and email.

## Rules I follow

No writeups for active HTB machines, exam content, or anything under NDA. Retired boxes and my own lab work only.

## Preview locally (optional)

```bash
bundle install
bundle exec jekyll serve
# open http://localhost:4000
```
# codeplayer12.github.io
