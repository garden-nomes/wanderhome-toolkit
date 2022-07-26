<script lang="ts" setup>
import { computed } from "vue";
import sheetTypes, { SheetType } from "../lib/sheet-definitions";
import { UID } from "../lib/uid";
import { useSheetsStore } from "../stores/sheets";
import Card from "./Card.vue";
import KithFields from "./KithFields.vue";
import CharacterFields from "./CharacterFields.vue";
import PlaceFields from "./PlaceFields.vue";
import SeasonFields from "./SeasonFields.vue";
import buildPdf from "../lib/build-pdf";
import ShareCode from "./ShareCode.vue";

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
  <div
    :class="sheetType.columns"
    class="d-flex flex-column"
  >
    <card :id="anchor">
      <template #header>
        <div class="d-flex justify-content-end px-2">
          <button
            class="btn btn-minimal"
            @click="remove"
          >
            Remove
          </button>
          <button
            class="btn btn-minimal"
            @click="openPdf"
          >
            Print
          </button>
          <button
            class="btn btn-minimal"
            @click="sendToStash"
          >
            Stash
          </button>
          <share-code :sheets="[sheet]" />
        </div>
      </template>

      <component
        :is="component"
        v-model="sheet.fields"
      />
    </card>
  </div>
</template>
