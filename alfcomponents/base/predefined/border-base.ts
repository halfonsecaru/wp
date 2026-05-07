import { AlfBorderStyleEnum, AlfColorEnum, AlfColorVariantEnum, AlfPxEnum, AlfRadiusEnum, AlfRemEnum } from "@alfcomponents/enums";
import { AlfBorderBaseInterface, AlfBorderInterface } from "@alfcomponents/interfaces";

export const buildBorderColor = (
  variant?: AlfColorVariantEnum,
  customConfig?: AlfBorderInterface
): AlfBorderInterface => {

  if (!variant) return borderDefault({
    ...defaultConfig,
    ...customConfig
  });

  switch (variant) {
    case AlfColorVariantEnum.Primary:
    case AlfColorVariantEnum.PrimaryOutline:
    case AlfColorVariantEnum.Primary3D:
    case AlfColorVariantEnum.PrimaryCrystal:
    case AlfColorVariantEnum.PrimaryGhost:
    case AlfColorVariantEnum.PrimarySoft:
      return borderDefault({ ...primaryColorBorder, ...customConfig });
    case AlfColorVariantEnum.Secondary:
    case AlfColorVariantEnum.SecondaryOutline:
    case AlfColorVariantEnum.Secondary3D:
    case AlfColorVariantEnum.SecondaryCrystal:
    case AlfColorVariantEnum.SecondaryGhost:
    case AlfColorVariantEnum.SecondarySoft:
      return borderDefault({ ...secondaryColorBorder, ...customConfig });
    case AlfColorVariantEnum.Success:
    case AlfColorVariantEnum.SuccessOutline:
    case AlfColorVariantEnum.Success3D:
    case AlfColorVariantEnum.SuccessCrystal:
    case AlfColorVariantEnum.SuccessGhost:
    case AlfColorVariantEnum.SuccessSoft:
      return borderDefault({ ...successColorBorder, ...customConfig });
    case AlfColorVariantEnum.Danger:
    case AlfColorVariantEnum.DangerOutline:
    case AlfColorVariantEnum.Danger3D:
    case AlfColorVariantEnum.DangerCrystal:
    case AlfColorVariantEnum.DangerGhost:
    case AlfColorVariantEnum.DangerSoft:
      return borderDefault({ ...dangerColorBorder, ...customConfig });
    case AlfColorVariantEnum.Warning:
    case AlfColorVariantEnum.WarningOutline:
    case AlfColorVariantEnum.Warning3D:
    case AlfColorVariantEnum.WarningCrystal:
    case AlfColorVariantEnum.WarningGhost:
    case AlfColorVariantEnum.WarningSoft:
      return borderDefault({ ...warningColorBorder, ...customConfig });
    case AlfColorVariantEnum.Info:
    case AlfColorVariantEnum.InfoOutline:
    case AlfColorVariantEnum.Info3D:
    case AlfColorVariantEnum.InfoCrystal:
    case AlfColorVariantEnum.InfoGhost:
    case AlfColorVariantEnum.InfoSoft:
      return borderDefault({ ...infoColorBorder, ...customConfig });
    case AlfColorVariantEnum.Light:
    case AlfColorVariantEnum.LightOutline:
    case AlfColorVariantEnum.Light3D:
    case AlfColorVariantEnum.LightCrystal:
    case AlfColorVariantEnum.LightGhost:
    case AlfColorVariantEnum.LightSoft:
      return borderDefault({ ...lightColorBorder, ...customConfig });
    case AlfColorVariantEnum.Dark:
    case AlfColorVariantEnum.DarkOutline:
    case AlfColorVariantEnum.Dark3D:
    case AlfColorVariantEnum.DarkCrystal:
    case AlfColorVariantEnum.DarkGhost:
    case AlfColorVariantEnum.DarkSoft:
      return borderDefault({ ...darkColorBorder, ...customConfig });
    default:
      return borderDefault({ ...defaultConfig, ...customConfig });
  }
};

// ── Helpers para construir configs de color ─────────────────────────────────

const buildColorBorderConfig = (
  main: AlfColorEnum,
  hover: AlfColorEnum
): AlfBorderInterface => ({
  default: {
    borderColor: main,
    borderRadius: AlfRadiusEnum.Md,
    borderStyle: AlfBorderStyleEnum.Solid,
    borderWidth: AlfPxEnum.Px015,
  },
  hover: { borderColor: hover },
  focus: { borderColor: hover },
  active: { borderColor: hover },
  disabled: { borderColor: AlfColorEnum.Gray450 },
});

// ── Configs por variante ────────────────────────────────────────────────────

const primaryColorBorder: AlfBorderInterface = buildColorBorderConfig(
  AlfColorEnum.Primary, AlfColorEnum.PrimaryHover
);

const secondaryColorBorder: AlfBorderInterface = buildColorBorderConfig(
  AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover
);

const successColorBorder: AlfBorderInterface = buildColorBorderConfig(
  AlfColorEnum.Success, AlfColorEnum.SuccessHover
);

const dangerColorBorder: AlfBorderInterface = buildColorBorderConfig(
  AlfColorEnum.Danger, AlfColorEnum.DangerHover
);

const warningColorBorder: AlfBorderInterface = buildColorBorderConfig(
  AlfColorEnum.Warning, AlfColorEnum.WarningHover
);

const infoColorBorder: AlfBorderInterface = buildColorBorderConfig(
  AlfColorEnum.Info, AlfColorEnum.InfoHover
);

const lightColorBorder: AlfBorderInterface = buildColorBorderConfig(
  AlfColorEnum.Gray400, AlfColorEnum.Gray500
);

const darkColorBorder: AlfBorderInterface = buildColorBorderConfig(
  AlfColorEnum.Gray800, AlfColorEnum.Gray900
);

const defaultConfig: AlfBorderInterface = {
  default: {
    borderColor: AlfColorEnum.Gray600,
    borderRadius: AlfRadiusEnum.Md,
    borderStyle: AlfBorderStyleEnum.Solid,
    borderWidth: AlfPxEnum.Px015,
  },
  hover: { borderColor: AlfColorEnum.Gray600 },
  focus: { borderColor: AlfColorEnum.Gray800 },
  active: { borderColor: AlfColorEnum.Gray800 },
  disabled: { borderColor: AlfColorEnum.Gray450 },
};

const borderDefault = (customConfig?: AlfBorderInterface): AlfBorderInterface => {
  const principal = customConfig?.default || {};

  return {
    default: {
      ...principal
    },
    hover: {
      ...principal,
      ...customConfig?.hover
    },
    focus: {
      ...principal,
      ...customConfig?.hover,
      ...customConfig?.focus
    },
    active: {
      ...principal,
      ...customConfig?.hover,
      ...customConfig?.active
    },
    disabled: {
      ...principal,
      ...customConfig?.hover,
      ...customConfig?.disabled
    }
  }
};
