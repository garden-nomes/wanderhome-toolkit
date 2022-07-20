<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps<{
  title?: string;
  hash?: string;
}>();

const id = computed(() => {
  if (props.hash) {
    return props.hash;
  }

  return undefined;
});

const route = useRoute();
const active = computed(() => route.hash === `#${id.value}`);
</script>

<template>
  <div class="d-flex col-lg-6 col-12">
    <div
      :id="id"
      :class="active ? 'border-primary' : ''"
      class="card flex-fill shadow-sm"
    >
      <div
        v-if="title"
        class="card-header"
      >
        <div class="card-title mb-0">
          {{ title }}
        </div>
      </div>

      <div
        v-if="$slots.default"
        class="card-body"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  transition: border-color 150ms linear, box-shadow 150ms ease-in-out;
}
</style>
