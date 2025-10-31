import os
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local HTML file
        file_path = f"file://{os.getcwd()}/index.html"
        page.goto(file_path)

        # Wait for the page to load completely
        page.wait_for_load_state('networkidle')

        # Take a full-page screenshot
        page.screenshot(path="jules-scratch/verification/restored_portfolio.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    run()
