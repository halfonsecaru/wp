import {
  AlfAlignItemsEnum,
  AlfBorderStyleEnum,
  AlfButtonVisualTypeEnum,
  AlfColorEnum,
  AlfColorVariantEnum,
  AlfDisplayEnum,
  AlfFontWeightEnum,
  AlfJustifyContentEnum,
  AlfLineHeightEnum,
  AlfPxEnum,
  AlfRadiusEnum,
  AlfShadowEnum,
  AlfVisualPredefinedEnum,
} from '@alfcomponents/enums';
import {
  AlfBackgroundsInterface,
  AlfBorderInterface,
  AlfDisplayAndLayoutInterface,
  AlfMarginInterface,
  AlfOutlineInterface,
  AlfPaddingInterface,
  AlfShadowsInterface,
  AlfTextStyleInterface,
  AlfTransformInterface,
  AlfTypographyInterface,
} from '@alfcomponents/interfaces';

export interface MainVisualStyleInterface {
  readonly ripple: {
    readonly backgroundColor: AlfColorEnum;
  };
  readonly backgrounds?: AlfBackgroundsInterface;
  readonly border?: AlfBorderInterface;
  readonly displayAndLayout?: AlfDisplayAndLayoutInterface;
  readonly margin?: AlfMarginInterface;
  readonly outline?: AlfOutlineInterface;
  readonly padding?: AlfPaddingInterface;
  readonly shadows?: AlfShadowsInterface;
  readonly textStyle?: AlfTextStyleInterface;
  readonly transform?: AlfTransformInterface;
  readonly typography?: AlfTypographyInterface;
}

type VisualKind =
  | 'solid'
  | 'outlined'
  | 'text'
  | 'ghost'
  | 'soft'
  | 'crystal'
  | 'threeD'
  | 'glossy'
  | 'gradient'
  | 'raised';

interface ColorRecipe {
  readonly background: AlfColorEnum;
  readonly hover: AlfColorEnum;
  readonly active: AlfColorEnum;
  readonly border: AlfColorEnum;
  readonly borderHover: AlfColorEnum;
  readonly borderActive: AlfColorEnum;
  readonly ripple: AlfColorEnum;
  readonly textOnFill: AlfColorEnum;
}

const LIGHT_TEXT_COLOR = '#9a9a9a' as AlfColorEnum;

const COMMON_BASE: Pick<MainVisualStyleInterface, 'margin' | 'outline' | 'padding' | 'shadows' | 'transform'> = {
  margin: {
    default: {
      margin: AlfPxEnum.None,
    },
  },
  outline: {
    default: {
      outlineWidth: AlfPxEnum.None,
    },
  },
  padding: {
    default: {
      paddingTop: AlfPxEnum.Px10,
      paddingRight: AlfPxEnum.Px16,
      paddingBottom: AlfPxEnum.Px10,
      paddingLeft: AlfPxEnum.Px16,
    },
  },
  shadows: {
    default: {
      boxShadow: AlfShadowEnum.None,
    },
  },
  transform: {
    default: {},
  },
};

