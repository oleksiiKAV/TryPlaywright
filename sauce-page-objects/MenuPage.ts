import { Locator, Page } from '@playwright/test'
// class for menu objects on all application pages

export class MenuPage {
  readonly page: Page
  readonly menuBthOpen: Locator
  readonly menuBthCls: Locator
  readonly allItems: Locator
  readonly about: Locator
  readonly logOut: Locator
  readonly resetAppState: Locator
  
  constructor(page: Page) {
    this.page = page
    this.menuBthOpen = page.locator('.bm-burger-button')
    this.menuBthCls = page.locator('.bm-cross-button')
    this.allItems = page.locator('#inventory_sidebar_link')
    this.about = page.locator('#about_sidebar_link')
    this.logOut = page.locator('#logout_sidebar_link')
    this.resetAppState = page.locator('#reset_sidebar_link')
  }

  async menuOpen() {
    await this.menuBthOpen.click()
  }
  async menuCls() {
    await this.menuBthCls.click()
  }
  async clickOnTab(menuName) {
    switch (menuName) {
      case 'ALL ITEMS':
        await this.allItems.click()
        break
      case 'About':
        await this.about.click()
        break
      case 'Logout':
        await this.logOut.click()
        break
      case 'Reset App State':
        await this.resetAppState.click()
        break
      default:
        throw new Error(`This ${menuName} menu tab does not exist..`)
    }
  }
}