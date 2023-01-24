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
            </tr>
          </thead>
          <tbody>
            {codes.map((c, index) => (
              <tr key={index} className="bg-white border-b ">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button
        text="Exportar"
        onClick={handleOnClickExport}
        className="mt-[30px]"
      />
    </NoSsr>
  );
}
