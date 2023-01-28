import { expect, Locator, Page } from '@playwright/test'
//import { AbstractPage } from './AbstractPage'

export class MainPage { 
  // Define selectors
  readonly page: Page
  readonly productsList: Locator
  readonly productsNames: Locator
  readonly itemName: Locator
  readonly cartCount: Locator
  arrNames: Array<string>

  // Init selectors using constructor
  constructor(page: Page) {
    this.page = page
    this.productsList = page.locator(".inventory_item")
    this.productsNames= page.locator(".inventory_item .inventory_item_name")// Names of products
    this.itemName = page.locator('.inventory_item_name')// item name
    this.cartCount = page.locator('.shopping_cart_badge')
    
  }
  // products are shown
  async assertProductsList() {
    const count = await this.productsList.count()
    
    //console.log(await this.productsNames.allTextContents())
    await expect(count).toBeGreaterThan(0)
  }

  // Add to cart from the products list
  async addToCartFromList(productName: string) {
    this.arrNames = await this.productsNames.allTextContents()
    for (let i=0; i < await this.productsNames.count(); ++i){
      if(this.arrNames[i] === productName)
          {
              await this.productsList.nth(i).locator("text=Add to cart").click()
              break
          }
          
    }
  }

  async getCartCount() {
    if (await this.cartCount.isVisible()){
      return Number(await this.cartCount.textContent())
    } 
    else return 0;
  }

  // wait(s) must not be used in production - use wait for event or element
  async wait(time) {
    await this.page.waitForTimeout(time)
  }
}