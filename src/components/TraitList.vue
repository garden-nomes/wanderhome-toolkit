<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useTraitStore, Trait, TraitCategory } from "../stores/traits";
import StickySidebarView from "./StickySidebarView.vue";
import TraitCard from "./TraitCard.vue";
import CardList from "./CardList.vue";

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
          <router-link
            class="nav-link"
            :to="`#category-${category.name}`"
            :class="isSelected(category) && 'active'"
          >
            {{ category.name }}
          </router-link>
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

        <card-list>
          <trait-card
            v-for="trait in category.traits"
            :id="getId(trait)"
            :key="trait.name"
            :trait-name="trait.name"
          />
        </card-list>
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
