import { AlfAlignItemsEnum, AlfAnimationTypeEnum, AlfBorderStyleEnum, AlfColorEnum, AlfCssPositionEnum, AlfCursorEnum, AlfDisplayEnum, AlfFontFamilyEnum, AlfFontSizeEnum, AlfFontStyleEnum, AlfFontWeightEnum, AlfJustifyContentEnum, AlfLetterSpacingEnum, AlfLineHeightEnum, AlfOpacityEnum, AlfOverflowWrapEnum, AlfPxEnum, AlfRadiusEnum, AlfShadowEnum, AlfTextAlignEnum, AlfTextDecorationEnum, AlfTextOverflowEnum, AlfTextShadowEnum, AlfTextTransformEnum, AlfVerticalAlignEnum, AlfVisibilityEnum, AlfWhiteSpaceEnum, AlfWordBreakEnum } from "@alfcomponents/enums";
import { AlfAnimateCssInterface, AlfBackgroundsInterface, AlfBorderInterface, AlfDisplayAndLayoutBaseInterface, AlfDisplayAndLayoutInterface, AlfMarginInterface, AlfOutlineInterface, AlfPaddingInterface, AlfRippleInterface, AlfShadowsInterface, AlfTextStyleInterface, AlfTransformBaseInterface, AlfTransformInterface, AlfTypographyBaseInterface, AlfTypographyInterface } from "@alfcomponents/interfaces";

export interface PredefinedConfig {
    marginBase: AlfMarginInterface;
    paddingBase: AlfPaddingInterface;
    displayAndLayoutBase: AlfDisplayAndLayoutInterface;
    shadowsBase: AlfShadowsInterface;
    transformBase: AlfTransformInterface;
    backgroundsBase: AlfBackgroundsInterface;
    typographyBase: AlfTypographyInterface;
    borderBase: AlfBorderInterface;
    animationsBase: AlfAnimateCssInterface;
    ripple: AlfRippleInterface;

    textStyleBase: AlfTextStyleInterface;
    outlineBase: AlfOutlineInterface;
}


const buildTypographyBaseConfig = (main: AlfColorEnum, hover: AlfColorEnum, focus: AlfColorEnum, disabled: AlfColorEnum, active: AlfColorEnum): AlfTypographyInterface => {
    const base: AlfTypographyBaseInterface = {
        fontSize: AlfFontSizeEnum.Base,
        fontWeight: AlfFontWeightEnum.Normal,
        lineHeight: AlfLineHeightEnum.Normal,
        textAlign: AlfTextAlignEnum.Left,
        color: main,
        letterSpacing: AlfLetterSpacingEnum.Normal,
        whiteSpace: AlfWhiteSpaceEnum.Normal,
        wordBreak: AlfWordBreakEnum.Normal,
        textTransform: AlfTextTransformEnum.None,
        textDecoration: AlfTextDecorationEnum.None,
        fontStyle: AlfFontStyleEnum.Normal,
        opacity: AlfOpacityEnum.Opacity100,
        fontFamily: AlfFontFamilyEnum.System,
        overflowWrap: AlfOverflowWrapEnum.Normal,
        textOverflow: AlfTextOverflowEnum.Clip,
        textShadow: AlfTextShadowEnum.None,
        verticalAlign: AlfVerticalAlignEnum.Middle,
    }

    return {
        default: base,
        hover: {
            ...base,
            color: hover,
        },
        focus: {
            ...base,
            color: focus,
        },
        disabled: {
            ...base,
            color: disabled,
        },
        active: {
            ...base,
            color: active,
        },
    }
};


const buildTransformBaseConfig = (): AlfTransformBaseInterface => ({
    translateX: AlfPxEnum.None,
    translateY: AlfPxEnum.None,
    translateZ: AlfPxEnum.None,
    scaleX: 0,
    scaleY: 0,
    scaleZ: 0,
    scale: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    skewX: 0,
    skewY: 0,
    perspective: AlfPxEnum.None,
    transformStyle: 'flat' as any,
    backfaceVisibility: AlfVisibilityEnum.Visible
});


const buildShadowsBaseConfig = (main: AlfColorEnum, hover: AlfColorEnum, focus: AlfColorEnum, disabled: AlfColorEnum, active: AlfColorEnum): AlfShadowsInterface => {

    return {
        default: {
            boxShadow: AlfShadowEnum.None,
            boxShadowColor: main,
            boxShadowInset: false,
            textShadow: AlfTextShadowEnum.None,
            textShadowColor: main
        },
        hover: {
            boxShadow: AlfShadowEnum.None,
            boxShadowColor: hover,
            boxShadowInset: false,
            textShadow: AlfTextShadowEnum.None,
            textShadowColor: hover
        },
        focus: {
            boxShadow: AlfShadowEnum.None,
            boxShadowColor: focus,
            boxShadowInset: false,
            textShadow: AlfTextShadowEnum.None,
            textShadowColor: focus
        },
        disabled: {
            boxShadow: AlfShadowEnum.None,
            boxShadowColor: disabled,
            boxShadowInset: false,
            textShadow: AlfTextShadowEnum.None,
            textShadowColor: disabled
        },
        active: {
            boxShadow: AlfShadowEnum.None,
            boxShadowColor: active,
            boxShadowInset: false,
            textShadow: AlfTextShadowEnum.None,
            textShadowColor: active
        }
    }
};


const buildAnimationsBaseConfig = (): AlfAnimateCssInterface => ({
    enterStage: AlfAnimationTypeEnum.FadeIn,
    exitStage: AlfAnimationTypeEnum.FadeOut,
    duration: '300ms',
    delay: '0ms',
    iterationCount: 1,
    fillMode: 'both',
    direction: 'normal'
});


const buildPaddingBaseConfig = (): AlfPaddingInterface => {
    const basePadding: AlfPaddingInterface = {
        default: {
            padding: AlfPxEnum.None,
        },
        hover: {
            padding: AlfPxEnum.None,
        },
        focus: {
            padding: AlfPxEnum.None,
        },
        disabled: {
            padding: AlfPxEnum.None,
        },
        active: {
            padding: AlfPxEnum.None,
        }
    };

    return basePadding;
};

const buildOutlineBaseConfig = (main: AlfColorEnum, hover: AlfColorEnum, focus: AlfColorEnum, disabled: AlfColorEnum, active: AlfColorEnum): AlfOutlineInterface => {
    // AlfOutlineBaseInterface
    const base: AlfOutlineInterface = {
        default: {
            outlineColor: AlfColorEnum.Transparent,
            outlineWidth: AlfPxEnum.None,
        },
        hover: {
            outlineColor: AlfColorEnum.Transparent,
            outlineWidth: AlfPxEnum.None,
        },
        focus: {
            outlineColor: AlfColorEnum.Transparent,
            outlineWidth: AlfPxEnum.None,
        },
        disabled: {
            outlineColor: AlfColorEnum.Transparent,
            outlineWidth: AlfPxEnum.None,
        },
        active: {
            outlineColor: AlfColorEnum.Transparent,
            outlineWidth: AlfPxEnum.None,
        }
    };
    return base;
};


const buildMarginBaseConfig = (): AlfMarginInterface => {

    const base: AlfMarginInterface = {
        default: {
            margin: AlfPxEnum.None,
        },
        hover: {
            margin: AlfPxEnum.None,
        },
        focus: {
            margin: AlfPxEnum.None,
        },
        disabled: {
            margin: AlfPxEnum.None,
        },
        active: {
            margin: AlfPxEnum.None,
        }
    };

    return base;
};

const buildDisplayAndLayoutBaseConfig = (): AlfDisplayAndLayoutInterface => {
    const base: AlfDisplayAndLayoutBaseInterface =
    {
        display: AlfDisplayEnum.InlineFlex,
        position: AlfCssPositionEnum.Relative,
        cursor: AlfCursorEnum.Pointer,
        justifyContent: AlfJustifyContentEnum.Center,
        alignItems: AlfAlignItemsEnum.Center,
        width: AlfPxEnum.auto,
        height: AlfPxEnum.auto,
        minHeight: AlfPxEnum.Px30,
        overflow: 'hidden' as any,
    };
    return {
        default: { ...base },
        hover: { ...base },
        focus: { ...base },
        disabled: { ...base },
        active: { ...base },
    };
}

const buildColorBackgroundConfig = (
    main: AlfColorEnum,
    hover: AlfColorEnum,
    disabled?: AlfColorEnum
): AlfBackgroundsInterface => {
    const isGrad = (val: string) => val?.includes('gradient');
    const state = (v: AlfColorEnum) => isGrad(v)
        ? { backgroundImage: v, backgroundColor: AlfColorEnum.Transparent }
        : { backgroundColor: v, backgroundImage: 'none' };

    return {
        default: state(main),
        hover: state(hover),
        focus: state(hover),
        active: state(hover),
        disabled: state(disabled)
    };
};

