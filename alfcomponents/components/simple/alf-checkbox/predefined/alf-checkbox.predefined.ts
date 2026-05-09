import {
  AlfColorVariantEnum,
  AlfSizeEnum,
  AlfCheckboxVariantEnum,
} from '@alfcomponents/enums';
import { AlfCheckboxInterface } from '../interfaces/alf-checkbox.interface';
import { resolveVariantConfig } from '@alfcomponents/base/defaultVariants';


/**
 * Default base configuration for the alf-checkbox component.
 */
export const ALF_CHECKBOX_DEFAULT: AlfCheckboxInterface = {
  checkboxStyle: AlfCheckboxVariantEnum.Elegant,
  labelPosition: 'after',
  size: AlfSizeEnum.MD,
  disabled: false,
  checked: false,
  indeterminate: false,
};

/**
 * Elite Factory for Checkboxes.
 * Mirrors the AlfButton pattern for complete visual consistency across the system.
 */
export const getAlfCheckboxDefaultConfig = (
  variant: AlfColorVariantEnum
): AlfCheckboxInterface => {

  const variantConfig = resolveVariantConfig(variant);
  return {
    ...ALF_CHECKBOX_DEFAULT,
    colorVariant: variant,
    ...variantConfig,
    // border: generateBorders(styleKind, variant),
    // typography: generateTypography(variant),
    // textStyle: generateTextStyle(styleKind, variant),
  };
};
