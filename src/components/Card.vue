<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps<{
  title?: string;
  id?: string;
}>();

const route = useRoute();
const isActive = computed(() => route.hash === `#${props.id}`);
</script>

<template>
  <div
    :id="id"
    :class="isActive && 'active'"
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
  height: calc(75vh - 4rem);
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