const buildColorBorderConfig = (
    main: AlfColorEnum,
    hover: AlfColorEnum,
    width: AlfPxEnum = AlfPxEnum.Px015,
    disabled?: AlfColorEnum
): AlfBorderInterface => {
    const base = {
        borderColor: main,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderWidth: width,
        borderRadius: AlfRadiusEnum.Lg,
    };

    return {
        default: base,
        hover: { ...base, borderColor: hover },
        focus: { ...base, borderColor: hover },
        active: { ...base, borderColor: hover },
        disabled: { ...base, borderColor: disabled ? disabled : AlfColorEnum.Gray300 },
    };
};

const buildTextStyleConfig = (main: AlfColorEnum, hover?: AlfColorEnum, focus?: AlfColorEnum, disabled?: AlfColorEnum, active?: AlfColorEnum): AlfTextStyleInterface => {
    return {
        default: {
            color: main,
            fontWeight: AlfFontWeightEnum.Normal,

        },
        hover: {
            color: hover ? hover : main,
            fontWeight: AlfFontWeightEnum.Normal,
        },
        focus: {

            color: focus ? focus : main,
            fontWeight: AlfFontWeightEnum.Normal,
        },
        disabled: {

            color: disabled ? disabled : AlfColorEnum.PrimaryDisabled,
            fontWeight: AlfFontWeightEnum.Normal,
        },
        active: {
            color: active ? active : main,
            fontWeight: AlfFontWeightEnum.Normal,
        }
    }
};

const buildTransformConfig = (): AlfTransformInterface => ({
    default: { ...buildTransformBaseConfig() },
    hover: { ...buildTransformBaseConfig() },
    focus: { ...buildTransformBaseConfig() },
    disabled: { ...buildTransformBaseConfig() },
    active: { ...buildTransformBaseConfig() },
});

// // ── CONSTRUCTORES BASE: El ADN neutro del sistema ───────────────────────

const defaultConstruct = (
    main: AlfColorEnum,
    hover: AlfColorEnum,
    focus: AlfColorEnum,
    disabled: AlfColorEnum,
    active: AlfColorEnum,
    backgroundDefault?: AlfColorEnum,
    backgroundHover?: AlfColorEnum,
    borderDefault?: AlfColorEnum,
    borderHover?: AlfColorEnum,
    borderWidth?: AlfPxEnum,
    textStyleDefault?: AlfColorEnum,
    textStyleHover?: AlfColorEnum,
    textStyleFocus?: AlfColorEnum,
    textStyleDisabled?: AlfColorEnum,
    textStyleActive?: AlfColorEnum,
) => {
    if (!backgroundDefault) {
        backgroundDefault = AlfColorEnum.Transparent;
    }
    if (!backgroundHover) {
        backgroundHover = AlfColorEnum.Transparent;
    }
    if (!borderDefault) {
        borderDefault = AlfColorEnum.Transparent;
    }
    if (!borderHover) {
        borderHover = AlfColorEnum.Transparent;
    }
    if (!borderWidth) {
        borderWidth = AlfPxEnum.None;
    }
    const completed = {
        paddingBase: buildPaddingBaseConfig(),
        displayAndLayoutBase: buildDisplayAndLayoutBaseConfig(),
        marginBase: buildMarginBaseConfig(),
        animationsBase: buildAnimationsBaseConfig(),
        transformBase: buildTransformConfig(),
        typographyBase: buildTypographyBaseConfig(main, hover, focus, disabled, active),
        borderBase: buildColorBorderConfig(borderDefault, borderHover, borderWidth, disabled),
        textStyleBase: buildTextStyleConfig(
        textStyleDefault ? textStyleDefault : main,
        textStyleHover ? textStyleHover : hover,
        textStyleFocus ? textStyleFocus : focus,
        textStyleDisabled ? textStyleDisabled : disabled,
        textStyleActive ? textStyleActive : active),
        shadowsBase: buildShadowsBaseConfig(main, hover, focus, disabled, active),
        outlineBase: buildOutlineBaseConfig(main, hover, focus, disabled, active),
        backgroundsBase: buildColorBackgroundConfig(backgroundDefault, backgroundHover, disabled),
        ripple: { color: main }

    }

    return completed;
}

// export const resolveVariantConfig = (
//     variant?: AlfColorVariantEnum,
//     componentType?: AlfComponentTypeEnum
// ): PredefinedConfig => {
//     const v = resolveAlfColorVariant(variant);

//     if (!v || v === AlfColorVariantEnum.Transparent || v === AlfColorVariantEnum.Default) {
//         return {
//             marginBase: undefined,
//             paddingBase: undefined,
//             displayAndLayoutBase: undefined,
//             shadowsBase: undefined,
//             transformBase: undefined,
//             backgroundsBase: undefined,
//             typographyBase: undefined,
//             borderBase: undefined,
//             animationsBase: undefined,
//             ripple: undefined,
//             textStyleBase: undefined,
//             outlineBase: undefined
//         }
//     }

//     const outlinedFilledComponents = [
//         AlfComponentTypeEnum.RadioButton,
//         AlfComponentTypeEnum.Checkbox,
//         AlfComponentTypeEnum.Switch,
//         AlfComponentTypeEnum.Tabs,
//         AlfComponentTypeEnum.Card,
//     ];



//     switch (v as any) {
//         // FAMILY: PRIMARY
//         case AlfColorVariantEnum.Primary:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 // aqui debemos poner como lo teniamos definido antes
                
//                 return defaultConstruct(AlfColorEnum.Primary, AlfColorEnum.PrimaryHover, AlfColorEnum.PrimaryHover, AlfColorEnum.PrimaryDisabled, AlfColorEnum.PrimaryHover, AlfColorEnum.Primary, AlfColorEnum.PrimaryHover, AlfColorEnum.Primary, AlfColorEnum.PrimaryHover, AlfPxEnum.Px1, AlfColorEnum.Primary, AlfColorEnum.PrimaryHover, AlfColorEnum.Primary, AlfColorEnum.PrimaryDisabled, AlfColorEnum.Primary);
//             }
            
//             return defaultConstruct(AlfColorEnum.PrimaryText, AlfColorEnum.PrimaryTextHover, AlfColorEnum.PrimaryTextHover, AlfColorEnum.PrimaryTextDisabled, AlfColorEnum.PrimaryTextHover, AlfColorEnum.Primary, AlfColorEnum.PrimaryHover, AlfColorEnum.Primary, AlfColorEnum.PrimaryHover);
//             case AlfColorVariantEnum.Primary3D:
//             if (outlinedFilledComponents.includes(componentType)) {
            
//                 return defaultConstruct(AlfColorEnum.Primary3DText, AlfColorEnum.Primary3DTextHover, AlfColorEnum.Primary3DTextHover, AlfColorEnum.PrimaryDisabled, AlfColorEnum.Primary3DTextHover, AlfColorEnum.Primary3D, AlfColorEnum.Primary3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.Primary, AlfColorEnum.PrimaryHover, AlfColorEnum.Primary, AlfColorEnum.PrimaryDisabled, AlfColorEnum.Primary);
//             }

//             return defaultConstruct(AlfColorEnum.Primary3DText, AlfColorEnum.Primary3DTextHover, AlfColorEnum.Primary3DTextHover, AlfColorEnum.PrimaryDisabled, AlfColorEnum.Primary3DTextHover, AlfColorEnum.Primary3D, AlfColorEnum.Primary3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.PrimaryOutline:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.PrimaryOutlineText, AlfColorEnum.PrimaryOutlineTextHover, AlfColorEnum.PrimaryOutlineTextHover, AlfColorEnum.PrimaryOutlineDisabled, AlfColorEnum.PrimaryOutlineTextHover, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.PrimaryOutline, AlfColorEnum.PrimaryOutlineHover, AlfPxEnum.Px015, AlfColorEnum.PrimaryOutlineText, AlfColorEnum.PrimaryOutlineTextHover, AlfColorEnum.PrimaryOutlineText, AlfColorEnum.PrimaryOutlineDisabled, AlfColorEnum.PrimaryOutlineText);
//             }

