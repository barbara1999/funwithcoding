import { expect, Locator, Page } from "@playwright/test";


class ProductPage{
    firstItem: Locator;
    cartBadge: Locator
    itemName: Locator;
    addToChartButton: Locator;
    backToProductsButton: Locator;

    readonly page: Page;

    constructor(page:Page){
        this.page = page
        this.firstItem= page.locator('#item_4_img_link');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.itemName = page.locator('[data-test="inventory-item-name"]');
        this.backToProductsButton= page.locator('#back-to-products');
        this.addToChartButton = page.locator('#add-to-cart-sauce-labs-backpack');
    }

    async navigate(){
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }
    
    public async clickOnItem(){
        await expect(this.firstItem).toBeVisible();
        await this.firstItem.click();
    }

    public async clickOnBackToProductsButton(){
        await expect(this.backToProductsButton).toBeVisible();
        await this.backToProductsButton.click();
    }

    public async clickOnAddToChartButton(){
        await expect(this.addToChartButton).toBeVisible();
        await this.addToChartButton.click();
    }

    public async assertItemNameVisible(){
        await expect(this.itemName).toBeVisible();
    }

    public async assertUrlInventory(){
        await this.page.goto('https://www.saucedemo.com/inventory.html');
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');

    }

    public async assertCartBadgeCount(expectedCound: string){
        await expect(this.cartBadge).toBeVisible();
        await expect(this.cartBadge).toHaveText(expectedCound);
    }
}

export default ProductPage;