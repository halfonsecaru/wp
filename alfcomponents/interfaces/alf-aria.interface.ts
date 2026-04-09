import { 
  AlfAriaRoleEnum, 
  AlfAriaHasPopupEnum 
} from '../enums';

/**
 * Interfaz para propiedades de accesibilidad (ARIA) comunes
 * Útil para componentes que actúan como combobox, menús, diálogos o elementos interactivos.
 */
export interface AlfAriaInterface {
  /**
   * Rol ARIA del elemento que define su propósito semántico.
   * @example AlfAriaRoleEnum.Combobox 
   */
  role?: AlfAriaRoleEnum;

  /**
   * Estado de expansión del elemento (para combobox o menús desplegables).
   * @default false
   */
  ariaExpanded?: boolean;

  /**
   * ID del elemento o elementos que este componente controla.
   * @example 'listbox-id-123'
   */
  ariaControls?: string;

  /**
   * ID del elemento actualmente activo entre sus descendientes (para navegación con teclado).
   */
  ariaActiveDescendant?: string;

  /**
   * Indica si el elemento dispara un popup y de qué tipo es.
   * @example AlfAriaHasPopupEnum.Listbox 
   */
  ariaHasPopup?: AlfAriaHasPopupEnum;

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
}
