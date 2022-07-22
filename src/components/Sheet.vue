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
  if (
    confirm(
      `Permanently remove this ${sheet.value.type}? Remember, there's no undo. (Yet.)`
    )
  ) {
    store.removeSheet(sheet.value.id);
  }
};

const openPdf = () => buildPdf(sheet.value);
</script>

<template>
  <div :class="`col-12 col-lg-${sheetType.columns}`">
    <card :id="anchor">
      <component
        :is="component"
        v-model="sheet.fields"
      />
    </card>

    <div class="text-center">
      <button
        class="btn btn-sm btn-minimal"
        @click="remove"
      >
        Remove
      </button>
      <button
        class="btn btn-sm btn-minimal"
        @click="openPdf"
      >
        Print
      </button>
    </div>
  </div>
</template>
