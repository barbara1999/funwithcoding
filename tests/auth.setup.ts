import { test as setup } from '@playwright/test';
import dotenv from 'dotenv';
import LoginPage from '../page-objects/LoginPage';
import path from 'path';

dotenv.config();

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    const username = process.env.VALID_USERNAME as string;
    const password = process.env.VALID_PASSWORD as string;

    //given
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    //when
    await loginPage.login(username, password);

    //then
    await loginPage.assertValidLogin(page);

    //Save the storage state
    await page.context().storageState({ path: authFile });
});