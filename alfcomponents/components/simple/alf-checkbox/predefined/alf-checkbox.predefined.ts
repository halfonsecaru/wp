import {
  AlfCheckboxVariantEnum,
  AlfSizeEnum,
  AlfColorVariantEnum,
  AlfAnimationTypeEnum,
} from '@alfcomponents/enums';
import { AlfCheckboxInterface } from '../interfaces/alf-checkbox.interface';
import { resolveVariantDefinitions } from '@alfcomponents/base/variantes/main-variants-selection';

/**
 * Configuración base por defecto para el componente alf-checkbox.
 */
export const ALF_CHECKBOX_DEFAULT: AlfCheckboxInterface = {
  checkboxStyle: AlfCheckboxVariantEnum.Elegant,
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
export const getAlfCheckboxDefaultConfig = (variant: AlfColorVariantEnum = AlfColorVariantEnum.Primary): AlfCheckboxInterface => {
  const visualBase = resolveVariantDefinitions(variant);

  return {
    ...ALF_CHECKBOX_DEFAULT,
    colorVariant: variant,
    backgrounds: visualBase.backgrounds,
    border: visualBase.border,
    typography: visualBase.typography,
    shadows: visualBase.shadows,
    textStyle: visualBase.textStyle
  };
};
