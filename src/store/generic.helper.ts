import { create, StateCreator, StoreMutatorIdentifier } from "zustand";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";

export class StoreHelper {
  static createStore = <
    T,
    Mos extends [StoreMutatorIdentifier, unknown][] = []
  >(
    innerStore: StateCreator<T, [["zustand/devtools", never]], Mos>,
    storeName: string
  ) =>
    create<T>()(
      persist(
        devtools((set, get, api) => innerStore(set, get, api), {
          enabled: true, // TODO: this should come from .env file
          name: storeName,
        }),
        { name: storeName }
      )
    );
}
