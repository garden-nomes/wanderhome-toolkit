<script lang="ts" setup>
import { ref } from "vue";
import { getShareCode } from "../lib/share-codes";
import { Sheet } from "../stores/sheets";
import Icon from "./Icon.vue";

const props = defineProps<{
  sheets: Sheet[];
}>();

const inputEl = ref<HTMLInputElement>();
const copied = ref(false);
const copy = async () => {
  if (!inputEl.value) return;

  const focused = document.activeElement as HTMLElement | null;

  inputEl.value.value = await getShareCode(props.sheets);
  console.log(inputEl.value.value.length);
  inputEl.value.select();
  document.execCommand("copy");

  focused?.focus();

  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 1500);
};
</script>

<template>
  <div class="position-relative">
    <button
      :disabled="!sheets.length"
      class="btn btn-minimal"
      type="button"
      @click="copy"
    >
      <!-- eslint-disable -->
      <icon name="clipboard" class="me-1" /><template v-if="copied"
        >Copied!</template
      ><slot v-else>Copy share code</slot>
      <!-- eslint-enable -->
    </button>

    <div
      class="input-group input-group-sm visually-hidden-focusable position-absolute end-0 flex-nowrap"
      style="width: 10rem; z-index: 1000"
    >
      <div class="input-group-text">
        Share code
      </div>

      <input
        ref="inputEl"
        type="text"
        class="form-control"
        aria-label="Share code"
      >
    </div>
  </div>
</template>
