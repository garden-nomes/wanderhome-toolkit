import { PiniaPlugin } from "pinia";

export const saveStatePlugin: PiniaPlugin = ({ store }) => {
  try {
    const savedState = localStorage.getItem(store.$id);
    if (savedState) {
      store.$patch(JSON.parse(savedState));
    }
  } catch (error) {} // eslint-disable-line no-empty

  store.$subscribe((_, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state));
  });
};
