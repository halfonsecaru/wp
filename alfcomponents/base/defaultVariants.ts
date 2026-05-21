import {
    AlfColorEnum,
    AlfColorVariantEnum,
    AlfBorderStyleEnum,
    AlfPxEnum,
    AlfRadiusEnum,
    AlfDisplayEnum,
    AlfCssPositionEnum,
    AlfCursorEnum,
    AlfJustifyContentEnum,
    AlfAlignItemsEnum,
    AlfShadowEnum,
    AlfAnimationTypeEnum,
    AlfVisibilityEnum,
    AlfVerticalAlignEnum,
    AlfLineHeightEnum,
    AlfTextAlignEnum,
    AlfTextTransformEnum,
    AlfTextDecorationEnum,
    AlfFontStyleEnum,
    AlfOpacityEnum,
    AlfLetterSpacingEnum,
    AlfWhiteSpaceEnum,
    AlfWordBreakEnum,
    AlfFontFamilyEnum,
    AlfOverflowWrapEnum,
    AlfTextOverflowEnum,
    AlfTextShadowEnum,
    AlfFontSizeEnum,
    AlfFontWeightEnum,
} from "@alfcomponents/enums";

import {
    AlfBackgroundsInterface,
    AlfBorderInterface,
    AlfDisplayAndLayoutInterface,
    AlfMarginInterface,
    AlfOutlineInterface,
    AlfPaddingInterface,
    AlfRippleInterface,
    AlfTextStyleInterface,
    AlfTypographyInterface,
    AlfShadowsInterface,
    AlfAnimateCssInterface,
    AlfTransformInterface,
    AlfTypographyBaseInterface,
    AlfTransformBaseInterface,
    AlfDisplayAndLayoutBaseInterface,
} from "@alfcomponents/interfaces";

import { resolveAlfColorVariant } from "@alfcomponents/shared";


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
        height: AlfPxEnum.Px40,
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
    hover: AlfColorEnum
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
        disabled: { backgroundColor: AlfColorEnum.Gray200, backgroundImage: 'none' },
    };
};

const buildColorBorderConfig = (
    main: AlfColorEnum,
    hover: AlfColorEnum,
    width: AlfPxEnum = AlfPxEnum.Px015
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
        disabled: { ...base, borderColor: AlfColorEnum.Gray300 },
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

// ── CONSTRUCTORES BASE: El ADN neutro del sistema ───────────────────────

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
    borderWidth?: AlfPxEnum
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
    return {
        paddingBase: buildPaddingBaseConfig(),
        displayAndLayoutBase: buildDisplayAndLayoutBaseConfig(),
        marginBase: buildMarginBaseConfig(),
        animationsBase: buildAnimationsBaseConfig(),
        transformBase: buildTransformConfig(),
        typographyBase: buildTypographyBaseConfig(main, hover, focus, disabled, active),
        borderBase: buildColorBorderConfig(borderDefault, borderHover, borderWidth),
        textStyleBase: buildTextStyleConfig(main, hover, focus, disabled, active),
        shadowsBase: buildShadowsBaseConfig(main, hover, focus, disabled, active),
        outlineBase: buildOutlineBaseConfig(main, hover, focus, disabled, active),
        backgroundsBase: buildColorBackgroundConfig(backgroundDefault, backgroundHover),
        ripple: { color: main }

    }
}

