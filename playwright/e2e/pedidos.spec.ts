import { test, expect } from '@playwright/test';
import { gerarCodigoAleatorio } from '../support/helpers';


// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', async () => {

  test.beforeEach(async ({ page }) => {

    //Arrange
    await page.goto('http://localhost:5173/');
    await page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' }).click();

    // Act
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Data test
    const order = 'VLO-40S57C';

    // Act
    await page.getByTestId('search-order-id').fill(order);
    await page.getByTestId('search-order-button').click();

    // Assert
    await expect(page.getByText(order)).toBeVisible();
    await expect(page.getByText('APROVADO')).toBeVisible();

    await expect(page.locator(`//p[text()="Pedido"]/..//p[text()="${order}"]`)).toBeVisible({ timeout: 30_000 });

    const containerPedido = page.getByRole('paragraph')
      .filter({ hasText: /^Pedido$/ })
      .locator('..')
    await expect(containerPedido).toContainText(order, { timeout: 30_000 })

    await expect(page.locator('//div[@class="flex items-center justify-between"]/..//div[text()="APROVADO"]')).toBeVisible();



    //await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 30_000});
    //await expect(page.getByTestId('order-result-id')).toContainText('VLO-40S57C');

    //await expect(page.getByTestId('order-result-status')).toBeVisible();
    //await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');

  });

  test('deve exibir  mensagem quando um pedido não é encontrado', async ({ page }) => {

    // Data test
    const order = gerarCodigoAleatorio();


    // Act
    await page.getByTestId('search-order-id').fill(order);
    await page.getByTestId('search-order-button').click();

    // Assert
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `);

    const message = page.locator('p', { hasText: 'Verifique o número do pedido e tente novamente' });
    await expect(message).toBeVisible();

  });

});

