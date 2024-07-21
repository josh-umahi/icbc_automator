import puppeteer from 'puppeteer';
import path from 'path';
import dotenv from 'dotenv';
import { getCurrentTimestamp } from './utils';

dotenv.config();

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(
    'https://onlinebusiness.icbc.com/webdeas-ui/login;type=driver'
  );

  await page.setViewport({ width: 1080, height: 1000 });

  const driverNameSelector = '[aria-label="driver-name"]';
  const licenceNumberSelector = '[aria-label="driver-licence"]';
  const icbcKeywordSelector = '[aria-label="keyword"]';
  const checkboxSelector = '#mat-checkbox-1-input';
  const signInButtonSelector = 'button[type="submit"].primary';

  await page.waitForSelector(driverNameSelector);
  await page.waitForSelector(licenceNumberSelector);
  await page.waitForSelector(icbcKeywordSelector);
  await page.waitForSelector(checkboxSelector);
  await page.waitForSelector(signInButtonSelector);

  await page.type(driverNameSelector, process.env.DRIVER_NAME!);

  await page.type(licenceNumberSelector, process.env.LICENCE_NUMBER!);
  await page.type(icbcKeywordSelector, process.env.ICBC_KEYWORD!);
  await page.click(checkboxSelector);
  await page.click(signInButtonSelector);

  const rescheduleButtonSelector = 'button.primary.raised-button';
  await page.waitForSelector(rescheduleButtonSelector);
  await page.click(rescheduleButtonSelector);

  const yesRescheduleButtonSelector = 'button.primary.ng-star-inserted';
  await page.waitForSelector(yesRescheduleButtonSelector);
  await page.click(yesRescheduleButtonSelector);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const byOfficeSelector =
    '#search-location > mat-tab-header > div.mat-tab-label-container > div > div > div:nth-child(2)';
  await page.waitForSelector(byOfficeSelector);
  await page.click(byOfficeSelector);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const openDropDownSelector = 'input[placeholder="Start typing..."]';
  await page.waitForSelector(openDropDownSelector);
  await page.click(openDropDownSelector);

  const officeSelector = 'input[placeholder="Start typing..."]';
  await page.waitForSelector(officeSelector);
  await page.click(officeSelector);
  await page.type(officeSelector, process.env.MY_CITY!);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const specifiedOfficeSelector = '#mat-autocomplete-0 > mat-option';
  await page.waitForSelector(specifiedOfficeSelector);
  await page.click(specifiedOfficeSelector);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const currentTimestamp = getCurrentTimestamp();
  const screenshotPath = path.join(
    __dirname,
    'snapshots',
    `${currentTimestamp}.png`
  );
  await page.screenshot({ path: screenshotPath, fullPage: true });

  await new Promise((resolve) => setTimeout(resolve, 3000));
  
  // const specifiedOfficeSelector = '.appointment-listings';
  
  // await browser.close();
})();
