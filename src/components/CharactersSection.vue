<script setup lang="ts">
import { computed, ref } from "vue";
import { Character, useCharacterStore } from "../stores/characters";
import CharacterDetails from "./CharacterDetails.vue";

const store = useCharacterStore();

const characters = computed(() => store.characters);

const activeCharacterId = ref(null as string | null);
const activeCharacter = computed(() =>
  activeCharacterId.value === null
    ? null
    : characters.value.find((c) => c.id === activeCharacterId.value)
);

const add = () => {
  activeCharacterId.value = store.createNew().id;
};

const update = (character: Character) => store.update(character);
</script>

<template>
  <h2>Characters</h2>

  <div class="row">
    <div class="col-md-3">
      <ul class="list-unstyled character-list">
        <li
          v-for="character in characters"
          :key="character.id"
        >
          <a
            href="#"
            role="button"
            :class="{ active: character.id === activeCharacterId }"
            @click.prevent="activeCharacterId = character.id"
          >
            {{ character.name || "(new character)" }}
          </a>
        </li>
      </ul>

      <a
        href="#"
        role="button"
        @click.prevent="add"
      >&plus; Add character</a>
    </div>

    <CharacterDetails
      v-if="activeCharacter"
      :character="activeCharacter"
      class="col"
      @update:character="update"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "bootstrap/scss/bootstrap";

.character-list a {
  color: $primary;
}
</style>
