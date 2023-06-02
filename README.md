# TryPlaywright
ts in Playwright
1) clone the project
2) check/install node.js
3) npm install
4) npm run tests:e2e

.github/workflows
1)runs-on is used to indicate on which platform the job has to run
2)actions/checkout@v3 checkouts the code
3)actions/setup-node@v3 setups the node version for the job
4)Install dependencies installs all the dependencies in the node_modules
5)Install Playwright Browsers installs the browsers for Playwright
6)Run Playwright tests runs the e2e tests
7)actions/upload-artifact@v3 uploads the test's results in the GitHub Artifact
