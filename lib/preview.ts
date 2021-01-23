/* Functionality for generating preview images like og:image and twitter:image
 */
import puppeteer from "puppeteer";
import chromium from "chrome-aws-lambda";

import { getAppUri } from "./appUri";
import defaultImagePreview from "lib/previewDefaultImage";

export const defaultScreenshotPath = "defaultPreview.png";

async function launchBrowser(
  puppeteerLaunchArgs: any
): Promise<puppeteer.Browser> {
  if (process.env.VERCEL_ENV) {
    console.log("Running on Vercel, will use chrome-aws-lambda");
    const browser = await puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
      ...puppeteerLaunchArgs,
    });
    return browser;
  } else {
    console.log("Not running on Vercel, will use default Chrome");
    const browser = await puppeteer.launch();
    return browser;
  }
}

async function takeScreenshot(num: number, width: number, height: number) {
  /* We do _not_ use something like this:
   *   const reqUri = req.protocol + "://" + req.get("host") + req.originalUrl;
   * because the request is under the control of the _client_.
   * Instead, we hard-code the URL based on the environment
   */
  const appUri = getAppUri();

  const uriToRender = `${appUri}/preview/${num}`;
  console.log(`lib/preview/${num} will make a screenshot of ${uriToRender}`);

  const browser = await launchBrowser({});
  const page = await browser.newPage();
  page.setViewport({
    width: width,
    height: height,
  });
  await page.goto(uriToRender);
  const screenshot = await page.screenshot();
  return screenshot;
}

export async function getScreenshot(
  num: number,
  width: number,
  height: number
) {
  try {
    if (isNaN(num)) {
      console.log("NaN passed to getScreenshot(), returning default preview");
      return defaultImagePreview;
    }
    const newScreenshot = await takeScreenshot(num, width, height);
    return newScreenshot;
  } catch (err) {
    console.error(`Encountered error ${err}, returning default image`);
    return defaultImagePreview;
  }
}
