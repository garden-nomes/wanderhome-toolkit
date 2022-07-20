<script lang="ts" setup>
import StickySidebarView from "./StickySidebarView.vue";
import { Kith, useKithStore } from "../stores/kith";
import { useRouter } from "vue-router";
import KithCard from "./KithCard.vue";
import Icon from "./Icon.vue";
import { Place, usePlacesStore } from "../stores/places";
import PlaceCard from "./PlaceCard.vue";

const { kith: kithList, createKith } = useKithStore();
const { places, createPlace } = usePlacesStore();

const router = useRouter();

const addKith = () => {
  const kith = createKith();
  router.push({ hash: `#${kithAnchor(kith)}` });
};

const removeKith = (id: string) => {
  kithList.splice(
    kithList.findIndex((k) => k.uid === id),
    1
  );
};

const addPlace = () => {
  const place = createPlace();
  router.push({ hash: `#${placeAnchor(place)}` });
};

const removePlace = (id: string) => {
  places.splice(
    places.findIndex((k) => k.uid === id),
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
      <ul class="nav flex-column mb-2">
        <li
          v-for="kith in kithList"
          :key="kith.uid"
          class="nav-item"
        >
          <router-link
            class="nav-link py-0"
            :to="`#${kithAnchor(kith)}`"
            @click.prevent
          >
            {{ kith.name || "(unnamed)" }}
          </router-link>
        </li>
      </ul>
    </template>

    <div class="d-flex align-items-end mb-3">
      <p class="h4 luminari me-2 mb-0">
        Kith
      </p>

      <div class="ms-auto">
        <button
          type="button"
          class="btn btn-minimal"
          @click="addKith"
        >
          <icon name="plus" />
          add kith
        </button>
      </div>
    </div>

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

        <div class="d-flex justify-content-center">
          <button
            class="btn btn-minimal"
            @click="removeKith(kith.uid)"
          >
            remove
          </button>
        </div>
      </div>
    </div>

    <div class="d-flex align-items-end mb-3">
      <p class="h4 luminari me-2 mb-0">
        Places
      </p>

      <div class="ms-auto">
        <button
          type="button"
          class="btn btn-minimal"
          @click="addPlace"
        >
          <icon name="plus" />
          add place
        </button>
      </div>
    </div>

    <div class="row g-3">
      <div
        v-for="place in places"
        :key="place.uid"
        class="col-auto"
      >
        <place-card :id="place.uid" />

        <div class="d-flex justify-content-center">
          <button
            class="btn btn-minimal"
            @click="removePlace(place.uid)"
          >
            remove
          </button>
        </div>
      </div>
    </div>
  </sticky-sidebar-view>
</template>
