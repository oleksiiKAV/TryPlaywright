// import expect from playwright lib

import {test, expect} from  '@playwright/test'
import {HomePage} from '../page-objects/HomePage_roz'
//let page
test.describe.parallel.only("Try testing", () => {
let homePage: HomePage
test.beforeEach( async({page})=>
{
    //page = await browser.newPage();
    homePage = new HomePage(page)
    await homePage.visit();
    //await page.pause()
    
    expect(homePage.page).toHaveURL("https://rozetka.com.ua/")
})

test('Rozetka Playwrihgt test', async ()=>{
        
    await homePage.typeInSearchField(" dfgdfgfgfd ")//iPhone 14
      
    //await expect(homePage.searchField).toBeEmpty()
    
    //const searchResult = await page.locator('.goods-tile__inner');
    // const searchResult = await homePage.page.locator('.goods-tile__heading');
    const productText = " asdfdf "//"MQ293RX/A" // will be read from a test data file
    // console.log("23423423  " + await searchResult.count());
    if (await homePage.assertSearchProducts() === true){
        const res=await homePage.findByEnteredText(productText)
        if (res === true){
            const h1Header = await homePage.page.locator('.product__title')
            await expect(h1Header).toBeVisible()
            await expect(h1Header).toContainText(productText)
        }
        else console.log("Product does'not find in the searching list")
    }
    else console.log("Product does'not find in Rosetka")
    
});
})

// test('UI controls', async ({page})=>{
//     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//     const userName = page.locator('#username');
//     const signIn = page.locator('#signInBtn');    
//     const dropdown = page.locator("select.form-control");
//     await dropdown.selectOption("consult");
//     //pause execution and run PlayWright inspector
//     //await page.pause();
//     // next for radioBTn
//     await page.locator(".radiotextsty").last().click();
//     await page.locator("#okayBtn").click();
    
//     //assertion
//     console.log(await page.locator(".radiotextsty").last().isChecked());
//     await expect(page.locator(".radiotextsty").last()).toBeChecked();

//     // next for checkBox
//     await page.locator("#terms").click();
//     await expect(page.locator("#terms")).toBeChecked();
//     await page.locator("#terms").uncheck();
//     expect(await page.locator("#terms").isChecked()).toBeFalsy();

//     // await in the begin USED ONLY FOR ACTION!!!!

//     // attribute
//     //<a href="https://rahulshettyacademy.com/documents-request" class="blinkingText" 
//     //target="_blank" xpath="1">Free Access to InterviewQues/ResumeAssistance/Material</a>
//     const documentLink = page.locator("[href*='documents-request']");
//     await expect(documentLink).toHaveAttribute('class', 'blinkingText');
//     // try to cath page in the next window in browser

// });
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