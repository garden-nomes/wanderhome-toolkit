<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "app",
});
</script>

<template>
  <nav class="navbar navbar-expand bg-light navbar-light">
    <div class="container-fluid justify-content-start">
      <span class="navbar-brand luminari">Wanderhome Toolkit</span>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              to="/sheets"
              class="nav-link"
              active-class="active"
            >
              Sheets
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/traits"
              class="nav-link"
              active-class="active"
            >
              Traits
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container-fluid py-3">
    <router-view />
  </div>
</template>
