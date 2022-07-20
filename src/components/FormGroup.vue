<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import uid from "../lib/uid";
const props = defineProps<{
  label: string;
  modelValue: string;
  autofocus?: boolean;
  readonly?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const id = `input-${uid()}`;

const model = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});

const inputEl = ref<HTMLInputElement | null>(null);
onMounted(() => {
  if (props.autofocus && inputEl.value) {
    inputEl.value.focus();
  }
});
</script>

<template>
  <div class="row">
    <label
      :for="id"
      class="col-3 col-form-label luminari"
    >
      {{ label }}
    </label>

    <div class="col">
      <input
        :id="id"
        ref="inputEl"
        v-model="model"
        v-autofocus="autofocus"
        :placeholder="label"
        :readonly="readonly"
        :class="readonly ? 'form-control-plaintext' : 'form-control'"
        type="text"
      >
    </div>
  </div>
</template>
