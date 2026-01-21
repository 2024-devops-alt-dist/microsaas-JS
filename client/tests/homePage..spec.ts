import { test, expect } from "@playwright/test";

test("Home page has title", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Expect the main heading
  const heading = page.getByRole("heading", {
    name: "Surprise ! Des cadeaux bien gérés",
  });
  await expect(heading).toBeVisible();
});
