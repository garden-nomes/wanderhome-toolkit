<script lang="ts" setup>
import { ref, watch } from "vue";
import { useNaturesStore } from "../stores/natures";
import { usePlacesStore } from "../stores/places";
import Card from "./Card.vue";
import EditableList from "./EditableList.vue";
import EditableText from "./EditableText.vue";
import Icon from "./Icon.vue";
import CategorizedItemToggler from "./CategorizedItemToggler.vue";

const props = defineProps<{
  id: string;
}>();

const { getOrThrow } = usePlacesStore();

const place = ref(getOrThrow(props.id));
watch(
  () => props.id,
  () => {
    place.value = getOrThrow(props.id);
  }
);

const natures = useNaturesStore();
</script>

<template>
  <card
    :hash="`place-${place.uid}`"
    class="place-card"
  >
    <div class="mb-3">
      <editable-text
        v-model="place.name"
        label="Name"
      />
    </div>

    <div class="d-flex justify-content-between mb-3">
      <div>
        <div class="luminari">
          Natures
        </div>
        <div>{{ place.natures.join(", ") }}</div>
      </div>

      <div class="ms-auto">
        <categorized-item-toggler
          v-model="place.natures"
          :categories="natures.categories"
          class="btn btn-minimal"
        >
          <icon name="plus" />Select natures
        </categorized-item-toggler>
      </div>
    </div>

    <editable-list
      v-model="place.notes"
      label="Notes"
      add-label="Add note"
    />
  </card>
</template>

<style lang="scss" scoped>
.place-card {
  max-height: calc(100vh - 9rem);
  width: 30rem;
  overflow-y: auto;
}
</style>
