<script lang="ts" setup>
import StickySidebarView from "./StickySidebarView.vue";
import { Kith, useKithStore } from "../stores/kith";
import { useRoute, useRouter } from "vue-router";

const { kith: kithList, createKith } = useKithStore();

const router = useRouter();

const addKith = () => {
  const kith = createKith();
  router.push({ hash: `#${getId(kith)}` });
};

const route = useRoute();
const getId = (kith: Kith) => `kith-${kith.uid}`;
const isSelected = (kith: Kith) => route.hash === `#${getId(kith)}`;
</script>

<template>
  <sticky-sidebar-view>
    <template #sidebar>
      <p class="h6 px-3 mb-1">
        Kith
      </p>
      <ul class="nav flex-column mb-2">
        <li
          v-for="kith in kithList"
          :key="kith.uid"
          class="nav-item"
        >
          <router-link
            class="nav-link py-0"
            :to="`#${getId(kith)}`"
            @click.prevent
          >
            {{ kith.name || "(unnamed)" }}
          </router-link>
        </li>
      </ul>

      <div class="px-3">
        <button
          type="button"
          class="btn btn-sm btn-outline-primary"
          @click.prevent="addKith"
        >
          add kith
        </button>
      </div>
    </template>

    <p class="h4 luminari">
      Kith
    </p>

    <ul class="list-unstyled row gx-2 gy-2 mb-3">
      <div
        v-for="kith in kithList"
        :key="kith.uid"
        class="col-lg-4 col-md-6 col-12 d-flex"
      >
        <li
          :id="getId(kith)"
          class="card flex-fill"
          :class="isSelected(kith) ? 'border-primary shadow' : 'shadow-sm'"
        >
          <div class="card-header">
            <div class="card-title luminari mb-0">
              {{ kith.name || "(unnamed)" }}
            </div>
          </div>

          <div class="card-body" />
        </li>
      </div>
    </ul>
  </sticky-sidebar-view>
</template>

<style scoped lang="scss"></style>
