<script lang="ts" setup>
import Popover from "./Popover.vue";
import { useTraitStore } from "../stores/traits";
import Icon, { IconName } from "./Icon.vue";

const props = defineProps<{
  modelValue: string[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const { categories, traits } = useTraitStore();

const isAdded = (trait: string) => props.modelValue.some((t) => t === trait);

const toggle = (trait: string) =>
  isAdded(trait)
    ? emit(
        "update:modelValue",
        props.modelValue.filter((t) => t !== trait)
      )
    : emit("update:modelValue", [...new Set([...props.modelValue, trait])]);

const randomDiceIcon = () =>
  `dice-${Math.floor(Math.random() * 6) + 1}` as IconName;

const addRandom = () => {
  const addable = traits.filter((t) => !isAdded(t.name));
  const index = Math.floor(Math.random() * addable.length);
  toggle(addable[index].name);
};
</script>

<template>
  <popover
    button-class="btn btn-minimal w-100 "
    placement="auto"
    :popover-attrs="{ style: 'width: 40rem; max-width: unset' }"
  >
    <template #button>
      <icon name="plus" />Select traits
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
        :class="category.traits.length > 6 && 'col-lg-12'"
      >
        <div class="luminari border-bottom mx-3 mb-2">
          {{ category.name }}
        </div>

        <ul class="list-unstyled row g-1 mb-0">
          <li
            v-for="trait in category.traits"
            :key="trait.name"
            :class="category.traits.length > 6 ? 'col-sm-2' : 'col-sm-4'"
          >
            <button
              type="button"
              class="dropdown-item rounded"
              :class="isAdded(trait.name) && 'active'"
              @click="toggle(trait.name)"
            >
              {{ trait.name }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </popover>
</template>
