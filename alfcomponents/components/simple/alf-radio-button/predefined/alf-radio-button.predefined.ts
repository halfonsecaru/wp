import {
  AlfRadioButtonVariantEnum,
  AlfSizeEnum,
  AlfColorVariantEnum,
  AlfAnimationTypeEnum,
} from '@alfcomponents/enums';
import { AlfRadioButtonInterface } from '../interfaces/alf-radio-button.interface';

/**
 * Configuración base por defecto para el componente alf-radio-button.
 */
export const ALF_RADIO_BUTTON_DEFAULT: AlfRadioButtonInterface = {
  radioButtonStyle: AlfRadioButtonVariantEnum.Elegant,
  labelPosition: 'after',
  size: AlfSizeEnum.MD,
  colorVariant: AlfColorVariantEnum.Primary,
  animations: {
    enterStage: AlfAnimationTypeEnum.FadeIn,
    duration: '0.2s'
  }
};

/**
 * Factory Élite que resuelve la configuración delegando en el motor centralizado.
 */
export const getAlfRadioButtonDefaultConfig = (variant: AlfColorVariantEnum = AlfColorVariantEnum.Primary): AlfRadioButtonInterface => {

  return {
    ...ALF_RADIO_BUTTON_DEFAULT,
    colorVariant: variant
  };
};
