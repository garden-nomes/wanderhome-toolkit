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
    <div class="row mb-3">
      <div class="col-4 d-flex justify-content-center align-items-center">
        <h2 class="luminari fancy-cap">
          Kith
        </h2>
      </div>

      <div class="col">
        <div class="row gx-2 justify-content-end">
          <div class="col-12">
            <editable-text
              v-model="kith.name"
              label="Name"
            />
          </div>
          <div class="col-6">
            <editable-text
              v-model="kith.pronouns"
              label="Pronouns"
            />
          </div>
          <div class="col-6">
            <editable-text
              v-model="kith.form"
              label="Animal form"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between mb-3">
      <div>
        <div class="d-flex">
          <div class="luminari">
            Traits
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
        <ul class="list-unstyled mb-0 row">
          <li
            v-for="trait in kith.traits"
            :key="trait"
            class="mb-2 col-6"
          >
            <div class="fw-bolder border-bottom mb-1">
              {{ traits.getOrThrow(trait).name }}
            </div>
            <p class="small text-secondary mb-0">
              {{ traits.getOrThrow(trait).description }}
            </p>
          </li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
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
      </div>

      <div class="col-6">
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
      </div>
    </div>
  </card>
</template>

<style lang="scss" scoped></style>
