import { AlfColorEnum, AlfThemeEnum, AlfIconsUnicodeIconEnum, AlfColorVariantEnum } from '../../enums';

/**
 * Identidad pura de una variante.
 * Define el ADN cromático base para cualquier componente.
 */
export interface AlfVariantIdentity {
  brand: AlfColorEnum;
  hover: AlfColorEnum;
  ripple: AlfColorEnum;
  contrast: AlfColorEnum;
  icon?: AlfIconsUnicodeIconEnum;
}

/**
 * ADN MAESTRO DE COLORES (Omni-Identity System)
 * Estructura directa por Tema para acceso inmediato O(1).
 */
export const BASIC_IDENTITIES: Record<AlfThemeEnum, Record<string, AlfVariantIdentity>> = {
  [AlfThemeEnum.Light]: {
    // --- Básicos ---
    [AlfColorVariantEnum.Primary]:   { brand: AlfColorEnum.Primary,   hover: AlfColorEnum.PrimaryHover, ripple: AlfColorEnum.Blue900,   contrast: AlfColorEnum.White },
    [AlfColorVariantEnum.Secondary]: { brand: AlfColorEnum.Secondary, hover: AlfColorEnum.SecondaryHover, ripple: AlfColorEnum.Gray800,  contrast: AlfColorEnum.White },
    [AlfColorVariantEnum.Success]:   { brand: AlfColorEnum.Success,   hover: AlfColorEnum.SuccessHover, ripple: AlfColorEnum.Green900, contrast: AlfColorEnum.White },
    [AlfColorVariantEnum.Danger]:    { brand: AlfColorEnum.Danger,    hover: AlfColorEnum.DangerHover,  ripple: AlfColorEnum.Red900,   contrast: AlfColorEnum.White },
    [AlfColorVariantEnum.Warning]:   { brand: AlfColorEnum.Warning,   hover: AlfColorEnum.WarningHover, ripple: AlfColorEnum.Yellow800, contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Info]:      { brand: AlfColorEnum.Info,      hover: AlfColorEnum.InfoHover,    ripple: AlfColorEnum.Cyan900,   contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Light]:     { brand: AlfColorEnum.Gray100,   hover: AlfColorEnum.Gray200,      ripple: AlfColorEnum.Gray400,   contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Dark]:      { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Gray900,      ripple: AlfColorEnum.Gray600,   contrast: AlfColorEnum.White },

    // --- Especiales / Friki Mode (Keys directas) ---
    [AlfColorVariantEnum.Accept]:  { brand: AlfColorEnum.Primary,   hover: AlfColorEnum.PrimaryHover, ripple: AlfColorEnum.Blue900,   contrast: AlfColorEnum.White, icon: AlfIconsUnicodeIconEnum.Check },
    [AlfColorVariantEnum.Cancel]:  { brand: AlfColorEnum.Secondary, hover: AlfColorEnum.SecondaryHover, ripple: AlfColorEnum.Gray800,  contrast: AlfColorEnum.White, icon: AlfIconsUnicodeIconEnum.Cross },
    [AlfColorVariantEnum.Cyber]:   { brand: AlfColorEnum.Yellow400, hover: AlfColorEnum.Yellow500,    ripple: AlfColorEnum.Orange600, contrast: AlfColorEnum.Black, icon: AlfIconsUnicodeIconEnum.Zap },
    [AlfColorVariantEnum.Matrix]:  { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Gray950,      ripple: AlfColorEnum.Green600,  contrast: AlfColorEnum.Green400, icon: AlfIconsUnicodeIconEnum.Laptop },
    [AlfColorVariantEnum.Jedi]:    { brand: AlfColorEnum.Blue400,   hover: AlfColorEnum.Blue500,      ripple: AlfColorEnum.Blue300,   contrast: AlfColorEnum.White, icon: AlfIconsUnicodeIconEnum.Sparkles },
    [AlfColorVariantEnum.Sith]:    { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Red950,       ripple: AlfColorEnum.Red600,    contrast: AlfColorEnum.Red500, icon: AlfIconsUnicodeIconEnum.Skull },
    [AlfColorVariantEnum.Fire]:    { brand: AlfColorEnum.Orange500, hover: AlfColorEnum.Red600,       ripple: AlfColorEnum.Orange900, contrast: AlfColorEnum.White, icon: AlfIconsUnicodeIconEnum.Collision },
    [AlfColorVariantEnum.Frost]:   { brand: AlfColorEnum.Cyan400,   hover: AlfColorEnum.Blue500,      ripple: AlfColorEnum.Blue200,   contrast: AlfColorEnum.Black, icon: AlfIconsUnicodeIconEnum.Snowflake },
    [AlfColorVariantEnum.Lava]:    { brand: AlfColorEnum.Gray900,   hover: AlfColorEnum.Black,        ripple: AlfColorEnum.Orange600, contrast: AlfColorEnum.Orange500, icon: AlfIconsUnicodeIconEnum.Volcano },
    [AlfColorVariantEnum.Zen]:     { brand: AlfColorEnum.Gray100,   hover: AlfColorEnum.White,        ripple: AlfColorEnum.Green200,  contrast: AlfColorEnum.Gray600, icon: AlfIconsUnicodeIconEnum.FallenLeaf }
  },

  [AlfThemeEnum.Dark]: {
    // --- Básicos (Modo Oscuro: colores más vibrantes y contrastados) ---
    [AlfColorVariantEnum.Primary]:   { brand: AlfColorEnum.Blue400,   hover: AlfColorEnum.Blue300,      ripple: AlfColorEnum.Blue200,   contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Secondary]: { brand: AlfColorEnum.Gray400,   hover: AlfColorEnum.Gray300,      ripple: AlfColorEnum.Gray500,   contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Success]:   { brand: AlfColorEnum.Green400,  hover: AlfColorEnum.Green300,     ripple: AlfColorEnum.Green200,  contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Danger]:    { brand: AlfColorEnum.Red400,    hover: AlfColorEnum.Red300,       ripple: AlfColorEnum.Red200,    contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Warning]:   { brand: AlfColorEnum.Yellow400, hover: AlfColorEnum.Yellow300,    ripple: AlfColorEnum.Orange200, contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Info]:      { brand: AlfColorEnum.Cyan400,   hover: AlfColorEnum.Cyan300,      ripple: AlfColorEnum.Cyan200,   contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Light]:     { brand: AlfColorEnum.Gray700,   hover: AlfColorEnum.Gray600,      ripple: AlfColorEnum.Gray500,   contrast: AlfColorEnum.White },
    [AlfColorVariantEnum.Dark]:      { brand: AlfColorEnum.White,     hover: AlfColorEnum.Gray100,      ripple: AlfColorEnum.Gray300,   contrast: AlfColorEnum.Black },

    // --- Especiales / Friki Mode (Dark Optimized) ---
    [AlfColorVariantEnum.Accept]:  { brand: AlfColorEnum.Blue500,   hover: AlfColorEnum.Blue400,      ripple: AlfColorEnum.Blue200,   contrast: AlfColorEnum.White, icon: AlfIconsUnicodeIconEnum.Check },
    [AlfColorVariantEnum.Cancel]:  { brand: AlfColorEnum.Gray500,   hover: AlfColorEnum.Gray400,      ripple: AlfColorEnum.Gray300,   contrast: AlfColorEnum.White, icon: AlfIconsUnicodeIconEnum.Cross },
    [AlfColorVariantEnum.Cyber]:   { brand: AlfColorEnum.Yellow400, hover: AlfColorEnum.Yellow300,    ripple: AlfColorEnum.White,     contrast: AlfColorEnum.Black, icon: AlfIconsUnicodeIconEnum.Zap },
    [AlfColorVariantEnum.Matrix]:  { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Gray900,      ripple: AlfColorEnum.Green400,  contrast: AlfColorEnum.Green500, icon: AlfIconsUnicodeIconEnum.Laptop },
    [AlfColorVariantEnum.Jedi]:    { brand: AlfColorEnum.Blue200,   hover: AlfColorEnum.White,        ripple: AlfColorEnum.Blue100,   contrast: AlfColorEnum.Black, icon: AlfIconsUnicodeIconEnum.Sparkles },
    [AlfColorVariantEnum.Sith]:    { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Red950,       ripple: AlfColorEnum.Red500,    contrast: AlfColorEnum.Red600, icon: AlfIconsUnicodeIconEnum.Skull },
    [AlfColorVariantEnum.Fire]:    { brand: AlfColorEnum.Red500,    hover: AlfColorEnum.Orange600,    ripple: AlfColorEnum.Yellow500, contrast: AlfColorEnum.White, icon: AlfIconsUnicodeIconEnum.Collision },
    [AlfColorVariantEnum.Frost]:   { brand: AlfColorEnum.Blue300,   hover: AlfColorEnum.Cyan200,      ripple: AlfColorEnum.White,     contrast: AlfColorEnum.Black, icon: AlfIconsUnicodeIconEnum.Snowflake },
    [AlfColorVariantEnum.Lava]:    { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Gray900,      ripple: AlfColorEnum.Red600,    contrast: AlfColorEnum.Orange600, icon: AlfIconsUnicodeIconEnum.Volcano },
    [AlfColorVariantEnum.Zen]:     { brand: AlfColorEnum.Gray800,   hover: AlfColorEnum.Gray700,      ripple: AlfColorEnum.Green400,  contrast: AlfColorEnum.Green200, icon: AlfIconsUnicodeIconEnum.FallenLeaf }
  },

  // --- Temas Adicionales (Mapeados a fallbacks optimizados) ---
  
  [AlfThemeEnum.HighContrast]: {
    // Usamos colores sólidos y puros para máxima accesibilidad
    [AlfColorVariantEnum.Primary]:   { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Gray900,      ripple: AlfColorEnum.White,     contrast: AlfColorEnum.White },
    [AlfColorVariantEnum.Secondary]: { brand: AlfColorEnum.White,     hover: AlfColorEnum.Gray100,      ripple: AlfColorEnum.Black,     contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Success]:   { brand: AlfColorEnum.Green600,  hover: AlfColorEnum.Green700,     ripple: AlfColorEnum.White,     contrast: AlfColorEnum.White },
    [AlfColorVariantEnum.Danger]:    { brand: AlfColorEnum.Red600,    hover: AlfColorEnum.Red700,       ripple: AlfColorEnum.White,     contrast: AlfColorEnum.White },
    [AlfColorVariantEnum.Warning]:   { brand: AlfColorEnum.Yellow400, hover: AlfColorEnum.Yellow500,    ripple: AlfColorEnum.Black,     contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Info]:      { brand: AlfColorEnum.Cyan600,   hover: AlfColorEnum.Cyan700,      ripple: AlfColorEnum.White,     contrast: AlfColorEnum.White },
    [AlfColorVariantEnum.Light]:     { brand: AlfColorEnum.White,     hover: AlfColorEnum.Gray200,      ripple: AlfColorEnum.Black,     contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Dark]:      { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Gray900,      ripple: AlfColorEnum.White,     contrast: AlfColorEnum.White }
  },

  [AlfThemeEnum.MidnightGold]: {
    // Tema Oscuro Profundo con acentos en Oro/Amarillo
    ...{} as any, // TypeScript helper para spread si fuera necesario, pero lo haremos explícito
    [AlfColorVariantEnum.Primary]:   { brand: AlfColorEnum.Yellow500, hover: AlfColorEnum.Yellow400,    ripple: AlfColorEnum.White,     contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Secondary]: { brand: AlfColorEnum.Gray800,   hover: AlfColorEnum.Gray700,      ripple: AlfColorEnum.Yellow600, contrast: AlfColorEnum.Yellow500 },
    [AlfColorVariantEnum.Success]:   { brand: AlfColorEnum.Green600,  hover: AlfColorEnum.Green500,     ripple: AlfColorEnum.White,     contrast: AlfColorEnum.White },
    [AlfColorVariantEnum.Danger]:    { brand: AlfColorEnum.Red600,    hover: AlfColorEnum.Red500,       ripple: AlfColorEnum.White,     contrast: AlfColorEnum.White },
    [AlfColorVariantEnum.Warning]:   { brand: AlfColorEnum.Yellow400, hover: AlfColorEnum.Yellow300,    ripple: AlfColorEnum.Black,     contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Info]:      { brand: AlfColorEnum.Cyan600,   hover: AlfColorEnum.Cyan500,      ripple: AlfColorEnum.White,     contrast: AlfColorEnum.White },
    [AlfColorVariantEnum.Light]:     { brand: AlfColorEnum.Gray300,   hover: AlfColorEnum.Gray200,      ripple: AlfColorEnum.Black,     contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Dark]:      { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Gray900,      ripple: AlfColorEnum.Yellow500, contrast: AlfColorEnum.Yellow400 }
  },

  [AlfThemeEnum.Cyberpunk]: {
    // Tema Futurista: Predomina el Amarillo y el contraste extremo
    [AlfColorVariantEnum.Primary]:   { brand: AlfColorEnum.Yellow400, hover: AlfColorEnum.Yellow300,    ripple: AlfColorEnum.Orange500, contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Secondary]: { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Gray900,      ripple: AlfColorEnum.Yellow400, contrast: AlfColorEnum.Yellow400 },
    [AlfColorVariantEnum.Success]:   { brand: AlfColorEnum.Green400,  hover: AlfColorEnum.Green300,     ripple: AlfColorEnum.White,     contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Danger]:    { brand: AlfColorEnum.Red500,    hover: AlfColorEnum.Red400,       ripple: AlfColorEnum.White,     contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Warning]:   { brand: AlfColorEnum.Yellow300, hover: AlfColorEnum.Yellow200,    ripple: AlfColorEnum.Black,     contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Info]:      { brand: AlfColorEnum.Cyan400,   hover: AlfColorEnum.Cyan300,      ripple: AlfColorEnum.Black,     contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Light]:     { brand: AlfColorEnum.Gray200,   hover: AlfColorEnum.White,        ripple: AlfColorEnum.Black,     contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Dark]:      { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Gray950,      ripple: AlfColorEnum.Yellow400, contrast: AlfColorEnum.Yellow400 }
  },

  [AlfThemeEnum.Custom]: {
    // Fallback al tema Light
    [AlfColorVariantEnum.Primary]:   { brand: AlfColorEnum.Primary,   hover: AlfColorEnum.PrimaryHover, ripple: AlfColorEnum.Blue900,   contrast: AlfColorEnum.White },
    [AlfColorVariantEnum.Secondary]: { brand: AlfColorEnum.Secondary, hover: AlfColorEnum.SecondaryHover, ripple: AlfColorEnum.Gray800,  contrast: AlfColorEnum.White },
    [AlfColorVariantEnum.Success]:   { brand: AlfColorEnum.Success,   hover: AlfColorEnum.SuccessHover, ripple: AlfColorEnum.Green900, contrast: AlfColorEnum.White },
    [AlfColorVariantEnum.Danger]:    { brand: AlfColorEnum.Danger,    hover: AlfColorEnum.DangerHover,  ripple: AlfColorEnum.Red900,   contrast: AlfColorEnum.White },
    [AlfColorVariantEnum.Warning]:   { brand: AlfColorEnum.Warning,   hover: AlfColorEnum.WarningHover, ripple: AlfColorEnum.Yellow800, contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Info]:      { brand: AlfColorEnum.Info,      hover: AlfColorEnum.InfoHover,    ripple: AlfColorEnum.Cyan900,   contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Light]:     { brand: AlfColorEnum.Gray100,   hover: AlfColorEnum.Gray200,      ripple: AlfColorEnum.Gray400,   contrast: AlfColorEnum.Black },
    [AlfColorVariantEnum.Dark]:      { brand: AlfColorEnum.Black,     hover: AlfColorEnum.Gray900,      ripple: AlfColorEnum.Gray600,   contrast: AlfColorEnum.White }
  }
};

