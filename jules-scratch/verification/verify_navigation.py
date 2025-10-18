from playwright.sync_api import Page, expect
import os

def test_navigation(page: Page):
    # Navigate to the index.html file
    page.goto(f"file://{os.getcwd()}/index.html")

    # Expect the page to have the correct title
    expect(page).to_have_title("Bijay IT Solutions - Managed IT & Cybersecurity in Nepal")

    # Take a screenshot of the page
    page.screenshot(path="jules-scratch/verification/verification.png")