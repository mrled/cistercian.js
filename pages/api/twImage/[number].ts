import { previewImageApiHandlerHof } from "lib/server/preview";
import { previewImageDimensions } from "lib/all/previewImageDimensions";

const handler = previewImageApiHandlerHof(
  previewImageDimensions.twitterImage.width,
  previewImageDimensions.twitterImage.height
);
export default handler;
