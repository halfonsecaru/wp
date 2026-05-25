import { AlfInputAppearanceEnum, AlfInputTypeEnum, AlfColorVariantEnum } from '@alfcomponents/enums';
import { AlfInputInterface } from '../interfaces/alf-input.interface';
import { AlfComponentTypeEnum, resolveVariantConfig } from '../../../../base/defaultVariants';

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
};

export const getAlfInputDefaultConfiguration = (
  variant?: AlfColorVariantEnum,
  appearance?: AlfInputAppearanceEnum
): AlfInputInterface => {
  const v = variant ?? AlfColorVariantEnum.SecondaryOutline;
  const variantConfig = resolveVariantConfig(v, AlfComponentTypeEnum.Input) as Partial<AlfInputInterface>;

  return {
    ...ALF_INPUT_DEFAULT_BASE,
    ...variantConfig,
    colorVariant: v,
    appearance: appearance ?? AlfInputAppearanceEnum.Outline,

    // DEFINING STANDARD VISUAL SPECIFICATIONS DYNAMICALLY
    displayAndLayout: {
      default: {
        minHeight: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
      },
      disabled: {
        minHeight: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
      }
    } as any,
    backgrounds: {
      default: {
        backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 242, 245, 0.9) 100%)',
      },
      hover: {
        backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 242, 245, 0.9) 100%)',
      },
      focus: {
        backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 242, 245, 0.9) 100%)',
      },
      disabled: {
        backgroundColor: '#f1f5f9',
        backgroundImage: 'none',
      }
    } as any,
    border: {
      default: {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#cbd5e1',
        borderRadius: '8px',
      },
      hover: {
        borderColor: '#94a3b8',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '8px',
      },
      focus: {
        borderColor: '#4f46e5',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '8px',
      },
      disabled: {
        borderColor: '#e2e8f0',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '8px',
      }
    } as any,
    shadows: {
      default: {
        boxShadow: 'none',
      },
      focus: {
        boxShadow: '0 0 0 1px #4f46e5, 0 4px 12px rgba(79, 70, 229, 0.08)',
      }
    } as any
  };
};
