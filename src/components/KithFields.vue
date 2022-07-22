<script lang="ts" setup>
import EditableList from "./EditableList.vue";
import EditableText from "./EditableText.vue";
import CategorizedItemToggler from "./CategorizedItemToggler.vue";
import Icon from "./Icon.vue";
import AddFromItems from "./AddFromItems.vue";
import proxyObject from "../lib/proxy-object";
import { useTraitStore } from "../stores/traits";
import { SheetFields } from "../lib/sheet-definitions";

const props = defineProps<{
  modelValue: SheetFields<"kith">;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: SheetFields<"kith">): void;
}>();

const fields = proxyObject(
  () => props.modelValue,
  (value) => emit("update:modelValue", value)
);

const traits = useTraitStore();
</script>

<template>
  <div class="row mb-3">
    <div class="col-4 d-flex justify-content-center align-items-center">
      <h2 class="luminari fancy-cap">
        Kith
      </h2>
    </div>

    <div class="col">
      <div class="row gx-0 justify-content-end">
        <div class="col-12">
          <editable-text
            v-model="fields.name"
            label="Name"
          />
        </div>
        <div class="col-6">
          <editable-text
            v-model="fields.pronouns"
            label="Pronouns"
          />
        </div>
        <div class="col-6">
          <editable-text
            v-model="fields.form"
            label="Animal form"
            align-end
          />
        </div>
      </div>
    </div>
  </div>

  <div class="mb-3">
    <div class="d-flex align-items-baseline">
      <div class="luminari">
        Traits
      </div>

      <div class="ms-auto">
        <categorized-item-toggler
          v-model="fields.traits"
          :categories="traits.categories"
          class="btn btn-minimal"
        >
          <icon name="plus" />Select traits
        </categorized-item-toggler>
      </div>
    </div>

    <ul class="list-unstyled mb-0 row">
      <li
        v-for="trait in fields.traits"
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

  <div class="row">
    <div class="col-6">
      <add-from-items
        v-model="fields.canAlways"
        :items="fields.traits.map((t) => traits.getOrThrow(t))"
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
        v-model="fields.relationships"
        label="Key relationships"
        add-label="Add relationship"
      />
      <editable-list
        v-model="fields.details"
        label="Details"
        add-label="Add detail"
      />
      <editable-list
        v-model="fields.notes"
        label="Notes"
        add-label="Add note"
      />
    </div>
  </div>
</template>
