import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage { // get all from AbstgractPage
  // Define selectors
  // readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator

  // Init selectors using constructor
  constructor(page: Page) {
    // this.page = page
    super(page) // create from AbstractPage
    this.usernameInput = page.locator('#user_login')
    this.passwordInput = page.locator('#user_password')
    this.submitButton = page.locator('text=Sign in')
    this.errorMessage = page.locator('.alert-error')
  }

  // Define login page methods
  async login(username: string, password: string) {
    await this.usernameInput.type(username)
    await this.passwordInput.type(password)
    await this.submitButton.click()
    await this.page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    
  }

  async loginInv(username: string, password: string) {
    await this.usernameInput.type(username)
    await this.passwordInput.type(password)
    await this.submitButton.click()
    
    
  }

  async assertErrorMessage() {
    await expect(this.errorMessage).toContainText(
      'Login and/or password are wrong'
    )
  }
}
