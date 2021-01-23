import { useRouter } from "next/router";
import React from "react";
import CistercianNumeralDisplay from "../../components/CistercianNumeralDisplay";

/* This exists JUST so we can take a screenshot of it in api/preview/[number].ts
 */
export default function BareNumber({}) {
  const router = useRouter();
  return (
    <div className="py-1">
      <CistercianNumeralDisplay num={Number(router.query.number)} />
    </div>
  );
}
