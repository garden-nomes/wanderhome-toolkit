<script lang="ts" setup>
import { useResizeObserver } from "@vueuse/core";
import { nextTick, ref, watch } from "vue";
import Icon from "./Icon.vue";

const props = defineProps<{
  modelValue: string;
  label: string;
  alignEnd?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const textEl = ref<HTMLElement>();
const inputEl = ref<HTMLInputElement>();

const input = ref("");
const isEditing = ref(false);

watch(
  () => props.modelValue,
  (value) => {
    input.value = value;
  }
);

const edit = async () => {
  input.value = props.modelValue;
  isEditing.value = true;

  if (props.modelValue.length) {
    await nextTick();
    inputEl.value?.select();
  }
};

const update = async () => {
  if (!isEditing.value) return;

  isEditing.value = false;
  emit("update:modelValue", input.value);
};

watch(inputEl, (value) => (value as HTMLInputElement)?.select());

const resize = () => {
  if (!inputEl.value) return;
  inputEl.value.style.height = "1px";
  inputEl.value.style.height = `${inputEl.value.scrollHeight + 2}px`;
};

watch(input, resize);
useResizeObserver(inputEl, resize);
</script>

<template>
  <div v-if="isEditing">
    <textarea
      ref="inputEl"
      v-model.trim="input"
      class="form-control"
      :class="alignEnd && 'text-end'"
      :placeholder="label"
      :aria-label="label"
      @keydown.enter.prevent="update"
      @blur="update"
    />
  </div>

  <div
    v-else
    ref="textEl"
    role="button"
    tabindex="0"
    class="editable-text position-relative text-break"
    :class="{
      'is-placeholder': modelValue.length === 0,
      'text-end': alignEnd,
    }"
    @click="edit"
    @keydown.enter="edit"
    @keydown.space.prevent="edit"
  >
    <div
      class="show-on-hover small position-absolute px-3"
      :class="alignEnd ? 'start-0' : 'end-0'"
    >
      <icon
        name="pencil-fill"
        class="text-secondary"
        aria-label="edit"
      />
    </div>
    {{ modelValue || label }}
  </div>
</template>

<style lang="scss" scoped>
.editable-text {
  padding: 0.375rem 0.75rem;

  border: 1px solid transparent;
  border-bottom-color: var(--bs-gray-400);

  &:focus {
    outline: 0;
    border-radius: 0.125rem;
    box-shadow: 0 0 0 0.125rem var(--bs-gray-500);
  }

  &:hover {
    background: var(--bs-gray-100);
  }

  &.is-placeholder {
    color: var(--bs-secondary);
  }
}

@media (hover: hover) {
  .show-on-hover {
    visibility: hidden;
  }

  .editable-text:hover .show-on-hover {
    visibility: unset;
  }
}

textarea {
  resize: none;
  overflow: hidden;
}
</style>
