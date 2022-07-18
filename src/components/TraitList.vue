<script lang="ts" setup>
import { useBrowserLocation } from "@vueuse/core";
import { useTraitStore, Trait, TraitCategory } from "../stores/traits";

const { categories } = useTraitStore();

const location = useBrowserLocation();

const isSelected = (trait: Trait | TraitCategory) =>
  location.value.hash ===
  ("traits" in trait ? `#category-${trait.name}` : `#trait-${trait.name}`);
</script>

<template>
  <div class="d-flex">
    <div
      class="position-sticky me-4 pe-3 overflow-auto flex-shrink-0"
      style="max-height: calc(100vh - 5.5rem); top: 4.5rem"
    >
      <ul class="nav flex-column">
        <li
          v-for="category in categories"
          :key="category.name"
          class="nav-item"
        >
          <a
            class="nav-link"
            :href="`#category-${category.name}`"
            :class="isSelected(category) && 'active'"
          >
            {{ category.name }}
          </a>
          <ul class="nav flex-column">
            <li
              v-for="trait in category.traits"
              :key="trait.name"
              class="nav-item ms-3"
            >
              <a
                class="nav-link"
                :href="`#trait-${trait.name}`"
                :class="isSelected(trait) && 'active'"
              >
                {{ trait.name }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <ul class="list-unstyled">
      <li
        v-for="category in categories"
        :id="`category-${category.name}`"
        :key="category.name"
      >
        <div class="h5 luminari">
          {{ category.name }}
        </div>
        <ul class="list-unstyled row gx-2 gy-2 mb-3">
          <div
            v-for="trait in category.traits"
            :key="trait.name"
            class="col-lg-4 col-md-6 col-12 d-flex"
          >
            <li
              class="card"
              :class="isSelected(trait) ? 'border-primary shadow' : 'shadow-sm'"
            >
              <div class="card-header">
                <div
                  :id="`trait-${trait.name}`"
                  class="card-title luminari mb-0"
                >
                  {{ trait.name }}
                </div>
              </div>

              <div class="card-body">
                <p>{{ trait.description }}</p>

                <p class="luminari">
                  Choose 1-2 they can always do:
                </p>

                <ul>
                  <li
                    v-for="item in trait.canAlways"
                    :key="item"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </li>
          </div>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.nav-link {
  border-radius: 0.25rem;
  padding-top: 0.125rem !important;
  padding-bottom: 0.125rem !important;
}
.nav-link.active {
  background: var(--bs-primary);
  color: var(--bs-white);
}
</style>
