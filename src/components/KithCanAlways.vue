<script lang="ts" setup>
import { ref } from "vue";
import { useTraitStore } from "../stores/traits";
import Icon from "./Icon.vue";

const props = defineProps<{
  traits: string[];
  modelValue: string[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const { getOrThrow } = useTraitStore();

const isSelected = (option: string) =>
  props.modelValue.some((o) => o === option);

const select = (option: string) =>
  emit("update:modelValue", [...new Set([...props.modelValue, option])]);

const deselect = (option: string) =>
  emit(
    "update:modelValue",
    props.modelValue.filter((o) => o !== option)
  );

const toggle = (option: string) =>
  isSelected(option) ? deselect(option) : select(option);

const isExpanded = ref(true);
</script>

<template>
  <div>
    <p class="luminari mb-0">
      This kith can always...
    </p>

    <template v-if="isExpanded">
      <p class="mt-2 mb-2">
        Choose 1-2 from each trait.
      </p>

      <ul class="list-unstyled mb-0">
        <li
          v-for="trait in traits"
          :key="trait"
          class="mb-2 card px-3 py-2"
        >
          <div class="px-2">
            {{ trait }}
          </div>

          <ul class="list-unstyled">
            <li
              v-for="option in getOrThrow(trait).canAlways"
              :key="option"
            >
              <button
                class="btn btn-can-always w-100 d-flex align-items-center"
                :class="isSelected(option) && 'active'"
                @click="toggle(option)"
              >
                <icon
                  :name="isSelected(option) ? 'check-circle-fill' : 'circle'"
                  class="me-2 flex-shrink-0"
                />

                <div>{{ option }}</div>
              </button>
            </li>
          </ul>
        </li>
      </ul>

      <button
        class="btn btn-minimal w-100"
        @click="isExpanded = false"
      >
        Close
      </button>
    </template>

    <template v-else-if="modelValue.length">
      <ul class="mb-0">
        <li
          v-for="option in modelValue"
          :key="option"
          class="mb-1"
        >
          {{ option }}
        </li>
      </ul>

      <div class="px-3">
        <button
          class="btn btn-minimal text-start w-100"
          :disabled="!traits.length"
          @click="isExpanded = true"
        >
          Select from traits
        </button>
      </div>
    </template>

    <button
      v-else
      class="btn btn-minimal text-start w-100"
      :disabled="!traits.length"
      @click="isExpanded = true"
    >
      Select from traits
    </button>
  </div>
</template>

<style lang="scss" scoped>
.btn-can-always {
  color: var(--bs-secondary);
  text-align: left;
  padding: 0.25rem 0.5rem;

  &:hover {
    background-color: var(--bs-gray-100);
    color: var(--bs-body-color);
  }

  &.active {
    color: var(--bs-body-color);
    text-decoration: underline;
  }
}
</style>
