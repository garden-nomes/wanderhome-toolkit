<script setup lang="ts">
import { ref } from "vue";
import LabeledInput from "./LabeledInput.vue";

interface Props {
  modelValue: string[];
}

interface Emits {
  (e: "update:modelValue", value: string[]): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const addItem = () => {
  emits("update:modelValue", [...props.modelValue, ""]);
};

const deleteItem = (index: number) => {
  const items = [...props.modelValue];
  items.splice(index);
  emits("update:modelValue", items);
};

const updateItem = (index: number, value: string) => {
  const items = [...props.modelValue];
  items[index] = value;
  emits("update:modelValue", items);
};

const isEditing = ref(false);
</script>

<template>
  <form
    v-if="isEditing"
    @submit.prevent="isEditing = false"
  >
    <div
      v-for="(item, index) in modelValue"
      :key="index"
      class="d-flex mb-2"
    >
      <LabeledInput
        :model-value="item"
        label="Item"
        hide-label
        @update:model-value="updateItem(index, $event)"
      />

      <div>
        <button
          type="button"
          class="btn btn-link btn-sm"
          @click="deleteItem(index)"
        >
          delete
        </button>
      </div>
    </div>

    <div class="mt-3 d-flex justify-content-between">
      <button
        type="button"
        class="btn btn-link btn-sm"
        @click="addItem"
      >
        add item
      </button>

      <button
        type="submit"
        class="btn btn-primary"
      >
        Done
      </button>
    </div>
  </form>

  <template v-else>
    <ul>
      <li
        v-for="(item, index) in modelValue"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>

    <button
      type="button"
      class="btn btn-link"
      @click="isEditing = true"
    >
      Edit
    </button>
  </template>
</template>
