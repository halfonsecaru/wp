import {
  AlfColorVariantEnum,
  AlfInputTypeEnum,
  AlfInputAppearanceEnum,
  AlfSizeEnum,
} from "@alfcomponents/enums";
import { AlfInputColorVariantEnum } from "@alfcomponents/enums/alf-input-color-variant.enum";
import {
  AlfBaseCommonConfigInterface,
  AlfBorderBaseInterface,
  AlfBorderInterface,
  AlfRippleInterface
} from "@alfcomponents/interfaces";
import { AlfSelectOption } from "./alf-auto-complete-options-interface";
import { AlfTooltipConfig } from "@alfcomponents/directives";
import { AlfValidationResult } from "@alfcomponents/shared";

/**
 * Grupo de opciones del select
 */
export interface AlfSelectGroup {
  /** Etiqueta del grupo */
  label: string;

  /** Opciones del grupo */
  options: AlfSelectOption[];

  /** Si el grupo está deshabilitado */
  disabled?: boolean;
}

/**
 * Interface para la configuración del componente alf-select
 * Hereda de AllPropertiesInterface excluyendo propiedades no aplicables
 */
export interface AlfAutocompleteConfigInterface extends Partial<AlfBaseCommonConfigInterface> {
  readonly elevated?: boolean;
  readonly id?: string;
  readonly value?: any;
  readonly options?: AlfSelectOption[];
  readonly placeholder?: string;
  readonly searchable?: boolean;
  readonly clearable?: boolean;
  readonly multiple?: boolean;
  readonly maxSelections?: number;
  readonly variant?: AlfColorVariantEnum;
  readonly appearance?: AlfInputAppearanceEnum;
  readonly openOnFocus?: boolean;
  readonly virtualScroll?: boolean;
  readonly groupBy?: string;
  readonly label?: string;
  readonly helperText?: string;
  readonly readonly?: boolean;
  readonly required?: boolean;
  readonly loading?: boolean;
  readonly name?: string;
  readonly predefined?: string | AlfInputTypeEnum;
  readonly tooltip?: string | AlfTooltipConfig;
  readonly size?: AlfSizeEnum;
  readonly maxLength?: number;
  readonly minLength?: number;
  readonly min?: number;
  readonly max?: number;
  readonly pattern?: string;
  readonly validators?: ((v: any) => AlfValidationResult)[];
  readonly error?: string | boolean;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly autocomplete?: string;
  readonly clearOnClick?: boolean;
  readonly autofocus?: boolean;
  readonly ripple?: boolean | AlfRippleInterface;
}

