import test, { expect } from "@playwright/test";
import ProductPage from "../page-objects/ProductPage";
import CartPage from "../page-objects/CartPage";
import { firstName, lastName, postalCode } from '../utils/checkout_credentials'

let productPage: ProductPage;
let cartPage: CartPage;

test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    productPage.navigate();
});

test('buy an item', async ({ page }) => {
    //given
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
    await productPage.clickOnAddToCartButton();
    await productPage.goToCart();
    
    //when
    await cartPage.removeItem();
    
    //then
    await cartPage.assertItemRemoved();
});

test('verify cart badge count updates', async ({ page }) => {
    //when
    await productPage.clickOnAddToCartButton();
    
    //then
    await productPage.assertCartBadgeCount('1');
    
    //when
    await productPage.clickOnAddToCartButton('sauce-labs-bike-light');
    
    //then
    await productPage.assertCartBadgeCount('2');
});