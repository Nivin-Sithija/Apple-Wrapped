# Apple Music Library Recap 
<img width="2224" height="754" alt="Screenshot 2026-05-09 at 23 46 32" src="https://github.com/user-attachments/assets/ee938165-0022-400c-95f9-6117d0403e77" /><br>

Like Spotify Wrapped for Apple Music Library, but better because you don't have to wait until December, and you can go back to any year you want.

Apple-Wrapped is a macOS desktop app that reads straight from your Apple Music library. No account needed. No API keys. No Spotify subscription. Just you, your Mac, and your (possibly questionable) taste in music. Perfect if you somehow own a Mac but are too broke to buy Apple Music or Spotify, or if you really like using your local Apple Music library.

## How it works
Under the hood, this app uses AppleScript to securely access your local Music library data. Then it processes your listening history to generate detailed statistics faster than you can skip a song. The result is a recap that lets you explore your library's story whenever you feel like.

## Before you start

You'll need:
- A **Mac** (this won't work on Windows/Linux, sorry)
- **Node.js** installed — grab it from [nodejs.org](https://nodejs.org) if you don't have it
- **Apple Music** with some songs in your library (the more the better)

---

## Running it

Open Terminal, navigate to this folder, and run:

```bash
npm install
npm run dev
```

That's it. The app will open.

> **First time?** macOS will ask if this app can control Music. Say yes — it needs that to read your library. You can find this permission later at **System Settings → Privacy & Security → Automation**.

---

## Build a standalone app

```bash
npm run build:mac
```

This produces the standalone app and DMG installers in the `dist/` folder.

---
⭐ Star this if you've ever defended Apple Music in an argument — PRs welcomed.
