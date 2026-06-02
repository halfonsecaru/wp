import { 
  AlfColorVariantEnum,
  AlfInputTypeEnum,
  AlfInputAppearanceEnum,
} from "@alfcomponents/enums";
import { AlfInputColorVariantEnum } from "@alfcomponents/enums/alf-input-color-variant.enum";
import { 
  AlfBackgroundsInterface, 
  AlfBorderInterface, 
  AlfDisplayAndLayoutInterface, 
  AlfMarginInterface, 
  AlfPaddingInterface, 
  AlfShadowsInterface, 
  AlfTextStyleInterface, 
  AlfTypographyInterface, 
  AlfAnimateCssInterface,
  AlfBaseCommonConfigInterface
} from "@alfcomponents/interfaces";


/**
 * Opción individual del select
 */
export interface AlfSelectOption {
  /** Valor de la opción */
  value: any;

  /** Etiqueta visible de la opción */
  label: string;

  /** Si la opción está deshabilitada */
  disabled?: boolean;

  /** Icono opcional (unicode o clase CSS) */
  icon?: string;

  /** Grupo al que pertenece (para agrupación visual) */
  group?: string;

  /** Datos adicionales personalizados */
  data?: any;
}

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


  value?: any;
  options?: AlfSelectOption[];

  compareWith?: (o1: any, o2: any) => boolean;

  placeholder?: string;

  searchable?: boolean;

  clearable?: boolean;

  multiple?: boolean;

  maxSelections?: number;

  selectVariant?: AlfInputColorVariantEnum;

  appearance?: AlfInputAppearanceEnum;

  openOnFocus?: boolean;

  virtualScroll?: boolean;

  groupBy?: string;

  label?: string;

  error?: string;

  helperText?: string;

  disabled?: boolean;

  readonly?: boolean;

  required?: boolean;

  loading?: boolean;

  id?: string;

  name?: string;

  prefix?: string;

  suffix?: string;

  predefined?: string | AlfInputTypeEnum;
  
}

