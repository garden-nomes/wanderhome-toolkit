<script lang="ts" setup>
import proxyObject from "../lib/proxy-object";
import { SheetFields } from "../lib/sheet-definitions";
import EditableText from "./EditableText.vue";
import EditableList from "./EditableList.vue";

const props = defineProps<{
  modelValue: SheetFields<"season">;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: SheetFields<"season">): void;
}>();

const season = proxyObject(
  () => props.modelValue,
  (value) => emit("update:modelValue", value)
);
</script>

<template>
  <div class="row align-items-baseline gx-0 mb-3">
    <div class="col-4 d-flex justify-content-center align-items-center">
      <h2 class="luminari fancy-cap">
        Season
      </h2>
    </div>
    <div class="col-4">
      <editable-text
        v-model="season.name"
        label="Season"
      />
    </div>
    <div class="col-4">
      <editable-text
        v-model="season.year"
        label="Year"
        class="text-end"
      />
    </div>
  </div>

  <div class="row gx-2 mb-3">
    <div class="col-8">
      <div class="row gx-0 mb-2">
        <div class="col">
          <editable-text
            v-model="season.firstMonthName"
            label="Month"
          />
        </div>

        <div class="col">
          <editable-text
            v-model="season.firstMonthSpentAt"
            label="Spent at the Place"
          />
        </div>
      </div>

      <div class="row gx-2">
        <div class="col">
          <editable-list
            v-model="season.firstMonthPresent"
            label="What is present here:"
            add-label="Add presence"
            clas=""
          />
        </div>

        <div class="col">
          <editable-list
            v-model="season.firstMonthSigns"
            label="Signs of the Month:"
            add-label="Add sign"
          />
        </div>
      </div>
    </div>

    <div class="col pt-2">
      <editable-list
        v-model="season.firstMonthNotes"
        label="Question and Notes:"
      />
    </div>
  </div>

  <div class="row gx-2 mb-3">
    <div class="col-8">
      <div class="row gx-0 mb-2">
        <div class="col">
          <editable-text
            v-model="season.secondMonthName"
            label="Month"
          />
        </div>

        <div class="col">
          <editable-text
            v-model="season.secondMonthSpentAt"
            label="Spent at the Place"
          />
        </div>
      </div>

      <div class="row gx-2">
        <div class="col">
          <editable-list
            v-model="season.secondMonthPresent"
            label="What is present here:"
            add-label="Add presence"
            clas=""
          />
        </div>

        <div class="col">
          <editable-list
            v-model="season.secondMonthSigns"
            label="Signs of the Month:"
            add-label="Add sign"
          />
        </div>
      </div>
    </div>

    <div class="col pt-2">
      <editable-list
        v-model="season.secondMonthNotes"
        label="Question and Notes:"
      />
    </div>
  </div>

  <div class="row gx-0 mb-2">
    <div class="col">
      <editable-text
        v-model="season.holiday"
        label="Holiday"
      />
    </div>

    <div class="col">
      <editable-text
        v-model="season.holidayCelebratedAt"
        label="Celebrated at the Place"
      />
    </div>
  </div>

  <div class="row gx-2 mb-3">
    <div class="col">
      <editable-list
        v-model="season.holidayTraditions"
        label="Holiday Traditions:"
        add-label="Add tradition"
      />

      <p class="luminari mb-0">
        How the holiday is celebrated:
      </p>
      <editable-text
        v-model="season.holidayHowCelebrated"
        label="How the holiday is celebrated"
      />
    </div>

    <div class="col">
      <editable-list
        v-model="season.holidayCan"
        label="Everyone can always..."
      />
    </div>
  </div>
</template>
