<script lang="ts" setup>
import { HTMLAttributes, ref, watch } from "vue";
import { Dropdown } from "bootstrap";
import uid from "../lib/uid";

defineProps<{
  buttonLabel?: string;
  buttonClass?: string;
  menuClass?: string;
  menuAttrs?: HTMLAttributes;
  buttonAttrs?: HTMLAttributes;
}>();

const id = `dropdown-${uid()}`;

const buttonEl = ref<HTMLElement>();
watch(buttonEl, (el) => {
  if (!el) return;
  new Dropdown(el, {
    autoClose: "outside",
  });
});
</script>

<template>
  <div class="dropdown">
    <button
      :id="id"
      ref="buttonEl"
      :class="buttonClass || 'btn btn-primary'"
      class="dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      v-bind="buttonAttrs"
    >
      <slot name="button">
        {{ buttonLabel }}
      </slot>
    </button>

    <div
      class="dropdown-menu"
      :class="menuClass"
      :aria-labelledby="id"
      v-bind="menuAttrs"
    >
      <slot />
    </div>
  </div>
</template>
