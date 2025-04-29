import { expect, Locator, Page } from "@playwright/test";

class CartPage {
    checkoutButton: Locator;
    firstNameInput: Locator;
    lastNameInput: Locator;
    postalCodeInput: Locator;
    continueButton: Locator;
    finishButton: Locator;
    successfulCheckoutMessage: Locator;
    removeButton: Locator;
    readonly page: Page;

    constructor(page: Page) {
        this.page = page
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.successfulCheckoutMessage = page.locator(('[data-test="complete-header"]'));
        this.removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    }

    public async clickOnCheckoutButton() {
        await this.checkoutButton.click();
    }

    public async fillBuyerPersonalInfo(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    public async clickOnContinueButton() {
        await this.continueButton.click();
    }

    public async clickOnFinishButton() {
        await this.finishButton.click();
    }

    public async assertSuccessfulCheckout() {
        await expect(this.successfulCheckoutMessage).toBeVisible();
        await expect(this.successfulCheckoutMessage).toHaveText('Thank you for your order!');
    }

    public async removeItem() {
        await this.removeButton.click();
    }

    public async assertItemRemoved() {
        await expect(this.removeButton).not.toBeVisible();
        await expect(this.page.locator('.cart_item')).not.toBeVisible();
    }
}

export default CartPage;