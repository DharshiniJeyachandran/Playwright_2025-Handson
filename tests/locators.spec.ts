import {test,expect} from '@playwright/test';

test.skip('locators practice', async ({page}) => {
     await page.goto("https://www.amazon.com.be/");
    // await page.getByRole('searchbox', {name : 'Search Amazon.com.be'}).fill("Laptop");
    // await page.getByRole('button',{name: 'Go', exact : true}).click();
    //  await page.waitForTimeout(5000);
    await page.waitForTimeout(5000);
}) 

test.skip('locators practice 1', async ({page}) => {
    await page.goto("https://www.flipkart.com/");
    await page.getByAltText("Top Offers").click();
    await page.waitForTimeout(5000);
})

test.skip('Locators practice 2', async ({page}) =>{
    await page.goto("https://www.tutorialspoint.com/");
    // await page.getByTitle("Tutorials point").click();
    // await page.waitForTimeout(5000);
})

test('Locators practice 3', async ({page}) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("input[type ='password']").fill("secret_sauce");
    await page.locator(".btn_action").click();
    await page.waitForTimeout(5000);
})