import { AlfColorVariantEnum, AlfInputAppearanceEnum, AlfInputTypeEnum } from '@alfcomponents/enums';


import { AlfBaseCommonConfigInterface } from '@alfcomponents/base/alf-base-configuration';

export interface AlfInputInterface extends AlfBaseCommonConfigInterface {
  readonly id?: string;
  readonly label?: string;
  readonly placeholder?: string;
  readonly value?: string;
  readonly disabled?: boolean;
  readonly error?: string;
  readonly helperText?: string;
  readonly colorVariant?: AlfColorVariantEnum;
  readonly appearance?: AlfInputAppearanceEnum;
  readonly inputType?: AlfInputTypeEnum;
  readonly loading?: boolean;

  // Propiedades Funcionales
  readonly name?: string;
  readonly required?: boolean;
  readonly readonly?: boolean;
  readonly maxLength?: number;
  readonly minLength?: number;
  readonly min?: number | string;
  readonly max?: number | string;
  readonly step?: number;
  readonly pattern?: string;
  readonly autocomplete?: string;
  readonly debounceTime?: number;
  readonly prefix?: string;
  readonly suffix?: string;

  // Toggles Funcionales
  readonly clearable?: boolean;
  readonly showPasswordToggle?: boolean;
  readonly showCharCounter?: boolean;

  // I18n
  readonly clearLabel?: string;
  readonly showPwdLabel?: string;
  readonly hidePwdLbl?: string;
  readonly loadingLabel?: string;
}
