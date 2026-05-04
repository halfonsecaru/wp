import { DefaultButtonKeys } from './enums/defaultButtonKeys.interface';
import { AlfButtonInterface } from './interfaces/alf-button.interface';
import { AlfColorVariantEnum } from '@alfcomponents/enums';
import { getAlfButtonLabel, AlfButtonI18nLabels } from './i18n/alf-button.i18n';
import { SupportedLanguage } from '@alfcomponents/i18n/i18n-utils';

/**
 * Tipos de estilo visual simplificados para la fábrica.
 * Reemplaza al AlfButtonVisualTypeEnum legacy.
 */
export type AlfButtonStyleKind = 'solid' | 'outlined' | 'ghost' | 'soft' | 'crystal' | '3d';

export interface AlfPredefinedButtonOptions {
  readonly styleKind?: AlfButtonStyleKind;
  readonly hideIcon?: boolean;
  readonly lang?: SupportedLanguage;
}

interface AlfButtonIdentity {
  readonly labelKey: keyof AlfButtonI18nLabels;
  readonly baseVariant: AlfColorVariantEnum;
}

const BUTTON_IDENTITIES: Readonly<Record<DefaultButtonKeys, AlfButtonIdentity>> = {
  [DefaultButtonKeys.Accept]: { labelKey: 'accept', baseVariant: AlfColorVariantEnum.Primary },
  [DefaultButtonKeys.Cancel]: { labelKey: 'cancel', baseVariant: AlfColorVariantEnum.Secondary },
  [DefaultButtonKeys.Success]: { labelKey: 'success', baseVariant: AlfColorVariantEnum.Success },
  [DefaultButtonKeys.Danger]: { labelKey: 'danger', baseVariant: AlfColorVariantEnum.Danger },
  [DefaultButtonKeys.Warning]: { labelKey: 'warning', baseVariant: AlfColorVariantEnum.Warning },
  [DefaultButtonKeys.Info]: { labelKey: 'info', baseVariant: AlfColorVariantEnum.Info },
  [DefaultButtonKeys.Dark]: { labelKey: 'dark', baseVariant: AlfColorVariantEnum.Dark },
  [DefaultButtonKeys.Light]: { labelKey: 'light', baseVariant: AlfColorVariantEnum.Light }
};

/**
 * Resuelve la variante final combinando el color base con el estilo.
 */
const resolveFinalVariant = (base: AlfColorVariantEnum, kind: AlfButtonStyleKind): AlfColorVariantEnum => {
  if (kind === 'solid') return base;

  // Mapa de sufijos/prefijos según el estilo
  const MAP: Record<string, string> = {
    'outlined': 'Outline',
    'ghost': 'Ghost',
    'soft': 'Soft',
    'crystal': 'Crystal',
    '3d': '3D'
  };

  const suffix = MAP[kind];
  const capitalizedBase = base.charAt(0).toUpperCase() + base.slice(1);
  const variantName = `${capitalizedBase}${suffix}`;

  // Verificamos si la variante existe en el enum (Type Casting seguro)
  return (AlfColorVariantEnum as any)[variantName] ?? base;
};

/**
 * Fábrica Élite para botones predefinidos.
 */
export const getAlfPredefinedButton = (
  key: DefaultButtonKeys,
  options?: AlfPredefinedButtonOptions,
): AlfButtonInterface => {
  const identity = BUTTON_IDENTITIES[key] ?? BUTTON_IDENTITIES[DefaultButtonKeys.Light];
  const styleKind = options?.styleKind ?? 'solid';
  
  const finalVariant = resolveFinalVariant(identity.baseVariant, styleKind);
  const label = getAlfButtonLabel(identity.labelKey, options?.lang);

  return {
    label,
    colorVariant: finalVariant
  };
};
