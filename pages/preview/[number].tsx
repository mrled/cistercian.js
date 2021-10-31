import { useRouter } from "next/router";
import React from "react";
import CistercianNumeralDisplay from "components/CistercianNumeralDisplay";

export default function BareNumber({}) {
  const router = useRouter();
  return (
    <div className="py-8">
      <CistercianNumeralDisplay num={Number(router.query.number)} />
    </div>
  );
}
