import { expect, test } from '@playwright/test';
import dotenv from 'dotenv';
import LoginPage from '../page-objects/LoginPage';

dotenv.config();

test.use({ storageState: { cookies: [], origins: [] } });

test('valid login', async ({ page }) => {
    const username = process.env.VALID_USERNAME as string;
    const password = process.env.VALID_PASSWORD as string;

    //given
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(page).toHaveScreenshot();

    //when
    await loginPage.login(username, password);

    //then
    await expect(page).toHaveScreenshot();
    await loginPage.assertValidLogin(page);
});

test('invalid login', async ({ page }) => {
    const invaliUsername = process.env.INVALID_USERNAME as string;
    const invalidPassword = process.env.INVALID_PASSWORD as string;

    //given
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    //when
    await loginPage.login(invaliUsername, invalidPassword);

    //then
    await expect(page).toHaveScreenshot();
    await loginPage.assertInvalidPasswordLogin();
})

test('missing username', async ({ page }) => {
    const missingUsername = ''
    const validPassword = process.env.VALID_PASSWORD as string;

    //given
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    //when 
    await loginPage.login(missingUsername, validPassword);

    //then
    await expect(page).toHaveScreenshot();
    await loginPage.assertUsernameRequiredLogin();
})

test('missing password', async ({ page }) => {
    const validUsername = process.env.VALID_USERNAME as string;
    const missingPassword = '';

    //given
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    //when 
    await loginPage.login(validUsername, missingPassword);

    //then
    await expect(page).toHaveScreenshot();
    await loginPage.assertPasswordRequiredLogin();
})