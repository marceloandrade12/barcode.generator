"use client";

import React from "react";
import { Libre_Barcode_128 } from "@next/font/google";

const barcodeFont = Libre_Barcode_128({
  weight: "400",
});

export interface InputProps {
  code: string;
  codeEncoded: string;
  textDescription?: string;
  classNameForBar?: string;
  withDescription?: boolean;
}

export const BarCode: React.FC<InputProps> = ({
  code,
  codeEncoded,
  textDescription,
  classNameForBar,
  withDescription = true,
}) => {
  return (
    <div className="flex flex-col text-center">
      <span>{textDescription}</span>
      <p
        className={`${barcodeFont.className} text-7xl ${classNameForBar} whitespace-pre`}
      >
        {codeEncoded}
      </p>
      {withDescription && <span className="mt-[-25px]">{code}</span>}
    </div>
  );
};
