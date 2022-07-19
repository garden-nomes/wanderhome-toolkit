<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useTraitStore, Trait, TraitCategory } from "../stores/traits";
import StickySidebarView from "./StickySidebarView.vue";

const { categories } = useTraitStore();

const route = useRoute();

const getId = (trait: Trait | TraitCategory) =>
  "traits" in trait ? `category-${trait.name}` : `trait-${trait.name}`;

const isSelected = (trait: Trait | TraitCategory) =>
  route.hash === "#" + getId(trait);
</script>

<template>
  <sticky-sidebar-view>
    <template #sidebar>
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
              <router-link
                class="nav-link"
                :to="`#${getId(trait)}`"
                :class="isSelected(trait) && 'active'"
              >
                {{ trait.name }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </template>

    <ul class="list-unstyled">
      <li
        v-for="category in categories"
        :id="getId(category)"
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
              :id="getId(trait)"
              class="card"
              :class="isSelected(trait) ? 'border-primary shadow' : 'shadow-sm'"
            >
              <div class="card-header">
                <div class="card-title luminari mb-0">
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
  </sticky-sidebar-view>
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
