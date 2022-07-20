<script lang="ts" setup>
import { ref, watch } from "vue";
import Icon from "./Icon.vue";
import { Trait } from "../stores/traits";
import { Nature } from "../stores/natures";

type KeyOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: unknown;
};

const props = defineProps<{
  items: (Trait | Nature)[];
  selector: KeyOfType<Trait & Nature, string[]>;
  modelValue: string[];
  instructions: string;
  selectLabel: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

watch(
  () => props.items,
  (value, oldValue) => {
    const removed = oldValue.filter(
      (a) => !value.some((b) => a.name === b.name)
    );

    if (removed.length) {
      emit(
        "update:modelValue",
        props.modelValue.filter((selected) =>
          value.some((item) => getOptions(item).includes(selected))
        )
      );
    }
  }
);

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

const isExpanded = ref(false);

const getOptions = (item: Trait | Nature) => {
  const { selector } = props;

  if (selector in item) {
    return item[selector as keyof typeof item] as string[];
  }

  throw new Error(`Invalid selector: ${props.selector}`);
};
</script>

<template>
  <div>
    <p class="luminari mb-0">
      <slot />
    </p>

    <template v-if="isExpanded">
      <p class="mt-2 mb-2">
        {{ instructions }}
      </p>

      <ul class="list-unstyled mb-0">
        <li
          v-for="item in items"
          :key="item.name"
          class="mb-2"
        >
          <div>
            {{ item.name }}
          </div>

          <ul class="list-unstyled">
            <li
              v-for="option in getOptions(item)"
              :key="option"
            >
              <button
                class="btn btn-toggleable-text w-100 d-flex align-items-center p-0"
                :class="isSelected(option) && 'active'"
                @click="toggle(option)"
              >
                <icon
                  :name="isSelected(option) ? 'check-circle' : 'circle'"
                  class="me-2 flex-shrink-0 small"
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
      <ul class="mb-0 mt-2">
        <li
          v-for="option in modelValue"
          :key="option"
          class="mb-1"
        >
          {{ option }}
        </li>
      </ul>

      <button
        class="btn btn-minimal text-start w-100"
        :disabled="!items.length"
        @click="isExpanded = true"
      >
        {{ selectLabel }}
      </button>
    </template>

    <button
      v-else
      class="btn btn-minimal text-start w-100"
      :disabled="!items.length"
      @click="isExpanded = true"
    >
      {{ selectLabel }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.btn-toggleable-text {
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
