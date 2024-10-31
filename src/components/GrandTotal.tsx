import React from "react";
import { addOnsPrice } from "./AddOns";

export default function GrandTotal({
  addOns,
  categoryTimesSubs,
}: {
  addOns: string;
  categoryTimesSubs: number;
}) {
  return (
    <div className="flex">
      <p>Total</p>
      <p className="text-xs font-semibold mt-2">
        Rs {addOnsPrice[addOns]} + {categoryTimesSubs}
      </p>
    </div>
  );
}
