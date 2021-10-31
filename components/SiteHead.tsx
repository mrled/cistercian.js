import Head from "next/head";
import React from "react";

import { getAppUri } from "lib/server/appUri";

type SiteHeadProps = {
  num?: number | undefined;
};
export default function SiteHead({ num }: SiteHeadProps) {
  const validNum = num !== null && typeof num !== "undefined" && !isNaN(num);
  console.log(`<SiteHead num=${num} />: num is valid: ${validNum}`);

  const appUri = getAppUri();
  const ogUrl = validNum ? `${appUri}/${num}` : appUri;

  const previewNum = validNum ? num : 420;
  const ogImage = `https://ogimage.micahrl.com/api/ogImage/cistercian/production/preview/${previewNum}`;

  const pageDesc = validNum
    ? `A representation of ${num} in Cistercian numerals`
    : "A widget for playing with Cistercian numerals";
  const pageTitle = validNum
    ? `${num} in Cistercian numerals`
    : "Count like a Cistercian";
  const imgAlt = validNum
    ? `${num} in Cistercian numerals`
    : "Cistercian numeral";
  const twTitle = pageTitle;
  const twDesc = pageDesc;
  const twAccount = "@mrled";

  return (
    <Head>
      <title>Count like a Cistercian</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest"></link>

      <meta name="og:title" property="og:title" content={pageTitle} />
      <meta
        name="og:description"
        property="og:description"
        content={pageDesc}
      />
      <meta property="og:url" content={ogUrl} />
      <meta name="twitter:site" content={twAccount} />
      <meta name="twitter:creator" content={twAccount} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={imgAlt} />
      <meta name="twitter:description" content={twDesc} />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="630" />
    </Head>
  );
}
