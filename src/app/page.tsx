"use client";

import React from "react";

import { BarCode } from "@/components/barcode";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Code, useCodesStore } from "@/store/codes";
import Encoder from "code-128-encoder";

import { toast } from "react-toastify";

export default function Home() {
  const saveCode = useCodesStore((state) => state.saveCode);

  const encoder = new Encoder();

  const handleToast = () => toast("Gravado com sucesso", { type: "success" });

  const [informationValue, setInformationValue] = React.useState<Code>({
    code: "",
    description: "",
    code128: "",
  });

  const handleOnChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setInformationValue((previous) => ({
        ...previous,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  const handleOnSave = React.useCallback((): void => {
    saveCode({
      ...informationValue,
      code128: encoder.encode(informationValue?.code),
    });
    setInformationValue({
      code: "",
      description: "",
      code128: "",
    });

    handleToast();
  }, [encoder, informationValue, saveCode]);

  return (
    <div className="w-4/5">
      <Input
        label="Código"
        name="code"
        value={informationValue?.code}
        onChange={handleOnChange}
        className="mb-[30px] mt-[30px]"
      />

      <Input
        label="Descrição"
        name="description"
        value={informationValue?.description}
        onChange={handleOnChange}
        className="mb-[30px]"
      />

      {informationValue?.code && (
        <BarCode
          code={informationValue?.code}
          codeEncoded={encoder.encode(informationValue?.code)}
          textDescription={informationValue?.description}
        />
      )}

      {informationValue?.code && informationValue?.description && (
        <div className="w-full text-center">
          <Button text="Gravar" onClick={handleOnSave} className="mt-[30px] " />
        </div>
      )}
    </div>
  );
}