//             return defaultConstruct(AlfColorEnum.PrimaryOutlineText, AlfColorEnum.PrimaryOutlineTextHover, AlfColorEnum.PrimaryOutlineTextHover, AlfColorEnum.PrimaryOutlineDisabled, AlfColorEnum.PrimaryOutlineTextHover, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.PrimaryOutline, AlfColorEnum.PrimaryOutlineHover, AlfPxEnum.Px015);
//         case AlfColorVariantEnum.PrimarySoft:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.PrimarySoftText, AlfColorEnum.PrimarySoftTextHover, AlfColorEnum.PrimarySoftFocus, AlfColorEnum.PrimarySoftDisabled, AlfColorEnum.PrimarySoftActive, AlfColorEnum.PrimarySoft, AlfColorEnum.PrimarySoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.PrimarySoftText, AlfColorEnum.PrimarySoftTextHover, AlfColorEnum.PrimarySoftText, AlfColorEnum.PrimaryDisabled, AlfColorEnum.PrimarySoftText);
//             }

//             return defaultConstruct(AlfColorEnum.PrimarySoftText, AlfColorEnum.PrimarySoftTextHover, AlfColorEnum.PrimarySoftFocus, AlfColorEnum.PrimarySoftDisabled, AlfColorEnum.PrimarySoftActive, AlfColorEnum.PrimarySoft, AlfColorEnum.PrimarySoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.PrimaryGhost:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.PrimaryGhostText, AlfColorEnum.PrimaryGhostTextHover, AlfColorEnum.PrimaryGhostFocus, AlfColorEnum.PrimaryGhostDisabled, AlfColorEnum.PrimaryGhostActive, AlfColorEnum.PrimaryGhostHover, AlfColorEnum.PrimaryGhostHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.PrimaryGhostText, AlfColorEnum.PrimaryGhostTextHover, AlfColorEnum.PrimaryGhostText, AlfColorEnum.PrimaryDisabled, AlfColorEnum.PrimaryGhostText);
//             }

//             return defaultConstruct(AlfColorEnum.PrimaryGhostText, AlfColorEnum.PrimaryGhostTextHover, AlfColorEnum.PrimaryGhostFocus, AlfColorEnum.PrimaryGhostDisabled, AlfColorEnum.PrimaryGhostActive, AlfColorEnum.PrimaryGhostHover, AlfColorEnum.PrimaryGhostHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.PrimaryCrystal:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.PrimaryCrystalText, AlfColorEnum.PrimaryCrystalTextHover, AlfColorEnum.PrimaryCrystalFocus, AlfColorEnum.PrimaryCrystalDisabled, AlfColorEnum.PrimaryCrystalActive, AlfColorEnum.PrimaryCrystal, AlfColorEnum.PrimaryCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40, AlfPxEnum.None, AlfColorEnum.PrimaryCrystalText, AlfColorEnum.PrimaryCrystalTextHover, AlfColorEnum.PrimaryCrystalText, AlfColorEnum.PrimaryDisabled, AlfColorEnum.PrimaryCrystalText);
//             }

//             return defaultConstruct(AlfColorEnum.PrimaryCrystalText, AlfColorEnum.PrimaryCrystalTextHover, AlfColorEnum.PrimaryCrystalFocus, AlfColorEnum.PrimaryCrystalDisabled, AlfColorEnum.PrimaryCrystalActive, AlfColorEnum.PrimaryCrystal, AlfColorEnum.PrimaryCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

//         // FAMILY: SECONDARY
//         case AlfColorVariantEnum.Secondary:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.SecondaryHover, AlfColorEnum.SecondaryDisabled, AlfColorEnum.SecondaryHover, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfPxEnum.Px1, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.Secondary, AlfColorEnum.SecondaryDisabled, AlfColorEnum.Secondary);
//             }

//             return defaultConstruct(AlfColorEnum.SecondaryText, AlfColorEnum.SecondaryTextHover, AlfColorEnum.SecondaryTextHover, AlfColorEnum.SecondaryTextDisabled, AlfColorEnum.SecondaryTextHover, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover);
//         case AlfColorVariantEnum.Secondary3D:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.Secondary3DText, AlfColorEnum.Secondary3DTextHover, AlfColorEnum.Secondary3DTextHover, AlfColorEnum.SecondaryDisabled, AlfColorEnum.Secondary3DTextHover, AlfColorEnum.Secondary3D, AlfColorEnum.Secondary3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.Secondary, AlfColorEnum.SecondaryDisabled, AlfColorEnum.Secondary);
//             }

//             return defaultConstruct(AlfColorEnum.Secondary3DText, AlfColorEnum.Secondary3DTextHover, AlfColorEnum.Secondary3DTextHover, AlfColorEnum.SecondaryDisabled, AlfColorEnum.Secondary3DTextHover, AlfColorEnum.Secondary3D, AlfColorEnum.Secondary3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.SecondaryOutline:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.SecondaryOutlineText, AlfColorEnum.SecondaryOutlineTextHover, AlfColorEnum.SecondaryOutlineTextHover, AlfColorEnum.SecondaryOutlineDisabled, AlfColorEnum.SecondaryOutlineTextHover, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.SecondaryOutline, AlfColorEnum.SecondaryOutlineHover, AlfPxEnum.Px1, AlfColorEnum.SecondaryOutlineText, AlfColorEnum.SecondaryOutlineTextHover, AlfColorEnum.SecondaryOutlineText, AlfColorEnum.SecondaryOutlineDisabled, AlfColorEnum.SecondaryOutlineText);
//             }

//             return defaultConstruct(AlfColorEnum.SecondaryOutlineText, AlfColorEnum.SecondaryOutlineTextHover, AlfColorEnum.SecondaryOutlineTextHover, AlfColorEnum.SecondaryOutlineDisabled, AlfColorEnum.SecondaryOutlineTextHover, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.SecondaryOutline, AlfColorEnum.SecondaryOutlineHover, AlfPxEnum.Px1);
//         case AlfColorVariantEnum.SecondarySoft:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.SecondarySoftText, AlfColorEnum.SecondarySoftTextHover, AlfColorEnum.SecondarySoftFocus, AlfColorEnum.SecondarySoftDisabled, AlfColorEnum.SecondarySoftActive, AlfColorEnum.SecondarySoft, AlfColorEnum.SecondarySoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.SecondarySoftText, AlfColorEnum.SecondarySoftTextHover, AlfColorEnum.SecondarySoftText, AlfColorEnum.SecondaryDisabled, AlfColorEnum.SecondarySoftText);
//             }

//             return defaultConstruct(AlfColorEnum.SecondarySoftText, AlfColorEnum.SecondarySoftTextHover, AlfColorEnum.SecondarySoftFocus, AlfColorEnum.SecondarySoftDisabled, AlfColorEnum.SecondarySoftActive, AlfColorEnum.SecondarySoft, AlfColorEnum.SecondarySoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.SecondaryGhost:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.SecondaryGhostText, AlfColorEnum.SecondaryGhostTextHover, AlfColorEnum.SecondaryGhostFocus, AlfColorEnum.SecondaryGhostDisabled, AlfColorEnum.SecondaryGhostActive, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.SecondaryGhostText, AlfColorEnum.SecondaryGhostTextHover, AlfColorEnum.SecondaryGhostText, AlfColorEnum.SecondaryDisabled, AlfColorEnum.SecondaryGhostText);
//             }

//             return defaultConstruct(AlfColorEnum.SecondaryGhostText, AlfColorEnum.SecondaryGhostTextHover, AlfColorEnum.SecondaryGhostFocus, AlfColorEnum.SecondaryGhostDisabled, AlfColorEnum.SecondaryGhostActive, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.SecondaryCrystal:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.SecondaryCrystalText, AlfColorEnum.SecondaryCrystalTextHover, AlfColorEnum.SecondaryCrystalFocus, AlfColorEnum.SecondaryCrystalDisabled, AlfColorEnum.SecondaryCrystalActive, AlfColorEnum.SecondaryCrystal, AlfColorEnum.SecondaryCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40, AlfPxEnum.None, AlfColorEnum.SecondaryCrystalText, AlfColorEnum.SecondaryCrystalTextHover, AlfColorEnum.SecondaryCrystalText, AlfColorEnum.SecondaryDisabled, AlfColorEnum.SecondaryCrystalText);
//             }

//             return defaultConstruct(AlfColorEnum.SecondaryCrystalText, AlfColorEnum.SecondaryCrystalTextHover, AlfColorEnum.SecondaryCrystalFocus, AlfColorEnum.SecondaryCrystalDisabled, AlfColorEnum.SecondaryCrystalActive, AlfColorEnum.SecondaryCrystal, AlfColorEnum.SecondaryCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

//         // FAMILY: SUCCESS
//         case AlfColorVariantEnum.Success:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.Success, AlfColorEnum.SuccessHover, AlfColorEnum.SuccessHover, AlfColorEnum.SuccessDisabled, AlfColorEnum.SuccessHover, AlfColorEnum.Success, AlfColorEnum.SuccessHover, AlfColorEnum.Success, AlfColorEnum.SuccessHover, AlfPxEnum.Px1, AlfColorEnum.Success, AlfColorEnum.SuccessHover, AlfColorEnum.Success, AlfColorEnum.SuccessDisabled, AlfColorEnum.Success);
//             }

