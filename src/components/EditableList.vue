<script lang="ts" setup>
import { ref, watch } from "vue";
import uid, { UID } from "../lib/uid";
import EditableText from "./EditableText.vue";
import Icon from "./Icon.vue";

const props = defineProps<{
  modelValue: string[];
  label: string;
  addLabel: string;
}>();

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
        class="row mb-1 g-0"
      >
        <editable-text
          v-model="item.value"
          label="item"
          class="col-10"
        />

        <div class="col">
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

      <li class="row g-0">
        <editable-text
          model-value=""
          :label="addLabel"
          class="col-10"
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
