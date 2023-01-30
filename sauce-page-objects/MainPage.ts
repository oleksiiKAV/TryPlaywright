import { expect, Locator, Page } from '@playwright/test'
//import { AbstractPage } from './AbstractPage'

export class MainPage { 
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
    this.itemName = page.locator('.inventory_item_name')// item name
    this.itemImage = page.locator("div[class='inventory_item_img']")// item image
    this.itemPrice = page.locator('.inventory_item_price')// item price
    this.itemDescription = page.locator('.inventory_item_desc')// item description
    this.cartBtn = page.locator('#shopping_cart_container') // cart btn
    this.cartCount = page.locator('.shopping_cart_badge') // items in the cart
    
  }

 async itemClick(item) {
  await this.productsList.nth(item).locator('.inventory_item_name').click()
 }

  // products are shown
  async assertProductsList() {
    const count = await this.productsList.count()
    
    //console.log(await this.productsNames.allTextContents())
    await expect(count).toBeGreaterThan(0)
  }
  // products are shown
  async assertItemInfo() {
    const count = await this.productsList.count()
    // expect(await this.productsList.nth(2).locator(".inventory_item_name")).toBeVisible() 
    for (let index = 0; index < count; index++) {
      expect(await this.productsList.nth(index).locator(".inventory_item_name")).toBeVisible()
      //console.log(await this.productsList.nth(index).locator(".inventory_item_name").textContent())

      expect(await this.productsList.nth(index).locator('.inventory_item_price')).toBeVisible()
      //console.log(await this.productsList.nth(index).locator('.inventory_item_price').textContent())

      expect(await this.productsList.nth(index).locator('.inventory_item_desc')).toBeVisible()
      //console.log(await this.productsList.nth(index).locator('.inventory_item_desc').textContent())

      expect(await this.productsList.nth(index).locator("div[class='inventory_item_img']")).toBeVisible()
      

    //   expect(await this.productsList.nth(index).locator(".inventory_item_img")).toBeVisible() 
    //   // expect(this.itemName).toBeVisible()
      // expect(this.itemPrice).toBeVisible()
      // expect(this.itemDescription).toBeVisible()
      // //consolentents(.toBeVisible())
    }
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