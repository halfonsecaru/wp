import {
  AlfDisplayEnum,
  AlfCssPositionEnum,
  AlfPxEnum,
  AlfRemEnum,
  AlfPercentageEnum,
  AlfZIndexEnum,
  AlfOverflowEnum,
  AlfVisibilityEnum,
  AlfObjectFitEnum,
  AlfFlexDirectionEnum,
  AlfJustifyContentEnum,
  AlfAlignItemsEnum,
  AlfFlexWrapEnum,
  AlfOpacityEnum,
  AlfPointerEventsEnum
} from '../enums';

/**
 * Propiedades de visualización, dimensiones y Flexbox para un estado específico
 */
export interface AlfDisplayAndLayoutBaseInterface {
  // ===== DISPLAY =====
  /**
   * Tipo de display del elemento
   * @example AlfDisplayEnum.Flex 
   */
  display?: AlfDisplayEnum;

  // ===== POSITION =====
  /**
   * Tipo de posicionamiento
   * @example AlfCssPositionEnum.Relative 
   */
  position?: AlfCssPositionEnum;

  /** Distancia desde el borde superior */
  top?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /** Distancia desde el borde derecho */
  right?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /** Distancia desde el borde inferior */
  bottom?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /** Distancia desde el borde izquierdo */
  left?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /**
   * Índice de apilamiento (z-index)
   * @example AlfZIndexEnum.Overlay 
   */
  zIndex?: AlfZIndexEnum;

  // ===== DIMENSIONS =====
  /** Ancho del elemento @example AlfPxEnum.Px100 | AlfPercentageEnum.Full */
  width?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /** Alto del elemento @example AlfRemEnum.Rem10 */
  height?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /** Ancho mínimo */
  minWidth?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /** Ancho máximo */
  maxWidth?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /** Alto mínimo */
  minHeight?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  /** Alto máximo */
  maxHeight?: AlfPxEnum | AlfRemEnum | AlfPercentageEnum;

  // ===== OVERFLOW =====
  /**
   * Comportamiento del desbordamiento
   * @example AlfOverflowEnum.Hidden 
   */
  overflow?: AlfOverflowEnum;

  /** Comportamiento del desbordamiento horizontal */
  overflowX?: AlfOverflowEnum;

  /** Comportamiento del desbordamiento vertical */
  overflowY?: AlfOverflowEnum;

  // ===== VISIBILITY =====
  /**
   * Visibilidad del elemento
   * @example AlfVisibilityEnum.Visible 
   */
  visibility?: AlfVisibilityEnum;

  // ===== OBJECT FIT =====
  /**
   * Ajuste de contenido reemplazado (img, video)
   * @example AlfObjectFitEnum.Cover 
   */
  objectFit?: AlfObjectFitEnum;

  // ===== FLEXBOX =====
  /**
   * Dirección del eje principal flex
   * @example AlfFlexDirectionEnum.Row 
   */
  flexDirection?: AlfFlexDirectionEnum;

  /**
   * Alineación en el eje principal
   * @example AlfJustifyContentEnum.Center 
   */
  justifyContent?: AlfJustifyContentEnum;

  /**
   * Alineación en el eje secundario
   * @example AlfAlignItemsEnum.Center 
   */
  alignItems?: AlfAlignItemsEnum;

  /**
   * Espaciado entre elementos (gap)
   * @example AlfPxEnum.Px16 
   */
  gap?: AlfPxEnum | AlfRemEnum;

  /**
   * Controla si los elementos pueden saltar de línea
   * @example AlfFlexWrapEnum.Wrap 
   */
  flexWrap?: AlfFlexWrapEnum;

  // ===== INTERACTION & VISUAL =====
  /**
   * Opacidad del elemento
   * @example AlfOpacityEnum.Opacity50 
   */
  opacity?: AlfOpacityEnum;

  /**
   * Control de eventos del ratón
   * @example AlfPointerEventsEnum.None 
   */
  pointerEvents?: AlfPointerEventsEnum;

}

/**
 * Interface para visualización y diseño con soporte de estados
 */
export interface AlfDisplayAndLayoutInterface {
  /** Estilos base aplicados por defecto al componente */
  default?: AlfDisplayAndLayoutBaseInterface;

  /** Estilos aplicados en hover */
  hover?: AlfDisplayAndLayoutBaseInterface;

  /** Estilos aplicados cuando recibe el foco */
  focus?: AlfDisplayAndLayoutBaseInterface;

  /** Estilos aplicados en estado deshabilitado */
  disabled?: AlfDisplayAndLayoutBaseInterface;

  /** Estilos aplicados en estado activo (click) */
  active?: AlfDisplayAndLayoutBaseInterface;
}
