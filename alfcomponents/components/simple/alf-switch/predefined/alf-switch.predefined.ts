import { 
  AlfLabelsPositionEnum, 
  AlfSizeEnum, 
  AlfColorVariantEnum
} from '@alfcomponents/enums';
import { AlfSwitchInterface } from '../interfaces/alf-switch.interface';
import { resolveVariantConfig } from '../../../../base/defaultVariants';

/**
 * Default base configuration for the alf-switch component.
 */
export const ALF_SWITCH_DEFAULT_BASE: AlfSwitchInterface = {
  switchStyle: 'elegant',
  value: null,
  name: '',
  helperText: '',
  error: '',
  checked: false,
  onLabel: '',
  offLabel: '',
  showLabels: false,
  labelPosition: AlfLabelsPositionEnum.After,
  labelText: '',
};

/**
 * Elite Factory for Switches.
 * Resolves the complete visual configuration from the central engine.
 */
export const getAlfSwitchDefaultConfig = (
  variant?: AlfColorVariantEnum
): AlfSwitchInterface => {
  const v = variant ?? AlfColorVariantEnum.Primary;
  const variantConfig = resolveVariantConfig(v);
  
  return {
    ...ALF_SWITCH_DEFAULT_BASE,
    ...variantConfig,
    colorVariant: v,
  };
};
