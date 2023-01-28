import { expect, Locator, Page } from '@playwright/test'
//import { AbstractPage } from './AbstractPage'

export class StartPage { 
  // Define selectors
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator

  // Init selectors using constructor
  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('#user-name')
    this.passwordInput = page.locator('#password')
    this.submitButton = page.locator('#login-button')
    this.errorMessage = page.locator('.error-message-container')
  }

  async visit() {
    await this.page.goto('https://www.saucedemo.com/')
    const logo = await this.page.locator(".bot_column")
    await expect(logo).toBeVisible()
    expect(this.page.locator("#login_button_container")).toBeVisible()
  }

  // Define login page methods
  async login(username: string, password: string) {
    await this.usernameInput.type(username)
    await this.passwordInput.type(password)
    //await this.page.pause()
    await this.submitButton.click()
  }

  async assertErrorMessage() {
    await expect(this.errorMessage).toBeVisible()
  }

  // wait(s) must not be used in production - use wait for event or element
  async wait(time) {
    await this.page.waitForTimeout(time)
  }
}