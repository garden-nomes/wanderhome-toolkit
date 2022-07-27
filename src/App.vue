<script lang="ts" setup>
import SheetsToolbar from "./components/SheetsToolbar.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<template>
  <div class="min-vh-100 d-flex flex-column">
    <sheets-toolbar />

    <div class="container py-3">
      <router-view />
    </div>

    <app-footer class="mt-auto" />
  </div>
</template>
