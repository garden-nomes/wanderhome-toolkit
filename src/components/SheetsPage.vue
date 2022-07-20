<script lang="ts" setup>
import StickySidebarView from "./StickySidebarView.vue";
import { Kith, useKithStore } from "../stores/kith";
import { useRouter } from "vue-router";
import KithCard from "./KithCard.vue";
import CardList from "./CardList.vue";

const { kith: kithList, createKith } = useKithStore();

const router = useRouter();

const addKith = () => {
  const kith = createKith();
  router.push({ hash: `#${getId(kith)}` });
};

const removeKith = (id: string) => {
  kithList.splice(
    kithList.findIndex((k) => k.uid === id),
    1
  );
};

const getId = (kith: Kith) => `kith-${kith.uid}`;
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
          @click="addKith"
        >
          add kith
        </button>
      </div>
    </template>

    <p class="h4 luminari">
      Kith
    </p>

    <div class="row g-3">
      <div
        v-for="kith in kithList"
        :key="kith.uid"
        class="col-auto"
      >
        <kith-card
          :kith-id="kith.uid"
          class="col-3"
          @remove="removeKith(kith.uid)"
        />
      </div>
    </div>
  </sticky-sidebar-view>
</template>
