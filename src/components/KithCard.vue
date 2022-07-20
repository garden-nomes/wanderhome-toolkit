<script lang="ts" setup>
import { computed, watch } from "vue";
import { useKithStore } from "../stores/kith";
import Card from "./Card.vue";
import EditableList from "./EditableList.vue";
import TraitSelector from "./TraitSelector.vue";
import EditableText from "./EditableText.vue";
import KithCanAlways from "./KithCanAlways.vue";
import { useTraitStore } from "../stores/traits";

const props = defineProps<{
  kithId: string;
}>();

const { getOrThrow } = useKithStore();
const kith = computed(() => getOrThrow(props.kithId));

const traits = useTraitStore();

watch(
  kith,
  () => {
    kith.value.canAlways = kith.value.canAlways.filter((option) =>
      kith.value.traits.some((t) =>
        traits.getOrThrow(t).canAlways.includes(option)
      )
    );
  },
  { deep: true }
);
</script>

<template>
  <card
    :hash="`kith-${kith.uid}`"
    class="kith-card"
  >
    <div class="mb-3">
      <div class="row gx-2 mb-2">
        <div class="col-7">
          <editable-text
            v-model="kith.name"
            label="Name"
          />
        </div>

        <div class="col">
          <editable-text
            v-model="kith.pronouns"
            label="Pronouns"
          />
        </div>
      </div>

      <editable-text
        v-model="kith.form"
        label="Animal form"
      />
    </div>

    <div class="d-flex justify-content-between mb-3">
      <div>
        <div class="luminari">
          Traits
        </div>
        <div>{{ kith.traits.join(", ") }}</div>
      </div>

      <trait-selector
        v-model="kith.traits"
        class="ms-auto"
      />
    </div>

    <kith-can-always
      v-model="kith.canAlways"
      :traits="kith.traits"
      class="mb-3"
    />

    <editable-list
      v-model="kith.relationships"
      label="Key relationships"
      add-label="Add relationship"
    />
    <editable-list
      v-model="kith.details"
      label="Details"
      add-label="Add detail"
    />
    <editable-list
      v-model="kith.notes"
      label="Notes"
      add-label="Add note"
    />
  </card>
</template>

<style lang="scss" scoped>
.kith-card {
  max-height: calc(100vh - 9rem);
  width: 30rem;
  overflow-y: auto;
}
</style>
