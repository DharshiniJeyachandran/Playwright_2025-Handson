import { PACKAGE_ROOT_URL } from '@angular/core'
import {test,expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200')
      await page.getByText('Forms').click()
      await page.getByText('Form Layouts').click()
})

test.describe.only ('suite1', ()=>{
    test.beforeEach (async({page}) => {
        await page.getByText('charts').click()
    })

    test('the first test',async({page})=>{
        await page.getByText('Form Layouts').click()
    })

    test('navigate to datepicker page', async({page})=> {
        await page.getByText('Datepicker').click()
    })
})

test.describe('suite1',()=> {
       test.beforeEach (async({page}) => {
        await page.getByText('Forms').click()
       })

test('the first test1', async ({page}) => {
    await page.getByText('Form Layouts').click()
})
})

test('navigate to date picker1',async({page})=>{
    await page.getByText('Datepicker').click()
})

test('Locator syntax rules', async({page}) =>{
    //By tag name
    await page.locator('input').first().click()

    //By ID
    page.locator('#inputEmail')

    //By class value
    page.locator('.shape-rectangle')

    //By attribute 
    page.locator('[placeholder="Email"]')

    //By class value (full-entire)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"][nbput]')

    //By Xpath (Not recommended)
    page.locator('//*[ID="inputEmail"]')

    //By partial match
    page.locator(':text("Using")')

    //By exact match
    page.locator(':text-is("Using the Grid")')

})

test('User facing locators',async({page}) => {
    await page.goto('http://localhost:4200')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

  await page.getByRole('textbox', {name: "Email"}).first().click()
  await page.getByRole('button', {name: "Sign in"}).first().click()

  await page.getByLabel('Email').first().click()

  await page.getByPlaceholder('Jane Doe').click()

  await page.getByText("Using the Grid").click()

  await page.getByTestId('SignIn').click()  

  //await page.getByTitle('IOT Dashboard').click()

})

test('locating child elements', async({page}) => {
   await page.goto('http://localhost:4200/pages/forms/layouts')
   await page.locator('nb-card nb-radio :text-is("Option 1")').click()
   await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
   await page.getByRole('button', { name: "Sign In"  }).first().click();
   await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('locating parent elements', async ({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).first().click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).first().click()
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).first().click()
    await page.locator('nb-card').filter ({has : page.locator('.status-danger')}).getByRole('textbox',{name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign In"})
      .getByRole('textbox', {name: "Email"}).first().click()
      await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox',{name: "Email"}).click()
})

test('Resusing the locators', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox',{name: "Password"}).fill('welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

test('extracting values', async ({page}) => {
    // single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect  (allRadioButtonsLabels).toContain("Option 1")

    //input value
    const emailField = basicForm.getByRole('textbox',{ name : "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('assertions', async ({page}) => {
const basicFormButton = page.locator('nb-card').filter({hasText: "Basic Form"}).locator('button')

//General assertions
const value = 5
expect(value).toEqual(5)

const text = await basicFormButton.textContent()
expect(text).toEqual("Submit")

// Soft assertion
await expect(basicFormButton).toHaveText("Submit")
await basicFormButton.click()

})