import { NextApiRequest, NextApiResponse } from "next";

import { getScreenshot } from "lib/preview";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const num = Number(req.query.number as string);
  const width = 320;
  const height = 240;
  const preview = await getScreenshot(num, width, height);
  res.setHeader("Content-Type", "image/png");
  res.statusCode = 200;
  res.end(preview);
}
