import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    timeout : 30000, 
    retries : 0,
    testDir: 'tests/sauce',
    use : {
        headless : false,
        viewport : {width:1200, height: 720},
        actionTimeout : 10000,
        ignoreHTTPSErrors : true,
        video : 'off',
        screenshot: 'only-on-failure',
    },
    projects:[
        {
            name: 'Chromium',
            use: { browserName: 'chromium'},
        },
        // {
        //     name: 'Firefox',
        //     use: { browserName: 'firefox'},
        // },
        // {
        //     name: 'webkit',
        //     use: { browserName: 'webkit'},
        // },
    ] 
}
export default config