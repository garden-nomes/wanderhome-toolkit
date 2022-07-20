<script lang="ts" setup>
import { computed, ref } from "vue";
import { useKithStore } from "../stores/kith";
import { Trait, useTraitStore } from "../stores/traits";
import Card from "./Card.vue";
import FormGroup from "./FormGroup.vue";
import Dropdown from "./Dropdown.vue";
import EditableList from "./EditableList.vue";

const props = defineProps<{
  kithId: string;
}>();

defineEmits<{
  (e: "remove"): void;
}>();

const { getOrThrow } = useKithStore();
const kith = computed(() => getOrThrow(props.kithId));

const { categories: traitCategories, getOrThrow: getTraitOrThrow } =
  useTraitStore();

const isEditing = ref(true);

const addTrait = (trait: Trait) => {
  kith.value.traits.push(trait.name);
};

const removeTrait = (trait: string) => {
  kith.value.traits.splice(kith.value.traits.indexOf(trait), 1);

  for (const option of getTraitOrThrow(trait).canAlways) {
    if (kith.value.canAlways.includes(option)) {
      kith.value.canAlways.splice(kith.value.canAlways.indexOf(option), 1);
    }
  }
};

const isTraitAdded = (trait: Trait) => {
  return kith.value.traits.some((t) => t === trait.name);
};

const onCanAlwaysCheckboxChange = (event: Event, option: string) => {
  const target = event.target as HTMLInputElement;
  if (!target.checked && kith.value.canAlways.includes(option)) {
    kith.value.canAlways.splice(kith.value.canAlways.indexOf(option), 1);
  } else if (target.checked && !kith.value.canAlways.includes(option)) {
    kith.value.canAlways.push(option);
  }
};
</script>

<template>
  <card :hash="`kith-${kith.uid}`">
    <form
      v-if="isEditing"
      @submit.prevent="isEditing = false"
    >
      <form-group
        v-model="kith.name"
        label="Name"
        class="mb-3"
        autofocus
      />
      <form-group
        v-model="kith.pronouns"
        label="Pronouns"
        class="mb-3"
      />
      <form-group
        v-model="kith.form"
        label="Form"
        class="mb-3"
      />

      <div class="mb-3">
        <dropdown
          button-class="btn btn-primary"
          button-label="Select 2-3 traits"
          :menu-attrs="{
            style: 'width: 25rem; max-height: 30rem; overflow-y: auto',
          }"
        >
          <div
            v-for="category in traitCategories"
            :key="category.name"
          >
            <div class="dropdown-header font-ui">
              {{ category.name }}
            </div>

            <ul class="list-unstyled row g-1 mb-0">
              <li
                v-for="trait in category.traits"
                :key="trait.name"
                class="col-sm-4"
              >
                <button
                  type="button"
                  class="dropdown-item rounded small"
                  :class="isTraitAdded(trait) && 'active'"
                  @click="
                    isTraitAdded(trait)
                      ? removeTrait(trait.name)
                      : addTrait(trait)
                  "
                >
                  {{ trait.name }}
                </button>
              </li>
            </ul>
          </div>
        </dropdown>
      </div>

      <ul class="list-unstyled mb-3">
        <li
          v-for="trait in kith.traits"
          :key="trait"
          class="mb-2"
        >
          <div class="d-flex justify-content-between">
            <div class="luminari">
              {{ trait }}
            </div>

            <button
              type="button"
              class="btn btn-sm btn-link py-0 d-block"
              @click="removeTrait(trait)"
            >
              remove
            </button>
          </div>

          <p class="mb-0">
            Choose 1-2 they can always do.
          </p>

          <ul class="list-unstyled">
            <li
              v-for="(option, index) in getTraitOrThrow(trait).canAlways"
              :key="option"
              class="form-check mb-0"
            >
              <input
                :id="`canAlways-${kith.name}-${trait}-${index}`"
                :checked="kith.canAlways.includes(option)"
                class="form-check-input"
                type="checkbox"
                @change="onCanAlwaysCheckboxChange($event, option)"
              >

              <label
                :for="`canAlways-${kith.name}-${trait}-${index}`"
                class="form-check-label"
              >
                {{ option }}
              </label>
            </li>
          </ul>
        </li>
      </ul>

      <div class="mb-3">
        <p class="luminari mb-0">
          Relationships
        </p>
        <editable-list v-model="kith.relationships" />
      </div>

      <div class="mb-3">
        <p class="luminari mb-0">
          Details
        </p>
        <editable-list v-model="kith.details" />
      </div>

      <div class="mb-3">
        <p class="luminari mb-0">
          Notes
        </p>
        <editable-list v-model="kith.notes" />
      </div>

      <button
        type="submit"
        class="btn d-block w-100 mt-4 btn-primary"
      >
        Done
      </button>
    </form>

    <template v-else>
      <div
        v-if="kith.name"
        class="row mb-3"
      >
        <div class="col-4 luminari">
          Name
        </div>
        <div class="col">
          {{ kith.name }}
        </div>
      </div>

      <div
        v-if="kith.pronouns"
        class="row mb-3"
      >
        <div class="col-4 luminari">
          Pronouns
        </div>
        <div class="col">
          {{ kith.pronouns }}
        </div>
      </div>

      <div
        v-if="kith.form"
        class="row mb-3"
      >
        <div class="col-4 luminari">
          Form
        </div>
        <div class="col">
          {{ kith.form }}
        </div>
      </div>

      <div
        v-if="kith.traits.length"
        class="row mb-3"
      >
        <div class="col-4 luminari">
          Traits
        </div>
        <div class="col">
          {{ kith.traits.join(", ") }}
        </div>
      </div>

      <div
        v-if="kith.canAlways.length"
        class="mb-3"
      >
        <p class="luminari mb-0">
          They can always:
        </p>

        <ul>
          <li
            v-for="item in kith.canAlways"
            :key="item"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <div
        v-if="kith.relationships.length"
        class="mb-3"
      >
        <p class="luminari mb-0">
          Relationships:
        </p>

        <ul>
          <li
            v-for="item in kith.relationships"
            :key="item"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <div
        v-if="kith.details.length"
        class="mb-3"
      >
        <p class="luminari mb-0">
          Details:
        </p>

        <ul>
          <li
            v-for="item in kith.details"
            :key="item"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="mb-3">
        <p class="luminari mb-0">
          Notes:
        </p>
        <editable-list v-model="kith.notes" />
      </div>

      <button
        type="button"
        class="btn btn-link btn-sm mt-4"
        @click="isEditing = true"
      >
        Edit
      </button>

      <button
        type="button"
        class="btn btn-link btn-sm mt-4"
        @click="$emit('remove')"
      >
        Remove
      </button>
    </template>
  </card>
</template>
