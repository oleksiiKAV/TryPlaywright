import { expect,Locator, Page } from "@playwright/test";

export class HomePage {
        // Define selectors
        readonly page: Page
        readonly searchField: Locator
        readonly searchResult: Locator      
        // Init selectors using constructor
        constructor(page: Page) {
          this.page = page
          this.searchField = page.locator("[name='search']")
          this.searchResult = page.locator('.goods-tile__heading');
        }
      
        // visit home page
        async visit(){
            await this.page.goto('https://rozetka.com.ua/')
            console.log(await this.page.title())
        }
        // type text and wait results
        async typeInSearchField(searchStr: string){
            await this.searchField.type(searchStr)
            await this.page.keyboard.press('Enter')
            await new Promise(resolve => setTimeout(resolve, 2000))//delay for finding
        }
        // assert products are founded
        async assertSearchProducts(){
            if (await this.searchResult.count() >> 0){
              return true
            }
            return false

        }

        // find one in the finding list
        async findByEnteredText(findProduct: string){
          for (let i=0; i<await this.searchResult.count(); ++i){
            const name = await this.searchResult.nth(i).locator('.goods-tile__title').textContent();
            console.log(name);
            if (name!.includes(findProduct)){ 
                //The non-null assertion operator (!.), also called the exclamation mark operator, 
                //indicates to the compiler that we are sure that the value we want to access is not null or undefined
                await this.searchResult.nth(i).click();
                return true;
                break;
            }
          }
          return false;
        }


        
      }