//             return defaultConstruct(AlfColorEnum.SuccessText, AlfColorEnum.SuccessTextHover, AlfColorEnum.SuccessTextHover, AlfColorEnum.SuccessTextDisabled, AlfColorEnum.SuccessTextHover, AlfColorEnum.Success, AlfColorEnum.SuccessHover, AlfColorEnum.Success, AlfColorEnum.SuccessHover);
//         case AlfColorVariantEnum.Success3D:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.Success3DText, AlfColorEnum.Success3DTextHover, AlfColorEnum.Success3DTextHover, AlfColorEnum.SuccessDisabled, AlfColorEnum.Success3DTextHover, AlfColorEnum.Success3D, AlfColorEnum.Success3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.Success, AlfColorEnum.SuccessHover, AlfColorEnum.Success, AlfColorEnum.SuccessDisabled, AlfColorEnum.Success);
//             }

//             return defaultConstruct(AlfColorEnum.Success3DText, AlfColorEnum.Success3DTextHover, AlfColorEnum.Success3DTextHover, AlfColorEnum.SuccessDisabled, AlfColorEnum.Success3DTextHover, AlfColorEnum.Success3D, AlfColorEnum.Success3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.SuccessOutline:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.SuccessOutlineText, AlfColorEnum.SuccessOutlineTextHover, AlfColorEnum.SuccessOutlineTextHover, AlfColorEnum.SuccessOutlineDisabled, AlfColorEnum.SuccessOutlineTextHover, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.SuccessOutline, AlfColorEnum.SuccessOutlineHover, AlfPxEnum.Px1, AlfColorEnum.SuccessOutlineText, AlfColorEnum.SuccessOutlineTextHover, AlfColorEnum.SuccessOutlineText, AlfColorEnum.SuccessOutlineDisabled, AlfColorEnum.SuccessOutlineText);
//             }

//             return defaultConstruct(AlfColorEnum.SuccessOutlineText, AlfColorEnum.SuccessOutlineTextHover, AlfColorEnum.SuccessOutlineTextHover, AlfColorEnum.SuccessOutlineDisabled, AlfColorEnum.SuccessOutlineTextHover, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.SuccessOutline, AlfColorEnum.SuccessOutlineHover, AlfPxEnum.Px1);
//         case AlfColorVariantEnum.SuccessSoft:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.SuccessSoftText, AlfColorEnum.SuccessSoftTextHover, AlfColorEnum.SuccessSoftFocus, AlfColorEnum.SuccessSoftDisabled, AlfColorEnum.SuccessSoftActive, AlfColorEnum.SuccessSoft, AlfColorEnum.SuccessSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.SuccessSoftText, AlfColorEnum.SuccessSoftTextHover, AlfColorEnum.SuccessSoftText, AlfColorEnum.SuccessDisabled, AlfColorEnum.SuccessSoftText);
//             }

//             return defaultConstruct(AlfColorEnum.SuccessSoftText, AlfColorEnum.SuccessSoftTextHover, AlfColorEnum.SuccessSoftFocus, AlfColorEnum.SuccessSoftDisabled, AlfColorEnum.SuccessSoftActive, AlfColorEnum.SuccessSoft, AlfColorEnum.SuccessSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.SuccessGhost:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.SuccessGhostText, AlfColorEnum.SuccessGhostTextHover, AlfColorEnum.SuccessGhostFocus, AlfColorEnum.SuccessGhostDisabled, AlfColorEnum.SuccessGhostActive, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.SuccessGhostText, AlfColorEnum.SuccessGhostTextHover, AlfColorEnum.SuccessGhostText, AlfColorEnum.SuccessDisabled, AlfColorEnum.SuccessGhostText);
//             }

//             return defaultConstruct(AlfColorEnum.SuccessGhostText, AlfColorEnum.SuccessGhostTextHover, AlfColorEnum.SuccessGhostFocus, AlfColorEnum.SuccessGhostDisabled, AlfColorEnum.SuccessGhostActive, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.SuccessCrystal:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.SuccessCrystalText, AlfColorEnum.SuccessCrystalTextHover, AlfColorEnum.SuccessCrystalFocus, AlfColorEnum.SuccessCrystalDisabled, AlfColorEnum.SuccessCrystalActive, AlfColorEnum.SuccessCrystal, AlfColorEnum.SuccessCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40, AlfPxEnum.None, AlfColorEnum.SuccessCrystalText, AlfColorEnum.SuccessCrystalTextHover, AlfColorEnum.SuccessCrystalText, AlfColorEnum.SuccessDisabled, AlfColorEnum.SuccessCrystalText);
//             }

//             return defaultConstruct(AlfColorEnum.SuccessCrystalText, AlfColorEnum.SuccessCrystalTextHover, AlfColorEnum.SuccessCrystalFocus, AlfColorEnum.SuccessCrystalDisabled, AlfColorEnum.SuccessCrystalActive, AlfColorEnum.SuccessCrystal, AlfColorEnum.SuccessCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

//         // FAMILY: DANGER
//         case AlfColorVariantEnum.Danger:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.Danger, AlfColorEnum.DangerHover, AlfColorEnum.DangerHover, AlfColorEnum.DangerDisabled, AlfColorEnum.DangerHover, AlfColorEnum.Danger, AlfColorEnum.DangerHover, AlfColorEnum.Danger, AlfColorEnum.DangerHover, AlfPxEnum.Px1, AlfColorEnum.Danger, AlfColorEnum.DangerHover, AlfColorEnum.Danger, AlfColorEnum.DangerDisabled, AlfColorEnum.Danger);
//             }

//             return defaultConstruct(AlfColorEnum.DangerText, AlfColorEnum.DangerTextHover, AlfColorEnum.DangerTextHover, AlfColorEnum.DangerTextDisabled, AlfColorEnum.DangerTextHover, AlfColorEnum.Danger, AlfColorEnum.DangerHover, AlfColorEnum.Danger, AlfColorEnum.DangerHover);
//         case AlfColorVariantEnum.Danger3D:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.Danger3DText, AlfColorEnum.Danger3DTextHover, AlfColorEnum.Danger3DTextHover, AlfColorEnum.DangerDisabled, AlfColorEnum.Danger3DTextHover, AlfColorEnum.Danger3D, AlfColorEnum.Danger3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.Danger, AlfColorEnum.DangerHover, AlfColorEnum.Danger, AlfColorEnum.DangerDisabled, AlfColorEnum.Danger);
//             }

//             return defaultConstruct(AlfColorEnum.Danger3DText, AlfColorEnum.Danger3DTextHover, AlfColorEnum.Danger3DTextHover, AlfColorEnum.DangerDisabled, AlfColorEnum.Danger3DTextHover, AlfColorEnum.Danger3D, AlfColorEnum.Danger3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.DangerOutline:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.DangerOutlineText, AlfColorEnum.DangerOutlineTextHover, AlfColorEnum.DangerOutlineTextHover, AlfColorEnum.DangerOutlineDisabled, AlfColorEnum.DangerOutlineTextHover, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.DangerOutline, AlfColorEnum.DangerOutlineHover, AlfPxEnum.Px1, AlfColorEnum.DangerOutlineText, AlfColorEnum.DangerOutlineTextHover, AlfColorEnum.DangerOutlineText, AlfColorEnum.DangerOutlineDisabled, AlfColorEnum.DangerOutlineText);
//             }

//             return defaultConstruct(AlfColorEnum.DangerOutlineText, AlfColorEnum.DangerOutlineTextHover, AlfColorEnum.DangerOutlineTextHover, AlfColorEnum.DangerOutlineDisabled, AlfColorEnum.DangerOutlineTextHover, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.DangerOutline, AlfColorEnum.DangerOutlineHover, AlfPxEnum.Px1);
//         case AlfColorVariantEnum.DangerSoft:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.DangerSoftText, AlfColorEnum.DangerSoftTextHover, AlfColorEnum.DangerSoftFocus, AlfColorEnum.DangerSoftDisabled, AlfColorEnum.DangerSoftActive, AlfColorEnum.DangerSoft, AlfColorEnum.DangerSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.DangerSoftText, AlfColorEnum.DangerSoftTextHover, AlfColorEnum.DangerSoftText, AlfColorEnum.DangerDisabled, AlfColorEnum.DangerSoftText);
//             }

