import { PiniaPlugin, Store } from "pinia";

const stores: Store[] = [];

export function resetStore() {
  stores.forEach((s) => s.$reset());
}

export const resetPlugin: PiniaPlugin = ({ store }) => {
  stores.push(store);
};
