<script lang="ts" setup>
import Popover from "./Popover.vue";
import Icon, { IconName } from "./Icon.vue";
import { NatureCategory } from "../stores/natures";
import { TraitCategory } from "../stores/traits";

const props = defineProps<{
  categories: (TraitCategory | NatureCategory)[];
  modelValue: string[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const isAdded = (item: string) => props.modelValue.some((t) => t === item);

const toggle = (item: string) =>
  isAdded(item)
    ? emit(
        "update:modelValue",
        props.modelValue.filter((t) => t !== item)
      )
    : emit("update:modelValue", [...new Set([...props.modelValue, item])]);

const randomDiceIcon = () =>
  `dice-${Math.floor(Math.random() * 6) + 1}` as IconName;

const addRandom = () => {
  const addable = props.categories
    .flatMap((c) => getItems(c))
    .filter((t) => !isAdded(t.name));
  const index = Math.floor(Math.random() * addable.length);
  toggle(addable[index].name);
};

const getItems = (category: TraitCategory | NatureCategory) =>
  "traits" in category ? category.traits : category.natures;
</script>

<template>
  <popover
    placement="bottom"
    :popover-attrs="{ style: 'width: 40rem; max-width: unset' }"
  >
    <template #button>
      <slot />
    </template>

    <div class="text-center mb-2">
      <button
        class="btn btn-minimal"
        @click="addRandom"
      >
        <icon
          :name="randomDiceIcon()"
          class="me-1"
        />
        <icon
          :name="randomDiceIcon()"
          class="me-1"
        />
        Add random
      </button>
    </div>

    <div class="row gx-1 gy-2">
      <div
        v-for="category in categories"
        :key="category.name"
        class="col-12 col-lg-6"
        :class="getItems(category).length > 6 && 'col-lg-12'"
      >
        <div class="luminari border-bottom mx-3 mb-2">
          {{ category.name }}
        </div>

        <ul class="list-unstyled row g-1 mb-0">
          <li
            v-for="item in getItems(category)"
            :key="item.name"
            :class="getItems(category).length > 6 ? 'col-sm-2' : 'col-sm-4'"
          >
            <button
              type="button"
              class="dropdown-item rounded"
              :class="isAdded(item.name) && 'active'"
              @click="toggle(item.name)"
            >
              {{ item.name }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </popover>
</template>
