import produce from "immer";

import { StoreHelper } from "./generic.helper";

export interface Code {
  // plain text code
  code: string;
  // description
  description: string;
  // code already encoded to 128
  code128: string;
  //
  id: number;
}

export interface CodesState {
  codes: Code[];
}

export const codesInitialState: CodesState = {
  codes: [],
};

interface UseCodesStoreOutput extends CodesState {
  saveCode: (codes: Code) => void;
  deleteCode: (code: Code) => void;
}

export const useCodesStore = StoreHelper.createStore<UseCodesStoreOutput>(
  (set) => ({
    ...codesInitialState,
    saveCode: (code: Code) =>
      set(
        produce((state: CodesState) => ({ codes: [...state.codes, code] })),
        false,
        "@@CODES/saveCode"
      ),
    deleteCode: (code: Code) =>
      set(
        produce((state: CodesState) => ({
          codes: state.codes.filter((c) => c.id !== code.id),
        })),
        false,
        "@@CODES/deleteCode"
      ),
  }),
  "@@CODES"
);