const COLOR_RECIPES: Readonly<Partial<Record<AlfColorVariantEnum, ColorRecipe>>> = {
  [AlfColorVariantEnum.Primary]: {
    background: AlfColorEnum.Primary,
    hover: AlfColorEnum.PrimaryHover,
    active: AlfColorEnum.PrimaryHover,
    border: AlfColorEnum.PrimaryHover,
    borderHover: AlfColorEnum.PrimaryHover,
    borderActive: AlfColorEnum.PrimaryHover,
    ripple: AlfColorEnum.PrimaryHover,
    textOnFill: AlfColorEnum.White,
  },
  [AlfColorVariantEnum.Secondary]: {
    background: AlfColorEnum.Secondary,
    hover: AlfColorEnum.SecondaryHover,
    active: AlfColorEnum.SecondaryHover,
    border: AlfColorEnum.SecondaryHover,
    borderHover: AlfColorEnum.SecondaryHover,
    borderActive: AlfColorEnum.SecondaryHover,
    ripple: AlfColorEnum.Gray600,
    textOnFill: AlfColorEnum.White,
  },
  [AlfColorVariantEnum.Success]: {
    background: AlfColorEnum.Success,
    hover: AlfColorEnum.SuccessHover,
    active: AlfColorEnum.SuccessHover,
    border: AlfColorEnum.SuccessHover,
    borderHover: AlfColorEnum.SuccessHover,
    borderActive: AlfColorEnum.SuccessHover,
    ripple: AlfColorEnum.Green600,
    textOnFill: AlfColorEnum.White,
  },
  [AlfColorVariantEnum.Danger]: {
    background: AlfColorEnum.Danger,
    hover: AlfColorEnum.DangerHover,
    active: AlfColorEnum.DangerHover,
    border: AlfColorEnum.DangerHover,
    borderHover: AlfColorEnum.DangerHover,
    borderActive: AlfColorEnum.DangerHover,
    ripple: AlfColorEnum.Red600,
    textOnFill: AlfColorEnum.White,
  },
  [AlfColorVariantEnum.Warning]: {
    background: AlfColorEnum.Warning,
    hover: AlfColorEnum.WarningHover,
    active: AlfColorEnum.WarningHover,
    border: AlfColorEnum.WarningHover,
    borderHover: AlfColorEnum.WarningHover,
    borderActive: AlfColorEnum.WarningHover,
    ripple: AlfColorEnum.Yellow600,
    textOnFill: AlfColorEnum.Black,
  },
  [AlfColorVariantEnum.Info]: {
    background: AlfColorEnum.Info,
    hover: AlfColorEnum.InfoHover,
    active: AlfColorEnum.InfoHover,
    border: AlfColorEnum.InfoHover,
    borderHover: AlfColorEnum.InfoHover,
    borderActive: AlfColorEnum.InfoHover,
    ripple: AlfColorEnum.Blue600,
    textOnFill: AlfColorEnum.Black,
  },
  [AlfColorVariantEnum.Light]: {
    background: AlfColorEnum.Gray100,
    hover: AlfColorEnum.Gray200,
    active: AlfColorEnum.Gray300,
    border: AlfColorEnum.Gray300,
    borderHover: AlfColorEnum.Gray300,
    borderActive: AlfColorEnum.Gray300,
    ripple: AlfColorEnum.Gray600,
    textOnFill: LIGHT_TEXT_COLOR,
  },
  [AlfColorVariantEnum.Dark]: {
    background: AlfColorEnum.Gray900,
    hover: AlfColorEnum.Gray800,
    active: AlfColorEnum.Gray700,
    border: AlfColorEnum.Gray900,
    borderHover: AlfColorEnum.Gray900,
    borderActive: AlfColorEnum.Gray900,
    ripple: AlfColorEnum.Gray600,
    textOnFill: AlfColorEnum.White,
  },
  [AlfColorVariantEnum.Default]: {
    background: AlfColorEnum.Primary,
    hover: AlfColorEnum.PrimaryHover,
    active: AlfColorEnum.PrimaryHover,
    border: AlfColorEnum.PrimaryHover,
    borderHover: AlfColorEnum.PrimaryHover,
    borderActive: AlfColorEnum.PrimaryHover,
    ripple: AlfColorEnum.Blue600,
    textOnFill: AlfColorEnum.White,
  },
};

