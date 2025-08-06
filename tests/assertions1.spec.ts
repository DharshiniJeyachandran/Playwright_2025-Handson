import{test,expect} from '@playwright/test'

test('assertions', async ({page}) =>{
    await page.goto("https://trytestingthis.netlify.app/");
    await page.locator("#fname").fill("Test123");
    await page.locator("#lname").fill("Check123");
    await expect.soft (page.locator("#fname")).not.toHaveValue("Test123");

    await page.getByLabel("Female").check();
    await expect.soft (page.getByLabel ("Female")).toBeChecked();
    await page.getByLabel(" Option 1").check();
    await expect.soft(page.getByLabel (" Option 1")).toBeChecked();
} )