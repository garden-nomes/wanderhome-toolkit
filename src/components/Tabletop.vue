<script lang="ts">
import { computed, CSSProperties, defineComponent, ref } from "vue";
import CharacterCard from "./CharacterCard.vue";
import { useCharacterStore } from "../stores/characters";
import {
  useCameraTransform,
  useNewCameraTransform,
} from "../lib/use-camera-transform";
import { useEventListener } from "@vueuse/core";

export default defineComponent({
  name: "tabletop",
  components: { CharacterCard },
  setup() {
    const { characters } = useCharacterStore();

    const { transform, getWorldPosition, getScreenPosition } =
      useNewCameraTransform();

    const el = ref<HTMLElement | null>(null);

    useEventListener(el, "wheel", (event: WheelEvent) => {
      if (!el.value) return;
      event.preventDefault();

      const { left, top } = el.value.getBoundingClientRect();
      const screenX = event.pageX - left;
      const screenY = event.pageY - top;
      const { x: px, y: py } = getWorldPosition(screenX, screenY);

      transform.zoom += (Math.abs(event.deltaY) / event.deltaY) * -0.05;
      transform.zoom = Math.min(Math.max(transform.zoom, 0.25), 1);

      const { x, y } = getWorldPosition(screenX, screenY);
      transform.translation.x += x - px;
      transform.translation.y += y - py;
    });

    const isDragging = ref(false);

    useEventListener(el, "pointerdown", (event: PointerEvent) => {
      if (!el.value || event.target !== el.value) return;
      isDragging.value = true;
      event.preventDefault();
    });

    useEventListener(window, "pointermove", (event: PointerEvent) => {
      if (!isDragging.value) return;
      transform.translation.x += event.movementX / transform.zoom;
      transform.translation.y += event.movementY / transform.zoom;
      event.preventDefault();
    });

    useEventListener(window, "pointerup", (event: PointerEvent) => {
      if (isDragging.value) {
        isDragging.value = false;
        event.preventDefault();
      }
    });

    const style = computed<CSSProperties>(() => {
      const origin = getScreenPosition(0, 0);
      return {
        // backgroundPosition: `${origin.x}px ${origin.y}px`,
        // backgroundSize: `${transform.zoom * 100}%`,
      };
    });

    return {
      characters,
      el,
      style,
    };
  },
});
</script>

<template>
  <div
    ref="el"
    class="tabletop"
    :style="style"
  >
    <character-card
      v-for="character in characters"
      :key="character.id"
      :character-id="character.id"
    />
  </div>
</template>

<style lang="scss" scoped>
.tabletop {
  background-color: #dbeaeb;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ffffff' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
