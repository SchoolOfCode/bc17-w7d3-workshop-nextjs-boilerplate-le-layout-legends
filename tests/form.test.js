import { test, expect } from '@playwright/test';

test('check if validation works', async ({ page }) => {
  await page.goto('http://localhost:3000/booking');
  const inputElement = await page.locator('label:has-text("Full Name")').locator('input');

  inputElement.fill("Aw")
  expect(await inputElement.inputValue()).toEqual('Aw');
});