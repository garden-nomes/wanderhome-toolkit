<script setup lang="ts">
import { computed, InputHTMLAttributes } from "vue";
import LabeledValue from "./LabeledValue.vue";

interface Props {
  label: string;
  modelValue?: string;
  inputAttrs?: InputHTMLAttributes;
  isReadonly?: boolean;
  hideLabel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isReadonly: false,
  modelValue: "",
  inputAttrs: () => ({}),
  hideLabel: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const inputModel = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const inputId = `input-${Math.random().toString(36).slice(2)}`;
</script>

<template>
  <LabeledValue
    v-if="isReadonly"
    :label="label"
    :value="modelValue"
  />

  <div v-else>
    <label
      :for="inputId"
      :class="{ 'visually-hidden': hideLabel }"
    >
      {{ label }}
    </label>

    <input
      :id="inputId"
      v-model="inputModel"
      type="text"
      :class="[inputAttrs.class, 'form-control']"
      :placeholder="label"
      v-bind="inputAttrs"
    >
  </div>
</template>
