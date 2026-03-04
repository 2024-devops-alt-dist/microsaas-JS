import { test, expect } from "@playwright/test";

test("Home page has title", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page.locator("h1")).toHaveText(
    "Surprise ! Des cadeaux bien gérés",
    { timeout: 7000 },
  );
});
