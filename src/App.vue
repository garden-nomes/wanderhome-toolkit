<script lang="ts">
import { defineComponent } from "vue";
import TraitList from "./components/TraitList.vue";

export default defineComponent({
  name: "app",
  components: { TraitList },
});
</script>

<template>
  <nav class="navbar fixed-top bg-light">
    <div class="container-fluid">
      <span class="navbar-brand luminari">Wanderhome Toolkit</span>
    </div>
  </nav>

  <div
    class="container-fluid pb-3"
    style="padding-top: 4.5rem"
  >
    <trait-list />
  </div>
</template>

<style lang="scss">
:target {
  padding-top: 4.5rem;
  margin-top: -4.5rem;
}
</style>
