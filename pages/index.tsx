import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import SiteHead from "../components/SiteHead";
import CistercianNumeralDisplay from "../components/CistercianNumeralDisplay";

export default function Home() {
  const [num, setNum] = useState<number>(NaN);

  /* Allow only integers from 0-9999
   */
  const processInputNumber = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(
      `processInputNumber(): event.target.value: ${
        event.target.value
      } ${typeof event.target.value})`
    );
    if (event.target.value === "") {
      console.log("processInputNumber(): input field is empty");
      setNum(NaN);
      return;
    }
    const num = Number(event.target.value);
    console.log(`processInputNumber() => ${num} (${typeof num})`);
    if (!Number.isInteger(num)) {
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
            value={num}
            inputMode="numeric"
            onChange={processInputNumber}
          />
        </div>

        <CistercianNumeralDisplay num={num} />
      </main>
    </div>
  );
}
