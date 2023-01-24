"use client";

import React from "react";
import { BarCode } from "@/components/barcode";
import NoSsr from "@/components/noSsr";
import { useCodesStore } from "@/store/codes";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { font } from "../../components/font";
import { Button } from "@/components/button";

export default function List() {
  const codes = useCodesStore((state) => state.codes);

  const deleteCode = useCodesStore((state) => state.deleteCode);

  const body = codes.map((c) => [c.description, c.code, c.code128]);

  const handleOnClickExport = React.useCallback((): void => {
    const doc = new jsPDF();
    doc.addFileToVFS("LibreBarcode128-Regular.ttf", font);
    doc.addFont("LibreBarcode128-Regular.ttf", "Libre_Barcode_128", "normal");

    autoTable(doc, {
      head: [["Descrição", "Código", "Código de Barras"]],
      body: [...body],
      columnStyles: {
        0: {
          valign: "middle",
        },
        1: {
          valign: "middle",
        },
        2: {
          font: "Libre_Barcode_128",
          fontSize: 40,
          fontStyle: "normal",
          valign: "middle",
          halign: "center",
        },
      },
    });

    doc.save(`barcode-${new Date().toISOString()}.pdf`);
  }, [body]);

  const handleOnDeleteItem = React.useCallback(
    (index: number): void => {
      deleteCode(codes[index]);
    },
    [codes, deleteCode]
  );

  return (
    <NoSsr>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[30px] w-4/5">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Descrição
              </th>
              <th scope="col" className="px-6 py-3">
                Código
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {codes.map((c, index) => (
              <tr key={index} className="bg-white border-b hover:bg-sky-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
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
                <td>
                  <div
                    className="flex space-x-2 justify-center"
                    onClick={() => handleOnDeleteItem(index)}
                  >
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {codes?.length > 0 && (
        <Button
          text="Exportar"
          onClick={handleOnClickExport}
          className="mt-[30px]"
        />
      )}
    </NoSsr>
  );
}
