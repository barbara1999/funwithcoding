import { test, expect, Page, Browser, chromium } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

import LoginPage from '../page-objects/LoginPage';

test.use({ storageState: { cookies: [], origins: [] } });

test('valid login', async ({ page }) => {

    const username = process.env.VALID_USERNAME as string;
    const password = process.env.VALID_PASSWORD as string;

    //given
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    //when
    await loginPage.Login(username, password);

    //then
    await loginPage.assertValidLogin(page);

});


test('invalid login', async ({ page }) => {
    const invaliUsername = process.env.INVALID_USERNAME as string;
    const invalidPassword = process.env.INVALID_PASSWORD as string;

    //given
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    //when
    await loginPage.Login(invaliUsername, invalidPassword);

    //then
    await loginPage.assertInvalidPasswordLogin();
})


test('missing username', async ({ page }) => {
    const missingUsername = ''
    const validPassword = process.env.VALID_PASSWORD as string;

    //given
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    //when 
    await loginPage.Login(missingUsername, validPassword);

    //then
    await loginPage.assertUsernameRequiredLogin();
})


test('missing password', async ({ page }) => {
    const validUsername = process.env.VALID_USERNAME as string;
    const missingPassword = '';

    //given
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    //when 
    await loginPage.Login(validUsername, missingPassword);

    //then
    await loginPage.assertPasswordRequiredLogin();
})