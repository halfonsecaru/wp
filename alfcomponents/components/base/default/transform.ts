import { AlfTransformBaseInterface, AlfTransformInterface } from "@alfcomponents/interfaces";

export const buildTransformConfig = (): AlfTransformInterface => {
    const baseVal: AlfTransformBaseInterface = {
        translateX: undefined,
        translateY: undefined,
        translateZ: undefined,
        scaleX: undefined,
        scaleY: undefined,
        scaleZ: undefined,
        scale: undefined,
        rotate: undefined,
        rotateX: undefined,
        rotateY: undefined,
        rotateZ: undefined,
        skewX: undefined,
        skewY: undefined,
        perspective: undefined,
        transformStyle: undefined,
        backfaceVisibility: undefined
    };

    return {
        default: baseVal,
        hover: baseVal,
        focus: baseVal,
        active: baseVal,
        disabled: baseVal
    };
};
