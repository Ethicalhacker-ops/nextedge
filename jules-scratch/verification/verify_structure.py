
import os
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Base URL for local files
    base_url = f"file://{os.getcwd()}"

    # Pages to verify
    pages = ["index.html", "about.html", "services.html", "contact.html"]

    for i, page_name in enumerate(pages):
        page.goto(f"{base_url}/{page_name}")
        page.screenshot(path=f"jules-scratch/verification/screenshot-{i}.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
