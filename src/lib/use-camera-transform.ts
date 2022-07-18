import { mapGamepadToXbox360Controller } from "@vueuse/core";
import { CSSProperties, inject, InjectionKey, provide, reactive } from "vue";

interface CameraTransform {
  translation: {
    x: number;
    y: number;
  };
  zoom: number;
}

const injectionKey: InjectionKey<CameraTransform> = Symbol("camera-transform");

const useCameraTransformInner = (transform: CameraTransform) => {
  const getScreenPosition = (x: number, y: number) => {
    return {
      x: (x + transform.translation.x) * transform.zoom,
      y: (y + transform.translation.y) * transform.zoom,
    };
  };

  const getWorldPosition = (x: number, y: number) => {
    return {
      x: x / transform.zoom - transform.translation.x,
      y: y / transform.zoom - transform.translation.y,
    };
  };

  const createStyle = (x: number, y: number): CSSProperties => {
    const { x: screenX, y: screenY } = getScreenPosition(x, y);

    return {
      transform: `translate(${screenX}px, ${screenY}px) scale(${transform.zoom})`,
    };
  };

  return {
    getScreenPosition,
    getWorldPosition,
    createStyle,
    transform,
  };
};

export const useNewCameraTransform = () => {
  const transform = reactive<CameraTransform>({
    translation: { x: 0, y: 0 },
    zoom: 1,
  });

  provide(injectionKey, transform);

  return useCameraTransformInner(transform);
};

export const useCameraTransform = () => {
  const transform = inject(injectionKey);

  if (!transform) {
    throw new Error("`useCameraTransform` called with no provided transform");
  }

  return useCameraTransformInner(transform);
};
