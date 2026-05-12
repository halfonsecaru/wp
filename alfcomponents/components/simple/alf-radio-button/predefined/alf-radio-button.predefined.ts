import {
  AlfRadioButtonVariantEnum,
  AlfSizeEnum,
  AlfColorVariantEnum,
} from '@alfcomponents/enums';
import { AlfRadioButtonInterface } from '../interfaces/alf-radio-button.interface';
import { resolveVariantConfig } from '@alfcomponents/base/defaultVariants';

/**
 * Configuración base por defecto para el componente alf-radio-button.
 */
export const ALF_RADIO_BUTTON_DEFAULT: AlfRadioButtonInterface = {
  radioButtonStyle: AlfRadioButtonVariantEnum.Elegant,
  labelPosition: 'after',
  size: AlfSizeEnum.MD,
  disabled: false,
  checked: false,
};

/**
 * Factory Élite que resuelve la configuración delegando en el motor centralizado.
 */
export const getAlfRadioButtonDefaultConfig = (
  variant?: AlfColorVariantEnum
): AlfRadioButtonInterface => {
  const v = variant ?? AlfColorVariantEnum.Secondary;
  const variantConfig = resolveVariantConfig(v);

  return {
    ...ALF_RADIO_BUTTON_DEFAULT,
    ...variantConfig,
    colorVariant: v,
  };
};

