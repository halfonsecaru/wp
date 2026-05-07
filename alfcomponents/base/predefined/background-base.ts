import {
  AlfColorEnum,
  AlfColorVariantEnum,
  AlfBackgroundAttachmentEnum,
  AlfBackgroundClipEnum,
  AlfBackgroundRepeatEnum,
  AlfBackgroundSizeEnum,
  AlfPositionEnum
} from "@alfcomponents/enums";
import { AlfBackgroundsBaseInterface, AlfBackgroundsInterface } from "@alfcomponents/interfaces";

/**
 * Configuración base legacy para fondos (Backgrounds).
 * Mantenida por retrocompatibilidad con main-variants-selection.
 */
export const defaultBackgroundBase: AlfBackgroundsBaseInterface = {
  backgroundColor: AlfColorEnum.Transparent,
  backgroundImage: 'none',
  backgroundSize: AlfBackgroundSizeEnum.Auto,
  backgroundPosition: AlfPositionEnum.TopLeft,
  backgroundRepeat: AlfBackgroundRepeatEnum.NoRepeat,
  backgroundAttachment: AlfBackgroundAttachmentEnum.Scroll,
  backgroundClip: AlfBackgroundClipEnum.BorderBox
};

export const buildBackgroundColor = (
  variant?: AlfColorVariantEnum,
  customConfig?: AlfBackgroundsInterface
): AlfBackgroundsInterface => {

  if (!variant) return backgroundDefault({
    ...defaultConfig,
    ...customConfig
  });

  switch (variant) {
    case AlfColorVariantEnum.Primary:
    case AlfColorVariantEnum.PrimaryOutline:
    case AlfColorVariantEnum.Primary3D:
    case AlfColorVariantEnum.PrimaryCrystal:
    case AlfColorVariantEnum.PrimaryGhost:
      return backgroundDefault({ ...primaryColorBackground, ...customConfig });
    case AlfColorVariantEnum.PrimarySoft:
      return backgroundDefault({ ...primarySoftBackground, ...customConfig });

    case AlfColorVariantEnum.Secondary:
    case AlfColorVariantEnum.SecondaryOutline:
    case AlfColorVariantEnum.Secondary3D:
    case AlfColorVariantEnum.SecondaryCrystal:
    case AlfColorVariantEnum.SecondaryGhost:
      return backgroundDefault({ ...secondaryColorBackground, ...customConfig });
    case AlfColorVariantEnum.SecondarySoft:
      return backgroundDefault({ ...secondarySoftBackground, ...customConfig });

    case AlfColorVariantEnum.Success:
    case AlfColorVariantEnum.SuccessOutline:
    case AlfColorVariantEnum.Success3D:
    case AlfColorVariantEnum.SuccessCrystal:
    case AlfColorVariantEnum.SuccessGhost:
      return backgroundDefault({ ...successColorBackground, ...customConfig });
    case AlfColorVariantEnum.SuccessSoft:
      return backgroundDefault({ ...successSoftBackground, ...customConfig });

    case AlfColorVariantEnum.Danger:
    case AlfColorVariantEnum.DangerOutline:
    case AlfColorVariantEnum.Danger3D:
    case AlfColorVariantEnum.DangerCrystal:
    case AlfColorVariantEnum.DangerGhost:
      return backgroundDefault({ ...dangerColorBackground, ...customConfig });
    case AlfColorVariantEnum.DangerSoft:
      return backgroundDefault({ ...dangerSoftBackground, ...customConfig });

    case AlfColorVariantEnum.Warning:
    case AlfColorVariantEnum.WarningOutline:
    case AlfColorVariantEnum.Warning3D:
    case AlfColorVariantEnum.WarningCrystal:
    case AlfColorVariantEnum.WarningGhost:
      return backgroundDefault({ ...warningColorBackground, ...customConfig });
    case AlfColorVariantEnum.WarningSoft:
      return backgroundDefault({ ...warningSoftBackground, ...customConfig });

    case AlfColorVariantEnum.Info:
    case AlfColorVariantEnum.InfoOutline:
    case AlfColorVariantEnum.Info3D:
    case AlfColorVariantEnum.InfoCrystal:
    case AlfColorVariantEnum.InfoGhost:
      return backgroundDefault({ ...infoColorBackground, ...customConfig });
    case AlfColorVariantEnum.InfoSoft:
      return backgroundDefault({ ...infoSoftBackground, ...customConfig });

    case AlfColorVariantEnum.Light:
    case AlfColorVariantEnum.LightOutline:
    case AlfColorVariantEnum.Light3D:
    case AlfColorVariantEnum.LightCrystal:
    case AlfColorVariantEnum.LightGhost:
      return backgroundDefault({ ...lightColorBackground, ...customConfig });
    case AlfColorVariantEnum.LightSoft:
      return backgroundDefault({ ...lightSoftBackground, ...customConfig });

    case AlfColorVariantEnum.Dark:
    case AlfColorVariantEnum.DarkOutline:
    case AlfColorVariantEnum.Dark3D:
    case AlfColorVariantEnum.DarkCrystal:
    case AlfColorVariantEnum.DarkGhost:
      return backgroundDefault({ ...darkColorBackground, ...customConfig });
    case AlfColorVariantEnum.DarkSoft:
      return backgroundDefault({ ...darkSoftBackground, ...customConfig });
    default:
      return backgroundDefault({ ...defaultConfig, ...customConfig });
  }
};

