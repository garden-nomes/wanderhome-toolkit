import { computed, ComputedRef, reactive, ref, watch } from "vue";
import { PiniaPlugin } from "pinia";
import { assign } from "lodash-es";

declare module "pinia" {
  export interface PiniaCustomProperties {
    undo(): void;
    redo(): void;
    canUndo: ComputedRef<boolean>;
    canRedo: ComputedRef<boolean>;
  }
}

export const undoPlugin: PiniaPlugin = ({ store }) => {
  const stack = reactive([JSON.stringify(store.$state)]);
  const index = ref(stack.length);
  let preventStackPush = false;

  watch(stack, (value) => console.log(value.map((value) => JSON.parse(value))));
  watch(index, (value) => console.log(value));

  store.$subscribe((_, state) => {
    if (preventStackPush) {
      preventStackPush = false;
      return;
    }

    stack.length = index.value + 1;
    stack[index.value] = JSON.stringify(state);
    index.value++;
  });

  store.undo = () => {
    if (index.value > 1) {
      preventStackPush = true;
      store.$patch((state) => {
        index.value--;
        assign(state, JSON.parse(stack[index.value - 1]));
      });
    }
  };

  store.redo = () => {
    if (index.value < stack.length) {
      preventStackPush = true;
      store.$patch((state) => {
        index.value++;
        assign(state, JSON.parse(stack[index.value - 1]));
      });
    }
  };

  store.canUndo = computed(() => index.value > 1);
  store.canRedo = computed(() => index.value < stack.length);
};
