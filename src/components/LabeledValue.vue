<script setup lang="ts">
defineProps<{
  label: string;
  value?: string;
  hideLabel?: boolean;
}>();
</script>

<template>
  <div>
    <div
      class="label"
      :class="{ 'visually-hidden': hideLabel }"
    >
      {{ label }}
    </div>

    <div
      v-if="value"
      class="value"
    >
      {{ value }}
    </div>

    <div
      v-else
      class="value-empty"
    >
      &nbsp;<span class="visually-hidden">None</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.value,
.value-empty {
  background: #f8f8f8;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  border: 1px solid transparent;
  border-bottom-color: #e0e0e0;
  border-radius: 0.25rem;
}
</style>
