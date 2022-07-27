<script lang="ts" setup>
import { useSheetsStore } from "../stores/sheets";
import sheetTypes from "../lib/sheet-definitions";
import { computed } from "vue";
import { keys } from "lodash-es";
import Sheet from "./Sheet.vue";
import NavigationSidebar from "./NavigationSidebar.vue";

const store = useSheetsStore();

const sheetsByType = (isOnTable: boolean) =>
  keys(sheetTypes)
    .map((type) => ({
      type,
      sheets: store.getSheets({ type, isOnTable }),
    }))
    .filter(({ sheets }) => !!sheets.length);

const tableSheets = computed(() => sheetsByType(true));
</script>

<template>
  <div class="row">
    <div class="col-lg-2 col-sm-3 col-12">
      <navigation-sidebar />
    </div>

    <div class="col">
      <div
        v-for="{ type, sheets } in tableSheets"
        :key="type"
        class="row g-3 mb-3 align-items-stretch"
      >
        <sheet
          v-for="sheet in sheets"
          :key="sheet.id"
          :sheet-id="sheet.id"
        />
      </div>
    </div>
  </div>
</template>
