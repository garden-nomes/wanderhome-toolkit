<script lang="ts">
import { defineComponent, computed } from "vue";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default defineComponent({
  name: "markdown",
  props: {
    content: { type: String, default: "" },
  },
  setup(props) {
    const html = computed(() => DOMPurify.sanitize(marked(props.content)));
    return { html };
  },
});
</script>

<template>
  <span v-html="html" />
</template>
