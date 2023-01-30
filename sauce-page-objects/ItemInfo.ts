import { expect, Locator, Page } from '@playwright/test'
//import { AbstractPage } from './AbstractPage'

export class ItemInfo { 
  // Define selectors
  readonly page: Page
  readonly productsList: Locator
  readonly productsNames: Locator
  readonly itemName: Locator
  readonly itemImage: Locator
  readonly itemPrice: Locator
  readonly itemDescription: Locator
  readonly cartBtn: Locator
  readonly cartCount: Locator
  arrNames: Array<string>

  // Init selectors using constructor
  constructor(page: Page) {
    this.page = page
    this.productsList = page.locator(".inventory_item")
    this.productsNames= page.locator(".inventory_item .inventory_item_name")// Names of products
    this.itemName = page.locator('.inventory_details_name')// item name
    this.itemImage = page.locator("div[class='iinventory_details_img_container']")// item image
    this.itemPrice = page.locator('.inventory_details_price')// item price
    this.itemDescription = page.locator('.inventory_details_desc')// item description
    this.cartBtn = page.locator('..btn_inventory') // cart btn
    this.cartCount = page.locator('.shopping_cart_badge') // items in the cart
    
  }
  // item info is shown
  async assertItemInfo() {
    await expect(this.itemName).toBeVisible()
    //await expect(this.itemImage).toBeVisible()
    await expect(this.itemPrice).toBeVisible()
    await expect(this.itemDescription).toBeVisible()
  }

  // Add to cart from the products list
  async addToCart() {
    this.arrNames = await this.productsNames.allTextContents()
    
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