export const resolveVariantConfig = (
    variant?: AlfColorVariantEnum
): PredefinedConfig => {

    if (!variant) {
        variant = AlfColorVariantEnum.Transparent;
    }

    const v = resolveAlfColorVariant(variant);

    switch (v) {
        // FAMILY: PRIMARY
        case AlfColorVariantEnum.Primary:
            return defaultConstruct(AlfColorEnum.Primary, AlfColorEnum.PrimaryHover, AlfColorEnum.PrimaryFocus, AlfColorEnum.PrimaryDisabled, AlfColorEnum.PrimaryActive, AlfColorEnum.Primary, AlfColorEnum.PrimaryHover, AlfColorEnum.Primary, AlfColorEnum.PrimaryHover);
        case AlfColorVariantEnum.Primary3D:
            return defaultConstruct(AlfColorEnum.Primary3D, AlfColorEnum.Primary3DHover, AlfColorEnum.Primary3DFocus, AlfColorEnum.Primary3DDisabled, AlfColorEnum.Primary3DActive, AlfColorEnum.Primary3D, AlfColorEnum.Primary3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.PrimaryOutline:
            return defaultConstruct(AlfColorEnum.PrimaryOutline, AlfColorEnum.PrimaryOutlineHover, AlfColorEnum.PrimaryOutlineFocus, AlfColorEnum.PrimaryOutlineDisabled, AlfColorEnum.PrimaryOutlineActive, AlfColorEnum.PrimaryOutlineBg, AlfColorEnum.PrimaryOutlineBgHover, AlfColorEnum.PrimaryOutline, AlfColorEnum.PrimaryOutlineHover);
        case AlfColorVariantEnum.PrimarySoft:
            return defaultConstruct(AlfColorEnum.PrimarySoftText, AlfColorEnum.PrimarySoftTextHover, AlfColorEnum.PrimarySoftFocus, AlfColorEnum.PrimarySoftDisabled, AlfColorEnum.PrimarySoftActive, AlfColorEnum.PrimarySoft, AlfColorEnum.PrimarySoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.PrimaryGhost:
            return defaultConstruct(AlfColorEnum.PrimaryGhostText, AlfColorEnum.PrimaryGhostTextHover, AlfColorEnum.PrimaryGhostFocus, AlfColorEnum.PrimaryGhostDisabled, AlfColorEnum.PrimaryGhostActive, AlfColorEnum.Transparent, AlfColorEnum.PrimaryGhostBgHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.PrimaryCrystal:
            return defaultConstruct(AlfColorEnum.PrimaryCrystalText, AlfColorEnum.PrimaryCrystalTextHover, AlfColorEnum.PrimaryCrystalFocus, AlfColorEnum.PrimaryCrystalDisabled, AlfColorEnum.PrimaryCrystalActive, AlfColorEnum.PrimaryCrystal, AlfColorEnum.PrimaryCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

        // FAMILY: SECONDARY
        case AlfColorVariantEnum.Secondary:
            return defaultConstruct(AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.SecondaryFocus, AlfColorEnum.SecondaryDisabled, AlfColorEnum.SecondaryActive, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover);
        case AlfColorVariantEnum.Secondary3D:
            return defaultConstruct(AlfColorEnum.Secondary3D, AlfColorEnum.Secondary3DHover, AlfColorEnum.Secondary3DFocus, AlfColorEnum.Secondary3DDisabled, AlfColorEnum.Secondary3DActive, AlfColorEnum.Secondary3D, AlfColorEnum.Secondary3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.SecondaryOutline:
            return defaultConstruct(AlfColorEnum.SecondaryOutline, AlfColorEnum.SecondaryOutlineHover, AlfColorEnum.SecondaryOutlineFocus, AlfColorEnum.SecondaryOutlineDisabled, AlfColorEnum.SecondaryOutlineActive, AlfColorEnum.SecondaryOutlineBg, AlfColorEnum.SecondaryOutlineBgHover, AlfColorEnum.SecondaryOutline, AlfColorEnum.SecondaryOutlineHover);
        case AlfColorVariantEnum.SecondarySoft:
            return defaultConstruct(AlfColorEnum.SecondarySoftText, AlfColorEnum.SecondarySoftTextHover, AlfColorEnum.SecondarySoftFocus, AlfColorEnum.SecondarySoftDisabled, AlfColorEnum.SecondarySoftActive, AlfColorEnum.SecondarySoft, AlfColorEnum.SecondarySoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.SecondaryGhost:
            return defaultConstruct(AlfColorEnum.SecondaryGhostText, AlfColorEnum.SecondaryGhostTextHover, AlfColorEnum.SecondaryGhostFocus, AlfColorEnum.SecondaryGhostDisabled, AlfColorEnum.SecondaryGhostActive, AlfColorEnum.Transparent, AlfColorEnum.SecondaryGhostBgHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.SecondaryCrystal:
            return defaultConstruct(AlfColorEnum.SecondaryCrystalText, AlfColorEnum.SecondaryCrystalTextHover, AlfColorEnum.SecondaryCrystalFocus, AlfColorEnum.SecondaryCrystalDisabled, AlfColorEnum.SecondaryCrystalActive, AlfColorEnum.SecondaryCrystal, AlfColorEnum.SecondaryCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

        // FAMILY: SUCCESS
        case AlfColorVariantEnum.Success:
            return defaultConstruct(AlfColorEnum.Success, AlfColorEnum.SuccessHover, AlfColorEnum.SuccessFocus, AlfColorEnum.SuccessDisabled, AlfColorEnum.SuccessActive, AlfColorEnum.Success, AlfColorEnum.SuccessHover, AlfColorEnum.Success, AlfColorEnum.SuccessHover);
        case AlfColorVariantEnum.Success3D:
            return defaultConstruct(AlfColorEnum.Success3D, AlfColorEnum.Success3DHover, AlfColorEnum.Success3DFocus, AlfColorEnum.Success3DDisabled, AlfColorEnum.Success3DActive, AlfColorEnum.Success3D, AlfColorEnum.Success3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.SuccessOutline:
            return defaultConstruct(AlfColorEnum.SuccessOutline, AlfColorEnum.SuccessOutlineHover, AlfColorEnum.SuccessOutlineFocus, AlfColorEnum.SuccessOutlineDisabled, AlfColorEnum.SuccessOutlineActive, AlfColorEnum.SuccessOutlineBg, AlfColorEnum.SuccessOutlineBgHover, AlfColorEnum.SuccessOutline, AlfColorEnum.SuccessOutlineHover);
        case AlfColorVariantEnum.SuccessSoft:
            return defaultConstruct(AlfColorEnum.SuccessSoftText, AlfColorEnum.SuccessSoftTextHover, AlfColorEnum.SuccessSoftFocus, AlfColorEnum.SuccessSoftDisabled, AlfColorEnum.SuccessSoftActive, AlfColorEnum.SuccessSoft, AlfColorEnum.SuccessSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.SuccessGhost:
            return defaultConstruct(AlfColorEnum.SuccessGhostText, AlfColorEnum.SuccessGhostTextHover, AlfColorEnum.SuccessGhostFocus, AlfColorEnum.SuccessGhostDisabled, AlfColorEnum.SuccessGhostActive, AlfColorEnum.Transparent, AlfColorEnum.SuccessGhostBgHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.SuccessCrystal:
            return defaultConstruct(AlfColorEnum.SuccessCrystalText, AlfColorEnum.SuccessCrystalTextHover, AlfColorEnum.SuccessCrystalFocus, AlfColorEnum.SuccessCrystalDisabled, AlfColorEnum.SuccessCrystalActive, AlfColorEnum.SuccessCrystal, AlfColorEnum.SuccessCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

        // FAMILY: DANGER
        case AlfColorVariantEnum.Danger:
            return defaultConstruct(AlfColorEnum.Danger, AlfColorEnum.DangerHover, AlfColorEnum.DangerFocus, AlfColorEnum.DangerDisabled, AlfColorEnum.DangerActive, AlfColorEnum.Danger, AlfColorEnum.DangerHover, AlfColorEnum.Danger, AlfColorEnum.DangerHover);
        case AlfColorVariantEnum.Danger3D:
            return defaultConstruct(AlfColorEnum.Danger3D, AlfColorEnum.Danger3DHover, AlfColorEnum.Danger3DFocus, AlfColorEnum.Danger3DDisabled, AlfColorEnum.Danger3DActive, AlfColorEnum.Danger3D, AlfColorEnum.Danger3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.DangerOutline:
            return defaultConstruct(AlfColorEnum.DangerOutline, AlfColorEnum.DangerOutlineHover, AlfColorEnum.DangerOutlineFocus, AlfColorEnum.DangerOutlineDisabled, AlfColorEnum.DangerOutlineActive, AlfColorEnum.DangerOutlineBg, AlfColorEnum.DangerOutlineBgHover, AlfColorEnum.DangerOutline, AlfColorEnum.DangerOutlineHover);
        case AlfColorVariantEnum.DangerSoft:
            return defaultConstruct(AlfColorEnum.DangerSoftText, AlfColorEnum.DangerSoftTextHover, AlfColorEnum.DangerSoftFocus, AlfColorEnum.DangerSoftDisabled, AlfColorEnum.DangerSoftActive, AlfColorEnum.DangerSoft, AlfColorEnum.DangerSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.DangerGhost:
            return defaultConstruct(AlfColorEnum.DangerGhostText, AlfColorEnum.DangerGhostTextHover, AlfColorEnum.DangerGhostFocus, AlfColorEnum.DangerGhostDisabled, AlfColorEnum.DangerGhostActive, AlfColorEnum.Transparent, AlfColorEnum.DangerGhostBgHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.DangerCrystal:
            return defaultConstruct(AlfColorEnum.DangerCrystalText, AlfColorEnum.DangerCrystalTextHover, AlfColorEnum.DangerCrystalFocus, AlfColorEnum.DangerCrystalDisabled, AlfColorEnum.DangerCrystalActive, AlfColorEnum.DangerCrystal, AlfColorEnum.DangerCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

        // FAMILY: WARNING
        case AlfColorVariantEnum.Warning:
            return defaultConstruct(AlfColorEnum.Warning, AlfColorEnum.WarningHover, AlfColorEnum.WarningFocus, AlfColorEnum.WarningDisabled, AlfColorEnum.WarningActive, AlfColorEnum.Warning, AlfColorEnum.WarningHover, AlfColorEnum.Warning, AlfColorEnum.WarningHover);
        case AlfColorVariantEnum.Warning3D:
            return defaultConstruct(AlfColorEnum.Warning3D, AlfColorEnum.Warning3DHover, AlfColorEnum.Warning3DFocus, AlfColorEnum.Warning3DDisabled, AlfColorEnum.Warning3DActive, AlfColorEnum.Warning3D, AlfColorEnum.Warning3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.WarningOutline:
            return defaultConstruct(AlfColorEnum.WarningOutline, AlfColorEnum.WarningOutlineHover, AlfColorEnum.WarningOutlineFocus, AlfColorEnum.WarningOutlineDisabled, AlfColorEnum.WarningOutlineActive, AlfColorEnum.WarningOutlineBg, AlfColorEnum.WarningOutlineBgHover, AlfColorEnum.WarningOutline, AlfColorEnum.WarningOutlineHover);
        case AlfColorVariantEnum.WarningSoft:
            return defaultConstruct(AlfColorEnum.WarningSoftText, AlfColorEnum.WarningSoftTextHover, AlfColorEnum.WarningSoftFocus, AlfColorEnum.WarningSoftDisabled, AlfColorEnum.WarningSoftActive, AlfColorEnum.WarningSoft, AlfColorEnum.WarningSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.WarningGhost:
            return defaultConstruct(AlfColorEnum.WarningGhostText, AlfColorEnum.WarningGhostTextHover, AlfColorEnum.WarningGhostFocus, AlfColorEnum.WarningGhostDisabled, AlfColorEnum.WarningGhostActive, AlfColorEnum.Transparent, AlfColorEnum.WarningGhostBgHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.WarningCrystal:
            return defaultConstruct(AlfColorEnum.WarningCrystalText, AlfColorEnum.WarningCrystalTextHover, AlfColorEnum.WarningCrystalFocus, AlfColorEnum.WarningCrystalDisabled, AlfColorEnum.WarningCrystalActive, AlfColorEnum.WarningCrystal, AlfColorEnum.WarningCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

        // FAMILY: INFO
        case AlfColorVariantEnum.Info:
            return defaultConstruct(AlfColorEnum.Info, AlfColorEnum.InfoHover, AlfColorEnum.InfoFocus, AlfColorEnum.InfoDisabled, AlfColorEnum.InfoActive, AlfColorEnum.Info, AlfColorEnum.InfoHover, AlfColorEnum.Info, AlfColorEnum.InfoHover);
        case AlfColorVariantEnum.Info3D:
            return defaultConstruct(AlfColorEnum.Info3D, AlfColorEnum.Info3DHover, AlfColorEnum.Info3DFocus, AlfColorEnum.Info3DDisabled, AlfColorEnum.Info3DActive, AlfColorEnum.Info3D, AlfColorEnum.Info3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.InfoOutline:
            return defaultConstruct(AlfColorEnum.InfoOutline, AlfColorEnum.InfoOutlineHover, AlfColorEnum.InfoOutlineFocus, AlfColorEnum.InfoOutlineDisabled, AlfColorEnum.InfoOutlineActive, AlfColorEnum.InfoOutlineBg, AlfColorEnum.InfoOutlineBgHover, AlfColorEnum.InfoOutline, AlfColorEnum.InfoOutlineHover);
        case AlfColorVariantEnum.InfoSoft:
            return defaultConstruct(AlfColorEnum.InfoSoftText, AlfColorEnum.InfoSoftTextHover, AlfColorEnum.InfoSoftFocus, AlfColorEnum.InfoSoftDisabled, AlfColorEnum.InfoSoftActive, AlfColorEnum.InfoSoft, AlfColorEnum.InfoSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.InfoGhost:
            return defaultConstruct(AlfColorEnum.InfoGhostText, AlfColorEnum.InfoGhostTextHover, AlfColorEnum.InfoGhostFocus, AlfColorEnum.InfoGhostDisabled, AlfColorEnum.InfoGhostActive, AlfColorEnum.Transparent, AlfColorEnum.InfoGhostBgHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.InfoCrystal:
            return defaultConstruct(AlfColorEnum.InfoCrystalText, AlfColorEnum.InfoCrystalTextHover, AlfColorEnum.InfoCrystalFocus, AlfColorEnum.InfoCrystalDisabled, AlfColorEnum.InfoCrystalActive, AlfColorEnum.InfoCrystal, AlfColorEnum.InfoCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

        // FAMILY: DARK
        case AlfColorVariantEnum.Dark:
            return defaultConstruct(AlfColorEnum.Dark, AlfColorEnum.DarkHover, AlfColorEnum.DarkFocus, AlfColorEnum.DarkDisabled, AlfColorEnum.DarkActive, AlfColorEnum.Dark, AlfColorEnum.DarkHover, AlfColorEnum.Dark, AlfColorEnum.DarkHover);
        case AlfColorVariantEnum.Dark3D:
            return defaultConstruct(AlfColorEnum.Dark3D, AlfColorEnum.Dark3DHover, AlfColorEnum.Dark3DFocus, AlfColorEnum.Dark3DDisabled, AlfColorEnum.Dark3DActive, AlfColorEnum.Dark3D, AlfColorEnum.Dark3DHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.DarkOutline:
            return defaultConstruct(AlfColorEnum.DarkOutline, AlfColorEnum.DarkOutlineHover, AlfColorEnum.DarkOutlineFocus, AlfColorEnum.DarkOutlineDisabled, AlfColorEnum.DarkOutlineActive, AlfColorEnum.DarkOutlineBg, AlfColorEnum.DarkOutlineBgHover, AlfColorEnum.DarkOutline, AlfColorEnum.DarkOutlineHover);
        case AlfColorVariantEnum.DarkSoft:
            return defaultConstruct(AlfColorEnum.DarkSoftText, AlfColorEnum.DarkSoftTextHover, AlfColorEnum.DarkSoftFocus, AlfColorEnum.DarkSoftDisabled, AlfColorEnum.DarkSoftActive, AlfColorEnum.DarkSoft, AlfColorEnum.DarkSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.DarkGhost:
            return defaultConstruct(AlfColorEnum.DarkGhostText, AlfColorEnum.DarkGhostTextHover, AlfColorEnum.DarkGhostFocus, AlfColorEnum.DarkGhostDisabled, AlfColorEnum.DarkGhostActive, AlfColorEnum.Transparent, AlfColorEnum.DarkGhostBgHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.DarkCrystal:
            return defaultConstruct(AlfColorEnum.DarkCrystalText, AlfColorEnum.DarkCrystalTextHover, AlfColorEnum.DarkCrystalFocus, AlfColorEnum.DarkCrystalDisabled, AlfColorEnum.DarkCrystalActive, AlfColorEnum.DarkCrystal, AlfColorEnum.DarkCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

        // FAMILY: LIGHT
        case AlfColorVariantEnum.Light:
            return defaultConstruct(AlfColorEnum.Light, AlfColorEnum.LightHover, AlfColorEnum.LightFocus, AlfColorEnum.LightDisabled, AlfColorEnum.LightActive, AlfColorEnum.Light, AlfColorEnum.LightHover, AlfColorEnum.Light, AlfColorEnum.LightHover);
        case AlfColorVariantEnum.Light3D:
            return defaultConstruct(AlfColorEnum.Light3D, 'linear-gradient(to bottom, #e9ecef, #dee2e6)' as any, AlfColorEnum.Light3DFocus, AlfColorEnum.Light3DDisabled, AlfColorEnum.Light3DActive, AlfColorEnum.Light3D, 'linear-gradient(to bottom, #e9ecef, #dee2e6)' as any, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.LightOutline:
            return defaultConstruct(AlfColorEnum.LightOutline, AlfColorEnum.LightOutlineHover, AlfColorEnum.LightOutlineFocus, AlfColorEnum.LightOutlineDisabled, AlfColorEnum.LightOutlineActive, AlfColorEnum.LightOutlineBg, AlfColorEnum.LightOutlineBgHover, AlfColorEnum.LightOutline, AlfColorEnum.LightOutlineHover);
        case AlfColorVariantEnum.LightSoft:
            return defaultConstruct(AlfColorEnum.LightSoftText, AlfColorEnum.LightSoftTextHover, AlfColorEnum.LightSoftFocus, AlfColorEnum.LightSoftDisabled, AlfColorEnum.LightSoftActive, AlfColorEnum.LightSoft, AlfColorEnum.LightSoftHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.LightGhost:
            return defaultConstruct(AlfColorEnum.LightGhostText, AlfColorEnum.LightGhostTextHover, AlfColorEnum.LightGhostFocus, AlfColorEnum.LightGhostDisabled, AlfColorEnum.LightGhostActive, AlfColorEnum.Transparent, AlfColorEnum.LightGhostBgHover, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);
        case AlfColorVariantEnum.LightCrystal:
            return defaultConstruct(AlfColorEnum.LightCrystalText, AlfColorEnum.LightCrystalTextHover, AlfColorEnum.LightCrystalFocus, AlfColorEnum.LightCrystalDisabled, AlfColorEnum.LightCrystalActive, AlfColorEnum.LightCrystal, AlfColorEnum.LightCrystalHover, AlfColorEnum.White30, AlfColorEnum.White40);

        case AlfColorVariantEnum.Transparent:
            return defaultConstruct(AlfColorEnum.SecondaryGhostText, AlfColorEnum.SecondaryGhostTextHover, AlfColorEnum.SecondaryGhostFocus, AlfColorEnum.SecondaryGhostDisabled, AlfColorEnum.SecondaryGhostActive, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);

        default:
            return defaultConstruct(AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.SecondaryFocus, AlfColorEnum.SecondaryDisabled, AlfColorEnum.SecondaryActive, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover);
    }
};