<template>
  <div class="row">
    <div
      class="col-lg-2 col-sm-3 col-12 position-sticky"
      style="max-height: calc(100vh - 2rem); top: 1rem; overflow-y: auto"
    >
      <slot name="sidebar" />
    </div>

    <div class="col">
      <slot />
    </div>
  </div>
</template>
