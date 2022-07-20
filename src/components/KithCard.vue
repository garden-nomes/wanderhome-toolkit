<script lang="ts" setup>
import { ref, watch } from "vue";
import { useKithStore } from "../stores/kith";
import Card from "./Card.vue";
import EditableList from "./EditableList.vue";
import EditableText from "./EditableText.vue";
import { useTraitStore } from "../stores/traits";
import CategorizedItemToggler from "./CategorizedItemToggler.vue";
import Icon from "./Icon.vue";
import AddFromItems from "./AddFromItems.vue";

const props = defineProps<{
  kithId: string;
}>();

const { getOrThrow } = useKithStore();

const kith = ref(getOrThrow(props.kithId));
watch(
  () => props.kithId,
  () => {
    kith.value = getOrThrow(props.kithId);
  }
);

const traits = useTraitStore();
</script>

<template>
  <card :hash="`kith-${kith.uid}`">
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

      <div class="ms-auto">
        <categorized-item-toggler
          v-model="kith.traits"
          :categories="traits.categories"
          class="btn btn-minimal"
        >
          <icon name="plus" />Select traits
        </categorized-item-toggler>
      </div>
    </div>

    <add-from-items
      v-model="kith.canAlways"
      :items="kith.traits.map((t) => traits.getOrThrow(t))"
      selector="canAlways"
      instructions="Choose 1-2 from each trait."
      select-label="Select from traits"
      class="mb-3"
    >
      This kith can always
    </add-from-items>

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

<style lang="scss" scoped></style>
