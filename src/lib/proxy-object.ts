import { watch, ref, Ref } from "vue";
import { isEqual, cloneDeep } from "lodash-es";

export default function proxyObject<T>(
  get: () => T,
  set: (value: T) => void
): Ref<T> {
  const internalModel = ref(cloneDeep(get())) as Ref<T>;

  watch(
    get,
    (value) => {
      if (!isEqual(value, internalModel.value)) {
        internalModel.value = cloneDeep(value);
      }
    },
    { deep: true }
  );

  watch(internalModel, (value) => set(cloneDeep(value)), { deep: true });

  return internalModel;
}
