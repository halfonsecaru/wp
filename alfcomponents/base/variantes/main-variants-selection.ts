import { 
  AlfBorderStyleEnum, 
  AlfColorEnum, 
  AlfColorVariantEnum, 
  AlfPxEnum, 
  AlfRadiusEnum,
  AlfLineHeightEnum,
  AlfShadowEnum,
  AlfFontWeightEnum
} from "@alfcomponents/enums";
import { MainVisualStyleInterface } from "@alfcomponents/interfaces";
import { 
  defaultAnimationsBase,
  defaultBackgroundBase, 
  defaultBorderBase, 
  defaultDisplayAndLayout,
  defaultMarginBase,
  defaultOutlineBase,
  defaultPaddingBase,
  defaultShadowsBase,
  defaultTextStyleBase, 
  defaultTransformBase,
  defaultTypographyBase 
} from "../predefined";

/**
 * Identidad base que aglutina todos los valores predefinidos del sistema.
 */
const BASE_IDENTITY: Partial<MainVisualStyleInterface> = {
  animations: { ...defaultAnimationsBase },
  displayAndLayout: {
    default: { ...defaultDisplayAndLayout },
    hover: { ...defaultDisplayAndLayout },
    active: { ...defaultDisplayAndLayout },
    focus: { ...defaultDisplayAndLayout },
    disabled: { ...defaultDisplayAndLayout },
  },
  margin: {
    default: { ...defaultMarginBase },
    hover: { ...defaultMarginBase },
    active: { ...defaultMarginBase },
    focus: { ...defaultMarginBase },
    disabled: { ...defaultMarginBase },
  },
  outline: {
    default: { ...defaultOutlineBase },
    hover: { ...defaultOutlineBase },
    active: { ...defaultOutlineBase },
    focus: { ...defaultOutlineBase },
    disabled: { ...defaultOutlineBase },
  },
  padding: {
    default: { ...defaultPaddingBase },
    hover: { ...defaultPaddingBase },
    active: { ...defaultPaddingBase },
    focus: { ...defaultPaddingBase },
    disabled: { ...defaultPaddingBase },
  },
  shadows: {
    default: { ...defaultShadowsBase },
    hover: { ...defaultShadowsBase },
    active: { ...defaultShadowsBase },
    focus: { ...defaultShadowsBase },
    disabled: { ...defaultShadowsBase },
  },
  transform: {
    default: { ...defaultTransformBase },
    hover: { ...defaultTransformBase },
    active: { ...defaultTransformBase },
    focus: { ...defaultTransformBase },
    disabled: { ...defaultTransformBase },
  },
  textStyle: {
    default: { ...defaultTextStyleBase },
    hover: { ...defaultTextStyleBase },
    active: { ...defaultTextStyleBase },
    focus: { ...defaultTextStyleBase },
    disabled: { ...defaultTextStyleBase },
  }
};

/**
 * Resuelve la definición visual completa para una variante.
 */
