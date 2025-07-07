import { BasePage } from './base.page';

export class HomePage extends BasePage {
  async goToStartShopping() {
    await this.page.getByRole('link', { name: 'Start Shopping »' }).click()
  }

  async goToHomePage() {
    await this.page.getByRole('link', { name: 'Home' }).click()
  }

  async goToContactPage() {
    await this.page.getByRole('link', { name: 'Contact' }).click()
  }

}