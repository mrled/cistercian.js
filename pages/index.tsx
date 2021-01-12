import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import SiteHead from "../components/SiteHead";
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
      <SiteHead />

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
          . I made this for converting regular arabic numerals to Cistercian
          numerals. See the{" "}
          <Link href="/endnotes">
            <a className="text-blue-600">end notes</a>
          </Link>{" "}
          for information about this site, caveats, how to report bugs, etc.
        </p>

        <div className="py-4 flex flex-1 flex-col justify-center items-center">
          <p className="py-2">Type an integer between 0-9999:</p>
          <input
            className="border border-black p-2"
            type="number"
            pattern="[0-9]*"
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
      </main>
    </div>
  );
}
