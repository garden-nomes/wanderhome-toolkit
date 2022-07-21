<script lang="ts" setup>
import StickySidebarView from "./StickySidebarView.vue";
import { resetStore } from "../stores/reset-plugin";
import { Kith, useKithStore } from "../stores/kith";
import { useRouter } from "vue-router";
import KithCard from "./KithCard.vue";
import Icon from "./Icon.vue";
import { Place, usePlacesStore } from "../stores/places";
import PlaceCard from "./PlaceCard.vue";
import { Playbook, usePlaybooksStore } from "../stores/playbooks";
import PlaybookCard from "./PlaybookCard.vue";

const kithStore = useKithStore();
const placeStore = usePlacesStore();
const playbookStore = usePlaybooksStore();

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

const addPlaybook = () => {
  const playbook = playbookStore.createPlaybook();
  router.push({ hash: `#${playbookAnchor(playbook)}` });
};

const removePlaybook = (id: string) => {
  playbookStore.playbooks.splice(
    playbookStore.playbooks.findIndex((k) => k.uid === id),
    1
  );
};

const kithAnchor = (kith: Kith) => `kith-${kith.uid}`;
const placeAnchor = (place: Place) => `place-${place.uid}`;
const playbookAnchor = (playbook: Playbook) => `playbook-${playbook.uid}`;
</script>

<template>
  <sticky-sidebar-view>
    <template #sidebar>
      <template v-if="playbookStore.playbooks.length">
        <p class="h6 px-3 mb-1">
          Playbooks
        </p>
        <ul class="list-unstyled mb-2">
          <li
            v-for="playbook in playbookStore.playbooks"
            :key="playbook.uid"
          >
            <router-link
              class="btn btn-minimal py-1 w-100 text-start"
              :to="`#${playbookAnchor(playbook)}`"
              @click.prevent
            >
              {{ playbook.name || "(unnamed playbook)" }}
            </router-link>
          </li>
        </ul>
      </template>

      <template v-if="kithStore.kith.length">
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
      </template>

      <template v-if="placeStore.places.length">
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
      </template>

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
        @click="addPlaybook"
      >
        <icon name="plus" />
        Create Playbook
      </button>

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
        v-for="playbook in playbookStore.playbooks"
        :key="playbook.uid"
        class="col-12"
      >
        <playbook-card :id="playbook.uid" />
        <div class="text-end">
          <button
            class="btn btn-minimal py-0"
            @click="removePlaybook(playbook.uid)"
          >
            remove
          </button>
        </div>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div
        v-for="kith in kithStore.kith"
        :key="kith.uid"
        class="col-lg-6"
      >
        <kith-card :kith-id="kith.uid" />
        <div class="text-end">
          <button
            class="btn btn-minimal py-0"
            @click="removeKith(kith.uid)"
          >
            remove
          </button>
        </div>
      </div>
    </div>

    <div class="row g-3">
      <div
        v-for="place in placeStore.places"
        :key="place.uid"
        class="col-12"
      >
        <place-card :id="place.uid" />
        <div class="text-end">
          <button
            class="btn btn-minimal py-0"
            @click="removePlace(place.uid)"
          >
            remove
          </button>
        </div>
      </div>
    </div>
  </sticky-sidebar-view>
</template>
