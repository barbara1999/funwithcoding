import { test } from '@playwright/test';
import ProductPage from '../page-objects/ProductPage';
import path from 'path';

test.use({ storageState: path.resolve(__dirname, '../playwright/.auth/user.json') });

let productPage: ProductPage;

test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    productPage.navigate();
});

test('open item', async () => {
    //when
    await productPage.clickOnItem();

    //then
    await productPage.assertItemNameVisible();
});

test('back to Products page', async () => {
    //when
    await productPage.clickOnItem();
    await productPage.clickOnBackToProductsButton();

    //then
    await productPage.assertUrlInventory();
})

test('add item to cart', async () => {
    //when
    await productPage.clickOnAddToCartButton();

    //then
    await productPage.assertCartBadgeCount('1');
})


test('sort prices from low to high', async ({ page }) => {
    //when
    await productPage.sortPriceFromLowToHigh();

    //then
    productPage.assertPriceSortedFromLowToHigh(page);
})

test('sort prices from high to low', async ({ page }) => {
    //when
    await productPage.sortPriceFromHighToLow();

    //then
    productPage.assertPriceSortedFromHighToLow(page);
})



