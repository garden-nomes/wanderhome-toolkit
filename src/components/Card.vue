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
  <div
    :id="id"
    :class="active && 'active'"
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
      class="card-body px-4 py-3"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  transition: border-color 150ms linear, box-shadow 150ms ease-in-out;
  height: calc(100vh - 9rem);
  overflow-y: auto;

  &.active {
    animation: 3s ease-in forwards flash;
  }

  @keyframes flash {
    from {
      border-color: var(--bs-primary);
    }
  }
}
</style>
