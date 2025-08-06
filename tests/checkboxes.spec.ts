import {test,expect} from '@playwright/test'


test('checkboxes', async ({page})=>{
await page.goto("https://trytestingthis.netlify.app/");
await expect (page.getByLabel(" Option 1")).not.toBeChecked();
await expect (page.getByLabel(" Option 2")).not.toBeChecked();
await expect (page.getByLabel(" Option 3")).not.toBeChecked();

await (page.getByLabel(" Option 1")).check();
})

test.only('Amazon checkbox', async({page}) =>{
    await page.goto("https://www.amazon.com.be/");
    await page.getByTitle("English").click();
    await page.locator("#sp-cc-rejectall-link").click();
    await page.getByPlaceholder("Search Amazon.com.be").fill("Books");
    await page.locator("#nav-search-submit-button").click();
    await page.waitForSelector("h2.a-size-base span.a-color-state");
    await expect (page.locator("h2.a-size-base span.a-color-state")).toContainText("Books");
    await page.locator("//span[text()='Hardcover']").click();
    
    const elements = await page.locator("div[data-cy='price-recipe'].a.a-text-bold").all();

    for(const element of elements)
    {
        await expect (element).toContainText("Hardcover");
    }
})