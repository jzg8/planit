import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { baseURL } from '../consts/baseURL';
import { ContactPage } from '../pages/contact.page';
import { ShopPage } from '../pages/shop.page';
import { forename, email, message } from '../consts/userConsts';


test.beforeEach(async ({ page }) => {
  const home = new HomePage(page)
  await home.goto(baseURL);
});

test.describe('Test Case 1', () => {

  test('shows all required error fields', async ({ page }) => {
    const home = new HomePage(page)
    const contact = new ContactPage(page);


    await expect(page).toHaveTitle(/^Jupiter Toys$/);
    await home.goToContactPage()
    

    await contact.clickSubmit();

    const errors = contact.getAllErrorMessages();

    await expect(errors).toHaveCount(3);

    await expect(errors.nth(0)).toHaveText(/^Forename is required$/);
    await expect(errors.nth(1)).toHaveText(/^Email is required$/);
    await expect(errors.nth(2)).toHaveText(/^Message is required$/);

    await contact.fillForename(forename);
    await contact.fillEmail(email);
    await contact.fillMessage(message);

    await expect(contact.getAllErrorMessages()).toHaveCount(0);

  });
  });
  test.describe('Test Case 2', () => {
  test('submits form with valid data', async ({ page }) => {
    for (let run = 1; run <= 5; run++) {
      console.log(`Running test case ${run} / 5`)

    const home = new HomePage(page)
    const contact = new ContactPage(page);


    await home.goToContactPage()


    await contact.fillForename(forename);
    await contact.fillEmail(email);
    await contact.fillMessage(message);

    await contact.clickSubmit();

    await expect(contact.page.getByText(`Thanks ${forename}, we appreciate your feedback.`)).toBeVisible({ timeout: 15000 });
    
    await home.goToHomePage()

    }
  })
})

test.describe('Test Case 3', () => {
  test('calculates correct cart totals and subtotals for multiple products', async ({ page }) => {
    const home = new HomePage(page)
    const shop = new ShopPage(page)

    await home.goToStartShopping()
    await expect(home.page.getByText('Stuffed Frog')).toBeVisible();

    const stuffedFrogPriceText = await page.locator('#product-2').getByText('$').textContent();
    const fluffyBunnyPriceText = await page.locator('#product-4').getByText('$').textContent();
    const valentineBearPriceText = await page.locator('#product-7').getByText('$').textContent();

    const stuffedFrogPrice = parseFloat(stuffedFrogPriceText.replace('$', ''));
    let stuffedFrogSubtotal = `$${(stuffedFrogPrice * 2)}`;

  

    const fluffyBunnyPrice = parseFloat(fluffyBunnyPriceText.replace('$', ''));
    let fluffyBunnySubtotal = `$${(fluffyBunnyPrice * 5)}`;
    
    const valentineBearPrice = parseFloat(valentineBearPriceText.replace('$', ''));
    let valentineBearSubtotal = `$${(valentineBearPrice * 3)}`;

    async function buyProductNTimes(shop, productId, times) {
      for (let i = 0; i < times; i++) {
        await shop.getBuyButtonLocator(productId).click();
      }
    }

    await buyProductNTimes(shop, 2, 2);
    await buyProductNTimes(shop, 4, 5);
    await buyProductNTimes(shop, 7, 3);
    

    await shop.page.getByText('Cart').click();

    await expect(shop.page.getByText('Cart')).toBeVisible();

    await shop.page.getByText('Cart').click();
    
    await expect(shop.page.getByText('There are 10 items in your cart')).toBeVisible();

    await expect(shop.page.getByRole('row', { name: `Stuffed Frog ${stuffedFrogPriceText} 2 ${stuffedFrogSubtotal}` })).toBeVisible();  
    await expect(shop.page.getByRole('row', { name: `Fluffy Bunny ${fluffyBunnyPriceText} 5 ${fluffyBunnySubtotal}` })).toBeVisible();
    await expect(shop.page.getByRole('row', { name: `Valentine Bear ${valentineBearPriceText} 3 ${valentineBearSubtotal}` })).toBeVisible();

    const total = (stuffedFrogPrice * 2) + (fluffyBunnyPrice * 5) + (valentineBearPrice * 3)

    await expect(shop.page.getByText(`Total: ${total}`)).toBeVisible();


  });

});

