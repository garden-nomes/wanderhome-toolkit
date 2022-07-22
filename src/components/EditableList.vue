<script lang="ts" setup>
import { ref, watch } from "vue";
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

const addItem = (value: string) => {
  if (value.length) {
    const id = uid();
    localModel.value = [...localModel.value, { id, value }];
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
        class="d-flex mb-1"
      >
        <editable-text
          v-model="item.value"
          label="item"
          class="flex-grow-1"
        />

        <div class="flex-shrink-1">
          <button
            type="button"
            class="btn btn-link text-secondary w-100"
            aria-label="remove"
            @click="removeItem(item.id)"
          >
            <icon name="trash" />
          </button>
        </div>
      </li>

      <li>
        <editable-text
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
