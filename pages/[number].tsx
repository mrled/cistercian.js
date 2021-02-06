/* The home page
 * NOTE: / is redirected to /NaN in next.config.js
 */

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import SiteHead from "components/SiteHead";
import CistercianNumeralDisplay from "components/CistercianNumeralDisplay";
import { ExternalLink, InternalLink } from "components/Links";

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(JSON.stringify(context.params));
  console.log(
    `gssp: number: ${context.params.number} (${typeof context.params.number})`
  );
  const rawNumber = context.params.number;
  // We redirect / to /NaN in next.config.js, which we need to keep separate from /0
  const gsspNum = rawNumber !== "NaN" ? Number(rawNumber) : NaN;
  return {
    props: {
      gsspNum,
    },
  };
};

/* The home page component
 *
 * We deal with THREE items that represent the number:
 *    gsspNum:  From the response to the server
 *      Needed so the server sends the appropriate argument to <SiteHead>.
 *    routeNum: From the NextJS route
 *      Needed so that client-side routing works as expected.
 *      That is, changing the number in the input box changes the route in the URL bar,
 *      but does not have to talk to the server to display the change in the client.
 *    numState: React state
 *      Needed to bind the value of the input box.
 */
type HomeProps = {
  gsspNum: number;
};
export default function Home({ gsspNum }: HomeProps) {
  const router = useRouter();
  const { number: routeNumStr } = router.query;
  const routeNum = Number(routeNumStr);
  const inputRef = useRef<HTMLInputElement>();
  const [numState, setNumState] = useState<number>(NaN);

  console.log(
    `<Home> component: gssp num: ${gsspNum}, routeNum: ${routeNum}, useState num: ${numState}`
  );

  /* Read the value from the URI
   */
  useEffect(() => {
    if (numState === routeNum) {
      return;
    }
    setNumState(routeNum);
  }, [setNumState, routeNum]);

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
    router.replace(`/${newVal}`, undefined, { scroll: false });
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
        setInputVal(String(numState));
        setNumState(numState);
      } else {
        console.log("processInputNumber(): input field is empty");
        setInputVal("");
        setNumState(NaN);
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
    setNumState(newNum);
  };

  return (
    <div className="">
      <SiteHead num={gsspNum} />

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
            value={isNaN(numState) ? "" : numState}
            inputMode="numeric"
            pattern="\d*"
            onChange={processInputNumber}
          />
        </div>

        <div className="py-8">
          <CistercianNumeralDisplay num={numState} />
        </div>
      </main>
    </div>
  );
}
