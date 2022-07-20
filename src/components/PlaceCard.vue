<script lang="ts" setup>
import { ref, watch } from "vue";
import { useNaturesStore } from "../stores/natures";
import { usePlacesStore } from "../stores/places";
import Card from "./Card.vue";
import EditableList from "./EditableList.vue";
import EditableText from "./EditableText.vue";
import Icon from "./Icon.vue";
import CategorizedItemToggler from "./CategorizedItemToggler.vue";
import AddFromItems from "./AddFromItems.vue";

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
  <card :hash="`place-${place.uid}`">
    <div class="mb-3">
      <editable-text
        v-model="place.name"
        label="Place Name"
      />
    </div>

    <div class="mb-3">
      <div class="d-flex justify-content-between align-items-end">
        <div class="luminari">
          Natures
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

      <ul class="list-unstyled mb-0 row gx-2 align-items-stretch">
        <li
          v-for="nature in place.natures"
          :key="nature"
          class="mb-2 col-4"
        >
          <div class="card px-2 py-1 h-100">
            <div>
              {{ natures.getOrThrow(nature).name }}
            </div>

            <p class="small text-secondary mb-0">
              {{ natures.getOrThrow(nature).description }}

              <span
                v-if="natures.getOrThrow(nature).rule"
                class="fw-bolder text-body"
              >
                {{ natures.getOrThrow(nature).rule }}
              </span>
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div class="row gx-2">
      <div class="col">
        <div class="luminari mb-0">
          This place can always...
        </div>

        <ul class="mb-0">
          <template
            v-for="nature in place.natures"
            :key="nature"
          >
            <li
              v-for="canAlways in natures.getOrThrow(nature).canAlways"
              :key="canAlways"
            >
              {{ canAlways }}
            </li>
          </template>
        </ul>
      </div>

      <div class="col">
        <add-from-items
          v-model="place.aestheticElements"
          :items="place.natures.map((n) => natures.getOrThrow(n))"
          selector="aestheticElements"
          instructions="Choose 2 aesthetic elements from each nature."
          select-label="Select from natures"
          class="mb-3"
        >
          Aesthetic elements
        </add-from-items>
      </div>

      <div class="col">
        <add-from-items
          v-model="place.folklore"
          :items="place.natures.map((n) => natures.getOrThrow(n))"
          selector="folklore"
          instructions="Choose 1 folklore about this place from each nature."
          select-label="Select from natures"
          class="mb-3"
        >
          Folklore
        </add-from-items>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <editable-list
          v-model="place.notes"
          label="Notes"
          add-label="Add note"
        />
      </div>
      <div class="col">
        <div class="luminari mb-0">
          Animal-Folk
        </div>
        <editable-text
          v-model="place.animalFolk"
          label="Animal-Folk"
          class="mb-3"
        />
        <div class="luminari mb-0">
          Small and Forgetten Gods
        </div>
        <editable-text
          v-model="place.smallAndForgottenGods"
          label="Small and Forgetten Gods"
          class="mb-3"
        />
      </div>
    </div>
  </card>
</template>
