import { BasePage } from './base.page';

export class ShopPage extends BasePage {
  getBuyButtonLocator(productId: number) {
    return this.page.locator(`#product-${productId}`).getByRole('link', { name: 'Buy' });
  }
}