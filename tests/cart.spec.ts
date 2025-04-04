import test from "@playwright/test";
import ProductPage from "../page-objects/ProductPage";
import CartPage from "../page-objects/CartPage";

import { firstName, lastName, postalCode } from '../utils/checkout_credentials'


test('buy an item', async ({ page }) => {

    //given
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    productPage.navigate();
    await productPage.clickOnAddToCartButton();
    await productPage.GoToCart();

    //when
    await cartPage.clickOnCheckoutButton();
    await cartPage.fillBuyerPersonalInfo(firstName, lastName, postalCode);
    await cartPage.clickOnContinueButton();
    await cartPage.clickOnFinishButton();

    //then
    await cartPage.assertSuccessfulCheckout();


})