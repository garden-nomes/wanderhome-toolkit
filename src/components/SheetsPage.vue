<script lang="ts" setup>
import StickySidebarView from "./StickySidebarView.vue";
import { resetStore } from "../stores/reset-plugin";
import { Kith, useKithStore } from "../stores/kith";
import { useRouter } from "vue-router";
import KithCard from "./KithCard.vue";
import Icon from "./Icon.vue";
import { Place, usePlacesStore } from "../stores/places";
import PlaceCard from "./PlaceCard.vue";

const kithStore = useKithStore();
const placeStore = usePlacesStore();

const router = useRouter();

const addKith = () => {
  const kith = kithStore.createKith();
  router.push({ hash: `#${kithAnchor(kith)}` });
};

const removeKith = (id: string) => {
  kithStore.kith.splice(
    kithStore.kith.findIndex((k) => k.uid === id),
    1
  );
};

const addPlace = () => {
  const place = placeStore.createPlace();
  router.push({ hash: `#${placeAnchor(place)}` });
};

const removePlace = (id: string) => {
  placeStore.places.splice(
    placeStore.places.findIndex((k) => k.uid === id),
    1
  );
};

const kithAnchor = (kith: Kith) => `kith-${kith.uid}`;
const placeAnchor = (place: Place) => `place-${place.uid}`;
</script>

<template>
  <sticky-sidebar-view>
    <template #sidebar>
      <p class="h6 px-3 mb-1">
        Kith
      </p>

      <ul class="list-unstyled mb-2">
        <li
          v-for="kith in kithStore.kith"
          :key="kith.uid"
        >
          <router-link
            class="btn btn-minimal py-1 w-100 text-start"
            :to="`#${kithAnchor(kith)}`"
            @click.prevent
          >
            {{ kith.name || "(unnamed kith)" }}
          </router-link>
        </li>
      </ul>

      <p class="h6 px-3 mb-1">
        Places
      </p>

      <ul class="list-unstyled mb-2">
        <li
          v-for="place in placeStore.places"
          :key="place.uid"
        >
          <router-link
            class="btn btn-minimal py-1 w-100 text-start"
            :to="`#${placeAnchor(place)}`"
            @click.prevent
          >
            {{ place.name || "(unnamed place)" }}
          </router-link>
        </li>
      </ul>

      <button
        class="btn btn-minimal mb-3"
        @click="resetStore"
      >
        Reset
      </button>
    </template>

    <div class="d-flex align-items-end mb-3">
      <button
        type="button"
        class="btn btn-minimal"
        @click="addKith"
      >
        <icon name="plus" />
        Create Kith
      </button>

      <button
        type="button"
        class="btn btn-minimal"
        @click="addPlace"
      >
        <icon name="plus" />
        Create Place
      </button>
    </div>

    <div class="row g-3 mb-3">
      <div
        v-for="kith in kithStore.kith"
        :key="kith.uid"
        class="col-lg-6"
      >
        <kith-card :kith-id="kith.uid" />
      </div>
    </div>

    <div class="row g-3">
      <div
        v-for="place in placeStore.places"
        :key="place.uid"
        class="col-12"
      >
        <place-card :id="place.uid" />
      </div>
    </div>
  </sticky-sidebar-view>
</template>
