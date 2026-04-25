import {
  AlfAriaRoleEnum,
  AlfAriaHasPopupEnum
} from '../enums';

/**
 * Propiedades ARIA realmente genéricas para la mayoría de componentes.
 */
export interface AlfAriaBaseInterface {
  /**
   * Rol ARIA del elemento que define su propósito semántico.
   * @example AlfAriaRoleEnum.Combobox 
   */
  role?: AlfAriaRoleEnum;

  /**
   * ID o IDs de los elementos que proporcionan una descripción extensa del componente.
   */
  ariaDescribedBy?: string;

  /**
   * Etiqueta accesible que describe el elemento (cuando no hay texto visible).
   */
  ariaLabel?: string;

  /**
   * ID del elemento que actúa como etiqueta para este componente.
   */
  ariaLabelledBy?: string;

  /**
   * Indica si el elemento o sus campos requeridos son inválidos.
   */
  ariaInvalid?: boolean;

  /**
   * Indica si el elemento es obligatorio.
   */
  ariaRequired?: boolean;

  /**
   * Indica si el elemento está seleccionado.
   */
  ariaSelected?: boolean;
}

/**
 * ARIA para componentes con comportamiento de popup/overlay
 * (combobox, menu, listbox, dialog trigger, etc.).
 */
export interface AlfAriaPopupInterface {
  /**
   * Estado de expansión del elemento.
   * @default false
   */
  ariaExpanded?: boolean;

  /**
   * ID del elemento o elementos que este componente controla.
   */
  ariaControls?: string;

  /**
   * ID del elemento actualmente activo entre sus descendientes.
   */
  ariaActiveDescendant?: string;

  /**
   * Indica si el elemento dispara un popup y de qué tipo es.
   */
  ariaHasPopup?: AlfAriaHasPopupEnum;
}

/**
 * Contrato completo actual para compatibilidad.
 */
export interface AlfAriaInterface extends AlfAriaBaseInterface, AlfAriaPopupInterface { }