export const resolveVariantDefinitions = (variant: AlfColorVariantEnum): Partial<MainVisualStyleInterface> => {
  
  // Helpers de construcción de estados (Sintonizados con los valores exactos del legacy)
  const buildBg = (color: AlfColorEnum, hover: AlfColorEnum, active: AlfColorEnum) => ({
    default: { ...defaultBackgroundBase, backgroundColor: color },
    hover: { ...defaultBackgroundBase, backgroundColor: hover },
    active: { ...defaultBackgroundBase, backgroundColor: active },
    focus: { ...defaultBackgroundBase, backgroundColor: color },
    disabled: { ...defaultBackgroundBase, backgroundColor: color },
  });

  const buildBord = (color: AlfColorEnum, hover: AlfColorEnum, active: AlfColorEnum, width: AlfPxEnum = AlfPxEnum.Px015) => ({
    default: { ...defaultBorderBase, borderColor: color, borderWidth: width, borderStyle: AlfBorderStyleEnum.Solid, borderRadius: AlfRadiusEnum.Base },
    hover: { ...defaultBorderBase, borderColor: hover, borderWidth: width, borderStyle: AlfBorderStyleEnum.Solid },
    active: { ...defaultBorderBase, borderColor: active, borderWidth: width, borderStyle: AlfBorderStyleEnum.Solid },
    focus: { ...defaultBorderBase, borderColor: color, borderWidth: width, borderStyle: AlfBorderStyleEnum.Solid },
    disabled: { ...defaultBorderBase, borderColor: color, borderWidth: width, borderStyle: AlfBorderStyleEnum.Solid },
  });

  const buildTypo = (color: AlfColorEnum, hover: AlfColorEnum = color) => ({
    default: { ...defaultTypographyBase, color: color, lineHeight: AlfLineHeightEnum.None },
    hover: { ...defaultTypographyBase, color: hover, lineHeight: AlfLineHeightEnum.None },
    active: { ...defaultTypographyBase, color: hover, lineHeight: AlfLineHeightEnum.None },
    focus: { ...defaultTypographyBase, color: color, lineHeight: AlfLineHeightEnum.None },
    disabled: { ...defaultTypographyBase, color: color, lineHeight: AlfLineHeightEnum.None },
  });

  const buildShad = (shadow: AlfShadowEnum, hoverShadow: AlfShadowEnum = shadow) => ({
    default: { ...defaultShadowsBase, boxShadow: shadow },
    hover: { ...defaultShadowsBase, boxShadow: hoverShadow },
    active: { ...defaultShadowsBase, boxShadow: shadow },
    focus: { ...defaultShadowsBase, boxShadow: hoverShadow },
    disabled: { ...defaultShadowsBase, boxShadow: AlfShadowEnum.None },
  });

  // RECETAS SINTONIZADAS CON DEFAULT-VISUAL.TS
  const solid = (main: AlfColorEnum, hover: AlfColorEnum, active: AlfColorEnum, text: AlfColorEnum) => ({
    ...BASE_IDENTITY,
    backgrounds: buildBg(main, hover, active),
    border: buildBord(main, hover, active),
    typography: buildTypo(text),
    shadows: buildShad(AlfShadowEnum.Base, AlfShadowEnum.Md),
    ripple: { backgroundColor: hover }
  });

  const outline = (main: AlfColorEnum, hover: AlfColorEnum, active: AlfColorEnum, softBg: AlfColorEnum, softHover: AlfColorEnum, softActive: AlfColorEnum) => ({
    ...BASE_IDENTITY,
    backgrounds: buildBg(softBg, softHover, softActive),
    border: buildBord(main, hover, active),
    typography: buildTypo(main, AlfColorEnum.White), // El texto se vuelve blanco en hover sobre el color sólido
    shadows: buildShad(AlfShadowEnum.None, AlfShadowEnum.Sm),
    ripple: { backgroundColor: main }
  });

  const soft = (bg: AlfColorEnum, hover: AlfColorEnum, active: AlfColorEnum, text: AlfColorEnum) => ({
    ...BASE_IDENTITY,
    backgrounds: buildBg(bg, hover, active),
    border: buildBord(AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None),
    typography: buildTypo(text),
    shadows: buildShad(AlfShadowEnum.None, AlfShadowEnum.Sm),
    ripple: { backgroundColor: hover }
  });

  const depth = (main: AlfColorEnum, hover: AlfColorEnum, active: AlfColorEnum, text: AlfColorEnum) => ({
    ...BASE_IDENTITY,
    backgrounds: buildBg(main, hover, active),
    border: buildBord(main, hover, active),
    typography: { ...buildTypo(text), default: { ...defaultTypographyBase, color: text, fontWeight: AlfFontWeightEnum.Bold, lineHeight: AlfLineHeightEnum.None } },
    shadows: buildShad(AlfShadowEnum.Md, AlfShadowEnum.Lg),
    transform: { ...BASE_IDENTITY.transform, active: { ...defaultTransformBase, translateY: AlfPxEnum.Px1 } },
    ripple: { backgroundColor: hover }
  });

  switch (variant) {
    // ===== PRIMARY =====
    case AlfColorVariantEnum.Primary: return solid(AlfColorEnum.Primary, AlfColorEnum.PrimaryHover, AlfColorEnum.PrimaryHover, AlfColorEnum.White);
    case AlfColorVariantEnum.PrimaryOutline: return outline(AlfColorEnum.Primary, AlfColorEnum.PrimaryHover, AlfColorEnum.PrimaryHover, AlfColorEnum.Blue050, AlfColorEnum.Blue200, AlfColorEnum.Blue150);
    case AlfColorVariantEnum.PrimaryGhost: return soft(AlfColorEnum.Transparent, AlfColorEnum.Blue050, AlfColorEnum.Blue150, AlfColorEnum.Primary);
    case AlfColorVariantEnum.PrimarySoft: return soft(AlfColorEnum.Blue050, AlfColorEnum.Blue200, AlfColorEnum.Blue150, AlfColorEnum.Primary);
    case AlfColorVariantEnum.PrimaryCrystal: return soft(AlfColorEnum.Blue050, AlfColorEnum.Blue200, AlfColorEnum.Blue150, AlfColorEnum.Primary);
    case AlfColorVariantEnum.Primary3D: return depth(AlfColorEnum.Primary, AlfColorEnum.PrimaryHover, AlfColorEnum.PrimaryHover, AlfColorEnum.White);

    // ===== SECONDARY =====
    case AlfColorVariantEnum.Secondary: return solid(AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.SecondaryHover, AlfColorEnum.White);
    case AlfColorVariantEnum.SecondaryOutline: return outline(AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.SecondaryHover, AlfColorEnum.Gray050, AlfColorEnum.Gray200, AlfColorEnum.Gray150);
    case AlfColorVariantEnum.SecondaryGhost: return soft(AlfColorEnum.Transparent, AlfColorEnum.Gray050, AlfColorEnum.Gray150, AlfColorEnum.Secondary);
    case AlfColorVariantEnum.SecondarySoft: return soft(AlfColorEnum.Gray050, AlfColorEnum.Gray200, AlfColorEnum.Gray150, AlfColorEnum.Secondary);
    case AlfColorVariantEnum.Secondary3D: return depth(AlfColorEnum.Secondary, AlfColorEnum.SecondaryHover, AlfColorEnum.SecondaryHover, AlfColorEnum.White);

    // ===== SUCCESS =====
    case AlfColorVariantEnum.Success: return solid(AlfColorEnum.Success, AlfColorEnum.SuccessHover, AlfColorEnum.SuccessHover, AlfColorEnum.White);
    case AlfColorVariantEnum.SuccessOutline: return outline(AlfColorEnum.Success, AlfColorEnum.SuccessHover, AlfColorEnum.SuccessHover, AlfColorEnum.Green050, AlfColorEnum.Green200, AlfColorEnum.Green150);
    case AlfColorVariantEnum.SuccessGhost: return soft(AlfColorEnum.Transparent, AlfColorEnum.Green050, AlfColorEnum.Green150, AlfColorEnum.Success);
    case AlfColorVariantEnum.SuccessSoft: return soft(AlfColorEnum.Green050, AlfColorEnum.Green200, AlfColorEnum.Green150, AlfColorEnum.Success);
    case AlfColorVariantEnum.Success3D: return depth(AlfColorEnum.Success, AlfColorEnum.SuccessHover, AlfColorEnum.SuccessHover, AlfColorEnum.White);

    // ===== DANGER =====
    case AlfColorVariantEnum.Danger: return solid(AlfColorEnum.Danger, AlfColorEnum.DangerHover, AlfColorEnum.DangerHover, AlfColorEnum.White);
    case AlfColorVariantEnum.DangerOutline: return outline(AlfColorEnum.Danger, AlfColorEnum.DangerHover, AlfColorEnum.DangerHover, AlfColorEnum.Red050, AlfColorEnum.Red200, AlfColorEnum.Red150);
    case AlfColorVariantEnum.DangerGhost: return soft(AlfColorEnum.Transparent, AlfColorEnum.Red050, AlfColorEnum.Red150, AlfColorEnum.Danger);
    case AlfColorVariantEnum.DangerSoft: return soft(AlfColorEnum.Red050, AlfColorEnum.Red200, AlfColorEnum.Red150, AlfColorEnum.Danger);
    case AlfColorVariantEnum.Danger3D: return depth(AlfColorEnum.Danger, AlfColorEnum.DangerHover, AlfColorEnum.DangerHover, AlfColorEnum.White);

    // ===== WARNING =====
    case AlfColorVariantEnum.Warning: return solid(AlfColorEnum.Warning, AlfColorEnum.WarningHover, AlfColorEnum.WarningHover, AlfColorEnum.Gray900);
    case AlfColorVariantEnum.WarningOutline: return outline(AlfColorEnum.Warning, AlfColorEnum.WarningHover, AlfColorEnum.WarningHover, AlfColorEnum.Yellow050, AlfColorEnum.Yellow200, AlfColorEnum.Yellow150);
    case AlfColorVariantEnum.WarningGhost: return soft(AlfColorEnum.Transparent, AlfColorEnum.Yellow050, AlfColorEnum.Yellow150, AlfColorEnum.Warning);
    case AlfColorVariantEnum.WarningSoft: return soft(AlfColorEnum.Yellow050, AlfColorEnum.Yellow200, AlfColorEnum.Yellow150, AlfColorEnum.Warning);

    // ===== LIGHT / DARK =====
    case AlfColorVariantEnum.Light: return solid(AlfColorEnum.Gray100, AlfColorEnum.Gray200, AlfColorEnum.Gray300, AlfColorEnum.Gray450);
    case AlfColorVariantEnum.Dark: return solid(AlfColorEnum.Gray900, AlfColorEnum.Gray800, AlfColorEnum.Gray700, AlfColorEnum.White);

    // ===== GRADIENTS =====
    case AlfColorVariantEnum.GradientPrimary: return solid(AlfColorEnum.Primary, AlfColorEnum.PrimaryHover, AlfColorEnum.PrimaryHover, AlfColorEnum.White);

    // ===== DEFAULT =====
    case AlfColorVariantEnum.Default:
    default:
      return solid(AlfColorEnum.Gray100, AlfColorEnum.Gray200, AlfColorEnum.Gray300, AlfColorEnum.Gray900);
  }
};