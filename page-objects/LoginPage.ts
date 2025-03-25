import { expect, Locator, Page } from '@playwright/test';

class LoginPage {
    usernameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    errorLogin: Locator;
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('id=user-name');
        this.passwordInput = page.locator('id=password');
        this.loginButton = page.locator('id=login-button');
        this.errorLogin = page.locator('[data-test="error"]');
    }

    async navigate() {
        await this.page.goto('');
    }

    public async Login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click()
    }

    public async assertValidLogin(page: Page) {
        await expect(page).toHaveURL(/inventory/);
    }

    public async assertInvalidPasswordLogin() {
        await expect(this.errorLogin).toBeVisible();
        await expect(this.errorLogin).toHaveText('Epic sadface: Username and password do not match any user in this service');
    }

    public async assertUsernameRequiredLogin() {
        await expect(this.errorLogin).toBeVisible();
        await expect(this.errorLogin).toHaveText('Epic sadface: Username is required')
    }

    public async assertPasswordRequiredLogin() {
        await expect(this.errorLogin).toBeVisible();
        await expect(this.errorLogin).toHaveText('Epic sadface: Password is required')
    }

}

export default LoginPage;
