import {test,expect} from '@playwright/test'

test('assertions', async ({page}) =>{
    await page.goto("https://www.saucedemo.com/");
    await expect (page).toHaveTitle("Swag Labs");
    await expect(page).toHaveURL("https://www.saucedemo.com/");
    const logo = page.locator(".login_logo");
    await expect (logo).toBeVisible();
    const userName =page.locator("#user-name");
    await expect(userName).toBeEnabled();
    const password = await page.getByPlaceholder("Password");
    await expect(password).toBeEnabled();
    const acceptedUsername = page.locator(".login_credentials");
    await expect(acceptedUsername).toContainText("Accepted usernames are:");
    const acceptedPassword = page.locator(".login_password");
    await expect(acceptedPassword).toContainText("Password for all users:");
    const attributeValue = page.locator("#user-name");
    await expect(attributeValue).toHaveAttribute('placeholder','Username');
})