const PREDEFINED_MAP: Readonly<Record<AlfVisualPredefinedEnum, { kind: VisualKind; variant: AlfColorVariantEnum }>> = {
  [AlfVisualPredefinedEnum.SolidPrimary]: { kind: 'solid', variant: AlfColorVariantEnum.Primary },
  [AlfVisualPredefinedEnum.SolidSecondary]: { kind: 'solid', variant: AlfColorVariantEnum.Secondary },
  [AlfVisualPredefinedEnum.SolidSuccess]: { kind: 'solid', variant: AlfColorVariantEnum.Success },
  [AlfVisualPredefinedEnum.SolidDanger]: { kind: 'solid', variant: AlfColorVariantEnum.Danger },
  [AlfVisualPredefinedEnum.SolidWarning]: { kind: 'solid', variant: AlfColorVariantEnum.Warning },
  [AlfVisualPredefinedEnum.SolidInfo]: { kind: 'solid', variant: AlfColorVariantEnum.Info },
  [AlfVisualPredefinedEnum.SolidLight]: { kind: 'solid', variant: AlfColorVariantEnum.Light },
  [AlfVisualPredefinedEnum.SolidDark]: { kind: 'solid', variant: AlfColorVariantEnum.Dark },
  [AlfVisualPredefinedEnum.SolidDefault]: { kind: 'solid', variant: AlfColorVariantEnum.Default },
  [AlfVisualPredefinedEnum.OutlinedPrimary]: { kind: 'outlined', variant: AlfColorVariantEnum.Primary },
  [AlfVisualPredefinedEnum.OutlinedSecondary]: { kind: 'outlined', variant: AlfColorVariantEnum.Secondary },
  [AlfVisualPredefinedEnum.OutlinedSuccess]: { kind: 'outlined', variant: AlfColorVariantEnum.Success },
  [AlfVisualPredefinedEnum.OutlinedDanger]: { kind: 'outlined', variant: AlfColorVariantEnum.Danger },
  [AlfVisualPredefinedEnum.OutlinedWarning]: { kind: 'outlined', variant: AlfColorVariantEnum.Warning },
  [AlfVisualPredefinedEnum.OutlinedInfo]: { kind: 'outlined', variant: AlfColorVariantEnum.Info },
  [AlfVisualPredefinedEnum.OutlinedLight]: { kind: 'outlined', variant: AlfColorVariantEnum.Light },
  [AlfVisualPredefinedEnum.OutlinedDark]: { kind: 'outlined', variant: AlfColorVariantEnum.Dark },
  [AlfVisualPredefinedEnum.OutlinedDefault]: { kind: 'outlined', variant: AlfColorVariantEnum.Default },
  [AlfVisualPredefinedEnum.StandardPrimary]: { kind: 'text', variant: AlfColorVariantEnum.Primary },
  [AlfVisualPredefinedEnum.StandardSecondary]: { kind: 'text', variant: AlfColorVariantEnum.Secondary },
  [AlfVisualPredefinedEnum.StandardSuccess]: { kind: 'text', variant: AlfColorVariantEnum.Success },
  [AlfVisualPredefinedEnum.StandardDanger]: { kind: 'text', variant: AlfColorVariantEnum.Danger },
  [AlfVisualPredefinedEnum.StandardWarning]: { kind: 'text', variant: AlfColorVariantEnum.Warning },
  [AlfVisualPredefinedEnum.StandardInfo]: { kind: 'text', variant: AlfColorVariantEnum.Info },
  [AlfVisualPredefinedEnum.StandardLight]: { kind: 'text', variant: AlfColorVariantEnum.Light },
  [AlfVisualPredefinedEnum.StandardDark]: { kind: 'text', variant: AlfColorVariantEnum.Dark },
  [AlfVisualPredefinedEnum.StandardDefault]: { kind: 'text', variant: AlfColorVariantEnum.Default },
};


const resolveVisualKind = (predefined?: AlfVisualPredefinedEnum, visualType?: AlfButtonVisualTypeEnum): VisualKind => {
  if (predefined) {
    return PREDEFINED_MAP[predefined].kind;
  }
  switch (visualType) {
    case AlfButtonVisualTypeEnum.Outlined:
      return 'outlined';
    case AlfButtonVisualTypeEnum.Text:
      return 'text';
    case AlfButtonVisualTypeEnum.Ghost:
      return 'ghost';
    case AlfButtonVisualTypeEnum.Soft:
      return 'soft';
    case AlfButtonVisualTypeEnum.Crystal:
      return 'crystal';
    case AlfButtonVisualTypeEnum.ThreeD:
      return 'threeD';
    case AlfButtonVisualTypeEnum.Glossy:
      return 'glossy';
    case AlfButtonVisualTypeEnum.Gradient:
      return 'gradient';
    case AlfButtonVisualTypeEnum.Raised:
      return 'raised';
    default:
      return 'solid';
  }
};

