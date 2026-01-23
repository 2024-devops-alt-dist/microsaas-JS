import { test, expect } from "@playwright/test";
test("Click test button with timeout", async ({ page }) => {
  await page.goto("http://localhost:5173/healthPage");
  try {
    // Attempt to click the test button with a timeout of 15000ms (15 seconds)
    await page.locator("button#testButton").click({ timeout: 15000 });
  } catch (error) {
    // Catch and log timeout errors
    console.error("Locator timeout exceeded:", error);
  }
  await expect(page.locator("div#successMessage")).toBeVisible({
    timeout: 25000,
  });
});
