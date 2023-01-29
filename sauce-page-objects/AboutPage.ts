import { expect, Locator, Page } from '@playwright/test'
// class for menu objects on all application pages

export class AboutPage {
  readonly page: Page
  readonly logo: Locator
  readonly menuBthCls: Locator
  readonly allItems: Locator
  readonly about: Locator
  readonly logOut: Locator
  readonly resetAppState: Locator
  
  constructor(page: Page) {
    this.page = page
    // this.menuBthOpen = page.locator('.bm-burger-button')
    // this.menuBthCls = page.locator('.bm-cross-button')
    // this.allItems = page.locator('#inventory_sidebar_link')
    // this.about = page.locator('#about_sidebar_link')
    // this.logOut = page.locator('#logout_sidebar_link')
    // this.resetAppState = page.locator('#reset_sidebar_link')
  }

  async assertAaboutIsOpened() {
    expect(await this.page).toHaveURL('https://saucelabs.com/')
  }
  
}