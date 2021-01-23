/* Functionality for generating preview images like og:image and twitter:image
 */
import fs from "fs";

import puppeteer from "puppeteer";
import chromium from "chrome-aws-lambda";

import { getAppUri } from "./appUri";

export const defaultScreenshotPath = "defaultPreview.png";

function getScreenshotPath(name: number, width: number, height: number) {
  // TODO: Don't let screenshotName contain path elements like dots or slashes
  if (isNaN(name)) {
    return defaultScreenshotPath;
  }
  return `_puppeteer_screenshots_/${name}_${width}x${height}.png`;
}

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

  const screenshotPath = getScreenshotPath(num, width, height);

  const uriToRender = `${appUri}/preview/${num}`;
  console.log(`api/preview/${num} will make a screenshot of ${uriToRender}`);

  const browser = await launchBrowser({});
  const page = await browser.newPage();
  page.setViewport({
    width: width,
    height: height,
  });
  await page.goto(uriToRender);
  const screenshot = await page.screenshot({ path: screenshotPath });
  return screenshot;
}

export async function getScreenshot(
  num: number,
  width: number,
  height: number
) {
  try {
    const screenshotPath = getScreenshotPath(num, width, height);
    console.log(
      `Will attempt to cache the screenshot at ${screenshotPath}. If that is a relative path, it is relative to the current working directory of ${process.cwd()}`
    );

    try {
      const screenshotData = await fs.promises.readFile(screenshotPath);
      return screenshotData;
    } catch (err) {
      console.log(`No screenshot at ${screenshotPath}, will generate one`);
      const newScreenshot = await takeScreenshot(num, width, height);
      return newScreenshot;
    }
  } catch (err) {
    const cwdFiles = await fs.promises.readdir(process.cwd());
    console.error(`Encountered error ${err}, returning default image`);
    console.log([`Node CWD: ${process.cwd()}`] + cwdFiles.join("\n"));
    const defaultPreviewImage = fs.readFileSync(defaultScreenshotPath);
    return defaultPreviewImage;
  }
}
