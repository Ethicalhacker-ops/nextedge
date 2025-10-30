
import os
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        # Construct the file path to be platform-independent
        file_path = os.path.join(os.getcwd(), 'index.html')
        # Use path.as_uri() to convert the file path to a file:// URL
        page.goto(f"file://{file_path}")
        page.screenshot(path='jules-scratch/verification/verification.png')
        browser.close()

if __name__ == "__main__":
    run()
