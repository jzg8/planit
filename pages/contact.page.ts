import { BasePage } from './base.page';

export class ContactPage extends BasePage {
  async clickSubmit() {
    await this.page.getByRole('link', { name: 'Submit' }).click();
  }
  getAllErrorMessages() {
    return this.page.locator('span.help-inline');
  }
  async fillForename(forename: string) {
    await this.page.getByRole('textbox', { name: 'Forename *' }).fill(forename);
  }
  async fillEmail(email: string) {
    await this.page.getByRole('textbox', { name: 'Email *' }).fill(email);
  }
  async fillMessage(message: string) {
    await this.page.getByRole('textbox', { name: 'Message *' }).fill(message);
  }
  
}
