import { expect, Locator, Page } from "@playwright/test";


class ProductPage {
    firstItem: Locator;
    cartBadge: Locator
    itemName: Locator;
    addToCartButton: Locator;
    backToProductsButton: Locator;
    sortButton: Locator;
    itemPrice: Locator;

    readonly page: Page;

    constructor(page: Page) {
        this.page = page
        this.firstItem = page.locator('#item_4_img_link');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.itemName = page.locator('[data-test="inventory-item-name"]');
        this.backToProductsButton = page.locator('#back-to-products');
        this.addToCartButton = page.locator('#add-to-cart-sauce-labs-backpack');
        this.sortButton = page.locator('[data-test="product-sort-container"]');
        this.itemPrice = page.locator('.inventory_item_price');

    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/inventory.html', { waitUntil: 'domcontentloaded' });
        await expect(this.firstItem).toBeVisible();
    }

    public async clickOnItem() {
        await this.firstItem.click();
    }

    public async clickOnBackToProductsButton() {
        await this.backToProductsButton.click();
    }

    public async clickOnAddToCartButton() {
        await this.addToCartButton.click();
    }

    public async SortPriceFromLowToHigh() {
        await expect(this.sortButton).toBeVisible();
        await this.sortButton.selectOption({ value: 'lohi' });
    }

    public async SortPriceFromHighToLow() {
        await expect(this.sortButton).toBeVisible();
        await this.sortButton.selectOption({ value: 'hilo' });
    }

    public async GoToCart(){
        await this.cartBadge.click();
    }

    public async assertItemNameVisible() {
        await expect(this.itemName).toBeVisible();
    }

    public async assertUrlInventory() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');

    }

    public async assertCartBadgeCount(expectedCount: string) {
        await expect(this.cartBadge).toBeVisible();
        await expect(this.cartBadge).toHaveText(expectedCount);
    }

    public async assertPriceSortedFromLowToHigh(page: Page) {
        const pricesElements = this.itemPrice.allTextContents();
        const prices = (await pricesElements).map(price => parseFloat(price.replace('$', '')));
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);

    }

    public async assertPriceSortedFromHighToLow(page: Page) {
        const pricesElements = this.itemPrice.allTextContents();
        const prices = (await pricesElements).map(price => parseFloat(price.replace('$', '')));
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);

    }
}

export default ProductPage;