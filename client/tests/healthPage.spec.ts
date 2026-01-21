import { test, expect } from "@playwright/test";

test("Health page connection works", async ({ page }) => {
  await page.goto("http://localhost:5173/healthPage");

  // Click the button to test connection
  await page.click("text=Tester");

  // Expect to see success message
  const successMessage = page.locator("text=Succès !");
  await expect(successMessage).toBeVisible();
});
