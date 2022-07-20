<script lang="ts" setup>
import { HTMLAttributes, ref } from "vue";
import uid from "../lib/uid";
import usePopper from "../lib/use-popper";

defineProps<{
  buttonLabel?: string;
  buttonClass?: string;
  popoverAttrs?: HTMLAttributes;
  popoverBodyAttrs?: HTMLAttributes;
}>();

const id = `dropdown-${uid()}`;

const buttonEl = ref<HTMLElement>();
const menuEl = ref<HTMLElement>();

const isOpen = ref(false);

usePopper(isOpen, buttonEl, menuEl, {
  placement: "right",
  modifiers: [
    { name: "flip" },
    {
      name: "offset",
      options: { offset: [0, 8] },
    },
    {
      name: "arrow",
      options: { element: ".popover-arrow" },
    },
  ],
});
</script>

<template>
  <div class="dropdown">
    <button
      :id="id"
      ref="buttonEl"
      type="button"
      :class="buttonClass || 'btn btn-primary'"
      @click="isOpen = !isOpen"
    >
      <slot name="button">
        {{ buttonLabel }}
      </slot>
    </button>

    <teleport to="body">
      <div
        v-if="isOpen"
        ref="menuEl"
        class="popover bs-popover-auto"
        :aria-labelledby="id"
        role="tooltip"
        v-bind="popoverAttrs"
      >
        <div class="popover-arrow" />
        <div
          class="popover-body"
          v-bind="popoverBodyAttrs"
        >
          <slot />
        </div>
      </div>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
.popover-body {
  max-height: 100vh;
  overflow-y: auto;
}
</style>