/**
 * Genera la configuración de fondo "Soft" (muy claro).
 * Ideal para fondos sutiles vinculados al color de la variante.
 */
export const buildSoftBackgroundColor = (
  variant?: AlfColorVariantEnum,
  customConfig?: AlfBackgroundsInterface
): AlfBackgroundsInterface => {
  const variantBase = variant || AlfColorVariantEnum.Default;

  switch (variantBase) {
    case AlfColorVariantEnum.Primary:
    case AlfColorVariantEnum.PrimaryOutline:
    case AlfColorVariantEnum.Primary3D:
    case AlfColorVariantEnum.PrimaryCrystal:
    case AlfColorVariantEnum.PrimaryGhost:
    case AlfColorVariantEnum.PrimarySoft:
      return backgroundDefault({ ...primarySoftBackground, ...customConfig });

    case AlfColorVariantEnum.Secondary:
    case AlfColorVariantEnum.SecondaryOutline:
    case AlfColorVariantEnum.Secondary3D:
    case AlfColorVariantEnum.SecondaryCrystal:
    case AlfColorVariantEnum.SecondaryGhost:
    case AlfColorVariantEnum.SecondarySoft:
      return backgroundDefault({ ...secondarySoftBackground, ...customConfig });

    case AlfColorVariantEnum.Success:
    case AlfColorVariantEnum.SuccessOutline:
    case AlfColorVariantEnum.Success3D:
    case AlfColorVariantEnum.SuccessCrystal:
    case AlfColorVariantEnum.SuccessGhost:
    case AlfColorVariantEnum.SuccessSoft:
      return backgroundDefault({ ...successSoftBackground, ...customConfig });

    case AlfColorVariantEnum.Danger:
    case AlfColorVariantEnum.DangerOutline:
    case AlfColorVariantEnum.Danger3D:
    case AlfColorVariantEnum.DangerCrystal:
    case AlfColorVariantEnum.DangerGhost:
    case AlfColorVariantEnum.DangerSoft:
      return backgroundDefault({ ...dangerSoftBackground, ...customConfig });

    case AlfColorVariantEnum.Warning:
    case AlfColorVariantEnum.WarningOutline:
    case AlfColorVariantEnum.Warning3D:
    case AlfColorVariantEnum.WarningCrystal:
    case AlfColorVariantEnum.WarningGhost:
    case AlfColorVariantEnum.WarningSoft:
      return backgroundDefault({ ...warningSoftBackground, ...customConfig });

    case AlfColorVariantEnum.Info:
    case AlfColorVariantEnum.InfoOutline:
    case AlfColorVariantEnum.Info3D:
    case AlfColorVariantEnum.InfoCrystal:
    case AlfColorVariantEnum.InfoGhost:
    case AlfColorVariantEnum.InfoSoft:
      return backgroundDefault({ ...infoSoftBackground, ...customConfig });

    case AlfColorVariantEnum.Light:
    case AlfColorVariantEnum.LightOutline:
    case AlfColorVariantEnum.Light3D:
    case AlfColorVariantEnum.LightCrystal:
    case AlfColorVariantEnum.LightGhost:
    case AlfColorVariantEnum.LightSoft:
      return backgroundDefault({ ...lightSoftBackground, ...customConfig });

    case AlfColorVariantEnum.Dark:
    case AlfColorVariantEnum.DarkOutline:
    case AlfColorVariantEnum.Dark3D:
    case AlfColorVariantEnum.DarkCrystal:
    case AlfColorVariantEnum.DarkGhost:
    case AlfColorVariantEnum.DarkSoft:
      return backgroundDefault({ ...darkSoftBackground, ...customConfig });

    default:
      return backgroundDefault({ ...defaultSoftConfig, ...customConfig });
  }
};

