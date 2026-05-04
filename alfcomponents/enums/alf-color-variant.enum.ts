/**
 * Enum para variantes decorativas y premium (Theming Pro)
 * Incluye variantes avanzadas como Soft, Crystal, 3D y Degradados.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * color: AlfColorVariantEnum.PrimaryCrystal // Aplica efecto glassmorphism
 * ```
 */
export enum AlfColorVariantEnum {
  // Variantes Sólidas
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
  Light = 'light',
  Dark = 'dark',

  // Variantes Outline
  PrimaryOutline = 'outline-primary',
  SecondaryOutline = 'outline-secondary',
  SuccessOutline = 'outline-success',
  DangerOutline = 'outline-danger',
  WarningOutline = 'outline-warning',
  InfoOutline = 'outline-info',
  LightOutline = 'outline-light',
  DarkOutline = 'outline-dark',

  // Variantes Ghost (fondo transparente con hover sutil)
  PrimaryGhost = 'ghost-primary',
  SecondaryGhost = 'ghost-secondary',
  SuccessGhost = 'ghost-success',
  DangerGhost = 'ghost-danger',
  WarningGhost = 'ghost-warning',
  InfoGhost = 'ghost-info',
  LightGhost = 'ghost-light',
  DarkGhost = 'ghost-dark',

  // Variantes Soft (fondo suave con color del texto)
  PrimarySoft = 'soft-primary',
  SecondarySoft = 'soft-secondary',
  SuccessSoft = 'soft-success',
  DangerSoft = 'soft-danger',
  WarningSoft = 'soft-warning',
  InfoSoft = 'soft-info',
  LightSoft = 'soft-light',
  DarkSoft = 'soft-dark',

  // Variantes Crystal (efecto glassmorphism)
  PrimaryCrystal = 'crystal-primary',
  SecondaryCrystal = 'crystal-secondary',
  SuccessCrystal = 'crystal-success',
  DangerCrystal = 'crystal-danger',
  WarningCrystal = 'crystal-warning',
  InfoCrystal = 'crystal-info',
  LightCrystal = 'crystal-light',
  DarkCrystal = 'crystal-dark',

  // Variantes Especiales
  Transparent = 'transparent',

  // Variantes 3D (con efecto de profundidad)
  Primary3D = 'depth-primary',
  Secondary3D = 'depth-secondary',
  Success3D = 'depth-success',
  Danger3D = 'depth-danger',
  Warning3D = 'depth-warning',
  Info3D = 'depth-info',
  Light3D = 'depth-light',
  Dark3D = 'depth-dark',

  // Variantes Gradient Premium (con sombra y efecto lift)
  GradientPurple = 'gradient-purple',
  GradientSunset = 'gradient-sunset',
  GradientOcean = 'gradient-ocean',
  GradientForest = 'gradient-forest',
  GradientPrimary = 'gradient-primary',
  GradientDanger = 'gradient-danger',
  GradientSuccess = 'gradient-success',
  GradientWarning = 'gradient-warning',
  GradientInfo = 'gradient-info',

  Default = "Default"
}
