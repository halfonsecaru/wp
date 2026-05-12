import { 
  AlfColorVariantEnum, 
  AlfSizeEnum, 
  AlfCheckboxVariantEnum, 
  AlfColorEnum
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
 * Resolves the complete visual configuration from the central engine.
 */
export const getAlfCheckboxDefaultConfig = (
  variant?: AlfColorVariantEnum
): AlfCheckboxInterface => {
  // If no variant is provided, we default to Transparent to keep it clean
  const v = variant ?? AlfColorVariantEnum.Secondary;
  const variantConfig = resolveVariantConfig(v);
  
  return {
    ...ALF_CHECKBOX_DEFAULT,
    ...variantConfig,
    colorVariant: v,
  };
};
