from playwright.sync_api import Page, expect
import os

def test_booking_page(page: Page):
    """
    This test verifies that the booking page is correctly set up.
    """
    # 1. Arrange: Go to the booking page.
    page.goto(f"file://{os.getcwd()}/booking.html")

    # 2. Assert: Check that the service dropdown is populated.
    expect(page.locator("#service > option")).to_have_count(5)

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/booking-page.png")
