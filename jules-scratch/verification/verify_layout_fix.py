
import os
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Construct the absolute file path
        file_path = f"file://{os.getcwd()}/privacy-policy.html"

        page.goto(file_path)
        page.screenshot(path="jules-scratch/verification/privacy-policy-fixed.png")
        browser.close()

run()
