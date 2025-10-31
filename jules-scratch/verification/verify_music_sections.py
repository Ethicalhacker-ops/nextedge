from playwright.sync_api import sync_playwright
import os

def verify_music_sections():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Navigate to the local HTML file
        file_path = os.path.abspath('index.html')
        page.goto(f'file://{file_path}')

        # Locate the new music sections
        music_sections = page.locator('body')

        # Take a screenshot of the new sections
        music_sections.screenshot(path='jules-scratch/verification/verification.png')

        browser.close()

if __name__ == '__main__':
    verify_music_sections()
