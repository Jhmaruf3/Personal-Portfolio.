"""
Personal Portfolio Website — Maruf Mohammad Jubayer Hossen
==========================================================
A bilingual (English / Simplified Chinese) portfolio built with Flask.

Run locally:
    python -m venv .venv
    .venv\\Scripts\\activate      (PowerShell)   or   .venv\\Scripts\\activate.bat  (Command Prompt)
    pip install -r requirements.txt
    python app.py
Then open http://127.0.0.1:5000 in your browser.
"""

import logging
import os
import secrets
import smtplib
from email.message import EmailMessage

from flask import Flask, flash, redirect, render_template, request, session, url_for

app = Flask(__name__)

# Secret key is used to sign the session cookie (needed for the CSRF token).
# If SECRET_KEY is not set in the environment, a random one is generated for
# each run — perfectly fine for local development.
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", secrets.token_hex(32))

# ---------------------------------------------------------------------------
# Optional email setup (documented in README.md and .env.example).
# Without these variables the contact form works in "demo mode": messages are
# validated and logged to the terminal, but NOT sent anywhere.
# ---------------------------------------------------------------------------
SMTP_ENABLED = os.environ.get("SMTP_ENABLED", "").lower() in ("1", "true", "yes")
SMTP_HOST = os.environ.get("SMTP_HOST", "")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASS = os.environ.get("SMTP_PASS", "")
SMTP_TO = os.environ.get("SMTP_TO", "")   # the address contact messages are sent to

logging.basicConfig(level=logging.INFO)


def get_csrf_token() -> str:
    """Return the session CSRF token, creating one if it does not exist."""
    if "csrf_token" not in session:
        session["csrf_token"] = secrets.token_hex(16)
    return session["csrf_token"]


@app.route("/")
def index():
    """Homepage — the whole portfolio lives in templates/index.html."""
    return render_template("index.html", csrf_token=get_csrf_token())


@app.route("/contact", methods=["POST"])
def contact():
    """Handle the contact form.

    Always validates server-side and checks the CSRF token.
    If SMTP is configured via environment variables, the message is emailed;
    otherwise it runs in demo mode and is only logged (clearly explained to
    the visitor so we never pretend a message was sent).
    """
    # 1) CSRF check — reject the request if the token is missing or wrong.
    form_token = request.form.get("csrf_token", "")
    if not form_token or not secrets.compare_digest(form_token, get_csrf_token()):
        flash("Security check failed. Please reload the page and try again.", "error")
        return redirect(url_for("index", _anchor="contact"))

    # 2) Server-side validation (same rules as the client-side checks).
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    message = request.form.get("message", "").strip()

    errors = []
    if len(name) < 2 or len(name) > 100:
        errors.append("Please enter your name (2–100 characters).")
    # A deliberately simple email check: something@something.tld
    if len(email) < 5 or len(email) > 254 or "@" not in email or "." not in email.split("@")[-1]:
        errors.append("Please enter a valid email address.")
    if len(message) < 10 or len(message) > 2000:
        errors.append("Please enter a message between 10 and 2000 characters.")

    if errors:
        for error in errors:
            flash(error, "error")
        return redirect(url_for("index", _anchor="contact"))

    # 3) Either send the email (if configured) or log it (demo mode).
    if SMTP_ENABLED and SMTP_HOST:
        try:
            msg = EmailMessage()
            msg["Subject"] = f"Portfolio contact: {name}"
            msg["From"] = SMTP_USER or email
            msg["To"] = SMTP_TO or SMTP_USER
            msg["Reply-To"] = email
            msg.set_content(
                f"Name: {name}\nEmail: {email}\n\n{message}"
            )
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as server:
                server.starttls()
                if SMTP_USER:
                    server.login(SMTP_USER, SMTP_PASS)
                server.send_message(msg)
            flash("Thanks for reaching out! Your message has been sent.", "success")
            app.logger.info("Contact email sent from %s", email)
        except Exception as exc:  # never leak credentials or details to the visitor
            app.logger.error("Failed to send contact email: %s", exc)
            flash("Sorry, the email could not be sent. Please try again later.", "error")
    else:
        # Demo mode — be transparent: the message is NOT actually sent.
        app.logger.info("DEMO contact message — Name: %s | Email: %s | %s", name, email, message)
        flash("This site runs in demo mode, so no email was sent. "
              "Your message was validated and logged for the developer.", "success")

    return redirect(url_for("index", _anchor="contact"))


@app.errorhandler(404)
def page_not_found(_error):
    """Friendly bilingual 404 page."""
    return render_template("404.html"), 404


if __name__ == "__main__":
    # debug=True only for local development — it reloads the app on file changes.
    # The port can be changed with an environment variable, e.g. PORT=5001,
    # which is handy if port 5000 is already in use by another app.
    app.run(host="127.0.0.1", port=int(os.environ.get("PORT", "5000")), debug=True)
