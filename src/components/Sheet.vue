<script lang="ts" setup>
import { computed } from "vue";
import sheetTypes, { SheetType } from "../lib/sheet-definitions";
import { UID } from "../lib/uid";
import { useSheetsStore } from "../stores/sheets";
import KithFields from "./KithFields.vue";
import CharacterFields from "./CharacterFields.vue";
import PlaceFields from "./PlaceFields.vue";
import SeasonFields from "./SeasonFields.vue";
import buildPdf from "../lib/build-pdf";
import ShareCode from "./ShareCode.vue";
import Icon from "./Icon.vue";

const props = defineProps<{
  sheetId: UID;
}>();

const store = useSheetsStore();
const sheet = computed(() => store.getSheet(props.sheetId));

const anchor = computed(() => `${sheet.value.type}-${sheet.value.id}`);

const componentsByType = {
  kith: KithFields,
  character: CharacterFields,
  place: PlaceFields,
  season: SeasonFields,
};

const sheetType = computed(() => sheetTypes[sheet.value.type as SheetType]);

const component = computed(
  () => componentsByType[sheet.value.type as SheetType]
);

const remove = () => {
  store.removeSheet(sheet.value.id);
};

const openPdf = () => buildPdf(sheet.value);

const sendToStash = () => {
  sheet.value.isOnTable = false;
};
</script>

<template>
  <div :class="sheetType.columns">
    <div
      :id="anchor"
      class="card"
    >
      <div class="card-header d-flex justify-content-end p-0 border-0">
        <button
          class="btn btn-minimal"
          @click="openPdf"
        >
          <icon
            name="file-earmark"
            class="me-1"
          />Print
        </button>
        <share-code :sheets="[sheet]" />
        <button
          class="btn btn-minimal"
          @click="remove"
        >
          <icon
            name="trash3"
            class="me-1"
          />Delete
        </button>
      </div>

      <div class="card-body">
        <component
          :is="component"
          v-model="sheet.fields"
        />
      </div>

      <div class="card-footer d-flex justify-content-end p-0 border-0">
        <button
          class="btn btn-minimal flex-fill"
          @click="sendToStash"
        >
          <icon
            name="arrow-bar-left"
            class="me-1"
          />Stash
        </button>
      </div>
    </div>
  </div>
</template>
