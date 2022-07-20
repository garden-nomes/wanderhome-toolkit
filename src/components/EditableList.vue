<script lang="ts" setup>
import { ref, watch } from "vue";
import uid, { UID } from "../lib/uid";

const props = defineProps<{
  modelValue: string[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const localModel = ref(props.modelValue.map((value) => ({ id: uid(), value })));

watch(
  localModel,
  (value) =>
    emit(
      "update:modelValue",
      value.map((item) => item.value)
    ),
  { deep: true }
);

const currentlyEditing = ref<UID | null>(null);

const edit = (id: UID) => {
  currentlyEditing.value = id;
};

const remove = (id: UID) => {
  const index = localModel.value.findIndex((x) => x.id === id);
  localModel.value.splice(index, 1);
};

const add = () => {
  const id = uid();
  localModel.value.push({ id, value: "" });
  edit(id);
};

watch(currentlyEditing, (_, oldValue) => {
  if (
    oldValue !== null &&
    localModel.value.find((x) => x.id === oldValue)?.value.length === 0
  ) {
    remove(oldValue);
  }
});
</script>

<template>
  <ul>
    <template
      v-for="item in localModel"
      :key="item.id"
    >
      <li
        v-if="currentlyEditing !== item.id"
        class=""
      >
        <span>{{ item.value }}</span>

        <span class="show-on-hover ms-2">
          <button
            type="button"
            class="btn btn-sm btn-link text-secondary p-0 me-2"
            @click="currentlyEditing = item.id"
          >
            edit
          </button>
          <button
            type="button"
            class="btn btn-sm btn-link text-secondary p-0"
            @click="remove(item.id)"
          >
            remove
          </button>
        </span>
      </li>

      <li v-else>
        <textarea
          v-model="item.value"
          v-autofocus
          class="form-control form-control-sm rounded-0 rounded-top border-bottom-0"
          rows="3"
          aria-label="Detail"
        />

        <div class="text-right">
          <button
            type="button"
            class="btn btn-outline-secondary rounded-0 rounded-bottom btn-sm w-100"
            @click="currentlyEditing = null"
          >
            done
          </button>
        </div>
      </li>
    </template>
    <li>
      <button
        type="button"
        class="btn btn-link p-0 btn-sm"
        @click="add"
      >
        add
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@media (hover: hover) {
  .show-on-hover {
    opacity: 0;
    transition: opacity 150ms linear;
  }

  *:hover > .show-on-hover {
    opacity: 1;
  }
}
</style>
