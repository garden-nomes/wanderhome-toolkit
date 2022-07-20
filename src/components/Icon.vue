<script lang="ts" setup>
import icons from "bootstrap-icons/font/bootstrap-icons.json";
import svgHref from "bootstrap-icons/bootstrap-icons.svg";

export type IconName = keyof typeof icons;

defineProps<{
  name: IconName;
}>();
</script>

<template>
  <svg
    class="bi"
    width="1em"
    height="1em"
    fill="currentColor"
  >
    <use :xlink:href="`${svgHref}#${name}`" />
  </svg>
</template>
