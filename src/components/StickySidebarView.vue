<template>
  <div class="row">
    <div
      class="col-lg-2 col-sm-3 col-12 position-sticky"
      style="max-height: calc(100vh - 1.5rem); top: 0.5rem; overflow-y: auto"
    >
      <slot name="sidebar" />
    </div>

    <div class="col">
      <slot />
    </div>
  </div>
</template>
