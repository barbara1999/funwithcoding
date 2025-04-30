import test, { expect } from "@playwright/test";
import ProductPage from "../page-objects/ProductPage";
import CartPage from "../page-objects/CartPage";
import { firstName, lastName, postalCode } from '../utils/checkout_credentials'

test('buy an item', async ({ page }) => {
    //given
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    productPage.navigate();
    await productPage.clickOnAddToCartButton();
    await productPage.goToCart();
    await expect(page).toHaveScreenshot();

    //when
    await cartPage.clickOnCheckoutButton();
    await cartPage.fillBuyerPersonalInfo(firstName, lastName, postalCode);
    await cartPage.clickOnContinueButton();
    await cartPage.clickOnFinishButton();

    //then
    await cartPage.assertSuccessfulCheckout();
})

test('remove item from cart', async ({ page }) => {
    //given
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    productPage.navigate();
    await productPage.clickOnAddToCartButton('sauce-labs-backpack');
    await productPage.goToCart();
    
    //when
    await cartPage.removeItem();
    
    //then
    await cartPage.assertItemRemoved();
});

test('verify cart badge count updates', async ({ page }) => {
    //given
    const productPage = new ProductPage(page);
    productPage.navigate();
    
    //when
    await productPage.clickOnAddToCartButton('sauce-labs-backpack');
    
    //then
    await productPage.assertCartBadgeCount('1');
    
    //when
    await productPage.clickOnAddToCartButton('sauce-labs-bike-light');
    
    //then
    await productPage.assertCartBadgeCount('2');
});