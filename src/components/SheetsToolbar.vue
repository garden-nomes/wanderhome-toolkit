<script lang="ts" setup>
import { computed, ref } from "vue";
import { capitalize, keys } from "lodash-es";
import { useRouter } from "vue-router";
import Icon from "./Icon.vue";
import sheetTypes, { SheetType } from "../lib/sheet-definitions";
import { resetStore } from "../stores/reset-plugin";
import { useSheetsStore } from "../stores/sheets";
import ShareCode from "./ShareCode.vue";
import AddFromShareCode from "./AddFromShareCode.vue";

const store = useSheetsStore();

const router = useRouter();
const addSheet = (type: SheetType) => {
  const sheet = store.createSheet(type);
  router.push({ hash: `#${sheet.type}-${sheet.id}` });
};

const tableSheetsFlat = computed(() => store.getSheets({ isOnTable: true }));

const collapseToggle = ref(false);
</script>

<template>
  <div class="navbar navbar-expand-md sticky-top border-bottom bg-body">
    <div class="container">
      <div
        class="navbar-brand ruritania"
        title="Wanderhome Toolkit"
      >
        W
      </div>

      <button
        class="btn btn-lg btn-minimal d-md-none"
        type="button"
        @click="collapseToggle = !collapseToggle"
      >
        <icon name="list" />
      </button>

      <div
        class="collapse navbar-collapse"
        :class="collapseToggle && 'show'"
      >
        <div class="d-flex justify-content-center">
          <button
            :disabled="!store.canUndo"
            class="btn btn-minimal text-start text-nowrap"
            @click="store.undo()"
          >
            <icon
              name="arrow-counterclockwise"
              class="me-1"
            />Undo
          </button>

          <button
            :disabled="!store.canRedo"
            class="btn btn-minimal text-start text-nowrap"
            @click="store.redo()"
          >
            <icon
              name="arrow-clockwise"
              class="me-1"
            />Redo
          </button>
        </div>

        <div class="d-flex justify-content-center">
          <button
            v-for="sheetType in keys(sheetTypes)"
            :key="sheetType"
            type="button"
            class="btn btn-minimal text-start text-nowrap"
            @click="addSheet(sheetType as SheetType)"
          >
            <icon
              name="plus"
              class="me-1"
            />{{ capitalize(sheetType) }}
          </button>
        </div>

        <div class="ms-auto d-flex justify-content-center">
          <add-from-share-code @add="store.addSheets" />

          <share-code :sheets="tableSheetsFlat">
            Copy share code for table
          </share-code>
        </div>

        <div class="d-flex justify-content-center">
          <button
            class="btn btn-minimal"
            @click="resetStore"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