const resolveColorVariant = (predefined?: AlfVisualPredefinedEnum, colorVariant?: AlfColorVariantEnum): AlfColorVariantEnum => {
  if (predefined) {
    return PREDEFINED_MAP[predefined].variant;
  }
  return colorVariant ?? AlfColorVariantEnum.Default;
};

const resolveLightTextColor = (variant: AlfColorVariantEnum, fallback: AlfColorEnum): AlfColorEnum =>
  variant === AlfColorVariantEnum.Light ? LIGHT_TEXT_COLOR : fallback;

const buildSolidPreset = (recipe: ColorRecipe, variant: AlfColorVariantEnum): MainVisualStyleInterface => ({
  ...COMMON_BASE,
  ripple: { backgroundColor: recipe.ripple },
  backgrounds: {
    default: { backgroundColor: recipe.background },
    hover: { backgroundColor: recipe.hover },
    active: { backgroundColor: recipe.active },
    focus: { backgroundColor: recipe.background },
    disabled: { backgroundColor: recipe.background },
  },
  border: {
    default: {
      borderWidth: AlfPxEnum.Px015,
      borderStyle: AlfBorderStyleEnum.Solid,
      borderColor: recipe.border,
      borderRadius: AlfRadiusEnum.Base,
    },
    hover: { borderWidth: AlfPxEnum.Px015, borderStyle: AlfBorderStyleEnum.Solid, borderColor: recipe.borderHover },
    active: { borderWidth: AlfPxEnum.Px015, borderStyle: AlfBorderStyleEnum.Solid, borderColor: recipe.borderActive },
    focus: { borderWidth: AlfPxEnum.Px015, borderStyle: AlfBorderStyleEnum.Solid, borderColor: recipe.border },
    disabled: { borderWidth: AlfPxEnum.Px015, borderStyle: AlfBorderStyleEnum.Solid, borderColor: recipe.border },
  },
  textStyle: {
    default: { color: resolveLightTextColor(variant, recipe.textOnFill) },
  },
  typography: {
    default: {
      color: resolveLightTextColor(variant, recipe.textOnFill),
      lineHeight: AlfLineHeightEnum.None,
    },
  },
});

const resolveOutlinedSoftBackgrounds = (variant: AlfColorVariantEnum): {
  readonly default: AlfColorEnum;
  readonly hover: AlfColorEnum;
  readonly active: AlfColorEnum;
} => {
  switch (variant) {
    case AlfColorVariantEnum.Primary:
    case AlfColorVariantEnum.Default:
      return { default: AlfColorEnum.Blue050, hover: AlfColorEnum.Blue200, active: AlfColorEnum.Blue150 };
    case AlfColorVariantEnum.Secondary:
      return { default: AlfColorEnum.Gray050, hover: AlfColorEnum.Gray200, active: AlfColorEnum.Gray150 };
    case AlfColorVariantEnum.Success:
      return { default: AlfColorEnum.Green050, hover: AlfColorEnum.Green200, active: AlfColorEnum.Green150 };
    case AlfColorVariantEnum.Danger:
      return { default: AlfColorEnum.Red050, hover: AlfColorEnum.Red200, active: AlfColorEnum.Red150 };
    case AlfColorVariantEnum.Warning:
      return { default: AlfColorEnum.Yellow050, hover: AlfColorEnum.Yellow200, active: AlfColorEnum.Yellow150 };
    case AlfColorVariantEnum.Info:
      return { default: AlfColorEnum.Cyan050, hover: AlfColorEnum.Cyan200, active: AlfColorEnum.Cyan150 };
    case AlfColorVariantEnum.Light:
      return { default: AlfColorEnum.Gray050, hover: AlfColorEnum.Gray200, active: AlfColorEnum.Gray150 };
    case AlfColorVariantEnum.Dark:
      return { default: AlfColorEnum.Gray100, hover: AlfColorEnum.Gray300, active: AlfColorEnum.Gray200 };
    default:
      return { default: AlfColorEnum.Blue050, hover: AlfColorEnum.Blue200, active: AlfColorEnum.Blue150 };
  }
};

