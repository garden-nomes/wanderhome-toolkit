<script setup lang="ts">
import { computed, ref, watch, WritableComputedRef } from "vue";
import { Character } from "../stores/characters";
import LabeledInput from "./LabeledInput.vue";
import EditableList from "./EditableList.vue";

const props = defineProps<{
  character: Character;
}>();

const emit = defineEmits<{
  (e: "update:character", character: Character): void;
}>();

function createComputedFieldModel<K extends keyof Character>(
  fieldName: K
): WritableComputedRef<Character[K]> {
  return computed({
    get: () => props.character[fieldName],
    set: (value: Character[K]) =>
      emit("update:character", { ...props.character, [fieldName]: value }),
  });
}

const nameModel = createComputedFieldModel("name");
const pronounsModel = createComputedFieldModel("pronouns");
const playbookModel = createComputedFieldModel("playbook");
const animalFormModel = createComputedFieldModel("animalForm");
const playerNameModel = createComputedFieldModel("playerName");
const youCanAlwaysModel = createComputedFieldModel("youCanAlways");
const careModel = createComputedFieldModel("care");
const personalityModel = createComputedFieldModel("personality");
const lookModel = createComputedFieldModel("look");

const isEditing = ref(false);

watch(
  () => props.character.id,
  () => {
    isEditing.value = props.character.name === "";
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <component
      :is="isEditing ? 'form' : 'div'"
      @submit.prevent="isEditing = false"
    >
      <div class="row mb-2">
        <div class="col-md-8">
          <LabeledInput
            v-model="nameModel"
            label="Name"
            :is-readonly="!isEditing"
          />
        </div>

        <div class="col-md-4">
          <LabeledInput
            v-model="pronounsModel"
            label="Pronouns"
            :is-readonly="!isEditing"
          />
        </div>
      </div>

      <div class="row mb-2">
        <div class="col">
          <LabeledInput
            v-model="playbookModel"
            label="Playbook"
            :is-readonly="!isEditing"
          />
        </div>

        <div class="col">
          <LabeledInput
            v-model="animalFormModel"
            label="Animal Form"
            :is-readonly="!isEditing"
          />
        </div>

        <div class="col">
          <LabeledInput
            v-model="playerNameModel"
            label="Player name/pronouns"
            :is-readonly="!isEditing"
          />
        </div>
      </div>

      <div class="mt-3">
        <button
          v-if="isEditing"
          type="submit"
          class="btn btn-primary"
        >
          Done
        </button>

        <button
          v-if="!isEditing"
          type="button"
          class="btn btn-link"
          @click="isEditing = true"
        >
          Edit
        </button>
      </div>
    </component>

    <div class="row">
      <div class="col-md-4">
        <p class="fw-bold">
          Journeying Tools:
        </p>

        <ul>
          <li>Let's do this instead.</li>
          <li>Do we want to?</li>
          <li>Where to next?</li>
          <li>What do you think?</li>
          <li>Hold on.</li>
          <li>No.</li>
          <li>Stepping away.</li>
        </ul>
      </div>

      <div class="col-md-4">
        <p class="fw-bold">
          You can always...
        </p>

        <EditableList v-model="youCanAlwaysModel" />
      </div>
    </div>
  </div>
</template>
