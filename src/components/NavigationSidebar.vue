<script setup lang="ts">
import { useResizeObserver } from "@vueuse/core";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSheetsStore } from "../stores/sheets";
import sheetTypes from "../lib/sheet-definitions";
import { computed } from "vue";
import { keys, capitalize } from "lodash-es";
import pluralize from "../lib/pluralize";
import { UID } from "../lib/uid";
import Icon from "./Icon.vue";

const store = useSheetsStore();
const router = useRouter();

const sheetsByType = (isOnTable: boolean) =>
  keys(sheetTypes)
    .map((type) => ({
      type,
      sheets: store.getSheets({ type, isOnTable }),
    }))
    .filter(({ sheets }) => !!sheets.length);

const tableSheets = computed(() => sheetsByType(true));
const stashSheets = computed(() => sheetsByType(false));

const unstash = (id: UID) => {
  const sheet = store.getSheet(id);
  sheet.isOnTable = true;
  router.push({ hash: `#${sheet.type}-${sheet.id}` });
};

const scrollEl = ref<HTMLElement>();
useResizeObserver(scrollEl, () => {
  if (!scrollEl.value) return;
  const { top } = scrollEl.value.getBoundingClientRect();
  const paddingBottom = 32;
  scrollEl.value.style.top = `${top}px`;
  scrollEl.value.style.maxHeight = `calc(100vh - ${top + paddingBottom}px)`;
});
</script>

<template>
  <div
    ref="scrollEl"
    class="sidebar"
  >
    <div
      v-if="tableSheets.length"
      class="mb-3"
    >
      <p class="fw-bold mb-0">
        Open Sheets
      </p>

      <ul class="list-unstyled mb-1">
        <template
          v-for="{ type, sheets } in tableSheets"
          :key="type"
        >
          <li
            v-for="sheet in sheets"
            :key="sheet.id"
          >
            <router-link
              class="btn btn-minimal py-1 px-2 w-100 text-start"
              :class="!sheet.fields.name && 'fst-italic'"
              :to="`#${sheet.type}-${sheet.id}`"
            >
              {{ sheet.fields.name || `unnamed ${sheet.type}` }}
            </router-link>
          </li>
        </template>
      </ul>
    </div>

    <div v-if="stashSheets.length">
      <p class="fw-bold mb-0">
        Stashed Sheets
      </p>

      <template
        v-for="{ type, sheets } in stashSheets"
        :key="type"
      >
        <p class="mb-0 small">
          {{ capitalize(pluralize(type)) }}
        </p>

        <ul class="list-unstyled mb-2">
          <li
            v-for="sheet in sheets"
            :key="sheet.id"
          >
            <button
              class="btn btn-minimal d-flex align-items-center py-1 w-100 text-start"
              :class="!sheet.fields.name && 'fst-italic'"
              @click="unstash(sheet.id)"
            >
              <div>{{ sheet.fields.name || `unnamed ${sheet.type}` }}</div>
              <icon
                name="arrow-bar-right"
                class="ms-auto"
              />
            </button>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  @media (max-width: 991.98px) {
    max-height: none !important;
  }

  @media (min-width: 991.98px) {
    position: sticky;
    overflow-y: auto;
  }
}
</style>
