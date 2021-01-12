import Head from "next/head";
import { ChangeEvent, useState } from "react";
import { number2cistercian } from "../lib/cistercian";

export default function Home() {
  const [num, setNum] = useState<number>(0);
  const cistercian = number2cistercian(num);

  /* Allow only integers from 0-9999
   */
  const processInputNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const num = Number(event.target.value);
    if (isNaN(num)) {
      console.log("Input error: not a number");
      return;
    } else if (!Number.isInteger(num)) {
      console.log("Input error: non-integer number");
      return;
    } else if (num < 0 || num > 9999) {
      console.log("Input error: number is outside of range 0-9999");
      return;
    }
    setNum(num);
  };

  return (
    <div className="">
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
      </Head>

      <main className="p-8 flex flex-1 flex-col justify-center items-center">
        <h1 className="text-6xl py-4">Count like a Cistercian</h1>

        <p>
          The Cistercians had{" "}
          <a
            href="https://en.wikipedia.org/wiki/Cistercian_numerals"
            className="text-blue-600"
          >
            a cool system for numerals
          </a>
          . Fredrick Brennan made{" "}
          <a
            href="https://github.com/ctrlcctrlv/FRBCistercian"
            className="text-blue-600"
          >
            a cool font for it
          </a>
          . I made this for converting numbers in real time. See notes at the
          bottom for technical details, caveats, etc.
        </p>

        <div className="py-4 flex flex-1 flex-col justify-center items-center">
          <p className="py-2">Type an integer between 0-9999:</p>
          <input
            className="border border-black p-2"
            type="text"
            value={num}
            onChange={processInputNumber}
          />
        </div>

        <div className="py-8 flex flex-1 flex-col justify-center items-center">
          <p>
            The decimal number{" "}
            <span className="text-lg text-gray-400">{num}</span> in Cistercian
            notation:
          </p>
          <p className="py-8 text-9xl font-cistercian items-center">
            {cistercian}
          </p>
        </div>

        <p className="text-sm">
          A few things to note:
          <ul className="list-disc px-8">
            <li>
              Cistercian characters are not (yet?) part of Unicode, and
              therefore the FRBCistercian font places them in the Private Use
              Area of Unicode. This means that, while you can copy the
              Cistercian character generated here like regular text, pasting the
              result won't make sense anywhere else that doesn't use the
              FRBCistercian font.
            </li>
            <li>
              Historically, Cistercians did not record zero and technically
              there is no representation of zero in the original system.
              FRBCistercian uses the plain stave to represent zero.
            </li>
            <li>
              The representation of 5 in FRBCistercian, of a triangle, is
              nonstandard; a more standard notation would be a dot.
            </li>
            <li>
              Cistercian was written either vertically or horizontally.
              FRBCistercian uses a vertical stave.
            </li>
            <li>
              You can find the source for this project{" "}
              <a
                href="https://github.com/mrled/cistercian.js"
                className="text-blue-600"
              >
                on GitHub
              </a>
              .
            </li>
          </ul>
        </p>
      </main>
    </div>
  );
}