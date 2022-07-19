<template>
  <div class="row">
    <div
      class="col-auto position-sticky"
      style="max-height: calc(100vh - 5.5rem); top: 4.5rem; overflow-y: auto"
    >
      <slot name="sidebar" />
    </div>

    <div class="col">
      <slot />
    </div>
  </div>
</template>
