/* The home page
 * NOTE: / is redirected to /NaN in next.config.js
 */

import React from "react";

import SiteHead from "components/SiteHead";
import CistercianNumeralDisplay from "components/CistercianNumeralDisplay";
import { InternalLink } from "components/Links";

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
export default function FourOhFour() {
  return (
    <div className="">
      <SiteHead num={404} />

      <main className="p-8 flex flex-1 flex-col justify-center items-center">
        <h1 className="text-6xl py-4">404: File not found</h1>

        <div className="py-8 text-2xl">
          Return home and{" "}
          <InternalLink href="/">Count like a Cistercian</InternalLink>
        </div>

        <div className="py-8">
          <CistercianNumeralDisplay num={404} />
        </div>
      </main>
    </div>
  );
}
