import { expect, Locator, Page } from '@playwright/test'
//import { MainPage } from './../sauce-page-objects/MainPage'

export class ItemInfo { 
  // Define selectors
  readonly page: Page
  //readonly productsList: Locator
  //readonly productsNames: Locator
  readonly itemName: Locator
  readonly itemImage: Locator
  readonly itemPrice: Locator
  readonly itemDescription: Locator
  readonly backBtn: Locator
  readonly cartCount: Locator
  arrNames: Array<string>

  // Init selectors using constructor
  constructor(page: Page) {
    this.page = page
    //this.productsList = page.locator(".inventory_item")
    //this.productsNames= page.locator(".inventory_item .inventory_item_name")// Names of products
    this.itemName = page.locator('.inventory_details_name')// item name
    this.itemImage = page.locator("div[class='iinventory_details_img_container']")// item image
    this.itemPrice = page.locator('.inventory_details_price')// item price
    this.itemDescription = page.locator('.inventory_details_desc')// item description
    this.backBtn = page.locator('#back-to-products') // cart btn
    this.cartCount = page.locator('.shopping_cart_badge') // items in the cart
    
  }
  // item info is shown
  async assertItemInfo(name: string) {
    await expect(this.itemName).toBeVisible()
    await expect(await this.page.locator("img[alt='"+name+"']")).toBeVisible()
    await expect(this.itemPrice).toBeVisible()
    await expect(this.itemDescription).toBeVisible()
  }

  // Add to cart from the products list
  async addToCart() {
    let cartCount = await this.getCartCount()
    await this.page.locator("text=Add to cart").click()
    expect(await this.getCartCount()).toBeGreaterThanOrEqual(cartCount+1)
    cartCount = await this.getCartCount()
    await this.page.locator("text=Remove").click()
    expect(await this.getCartCount()).toBeGreaterThanOrEqual(cartCount-1)
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