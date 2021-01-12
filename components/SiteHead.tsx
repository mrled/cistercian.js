import Head from "next/head";
import React from "react";

export default function SiteHead() {
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

      <meta
        name="og:title"
        property="og:title"
        content="Count like a Cistercian"
      />
      <meta
        name="og:description"
        property="og:description"
        content="A widget for playing with Cistercian numerals"
      />
      <meta property="og:url" content="https://cistercian.micahrl.com" />
      <meta name="twitter:site" content="@mrled" />
      <meta name="twitter:creator" content="@mrled" />
      <meta property="og:image" content="/og_image_screenshot.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:image"
        content="https://keymap.click/android-chrome-512x512.png"
      />
      <meta
        name="twitter:image:alt"
        content="Cistercian numerals representing 1337"
      />
      <meta name="twitter:title" content="Count like a Cistercian" />
      <meta
        name="twitter:description"
        content="A widget for playing with Cistercian numerals"
      />
      <meta name="twitter:image:width" content="512" />
      <meta name="twitter:image:height" content="512" />
    </Head>
  );
}
