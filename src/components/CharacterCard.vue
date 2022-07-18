<script lang="ts">
import { defineComponent } from "vue";
import { useCharacterStore } from "../stores/characters";
import TabletopCard from "./TabletopCard.vue";
import EditableText from "./EditableText.vue";

export default defineComponent({
  name: "character-card",
  components: { TabletopCard, EditableText },
  props: {
    characterId: { type: String, required: true },
  },
  setup(props) {
    const characters = useCharacterStore();
    const character = characters.getById(props.characterId);
    return { character };
  },
});
</script>

<template>
  <tabletop-card>
    <template #collapsed>
      <div class="h3 luminari text-center">
        {{ character.name }}
      </div>

      <div class="text-center">
        {{ character.playbook }}
      </div>
    </template>

    <div class="d-flex align-items-baseline mb-1">
      <div class="h2 luminari mb-0 me-3">
        {{ character.name }}
      </div>

      <div class="h5 mb-0">
        {{ character.playbook }}
      </div>

      <div class="ms-auto">
        {{ character.playerName }}
      </div>
    </div>

    <div class="d-flex justify-content-between align-items-baseline mb-3">
      <div>
        {{ character.animalForm }}
        &bull;
        {{ character.pronouns }}
      </div>
    </div>

    <div class="luminari">
      You are alive. Describe your care:
    </div>
    <editable-text v-model:text="character.care" />

    <div class="luminari">
      Describe your personality:
    </div>
    <p>{{ character.care }}</p>

    <div class="luminari">
      Describe your look:
    </div>
    <p>{{ character.look }}</p>

    <div class="luminari">
      You can always...
    </div>
    <ul>
      <li
        v-for="item in character.youCanAlways"
        :key="item"
      >
        {{ item }}
      </li>
    </ul>
  </tabletop-card>
</template>
