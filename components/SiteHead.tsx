import Head from "next/head";
import React from "react";

import { getAppUri } from "lib/appUri";

type SiteHeadProps = {
  num?: number | undefined;
};
export default function SiteHead({ num }: SiteHeadProps) {
  const validNum = typeof num !== "undefined" && !isNaN(num);
  const ogUrl = validNum ? `${getAppUri()}/${num}` : getAppUri();
  const ogImage = validNum ? `/api/ogImage/${num}` : "/api/ogImage/default";
  const twImage = validNum ? `/api/twImage/${num}` : "/api/twImage/default";
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
      <meta name="twitter:image" content={twImage} />
      <meta name="twitter:image:alt" content={imgAlt} />
      <meta name="twitter:title" content={twTitle} />
      <meta name="twitter:description" content={twDesc} />
      <meta name="twitter:image:width" content="512" />
      <meta name="twitter:image:height" content="512" />
    </Head>
  );
}
