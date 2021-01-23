import { previewImageApiHandlerHof, previewImageDimensions } from "lib/preview";

const handler = previewImageApiHandlerHof(
  previewImageDimensions.ogImage.width,
  previewImageDimensions.ogImage.height
);
export default handler;
