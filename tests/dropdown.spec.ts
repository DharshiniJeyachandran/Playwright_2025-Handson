import {test,expect} from '@playwright/test'

test('dropdown', async ({page}) => {
    await page.goto("https://trytestingthis.netlify.app/");
    await page.locator("#option").selectOption("Option 1");
    await page.waitForTimeout(5000);
})

test('Amazon checkbox', async({page}) =>{
    await page.goto("https://www.amazon.com.be/");
    await page.getByTitle("English").click();
    await page.locator("#sp-cc-rejectall-link").click();
    await page.locator("#searchDropdownBox").selectOption("search-alias=beauty"); // By using value
    await page.locator("#searchDropdownBox").selectOption({label :'Computers'}); //By using label(visible text)
    await page.locator("#searchDropdownBox").selectOption({index:10}); // By using index

    await page.selectOption("#searchDropdownBox", {label: 'Fashion'});
    await page.waitForTimeout(5000);
})

test('Custom dropdown', async ({page}) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.getByPlaceholder("username").fill("Admin");
    await page.getByPlaceholder("password").fill("admin123");
    await page.locator(".oxd-button.oxd-button").click();
    await expect (page.locator(".oxd-topbar-header-breadcrumb")).toContainText("Dashboard");
    await page.locator(".oxd-userdropdown-name").click();
    await page.getByText("Support").click();
    // await page.locator("[role='menuitem']", {hasText: 'support'}).click();
    await expect (page.locator(".oxd-text.oxd-text--p.orangehrm-sub-title")).toContainText("Customer Support");
    await page.locator(".oxd-main-menu-item", {hasText: 'Leave'}).click();
    await page.waitForSelector(".oxd-main-menu-item");
    await expect (page.locator('.oxd-table-filter-title', {hasText:'Leave List'})).toBeVisible();
    await page.locator(".oxd-select-option", {hasText:'Scheduled'}).click();
    await page.waitForSelector(".oxd-select-option") ;
    await expect (page.locator(".oxd-multiselect-chips-selected")).toBeVisible();
    await page.waitForTimeout(5000);

})

test.only('Amazon dropdown', async({page}) =>{
    await page.goto("https://www.amazon.com.be/");
    await page.getByTitle("English").click();
    await page.locator("#sp-cc-rejectall-link").click();
    await page.locator("#twotabsearchtextbox").fill("book");
    await expect (page.locator(".left-pane-results-container")).toBeVisible();
    const noOfAutosuggestions = await page.locator("[id*='sac-suggestion-row']").count();
    console.log(noOfAutosuggestions);

    const suggestionsText = await page.locator("[id*='sac-suggestion-row']").allTextContents();
    console.log(suggestionsText);
    await expect (page.locator("[id*='sac-suggestion-row']",{hasText:'bookmark'}).first()).toBeVisible();
    await (page.locator("[id*='sac-suggestion-row']",{hasText:'bookmark'}).first()).click();
    await page.waitForTimeout(5000);
    await page.close();

})