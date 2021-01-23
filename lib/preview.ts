/* Functionality for generating preview images like og:image and twitter:image
 */
import { NextApiRequest, NextApiResponse } from "next";

import puppeteer from "puppeteer";
import chromium from "chrome-aws-lambda";

import { getAppUri } from "./appUri";
import defaultImagePreview from "lib/previewDefaultImage";

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

  // This is scaled to fill up most of the image with the content
  // It was adjusted manually
  const scaleFactor = 3;

  page.setViewport({
    width: Math.floor(width / scaleFactor),
    height: Math.floor(height / scaleFactor),
    deviceScaleFactor: scaleFactor,
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

/* A higher-order function that returns an image preview handler
 *
 * The width and height determine the dimensions of the preview image to return.
 */
export function previewImageApiHandlerHof(width: number, height: number) {
  /* The image preview handler
   */
  const previewImage = async (req: NextApiRequest, res: NextApiResponse) => {
    const num = Number(req.query.number as string);
    const preview = await getScreenshot(num, width, height);
    res.setHeader("Content-Type", "image/png");
    const oneYearInSeconds = 31536000; // Max allowed for s-maxage on Vercel
    res.setHeader(
      "Cache-Control",
      `s-maxage=${oneYearInSeconds}, immutable, public`
    );
    res.statusCode = 200;
    res.end(preview);
  };

  return previewImage;
}