//             return defaultConstruct(AlfColorEnum.DangerSoftText, AlfColorEnum.DangerSoftTextHover, AlfColorEnum.DangerSoftFocus, AlfColorEnum.DangerSoftDisabled, AlfColorEnum.DangerSoftActive, AlfColorEnum.DangerSoft, AlfColorEnum.DangerSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.DangerGhost:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.DangerGhostText, AlfColorEnum.DangerGhostTextHover, AlfColorEnum.DangerGhostFocus, AlfColorEnum.DangerGhostDisabled, AlfColorEnum.DangerGhostActive, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.DangerGhostText, AlfColorEnum.DangerGhostTextHover, AlfColorEnum.DangerGhostText, AlfColorEnum.DangerDisabled, AlfColorEnum.DangerGhostText);
//             }

//             return defaultConstruct(AlfColorEnum.DangerGhostText, AlfColorEnum.DangerGhostTextHover, AlfColorEnum.DangerGhostFocus, AlfColorEnum.DangerGhostDisabled, AlfColorEnum.DangerGhostActive, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.DangerCrystal:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.DangerCrystalText, AlfColorEnum.DangerCrystalTextHover, AlfColorEnum.DangerCrystalFocus, AlfColorEnum.DangerCrystalDisabled, AlfColorEnum.DangerCrystalActive, AlfColorEnum.DangerCrystal, AlfColorEnum.DangerCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40, AlfPxEnum.None, AlfColorEnum.DangerCrystalText, AlfColorEnum.DangerCrystalTextHover, AlfColorEnum.DangerCrystalText, AlfColorEnum.DangerDisabled, AlfColorEnum.DangerCrystalText);
//             }

//             return defaultConstruct(AlfColorEnum.DangerCrystalText, AlfColorEnum.DangerCrystalTextHover, AlfColorEnum.DangerCrystalFocus, AlfColorEnum.DangerCrystalDisabled, AlfColorEnum.DangerCrystalActive, AlfColorEnum.DangerCrystal, AlfColorEnum.DangerCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

//         // FAMILY: WARNING
//         case AlfColorVariantEnum.Warning:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.Warning, AlfColorEnum.WarningHover, AlfColorEnum.WarningHover, AlfColorEnum.WarningDisabled, AlfColorEnum.WarningHover, AlfColorEnum.Warning, AlfColorEnum.WarningHover, AlfColorEnum.Warning, AlfColorEnum.WarningHover, AlfPxEnum.Px1, AlfColorEnum.Warning, AlfColorEnum.WarningHover, AlfColorEnum.Warning, AlfColorEnum.WarningDisabled, AlfColorEnum.Warning);
//             }

//             return defaultConstruct(AlfColorEnum.WarningText, AlfColorEnum.WarningTextHover, AlfColorEnum.WarningTextHover, AlfColorEnum.WarningTextDisabled, AlfColorEnum.WarningTextHover, AlfColorEnum.Warning, AlfColorEnum.WarningHover, AlfColorEnum.Warning, AlfColorEnum.WarningHover);
//         case AlfColorVariantEnum.Warning3D:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.Warning3DText, AlfColorEnum.Warning3DTextHover, AlfColorEnum.Warning3DTextHover, AlfColorEnum.WarningDisabled, AlfColorEnum.Warning3DTextHover, AlfColorEnum.Warning3D, AlfColorEnum.Warning3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.Warning, AlfColorEnum.WarningHover, AlfColorEnum.Warning, AlfColorEnum.WarningDisabled, AlfColorEnum.Warning);
//             }

//             return defaultConstruct(AlfColorEnum.Warning3DText, AlfColorEnum.Warning3DTextHover, AlfColorEnum.Warning3DTextHover, AlfColorEnum.WarningDisabled, AlfColorEnum.Warning3DTextHover, AlfColorEnum.Warning3D, AlfColorEnum.Warning3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.WarningOutline:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.WarningOutlineText, AlfColorEnum.WarningOutlineTextHover, AlfColorEnum.WarningOutlineTextHover, AlfColorEnum.WarningOutlineDisabled, AlfColorEnum.WarningOutlineTextHover, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.WarningOutline, AlfColorEnum.WarningOutlineHover, AlfPxEnum.Px1, AlfColorEnum.WarningOutlineText, AlfColorEnum.WarningOutlineTextHover, AlfColorEnum.WarningOutlineText, AlfColorEnum.WarningOutlineDisabled, AlfColorEnum.WarningOutlineText);
//             }

//             return defaultConstruct(AlfColorEnum.WarningOutlineText, AlfColorEnum.WarningOutlineTextHover, AlfColorEnum.WarningOutlineTextHover, AlfColorEnum.WarningOutlineDisabled, AlfColorEnum.WarningOutlineTextHover, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.WarningOutline, AlfColorEnum.WarningOutlineHover, AlfPxEnum.Px1);
//         case AlfColorVariantEnum.WarningSoft:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.WarningSoftText, AlfColorEnum.WarningSoftTextHover, AlfColorEnum.WarningSoftFocus, AlfColorEnum.WarningSoftDisabled, AlfColorEnum.WarningSoftActive, AlfColorEnum.WarningSoft, AlfColorEnum.WarningSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.WarningSoftText, AlfColorEnum.WarningSoftTextHover, AlfColorEnum.WarningSoftText, AlfColorEnum.WarningDisabled, AlfColorEnum.WarningSoftText);
//             }

//             return defaultConstruct(AlfColorEnum.WarningSoftText, AlfColorEnum.WarningSoftTextHover, AlfColorEnum.WarningSoftFocus, AlfColorEnum.WarningSoftDisabled, AlfColorEnum.WarningSoftActive, AlfColorEnum.WarningSoft, AlfColorEnum.WarningSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.WarningGhost:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.WarningGhostText, AlfColorEnum.WarningGhostTextHover, AlfColorEnum.WarningGhostFocus, AlfColorEnum.WarningGhostDisabled, AlfColorEnum.WarningGhostActive, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.WarningGhostText, AlfColorEnum.WarningGhostTextHover, AlfColorEnum.WarningGhostText, AlfColorEnum.WarningDisabled, AlfColorEnum.WarningGhostText);
//             }

//             return defaultConstruct(AlfColorEnum.WarningGhostText, AlfColorEnum.WarningGhostTextHover, AlfColorEnum.WarningGhostFocus, AlfColorEnum.WarningGhostDisabled, AlfColorEnum.WarningGhostActive, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.WarningCrystal:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.WarningCrystalText, AlfColorEnum.WarningCrystalTextHover, AlfColorEnum.WarningCrystalFocus, AlfColorEnum.WarningCrystalDisabled, AlfColorEnum.WarningCrystalActive, AlfColorEnum.WarningCrystal, AlfColorEnum.WarningCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40, AlfPxEnum.None, AlfColorEnum.WarningCrystalText, AlfColorEnum.WarningCrystalTextHover, AlfColorEnum.WarningCrystalText, AlfColorEnum.WarningDisabled, AlfColorEnum.WarningCrystalText);
//             }

//             return defaultConstruct(AlfColorEnum.WarningCrystalText, AlfColorEnum.WarningCrystalTextHover, AlfColorEnum.WarningCrystalFocus, AlfColorEnum.WarningCrystalDisabled, AlfColorEnum.WarningCrystalActive, AlfColorEnum.WarningCrystal, AlfColorEnum.WarningCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

//         // FAMILY: INFO
//         case AlfColorVariantEnum.Info:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.Info, AlfColorEnum.InfoHover, AlfColorEnum.InfoHover, AlfColorEnum.InfoDisabled, AlfColorEnum.InfoHover, AlfColorEnum.Info, AlfColorEnum.InfoHover, AlfColorEnum.Info, AlfColorEnum.InfoHover, AlfPxEnum.Px1, AlfColorEnum.Info, AlfColorEnum.InfoHover, AlfColorEnum.Info, AlfColorEnum.InfoDisabled, AlfColorEnum.Info);
//             }

//             return defaultConstruct(AlfColorEnum.InfoText, AlfColorEnum.InfoTextHover, AlfColorEnum.InfoTextHover, AlfColorEnum.InfoTextDisabled, AlfColorEnum.InfoTextHover, AlfColorEnum.Info, AlfColorEnum.InfoHover, AlfColorEnum.Info, AlfColorEnum.InfoHover);
//         case AlfColorVariantEnum.Info3D:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.Info3DText, AlfColorEnum.Info3DTextHover, AlfColorEnum.Info3DTextHover, AlfColorEnum.InfoDisabled, AlfColorEnum.Info3DTextHover, AlfColorEnum.Info3D, AlfColorEnum.Info3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.Info, AlfColorEnum.InfoHover, AlfColorEnum.Info, AlfColorEnum.InfoDisabled, AlfColorEnum.Info);
//             }