const buildOutlinedPreset = (
  recipe: ColorRecipe,
  variant: AlfColorVariantEnum,
): MainVisualStyleInterface => {
  const outlineTextColor = resolveLightTextColor(variant, recipe.background);
  const softBackgrounds = resolveOutlinedSoftBackgrounds(variant);

  return {
    ...COMMON_BASE,
    ripple: { backgroundColor: recipe.ripple },
    backgrounds: {
      default: { backgroundColor: softBackgrounds.default },
      hover: { backgroundColor: softBackgrounds.hover },
      active: { backgroundColor: softBackgrounds.active },
      focus: { backgroundColor: softBackgrounds.default },
      disabled: { backgroundColor: softBackgrounds.default },
    },
    border: {
      default: {
        borderWidth: AlfPxEnum.Px015,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: recipe.border,
        borderRadius: AlfRadiusEnum.Base,
      },
      hover: { borderWidth: AlfPxEnum.Px015, borderStyle: AlfBorderStyleEnum.Solid, borderColor: recipe.borderHover },
      active: { borderWidth: AlfPxEnum.Px015, borderStyle: AlfBorderStyleEnum.Solid, borderColor: recipe.borderActive },
      focus: { borderWidth: AlfPxEnum.Px015, borderStyle: AlfBorderStyleEnum.Solid, borderColor: recipe.border },
      disabled: { borderWidth: AlfPxEnum.Px015, borderStyle: AlfBorderStyleEnum.Solid, borderColor: recipe.border },
    },
    textStyle: {
      default: { color: outlineTextColor },
      hover: { color: outlineTextColor },
      active: { color: outlineTextColor },
    },
    typography: {
      default: {
        color: outlineTextColor,
        lineHeight: AlfLineHeightEnum.None,
      },
      hover: { color: outlineTextColor },
      active: { color: outlineTextColor },
    },
  };
};

const buildTextPreset = (recipe: ColorRecipe, variant: AlfColorVariantEnum): MainVisualStyleInterface => ({
  ...COMMON_BASE,
  ripple: { backgroundColor: recipe.ripple },
  backgrounds: {
    default: { backgroundColor: AlfColorEnum.Transparent },
    hover: { backgroundColor: AlfColorEnum.Transparent },
    active: { backgroundColor: AlfColorEnum.Transparent },
  },
  border: {
    default: { borderWidth: AlfPxEnum.None, borderColor: AlfColorEnum.Transparent },
    hover: { borderWidth: AlfPxEnum.None, borderColor: AlfColorEnum.Transparent },
    active: { borderWidth: AlfPxEnum.None, borderColor: AlfColorEnum.Transparent },
  },
  textStyle: {
    default: { color: resolveLightTextColor(variant, recipe.background) },
    hover: { color: resolveLightTextColor(variant, recipe.background) },
    active: { color: resolveLightTextColor(variant, recipe.background) },
  },
  typography: {
    default: { color: resolveLightTextColor(variant, recipe.background), lineHeight: AlfLineHeightEnum.None },
    hover: { color: resolveLightTextColor(variant, recipe.background) },
    active: { color: resolveLightTextColor(variant, recipe.background) },
  },
  shadows: {
    default: { boxShadow: AlfShadowEnum.None },
    hover: { boxShadow: AlfShadowEnum.None },
  },
});

