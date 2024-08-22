import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto("http://localhost:3000/booking")

  const fullName = await page.getByLabel("fullName").fill("Aw");

  await expect(fullName).toHaveValue("Aw");
})