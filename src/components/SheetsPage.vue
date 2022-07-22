<script lang="ts" setup>
import StickySidebarView from "./StickySidebarView.vue";
import { resetStore } from "../stores/reset-plugin";
import { useRouter } from "vue-router";
import Icon from "./Icon.vue";
import { useSheetsStore } from "../stores/sheets";
import sheetTypes, { SheetType } from "../lib/sheet-definitions";
import { computed } from "vue";
import { keys, orderBy, values, capitalize } from "lodash-es";
import Sheet from "./Sheet.vue";
import pluralize from "../lib/pluralize";
import { runTest } from "../lib/test-pdf-lib";

const sheetsStore = useSheetsStore();
const router = useRouter();

const addSheet = (type: SheetType) => {
  const sheet = sheetsStore.createSheet(type);
  router.push({ hash: `#${sheet.type}-${sheet.id}` });
};

const orderedSheetsByType = computed(() =>
  keys(sheetTypes)
    .map((type) => ({
      type,
      sheets: orderBy(
        values(sheetsStore.sheets).filter((s) => s.type === type),
        (s) => new Date(s.created),
        "desc"
      ),
    }))
    .filter((group) => !!group.sheets.length)
);

runTest();
</script>

<template>
  <sticky-sidebar-view>
    <template #sidebar>
      <template
        v-for="{ type, sheets } in orderedSheetsByType"
        :key="type"
      >
        <p class="h6 px-2 mb-1">
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
              {{ sheet.fields.name || "unnamed" }}
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
        v-for="sheetType in keys(sheetTypes)"
        :key="sheetType"
        type="button"
        class="btn btn-minimal"
        @click="addSheet(sheetType as SheetType)"
      >
        <icon name="plus" />
        Create {{ capitalize(sheetType) }}
      </button>
    </div>

    <div class="row g-3 mb-3 align-items-stretch">
      <template
        v-for="{ type, sheets } in orderedSheetsByType"
        :key="type"
      >
        <sheet
          v-for="sheet in sheets"
          :key="sheet.id"
          :sheet-id="sheet.id"
        />
      </template>
    </div>
  </sticky-sidebar-view>
</template>