//             return defaultConstruct(AlfColorEnum.Info3DText, AlfColorEnum.Info3DTextHover, AlfColorEnum.Info3DTextHover, AlfColorEnum.InfoDisabled, AlfColorEnum.Info3DTextHover, AlfColorEnum.Info3D, AlfColorEnum.Info3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.InfoOutline:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.InfoOutlineText, AlfColorEnum.InfoOutlineTextHover, AlfColorEnum.InfoOutlineTextHover, AlfColorEnum.InfoOutlineDisabled, AlfColorEnum.InfoOutlineTextHover, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.InfoOutline, AlfColorEnum.InfoOutlineHover, AlfPxEnum.Px1, AlfColorEnum.InfoOutlineText, AlfColorEnum.InfoOutlineTextHover, AlfColorEnum.InfoOutlineText, AlfColorEnum.InfoOutlineDisabled, AlfColorEnum.InfoOutlineText);
//             }

//             return defaultConstruct(AlfColorEnum.InfoOutlineText, AlfColorEnum.InfoOutlineTextHover, AlfColorEnum.InfoOutlineTextHover, AlfColorEnum.InfoOutlineDisabled, AlfColorEnum.InfoOutlineTextHover, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.InfoOutline, AlfColorEnum.InfoOutlineHover, AlfPxEnum.Px1);
//         case AlfColorVariantEnum.InfoSoft:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.InfoSoftText, AlfColorEnum.InfoSoftTextHover, AlfColorEnum.InfoSoftFocus, AlfColorEnum.InfoSoftDisabled, AlfColorEnum.InfoSoftActive, AlfColorEnum.InfoSoft, AlfColorEnum.InfoSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.InfoSoftText, AlfColorEnum.InfoSoftTextHover, AlfColorEnum.InfoSoftText, AlfColorEnum.InfoDisabled, AlfColorEnum.InfoSoftText);
//             }

//             return defaultConstruct(AlfColorEnum.InfoSoftText, AlfColorEnum.InfoSoftTextHover, AlfColorEnum.InfoSoftFocus, AlfColorEnum.InfoSoftDisabled, AlfColorEnum.InfoSoftActive, AlfColorEnum.InfoSoft, AlfColorEnum.InfoSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.InfoGhost:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.InfoGhostText, AlfColorEnum.InfoGhostTextHover, AlfColorEnum.InfoGhostFocus, AlfColorEnum.InfoGhostDisabled, AlfColorEnum.InfoGhostActive, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.InfoGhostText, AlfColorEnum.InfoGhostTextHover, AlfColorEnum.InfoGhostText, AlfColorEnum.InfoDisabled, AlfColorEnum.InfoGhostText);
//             }

//             return defaultConstruct(AlfColorEnum.InfoGhostText, AlfColorEnum.InfoGhostTextHover, AlfColorEnum.InfoGhostFocus, AlfColorEnum.InfoGhostDisabled, AlfColorEnum.InfoGhostActive, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.InfoCrystal:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.InfoCrystalText, AlfColorEnum.InfoCrystalTextHover, AlfColorEnum.InfoCrystalFocus, AlfColorEnum.InfoCrystalDisabled, AlfColorEnum.InfoCrystalActive, AlfColorEnum.InfoCrystal, AlfColorEnum.InfoCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40, AlfPxEnum.None, AlfColorEnum.InfoCrystalText, AlfColorEnum.InfoCrystalTextHover, AlfColorEnum.InfoCrystalText, AlfColorEnum.InfoDisabled, AlfColorEnum.InfoCrystalText);
//             }

//             return defaultConstruct(AlfColorEnum.InfoCrystalText, AlfColorEnum.InfoCrystalTextHover, AlfColorEnum.InfoCrystalFocus, AlfColorEnum.InfoCrystalDisabled, AlfColorEnum.InfoCrystalActive, AlfColorEnum.InfoCrystal, AlfColorEnum.InfoCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

//         // FAMILY: DARK
//         case AlfColorVariantEnum.Dark:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.Dark, AlfColorEnum.DarkHover, AlfColorEnum.DarkHover, AlfColorEnum.DarkDisabled, AlfColorEnum.DarkHover, AlfColorEnum.Dark, AlfColorEnum.DarkHover, AlfColorEnum.Dark, AlfColorEnum.DarkHover, AlfPxEnum.Px1, AlfColorEnum.Dark, AlfColorEnum.DarkHover, AlfColorEnum.Dark, AlfColorEnum.DarkDisabled, AlfColorEnum.Dark);
//             }

//             return defaultConstruct(AlfColorEnum.DarkText, AlfColorEnum.DarkTextHover, AlfColorEnum.DarkTextHover, AlfColorEnum.DarkTextDisabled, AlfColorEnum.DarkTextHover, AlfColorEnum.Dark, AlfColorEnum.DarkHover, AlfColorEnum.Dark, AlfColorEnum.DarkHover);
//         case AlfColorVariantEnum.Dark3D:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.Dark3DText, AlfColorEnum.Dark3DTextHover, AlfColorEnum.Dark3DTextHover, AlfColorEnum.DarkDisabled, AlfColorEnum.Dark3DTextHover, AlfColorEnum.Dark3D, AlfColorEnum.Dark3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.Dark, AlfColorEnum.DarkHover, AlfColorEnum.Dark, AlfColorEnum.DarkDisabled, AlfColorEnum.Dark);
//             }

//             return defaultConstruct(AlfColorEnum.Dark3DText, AlfColorEnum.Dark3DTextHover, AlfColorEnum.Dark3DTextHover, AlfColorEnum.DarkDisabled, AlfColorEnum.Dark3DTextHover, AlfColorEnum.Dark3D, AlfColorEnum.Dark3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.DarkOutline:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.DarkOutlineText, AlfColorEnum.DarkOutlineTextHover, AlfColorEnum.DarkOutlineTextHover, AlfColorEnum.DarkOutlineDisabled, AlfColorEnum.DarkOutlineTextHover, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.DarkOutline, AlfColorEnum.DarkOutlineHover, AlfPxEnum.Px1, AlfColorEnum.DarkOutlineText, AlfColorEnum.DarkOutlineTextHover, AlfColorEnum.DarkOutlineText, AlfColorEnum.DarkOutlineDisabled, AlfColorEnum.DarkOutlineText);
//             }

//             return defaultConstruct(AlfColorEnum.DarkOutlineText, AlfColorEnum.DarkOutlineTextHover, AlfColorEnum.DarkOutlineTextHover, AlfColorEnum.DarkOutlineDisabled, AlfColorEnum.DarkOutlineTextHover, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.DarkOutline, AlfColorEnum.DarkOutlineHover, AlfPxEnum.Px1);
//         case AlfColorVariantEnum.DarkSoft:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.DarkSoftText, AlfColorEnum.DarkSoftTextHover, AlfColorEnum.DarkSoftFocus, AlfColorEnum.DarkSoftDisabled, AlfColorEnum.DarkSoftActive, AlfColorEnum.DarkSoft, AlfColorEnum.DarkSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.DarkSoftText, AlfColorEnum.DarkSoftTextHover, AlfColorEnum.DarkSoftText, AlfColorEnum.DarkDisabled, AlfColorEnum.DarkSoftText);
//             }

//             return defaultConstruct(AlfColorEnum.DarkSoftText, AlfColorEnum.DarkSoftTextHover, AlfColorEnum.DarkSoftFocus, AlfColorEnum.DarkSoftDisabled, AlfColorEnum.DarkSoftActive, AlfColorEnum.DarkSoft, AlfColorEnum.DarkSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.DarkGhost:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.DarkGhostText, AlfColorEnum.DarkGhostTextHover, AlfColorEnum.DarkGhostFocus, AlfColorEnum.DarkGhostDisabled, AlfColorEnum.DarkGhostActive, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.DarkGhostText, AlfColorEnum.DarkGhostTextHover, AlfColorEnum.DarkGhostText, AlfColorEnum.DarkDisabled, AlfColorEnum.DarkGhostText);
//             }

//             return defaultConstruct(AlfColorEnum.DarkGhostText, AlfColorEnum.DarkGhostTextHover, AlfColorEnum.DarkGhostFocus, AlfColorEnum.DarkGhostDisabled, AlfColorEnum.DarkGhostActive, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.DarkCrystal:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.DarkCrystalText, AlfColorEnum.DarkCrystalTextHover, AlfColorEnum.DarkCrystalFocus, AlfColorEnum.DarkCrystalDisabled, AlfColorEnum.DarkCrystalActive, AlfColorEnum.DarkCrystal, AlfColorEnum.DarkCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40, AlfPxEnum.None, AlfColorEnum.DarkCrystalText, AlfColorEnum.DarkCrystalTextHover, AlfColorEnum.DarkCrystalText, AlfColorEnum.DarkDisabled, AlfColorEnum.DarkCrystalText);
//             }

