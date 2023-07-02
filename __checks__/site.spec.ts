import { test, expect } from "@playwright/test";

test("Vercel Site Check", async ({ page }) => {
  const response = await page.goto("https://dad-alpha.vercel.app/");

  await expect(response?.status()).toBeLessThan(400);
  await expect(page).toHaveTitle(
    /Dr Passy Amaraegbu | Living a life of purity, power and prosperity/
  );
});