const buildGhostPreset = (recipe: ColorRecipe, variant: AlfColorVariantEnum): MainVisualStyleInterface => {
  const soft = resolveOutlinedSoftBackgrounds(variant);
  const ghostTextColor = resolveLightTextColor(variant, recipe.background);
  return {
    ...COMMON_BASE,
    ripple: { backgroundColor: recipe.ripple },
    backgrounds: {
      default: { backgroundColor: AlfColorEnum.Transparent },
      hover: { backgroundColor: soft.hover },
      active: { backgroundColor: soft.active },
    },
    border: {
      default: { borderWidth: AlfPxEnum.None, borderColor: AlfColorEnum.Transparent },
    },
    textStyle: {
      default: { color: ghostTextColor },
      hover: { color: ghostTextColor },
      active: { color: ghostTextColor },
    },
    typography: {
      default: { color: ghostTextColor, lineHeight: AlfLineHeightEnum.None },
      hover: { color: ghostTextColor },
      active: { color: ghostTextColor },
    },
    shadows: {
      default: { boxShadow: AlfShadowEnum.None },
      hover: { boxShadow: AlfShadowEnum.None },
    },
  };
};

const buildSoftPreset = (recipe: ColorRecipe, variant: AlfColorVariantEnum): MainVisualStyleInterface => {
  const soft = resolveOutlinedSoftBackgrounds(variant);
  const softTextColor = resolveLightTextColor(variant, recipe.background);
  const softBorderColor = variant === AlfColorVariantEnum.Light
    ? LIGHT_TEXT_COLOR
    : AlfColorEnum.Transparent;
  return {
    ...COMMON_BASE,
    ripple: { backgroundColor: recipe.ripple },
    backgrounds: {
      default: { backgroundColor: soft.default },
      hover: { backgroundColor: soft.hover },
      active: { backgroundColor: soft.active },
    },
    border: {
      default: { borderWidth: AlfPxEnum.Px1, borderStyle: AlfBorderStyleEnum.Solid, borderColor: softBorderColor },
      hover: { borderWidth: AlfPxEnum.Px1, borderStyle: AlfBorderStyleEnum.Solid, borderColor: softBorderColor },
      active: { borderWidth: AlfPxEnum.Px1, borderStyle: AlfBorderStyleEnum.Solid, borderColor: softBorderColor },
    },
    textStyle: {
      default: { color: softTextColor },
      hover: { color: softTextColor },
      active: { color: softTextColor },
    },
    typography: {
      default: { color: softTextColor, lineHeight: AlfLineHeightEnum.None },
      hover: { color: softTextColor },
      active: { color: softTextColor },
    },
  };
};

const buildCrystalPreset = (recipe: ColorRecipe, variant: AlfColorVariantEnum): MainVisualStyleInterface => {
  const soft = resolveOutlinedSoftBackgrounds(variant);
  const crystalTextColor = resolveLightTextColor(variant, recipe.background);
  const crystalBorderColor = variant === AlfColorVariantEnum.Light
    ? LIGHT_TEXT_COLOR
    : recipe.border;
  const crystalHoverBorderColor = variant === AlfColorVariantEnum.Light
    ? LIGHT_TEXT_COLOR
    : recipe.borderHover;
  return {
    ...COMMON_BASE,
    ripple: { backgroundColor: recipe.ripple },
    backgrounds: {
      default: { backgroundColor: soft.default },
      hover: { backgroundColor: soft.hover },
      active: { backgroundColor: soft.active },
    },
    border: {
      default: {
        borderWidth: AlfPxEnum.Px1,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: crystalBorderColor,
        borderRadius: AlfRadiusEnum.Base,
      },
      hover: {
        borderWidth: AlfPxEnum.Px1,
        borderStyle: AlfBorderStyleEnum.Solid,
        borderColor: crystalHoverBorderColor,
      },
    },
    textStyle: {
      default: { color: crystalTextColor },
      hover: { color: crystalTextColor },
    },
    typography: {
      default: { color: crystalTextColor, lineHeight: AlfLineHeightEnum.None },
      hover: { color: crystalTextColor },
    },
    shadows: {
      default: { boxShadow: AlfShadowEnum.Sm },
      hover: { boxShadow: AlfShadowEnum.Md },
    },
  };
};