// ── Helper para construir configs de color ──────────────────────────────────

const buildColorBackgroundConfig = (
  main: AlfColorEnum,
  hover: AlfColorEnum
): AlfBackgroundsInterface => ({
  default: { backgroundColor: main },
  hover: { backgroundColor: hover },
  focus: { backgroundColor: hover },
  active: { backgroundColor: hover },
  disabled: { backgroundColor: AlfColorEnum.Gray200 },
});

// ── Configs por variante ────────────────────────────────────────────────────

const primaryColorBackground: AlfBackgroundsInterface = buildColorBackgroundConfig(
  AlfColorEnum.Primary, AlfColorEnum.PrimaryHover
);

const secondaryColorBackground: AlfBackgroundsInterface = buildColorBackgroundConfig(
  AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover
);

const successColorBackground: AlfBackgroundsInterface = buildColorBackgroundConfig(
  AlfColorEnum.Success, AlfColorEnum.SuccessHover
);

const dangerColorBackground: AlfBackgroundsInterface = buildColorBackgroundConfig(
  AlfColorEnum.Danger, AlfColorEnum.DangerHover
);

const warningColorBackground: AlfBackgroundsInterface = buildColorBackgroundConfig(
  AlfColorEnum.Warning, AlfColorEnum.WarningHover
);

const infoColorBackground: AlfBackgroundsInterface = buildColorBackgroundConfig(
  AlfColorEnum.Info, AlfColorEnum.InfoHover
);

const lightColorBackground: AlfBackgroundsInterface = buildColorBackgroundConfig(
  AlfColorEnum.Gray100, AlfColorEnum.Gray200
);

const darkColorBackground: AlfBackgroundsInterface = buildColorBackgroundConfig(
  AlfColorEnum.Gray800, AlfColorEnum.Gray900
);

// ── Configs Soft (Tonos muy claros) ─────────────────────────────────────────

const primarySoftBackground: AlfBackgroundsInterface = buildColorBackgroundConfig(
  AlfColorEnum.Blue050, AlfColorEnum.Blue100
);

const secondarySoftBackground: AlfBackgroundsInterface = buildColorBackgroundConfig(
  AlfColorEnum.Gray100, AlfColorEnum.Gray200
);

const successSoftBackground: AlfBackgroundsInterface = buildColorBackgroundConfig(
  AlfColorEnum.Green050, AlfColorEnum.Green100
);

const dangerSoftBackground: AlfBackgroundsInterface = buildColorBackgroundConfig(
  AlfColorEnum.Red050, AlfColorEnum.Red100
);

const warningSoftBackground: AlfBackgroundsInterface = buildColorBackgroundConfig(
  AlfColorEnum.Yellow050, AlfColorEnum.Yellow100
);

const infoSoftBackground: AlfBackgroundsInterface = buildColorBackgroundConfig(
  AlfColorEnum.Cyan050, AlfColorEnum.Cyan100
);

const lightSoftBackground: AlfBackgroundsInterface = buildColorBackgroundConfig(
  AlfColorEnum.Gray050, AlfColorEnum.Gray100
);

const darkSoftBackground: AlfBackgroundsInterface = buildColorBackgroundConfig(
  AlfColorEnum.Gray200, AlfColorEnum.Gray300
);

const defaultSoftConfig: AlfBackgroundsInterface = {
  default: { backgroundColor: AlfColorEnum.Gray050 },
  hover: { backgroundColor: AlfColorEnum.Gray100 },
  focus: { backgroundColor: AlfColorEnum.Gray100 },
  active: { backgroundColor: AlfColorEnum.Gray100 },
  disabled: { backgroundColor: AlfColorEnum.Gray200 },
};

const defaultConfig: AlfBackgroundsInterface = {
  default: { backgroundColor: AlfColorEnum.Transparent },
  hover: { backgroundColor: AlfColorEnum.Transparent },
  focus: { backgroundColor: AlfColorEnum.Transparent },
  active: { backgroundColor: AlfColorEnum.Transparent },
  disabled: { backgroundColor: AlfColorEnum.Gray200 },
};

const backgroundDefault = (customConfig?: AlfBackgroundsInterface): AlfBackgroundsInterface => {
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
  };
};
