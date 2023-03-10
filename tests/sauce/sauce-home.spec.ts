// import expect from playwright lib

import {test, expect} from  '@playwright/test'
import {StartPage} from '../../sauce-page-objects/StartPage'
import {MainPage} from '../../sauce-page-objects/MainPage'
//let page
test.describe("Sauce start page", () => {
    let startPage: StartPage
    let mainPage: MainPage

    test.beforeEach( async({page})=>
    {
        startPage = new StartPage(page)
        mainPage = new MainPage(page)
        await startPage.visit()
    })

    // When I sign in as a registered user I want to be able to view the products list with products details
    test('Login as a registered user and assert items info', async ({page})=>{
        await startPage.login('standard_user','secret_sauce')  
        await mainPage.assertProductsList()
        //await page.pause()
        await mainPage.assertItemInfo()

        //const titles= await page.locator(".inventory_item .inventory_item_name").allTextContents();
    })
    // When I sign in as a registered user I want to be able to add a product from the products list to the cart
    test('Add to cart', async ({page})=>{
        await startPage.login('standard_user','secret_sauce')  
        await mainPage.assertProductsList()
        await mainPage.addToCartFromList('Sauce Labs Bolt T-Shirt')
        await mainPage.addToCartFromList('Sauce Labs Backpack')
        console.log('cart count is:' + await mainPage.getCartCount())
        expect(await mainPage.getCartCount()).toBeGreaterThan(0)
    })
})
// //open next window, get info and paste to the parrent window
// test.only('Child window', async({browser}) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     const userName = page.locator('#username');
//     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//     const documentLink = page.locator("[href*='documents-request']");
//     const [newPage] = await Promise.all(
//         [   context.waitForEvent('page'),
//             documentLink.click(),
//         ]
//     )
//     const text = await newPage.locator(".red").textContent();
//     console.log(text); //Please email us at mentor@rahulshettyacademy.com with below template to receive response 
//     const arrayText = text.split("@");
//     const domain = arrayText[1].split(" ")[0]; 
//     console.log(domain);//rahulshettyacademy.com
    
//     // domain from newPage put to the parrent page
//     await page.locator("#username").type(domain);
//     await page.pause();
//     console.log(await userName.textContent());


// });