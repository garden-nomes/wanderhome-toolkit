<script lang="ts" setup>
import { ref, watch } from "vue";
import { parseShareCode } from "../lib/share-codes";
import { Sheet } from "../stores/sheets";
import Icon from "./Icon.vue";

const emit = defineEmits<{
  (e: "add", value: Sheet[]): void;
}>();

const isOpen = ref(false);
const input = ref("");

const sheets = ref<Sheet[] | null>(null);
watch(input, async () => {
  sheets.value = input.value.length ? await parseShareCode(input.value) : null;
});

const add = () => {
  if (sheets.value) {
    emit("add", sheets.value);
  }

  isOpen.value = false;
  input.value = "";
};
</script>

<template>
  <form
    v-if="isOpen"
    class="input-group input-group-sm"
    style="max-width: 10rem"
    @submit.prevent="add"
  >
    <input
      v-model.trim="input"
      v-autofocus
      class="form-control"
      type="text"
    >

    <button
      v-if="input.length"
      type="submit"
      :disabled="!sheets"
      class="btn btn-outline-secondary"
    >
      <icon
        name="plus"
        class="me-1"
      />Add
    </button>

    <button
      v-else
      type="submit"
      class="btn btn-outline-secondary"
    >
      <icon
        name="x"
        class="me-1"
      />Close
    </button>
  </form>

  <button
    v-else
    class="btn btn-minimal"
    @click="isOpen = true"
  >
    <icon
      name="plus"
      class="me-1"
    />Add from share code
  </button>
</template>
