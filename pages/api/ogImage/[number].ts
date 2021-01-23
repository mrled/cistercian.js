import { previewImageApiHandlerHof } from "lib/server/preview";
import { previewImageDimensions } from "lib/all/previewImageDimensions";

const handler = previewImageApiHandlerHof(
  previewImageDimensions.ogImage.width,
  previewImageDimensions.ogImage.height
);
export default handler;