const buildThreeDPreset = (recipe: ColorRecipe, variant: AlfColorVariantEnum): MainVisualStyleInterface => ({
  ...COMMON_BASE,
  ripple: { backgroundColor: recipe.ripple },
  backgrounds: {
    default: { backgroundColor: recipe.background },
    hover: { backgroundColor: recipe.hover },
    active: { backgroundColor: recipe.active },
  },
  border: {
    default: {
      borderWidth: AlfPxEnum.Px1,
      borderStyle: AlfBorderStyleEnum.Solid,
      borderColor: recipe.border,
      borderRadius: AlfRadiusEnum.Md,
    },
  },
  textStyle: {
    default: { color: resolveLightTextColor(variant, recipe.textOnFill) },
    hover: { color: resolveLightTextColor(variant, recipe.textOnFill) },
  },
  typography: {
    default: {
      color: resolveLightTextColor(variant, recipe.textOnFill),
      fontWeight: AlfFontWeightEnum.Bold,
      lineHeight: AlfLineHeightEnum.None,
    },
    hover: { color: resolveLightTextColor(variant, recipe.textOnFill) },
  },
  shadows: {
    default: { boxShadow: AlfShadowEnum.Md },
    hover: { boxShadow: AlfShadowEnum.Lg },
  },
  transform: {
    default: { translateY: AlfPxEnum.None },
    active: { translateY: AlfPxEnum.Px1 },
  },
});

const buildGlossyPreset = (recipe: ColorRecipe, variant: AlfColorVariantEnum): MainVisualStyleInterface => ({
  ...COMMON_BASE,
  ripple: { backgroundColor: recipe.ripple },
  backgrounds: {
    default: {
      backgroundColor: recipe.background,
      backgroundImage: `linear-gradient(180deg, ${recipe.background} 0%, ${recipe.hover} 100%)`,
    },
    hover: {
      backgroundColor: recipe.hover,
      backgroundImage: `linear-gradient(180deg, ${recipe.hover} 0%, ${recipe.active} 100%)`,
    },
  },
  padding: {
    default: {
      paddingTop: AlfPxEnum.Px14,
      paddingBottom: AlfPxEnum.Px14,
      paddingLeft: AlfPxEnum.Px32,
      paddingRight: AlfPxEnum.Px32,
    },
  },
  border: {
    default: {
      borderWidth: AlfPxEnum.Px1,
      borderStyle: AlfBorderStyleEnum.Solid,
      borderColor: recipe.border,
      borderRadius: AlfRadiusEnum.Base,
    },
  },
  textStyle: {
    default: { color: resolveLightTextColor(variant, recipe.textOnFill) },
    hover: { color: resolveLightTextColor(variant, recipe.textOnFill) },
    active: { color: resolveLightTextColor(variant, recipe.textOnFill) },
  },
  typography: {
    default: {
      color: resolveLightTextColor(variant, recipe.textOnFill),
      fontWeight: AlfFontWeightEnum.Bold,
      lineHeight: AlfLineHeightEnum.None,
    },
    hover: {
      color: resolveLightTextColor(variant, recipe.textOnFill),
      fontWeight: AlfFontWeightEnum.Bold,
    },
    active: {
      color: resolveLightTextColor(variant, recipe.textOnFill),
      fontWeight: AlfFontWeightEnum.Bold,
    },
  },
  shadows: {
    default: { boxShadow: AlfShadowEnum.Sm },
    hover: { boxShadow: AlfShadowEnum.Md },
  },
});

