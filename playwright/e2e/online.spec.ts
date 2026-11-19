import { test, expect } from '@playwright/test';

test('webapp deve estar online', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Velô by Papito/);
});
