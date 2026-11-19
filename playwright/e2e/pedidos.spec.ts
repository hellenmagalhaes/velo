import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' }).click();

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
  await page.getByTestId('search-order-id').fill('VLO-40S57C');
  await page.getByTestId('search-order-button').click(); 

  await expect(page.getByTestId('order-result-id')).toContainText('VLO-40S57C');
  await expect(page.getByTestId('order-result-id')).toBeVisible();

  await expect(page.getByTestId('order-result-status')).toBeVisible();
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');


});