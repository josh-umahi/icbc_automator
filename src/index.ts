import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(
    'https://onlinebusiness.icbc.com/webdeas-ui/login;type=driver'
  );

  await page.setViewport({ width: 1080, height: 2800 });

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

  await new Promise(resolve => setTimeout(resolve, 3000));
  await page.screenshot({ path: 'screenshot1.png', fullPage: true });

  // Define the selector for the div
  const byOfficeSelector = '#mat-tab-label-15-1';

  // Wait for the div to be available and visible
  await page.waitForSelector(byOfficeSelector, {
    visible: true,
    timeout: 60000,
  }); // Increased timeout to 60 seconds
  console.log('Div is visible');

  // Take a screenshot for debugging
  await page.screenshot({ path: 'screenshot2.png', fullPage: true });
  console.log('Screenshot taken');

  // Click the div element
  await page.click(byOfficeSelector);
  console.log('Div clicked');
})();
