# Personal Portfolio — Maruf Mohammad Jubayer Hossen

A complete, bilingual (English / 简体中文) personal portfolio website built with
**Python + Flask** on the backend and **HTML, CSS and vanilla JavaScript** on the
frontend. No build tools, no external services, no API keys — it runs entirely
on your own computer.

![Stack](https://img.shields.io/badge/stack-Python%20%2B%20Flask%20%2B%20Vanilla%20JS-2dd4bf)

---

## Features

- **Bilingual** — full English and Simplified Chinese versions with a language
  switcher in the header (desktop + mobile). Your choice is remembered with
  `localStorage`.
- **Responsive** — mobile-first layout, no horizontal overflow, tested from
  small phones to wide desktops.
- **Accessible** — semantic HTML, skip link, keyboard-friendly controls, focus
  states, `prefers-reduced-motion` support, translated `alt` texts and
  `lang` attribute updates.
- **Performance-conscious** — short intro loader (≈1.4 s) with a pure-CSS
  fallback so content is never blocked, CSS-only animations and
  Intersection-Observer scroll reveals.
- **Honest content** — every fact comes from your CV. The project visual is
  clearly labelled as a concept preview, and the contact form never pretends
  to send an email (see [Contact form](#contact-form)).

## Project structure

```
app.py                    Flask app: routes, contact form, CSRF, 404 handler
requirements.txt          Pinned Python dependencies
templates/
  index.html              The whole portfolio page (bilingual via data-i18n keys)
  404.html                Friendly bilingual "page not found" page
static/
  css/style.css           All styling (design tokens, layout, animations)
  js/main.js              Translations dictionary + all behaviour
  images/profile.jpg      Your portrait (hero + favicon also live here)
  images/favicon.svg      Browser tab icon
README.md                 This file
.env.example              Template for optional email configuration
.gitignore                Keeps venvs, caches and .env out of version control
```

---

## Run it locally on Windows

### 1. Install Python (skip if you already have it)

Download Python 3.9+ from <https://www.python.org/downloads/> and, during
installation, **tick "Add Python to PATH"**.

Check it worked — open a terminal and run:

```powershell
python --version
```

### 2. Open the project folder in VS Code

Open this folder in VS Code, then open a new terminal
(**Terminal → New Terminal**). The commands below work in **PowerShell**
(default) and **Command Prompt** (use the `cmd` variants where shown).

### 3. Create a virtual environment

```powershell
python -m venv .venv
```

### 4. Activate it

PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Command Prompt:

```cmd
.venv\Scripts\activate.bat
```

> If PowerShell blocks the activation script, run
> `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` first, or use
> Command Prompt.

You should now see `(.venv)` at the start of your prompt.

### 5. Install dependencies

```powershell
pip install -r requirements.txt
```

### 6. Run the app

```powershell
python app.py
```

### 7. Open it in your browser

Visit **<http://127.0.0.1:5000>** — you should see the portfolio with the intro
animation. Press `Ctrl+C` in the terminal to stop the server.

> **Port 5000 already busy?** If another app (for example, an older Flask
> project left running) already uses port 5000, start this one on a different
> port instead:
>
> ```powershell
> $env:PORT = "5001"
> python app.py
> ```
>
> then visit **<http://127.0.0.1:5001>**.

---

## Customise it later

### Replace the profile photo

Drop your new photo at `static/images/profile.jpg` (keep the same filename) and
refresh the page. The photo is displayed with a fixed 3:4 arch crop, so any
portrait-oriented photo works. For best performance keep it under ~500 KB.

### Edit content and translations

- **HTML structure** — everything lives in `templates/index.html`.
- **English text** — change the visible English text in `index.html`, then
  update the matching entry under `en:` in `static/js/main.js` (the JS
  dictionary is used when switching languages, so both must stay in sync).
- **Chinese text** — edit the `zh:` entries in `static/js/main.js`.

**Adding a new translatable string:**

1. Add `data-i18n="your.new.key"` to the element in `index.html`
   (English text goes inside the element).
2. Add `"your.new.key": "..."` to **both** `en` and `zh` in `main.js`.
3. For input placeholders use `data-i18n-placeholder`, for `aria-label`s use
   `data-i18n-aria`, and for image `alt`s use `data-i18n-alt`.

### Update social links

- **GitHub** — change the `href` of the GitHub links in `index.html`
  (hero and contact section).
- **LinkedIn** — your CV only had a generic LinkedIn URL, so the button is
  hidden by default. Open `static/js/main.js`, find `LINKEDIN_URL` at the top,
  set it to your real profile URL (e.g. `"https://www.linkedin.com/in/your-handle"`),
  and save. The button appears automatically.

### Contact form

The form validates on both sides (JavaScript + server) and is protected by a
CSRF token. **In demo mode** (the default) messages are validated and printed
to the terminal where `python app.py` runs, but **no email is sent** — the page
tells visitors this clearly.

To send real emails, fill in the variables in `.env.example`, save them as
`.env`, load them into your terminal (or set them as system environment
variables), and run the app. Gmail example with an App Password:

```powershell
# PowerShell — one-time setup of the variables for this terminal window
$env:SMTP_ENABLED = "1"
$env:SMTP_HOST    = "smtp.gmail.com"
$env:SMTP_PORT    = "587"
$env:SMTP_USER    = "your-email@gmail.com"
$env:SMTP_PASS    = "your-app-password"
$env:SMTP_TO      = "your-email@gmail.com"
python app.py
```

Command Prompt:

```cmd
set SMTP_ENABLED=1
set SMTP_HOST=smtp.gmail.com
set SMTP_PORT=587
set SMTP_USER=your-email@gmail.com
set SMTP_PASS=your-app-password
set SMTP_TO=your-email@gmail.com
python app.py
```

> Never commit `.env` or credentials — `.gitignore` already excludes `.env`.

---

## Deploying later (optional — not needed for local use)

The app is a standard Flask application, so most Python-friendly hosts work
(Render, Railway, PythonAnywhere, a small VPS, etc.). Typical steps:

1. Push the project to GitHub (make sure `.env` is not committed).
2. On the host, set `SMTP_*` environment variables if you want email.
3. Run `pip install -r requirements.txt` and start the app with a production
   server such as `gunicorn app:app` (set `debug=False`).

Every host has slightly different steps — follow its Flask guide when you get
there.

---

## Final checklist (tested locally)

- [x] Homepage loads at `http://127.0.0.1:5000` with the intro animation
- [x] All navigation anchors scroll to the right sections
- [x] English → 中文 switch translates every section and interactive element
- [x] Language choice is remembered after a page refresh
- [x] Language switcher works at mobile width
- [x] Email, phone and GitHub links work in both languages
- [x] Contact form validates client-side and server-side; CSRF protected
- [x] Invalid input shows clear error messages; demo mode is clearly stated
- [x] 404 page is shown for unknown routes and is bilingual
- [x] `prefers-reduced-motion` disables decorative animation
- [x] Content still displays if JavaScript is disabled (English fallback)
