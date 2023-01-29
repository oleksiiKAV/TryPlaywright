// import expect from playwright lib

import {test, expect} from  '@playwright/test'
import {StartPage} from '../../sauce-page-objects/StartPage'
import {MainPage} from '../../sauce-page-objects/MainPage'
import {MenuPage} from '../../sauce-page-objects/MenuPage'
import {AboutPage} from '../../sauce-page-objects/AboutPage'
//let page
test.describe("Menu navigation page", () => {
    let startPage: StartPage
    let mainPage: MainPage
    let menuPage: MenuPage
    let aboutPage: AboutPage

    test.beforeEach( async({page})=>
    {
        startPage = new StartPage(page)
        mainPage = new MainPage(page)
        menuPage = new MenuPage(page)
        aboutPage = new AboutPage(page)
        await startPage.visit()
    })

    // When I sign in as a registered user I want to be able to open navigation menu
    test('Open navigation menu', async ({page})=>{
        await startPage.login('standard_user','secret_sauce')  
        expect(await menuPage.menuBthOpen.isVisible()).toBeTruthy()
        await menuPage.menuOpen()
        expect(await menuPage.about).toBeVisible()        
    })

    // When I sign in as a registered user I want to open the products list via navigation menu
    test('Go to All Items', async ({page})=>{
        await startPage.login('standard_user','secret_sauce')  
        await mainPage.cartBtn.click()
        await menuPage.menuOpen()
        await menuPage.clickOnTab('ALL ITEMS')
        await mainPage.assertProductsList()
    })
    // When I sign in as a registered user I want to LOGOUT via navigation menu
    test('LOGOUT', async ({page})=>{
        await startPage.login('standard_user','secret_sauce')  
        await mainPage.cartBtn.click()
        await menuPage.menuOpen()
        await menuPage.clickOnTab('Logout')
        expect(await startPage.usernameInput).toBeVisible()
    })
    // When I sign in as a registered user I want to Reset App State via navigation menu
    test('Rest App State', async ({page})=>{
        await startPage.login('standard_user','secret_sauce')  
        await mainPage.addToCartFromList('Sauce Labs Backpack')
        expect(await mainPage.getCartCount()).toBeGreaterThan(0)
        await mainPage.cartBtn.click()
        await menuPage.menuOpen()
        await menuPage.clickOnTab('Reset App State')
        expect(await mainPage.getCartCount()).toBeLessThan(1)
    })
    // When I sign in as a registered user I want go to About url
    test('About', async ({page})=>{
        await startPage.login('standard_user','secret_sauce')  
        await mainPage.cartBtn.click()
        await menuPage.menuOpen()
        await menuPage.clickOnTab('About')
        await aboutPage.assertAaboutIsOpened() 
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