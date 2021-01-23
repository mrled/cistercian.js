import { previewImageApiHandlerHof, previewImageDimensions } from "lib/preview";

const handler = previewImageApiHandlerHof(
  previewImageDimensions.twitterImage.width,
  previewImageDimensions.twitterImage.height
);
export default handler;
