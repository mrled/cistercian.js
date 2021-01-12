import React, { ChangeEvent, useRef, useState } from "react";
import SiteHead from "../components/SiteHead";
import CistercianNumeralDisplay from "../components/CistercianNumeralDisplay";
import { ExternalLink, InternalLink } from "../components/Links";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>();
  const [num, setNum] = useState<number>(NaN);

  /* Set the value in the input box
   */
  const setInputVal = (newVal: string) => {
    if (!inputRef || !inputRef.current) {
      console.log(
        `setInputVal(${newVal}): no-op, inputRef.current is undefined`
      );
      return;
    }
    console.log(`setInputVal(${newVal}): updaing input box...`);
    inputRef.current.value = newVal;
  };

  /* Allow only integers from 0-9999
   */
  const processInputNumber = (event: ChangeEvent<HTMLInputElement>) => {
    // console.table(event.target);
    if (event.target.value === "") {
      if (event.target.validity.badInput) {
        console.log(
          "processInputNumber(): invalid character added to input field"
        );
        // Set the text box contents to the old value -- ignore the new invalid character
        setInputVal(String(num));
        setNum(num);
      } else {
        console.log("processInputNumber(): input field is empty");
        setInputVal("");
        setNum(NaN);
      }
      return;
    }
    const newNum = Number(event.target.value);
    console.log(`processInputNumber() => ${newNum} (${typeof newNum})`);
    if (!Number.isInteger(newNum)) {
      console.log("Input error: non-integer number");
      return;
    } else if (newNum < 0 || newNum > 9999) {
      console.log("Input error: number is outside of range 0-9999");
      return;
    }
    // Why setInputVal here with a string?
    // This normalizes the number, so that e.g. 01 becomes just 1.
    setInputVal(String(newNum));
    setNum(newNum);
  };

  return (
    <div className="">
      <SiteHead />

      <main className="p-8 flex flex-1 flex-col justify-center items-center">
        <h1 className="text-6xl py-4">Count like a Cistercian</h1>

        <p>
          The Cistercians had{" "}
          <ExternalLink href="https://en.wikipedia.org/wiki/Cistercian_numerals">
            a cool system for numerals
          </ExternalLink>
          . Fredrick Brennan made{" "}
          <ExternalLink href="https://github.com/ctrlcctrlv/FRBCistercian">
            a cool font for it
          </ExternalLink>
          . I (<ExternalLink href="https://me.micahrl.com">Micah</ExternalLink>)
          made this for converting regular arabic numerals to Cistercian
          numerals. See the{" "}
          <InternalLink href="/endnotes">end notes</InternalLink> for
          information about this site, caveats, how to report bugs, etc.
        </p>

        <div className="py-4 flex flex-1 flex-col justify-center items-center">
          <p className="py-2">Type an integer between 0-9999:</p>
          <input
            ref={inputRef}
            className="border border-black p-2"
            type="number"
            value={isNaN(num) ? "" : num}
            inputMode="numeric"
            pattern="\d*"
            onChange={processInputNumber}
          />
        </div>

        <CistercianNumeralDisplay num={num} />
      </main>
    </div>
  );
}
