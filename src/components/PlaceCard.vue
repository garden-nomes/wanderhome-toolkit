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
    <div class="row">
      <div class="col-3">
        <h2 class="luminari">
          Place
        </h2>
        <p class="fst-italic">
          We have arrived somewhere new. Let’s choose 3 Natures, and from each,
          pick aesthetic elements and folklore. Then let’s figure out what this
          place can always do, what animal-folk are common here, draw a picture
          of the place (if we’d like), and record its name.
        </p>

        <div class="luminari mb-0">
          This place can always...
        </div>

        <ul class="mb-0 mt-2">
          <template
            v-for="nature in place.natures"
            :key="nature"
          >
            <li
              v-for="canAlways in natures.getOrThrow(nature).canAlways"
              :key="canAlways"
              class="mb-1"
            >
              {{ canAlways }}
            </li>
          </template>
        </ul>
      </div>

      <div class="col">
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
          <ul class="list-unstyled mb-0 row">
            <li
              v-for="nature in place.natures"
              :key="nature"
              class="mb-2 col-4"
            >
              <div class="fw-bolder border-bottom mb-1">
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
            </li>
          </ul>
        </div>
        <div class="row gx-2">
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
        <div class="row gx-2">
          <div class="col-8">
            <editable-list
              v-model="place.notes"
              label="Notes"
              add-label="Add note"
            />
          </div>
          <div class="col">
            <editable-list
              :model-value="[]"
              label="Notable Kith"
              add-label="Add kith"
            />
          </div>
        </div>
      </div>
    </div>
  </card>
</template>
