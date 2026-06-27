import { AlfTransitionBaseInterface, AlfTransitionInterface } from "@alfcomponents/interfaces";

export const buildTransitionConfig = (): AlfTransitionInterface => {
    const noTransition: AlfTransitionBaseInterface = {
        duration: '0s',
        timingFunction: 'ease-in-out',
        delay: '0s',
        property: 'none'
    };

    const activeTransition: AlfTransitionBaseInterface = {
        duration: '150ms',
        timingFunction: 'ease-in-out',
        delay: '0s',
        property: 'all'
    };

    return {
        default: noTransition,
        hover: activeTransition,
        focus: activeTransition,
        active: activeTransition,
        disabled: noTransition
    };
};

