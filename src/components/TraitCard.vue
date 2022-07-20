<script lang="ts" setup>
import { computed } from "vue";
import Card from "./Card.vue";
import { useTraitStore } from "../stores/traits";

const props = defineProps<{
  traitName: string;
}>();

const { getOrThrow } = useTraitStore();
const trait = computed(() => getOrThrow(props.traitName));
</script>

<template>
  <card
    :title="trait.name"
    :hash="`trait-${trait.name}`"
  >
    <p>{{ trait.description }}</p>

    <p class="luminari">
      Choose 1-2 they can always do:
    </p>

    <ul>
      <li
        v-for="item in trait.canAlways"
        :key="item"
      >
        {{ item }}
      </li>
    </ul>
  </card>
</template>
