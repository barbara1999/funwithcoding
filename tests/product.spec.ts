import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

import ProductPage from '../page-objects/ProductPage';

//test.use({storageState: '../playwright/.auth/user.json'});

import path from 'path';
test.use({ storageState: path.resolve(__dirname, '../playwright/.auth/user.json') });


test('open item',async ({page})=>{  

        //given
       const productPage = new ProductPage(page);
       productPage.navigate();

       //when
        await productPage.clickOnItem();

        //then
        await productPage.assertItemNameVisible();
    
    });


test('back to Products page', async({page})=>{

      //given
      const productPage = new ProductPage(page);
      productPage.navigate();

      //when
       await productPage.clickOnItem();
       await productPage.clickOnBackToProductsButton();

        //then
       await productPage.assertUrlInventory();
  
})

test('add item to chart',async({page})=>{

     //given
     const productPage = new ProductPage(page);
     productPage.navigate();

     //when
     await productPage.clickOnAddToChartButton();

     //then
     await productPage.assertCartBadgeCount('1');

})


