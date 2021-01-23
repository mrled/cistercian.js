import { previewImageApiHandlerHof } from "lib/preview";

const handler = previewImageApiHandlerHof(320, 240);
export default handler;
