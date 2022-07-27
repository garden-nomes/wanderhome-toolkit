<script lang="ts" setup>
import { isEqual } from "lodash";
import { nextTick, ref, watch } from "vue";
import uid, { UID } from "../lib/uid";
import EditableText from "./EditableText.vue";
import Icon from "./Icon.vue";

const props = withDefaults(
  defineProps<{
    modelValue: string[];
    label: string;
    addLabel: string;
  }>(),
  { addLabel: "Add item" }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const localModel = ref(props.modelValue.map((value) => ({ id: uid(), value })));

watch(
  () => props.modelValue,
  () => {
    if (
      !isEqual(
        localModel.value.map((item) => item.value),
        props.modelValue
      )
    ) {
      localModel.value = props.modelValue.map((value) => ({
        id: uid(),
        value,
      }));
    }
  }
);

watch(
  localModel,
  (value) =>
    emit(
      "update:modelValue",
      value.map((item) => item.value)
    ),
  { deep: true }
);

const removeItem = (id: UID) => {
  localModel.value = localModel.value.filter((item) => item.id !== id);
};

const isAddTextEditing = ref(false);
const addItem = async (value: string) => {
  if (value.length) {
    const id = uid();
    localModel.value = [...localModel.value, { id, value }];

    await nextTick();
    isAddTextEditing.value = true;
  }
};

const updateItem = (id: UID, value: string) => {
  value = value.trim();

  if (value.length) {
    const index = localModel.value.findIndex((item) => item.id === id);
    localModel.value[index].value = value;
  } else {
    removeItem(id);
  }
};
</script>

<template>
  <div class="mb-1">
    <p class="luminari mb-0">
      {{ label }}
    </p>

    <ul class="list-unstyled">
      <li
        v-for="item in localModel"
        :key="item.id"
        class="d-flex mb-1 position-relative"
      >
        <editable-text
          :model-value="item.value"
          label="Item"
          hide-label
          class="flex-grow-1"
          @update:model-value="updateItem(item.id, $event)"
        />

        <div class="flex-shrink-1 position-absolute end-0">
          <button
            type="button"
            class="btn btn-minimal visually-hidden-focusable"
            aria-label="remove"
            @click="removeItem(item.id)"
          >
            <icon
              name="dash"
              class="me-1"
            />Remove
          </button>
        </div>
      </li>

      <li>
        <editable-text
          v-model:is-editing="isAddTextEditing"
          model-value=""
          :label="addLabel"
          @update:model-value="addItem"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@media (hover: hover) {
  .show-on-hover {
    opacity: 0;
    transition: opacity 150ms linear;
  }

  *:hover > .show-on-hover {
    opacity: 1;
  }
}

.hover-bg-light:hover {
  background-color: var(--bs-light);
}
</style>