//             return defaultConstruct(AlfColorEnum.DarkCrystalText, AlfColorEnum.DarkCrystalTextHover, AlfColorEnum.DarkCrystalFocus, AlfColorEnum.DarkCrystalDisabled, AlfColorEnum.DarkCrystalActive, AlfColorEnum.DarkCrystal, AlfColorEnum.DarkCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

//         // FAMILY: LIGHT
//         case AlfColorVariantEnum.Light:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.Light, AlfColorEnum.LightHover, AlfColorEnum.LightHover, AlfColorEnum.LightDisabled, AlfColorEnum.LightHover, AlfColorEnum.Light, AlfColorEnum.LightHover, AlfColorEnum.Light, AlfColorEnum.LightHover, AlfPxEnum.Px1, AlfColorEnum.Light, AlfColorEnum.LightHover, AlfColorEnum.Light, AlfColorEnum.LightDisabled, AlfColorEnum.Light);
//             }

//             return defaultConstruct(AlfColorEnum.LightText, AlfColorEnum.LightTextHover, AlfColorEnum.LightTextHover, AlfColorEnum.LightTextDisabled, AlfColorEnum.LightTextHover, AlfColorEnum.Light, AlfColorEnum.LightHover, AlfColorEnum.Light, AlfColorEnum.LightHover);
//         case AlfColorVariantEnum.Light3D:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.Light3DText, AlfColorEnum.Light3DTextHover, AlfColorEnum.Light3DTextHover, AlfColorEnum.LightDisabled, AlfColorEnum.Light3DTextHover, AlfColorEnum.Light3D, AlfColorEnum.Light3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.Light, AlfColorEnum.LightHover, AlfColorEnum.Light, AlfColorEnum.LightDisabled, AlfColorEnum.Light);
//             }

//             return defaultConstruct(AlfColorEnum.Light3DText, AlfColorEnum.Light3DTextHover, AlfColorEnum.Light3DTextHover, AlfColorEnum.LightDisabled, AlfColorEnum.Light3DTextHover, AlfColorEnum.Light3D, AlfColorEnum.Light3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.LightOutline:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.LightOutlineText, AlfColorEnum.LightOutlineTextHover, AlfColorEnum.LightOutlineTextHover, AlfColorEnum.LightOutlineDisabled, AlfColorEnum.LightOutlineTextHover, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.LightOutline, AlfColorEnum.LightOutlineHover, AlfPxEnum.Px1, AlfColorEnum.LightOutlineText, AlfColorEnum.LightOutlineTextHover, AlfColorEnum.LightOutlineText, AlfColorEnum.LightOutlineDisabled, AlfColorEnum.LightOutlineText);
//             }

//             return defaultConstruct(AlfColorEnum.LightOutlineText, AlfColorEnum.LightOutlineTextHover, AlfColorEnum.LightOutlineTextHover, AlfColorEnum.LightOutlineDisabled, AlfColorEnum.LightOutlineTextHover, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.LightOutline, AlfColorEnum.LightOutlineHover, AlfPxEnum.Px1);
//         case AlfColorVariantEnum.LightSoft:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.LightSoftText, AlfColorEnum.LightSoftTextHover, AlfColorEnum.LightSoftFocus, AlfColorEnum.LightSoftDisabled, AlfColorEnum.LightSoftActive, AlfColorEnum.LightSoft, AlfColorEnum.LightSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.LightSoftText, AlfColorEnum.LightSoftTextHover, AlfColorEnum.LightSoftText, AlfColorEnum.SecondaryDisabled, AlfColorEnum.LightSoftText);
//             }

//             return defaultConstruct(AlfColorEnum.LightSoftText, AlfColorEnum.LightSoftTextHover, AlfColorEnum.LightSoftFocus, AlfColorEnum.LightSoftDisabled, AlfColorEnum.LightSoftActive, AlfColorEnum.LightSoft, AlfColorEnum.LightSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.LightGhost:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.LightGhostText, AlfColorEnum.LightGhostTextHover, AlfColorEnum.LightGhostFocus, AlfColorEnum.LightGhostDisabled, AlfColorEnum.LightGhostActive, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None, AlfColorEnum.LightGhostText, AlfColorEnum.LightGhostTextHover, AlfColorEnum.LightGhostText, AlfColorEnum.SecondaryDisabled, AlfColorEnum.LightGhostText);
//             }

//             return defaultConstruct(AlfColorEnum.LightGhostText, AlfColorEnum.LightGhostTextHover, AlfColorEnum.LightGhostFocus, AlfColorEnum.LightGhostDisabled, AlfColorEnum.LightGhostActive, AlfColorEnum.LightGhostBG, AlfColorEnum.LightGhostBG, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
//         case AlfColorVariantEnum.LightCrystal:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.LightCrystalText, AlfColorEnum.LightCrystalTextHover, AlfColorEnum.LightCrystalFocus, AlfColorEnum.LightCrystalDisabled, AlfColorEnum.LightCrystalActive, AlfColorEnum.LightCrystal, AlfColorEnum.LightCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40, AlfPxEnum.None, AlfColorEnum.LightCrystalText, AlfColorEnum.LightCrystalTextHover, AlfColorEnum.LightCrystalText, AlfColorEnum.SecondaryDisabled, AlfColorEnum.LightCrystalText);
//             }

//             return defaultConstruct(AlfColorEnum.LightCrystalText, AlfColorEnum.LightCrystalTextHover, AlfColorEnum.LightCrystalFocus, AlfColorEnum.LightCrystalDisabled, AlfColorEnum.LightCrystalActive, AlfColorEnum.LightCrystal, AlfColorEnum.LightCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

//         // PREMIUM GRADIENTS
//         case AlfColorVariantEnum.GradientPurple:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.GradientPurpleText, AlfColorEnum.GradientPurpleTextHover, AlfColorEnum.GradientPurpleTextHover, AlfColorEnum.PrimaryDisabled, AlfColorEnum.GradientPurpleTextHover, AlfColorEnum.GradientPurple, AlfColorEnum.GradientPurpleHover, AlfColorEnum.GradientPurple, AlfColorEnum.GradientPurpleHover, AlfPxEnum.None, AlfColorEnum.Purple700, AlfColorEnum.Purple500, AlfColorEnum.Purple700, AlfColorEnum.PrimaryDisabled, AlfColorEnum.Purple700);
//             }

//             return defaultConstruct(
//                 AlfColorEnum.GradientPurpleText,
//                 AlfColorEnum.GradientPurpleTextHover,
//                 AlfColorEnum.GradientPurpleTextHover,
//                 AlfColorEnum.PrimaryDisabled,
//                 AlfColorEnum.GradientPurpleTextHover,
//                 AlfColorEnum.GradientPurple,
//                 AlfColorEnum.GradientPurpleHover,
//                 AlfColorEnum.GradientPurple,
//                 AlfColorEnum.GradientPurpleHover,
//                 AlfPxEnum.None
//             );
//         case AlfColorVariantEnum.GradientSunset:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.GradientSunsetText, AlfColorEnum.GradientSunsetTextHover, AlfColorEnum.GradientSunsetTextHover, AlfColorEnum.DangerDisabled, AlfColorEnum.GradientSunsetTextHover, AlfColorEnum.GradientSunset, AlfColorEnum.GradientSunsetHover, AlfColorEnum.GradientSunset, AlfColorEnum.GradientSunsetHover, AlfPxEnum.None, AlfColorEnum.Orange700, AlfColorEnum.Orange500, AlfColorEnum.Orange700, AlfColorEnum.DangerDisabled, AlfColorEnum.Orange700);
//             }

//             return defaultConstruct(
//                 AlfColorEnum.GradientSunsetText, AlfColorEnum.GradientSunsetTextHover, AlfColorEnum.GradientSunsetTextHover, AlfColorEnum.DangerDisabled, AlfColorEnum.GradientSunsetTextHover,
//                 AlfColorEnum.GradientSunset, AlfColorEnum.GradientSunsetHover, AlfColorEnum.GradientSunset, AlfColorEnum.GradientSunsetHover, AlfPxEnum.None
//             );
//         case AlfColorVariantEnum.GradientOcean:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.GradientOceanText, AlfColorEnum.GradientOceanTextHover, AlfColorEnum.GradientOceanTextHover, AlfColorEnum.InfoDisabled, AlfColorEnum.GradientOceanTextHover, AlfColorEnum.GradientOcean, AlfColorEnum.GradientOceanHover, AlfColorEnum.GradientOcean, AlfColorEnum.GradientOceanHover, AlfPxEnum.None, AlfColorEnum.Blue700, AlfColorEnum.Blue500, AlfColorEnum.Blue700, AlfColorEnum.InfoDisabled, AlfColorEnum.Blue700);
//             }

