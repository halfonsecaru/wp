import {
  AlfColorEnum,
  AlfBackgroundSizeEnum,
  AlfPositionEnum,
  AlfBackgroundRepeatEnum,
  AlfBackgroundAttachmentEnum,
  AlfBackgroundClipEnum
} from '../enums';

/**
 * Propiedades de fondo para un estado específico
 */
export interface AlfBackgroundsBaseInterface {
  /**
   * Color de fondo del sistema
   * @example AlfColorEnum.Primary 
   */
  backgroundColor?: AlfColorEnum;

  /**
   * Tamaño del fondo
   * @example AlfBackgroundSizeEnum.Cover 
   */
  backgroundSize?: AlfBackgroundSizeEnum;

  /**
   * Posicionamiento del fondo
   * @example AlfPositionEnum.CenterCenter 
   */
  backgroundPosition?: AlfPositionEnum;

  /**
   * Repetición del fondo
   * @example AlfBackgroundRepeatEnum.NoRepeat 
   */
  backgroundRepeat?: AlfBackgroundRepeatEnum;

  /**
   * Comportamiento del fondo al hacer scroll
   * @example AlfBackgroundAttachmentEnum.Fixed 
   */
  backgroundAttachment?: AlfBackgroundAttachmentEnum;

  /**
   * Área de aplicación del fondo
   * @example AlfBackgroundClipEnum.BorderBox 
   */
  backgroundClip?: AlfBackgroundClipEnum;

  /** Clase CSS personalizada delegada al elemento */
  customCssClass?: string | string[];

  /** 
   * Estilos CSS en línea personalizados 
   * Úsalo para imágenes externas o degradados custom.
   * @example [{ 'background-image': 'url("...")' }] 
   */
  customCssStyle?: Record<string, string>[];
}

/**
 * Interface para estilos de fondo con soporte de estados
 */
export interface AlfBackgroundsInterface {
  /**
   * Estilos base aplicados por defecto al componente.
   */
  default?: AlfBackgroundsBaseInterface;

  /**
   * Estilos aplicados cuando el puntero del usuario está sobre el elemento.
   */
  hover?: AlfBackgroundsBaseInterface;

  /**
   * Estilos aplicados cuando el elemento recibe el foco.
   */
  focus?: AlfBackgroundsBaseInterface;

  /**
   * Estilos aplicados cuando el componente se encuentra en estado deshabilitado.
   */
  disabled?: AlfBackgroundsBaseInterface;

  /**
   * Estilos aplicados cuando el componente está activo (en click).
   */
  active?: AlfBackgroundsBaseInterface;
}
