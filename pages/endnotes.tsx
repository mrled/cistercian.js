import React from "react";

import { ExternalLink, InternalLink } from "components/Links";
import SiteHead from "components/SiteHead";

export default function EndNotes() {
  return (
    <>
      <SiteHead />

      <main className="p-8 max-w-screen-lg">
        <h1 className="text-6xl py-4">End Notes</h1>
        <p className="py-2">A few things to note:</p>

        <h2 className="text-3xl pt-4 ph-4">Character rendering bugs</h2>
        <p className="py-2">
          I have seen glitches that result in rendering bad Cistercian
          characters in a couple of browsers, namely Firefox on macOS and the
          browser built-in to the iOS Slack client. I'm not sure what causes
          this - maybe ligature bugs in some browsers? If you encounter a bug,
          please take screenshots and describe what you're doing and open a{" "}
          <ExternalLink href="https://github.com/mrled/cistercianjs/issues">
            bug report
          </ExternalLink>
          , and if you know what might be causing these, I'd appreciate any
          help.
        </p>

        <h2 className="text-3xl pt-4 ph-4">Copy and paste will not work</h2>
        <p className="py-2">
          Cistercian characters are not (yet?) part of Unicode, and therefore
          the FRBCistercian font places them in the Private Use Area of Unicode.
          This means that, while you can copy the Cistercian character generated
          here like regular text, pasting the result won't make sense anywhere
          else that doesn't use the FRBCistercian font.
        </p>

        <h2 className="text-3xl pt-4 ph-4">Zero</h2>
        <p className="py-2">
          Historically, Cistercians did not record zero and technically there is
          no representation of zero in the original system. FRBCistercian uses
          the plain stave to represent zero.
        </p>

        <h2 className="text-3xl pt-4 ph-4">Nonstandard 5 characters</h2>
        <p className="py-2">
          The representation of 5 in FRBCistercian, of a triangle, is
          nonstandard; a more standard notation would be a dot.
        </p>

        <h2 className="text-3xl pt-4 ph-4">Orientation</h2>
        <p className="py-2">
          Cistercian was written either vertically or horizontally.
          FRBCistercian uses a vertical stave.
        </p>

        <h2 className="text-3xl pt-4 ph-4">Development and source code</h2>
        <p className="py-2">
          You can find the source for this project{" "}
          <ExternalLink href="https://github.com/mrled/cistercian.js">
            on GitHub
          </ExternalLink>
          .
        </p>

        <h2 className="text-3xl pt-4 ph-4">See also</h2>
        <p className="py-2">
          You might also be interested in:
          <ul className="list-disc ml-4">
            <li>
              <ExternalLink href="https://github.com/mrled/hugo-theme-cistercian">
                hugo-theme-cistercian
              </ExternalLink>
              , a utility theme I wrote for the Hugo static site generator for
              using Cistercian numerals.
            </li>
            <li>
              <ExternalLink href="https://disquisition.micahrl.com/research">
                Disquisition
              </ExternalLink>
              , a blog that uses my Hugo plugin.
            </li>
            <li>
              <ExternalLink href="https://me.micahrl.com/blog/failed-experiment-python-pillow-cistercian-font/">
                A failed experiment: Python Pillow and a Cistercian font
              </ExternalLink>
              , an abandoned attempt to write Cistercian numerals directly to
              iamge files.
            </li>
          </ul>
        </p>
        <p className="py-8 text-sm">
          <InternalLink href="/">Return home</InternalLink>
        </p>
      </main>
    </>
  );
}
