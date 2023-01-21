"use client";

import { BarCode } from "@/components/barcode";
import NoSsr from "@/components/noSsr";
import { useCodesStore } from "@/store/codes";
import React from "react";

export default function List() {
  const codes = useCodesStore((state) => state.codes);

  return (
    <NoSsr>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[30px] w-4/5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Descrição
              </th>
              <th scope="col" className="px-6 py-3">
                Código
              </th>
            </tr>
          </thead>
          <tbody>
            {codes.map((c, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {c.description}
                </th>
                <td className="px-6 py-4">
                  <BarCode
                    code={c.code}
                    codeEncoded={c.code128}
                    withDescription={false}
                    classNameForBar="text-4xl"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </NoSsr>
  );
}