const buildGradientPreset = (recipe: ColorRecipe, variant: AlfColorVariantEnum): MainVisualStyleInterface => ({
  ...COMMON_BASE,
  ripple: { backgroundColor: recipe.ripple },
  backgrounds: {
    default: {
      backgroundColor: recipe.background,
      backgroundImage: `linear-gradient(135deg, ${recipe.background} 0%, ${recipe.hover} 100%)`,
    },
    hover: {
      backgroundColor: recipe.hover,
      backgroundImage: `linear-gradient(135deg, ${recipe.hover} 0%, ${recipe.active} 100%)`,
    },
  },
  border: {
    default: {
      borderWidth: AlfPxEnum.None,
      borderColor: AlfColorEnum.Transparent,
    },
  },
  textStyle: {
    default: { color: resolveLightTextColor(variant, recipe.textOnFill) },
    hover: { color: resolveLightTextColor(variant, recipe.textOnFill) },
    active: { color: resolveLightTextColor(variant, recipe.textOnFill) },
  },
  typography: {
    default: {
      color: resolveLightTextColor(variant, recipe.textOnFill),
      fontWeight: AlfFontWeightEnum.Bold,
      lineHeight: AlfLineHeightEnum.None,
    },
    hover: {
      color: resolveLightTextColor(variant, recipe.textOnFill),
      fontWeight: AlfFontWeightEnum.Bold,
    },
    active: {
      color: resolveLightTextColor(variant, recipe.textOnFill),
      fontWeight: AlfFontWeightEnum.Bold,
    },
  },
  shadows: {
    default: { boxShadow: AlfShadowEnum.Xl },
    hover: { boxShadow: AlfShadowEnum.Xl },
  },
});

const buildRaisedPreset = (recipe: ColorRecipe, variant: AlfColorVariantEnum): MainVisualStyleInterface => ({
  ...COMMON_BASE,
  ripple: { backgroundColor: recipe.ripple },
  backgrounds: {
    default: { backgroundColor: recipe.background },
    hover: { backgroundColor: recipe.hover },
    active: { backgroundColor: recipe.active },
  },
  border: {
    default: {
      borderWidth: AlfPxEnum.None,
      borderRadius: AlfRadiusEnum.Base,
      borderColor: recipe.border,
    },
  },
  textStyle: {
    default: { color: resolveLightTextColor(variant, recipe.textOnFill) },
    hover: { color: resolveLightTextColor(variant, recipe.textOnFill) },
    active: { color: resolveLightTextColor(variant, recipe.textOnFill) },
  },
  typography: {
    default: {
      color: resolveLightTextColor(variant, recipe.textOnFill),
      lineHeight: AlfLineHeightEnum.None,
    },
    hover: { color: resolveLightTextColor(variant, recipe.textOnFill) },
    active: { color: resolveLightTextColor(variant, recipe.textOnFill) },
  },
  shadows: {
    default: { boxShadow: AlfShadowEnum.Md },
    hover: { boxShadow: AlfShadowEnum.Lg },
  },
});

export const resolveDefaultVisual = (input: {
  readonly colorVariant?: AlfColorVariantEnum;
  readonly visualType?: AlfButtonVisualTypeEnum;
  readonly predefined?: AlfVisualPredefinedEnum;
}): MainVisualStyleInterface => {
  const variant = resolveColorVariant(input.predefined, input.colorVariant);
  const recipe = COLOR_RECIPES[variant] ?? COLOR_RECIPES[AlfColorVariantEnum.Default];
  const kind = resolveVisualKind(input.predefined, input.visualType);

  switch (kind) {
    case 'outlined':
      return buildOutlinedPreset(recipe, variant);
    case 'text':
      return buildTextPreset(recipe, variant);
    case 'ghost':
      return buildGhostPreset(recipe, variant);
    case 'soft':
      return buildSoftPreset(recipe, variant);
    case 'crystal':
      return buildCrystalPreset(recipe, variant);
    case 'threeD':
      return buildThreeDPreset(recipe, variant);
    case 'glossy':
      return buildGlossyPreset(recipe, variant);
    case 'gradient':
      return buildGradientPreset(recipe, variant);
    case 'raised':
      return buildRaisedPreset(recipe, variant);
    default:
      return buildSolidPreset(recipe, variant);
  }
};
