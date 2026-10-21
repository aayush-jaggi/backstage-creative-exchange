# Backstage concept demo

A single-page, static concept site for a fan-backed creative exchange. The layout uses an editorial photo hero, animated ticker, mock project listings, color-block feature cards, a Culture-100 chart with 1M/6M/1Y controls, and a pre-seed closing pitch. All project and market data is fictional. No investments or transactions can be made.

## Preview locally

Open `index.html` in a browser, or run a small local server:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Publish with GitHub Pages

Create a **private** repository on GitHub (leave it empty: no README, license, or `.gitignore`), then run these commands from this project folder. Replace `YOUR-USERNAME` and `YOUR-PRIVATE-REPO` with the values you chose:

```sh
git add index.html styles.css script.js README.md
git commit -m "Build Backstage creative funding demo"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-PRIVATE-REPO.git
git push -u origin main
```

In the repository on GitHub, open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, then save. GitHub Pages from a private repository is available on paid plans, but the published website is generally public on the internet even when its source repository is private. Private site access is limited to supported GitHub Enterprise Cloud organization configurations. For a public campaign, a private source repository can still work if your plan allows Pages; verify repository plan eligibility in [GitHub's Pages quickstart](https://docs.github.com/en/pages/quickstart).

## Customize

- Update the sample campaign copy and amounts in `index.html`.
- Change colors, type, and responsive styles in `styles.css`.
- Chart period controls, the mobile menu, and reveal-on-scroll effects are handled in `script.js`.
- The closing email button currently points to `aa.jaggi24@gmail.com`.

## Demo note

This is a fictional concept presentation. It makes no offer of securities or investments, provides no investment advice, and does not enable purchases, sales, or trading. The displayed projects, funding totals, timelines, trends, and community counts are sample data.

The example photographs load from Unsplash and are licensed for free commercial use under the [Unsplash License](https://unsplash.com/license). The license does not automatically grant rights to every person, brand, artwork, or property visible in a photo, so replace any image that could suggest a real person's endorsement in an ad.
