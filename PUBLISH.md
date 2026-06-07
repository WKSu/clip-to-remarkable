# Publishing this repo to GitHub

The folder is already a committed git repository, so you only need to create a
remote and push.

## Option 1 — GitHub CLI (one command)
With the `gh` CLI installed and authenticated (`gh auth login`):

```bash
cd clip-to-remarkable
gh repo create clip-to-remarkable --public --source=. --remote=origin --push
```

That creates the repo under your account and pushes `main`.

## Option 2 — plain git
Create an empty repo on github.com first (no README/license — this repo has
them), then:

```bash
cd clip-to-remarkable
git branch -M main
git remote add origin https://github.com/<your-username>/clip-to-remarkable.git
git push -u origin main
```

## Make the first commit yours (optional)
The initial commit uses a placeholder author. To put your name on it:

```bash
git config user.name  "Your Name"
git config user.email "you@yourmail.com"
git commit --amend --reset-author --no-edit
git push --force-with-lease   # only if you already pushed
```

## Linking it from the extension
Once pushed, your repo URL is:
`https://github.com/<your-username>/clip-to-remarkable`

Put that in the add-on's **Homepage** / **Support site** fields on
addons.mozilla.org. You can also add it to `manifest.json`:

```json
"homepage_url": "https://github.com/<your-username>/clip-to-remarkable"
```
