<script lang="ts" setup>
import EditableList from "./EditableList.vue";
import EditableText from "./EditableText.vue";
import proxyObject from "../lib/proxy-object";
import { tokens } from "../json/token-actions.json";
import { journeyingTools } from "../json/journeying-tools.json";
import { SheetFields } from "../lib/sheet-definitions";

const props = defineProps<{
  modelValue: SheetFields<"character">;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: SheetFields<"character">): void;
}>();

const fields = proxyObject(
  () => props.modelValue,
  (value) => emit("update:modelValue", value)
);
</script>

<template>
  <div class="row">
    <div
      class="col-12 col-lg-4 d-flex align-items-center justify-content-center"
    >
      <h2 class="luminari fancy-cap">
        Wanderhome
      </h2>
    </div>

    <div class="col">
      <div class="row gx-0 mb-3">
        <div class="col-12 col-md-6">
          <editable-text
            v-model="fields.name"
            label="Name"
          />
        </div>
        <div class="col-6 col-md-3">
          <editable-text
            v-model="fields.pronouns"
            label="Pronouns"
            align-end
          />
        </div>
        <div class="col-6 col-md-3">
          <editable-text
            v-model="fields.animalForm"
            label="Animal Form"
            align-end
          />
        </div>
      </div>
      <div class="row gx-0 mb-3">
        <div class="col-12 col-md-4">
          <editable-text
            v-model="fields.playbook"
            label="Playbook"
          />
        </div>
        <div class="col-6 col-md-4">
          <editable-text
            v-model="fields.playerName"
            label="Player Name"
            align-end
          />
        </div>
        <div class="col-6 col-md-4">
          <editable-text
            v-model="fields.playerPronouns"
            label="Player Pronouns"
            align-end
          />
        </div>
      </div>
    </div>
  </div>

  <div class="row gy-3">
    <div class="col-12 col-lg-4 d-flex flex-column">
      <div
        class="p-3 overflow-auto bg-light rounded"
        style="flex-basis: 30rem; flex-grow: 1"
      >
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
      <div class="row gx-2 mb-3">
        <div class="col-12 col-lg-3">
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

        <div class="col-12 col-lg">
          <editable-list
            v-model="fields.canAlways"
            label="You can always..."
            add-label="Add item"
          />
        </div>

        <div class="col">
          <p class="luminari mb-0">
            You are alive. Describe your care...
          </p>
          <editable-text
            v-model="fields.care"
            label="Describe your care"
            class="mb-3"
          />
          <p class="luminari mb-0">
            Describe your personality:
          </p>
          <editable-text
            v-model="fields.personality"
            label="Describe your personality"
            class="mb-3"
          />
          <p class="luminari mb-0">
            Describe your look:
          </p>
          <editable-text
            v-model="fields.look"
            label="Describe your look"
          />
        </div>
      </div>

      <div class="row gx-2">
        <div class="col-12 col-lg-4">
          <editable-list
            v-model="fields.advancements"
            label="Advancements"
            add-label="Add advancement"
          />
        </div>

        <div class="col-12 col-lg">
          <editable-list
            v-model="fields.prompts"
            label="Prompts and Choices"
            add-label="Add item"
          />
        </div>
      </div>

      <editable-list
        v-model="fields.notes"
        label="Notes"
        add-label="Add note"
      />
    </div>
  </div>
</template>
