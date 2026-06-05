"use client";

import NumberVerification from "@/components/number-verification/NumberVerification";
import React, { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NumberVerification />
    </Suspense>
  );
}
