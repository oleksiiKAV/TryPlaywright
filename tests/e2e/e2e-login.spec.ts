import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Login / Logout Flow', () => {
  let loginPage: LoginPage
  let homePage: HomePage

  // Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)

    await homePage.visit()
  })

  // Negative Scenario
  test('Negative Scenario for login', async ({ page }) => {
    await homePage.clickOnSignIn()
    await loginPage.loginInv('invalid username', 'invalid password')
    await loginPage.wait(3000) // use wait from AbstactPage
    await loginPage.assertErrorMessage()
  })

  // Positive Scenario + Logout
  test('Positive Scenario for login + logout', async ({ page }) => {
    await homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
    //next step - fix for working 
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    const accountSummaryTab = await page.locator('#account_summary_tab')
    await expect(accountSummaryTab).toBeVisible()

    await page.goto('http://zero.webappsecurity.com/logout.html')
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})
