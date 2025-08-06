import{test,expect} from '@playwright/test'

test('Launch the browser', async ({page}) => {
    await page.goto("https://www.google.com/") ;
    const titleName = await page.title();
    console.log(titleName)
    expect (titleName).toBe('Google');
})

