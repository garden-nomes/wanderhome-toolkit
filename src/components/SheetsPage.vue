<script lang="ts" setup>
import StickySidebarView from "./StickySidebarView.vue";
import { resetStore } from "../stores/reset-plugin";
import { useRouter } from "vue-router";
import Icon from "./Icon.vue";
import { useSheetsStore } from "../stores/sheets";
import sheetTypes, { SheetType } from "../lib/sheet-definitions";
import { computed } from "vue";
import { keys, capitalize } from "lodash-es";
import Sheet from "./Sheet.vue";
import pluralize from "../lib/pluralize";
import { UID } from "../lib/uid";
import AddFromShareCode from "./AddFromShareCode.vue";
import ShareCode from "./ShareCode.vue";

const store = useSheetsStore();
const router = useRouter();

const addSheet = (type: SheetType) => {
  const sheet = store.createSheet(type);
  router.push({ hash: `#${sheet.type}-${sheet.id}` });
};

const sheetsByType = (isOnTable: boolean) =>
  keys(sheetTypes)
    .map((type) => ({
      type,
      sheets: store.getSheets({ type, isOnTable }),
    }))
    .filter(({ sheets }) => !!sheets.length);

const tableSheets = computed(() => sheetsByType(true));
const stashSheets = computed(() => sheetsByType(false));

const tableSheetsFlat = computed(() => store.getSheets({ isOnTable: true }));

const unstash = (id: UID) => {
  const sheet = store.getSheet(id);
  sheet.isOnTable = true;
  router.push({ hash: `#${sheet.type}-${sheet.id}` });
};
</script>

<template>
  <sticky-sidebar-view>
    <template #sidebar>
      <p
        v-if="tableSheets.length"
        class="fw-bold mb-0"
      >
        Table
      </p>

      <template
        v-for="{ type, sheets } in tableSheets"
        :key="type"
      >
        <p class="px-2 mb-0 small">
          {{ capitalize(pluralize(type)) }}
        </p>

        <ul class="list-unstyled mb-2">
          <li
            v-for="sheet in sheets"
            :key="sheet.id"
          >
            <router-link
              class="btn btn-minimal py-1 w-100 text-start"
              :class="!sheet.fields.name && 'fst-italic'"
              :to="`#${sheet.type}-${sheet.id}`"
            >
              {{ sheet.fields.name || `unnamed ${sheet.type}` }}
            </router-link>
          </li>
        </ul>
      </template>

      <p
        v-if="stashSheets.length"
        class="fw-bold mb-0"
      >
        Stash
      </p>

      <template
        v-for="{ type, sheets } in stashSheets"
        :key="type"
      >
        <p class="px-2 mb-0 small">
          {{ capitalize(pluralize(type)) }}
        </p>

        <ul class="list-unstyled mb-2">
          <li
            v-for="sheet in sheets"
            :key="sheet.id"
          >
            <button
              class="btn btn-minimal py-1 w-100 text-start"
              :class="!sheet.fields.name && 'fst-italic'"
              @click="unstash(sheet.id)"
            >
              {{ sheet.fields.name || `unnamed ${sheet.type}` }}
            </button>
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

    <div
      class="d-flex align-items-end mb-3 position-sticky top-0 bg-white border-bottom py-2"
      style="z-index: 1020"
    >
      <button
        :disabled="!store.canUndo"
        class="btn btn-minimal"
        @click="store.undo()"
      >
        <icon
          name="arrow-counterclockwise"
          class="me-1"
        />Undo
      </button>

      <button
        :disabled="!store.canRedo"
        class="btn btn-minimal"
        @click="store.redo()"
      >
        <icon
          name="arrow-clockwise"
          class="me-1"
        />Redo
      </button>

      <button
        v-for="sheetType in keys(sheetTypes)"
        :key="sheetType"
        type="button"
        class="btn btn-minimal"
        @click="addSheet(sheetType as SheetType)"
      >
        <icon
          name="plus"
          class="me-1"
        />{{ capitalize(sheetType) }}
      </button>

      <share-code
        :sheets="tableSheetsFlat"
        class="ms-auto"
      >
        Copy share code for table
      </share-code>

      <add-from-share-code @add="store.addSheets" />
    </div>

    <template
      v-for="{ type, sheets } in tableSheets"
      :key="type"
    >
      <p class="luminari mb-3 fs-2">
        {{ pluralize(capitalize(type)) }}
      </p>
      <div class="row g-3 mb-3 align-items-stretch">
        <sheet
          v-for="sheet in sheets"
          :key="sheet.id"
          :sheet-id="sheet.id"
        />
      </div>
    </template>
  </sticky-sidebar-view>
</template>
