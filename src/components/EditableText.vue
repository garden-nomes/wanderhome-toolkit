<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Markdown from "./Markdown.vue";

export default defineComponent({
  name: "editable-text",
  components: { Markdown },
  props: {
    text: { type: String, default: "" },
  },
  emits: {
    "update:text": (text: string) => true,
  },
  setup(props, { emit }) {
    const isEditing = ref(false);
    const inputModel = ref("");
    const edit = () => {
      inputModel.value = props.text;
      isEditing.value = true;
    };
    const save = () => {
      emit("update:text", inputModel.value);
      isEditing.value = false;
    };
    const cancel = () => {
      isEditing.value = false;
    };
    return { isEditing, inputModel, edit, save, cancel };
  },
});
</script>

<template>
  <div v-if="isEditing">
    <form @submit.prevent="save">
      <textarea
        v-model="inputModel"
        class="form-control"
      />
      <div class="text-right">
        <button
          type="button"
          class="btn btn-link"
          @click="cancel"
        >
          cancel
        </button>
        <button
          type="submit"
          class="btn btn-link"
        >
          save
        </button>
      </div>
    </form>
  </div>

  <template v-else>
    <div><markdown :content="text" /></div>
    <div>
      <button
        type="button"
        class="btn btn-link"
        @click="edit"
      >
        edit
      </button>
    </div>
  </template>
</template>
