import { Page } from '@playwright/test'

export class AbstractPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }
  // wait(s) must not be used in production - use wait for event or element
  async wait(time) {
    await this.page.waitForTimeout(time)
  }
}
