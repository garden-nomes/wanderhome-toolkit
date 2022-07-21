<script lang="ts" setup>
import { ref, watch } from "vue";
import { usePlaybooksStore } from "../stores/playbooks";
import Card from "./Card.vue";
import EditableText from "./EditableText.vue";
import { tokens } from "../json/token-actions.json";
import { journeyingTools } from "../json/journeying-tools.json";
import EditableList from "./EditableList.vue";

const props = defineProps<{
  id: string;
}>();

const { getOrThrow } = usePlaybooksStore();

const playbook = ref(getOrThrow(props.id));
watch(
  () => props.id,
  () => {
    playbook.value = getOrThrow(props.id);
  }
);
</script>

<template>
  <card :hash="`playbook-${playbook.uid}`">
    <div class="row">
      <div class="col-4">
        <h2 class="luminari fancy-cap text-center">
          Wanderhome
        </h2>

        <div class="rounded bg-light p-3">
          <p class="luminari mb-1">
            Get a token whenever you...
          </p>
          <ul>
            <li
              v-for="action in tokens.get"
              :key="action"
            >
              {{ action }}
            </li>
          </ul>
          <p class="luminari mb-1">
            Spend a token in order to...
          </p>
          <ul>
            <li
              v-for="action in tokens.spend"
              :key="action"
            >
              {{ action }}
            </li>
          </ul>
        </div>
      </div>

      <div class="col">
        <div class="row gx-2">
          <div class="col-6">
            <editable-text
              v-model="playbook.name"
              label="Name"
            />
          </div>
          <div class="col-3">
            <editable-text
              v-model="playbook.pronouns"
              label="Pronouns"
            />
          </div>
          <div class="col-3">
            <editable-text
              v-model="playbook.animalForm"
              label="Animal Form"
            />
          </div>
        </div>
        <div class="row gx-3 mb-3">
          <div class="col-5">
            <editable-text
              v-model="playbook.playbook"
              label="Playbook"
            />
          </div>
          <div class="col-4">
            <editable-text
              v-model="playbook.playerName"
              label="Player Name"
            />
          </div>
          <div class="col-3">
            <editable-text
              v-model="playbook.playerPronouns"
              label="Player Pronouns"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-3">
            <p class="luminari mb-1">
              Journeying Tools:
            </p>
            <ul>
              <li
                v-for="tool in journeyingTools"
                :key="tool"
              >
                {{ tool }}
              </li>
            </ul>
          </div>

          <div class="col">
            <editable-list
              v-model="playbook.canAlways"
              label="You can always..."
              add-label="Add item"
            />
          </div>

          <div class="col">
            <p class="luminari mb-0">
              You are alive. Describe your care...
            </p>
            <editable-text
              v-model="playbook.care"
              label="Describe your care"
              class="mb-3"
            />
            <p class="luminari mb-0">
              Describe your personality:
            </p>
            <editable-text
              v-model="playbook.personality"
              label="Describe your personality"
              class="mb-3"
            />
            <p class="luminari mb-0">
              Describe your look:
            </p>
            <editable-text
              v-model="playbook.look"
              label="Describe your look"
              class="mb-3"
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <editable-list
              v-model="playbook.advancements"
              label="Advancements"
              add-label="Add advancement"
            />
          </div>

          <div class="col">
            <editable-list
              v-model="playbook.prompts"
              label="Prompts and Choices"
              add-label="Add item"
            />
          </div>

          <div class="col">
            <editable-list
              v-model="playbook.notes"
              label="Notes"
              add-label="Add note"
            />
          </div>
        </div>
      </div>
    </div>
  </card>
</template>
