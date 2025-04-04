import { test } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

import ProductPage from '../page-objects/ProductPage';

//test.use({storageState: '../playwright/.auth/user.json'});

import path from 'path';
test.use({ storageState: path.resolve(__dirname, '../playwright/.auth/user.json') });


test('open item', async ({ page }) => {

    //given
    const productPage = new ProductPage(page);
    productPage.navigate();

    //when
    await productPage.clickOnItem();

    //then
    await productPage.assertItemNameVisible();

});


test('back to Products page', async ({ page }) => {

    //given
    const productPage = new ProductPage(page);
    productPage.navigate();

    //when
    await productPage.clickOnItem();
    await productPage.clickOnBackToProductsButton();

    //then
    await productPage.assertUrlInventory();

})

test('add item to cart', async ({ page }) => {

    //given
    const productPage = new ProductPage(page);
    productPage.navigate();

    //when
    await productPage.clickOnAddToCartButton();

    //then
    await productPage.assertCartBadgeCount('1');

})


test('sort prices from low to high', async ({ page }) => {
    //given
    const productPage = new ProductPage(page);
    productPage.navigate();

    //when
    await productPage.sortPriceFromLowToHigh();

    //then
    productPage.assertPriceSortedFromLowToHigh(page);
})

test('sort prices from high to low', async ({ page }) => {
    //given
    const productPage = new ProductPage(page);
    productPage.navigate();

    //when
    await productPage.sortPriceFromHighToLow();

    //then
    productPage.assertPriceSortedFromHighToLow(page);
})



