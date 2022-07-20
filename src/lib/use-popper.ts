import { createPopper, Instance } from "@popperjs/core";
import { useResizeObserver } from "@vueuse/core";
import { isRef, Ref, unref, watch } from "vue";

export type PopperOptions = Parameters<typeof createPopper>[2];

export default function usePopper(
  isOpen: Ref<boolean>,
  referenceEl: Ref<HTMLElement | null | undefined>,
  tooltipEl: Ref<HTMLElement | null | undefined>,
  options: PopperOptions | Ref<PopperOptions>
) {
  let popper: Instance | null = null;

  watch(
    [isOpen, referenceEl, tooltipEl, ...(isRef(options) ? [options] : [])],
    () => {
      if (!isOpen.value && popper !== null) {
        popper.destroy();
      } else if (isOpen.value && referenceEl.value && tooltipEl.value) {
        if (popper) {
          popper.destroy();
        }

        popper = createPopper(
          referenceEl.value,
          tooltipEl.value,
          unref(options)
        );
      }
    }
  );

  useResizeObserver(referenceEl, () => popper?.update());
  useResizeObserver(tooltipEl, () => popper?.update());
}