//             return defaultConstruct(
//                 AlfColorEnum.GradientOceanText, AlfColorEnum.GradientOceanTextHover, AlfColorEnum.GradientOceanTextHover, AlfColorEnum.InfoDisabled, AlfColorEnum.GradientOceanTextHover,
//                 AlfColorEnum.GradientOcean, AlfColorEnum.GradientOceanHover, AlfColorEnum.GradientOcean, AlfColorEnum.GradientOceanHover, AlfPxEnum.None
//             );
//         case AlfColorVariantEnum.GradientForest:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.GradientForestText, AlfColorEnum.GradientForestTextHover, AlfColorEnum.GradientForestTextHover, AlfColorEnum.SuccessDisabled, AlfColorEnum.GradientForestTextHover, AlfColorEnum.GradientForest, AlfColorEnum.GradientForestHover, AlfColorEnum.GradientForest, AlfColorEnum.GradientForestHover, AlfPxEnum.None, AlfColorEnum.Green700, AlfColorEnum.Green500, AlfColorEnum.Green700, AlfColorEnum.SuccessDisabled, AlfColorEnum.Green700);
//             }

//             return defaultConstruct(
//                 AlfColorEnum.GradientForestText, AlfColorEnum.GradientForestTextHover, AlfColorEnum.GradientForestTextHover, AlfColorEnum.SuccessDisabled, AlfColorEnum.GradientForestTextHover,
//                 AlfColorEnum.GradientForest, AlfColorEnum.GradientForestHover, AlfColorEnum.GradientForest, AlfColorEnum.GradientForestHover, AlfPxEnum.None
//             );
//         case AlfColorVariantEnum.GradientPrimary:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.GradientPrimaryText, AlfColorEnum.GradientPrimaryTextHover, AlfColorEnum.GradientPrimaryTextHover, AlfColorEnum.GradientPrimaryDisabled, AlfColorEnum.GradientPrimaryTextHover, AlfColorEnum.GradientPrimary, AlfColorEnum.GradientPrimaryHover, AlfColorEnum.GradientPrimary, AlfColorEnum.GradientPrimaryHover, AlfPxEnum.None, AlfColorEnum.Blue700, AlfColorEnum.Blue500, AlfColorEnum.Blue700, AlfColorEnum.GradientPrimaryDisabled, AlfColorEnum.Blue700);
//             }

//             return defaultConstruct(
//                 AlfColorEnum.GradientPrimaryText, AlfColorEnum.GradientPrimaryTextHover, AlfColorEnum.GradientPrimaryTextHover, AlfColorEnum.GradientPrimaryDisabled, AlfColorEnum.GradientPrimaryTextHover,
//                 AlfColorEnum.GradientPrimary,
//                 AlfColorEnum.GradientPrimaryHover,
//                 AlfColorEnum.GradientPrimary, AlfColorEnum.GradientPrimaryHover, AlfPxEnum.None
//             );
//         case AlfColorVariantEnum.GradientDanger:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.GradientDangerText, AlfColorEnum.GradientDangerTextHover, AlfColorEnum.GradientDangerTextHover, AlfColorEnum.GradientDangerDisabled, AlfColorEnum.GradientDangerTextHover, AlfColorEnum.GradientDanger, AlfColorEnum.GradientDangerHover, AlfColorEnum.GradientDanger, AlfColorEnum.GradientDangerHover, AlfPxEnum.None, AlfColorEnum.Red700, AlfColorEnum.Red500, AlfColorEnum.Red700, AlfColorEnum.GradientDangerDisabled, AlfColorEnum.Red700);
//             }

//             return defaultConstruct(
//                 AlfColorEnum.GradientDangerText, AlfColorEnum.GradientDangerTextHover, AlfColorEnum.GradientDangerTextHover, AlfColorEnum.GradientDangerDisabled, AlfColorEnum.GradientDangerTextHover,
//                 AlfColorEnum.GradientDanger,
//                 AlfColorEnum.GradientDangerHover,
//                 AlfColorEnum.GradientDanger, AlfColorEnum.GradientDangerHover, AlfPxEnum.None
//             );
//         case AlfColorVariantEnum.GradientSuccess:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.GradientSuccessText, AlfColorEnum.GradientSuccessTextHover, AlfColorEnum.GradientSuccessTextHover, AlfColorEnum.GradientSuccessDisabled, AlfColorEnum.GradientSuccessTextHover, AlfColorEnum.GradientSuccess, AlfColorEnum.GradientSuccessHover, AlfColorEnum.GradientSuccess, AlfColorEnum.GradientSuccessHover, AlfPxEnum.None, AlfColorEnum.Green700, AlfColorEnum.Green500, AlfColorEnum.Green700, AlfColorEnum.GradientSuccessDisabled, AlfColorEnum.Green700);
//             }

//             return defaultConstruct(
//                 AlfColorEnum.GradientSuccessText, AlfColorEnum.GradientSuccessTextHover, AlfColorEnum.GradientSuccessTextHover, AlfColorEnum.GradientSuccessDisabled, AlfColorEnum.GradientSuccessTextHover,
//                 AlfColorEnum.GradientSuccess,
//                 AlfColorEnum.GradientSuccessHover,
//                 AlfColorEnum.GradientSuccess, AlfColorEnum.GradientSuccessHover, AlfPxEnum.None
//             );
//         case AlfColorVariantEnum.GradientWarning:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.GradientWarningText, AlfColorEnum.GradientWarningTextHover, AlfColorEnum.GradientWarningTextHover, AlfColorEnum.GradientWarningDisabled, AlfColorEnum.GradientWarningTextHover, AlfColorEnum.GradientWarning, AlfColorEnum.GradientWarningHover, AlfColorEnum.GradientWarning, AlfColorEnum.GradientWarningHover, AlfPxEnum.None, AlfColorEnum.Orange800, AlfColorEnum.Orange600, AlfColorEnum.Orange800, AlfColorEnum.GradientWarningDisabled, AlfColorEnum.Orange800);
//             }

//             return defaultConstruct(
//                 AlfColorEnum.GradientWarningText, AlfColorEnum.GradientWarningTextHover, AlfColorEnum.GradientWarningTextHover, AlfColorEnum.GradientWarningDisabled, AlfColorEnum.GradientWarningTextHover,
//                 AlfColorEnum.GradientWarning,
//                 AlfColorEnum.GradientWarningHover,
//                 AlfColorEnum.GradientWarning, AlfColorEnum.GradientWarningHover, AlfPxEnum.None
//             );
//         case AlfColorVariantEnum.GradientInfo:
//             if (outlinedFilledComponents.includes(componentType)) {
//                 return defaultConstruct(AlfColorEnum.GradientInfoText, AlfColorEnum.GradientInfoTextHover, AlfColorEnum.GradientInfoTextHover, AlfColorEnum.GradientInfoDisabled, AlfColorEnum.GradientInfoTextHover, AlfColorEnum.GradientInfo, AlfColorEnum.GradientInfoHover, AlfColorEnum.GradientInfo, AlfColorEnum.GradientInfoHover, AlfPxEnum.None, AlfColorEnum.Cyan800, AlfColorEnum.Cyan600, AlfColorEnum.Cyan800, AlfColorEnum.GradientInfoDisabled, AlfColorEnum.Cyan800);
//             }

//             return defaultConstruct(
//                 AlfColorEnum.GradientInfoText, AlfColorEnum.GradientInfoTextHover, AlfColorEnum.GradientInfoTextHover, AlfColorEnum.GradientInfoDisabled, AlfColorEnum.GradientInfoTextHover,
//                 AlfColorEnum.GradientInfo,
//                 AlfColorEnum.GradientInfoHover,
//                 AlfColorEnum.GradientInfo, AlfColorEnum.GradientInfoHover, AlfPxEnum.None
//             );

//         case AlfColorVariantEnum.Transparent:
//             return defaultConstruct(AlfColorEnum.SecondaryGhostText, AlfColorEnum.SecondaryGhostTextHover, AlfColorEnum.SecondaryGhostFocus, AlfColorEnum.SecondaryGhostDisabled, AlfColorEnum.SecondaryGhostActive, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);

//         default:
//             return defaultConstruct(AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.SecondaryFocus, AlfColorEnum.SecondaryDisabled, AlfColorEnum.SecondaryActive, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover);
//     }
// };