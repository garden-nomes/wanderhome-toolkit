<script lang="ts">
import {
  computed,
  CSSProperties,
  defineComponent,
  nextTick,
  ref,
  watch,
} from "vue";
import { Position, useEventListener } from "@vueuse/core";
import { useCameraTransform } from "../lib/use-camera-transform";

export default defineComponent({
  name: "tabletop-card",
  setup() {
    const isExpanded = ref(false);

    const el = ref<HTMLElement | null>(null);

    const { transform, getScreenPosition } = useCameraTransform();

    const position = ref<Position>({ x: 0, y: 0 });
    const isDragging = ref(false);
    const isClick = ref(false);

    useEventListener(el, "pointerdown", (event: PointerEvent) => {
      if (isExpanded.value && event.target !== el.value) return;
      isDragging.value = true;
      isClick.value = true;
    });

    useEventListener(window, "pointermove", (event: PointerEvent) => {
      if (!isDragging.value) return;
      isClick.value = false;
      position.value.x += event.movementX / transform.zoom;
      position.value.y += event.movementY / transform.zoom;
    });

    useEventListener(window, "pointerup", (event: PointerEvent) => {
      if (isClick.value) {
        isExpanded.value = !isExpanded.value;
      }

      isDragging.value = false;
      isClick.value = false;
    });

    const style = computed<CSSProperties>(() => {
      const { x, y } = getScreenPosition(position.value.x, position.value.y);
      return {
        transformOrigin: "top left",
        transform: `translate(${x}px, ${y}px) scale(${transform.zoom})`,
      };
    });

    return { el, style, isExpanded };
  },
});
</script>

<template>
  <div
    ref="el"
    class="tabletop-card"
    :class="{ collapsed: !isExpanded }"
    :style="style"
  >
    <slot v-if="isExpanded" />
    <slot
      v-else
      name="collapsed"
    />
    <button
      v-if="isExpanded"
      class="btn btn-outline-primary btn-block w-100"
      @click="isExpanded = false"
    >
      Close
    </button>
  </div>
</template>

<style lang="scss" scoped>
.tabletop-card {
  padding: 1.5rem 3rem;
  background: snow;
  border-radius: 0.25rem;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
  position: fixed;

  &.collapsed {
    user-select: none;
  }
}
</style>
