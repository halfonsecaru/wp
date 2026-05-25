import { AlfInputAppearanceEnum, AlfInputTypeEnum, AlfColorVariantEnum, AlfPxEnum, AlfDisplayEnum, AlfAlignItemsEnum, AlfPercentageEnum, AlfBoxSizingEnum, AlfColorEnum, AlfBorderStyleEnum, AlfRadiusEnum, AlfOverflowEnum } from '@alfcomponents/enums';
import { AlfInputInterface } from '../interfaces/alf-input.interface';
import { AlfComponentTypeEnum, resolveVariantConfig } from '../../../../base/defaultVariants';
import { AlfBackgroundsBaseInterface, AlfBackgroundsStyleInterface, AlfBorderBaseInterface, AlfBorderInterface, AlfDisplayAndLayoutBaseInterface, AlfDisplayAndLayoutInterface, AlfTextStyleInterface } from '@alfcomponents/interfaces';


const displayState: AlfDisplayAndLayoutBaseInterface = {
  minHeight: AlfPxEnum.Px48,
  height: AlfPxEnum.Px48,
  display: AlfDisplayEnum.Flex,
  alignItems: AlfAlignItemsEnum.Center,
  width: AlfPercentageEnum.Full,
  boxSizing: AlfBoxSizingEnum.BorderBox,
  overflow: AlfOverflowEnum.Visible,
}


const beautyBackground: AlfBackgroundsBaseInterface = {
  backgroundImage: AlfColorEnum.GradientBeauty1,
}

const defaultBorder: AlfBorderBaseInterface = {
  borderWidth: AlfPxEnum.Px1,
  borderStyle: AlfBorderStyleEnum.Solid,
  borderColor: AlfColorEnum.CoolGray,
  borderRadius: AlfRadiusEnum.Lg,
}

export const ALF_INPUT_DEFAULT_BASE: AlfInputInterface = {
  inputType: AlfInputTypeEnum.Text,
  appearance: AlfInputAppearanceEnum.Outline,
  required: false,
  readonly: false,
  loading: false,
  clearable: false,
  showPasswordToggle: true,
  showCharCounter: false,
  debounceTime: 0,
  autocomplete: 'off',
  label: '',
  placeholder: '',
  value: '',
  // DEFINING STANDARD VISUAL SPECIFICATIONS DYNAMICALLY
  displayAndLayout: {
    default: { ...displayState },
    hover: { ...displayState },
    focus: { ...displayState },
    active: { ...displayState },
    disabled: { ...displayState }
  } as AlfDisplayAndLayoutInterface,
  backgrounds: {
    default: { ...beautyBackground },
    hover: { ...beautyBackground },
    focus: { ...beautyBackground },
    active: { ...beautyBackground },
    disabled: {
      backgroundColor: AlfColorEnum.White,
      backgroundImage: 'none',
    }
  } as AlfBackgroundsStyleInterface,
  border: {
    default: { ...defaultBorder },
    hover: { ...defaultBorder },
    focus: { ...defaultBorder },
    active: { ...defaultBorder },
    disabled: {
      borderColor: AlfColorEnum.CoolGray,
      borderStyle: AlfBorderStyleEnum.Solid,
      borderWidth: AlfPxEnum.Px1,
      borderRadius: AlfRadiusEnum.Md,
    }
  } as AlfBorderInterface,
  shadows: {
    default: {
      boxShadow: 'none',
    },
    focus: {
      boxShadow: '0 0 0 1px #4f46e5, 0 4px 12px rgba(79, 70, 229, 0.08)',
    }
  } as any,
  textStyle: {
    default: {
      color: AlfColorEnum.Gray800,
    },
    hover: {
      color: AlfColorEnum.Gray900,
    },
    focus: {
      color: AlfColorEnum.Gray900,
    },
    disabled: {
      color: AlfColorEnum.Gray450,
    }
  } as AlfTextStyleInterface
};





export const getAlfInputDefaultConfiguration = (
  variant?: AlfColorVariantEnum,
  appearance?: AlfInputAppearanceEnum
): AlfInputInterface => {
  const v = variant ?? AlfColorVariantEnum.SecondaryOutline;
  const variantConfig = resolveVariantConfig(v, AlfComponentTypeEnum.Input) as Partial<AlfInputInterface>;
  const isDefault = v === AlfColorVariantEnum.SecondaryOutline || v === AlfColorVariantEnum.Default;

  return {
    ...ALF_INPUT_DEFAULT_BASE,
    ...variantConfig,
    colorVariant: v,
    appearance: appearance ?? AlfInputAppearanceEnum.Outline,
    backgrounds: isDefault ? ALF_INPUT_DEFAULT_BASE.backgrounds : undefined,
    border: isDefault ? ALF_INPUT_DEFAULT_BASE.border : undefined,
    textStyle: isDefault ? ALF_INPUT_DEFAULT_BASE.textStyle : undefined,
  };
};

